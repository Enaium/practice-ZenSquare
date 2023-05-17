import type { Executor } from '../';
import type { MemberDto } from '../model/dto';
import type { Page, Unit } from '../model/static';

export class MemberFollowController {
    
    constructor(private executor: Executor) {}
    
    async findFollowers(options: MemberFollowControllerOptions['findFollowers']): Promise<
        Page<MemberDto['MemberFollowController/DEFAULT_MEMBER_FOLLOW']>
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
        return (await this.executor({uri: _uri, method: 'GET'})) as Page<MemberDto['MemberFollowController/DEFAULT_MEMBER_FOLLOW']>
    }
    
    async findFollowings(options: MemberFollowControllerOptions['findFollowings']): Promise<
        Page<MemberDto['MemberFollowController/DEFAULT_MEMBER_FOLLOW']>
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
        return (await this.executor({uri: _uri, method: 'GET'})) as Page<MemberDto['MemberFollowController/DEFAULT_MEMBER_FOLLOW']>
    }
    
    async follow(options: MemberFollowControllerOptions['follow']): Promise<
        Unit
    > {
        let _uri = '/members/';
        _uri += encodeURIComponent(options.memberId);
        _uri += '/followings/';
        _uri += encodeURIComponent(options.followId);
        _uri += '/';
        return (await this.executor({uri: _uri, method: 'PUT'})) as Unit
    }
    
    async isFollowed(options: MemberFollowControllerOptions['isFollowed']): Promise<boolean> {
        let _uri = '/members/';
        _uri += encodeURIComponent(options.memberId);
        _uri += '/followings/';
        _uri += encodeURIComponent(options.followId);
        _uri += '/';
        return (await this.executor({uri: _uri, method: 'GET'})) as boolean
    }
    
    async unfollow(options: MemberFollowControllerOptions['unfollow']): Promise<
        Unit
    > {
        let _uri = '/members/';
        _uri += encodeURIComponent(options.memberId);
        _uri += '/followings/';
        _uri += encodeURIComponent(options.followId);
        _uri += '/';
        return (await this.executor({uri: _uri, method: 'DELETE'})) as Unit
    }
}

export type MemberFollowControllerOptions = {
    'findFollowers': {
        readonly memberId: string, 
        readonly page?: number, 
        readonly size?: number
    },
    'findFollowings': {
        readonly memberId: string, 
        readonly page?: number, 
        readonly size?: number
    },
    'follow': {readonly memberId: string, readonly followId: string},
    'isFollowed': {readonly memberId: string, readonly followId: string},
    'unfollow': {readonly memberId: string, readonly followId: string}
}