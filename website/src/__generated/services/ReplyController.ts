import type { Executor } from '../';
import type { ReplyDto } from '../model/dto';
import type { Page, ReplyInput, Unit } from '../model/static';

export class ReplyController {
    
    constructor(private executor: Executor) {}
    
    async findReplies(options: ReplyControllerOptions['findReplies']): Promise<
        Page<ReplyDto['ReplyController/FULL_REPLY']>
    > {
        let _uri = '/categories/forum/thread/';
        _uri += encodeURIComponent(options.threadId);
        _uri += '/replies/';
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
        return (await this.executor({uri: _uri, method: 'GET'})) as Page<ReplyDto['ReplyController/FULL_REPLY']>
    }
    
    async saveReply(options: ReplyControllerOptions['saveReply']): Promise<
        Unit
    > {
        let _uri = '/categories/forum/thread/replies/';
        return (await this.executor({uri: _uri, method: 'PUT', body: options.body})) as Unit
    }
}

export type ReplyControllerOptions = {
    'findReplies': {
        readonly threadId: string, 
        readonly page?: number, 
        readonly size?: number
    },
    'saveReply': {readonly body: ReplyInput}
}