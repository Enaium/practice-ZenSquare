import type { InetAddress } from './';

export interface URL {
    
    readonly authority: string;
    
    readonly content: any;
    
    readonly defaultPort: number;
    
    readonly file: string;
    
    readonly host: string;
    
    readonly hostAddress: InetAddress;
    
    readonly path: string;
    
    readonly port: number;
    
    readonly protocol: string;
    
    readonly query: string;
    
    readonly ref: string;
    
    readonly userInfo: string;
}
