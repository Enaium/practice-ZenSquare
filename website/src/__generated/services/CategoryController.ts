import type { Executor } from '../';
import type { CategoryDto } from '../model/dto';
import type { Page } from '../model/static';

export class CategoryController {
    
    constructor(private executor: Executor) {}
    
    async findCategories(options?: CategoryControllerOptions['findCategories']): Promise<
        Page<CategoryDto['CategoryController/DEFAULT_CATEGORY']>
    > {
        let _uri = '/categories/';
        let _separator = _uri.indexOf('?') === -1 ? '?' : '&';
        let _value: any = undefined;
        _value = options?.page;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'page='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        _value = options?.size;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'size='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        return (await this.executor({uri: _uri, method: 'GET'})) as Page<CategoryDto['CategoryController/DEFAULT_CATEGORY']>
    }
    
    async findCategory(options: CategoryControllerOptions['findCategory']): Promise<
        CategoryDto['DEFAULT'] | undefined
    > {
        let _uri = '/categories/';
        _uri += encodeURIComponent(options.id);
        _uri += '/';
        return (await this.executor({uri: _uri, method: 'GET'})) as CategoryDto['DEFAULT'] | undefined
    }
}

export type CategoryControllerOptions = {
    'findCategories': {readonly page?: number, readonly size?: number},
    'findCategory': {readonly id: string}
}