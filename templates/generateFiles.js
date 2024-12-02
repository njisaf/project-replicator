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

// Generate template.json
function generateTemplateJson() {
    const { components } = config;

    const content = {
        Actor: components.reduce((acc, component) => {
            acc[component.type] = component.template;
            return acc;
        }, {})
    };

    fs.outputFileSync(TEMPLATE_JSON_PATH, JSON.stringify(content, null, 2), 'utf-8');
    console.log('Generated template.json');
}

// Run generators
function main() {
    generateMainJs();
    generateTemplateJson(); // system.json now handled by WebpackShellPluginNext
}

main();
