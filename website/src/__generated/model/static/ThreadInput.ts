import type { ThreadType } from '../enums';

export interface ThreadInput {
    
    readonly content?: string;
    
    readonly forumId?: string;
    
    readonly id?: string;
    
    readonly memberId?: string;
    
    readonly title?: string;
    
    readonly type?: ThreadType;
}
