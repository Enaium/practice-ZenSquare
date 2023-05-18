import type { MemberLikeType } from '../enums';

export type MemberLikeDto = {
    'DEFAULT': {
        readonly createdTime: string, 
        readonly modifiedTime: string, 
        readonly id: string, 
        readonly memberId: string, 
        readonly target: string, 
        readonly thread?: {readonly id: string}, 
        readonly reply?: {readonly id: string}, 
        readonly dislike: boolean, 
        readonly type: MemberLikeType
    }
}