import type { Executor } from '../';
import type { ForumDto } from '../model/dto';
import type { Page } from '../model/static';

export class ForumController {
    
    constructor(private executor: Executor) {}
    
    async findForum(options: ForumControllerOptions['findForum']): Promise<
        ForumDto['ForumController/DEFAULT_FORUM'] | undefined
    > {
        let _uri = '/categories/forums/';
        _uri += encodeURIComponent(options.id);
        _uri += '/';
        return (await this.executor({uri: _uri, method: 'GET'})) as ForumDto['ForumController/DEFAULT_FORUM'] | undefined
    }
    
    async findForums(options: ForumControllerOptions['findForums']): Promise<
        Page<ForumDto['ForumController/DEFAULT_FORUM']>
    > {
        let _uri = '/categories/';
        _uri += encodeURIComponent(options.categoryId);
        _uri += '/forums/';
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
        return (await this.executor({uri: _uri, method: 'GET'})) as Page<ForumDto['ForumController/DEFAULT_FORUM']>
    }
}

export type ForumControllerOptions = {
    'findForum': {readonly id: string},
    'findForums': {
        readonly categoryId: string, 
        readonly page?: number, 
        readonly size?: number
    }
}