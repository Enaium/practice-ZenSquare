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

package cn.enaium.zensquare.controller.category.forum.thread.reply

import cn.dev33.satoken.annotation.SaCheckPermission
import cn.dev33.satoken.annotation.SaIgnore
import cn.enaium.zensquare.bll.service.ReplyService
import cn.enaium.zensquare.model.entity.Reply
import cn.enaium.zensquare.model.entity.by
import cn.enaium.zensquare.model.entity.input.ReplyInput
import cn.enaium.zensquare.repository.ReplyRepository
import org.babyfish.jimmer.client.FetchBy
import org.babyfish.jimmer.sql.kt.fetcher.newFetcher
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageRequest
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import java.util.*

/**
 * reply controller
 *
 * @author Enaium
 */
@RestController
class ReplyController(
    val replyService: ReplyService,
    val replyRepository: ReplyRepository
) {
    /**
     * Get replies by thread id
     *
     * @param threadId thread id
     * @param page page
     * @param size size
     * @return Page<Reply>
     */
    @SaIgnore
    @GetMapping("/categories/forum/thread/{threadId}/replies/")
    fun findReplies(
        @PathVariable threadId: UUID,
        @RequestParam(defaultValue = "0") page: Int = 0,
        @RequestParam(defaultValue = "10") size: Int = 10
    ): Page<@FetchBy("FULL_REPLY") Reply> {
        return replyRepository.findAllByThreadId(PageRequest.of(page, size), threadId, FULL_REPLY)
    }

    /**
     * Reply to a thread or reply
     *
     * @param replyInput
     */
    @SaCheckPermission("put-reply")
    @PutMapping("/categories/forum/thread/replies/")
    @ResponseStatus(HttpStatus.OK)
    fun saveReply(@RequestBody replyInput: ReplyInput) {
        replyService.saveReply(replyInput)
    }

    companion object {
        val FULL_REPLY = newFetcher(Reply::class).by {
            allScalarFields()
            member {
                profile {
                    allScalarFields()
                    nickname()
                    avatar()
                    role {
                        name()
                    }
                }
            }
            like()
        }
    }
}