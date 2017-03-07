import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import StringReplacePlugin from 'string-replace-webpack-plugin';

module.exports = {
    entry: {
        index: [
            './src/js/main.js',
            './src/css/main.scss',
        ],
    },
    output: {
        path: `${__dirname}/public`,
        filename: 'bundle.js',
    },
    module: {
        loaders: [
            { test: /\.html$/, loader: 'html-loader' },
            { test: /\.s?css$/, use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader', 'sass-loader'] }) },
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
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: `${__dirname}/src/index.html`,
            hash: true,
        }),
        new ExtractTextPlugin({ filename: '[name].css', allChunks: false }),
        new CopyWebpackPlugin([
            { from: 'node_modules/bookbuilder/dist/*.png', to: `${__dirname}/public/`, flatten: true },
        ]),
    ],
};
