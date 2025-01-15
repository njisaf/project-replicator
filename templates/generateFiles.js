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

// Run generators
function main() {
    // main.js and template.json now handled by webpack plugins
    console.log('All files now handled by webpack plugins');
}

main();
