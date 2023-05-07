import type { Executor } from '../';
import type { LoginResponse, MemberInput, Unit } from '../model/static';

export class SessionController {
    
    constructor(private executor: Executor) {}
    
    async delete(options: SessionControllerOptions['delete']): Promise<
        Unit
    > {
        let _uri = '/sessions/';
        _uri += encodeURIComponent(options.id);
        return (await this.executor({uri: _uri, method: 'DELETE'})) as Unit
    }
    
    async save(options: SessionControllerOptions['save']): Promise<
        LoginResponse
    > {
        let _uri = '/sessions/';
        return (await this.executor({uri: _uri, method: 'PUT', body: options.body})) as LoginResponse
    }
}

export type SessionControllerOptions = {
    'delete': {readonly id: string},
    'save': {readonly body: MemberInput}
}