import { createRef } from 'react';

import { logger } from './logger';
import { ActionSheetRef } from '@models';

export const actionSheetRef = createRef<ActionSheetRef>();

export const ActionSheetHelper: ActionSheetRef = {
  showWithOptions(options) {
    logger.info('Trying to show action sheet with options: ', options);

    actionSheetRef.current?.showWithOptions(options);
  },
  hide() {
    logger.info('Trying to hide action sheet');

    actionSheetRef.current?.hide();
  },
};
