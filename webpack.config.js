import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
    mode: process.env.NODE_ENV ?? 'development', 
    entry: './src/index.tsx', 
    plugins: [
        new HtmlWebpackPlugin({
            template: 'public/index.html',
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: 'public/static',
                    to: 'static',
                },
                {
                    from: 'public/favicon.ico',
                },
            ],
        }),
    ],
    output: {
        path: resolve(__dirname, 'dist'),
        filename: 'main.js',
        publicPath: '/',
    },
    target: 'web',
    devServer: {
        port: process.env.PORT ?? '3001',
        static: [ './dist' ],
        open: true,
        hot: true,
        historyApiFallback: true,
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js','.jsx','.json' ], 
    },
    module:{
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: resolve(__dirname, 'src'),
                use: 'babel-loader',
            },
            {
                test: /\.(ts|tsx)$/,
                include: resolve(__dirname, 'src'),
                use: 'ts-loader',
            },
            {
                test: /\.css$/,
                include: resolve(__dirname, 'src/styles'),
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            url: false,
                        },
                    }, 
                    'postcss-loader',
                ],
            },
            {
                test: /\.(glsl)(\.template)?$/,
                include: resolve(__dirname, 'src'),
                type: 'asset/source',
            },
        ],
    },
};

