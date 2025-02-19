import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

// Recreate __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load configuration
const configPath = path.resolve(__dirname, 'projectConfig.json');
const outputPath = path.resolve(__dirname, '../dist', 'scripts/main.js');

async function generateMainJs() {
    try {
        const { system, components } = await fs.readJSON(configPath);

        const registrations = components
            .map(component => {
                return `
        Actors.registerSheet("${system.name}", {
          types: ["${component.type}"],
          makeDefault: true,
          label: "${component.label}"
        });
      `;
            })
            .join('\n');

        const content = `
    import { CharacterDataModel } from "./scripts/module/data/character.js";

    Hooks.once('init', async () => {
      console.log("${system.title} | Initializing ${system.name}");
      
      // Register actor data model
      CONFIG.Actor.dataModels.character = CharacterDataModel;
      
      // Register actor sheets
      ${registrations}
    });
  `;

        await fs.outputFile(outputPath, content, 'utf-8');
        console.log('Generated main.js');
    } catch (err) {
        console.error('Error generating main.js:', err);
    }
}

generateMainJs();
