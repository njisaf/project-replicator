import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

// Recreate __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const templatePath = path.resolve(__dirname, 'system-template.json');
const assetsPath = path.resolve(__dirname, '../dist', 'assets.json');
const outputPath = path.resolve(__dirname, '../dist', 'system.json');

async function generateSystemJson() {
    try {
        const template = JSON.parse(fs.readFileSync(templatePath, 'utf-8'));
        const assets = JSON.parse(fs.readFileSync(assetsPath, 'utf-8'));

        // Extract scripts and styles from assets.json
        const scripts = [
            "scripts/module/data/character.js",
            "scripts/main.js"
        ]; // Ensure correct module load order
        const styles = [];
        const templatePaths = [];

        for (const assetName in assets) {
            if (assetName.endsWith('.js') && !scripts.includes(`scripts/${assetName}`)) {
                scripts.push(`scripts/${assetName}`);
            } else if (assetName.endsWith('.css')) {
                styles.push(`styles/${assetName}`);
            } else if (assetName.endsWith('.html')) {
                templatePaths.push(`templates/${assetName}`);
            }
        }

        // Merge the generated data into the template
        const content = {
            ...template,
            esmodules: scripts,
            styles: styles,
            templatePaths: templatePaths.map(path => path.replace('templates/templates/', 'templates/').replace('charactersheet.html', 'characterSheet.html'))
        };

        // Write the final system.json
        fs.writeFileSync(outputPath, JSON.stringify(content, null, 2));
        console.log('system.json has been generated successfully!');
    } catch (err) {
        console.error('Error generating system.json:', err);
    }
}

generateSystemJson();
