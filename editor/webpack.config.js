const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const path = require('path');

module.exports = (_, args) => {
    const production = args.mode === 'production';

    return {
        module: {
            rules: [
                {
                    test: /(\.ts|\.tsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                        },
                    },
                },
                {
                    test: /\.css$/,
                    use: [
                        { loader: 'style-loader' },
                        { loader: 'css-loader', options: { modules: true } },
                    ],
                },
            ],
        },

        resolve: {
            extensions: ['.ts', '.js', '.tsx', '.css'],
        },

        entry: './src/index.tsx',

        output: {
            filename: 'index.js',
            path: path.resolve(__dirname, 'dist'),
            publicPath: '/dist',
        },

        plugins: [
            new ForkTsCheckerWebpackPlugin({
                watch: ['./src'],
            }),
        ],

        devtool: production ? false : 'source-map',

        devServer: {
            host: '0.0.0.0',
            port: 3000,
            stats: {
                modules: false,
            },
            disableHostCheck: true,
        },
    };
};
