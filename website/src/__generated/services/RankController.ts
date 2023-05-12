import type { Executor } from '../';
import type { MemberDto } from '../model/dto';
import type { Page } from '../model/static';

export class RankController {
    
    constructor(private executor: Executor) {}
    
    async findThreadRank(options: RankControllerOptions['findThreadRank']): Promise<
        Page<MemberDto['DEFAULT']>
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
        return (await this.executor({uri: _uri, method: 'GET'})) as Page<MemberDto['DEFAULT']>
    }
}

export type RankControllerOptions = {
    'findThreadRank': {readonly page?: number, readonly size?: number}
}