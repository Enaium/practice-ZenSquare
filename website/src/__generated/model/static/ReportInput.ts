import type { ReportType } from '../enums';

export interface ReportInput {
    
    readonly id?: string;
    
    readonly memberId?: string;
    
    readonly reason?: string;
    
    readonly targetId?: string;
    
    readonly type?: ReportType;
}
