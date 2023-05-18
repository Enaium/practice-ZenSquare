export interface InetAddress {
    
    readonly address: ReadonlyArray<number>;
    
    readonly anyLocalAddress: boolean;
    
    readonly canonicalHostName: string;
    
    readonly hostAddress: string;
    
    readonly hostName: string;
    
    readonly linkLocalAddress: boolean;
    
    readonly loopbackAddress: boolean;
    
    readonly mCGlobal: boolean;
    
    readonly mCLinkLocal: boolean;
    
    readonly mCNodeLocal: boolean;
    
    readonly mCOrgLocal: boolean;
    
    readonly mCSiteLocal: boolean;
    
    readonly multicastAddress: boolean;
    
    readonly siteLocalAddress: boolean;
}
