import type { Executor } from '../';
import type { Unit } from '../model/static';

export class ImageController {
    
    constructor(private executor: Executor) {}
    
    async get(options: ImageControllerOptions['get']): Promise<
        Unit
    > {
        let _uri = '/image/';
        _uri += encodeURIComponent(options.id);
        return (await this.executor({uri: _uri, method: 'GET'})) as Unit
    }
    
    async put(): Promise<string> {
        let _uri = '/image/';
        return (await this.executor({uri: _uri, method: 'PUT'})) as string
    }
}

export type ImageControllerOptions = {
    'get': {readonly id: string},
    'put': {}
}