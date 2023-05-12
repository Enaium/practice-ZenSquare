export type MemberProfileDto = {
    'MemberProfileController/DEFAULT_MEMBER_PROFILE': {
        readonly id: string, 
        readonly nickname?: string, 
        readonly avatar?: string, 
        readonly createdTime: string, 
        readonly modifiedTime: string, 
        readonly member: {
            readonly id: string, 
            readonly createdTime: string
        }, 
        readonly role: {
            readonly id: string, 
            readonly name: string
        }
    }, 
    'DEFAULT': {
        readonly createdTime: string, 
        readonly modifiedTime: string, 
        readonly id: string, 
        readonly memberId: string, 
        readonly member: {readonly id: string}, 
        readonly nickname?: string, 
        readonly birthday?: string, 
        readonly location?: string, 
        readonly website?: string, 
        readonly description?: string, 
        readonly github?: string, 
        readonly bilibili?: string, 
        readonly email?: string, 
        readonly roleId: string, 
        readonly role: {readonly id: string}, 
        readonly avatar?: string
    }, 
    'MemberProfileController/FULL_MEMBER_PROFILE': {
        readonly id: string, 
        readonly createdTime: string, 
        readonly modifiedTime: string, 
        readonly memberId: string, 
        readonly nickname?: string, 
        readonly birthday?: string, 
        readonly location?: string, 
        readonly website?: string, 
        readonly description?: string, 
        readonly github?: string, 
        readonly bilibili?: string, 
        readonly email?: string, 
        readonly roleId: string, 
        readonly avatar?: string, 
        readonly member: {
            readonly id: string, 
            readonly createdTime: string, 
            readonly modifiedTime: string, 
            readonly username: string, 
            readonly thread: number, 
            readonly reply: number
        }, 
        readonly role: {
            readonly id: string, 
            readonly createdTime: string, 
            readonly modifiedTime: string, 
            readonly name: string, 
            readonly description: string
        }
    }
}