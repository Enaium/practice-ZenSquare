import type { InputStream, URI, URL, byte } from './';

export interface Resource {
    
    readonly contentAsByteArray: ReadonlyArray<byte>;
    
    readonly description: string;
    
    readonly file: boolean;
    
    readonly filename?: string;
    
    readonly inputStream: InputStream;
    
    readonly open: boolean;
    
    readonly readable: boolean;
    
    readonly uRI: URI;
    
    readonly uRL: URL;
}
