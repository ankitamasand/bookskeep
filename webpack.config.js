const HTMLWebpackPlugin = require("html-webpack-plugin")

module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ["style-loader", "css-loader", "sass-loader"]
            }
        ]
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        })
    ]
}
