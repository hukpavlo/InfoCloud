export const schema = {
  models: {
    Folder: {
      name: 'Folder',
      fields: {
        id: {
          name: 'id',
          isArray: false,
          type: 'ID',
          isRequired: true,
          attributes: [],
        },
        name: {
          name: 'name',
          isArray: false,
          type: 'String',
          isRequired: true,
          attributes: [],
        },
        thumb: {
          name: 'thumb',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: [],
        },
      },
      syncable: true,
      pluralName: 'Folders',
      attributes: [
        {
          type: 'model',
          properties: {},
        },
        {
          type: 'auth',
          properties: {
            rules: [
              {
                provider: 'userPools',
                ownerField: 'owner',
                allow: 'owner',
                identityClaim: 'cognito:username',
                operations: ['create', 'update', 'delete', 'read'],
              },
              {
                allow: 'public',
                operations: ['create', 'update', 'delete', 'read'],
              },
            ],
          },
        },
      ],
    },
  },
  enums: {},
  nonModels: {},
  version: 'ffb399f56d51b58ec385c4193066d2be',
};
