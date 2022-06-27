const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetPlugin = require("optimize-css-assets-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const isDev = process.env.NODE_ENV === "development";
const isProd = !isDev;

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: "all",
    },
  };

  if (isProd) {
    config.minimizer = [
      new OptimizeCssAssetPlugin(),
      new TerserWebpackPlugin(),
    ];
  }

  return config;
};

const filename = (ext) => (isDev ? `[name].${ext}` : `[name].[hash].${ext}`);

const tsLoaders = (extraPreset) => {
  const defaultLoaders = [
    {
      loader: "babel-loader",
      options: {
        presets: ["@babel/preset-env", "@babel/preset-typescript"],
      },
    },
  ];

  if (extraPreset) {
    defaultLoaders[0].options.presets.push(extraPreset);
  }

  return defaultLoaders;
};

const getPlugins = () => {
  const defaultPlugins = [
    new HTMLWebpackPlugin({
      template: "./index.html",
      minify: {
        collapseWhitespace: !isDev,
      },
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: filename("css"),
    }),
  ];

  if (isProd) {
    defaultPlugins.push(new BundleAnalyzerPlugin());
  } else {
    defaultPlugins.push(new ESLintPlugin());
  }

  return defaultPlugins;
};

module.exports = {
  context: path.resolve(__dirname, "app"),
  mode: "development",
  entry: "./app.tsx",
  devServer: {
    port: 3100,
    hot: isDev,
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: filename("js"),
  },
  resolve: {
    extensions: [".json", ".tsx", ".ts", ".js"],
  },
  optimization: optimization(),
  plugins: getPlugins(),
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev,
              reloadAll: true,
            },
          },
          "css-loader",
        ],
      },
      {
        test: /\.(png|jpg|svg)$/,
        use: ["file-loader"],
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: tsLoaders(),
      },
      {
        test: /\.tsx$/,
        exclude: /node_modules/,
        use: tsLoaders("@babel/preset-react"),
      },
    ],
  },
  devtool: isDev ? "source-map" : "",
};
