import type { Executor } from '../';
import type { ThreadDto } from '../model/dto';
import type { Page, ThreadInput, Unit } from '../model/static';

export class ThreadController {
    
    constructor(private executor: Executor) {}
    
    async findComplexThreads(options: ThreadControllerOptions['findComplexThreads']): Promise<
        Page<ThreadDto['ThreadController/DEFAULT_THREAD']>
    > {
        let _uri = '/categories/forums/threads';
        let _separator = _uri.indexOf('?') === -1 ? '?' : '&';
        let _value: any = undefined;
        _value = options.threadInput.content;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'content='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        _value = options.threadInput.forumId;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'forumId='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        _value = options.threadInput.id;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'id='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        _value = options.threadInput.memberId;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'memberId='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        _value = options.threadInput.replyTime;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'replyTime='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        _value = options.threadInput.threadTypeId;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'threadTypeId='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        _value = options.threadInput.title;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'title='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
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
        return (await this.executor({uri: _uri, method: 'GET'})) as Page<ThreadDto['ThreadController/DEFAULT_THREAD']>
    }
    
    async findThreads(options: ThreadControllerOptions['findThreads']): Promise<
        Page<ThreadDto['ThreadController/DEFAULT_THREAD']>
    > {
        let _uri = '/categories/forums/';
        _uri += encodeURIComponent(options.forumId);
        _uri += '/threads/';
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
        return (await this.executor({uri: _uri, method: 'GET'})) as Page<ThreadDto['ThreadController/DEFAULT_THREAD']>
    }
    
    async saveThread(options: ThreadControllerOptions['saveThread']): Promise<
        Unit
    > {
        let _uri = '/categories/forums/threads/';
        let _separator = _uri.indexOf('?') === -1 ? '?' : '&';
        let _value: any = undefined;
        _value = options.threadInput.content;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'content='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        _value = options.threadInput.forumId;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'forumId='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        _value = options.threadInput.id;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'id='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        _value = options.threadInput.memberId;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'memberId='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        _value = options.threadInput.replyTime;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'replyTime='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        _value = options.threadInput.threadTypeId;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'threadTypeId='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        _value = options.threadInput.title;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'title='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        return (await this.executor({uri: _uri, method: 'PUT'})) as Unit
    }
}

export type ThreadControllerOptions = {
    'findComplexThreads': {
        readonly page?: number, 
        readonly size?: number, 
        readonly threadInput: ThreadInput
    },
    'findThreads': {
        readonly forumId: string, 
        readonly page?: number, 
        readonly size?: number
    },
    'saveThread': {readonly threadInput: ThreadInput}
}