import type { Executor } from '../';
import type { MemberDto } from '../model/dto';
import type { Page, Unit } from '../model/static';

export class MemberFollowController {
    
    constructor(private executor: Executor) {}
    
    async findFollowers(options: MemberFollowControllerOptions['findFollowers']): Promise<
        Page<MemberDto['DEFAULT']>
    > {
        let _uri = '/members/';
        _uri += encodeURIComponent(options.memberId);
        _uri += '/followers/';
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
        return (await this.executor({uri: _uri, method: 'GET'})) as Page<MemberDto['DEFAULT']>
    }
    
    async findFollows(options: MemberFollowControllerOptions['findFollows']): Promise<
        Page<MemberDto['DEFAULT']>
    > {
        let _uri = '/members/';
        _uri += encodeURIComponent(options.memberId);
        _uri += '/followings/';
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
        return (await this.executor({uri: _uri, method: 'GET'})) as Page<MemberDto['DEFAULT']>
    }
    
    async follow(options: MemberFollowControllerOptions['follow']): Promise<
        Unit
    > {
        let _uri = '/members/';
        _uri += encodeURIComponent(options.memberId);
        _uri += '/followings/';
        _uri += encodeURIComponent(options.followId);
        return (await this.executor({uri: _uri, method: 'PUT'})) as Unit
    }
}

export type MemberFollowControllerOptions = {
    'findFollowers': {
        readonly memberId: string, 
        readonly page?: number, 
        readonly size?: number
    },
    'findFollows': {
        readonly memberId: string, 
        readonly page?: number, 
        readonly size?: number
    },
    'follow': {readonly memberId: string, readonly followId: string}
}