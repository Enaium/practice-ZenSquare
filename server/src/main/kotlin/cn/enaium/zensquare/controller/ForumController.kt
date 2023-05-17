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

import cn.dev33.satoken.annotation.SaIgnore
import cn.enaium.zensquare.model.entity.Forum
import cn.enaium.zensquare.model.entity.fetcher.ForumFetcher
import cn.enaium.zensquare.repository.ForumRepository
import org.babyfish.jimmer.client.FetchBy
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageRequest
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import java.util.*

/**
 * forum controller
 *
 * @author Enaium
 */
@RestController
class ForumController(val forumRepository: ForumRepository) {
    /**
     * Get forum by id
     *
     * @param id forum id
     */
    @SaIgnore
    @GetMapping("/categories/forums/{id}/")
    fun findForum(@PathVariable id: UUID): @FetchBy("DEFAULT_FORUM", ownerType = ForumFetcher::class) Forum? =
        forumRepository.findNullable(id, ForumFetcher.DEFAULT_FORUM)

    /**
     * Get forums by category id
     *
     * @param categoryId category id
     * @param page page
     * @param size size
     * @return Page<Forum>
     */
    @SaIgnore
    @GetMapping("/categories/{categoryId}/forums/")
    fun findForums(
        @PathVariable categoryId: UUID,
        @RequestParam(defaultValue = "0") page: Int = 0,
        @RequestParam(defaultValue = "10") size: Int = 10
    ): Page<@FetchBy("DEFAULT_FORUM", ownerType = ForumFetcher::class) Forum> {
        return forumRepository.findAllByCategoryId(PageRequest.of(page, size), categoryId, ForumFetcher.DEFAULT_FORUM)
    }
}