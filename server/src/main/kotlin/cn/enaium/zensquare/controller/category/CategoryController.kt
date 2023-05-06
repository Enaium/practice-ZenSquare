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

package cn.enaium.zensquare.controller.category

import cn.enaium.zensquare.model.entity.Forum
import cn.enaium.zensquare.repository.CategoryRepository
import cn.enaium.zensquare.repository.ForumRepository
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.util.*

/**
 * @author Enaium
 */
@RestController
@RequestMapping("/category/")
class CategoryController(
    val categoryRepository: CategoryRepository,
    val forumRepository: ForumRepository
) {
    @GetMapping("{id}/forums")
    fun forums(@PathVariable id: UUID): List<Forum> {
        return forumRepository.findAllByCategoryId(id)
    }
}