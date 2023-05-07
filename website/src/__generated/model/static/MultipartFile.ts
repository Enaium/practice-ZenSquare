import type { InputStream, Resource, byte } from './';

export interface MultipartFile {
    
    readonly bytes: ReadonlyArray<byte>;
    
    readonly contentType?: string;
    
    readonly empty: boolean;
    
    readonly inputStream: InputStream;
    
    readonly name: string;
    
    readonly originalFilename?: string;
    
    readonly resource: Resource;
    
    readonly size: number;
}
