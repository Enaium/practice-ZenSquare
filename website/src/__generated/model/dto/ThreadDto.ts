import type { ThreadType } from '../enums';

export type ThreadDto = {
    'ThreadFetcher/DEFAULT_THREAD': {
        readonly id: string, 
        readonly createdTime: string, 
        readonly modifiedTime: string, 
        readonly title: string, 
        readonly memberId: string, 
        readonly forumId?: string, 
        readonly type: ThreadType, 
        readonly essence: boolean, 
        readonly priority: number, 
        readonly member: {
            readonly id: string, 
            readonly profile?: {
                readonly id: string, 
                readonly nickname?: string, 
                readonly avatar?: string
            }
        }, 
        readonly lastReplyTime?: string, 
        readonly lastReplyMember?: {
            readonly id: string, 
            readonly profile?: {
                readonly id: string, 
                readonly nickname?: string, 
                readonly avatar?: string
            }
        }, 
        readonly reply: number
    }, 
    'ThreadFetcher/FULL_CONVERSATION': {
        readonly id: string, 
        readonly createdTime: string, 
        readonly modifiedTime: string, 
        readonly title: string, 
        readonly content: string, 
        readonly memberId: string, 
        readonly forumId?: string, 
        readonly type: ThreadType, 
        readonly essence: boolean, 
        readonly priority: number, 
        readonly member: {
            readonly id: string, 
            readonly profile?: {
                readonly id: string, 
                readonly nickname?: string, 
                readonly avatar?: string, 
                readonly role: {
                    readonly id: string, 
                    readonly name: string, 
                    readonly description: string
                }
            }
        }, 
        readonly lastReplyTime?: string, 
        readonly lastReplyMember?: {
            readonly id: string, 
            readonly profile?: {
                readonly id: string, 
                readonly nickname?: string, 
                readonly avatar?: string
            }
        }, 
        readonly like: number
    }, 
    'ThreadFetcher/FULL_POST': {
        readonly id: string, 
        readonly createdTime: string, 
        readonly modifiedTime: string, 
        readonly title: string, 
        readonly content: string, 
        readonly memberId: string, 
        readonly forumId?: string, 
        readonly type: ThreadType, 
        readonly essence: boolean, 
        readonly priority: number, 
        readonly member: {
            readonly id: string, 
            readonly profile?: {
                readonly id: string, 
                readonly nickname?: string, 
                readonly avatar?: string, 
                readonly role: {
                    readonly id: string, 
                    readonly name: string, 
                    readonly description: string
                }
            }
        }, 
        readonly forum?: {
            readonly id: string, 
            readonly createdTime: string, 
            readonly modifiedTime: string, 
            readonly name: string, 
            readonly description: string, 
            readonly categoryId: string, 
            readonly icon?: string, 
            readonly category: {
                readonly id: string, 
                readonly createdTime: string, 
                readonly modifiedTime: string, 
                readonly name: string, 
                readonly description: string
            }
        }, 
        readonly lastReplyTime?: string, 
        readonly lastReplyMember?: {
            readonly id: string, 
            readonly profile?: {
                readonly id: string, 
                readonly nickname?: string, 
                readonly avatar?: string
            }
        }, 
        readonly like: number
    }
}