const path = require("path");
const compression = require("compression");
const dotenv = require("dotenv");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const TerserPlugin = require("terser-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const WorkerPlugin = require("worker-plugin");
const Dotenv = require("dotenv-webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const sourcePath = path.join(__dirname, "./src");
const outputhPath = path.resolve(__dirname, "./dist");

dotenv.config();

const webpackConfig = {
    target: ['web', 'es2018'],
    mode: process.env.NODE_ENV,
    // devtool: "source-map",
    // entry: "./index.tsx",
    // output: {
    //     path: outputhPath,
    //     filename: "[name].[contenthash].js",
    //     chunkFilename: "[name]-[contenthash].js",
    // },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "sass-loader",
                        options: {
                            sassOptions: {
                                includePaths: [`${sourcePath}/styles`],
                            },
                            sourceMap: true,
                        },
                    },
                ],
            },
        ],
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                test: /\.js(\?.*)?$/i,
            }),
        ],
        // runtimeChunk: true,
        splitChunks: {
            chunks: "all",
            //     maxInitialRequests: Infinity,
            //     minSize: 0,
            //     cacheGroups: {
            //         reactVendors: {
            //             test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            //             idHint: "react~vendors",
            //         },
            //     },
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(sourcePath,"assets/index.html"),
            favicon: path.resolve(sourcePath,"assets/icon.ico"),
            inlineSource: "runtime~.+\\.js",
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css",
            chunkFilename: "[id].css",
        }),
        new WorkboxWebpackPlugin.GenerateSW({
            clientsClaim: true,
            runtimeCaching: [
                {
                    urlPattern: /^https?.*/,
                    handler: "NetworkFirst",
                    options: {
                        cacheName: "MyPwaCache",
                        expiration: {
                            maxEntries: 200,
                        },
                    },
                },
            ],
        }),
        new CompressionPlugin(),
        new BundleAnalyzerPlugin({
            analyzerMode: "static",
            openAnalyzer: false,
        }),
        new WebpackPwaManifest({
            name: "My Progressive Web App",
            short_name: "MyPWA",
            description: "My Awesome Progressive Web App!",
            background_color: "#fff",
            theme_color: "#fff",
            display: "standalone",
            start_url: ".",
            orientation: "portrait",
            icons: [
                {
                    src: path.resolve(sourcePath, "assets/icon.png"),
                    sizes: [192, 256, 512],
                    ios: true,
                },
            ],
            ios: {
                "apple-mobile-web-app-title": "MyPWA",
                "apple-mobile-web-app-capable": true,
                "apple-mobile-web-app-status-bar-style": "black",
            },
        }),
        new Dotenv({
            path: path.join(__dirname, "./.env"),
            systemvars: true,
        }),
        new WorkerPlugin(),
    ],
    devServer: {
        compress: true,
        port: process.env.PORT,
        before(app) {
            app.use(compression({}));
        },
    },
};

module.exports = webpackConfig;
