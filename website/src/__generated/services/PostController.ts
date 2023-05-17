import type { Executor } from '../';
import type { ThreadDto } from '../model/dto';
import type { Page, ThreadInput, Unit } from '../model/static';

export class PostController {
    
    constructor(private executor: Executor) {}
    
    async findComplexPosts(options: PostControllerOptions['findComplexPosts']): Promise<
        Page<ThreadDto['ThreadFetcher/DEFAULT_THREAD']>
    > {
        let _uri = '/categories/forums/threads/posts/';
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
        return (await this.executor({uri: _uri, method: 'GET'})) as Page<ThreadDto['ThreadFetcher/DEFAULT_THREAD']>
    }
    
    async findLatest(options: PostControllerOptions['findLatest']): Promise<
        Page<ThreadDto['ThreadFetcher/DEFAULT_THREAD']>
    > {
        let _uri = '/categories/forums/threads/posts/latest/';
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
    
    async findPost(options: PostControllerOptions['findPost']): Promise<
        ThreadDto['ThreadFetcher/FULL_POST'] | undefined
    > {
        let _uri = '/categories/forums/threads/posts/';
        _uri += encodeURIComponent(options.id);
        _uri += '/';
        return (await this.executor({uri: _uri, method: 'GET'})) as ThreadDto['ThreadFetcher/FULL_POST'] | undefined
    }
    
    async findPosts(options: PostControllerOptions['findPosts']): Promise<
        Page<ThreadDto['ThreadFetcher/DEFAULT_THREAD']>
    > {
        let _uri = '/categories/forums/';
        _uri += encodeURIComponent(options.forumId);
        _uri += '/threads/posts/';
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
    
    async savePost(options: PostControllerOptions['savePost']): Promise<
        Unit
    > {
        let _uri = '/categories/forums/threads/posts/';
        return (await this.executor({uri: _uri, method: 'PUT', body: options.body})) as Unit
    }
}

export type PostControllerOptions = {
    'findComplexPosts': {
        readonly page?: number, 
        readonly size?: number, 
        readonly threadInput: ThreadInput
    },
    'findLatest': {readonly page?: number, readonly size?: number},
    'findPost': {readonly id: string},
    'findPosts': {
        readonly forumId: string, 
        readonly page?: number, 
        readonly size?: number
    },
    'savePost': {readonly body: ThreadInput}
}