import type { Executor } from '../';
import type { MemberDto } from '../model/dto';
import type { Page } from '../model/static';

export class MemberRankController {
    
    constructor(private executor: Executor) {}
    
    async findMessageRank(options: MemberRankControllerOptions['findMessageRank']): Promise<
        Page<MemberDto['MemberRankController/DEFAULT_MEMBER_RANK']>
    > {
        let _uri = '/members/rank/message/';
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
        return (await this.executor({uri: _uri, method: 'GET'})) as Page<MemberDto['MemberRankController/DEFAULT_MEMBER_RANK']>
    }
    
    async findReplyRank(options: MemberRankControllerOptions['findReplyRank']): Promise<
        Page<MemberDto['MemberRankController/DEFAULT_MEMBER_RANK']>
    > {
        let _uri = '/members/rank/reply/';
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
        return (await this.executor({uri: _uri, method: 'GET'})) as Page<MemberDto['MemberRankController/DEFAULT_MEMBER_RANK']>
    }
    
    async findThreadRank(options: MemberRankControllerOptions['findThreadRank']): Promise<
        Page<MemberDto['MemberRankController/DEFAULT_MEMBER_RANK']>
    > {
        let _uri = '/members/rank/thread/';
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
        return (await this.executor({uri: _uri, method: 'GET'})) as Page<MemberDto['MemberRankController/DEFAULT_MEMBER_RANK']>
    }
}

export type MemberRankControllerOptions = {
    'findMessageRank': {readonly page?: number, readonly size?: number},
    'findReplyRank': {readonly page?: number, readonly size?: number},
    'findThreadRank': {readonly page?: number, readonly size?: number}
}