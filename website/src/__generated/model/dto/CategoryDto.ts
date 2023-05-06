export type CategoryDto = {
    'Controller/DEFAULT_CATEGORY': {
        readonly id: string, 
        readonly createdTime: string, 
        readonly modifiedTime: string, 
        readonly name: string, 
        readonly description: string, 
        readonly forums: ReadonlyArray<{
            readonly id: string, 
            readonly createdTime: string, 
            readonly modifiedTime: string, 
            readonly name: string, 
            readonly description: string, 
            readonly categoryId: string, 
            readonly icon?: string
        }>
    }
}