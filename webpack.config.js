const webpack = require('webpack');

const path = require('path');
const fs = require('fs');


const ROOT_DIR = path.resolve(path.dirname(__filename));

const SRC_DIR = path.resolve(ROOT_DIR, 'js');

const Package = require(path.resolve(ROOT_DIR, 'package.json'));

const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const isDebug = env => ['production', 'prod', 'staging'].indexOf(env) < 0;
const isDev = env => ['development', 'dev'].indexOf(env) > -1;

const getPlugins = env => {
    let plugs = [
        new ExtractTextPlugin({
            filename: 'app.css',
            allChunks: true,
            ignoreOrder: true,
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: {
                discardComments: {
                    removeAll: true
                }
            },
            canPrint: true
        })
    ];
    if (!isDev(env)) {
        plugs.push(
            new CleanWebpackPlugin(['web'], {
                root: ROOT_DIR,
                verbose: true,
                dry: false
            }),
            new webpack.optimize.ModuleConcatenationPlugin()
        );
    } else {
        plugs.push(
            new webpack.NamedModulesPlugin(),
            new webpack.NamedChunksPlugin(),
            new webpack.HotModuleReplacementPlugin()
        );
    }
    return plugs;
};

const getSources = env => {
    let appSources = [
        'isomorphic-fetch',
        path.join(SRC_DIR, 'app')
    ];
    if (isDev(env))
        appSources.unshift(
            'webpack-dev-server/client?http://localhost:8080',
            'webpack/hot/only-dev-server',
            'react-hot-loader/patch'
        );

    return appSources;
}

const babelPlugins = env => {
    let plugs = [];
    if (isDev(env))
        plugs.push(...['react-hot-loader/babel']);
    if (!isDebug(env))
        plugs.push(...[
            '@babel/transform-react-constant-elements',
            '@babel/transform-react-inline-elements',
            'transform-react-remove-prop-types'
        ]);
    return plugs;
};

const cssChain = env => [{
        loader: 'css-loader',
        options: {
            camelCase: true,
            minimize: !isDebug(env),
            sourceMap: isDebug(env),
        }
    },
    {
        loader: 'resolve-url-loader',
        options: {
            sourceMap: true
        }
    },
    {
        loader: 'sass-loader',
        options: {
            sourceMap: true
        }
    }
];

const styleConfig = env => {
    if (isDev(env))
        return ['style-loader'].concat(cssChain(env));
    else
        return ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: cssChain(env)
        });
};

const getDefaultConfig = env => ({
    target: 'web',
    stats: "minimal",
    entry: getSources(env),
    output: {
        path: path.resolve(ROOT_DIR, 'web'),
        publicPath: '/web/',
        filename: 'app.js',
        globalObject: 'this'
    },
    module: {
        rules: [{
                test: /\.jsx?$/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                        plugins: babelPlugins(env)
                    }
                }],
                exclude: /(node_modules)/,
            },
            {
                test: /\.(gif|png|jpe?g)$/i,
                use: [{
                        loader: "file-loader",
                        options: {
                            outputPath: 'img/',
                            name: '[name].[ext]',
                            publicPath: '/web/img/',
                            emitFile: true,
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            disable: isDev(env),
                            optipng: {
                                optimizationLevel: 7
                            },
                            gifsicle: {
                                interlaced: false
                            },
                            pngquant: {
                                quality: '65-90',
                                speed: 4
                            },
                            mozjpeg: {
                                quality: 65,
                                progressive: true
                            },
                            svgo: {
                                plugins: [{
                                        removeViewBox: false
                                    },
                                    {
                                        removeEmptyAttrs: true
                                    }
                                ]
                            }
                        }
                    }
                ]
            },
            {
                test: /\.s?css$/,
                use: styleConfig(env),
            }
        ]
    },
    optimization: {},
    plugins: getPlugins(env),
    resolve: {
        alias: {
            'lodash-es': 'lodash',
        },
        extensions: ['.js', '.jsx'],
    }
});

let config = {},
    env = process.env.NODE_ENV || 'dev';

console.log(`Running in ${env} mode`);
try {
    config = require(`./webpack.config.${env}`);
} catch (e) {
    throw new Error("Environment is not defined: " + env);
    process.exit();
}

module.exports = Object.assign(
    getDefaultConfig(env),
    config
);