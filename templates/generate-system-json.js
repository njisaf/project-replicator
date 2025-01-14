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
        const scripts = ["scripts/main.js"]; // Ensure main.js is always included
        const styles = [];
        const templatePaths = [];

        for (const assetName in assets) {
            if (assetName.endsWith('.js')) {
                scripts.push(`scripts/${assetName}`);
            } else if (assetName.endsWith('.css')) {
                styles.push(`styles/${assetName}`);
            } else if (assetName.endsWith('.html')) {
                templatePaths.push(`templates/${assetName}`);
            }
        }

        // Generate sheetClasses dynamically (optional, can be skipped if not needed)
        const sheetClasses = {
            character: {
                default: {
                    label: "Character Sheet",
                    path: "templates/charactersheet.html",
                    type: "character",
                },
            },
        };

        // Merge the generated data into the template
        const content = {
            ...template,
            esmodules: scripts,
            styles: styles,
            templatePaths: templatePaths,
            sheetClasses: sheetClasses, // Add this if needed
        };

        // Write the final system.json
        fs.writeFileSync(outputPath, JSON.stringify(content, null, 2));
        console.log('system.json has been generated successfully!');
    } catch (err) {
        console.error('Error generating system.json:', err);
    }
}

generateSystemJson();
