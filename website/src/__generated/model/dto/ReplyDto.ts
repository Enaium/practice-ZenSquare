export type ReplyDto = {
    'ReplyController/FULL_REPLY': {
        readonly id: string, 
        readonly createdTime: string, 
        readonly modifiedTime: string, 
        readonly content: string, 
        readonly memberId: string, 
        readonly threadId: string, 
        readonly parentId?: string, 
        readonly member: {
            readonly id: string, 
            readonly profile?: {
                readonly id: string, 
                readonly nickname?: string, 
                readonly avatar?: string, 
                readonly role: {
                    readonly id: string, 
                    readonly name: string
                }
            }
        }, 
        readonly child: number, 
        readonly like: number
    }
}