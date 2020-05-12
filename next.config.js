module.exports = {
    webpack: (config, options) => {
      config.module.rules.push({
        test: /\.(png|jpg|gif)$/,
        use: [
            {
                loader: "file-loader",
                options: {},
            },
        ],
      })
  
      return config
    },
    devIndicators: {
        autoPrerender: false,
    }
}