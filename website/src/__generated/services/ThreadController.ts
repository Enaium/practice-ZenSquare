import type { Executor } from '../';
import type { ThreadInput, Unit } from '../model/static';

export class ThreadController {
    
    constructor(private executor: Executor) {}
    
    async updateThread(options: ThreadControllerOptions['updateThread']): Promise<
        Unit
    > {
        let _uri = '/threads/';
        return (await this.executor({uri: _uri, method: 'PUT', body: options.body})) as Unit
    }
}

export type ThreadControllerOptions = {
    'updateThread': {readonly body: ThreadInput}
}