export type MemberDto = {
    'DEFAULT': {
        readonly createdTime: string, 
        readonly modifiedTime: string, 
        readonly id: string, 
        readonly username: string, 
        readonly password: string, 
        readonly followers: ReadonlyArray<{readonly id: string}>
    }
}