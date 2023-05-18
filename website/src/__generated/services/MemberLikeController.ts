import type { Executor } from '../';
import type { MemberLikeDto } from '../model/dto';
import type { MemberLikeType } from '../model/enums';

export class MemberLikeController {
    
    constructor(private executor: Executor) {}
    
    async findLike(options: MemberLikeControllerOptions['findLike']): Promise<
        MemberLikeDto['DEFAULT'] | undefined
    > {
        let _uri = '/members/';
        _uri += encodeURIComponent(options.memberId);
        _uri += '/likes/';
        _uri += encodeURIComponent(options.target);
        _uri += '/';
        return (await this.executor({uri: _uri, method: 'GET'})) as MemberLikeDto['DEFAULT'] | undefined
    }
    
    async like(options: MemberLikeControllerOptions['like']): Promise<number> {
        let _uri = '/members/';
        _uri += encodeURIComponent(options.memberId);
        _uri += '/likes/';
        _uri += encodeURIComponent(options.target);
        _uri += '/';
        _uri += encodeURIComponent(options.type);
        _uri += '/';
        let _separator = _uri.indexOf('?') === -1 ? '?' : '&';
        let _value: any = undefined;
        _value = options.dislike;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'dislike='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        return (await this.executor({uri: _uri, method: 'PUT'})) as number
    }
}

export type MemberLikeControllerOptions = {
    'findLike': {readonly memberId: string, readonly target: string},
    'like': {
        readonly memberId: string, 
        readonly target: string, 
        readonly type: MemberLikeType, 
        readonly dislike: boolean
    }
}