import type { Executor } from '../';
import type { MemberProfileDto } from '../model/dto';
import type { MemberProfileInput, Unit } from '../model/static';

export class MemberProfileController {
    
    constructor(private executor: Executor) {}
    
    async get(options: MemberProfileControllerOptions['get']): Promise<
        MemberProfileDto['DEFAULT'] | undefined
    > {
        let _uri = '/member/profile/';
        _uri += encodeURIComponent(options.id);
        return (await this.executor({uri: _uri, method: 'GET'})) as MemberProfileDto['DEFAULT'] | undefined
    }
    
    async put(options: MemberProfileControllerOptions['put']): Promise<
        Unit
    > {
        let _uri = '/member/profile/';
        return (await this.executor({uri: _uri, method: 'PUT', body: options.body})) as Unit
    }
}

export type MemberProfileControllerOptions = {
    'get': {readonly id: string},
    'put': {readonly body: MemberProfileInput}
}