import type { Executor } from './';

import { CategoryController, ConversationController, ForumController, ImageController, MemberController, MemberFollowController, MemberLikeController, MemberProfileController, MemberRankController, PostController, ReplyController, ReportController, SessionController } from './services';

export class Api {
    
    readonly categoryController: CategoryController;
    
    readonly conversationController: ConversationController;
    
    readonly forumController: ForumController;
    
    readonly imageController: ImageController;
    
    readonly memberController: MemberController;
    
    readonly memberFollowController: MemberFollowController;
    
    readonly memberLikeController: MemberLikeController;
    
    readonly memberProfileController: MemberProfileController;
    
    readonly memberRankController: MemberRankController;
    
    readonly postController: PostController;
    
    readonly replyController: ReplyController;
    
    readonly reportController: ReportController;
    
    readonly sessionController: SessionController;
    
    constructor(executor: Executor) {
        this.categoryController = new CategoryController(executor);
        this.conversationController = new ConversationController(executor);
        this.forumController = new ForumController(executor);
        this.imageController = new ImageController(executor);
        this.memberController = new MemberController(executor);
        this.memberFollowController = new MemberFollowController(executor);
        this.memberLikeController = new MemberLikeController(executor);
        this.memberProfileController = new MemberProfileController(executor);
        this.memberRankController = new MemberRankController(executor);
        this.postController = new PostController(executor);
        this.replyController = new ReplyController(executor);
        this.reportController = new ReportController(executor);
        this.sessionController = new SessionController(executor);
    }
}