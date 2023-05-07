export interface URI {
    
    readonly absolute: boolean;
    
    readonly authority: string;
    
    readonly fragment: string;
    
    readonly host: string;
    
    readonly opaque: boolean;
    
    readonly path: string;
    
    readonly port: number;
    
    readonly query: string;
    
    readonly rawAuthority: string;
    
    readonly rawFragment: string;
    
    readonly rawPath: string;
    
    readonly rawQuery: string;
    
    readonly rawSchemeSpecificPart: string;
    
    readonly rawUserInfo: string;
    
    readonly scheme: string;
    
    readonly schemeSpecificPart: string;
    
    readonly userInfo: string;
}
