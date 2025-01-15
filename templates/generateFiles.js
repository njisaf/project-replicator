import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

// Load configuration
import config from './projectConfig.json' assert { type: "json" };

// Recreate __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const DIST_DIR = path.resolve(__dirname, '../dist');
const MAIN_JS_PATH = path.join(DIST_DIR, 'scripts/main.js');
const TEMPLATE_JSON_PATH = path.join(DIST_DIR, 'template.json');

// Generate main.js
function generateMainJs() {
    const { name, title } = config.system;
    const { components } = config;

    const registrations = components
        .map(component => {
            return `
        Actors.registerSheet("${name}", {
          types: ["${component.type}"],
          makeDefault: true,
          label: "${component.label}"
        });
      `;
        })
        .join('\n');

    const content = `
    Hooks.once('init', async () => {
      console.log("${title} | Initializing ${name}");
      ${registrations}
    });
  `;

    fs.outputFileSync(MAIN_JS_PATH, content, 'utf-8');
    console.log('Generated main.js');
}

// Run generators
function main() {
    generateMainJs();
    // template.json now handled by generate-template-json.js
}

main();
