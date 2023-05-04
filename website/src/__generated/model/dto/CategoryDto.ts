export type CategoryDto = {
    'Controller/FULL_CATEGORY': {
        readonly id: string, 
        readonly createdTime: string, 
        readonly modifiedTime: string, 
        readonly name: string, 
        readonly description: string, 
        readonly threads: ReadonlyArray<{
            readonly id: string, 
            readonly createdTime: string, 
            readonly modifiedTime: string, 
            readonly name: string, 
            readonly description: string, 
            readonly categoryId: string
        }>
    }
}