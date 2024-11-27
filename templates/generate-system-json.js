const fs = require('fs');
const path = require('path');

const templatePath = path.resolve(__dirname, 'system-template.json');
const assetsPath = path.resolve(__dirname, '../dist', 'assets.json');
const outputPath = path.resolve(__dirname, '../dist', 'system.json');

async function generateSystemJson() {
    try {
        const template = JSON.parse(fs.readFileSync(templatePath, 'utf-8'));
        const assets = JSON.parse(fs.readFileSync(assetsPath, 'utf-8'));

        // Filter scripts and styles from assets.json
        const scripts = [];
        const styles = [];
        for (const assetName in assets) {
            if (assetName.endsWith('.js')) {
                scripts.push(`scripts/${assetName}`);
            } else if (assetName.endsWith('.css')) {
                styles.push(`styles/${assetName}`);
            }
        }

        // Add generated script and style references to the template
        template.scripts = scripts;
        template.styles = styles;

        // Write the final system.json
        fs.writeFileSync(outputPath, JSON.stringify(template, null, 2));
        console.log('system.json has been generated successfully!');
    } catch (err) {
        console.error('Error generating system.json:', err);
    }
}

generateSystemJson();
