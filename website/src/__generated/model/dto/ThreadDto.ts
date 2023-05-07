export type ThreadDto = {
    'ThreadController/DEFAULT_THREAD': {
        readonly id: string, 
        readonly createdTime: string, 
        readonly modifiedTime: string, 
        readonly title: string, 
        readonly memberId?: string, 
        readonly forumId?: string, 
        readonly replyTime?: string, 
        readonly member: {
            readonly id: string, 
            readonly profile?: {
                readonly id: string, 
                readonly nickname?: string, 
                readonly avatar?: string
            }
        }
    }
}