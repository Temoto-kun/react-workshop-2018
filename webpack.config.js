const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const fs = require('fs');

let chapters = fs.readdirSync('src');
chapters = chapters.filter(chapter => !chapter.includes('.'));
chapters.unshift('');

module.exports = chapters
	.map((chapter, i) => {
		return {
			mode: 'development',
			entry: i === 0 ? './src/index' : `./src/${chapter}/index`,
			output: {
				path: path.resolve(__dirname, 'docs', chapter),
				filename: 'bundle.js'
			},
			module: {
				rules: [
					{
						test: /\.js$/,
						use: {
							loader: 'babel-loader',
							query: {
								compact: true
							}
						}
					},
					{
						test: /\.css$/,
						use: [ 'style-loader', 'css-loader' ]
					},
					{
						test: /\.(gif|jpe?g|png)$/,
						use: [ 'file-loader' ]
					}
				],
			},
			resolve: {
				modules: [ 'node_modules' ]
			},
			plugins: [
				new HtmlPlugin({
					title: i === 0 ? 'React Workshop 2018' : `Chapter ${i} | React Workshop 2018`,
					template: i === 0 ? 'src/index.html' : 'src/chapter.html',
					inject: true,
					templateParameters(compilation, assets, options) {
						return {
							options,
							chapters
						}
					}
				})
			],
			stats: 'minimal',
		}
	});
