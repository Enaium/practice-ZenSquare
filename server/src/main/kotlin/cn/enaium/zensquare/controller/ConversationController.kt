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

package cn.enaium.zensquare.controller

import cn.enaium.zensquare.bll.service.ConversationService
import cn.enaium.zensquare.model.entity.Thread
import cn.enaium.zensquare.model.entity.fetcher.ThreadFetcher
import cn.enaium.zensquare.model.entity.input.ThreadInput
import org.babyfish.jimmer.client.FetchBy
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageRequest
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import java.util.*

/**
 * @author Enaium
 */
@RestController
class ConversationController(
    val conversationService: ConversationService
) {

    /**
     * Create a conversation
     *
     * @param threadInput thread input
     * @param members members
     */
    @PutMapping("/threads/conversations/")
    @ResponseStatus(HttpStatus.OK)
    fun saveConversations(@RequestBody threadInput: ThreadInput, @RequestParam members: Array<UUID>) {
        conversationService.createConversation(threadInput, members)
    }

    /**
     * Find a conversation
     *
     * @param threadId thread id
     * @return conversation
     */
    @GetMapping("/members/threads/conversations/{threadId}")
    fun findConversation(@PathVariable threadId: UUID):
            @FetchBy("FULL_CONVERSATION", ownerType = ThreadFetcher::class) Thread? {
        return conversationService.findConversation(threadId)
    }

    /**
     * Find conversations
     *
     * @param page page
     * @param size size
     * @param memberId member id
     * @return conversations
     */
    @GetMapping("/members/{memberId}/threads/conversations/")
    fun findConversations(
        @RequestParam(defaultValue = "0") page: Int = 0,
        @RequestParam(defaultValue = "10") size: Int = 10,
        @PathVariable memberId: UUID
    ): Page<@FetchBy("DEFAULT_THREAD", ownerType = ThreadFetcher::class) Thread> {
        return conversationService.findConversations(PageRequest.of(page, size), memberId)
    }
}