export type MemberDto = {
    'MemberFollowController/DEFAULT_MEMBER_FOLLOW': {
        readonly id: string, 
        readonly createdTime: string, 
        readonly modifiedTime: string, 
        readonly username: string, 
        readonly profile?: {
            readonly id: string, 
            readonly nickname?: string, 
            readonly description?: string
        }
    }, 
    'MemberRankController/DEFAULT_MEMBER_RANK': {
        readonly id: string, 
        readonly profile?: {
            readonly id: string, 
            readonly avatar?: string, 
            readonly nickname?: string
        }, 
        readonly thread: number, 
        readonly reply: number, 
        readonly message: number
    }
}