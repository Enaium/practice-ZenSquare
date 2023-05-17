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

import cn.dev33.satoken.annotation.SaCheckPermission
import cn.dev33.satoken.annotation.SaIgnore
import cn.enaium.zensquare.bll.service.PostService
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
 * thread controller
 *
 * @author Enaium
 */
@RestController
class PostController(
    val postService: PostService
) {
    /**
     * Get thread by id
     *
     * @param id
     * @return
     */
    @SaIgnore
    @GetMapping("/categories/forums/threads/posts/{id}/")
    fun findPost(@PathVariable id: UUID): @FetchBy("FULL_POST", ownerType = ThreadFetcher::class) Thread? {
        return postService.findPost(id)
    }

    /**
     * Get latest threads
     *
     * @param page
     * @param size
     * @return
     */
    @SaIgnore
    @GetMapping("/categories/forums/threads/posts/latest/")
    fun findLatest(
        @RequestParam(defaultValue = "0") page: Int = 0,
        @RequestParam(defaultValue = "10") size: Int = 10
    ): Page<@FetchBy("DEFAULT_THREAD", ownerType = ThreadFetcher::class) Thread> {
        return postService.findLatestPosts(PageRequest.of(page, size))
    }

    /**
     * Get threads by forum id
     *
     * @param forumId forum id
     * @param page page
     * @param size size
     * @return Page<Thread>
     */
    @SaIgnore
    @GetMapping("/categories/forums/{forumId}/threads/posts/")
    fun findPosts(
        @PathVariable forumId: UUID,
        @RequestParam(defaultValue = "0") page: Int = 0,
        @RequestParam(defaultValue = "10") size: Int = 10
    ): Page<@FetchBy("DEFAULT_THREAD", ownerType = ThreadFetcher::class) Thread> {
        return postService.findPostsByForumId(PageRequest.of(page, size), forumId)
    }

    /**
     * Get threads by thread all fields
     *
     * @param page page
     * @param size size
     * @param threadInput thread input
     * @return Page<Thread>
     */
    @GetMapping("/categories/forums/threads/posts/")
    fun findComplexPosts(
        @RequestParam(defaultValue = "0") page: Int = 0,
        @RequestParam(defaultValue = "10") size: Int = 10,
        threadInput: ThreadInput?
    ): Page<@FetchBy("DEFAULT_THREAD", ownerType = ThreadFetcher::class) Thread> {
        return postService.searchPosts(PageRequest.of(page, size), threadInput)
    }

    /**
     * Create thread or update thread
     *
     * @param threadInput thread input
     */
    @SaCheckPermission("put-thread")
    @PutMapping("/categories/forums/threads/posts/")
    @ResponseStatus(HttpStatus.OK)
    fun savePost(@RequestBody threadInput: ThreadInput) {
        postService.createPost(threadInput)
    }
}