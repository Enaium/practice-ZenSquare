export type MemberDto = {
    'MemberRankController/DEFAULT_MEMBER_RANK': {
        readonly id: string, 
        readonly profile?: {
            readonly id: string, 
            readonly avatar?: string, 
            readonly nickname?: string
        }, 
        readonly thread: number, 
        readonly reply: number
    }
}