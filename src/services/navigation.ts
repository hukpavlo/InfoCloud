import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { withNavigationProvider } from 'react-native-navigation-hooks';

import { ButtonId, ScreenName } from '@constants';
import { Folder, FolderCreate, FolderList, Settings } from '@screens';

export class NavigationService {
  static init() {
    Navigation.registerComponent(ScreenName.FOLDER, () => Folder);
    Navigation.registerComponent(ScreenName.SETTINGS, () => Settings);
    Navigation.registerComponent(ScreenName.FOLDER_LIST, () => withNavigationProvider(FolderList));
    Navigation.registerComponent(ScreenName.FOLDER_CREATE, () => withNavigationProvider(FolderCreate));

    Navigation.events().registerAppLaunchedListener(async () => {
      Navigation.setRoot({
        root: {
          bottomTabs: {
            children: [
              {
                stack: {
                  children: [
                    {
                      component: {
                        name: ScreenName.FOLDER_LIST,
                        options: {
                          topBar: {
                            title: {
                              text: 'Folders',
                            },
                            rightButtons: [
                              {
                                text: 'Create',
                                id: ButtonId.FOLDER_CREATE,
                              },
                            ],
                          },
                          bottomTab: {
                            text: 'Folders',
                            iconColor: 'grey',
                            textColor: 'grey',
                            selectedIconColor: 'rgb(0, 122, 255)',
                            selectedTextColor: 'rgb(0, 122, 255)',
                            icon: await Icon.getImageSource('folder', 30),
                          },
                        },
                      },
                    },
                  ],
                },
              },
              {
                stack: {
                  children: [
                    {
                      component: {
                        name: ScreenName.SETTINGS,
                        options: {
                          bottomTab: {
                            text: 'Settings',
                            iconColor: 'grey',
                            textColor: 'grey',
                            selectedIconColor: 'rgb(0, 122, 255)',
                            selectedTextColor: 'rgb(0, 122, 255)',
                            icon: await Icon.getImageSource('cog', 35),
                          },
                        },
                      },
                    },
                  ],
                },
              },
            ],
            options: {
              bottomTabs: {
                backgroundColor: '#f7f7f7',
              },
            },
          },
        },
      });
    });
  }

  static getFolderScreenOptions(name: string) {
    return {
      component: {
        name: ScreenName.FOLDER,
        options: {
          topBar: {
            title: {
              text: name,
            },
          },
          bottomTabs: {
            visible: false,
            drawBehind: true,
          },
        },
      },
    };
  }

  static folderCreateModalStack = {
    stack: {
      children: [
        {
          component: {
            name: ScreenName.FOLDER_CREATE,
            options: {
              topBar: {
                title: {
                  text: 'Modal',
                },
                leftButtons: [
                  {
                    text: 'Cancel',
                    id: ButtonId.FOLDER_CREATE_CANCEL,
                  },
                ],
                rightButtons: [
                  {
                    text: 'Save',
                    id: ButtonId.FOLDER_CREATE_SAVE,
                  },
                ],
              },
            },
          },
        },
      ],
    },
  };
}
