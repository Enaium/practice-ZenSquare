import type { Executor } from '../';
import type { ForumDto } from '../model/dto';

export class CategoryController {
    
    constructor(private executor: Executor) {}
    
    async forums(options: CategoryControllerOptions['forums']): Promise<
        ReadonlyArray<ForumDto['DEFAULT']>
    > {
        let _uri = '/category/';
        _uri += encodeURIComponent(options.id);
        _uri += '/forums';
        return (await this.executor({uri: _uri, method: 'GET'})) as ReadonlyArray<ForumDto['DEFAULT']>
    }
}

export type CategoryControllerOptions = {
    'forums': {readonly id: string}
}