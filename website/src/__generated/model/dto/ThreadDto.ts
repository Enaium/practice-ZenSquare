export type ThreadDto = {
    'ThreadController/DEFAULT_THREAD': {
        readonly id: string, 
        readonly createdTime: string, 
        readonly modifiedTime: string, 
        readonly title: string, 
        readonly memberId?: string, 
        readonly forumId?: string, 
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
        }
    }, 
    'ThreadController/FULL_THREAD': {
        readonly id: string, 
        readonly createdTime: string, 
        readonly modifiedTime: string, 
        readonly title: string, 
        readonly content: string, 
        readonly memberId?: string, 
        readonly forumId?: string, 
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
        readonly forum: {
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