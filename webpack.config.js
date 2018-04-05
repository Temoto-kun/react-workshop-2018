const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        'chapter-01': './src/chapter-01/index',
        'chapter-02': './src/chapter-02/index'
    },
    output: {
        path: path.resolve(__dirname, 'docs'),
        filename: '[name]/bundle.js'
    },
    plugins: [
        new HtmlPlugin({
            filename: '[name]/index.html'
        })
    ]
};
