import type { Executor } from '../';
import type { ReplyInput, Unit } from '../model/static';

export class ReplyController {
    
    constructor(private executor: Executor) {}
    
    async saveReply(options: ReplyControllerOptions['saveReply']): Promise<
        Unit
    > {
        let _uri = '/categories/forum/thread/reply';
        return (await this.executor({uri: _uri, method: 'PUT', body: options.body})) as Unit
    }
}

export type ReplyControllerOptions = {
    'saveReply': {readonly body: ReplyInput}
}