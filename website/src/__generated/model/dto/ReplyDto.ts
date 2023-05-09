export type ReplyDto = {
    'ReplyController/FULL_REPLY': {
        readonly id: string, 
        readonly createdTime: string, 
        readonly modifiedTime: string, 
        readonly content: string, 
        readonly memberId: string, 
        readonly threadId: string, 
        readonly member: {
            readonly id: string, 
            readonly profile?: {
                readonly id: string, 
                readonly createdTime: string, 
                readonly modifiedTime: string, 
                readonly memberId: string, 
                readonly birthday?: string, 
                readonly location?: string, 
                readonly website?: string, 
                readonly description?: string, 
                readonly github?: string, 
                readonly bilibili?: string, 
                readonly email?: string, 
                readonly roleId: string, 
                readonly nickname?: string, 
                readonly avatar?: string, 
                readonly role: {
                    readonly id: string, 
                    readonly name: string
                }
            }
        }, 
        readonly like: number, 
        readonly dislike: number
    }
}