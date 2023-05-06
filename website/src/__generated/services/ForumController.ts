import type { Executor } from '../';
import type { ThreadDto } from '../model/dto';

export class ForumController {
    
    constructor(private executor: Executor) {}
    
    async threads(options: ForumControllerOptions['threads']): Promise<
        ReadonlyArray<ThreadDto['ForumController/DEFAULT_THREAD']>
    > {
        let _uri = '/forum/';
        _uri += encodeURIComponent(options.id);
        _uri += '/threads';
        return (await this.executor({uri: _uri, method: 'GET'})) as ReadonlyArray<ThreadDto['ForumController/DEFAULT_THREAD']>
    }
}

export type ForumControllerOptions = {
    'threads': {readonly id: string}
}