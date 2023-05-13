export type MemberDto = {
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
    }, 
    'DEFAULT': {
        readonly createdTime: string, 
        readonly modifiedTime: string, 
        readonly id: string, 
        readonly username: string, 
        readonly password: string, 
        readonly followers: ReadonlyArray<{readonly id: string}>
    }
}