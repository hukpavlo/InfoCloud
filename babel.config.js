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
          '@config': './src/config',
          '@screens': './src/screens',
          '@constants': './src/constants',
          '@components': './src/components',
        },
      },
    ],
  ],
};
