import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

// Recreate __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load configuration
const configPath = path.resolve(__dirname, 'projectConfig.json');
const outputPath = path.resolve(__dirname, '../dist', 'template.json');

async function generateTemplateJson() {
    try {
        const { components } = await fs.readJSON(configPath);

        const content = {
            Actor: {
                types: ["character"],
                character: {
                    type: "character",
                    characterName: "",
                    level: 1,
                    attributes: {
                        focus: 0,
                        grace: 0,
                        intellect: 0,
                        might: 0
                    },
                    skills: {
                        combat: 0,
                        social: 0,
                        investigative: 0,
                        magical: 0
                    },
                    health: {
                        current: 10,
                        max: 10
                    },
                    actionPoints: 3
                }
            }
        };

        await fs.outputFile(outputPath, JSON.stringify(content, null, 2), 'utf-8');
        console.log('Generated template.json');
    } catch (err) {
        console.error('Error generating template.json:', err);
    }
}

generateTemplateJson();
