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
          '@config': './src/config',
          '@models': './src/models',
          '@stores': './src/stores',
          '@typings': './src/typings',
          '@screens': './src/screens',
          '@constants': './src/constants',
          '@navigation': './src/navigation',
          '@components': './src/components',
        },
      },
    ],
  ],
};
