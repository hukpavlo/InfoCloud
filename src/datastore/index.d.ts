import { ModelInit, MutableModel } from '@aws-amplify/datastore';

export declare class Folder {
  readonly id: string;
  readonly name: string;
  readonly thumb: string;
  constructor(init: ModelInit<Folder>);
  static copyOf(
    source: Folder,
    mutator: (draft: MutableModel<Folder>) => MutableModel<Folder> | void,
  ): Folder;
}
