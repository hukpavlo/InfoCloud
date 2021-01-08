import Amplify from 'aws-amplify';

import awsconfig from '../aws-exports';
import { NavigationService } from '@services';

Amplify.configure(awsconfig);

NavigationService.init();
