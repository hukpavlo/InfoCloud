import { initSchema } from '@aws-amplify/datastore';

import { schema } from './schema';

const { Folder } = initSchema(schema);

export { Folder };
