import type { Executor } from '../';
import type { MemberInput, Unit } from '../model/static';

export class MemberController {
    
    constructor(private executor: Executor) {}
    
    async saveMember(options: MemberControllerOptions['saveMember']): Promise<
        Unit
    > {
        let _uri = '/members/';
        return (await this.executor({uri: _uri, method: 'PUT', body: options.body})) as Unit
    }
}

export type MemberControllerOptions = {
    'saveMember': {readonly body: MemberInput}
}