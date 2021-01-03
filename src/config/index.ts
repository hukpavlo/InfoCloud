import Config from 'react-native-config';

const config = {
  ENVIRONMENT: Config.ENVIRONMENT as 'development' | 'staging' | 'production',
};

export default config;
