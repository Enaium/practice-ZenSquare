import type { AlertType } from '../enums';

export type AlertDto = {
    'AlertFetcher/DEFAULT_FETCHER': {
        readonly id: string, 
        readonly createdTime: string, 
        readonly modifiedTime: string, 
        readonly sourceMemberId: string, 
        readonly targetMemberId: string, 
        readonly target: string, 
        readonly unread: boolean, 
        readonly type: AlertType, 
        readonly sourceMember: {
            readonly id: string, 
            readonly profile?: {
                readonly id: string, 
                readonly nickname?: string, 
                readonly avatar?: string, 
                readonly role: {
                    readonly id: string, 
                    readonly name: string, 
                    readonly description: string
                }
            }
        }, 
        readonly targetMember: {
            readonly id: string, 
            readonly profile?: {
                readonly id: string, 
                readonly nickname?: string, 
                readonly avatar?: string, 
                readonly role: {
                    readonly id: string, 
                    readonly name: string, 
                    readonly description: string
                }
            }
        }
    }
}