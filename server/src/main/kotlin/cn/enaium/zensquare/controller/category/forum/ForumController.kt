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

package cn.enaium.zensquare.controller.category.forum

import cn.enaium.zensquare.model.entity.Forum
import cn.enaium.zensquare.model.entity.by
import cn.enaium.zensquare.repository.ForumRepository
import org.babyfish.jimmer.client.FetchBy
import org.babyfish.jimmer.sql.kt.fetcher.newFetcher
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageRequest
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import java.util.*

/**
 * @author Enaium
 */
@RestController
class ForumController(val forumRepository: ForumRepository) {
    @GetMapping("/categories/forums/{id}")
    fun findForum(@PathVariable id: UUID) = forumRepository.findById(id)

    @GetMapping("/categories/{categoryId}/forums")
    fun findForums(
        @PathVariable categoryId: UUID,
        @RequestParam(defaultValue = "0") page: Int = 0,
        @RequestParam(defaultValue = "10") size: Int = 10
    ): Page<@FetchBy("DEFAULT_FORUM") Forum> {
        return forumRepository.findAllByCategoryId(categoryId, DEFAULT_FORUM, PageRequest.of(page, size))
    }

    companion object {
        val DEFAULT_FORUM = newFetcher(Forum::class).by {
            allScalarFields()
            thread()
        }
    }
}