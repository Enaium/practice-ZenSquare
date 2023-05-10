/*
 * ZenSquare is an opensource forums
 *
 * Copyright (C) 2023  Enaium
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

package cn.enaium.zensquare.controller.category.forum.thread.reply.child

import cn.enaium.zensquare.model.entity.Reply
import cn.enaium.zensquare.repository.ReplyRepository
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageRequest
import org.springframework.web.bind.annotation.*
import java.util.*

/**
 * child reply controller
 *
 * @author Enaium
 */
@RequestMapping
@RestController
class ChildReplyController(val replyRepository: ReplyRepository) {
    /**
     * Find all child replies
     *
     * @param page page
     * @param size size
     * @param replyId reply id
     * @return Page<Reply>
     */
    @GetMapping("/categories/forum/thread/replies/{replyId}/children/")
    fun findChildrenReplies(
        @RequestParam(defaultValue = "0") page: Int = 0,
        @RequestParam(defaultValue = "10") size: Int = 10,
        @PathVariable replyId: UUID
    ): Page<Reply> {
        return replyRepository.findAllByParentId(PageRequest.of(page, size), replyId)
    }
}