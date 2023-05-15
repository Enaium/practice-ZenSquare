import type { Executor } from '../';
import type { MemberProfileDto } from '../model/dto';
import type { MemberProfileInput, Page, Unit } from '../model/static';

export class MemberProfileController {
    
    constructor(private executor: Executor) {}
    
    async findComplexProfiles(options: MemberProfileControllerOptions['findComplexProfiles']): Promise<
        Page<MemberProfileDto['DEFAULT']>
    > {
        let _uri = '/members/profiles/';
        let _separator = _uri.indexOf('?') === -1 ? '?' : '&';
        let _value: any = undefined;
        _value = options.memberProfileInput.avatar;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'avatar='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        _value = options.memberProfileInput.bilibili;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'bilibili='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        _value = options.memberProfileInput.birthday;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'birthday='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        _value = options.memberProfileInput.description;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'description='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        _value = options.memberProfileInput.email;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'email='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        _value = options.memberProfileInput.github;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'github='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        _value = options.memberProfileInput.id;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'id='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        _value = options.memberProfileInput.location;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'location='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        _value = options.memberProfileInput.memberId;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'memberId='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        _value = options.memberProfileInput.nickname;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'nickname='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        _value = options.memberProfileInput.roleId;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'roleId='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        _value = options.memberProfileInput.website;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'website='
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
        return (await this.executor({uri: _uri, method: 'GET'})) as Page<MemberProfileDto['DEFAULT']>
    }
    
    async findFullProfile(options: MemberProfileControllerOptions['findFullProfile']): Promise<
        MemberProfileDto['MemberProfileController/FULL_MEMBER_PROFILE'] | undefined
    > {
        let _uri = '/members/';
        _uri += encodeURIComponent(options.memberId);
        _uri += '/profiles/full';
        return (await this.executor({uri: _uri, method: 'GET'})) as MemberProfileDto['MemberProfileController/FULL_MEMBER_PROFILE'] | undefined
    }
    
    async findProfile(options: MemberProfileControllerOptions['findProfile']): Promise<
        MemberProfileDto['MemberProfileController/DEFAULT_MEMBER_PROFILE'] | undefined
    > {
        let _uri = '/members/';
        _uri += encodeURIComponent(options.memberId);
        _uri += '/profiles/';
        return (await this.executor({uri: _uri, method: 'GET'})) as MemberProfileDto['MemberProfileController/DEFAULT_MEMBER_PROFILE'] | undefined
    }
    
    async save(options: MemberProfileControllerOptions['save']): Promise<
        Unit
    > {
        let _uri = '/members/profiles/';
        return (await this.executor({uri: _uri, method: 'PUT', body: options.body})) as Unit
    }
    
    async saveAvatar(options: MemberProfileControllerOptions['saveAvatar']): Promise<
        Unit
    > {
        let _uri = '/members/';
        _uri += encodeURIComponent(options.memberId);
        _uri += '/profiles/avatar/';
        return (await this.executor({uri: _uri, method: 'PUT'})) as Unit
    }
}

export type MemberProfileControllerOptions = {
    'findComplexProfiles': {
        readonly page?: number, 
        readonly size?: number, 
        readonly memberProfileInput: MemberProfileInput
    },
    'findFullProfile': {readonly memberId: string},
    'findProfile': {readonly memberId: string},
    'save': {readonly body: MemberProfileInput},
    'saveAvatar': {readonly memberId: string}
}