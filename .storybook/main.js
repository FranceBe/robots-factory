const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = {
  stories: ['../src/**/**/stories/*.story.@(js|jsx|ts|tsx|mdx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  webpackFinal: (config) => {
    config.resolve.plugins = [
      ...(config.resolve.plugins || []),
      new TsconfigPathsPlugin({
        extensions: config.resolve.extensions,
      }),
    ]
    config.module.rules.push({
      test: /\.(woff|woff2|ttf|eot|otf|svg)$/,
      use: { loader: 'url-loader?limit=100000' },
    })

    return config
  },
  core: {
    builder: 'webpack5',
  },
}
