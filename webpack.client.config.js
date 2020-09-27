const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');


module.exports = {
    entry: './src/client/app.jsx',
    output: {
        path: path.join(__dirname, 'dist', 'client'),
        filename: 'client-bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/index.html"
        })
    ]
};
