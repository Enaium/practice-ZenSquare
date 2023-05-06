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
import cn.enaium.zensquare.model.entity.Category
import cn.enaium.zensquare.model.entity.by
import cn.enaium.zensquare.repository.CategoryRepository
import org.babyfish.jimmer.client.FetchBy
import org.babyfish.jimmer.sql.kt.fetcher.newFetcher
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

/**
 * @author Enaium
 */
@RestController
@RequestMapping("/")
class Controller(
    val categoryRepository: CategoryRepository
) {
    @SaIgnore
    @GetMapping("categories")
    fun categories(): List<@FetchBy("DEFAULT_CATEGORY") Category> {
        return categoryRepository.findAll(DEFAULT_CATEGORY)
    }

    companion object {
        val DEFAULT_CATEGORY = newFetcher(Category::class).by {
            allScalarFields()
            forums {
                allScalarFields()
            }
        }
    }
}