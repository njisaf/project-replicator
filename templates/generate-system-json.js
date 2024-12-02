import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

// Recreate __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const templatePath = path.resolve(__dirname, 'system-template.json');
const assetsPath = path.resolve(__dirname, '../dist', 'assets.json'); // Location of assets.json
const outputPath = path.resolve(__dirname, '../dist', 'system.json'); // Output location for system.json

async function generateSystemJson() {
    try {
        const template = JSON.parse(fs.readFileSync(templatePath, 'utf-8'));
        const assets = JSON.parse(fs.readFileSync(assetsPath, 'utf-8'));

        // Ensure correct relative paths
        const normalizePath = (assetPath) => {
            return assetPath.replace(/^dist\//, ''); // Remove "dist/" prefix
        };

        // Extract scripts and styles, normalizing paths
        const scripts = [];
        const styles = [];
        for (const assetName in assets) {
            if (assetName.endsWith('.js')) {
                scripts.push(normalizePath(`scripts/${path.basename(assetName)}`));
            } else if (assetName.endsWith('.css')) {
                styles.push(normalizePath(`styles/${path.basename(assetName)}`));
            }
        }

        // Add scripts and styles to template
        template.esmodules = scripts;
        template.styles = styles;

        // Write final system.json
        fs.writeFileSync(outputPath, JSON.stringify(template, null, 2));
        console.log('system.json has been generated successfully!');
    } catch (err) {
        console.error('Error generating system.json:', err);
    }
}

generateSystemJson();
