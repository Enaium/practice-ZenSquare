import type { InputStream, URI, URL } from './';

export interface Resource {
    
    readonly contentAsByteArray: ReadonlyArray<number>;
    
    readonly description: string;
    
    readonly file: boolean;
    
    readonly filename?: string;
    
    readonly inputStream: InputStream;
    
    readonly open: boolean;
    
    readonly readable: boolean;
    
    readonly uRI: URI;
    
    readonly uRL: URL;
}
