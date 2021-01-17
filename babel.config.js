module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@assets': 'assets',
          '@hooks': './src/hooks',
          '@stacks': './src/stacks',
          '@config': './src/config',
          '@models': './src/models',
          '@stores': './src/stores',
          '@screens': './src/screens',
          '@datastore': './src/datastore',
          '@constants': './src/constants',
          '@components': './src/components',
        },
      },
    ],
  ],
};
