import type { Executor } from '../';
import type { AlertDto } from '../model/dto';
import type { Page } from '../model/static';

export class AlertController {
    
    constructor(private executor: Executor) {}
    
    async findAlerts(options: AlertControllerOptions['findAlerts']): Promise<
        Page<AlertDto['AlertFetcher/DEFAULT_FETCHER']>
    > {
        let _uri = '/members/';
        _uri += encodeURIComponent(options.memberId);
        _uri += '/alerts/';
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
        return (await this.executor({uri: _uri, method: 'GET'})) as Page<AlertDto['AlertFetcher/DEFAULT_FETCHER']>
    }
}

export type AlertControllerOptions = {
    'findAlerts': {
        readonly page?: number, 
        readonly size?: number, 
        readonly memberId: string
    }
}