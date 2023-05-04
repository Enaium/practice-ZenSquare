import type { Executor } from '../';
import type { MemberProfileDto } from '../model/dto';

export class MemberProfileController {
    
    constructor(private executor: Executor) {}
    
    async get(options: MemberProfileControllerOptions['get']): Promise<
        MemberProfileDto['DEFAULT'] | undefined
    > {
        let _uri = '/member/profile/';
        _uri += encodeURIComponent(options.id);
        return (await this.executor({uri: _uri, method: 'GET'})) as MemberProfileDto['DEFAULT'] | undefined
    }
}

export type MemberProfileControllerOptions = {
    'get': {readonly id: string}
}