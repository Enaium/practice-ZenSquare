import type { ReportType } from '../enums';

export type ReportDto = {
    'ReportController/DEFAULT_REPORT': {
        readonly id: string, 
        readonly createdTime: string, 
        readonly modifiedTime: string, 
        readonly memberId: string, 
        readonly target: string, 
        readonly type: ReportType, 
        readonly reason: string
    }
}