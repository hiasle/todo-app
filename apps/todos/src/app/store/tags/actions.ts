import { TagsModel } from '../tags.state';

export namespace Tag {
  export class AddTag {
    static readonly type = '[Tag] Add Tag';
    constructor(public tag: TagsModel) {}
  }
}
