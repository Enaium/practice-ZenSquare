import type { ReportType } from '../enums';

export interface ReportInput {
    
    readonly id?: string;
    
    readonly memberId?: string;
    
    readonly reason?: string;
    
    readonly target?: string;
    
    readonly type?: ReportType;
}
