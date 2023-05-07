export type ForumDto = {
    'ForumController/DEFAULT_FORUM': {
        readonly id: string, 
        readonly createdTime: string, 
        readonly modifiedTime: string, 
        readonly name: string, 
        readonly description: string, 
        readonly categoryId: string, 
        readonly icon?: string, 
        readonly category: {
            readonly id: string, 
            readonly name: string
        }, 
        readonly thread: number
    }
}