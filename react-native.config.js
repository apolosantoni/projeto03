module.exports = {
  //npx react-native-assets command to link
  dependencies: {
    'react-native-vector-icons': {
      platforms: {
        ios: null,
      },
    },
  },
  project: {
    ios: {},
    android: {},
  },
  assets: ['./assets/fonts'],
};