import type { Executor } from '../';
import type { Unit } from '../model/static';

export class CategoryController {
    
    constructor(private executor: Executor) {}
    
    async get(): Promise<
        Unit
    > {
        let _uri = '/category/';
        return (await this.executor({uri: _uri, method: 'GET'})) as Unit
    }
}

export type CategoryControllerOptions = {
    'get': {}
}