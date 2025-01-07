import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import StringReplacePlugin from 'string-replace-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import BrowserSyncPlugin from 'browser-sync-webpack-plugin';
import ScriptExtHtmlWebpackPlugin from 'script-ext-html-webpack-plugin';

const env = process.env.NODE_ENV || 'development';

const config = {
    entry: {
        index: [
            './src/js/main.js',
            './src/css/main.scss',
        ],
    },
    output: {
        path: `${__dirname}/public`,
        filename: (env === 'production') ? 'bundle-[hash].js' : 'bundle.js',
    },
    module: {
        rules: [
            { test: /\.html$/, loader: 'html-loader?minimize=false' },
            { test: /\.s?css$/, use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader', 'sass-loader', 'postcss-loader'] }) },
            { test: /\.jsx?$/, use: 'babel-loader', exclude: /node_modules/ },
            {
                test: /\.(png|ico|jpg|gif|svg|woff2?|eot|otf|ttf)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: '[name]-[hash:7].[ext]',
                },
            },
            {
                test: /\.js$/,
                loader: StringReplacePlugin.replace({
                    replacements: [
                        { pattern: /global\.MutationObserver/g, replacement: () => 'window.MutationObserver' },
                        { pattern: /global\.WebKitMutationObserver/g, replacement: () => 'window.WebKitMutationObserver' },
                    ],
                }),
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({ filename: 'index.html', template: `${__dirname}/src/index.html`, hash: true }),
        new HtmlWebpackPlugin({ filename: 'legal.html', template: `${__dirname}/src/templates/legal.html`, hash: true }),
        new HtmlWebpackPlugin({ filename: 'shop.html', template: `${__dirname}/src/templates/shop.html`, hash: true }),
        new ExtractTextPlugin({ filename: '[name].css', allChunks: false }),
        new ScriptExtHtmlWebpackPlugin({ defaultAttribute: 'async' }),
        new CopyWebpackPlugin([{ from: './static/' }]),
    ],
};

if (env === 'development') {
    config.plugins.push(new BrowserSyncPlugin({ host: 'localhost', port: 3000, server: { baseDir: ['public'] } }));
}

export default config;
