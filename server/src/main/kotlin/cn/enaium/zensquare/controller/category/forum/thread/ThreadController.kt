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

package cn.enaium.zensquare.controller.category.forum.thread

import cn.enaium.zensquare.model.entity.Thread
import cn.enaium.zensquare.model.entity.by
import cn.enaium.zensquare.model.entity.input.ThreadInput
import cn.enaium.zensquare.repository.ThreadRepository
import org.babyfish.jimmer.client.FetchBy
import org.babyfish.jimmer.sql.kt.fetcher.newFetcher
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageRequest
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import java.util.*

/**
 * thread controller
 *
 * @author Enaium
 */
@RestController
class ThreadController(
    val threadRepository: ThreadRepository
) {

    /**
     * Get threads by forum id
     *
     * @param forumId forum id
     * @param page page
     * @param size size
     * @return Page<Thread>
     */
    @GetMapping("/categories/forums/{forumId}/threads/")
    fun findThreads(
        @PathVariable forumId: UUID,
        @RequestParam(defaultValue = "0") page: Int = 0,
        @RequestParam(defaultValue = "10") size: Int = 10
    ): Page<@FetchBy("DEFAULT_THREAD") Thread> {
        return threadRepository.findAllByForumId(forumId, DEFAULT_THREAD, PageRequest.of(page, size))
    }

    /**
     * Get threads by thread all fields
     *
     * @param page page
     * @param size size
     * @param threadInput thread input
     * @return Page<Thread>
     */
    @GetMapping("/categories/forums/threads")
    fun findComplexThreads(
        @RequestParam(defaultValue = "0") page: Int = 0,
        @RequestParam(defaultValue = "10") size: Int = 10,
        threadInput: ThreadInput?
    ): Page<@FetchBy("DEFAULT_THREAD") Thread> {
        return threadRepository.findAllByThread(PageRequest.of(page, size), threadInput)
    }

    /**
     * Create a thread
     *
     * @param threadInput thread input
     */
    @PutMapping("/categories/forums/threads/")
    @ResponseStatus(HttpStatus.OK)
    fun saveThread(threadInput: ThreadInput) {
//        threadRepository.save(threadInput)
    }

    companion object {
        val DEFAULT_THREAD = newFetcher(Thread::class).by {
            allScalarFields()
            content(false)
        }
    }
}