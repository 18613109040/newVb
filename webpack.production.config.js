const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');
const cssnano = require('cssnano');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const Visualizer = require('webpack-visualizer-plugin');
//这里我们使用webpack-bundle-analyzer来分析 Webpack 生成的包体组成并且以可视化的方式反馈给开发者
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const otherPlugins = process.argv[1].indexOf('webpack-dev-server') >= 0 ? [] : [
    new Visualizer(), // remove it in production environment.
    new BundleAnalyzerPlugin({
        defaultSizes: 'parsed',
        // generateStatsFile: true,
        statsOptions: {source: false}
    }), // remove it in production environment.
];
const postcssOpts = {
    ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
    plugins: () => [
        autoprefixer({
            browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4'],
        }),
        pxtorem({rootValue: 100, propWhiteList: []})
    ],
    cssnano
};
module.exports = {
    devtool: 'source-map', // or 'inline-source-map
    entry: {"index": path.resolve(__dirname, 'src/index')},
    output: {
        path: path.join(__dirname, '/dist'),
        filename: '[name].[hash].js',
        chunkFilename: '[name].[hash].check.js',
        publicPath: ''
    },
    resolve: {
        modules: [path.resolve(__dirname, 'node_modules'), path.join(__dirname, 'src')],
        extensions: ['.web.js', '.jsx', '.js', '.json'],
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    plugins: [
                        "transform-decorators-legacy",
                        "transform-class-properties",
                        'external-helpers', // why not work?
                        ["transform-runtime", {polyfill: false}],
                        ["import", [{"style": true, "libraryName": "antd-mobile"}]] // css  `style: true` 会加载 less 文件
                    ],
                    presets: ['es2015', 'stage-0', 'react', 'stage-3']
                    //presets: [['es2015', { modules: false }], 'stage-0', 'react'] // tree-shaking
                }
            },
            {test: /\.(jpg|png)$/, loader: "url-loader?limit=1024"},
            // 注意：如下不使用 ExtractTextPlugin 的写法，不能单独 build 出 css 文件
            // { test: /\.less$/i, loaders: ['style-loader', 'css-loader', 'less-loader'] },
            // { test: /\.css$/i, loaders: ['style-loader', 'css-loader'] },
            {
                test: /\.less$/i,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: postcssOpts
                        }, {
                            loader: 'less-loader', options: {modifyVars: {"@hd": "2px", "@brand-primary": "#FAC34C"}}
                        }
                    ]
                })
            },
            {
                test: /\.scss$/i,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: postcssOpts
                        },
                        'sass-loader'
                    ]
                })
            },
            {
                test: /\.css$/i, use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: postcssOpts
                    }
                ]
            })
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.ModuleConcatenationPlugin(),
        // new webpack.optimize.CommonsChunkPlugin('shared.js'),
        new webpack.optimize.CommonsChunkPlugin({
            // minChunks: 2,
            name: 'shared', //对应于上面的entry的key  将index 打包命名 shared name 可以是个数组 [a,n,]
            filename: 'shared.js'
        }),
        new ExtractTextPlugin({filename: '[name].css', allChunks: false}),
        new HtmlWebpackPlugin({
            hash:true,
            template: './views/tpl/index.tpl.html',
            inject: 'body' //单独webpack
        }),
        //...otherPlugins
    ]
}
