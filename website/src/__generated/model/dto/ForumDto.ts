export type ForumDto = {
    'DEFAULT': {
        readonly createdTime: string, 
        readonly modifiedTime: string, 
        readonly id: string, 
        readonly name: string, 
        readonly description: string, 
        readonly categoryId: string, 
        readonly category: {readonly id: string}, 
        readonly icon?: string
    }
}