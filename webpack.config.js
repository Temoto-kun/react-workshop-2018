const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const fs = require('fs');

const CHAPTERS_DIR = 'chapters';
let chapters = fs.readdirSync(CHAPTERS_DIR);
chapters = chapters.filter(chapter => !chapter.includes('.'));
chapters.unshift('');

let chapterNames = fs.readFileSync('./src/chapter-names.txt').toString();
chapterNames = chapterNames.split('\n');

module.exports = chapters
	.map((chapter, i) => {
		return {
			mode: 'development',
			entry: i === 0 ? './src/index' : `./chapters/${chapter}/index`,
			output: {
				path: path.resolve(__dirname, 'docs', chapter),
				filename: 'bundle.js'
			},
			module: {
				rules: [
					{
						test: /\.scss$/,
						use: [ 'style-loader', 'css-loader', 'sass-loader' ]
					},
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
				modules: [ 'node_modules' ],
				alias: {
					style: path.resolve(__dirname, 'src/style.scss')
				}
			},
			plugins: [
				new HtmlPlugin({
					title: i === 0 ? 'React Workshop 2018' : `${i}. ${chapterNames[i - 1]}`,
					template: i === 0 ? 'src/index.html' : 'src/chapter.html',
					inject: true,
					templateParameters(compilation, assets, options) {
						return {
							options,
							chapters: chapters.map((chapter, i) => ({
								id: chapter,
								title: i === 0 ? '' : chapterNames[i - 1]
							}))
						}
					}
				})
			],
			stats: 'minimal',
		}
	});
