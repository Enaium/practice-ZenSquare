import type { Executor } from '../';
import type { CategoryDto } from '../model/dto';

export class Controller {
    
    constructor(private executor: Executor) {}
    
    async categories(): Promise<
        ReadonlyArray<CategoryDto['Controller/DEFAULT_CATEGORY']>
    > {
        let _uri = '/categories';
        return (await this.executor({uri: _uri, method: 'GET'})) as ReadonlyArray<CategoryDto['Controller/DEFAULT_CATEGORY']>
    }
}

export type ControllerOptions = {
    'categories': {}
}