import type { Executor } from './';

import { CategoryController, Controller, ImageController, MemberController, MemberProfileController, SessionController } from './services';

export class Api {
    
    readonly controller: Controller;
    
    readonly categoryController: CategoryController;
    
    readonly imageController: ImageController;
    
    readonly memberController: MemberController;
    
    readonly memberProfileController: MemberProfileController;
    
    readonly sessionController: SessionController;
    
    constructor(executor: Executor) {
        this.controller = new Controller(executor);
        this.categoryController = new CategoryController(executor);
        this.imageController = new ImageController(executor);
        this.memberController = new MemberController(executor);
        this.memberProfileController = new MemberProfileController(executor);
        this.sessionController = new SessionController(executor);
    }
}