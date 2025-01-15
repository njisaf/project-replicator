import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { sveltePreprocess } from 'svelte-preprocess';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackShellPluginNext from 'webpack-shell-plugin-next';
import WebpackAssetsManifest from 'webpack-assets-manifest';

// Recreate __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to generate entry points
function generateEntries(baseDir) {
    const entries = {};
    const componentsDir = path.resolve(__dirname, baseDir);

    fs.readdirSync(componentsDir).forEach((dir) => {
        const componentPath = path.join(componentsDir, dir, `${dir}.svelte`);
        if (fs.existsSync(componentPath)) {
            const name = dir;
            entries[name] = componentPath;
        }
    });

    return entries;
}

// Generate entries for each Svelte component
const entries = generateEntries('./src/components');

export default {
    entry: {
        ...entries,
        'module/data/character': './src/module/data/character.ts'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'scripts/[name].js', // Output JavaScript to scripts folder
        publicPath: '/systems/avant/', // Public path for FoundryVTT
        library: {
            type: 'module'
        }
    },
    experiments: {
        outputModule: true
    },
    resolve: {
        // alias: {
        //     svelte: path.resolve('node_modules', 'svelte'), // Correct Svelte alias
        // },
        extensions: ['.mjs', '.js', '.svelte', '.ts'], // Include all relevant extensions
        mainFields: ['svelte', 'browser', 'module', 'main'],
        conditionNames: ['svelte', 'browser', 'import'],
    },
    module: {
        rules: [
            // Handle .svelte.ts files with TypeScript and Svelte preprocess
            {
                test: /\.svelte\.ts$/,
                use: ['ts-loader', 'svelte-loader'],
            },
            // Handle other .svelte files
            {
                test: /\.(svelte|svelte\.js)$/,
                use: {
                    loader: 'svelte-loader',
                    options: {
                        preprocess: sveltePreprocess(),
                        emitCss: true, // Enables CSS extraction
                    },
                },
            },
            // Handle TypeScript files excluding .svelte.ts
            {
                test: /(?<!\.svelte)\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            // CSS loader
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            // Fix Webpack 5 fully-specified imports
            {
                test: /node_modules\/svelte\/.*\.mjs$/,
                resolve: {
                    fullySpecified: false,
                },
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(), // Cleans /dist before every build
        new MiniCssExtractPlugin({
            filename: 'styles/[name].css', // Output CSS to styles folder
        }),
        new WebpackAssetsManifest({
            output: 'assets.json', // Generates assets.json in /dist
            publicPath: '', // Ensures paths are not prefixed
        }),
        new WebpackShellPluginNext({
            onBuildEnd: {
                scripts: [
                    'node templates/generate-system-json.js',
                    'node templates/generate-template-json.js',
                    'node templates/generate-main-js.js'
                ],
                blocking: true,
                parallel: false,
            },
        }),
        ...Object.keys(entries).map(
            (name) =>
                new HtmlWebpackPlugin({
                    filename: `templates/${name}.html`, // Output HTML template for each component
                    chunks: [name],
                    templateContent: `
            <html>
              <head>
                <link rel="stylesheet" href="styles/${name}.css">
              </head>
              <body>
                <div id="${name}"></div>
              </body>
            </html>
          `,
                    inject: 'body',
                })
        ),
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 8080,
        hot: true,
        liveReload: true,
        open: true,
        devMiddleware: {
            writeToDisk: true,
        },
    },
    mode: 'development',
};
