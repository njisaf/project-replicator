const path = require('path');
const fs = require('fs');
const sveltePreprocess = require('svelte-preprocess');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackShellPluginNext = require('webpack-shell-plugin-next');
const webpackAssetsManifest = require('webpack-assets-manifest');


// Function to generate entry points
function generateEntries(baseDir) {
    const entries = {};
    const componentsDir = path.resolve(__dirname, baseDir);

    fs.readdirSync(componentsDir).forEach(dir => {
        const componentPath = path.join(componentsDir, dir, `${dir}.svelte`);
        if (fs.existsSync(componentPath)) {
            const name = dir.toLowerCase();
            entries[name] = componentPath;
        }
    });

    return entries;
}

// Generate entries for each Svelte component
const entries = generateEntries('./src/components');

module.exports = {
    entry: entries,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'scripts/[name].js',  // Output JavaScript to scripts folder
        publicPath: '/systems/avant/',
    },
    resolve: {
        alias: {
            svelte: path.resolve('node_modules', 'svelte')
        },
        extensions: ['.mjs', '.js', '.svelte'],
        mainFields: ['svelte', 'browser', 'module', 'main'],
        conditionNames: ['svelte', 'browser', 'import']
    },
    module: {
        rules: [
            {
                test: /\.svelte$/,
                use: {
                    loader: 'svelte-loader',
                    options: {
                        preprocess: sveltePreprocess(),
                        compilerOptions: {
                            dev: true
                        },
                        emitCss: true,
                        hotReload: true
                    }
                }
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles/[name].css'  // Output CSS to styles folder
        }),
        new webpackAssetsManifest({
            output: 'assets.json', // Generates assets.json in /dist
            publicPath: '',         // Makes sure the paths are not prefixed
        }),
        new WebpackShellPluginNext({
            onBuildEnd: {
                scripts: ['node templates/generate-system-json.js'],
                blocking: true,
                parallel: false
            }
        }),
        ...Object.keys(entries).map(name => new HtmlWebpackPlugin({
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
            inject: 'body'
        }))
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
        }
    },
    mode: 'development'
};
