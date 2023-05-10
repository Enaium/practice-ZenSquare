import type { Executor } from '../';
import type { ReplyDto } from '../model/dto';
import type { Page } from '../model/static';

export class ChildReplyController {
    
    constructor(private executor: Executor) {}
    
    async findChildrenReplies(options: ChildReplyControllerOptions['findChildrenReplies']): Promise<
        Page<ReplyDto['DEFAULT']>
    > {
        let _uri = '/categories/forum/thread/replies/';
        _uri += encodeURIComponent(options.replyId);
        _uri += '/children/';
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
        return (await this.executor({uri: _uri, method: 'GET'})) as Page<ReplyDto['DEFAULT']>
    }
}

export type ChildReplyControllerOptions = {
    'findChildrenReplies': {
        readonly page?: number, 
        readonly size?: number, 
        readonly replyId: string
    }
}