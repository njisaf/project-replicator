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
            Actor: components.reduce((acc, component) => {
                acc[component.type] = component.template;
                return acc;
            }, {})
        };

        await fs.outputFile(outputPath, JSON.stringify(content, null, 2), 'utf-8');
        console.log('Generated template.json');
    } catch (err) {
        console.error('Error generating template.json:', err);
    }
}

generateTemplateJson();
