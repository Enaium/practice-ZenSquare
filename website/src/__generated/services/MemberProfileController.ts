import type { Executor } from '../';
import type { MemberProfileInput, Unit } from '../model/static';

export class MemberProfileController {
    
    constructor(private executor: Executor) {}
    
    async put(options: MemberProfileControllerOptions['put']): Promise<
        Unit
    > {
        let _uri = '/member/profile/';
        return (await this.executor({uri: _uri, method: 'PUT', body: options.body})) as Unit
    }
}

export type MemberProfileControllerOptions = {
    'put': {readonly body: MemberProfileInput}
}