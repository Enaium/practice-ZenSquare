import type { Executor } from '../';
import type { ReportDto } from '../model/dto';
import type { Page, ReportInput, Unit } from '../model/static';

export class ReportController {
    
    constructor(private executor: Executor) {}
    
    async findReports(options: ReportControllerOptions['findReports']): Promise<
        Page<ReportDto['ReportController/DEFAULT_REPORT']>
    > {
        let _uri = '/reports/';
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
        return (await this.executor({uri: _uri, method: 'GET'})) as Page<ReportDto['ReportController/DEFAULT_REPORT']>
    }
    
    async saveReport(options: ReportControllerOptions['saveReport']): Promise<
        Unit
    > {
        let _uri = '/reports/';
        return (await this.executor({uri: _uri, method: 'PUT', body: options.body})) as Unit
    }
}

export type ReportControllerOptions = {
    'findReports': {readonly page?: number, readonly size?: number},
    'saveReport': {readonly body: ReportInput}
}