import type { Executor } from '../';
import type { MultipartFile, Unit } from '../model/static';

export class ImageController {
    
    constructor(private executor: Executor) {}
    
    async findImage(options: ImageControllerOptions['findImage']): Promise<
        Unit
    > {
        let _uri = '/images/';
        _uri += encodeURIComponent(options.id);
        _uri += '/';
        return (await this.executor({uri: _uri, method: 'GET'})) as Unit
    }
    
    async saveImages(options: ImageControllerOptions['saveImages']): Promise<
        ReadonlyArray<string>
    > {
        let _uri = '/images/';
        let _separator = _uri.indexOf('?') === -1 ? '?' : '&';
        let _value: any = undefined;
        _value = options.file.join(',');
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'file='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        return (await this.executor({uri: _uri, method: 'PUT'})) as ReadonlyArray<string>
    }
}

export type ImageControllerOptions = {
    'findImage': {readonly id: string},
    'saveImages': {readonly file: ReadonlyArray<MultipartFile>}
}