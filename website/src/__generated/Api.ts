import type { Executor } from './';

import { CategoryController, Controller, MemberController, MemberProfileController, SessionController } from './services';

export class Api {
    
    readonly controller: Controller;
    
    readonly categoryController: CategoryController;
    
    readonly memberController: MemberController;
    
    readonly memberProfileController: MemberProfileController;
    
    readonly sessionController: SessionController;
    
    constructor(executor: Executor) {
        this.controller = new Controller(executor);
        this.categoryController = new CategoryController(executor);
        this.memberController = new MemberController(executor);
        this.memberProfileController = new MemberProfileController(executor);
        this.sessionController = new SessionController(executor);
    }
}