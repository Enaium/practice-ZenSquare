import type { Executor } from '../';
import type { ThreadDto } from '../model/dto';
import type { Page, ThreadInput, Unit } from '../model/static';

export class ConversationController {
    
    constructor(private executor: Executor) {}
    
    async findConversation(options: ConversationControllerOptions['findConversation']): Promise<
        ThreadDto['ThreadFetcher/FULL_CONVERSATION'] | undefined
    > {
        let _uri = '/members/threads/conversations/';
        _uri += encodeURIComponent(options.threadId);
        return (await this.executor({uri: _uri, method: 'GET'})) as ThreadDto['ThreadFetcher/FULL_CONVERSATION'] | undefined
    }
    
    async findConversations(options: ConversationControllerOptions['findConversations']): Promise<
        Page<ThreadDto['ThreadFetcher/DEFAULT_THREAD']>
    > {
        let _uri = '/members/';
        _uri += encodeURIComponent(options.memberId);
        _uri += '/threads/conversations/';
        let _separator = _uri.indexOf('?') === -1 ? '?' : '&';
        let _value: any = undefined;
        _value = options.page;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'page='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        _value = options.size;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'size='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        return (await this.executor({uri: _uri, method: 'GET'})) as Page<ThreadDto['ThreadFetcher/DEFAULT_THREAD']>
    }
    
    async saveConversations(options: ConversationControllerOptions['saveConversations']): Promise<
        Unit
    > {
        let _uri = '/threads/conversations/';
        let _separator = _uri.indexOf('?') === -1 ? '?' : '&';
        let _value: any = undefined;
        _value = options.members.join(',');
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'members='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        return (await this.executor({uri: _uri, method: 'PUT', body: options.body})) as Unit
    }
}

export type ConversationControllerOptions = {
    'findConversation': {readonly threadId: string},
    'findConversations': {
        readonly page?: number, 
        readonly size?: number, 
        readonly memberId: string
    },
    'saveConversations': {readonly body: ThreadInput, readonly members: ReadonlyArray<string>}
}