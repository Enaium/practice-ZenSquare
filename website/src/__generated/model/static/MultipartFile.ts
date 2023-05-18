import type { InputStream, Resource } from './';

export interface MultipartFile {
    
    readonly bytes: ReadonlyArray<number>;
    
    readonly contentType?: string;
    
    readonly empty: boolean;
    
    readonly inputStream: InputStream;
    
    readonly name: string;
    
    readonly originalFilename?: string;
    
    readonly resource: Resource;
    
    readonly size: number;
}
