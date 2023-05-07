export type ThreadDto = {
    'ThreadController/DEFAULT_THREAD': {
        readonly id: string, 
        readonly createdTime: string, 
        readonly modifiedTime: string, 
        readonly title: string, 
        readonly memberId?: string, 
        readonly forumId?: string, 
        readonly replyTime: string
    }
}