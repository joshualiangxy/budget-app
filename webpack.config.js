const path = require("path");

module.exports = {
    mode: "development",
    entry: "./src/app.js",
    output: {
        path: path.join(__dirname, "public"),
        filename: "bundle.js"
    },
    module: {
        rules: [{
            loader: "babel-loader",
            test: /\.js$/,
            exclude: /node_modules/
        }, {
            use: [
                "style-loader",
                "css-loader",
                "sass-loader"
            ],
            test: /\.s?css$/
        }]
    },
    devtool: 'eval-cheap-module-source-map',
    devServer: {
        contentBase: path.join(__dirname, "public"),
        historyApiFallback: true
    }
};