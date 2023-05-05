export type MemberProfileDto = {
    'DEFAULT': {
        readonly createdTime: string, 
        readonly modifiedTime: string, 
        readonly id: string, 
        readonly memberId: string, 
        readonly member: {readonly id: string}, 
        readonly nickname: string, 
        readonly birthday: string, 
        readonly location: string, 
        readonly website: string, 
        readonly description: string, 
        readonly github: string, 
        readonly bilibili: string, 
        readonly email: string, 
        readonly roleId: string, 
        readonly role: {readonly id: string}, 
        readonly avatar: string
    }
}