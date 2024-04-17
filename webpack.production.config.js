var webpack = require("webpack");
const path = require("path");
const fs = require('fs');
const HtmlCriticalWebpackPlugin = require("html-critical-webpack-plugin");


// include the js minification plugin
const TerserPlugin = require('terser-webpack-plugin');

// include the css extraction and minification plugins
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

// include the HTML templating plugin
const HTMLWebpackPlugin = require("html-webpack-plugin");
const HtmlBeautifyPlugin = require('html-beautify-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');

function generateHtmlPlugins (templateDir) {
    const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir))
    return templateFiles.map(item => {
      // Split names and extension
      const parts = item.split('.')
      const name = parts[0]
      const extension = parts[1]
      return new HTMLWebpackPlugin({
        filename: `${name}.html`,
        template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`)
      })
    })
  }
  
  // We will call the function like this:
  const htmlPlugins = generateHtmlPlugins('./src/pages')

module.exports = {
    entry: ["./src/js/app.js", "./src/scss/main.scss"],
    output: {
        filename: "js/main.[hash:8].js",
        path: path.join(__dirname, "./build/"),
        chunkFilename: 'js/chunks/[name].js'

    },
    devServer: {
        contentBase: "./build",
        host: '0.0.0.0',
        useLocalIp: true,
    },
    
    module: {
        rules: [
            // perform js babelization on all .js files
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/',
                        publicPath: '../',
                        emitFile: true,
                        esModule: false,
                    }
                }]
            },
            {
                test: /\.(svg|png|jpe?g|webp)/i,
                use: [{
                        loader: require.resolve("url-loader"),
                        options: {
                            name: "./images/[name].[ext]",
                            limit: 5000
                        }
                    },
                    {
                        loader: "img-loader"
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            url: false,
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            url: false,
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                          sourceMap: true,
                          config: {
                            path: 'postcss.config.js'
                          }
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "css/main.[contenthash:8].css",
            insert: (linkTag) => {
                const preloadLinkTag = document.createElement('link')
                preloadLinkTag.rel = 'preload'
                preloadLinkTag.as = 'style'
                preloadLinkTag.href = linkTag.href
                document.head.appendChild(preloadLinkTag)
                document.head.appendChild(linkTag)
            }

        }),
        new CopyWebpackPlugin([{
            from: 'src/images',
            to: 'images'
        }]),
        new CopyWebpackPlugin([{
            from: 'src/fonts',
            to: 'fonts'
        }]),
        new HtmlCriticalWebpackPlugin({
            base: path.resolve(__dirname, 'build'),
            src: 'index.html',
            dest: 'index.html',
            inline: true,
            minify: true,
            extract: true,
            width: 375,
            height: 565,
            penthouse: {
              blockJSRequests: false,
            }
        }),
        /*new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),*/
       
    ]
    .concat(htmlPlugins)
    .concat(new HtmlBeautifyPlugin({
        config: {
            html: {
                end_with_newline: true,
                indent_size: 2,
                indent_with_tabs: true,
                indent_inner_html: true,
                preserve_newlines: true,
                unformatted: ['p', 'i', 'b', 'span']
            }
        }
    })),
    optimization: {
        minimizer: [
            // enable the js minification plugin
            new TerserPlugin({
                cache: true,
                parallel: true,
                sourceMap: true,
                terserOptions: {
                    output: {
                        comments: false,
                    },
                },
            }),
            // enable the css minification plugin
            new OptimizeCSSAssetsPlugin({})
        ]
    }/*,
    resolve: {
        alias: {
            jquery: "jquery/src/jquery"
        }
    }*/
};