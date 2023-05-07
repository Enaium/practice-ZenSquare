import type { Executor } from '../';
import type { ThreadInput, Unit } from '../model/static';

export class ThreadController {
    
    constructor(private executor: Executor) {}
    
    async put(options: ThreadControllerOptions['put']): Promise<
        Unit
    > {
        let _uri = '/thread/';
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
    'put': {readonly threadInput: ThreadInput}
}