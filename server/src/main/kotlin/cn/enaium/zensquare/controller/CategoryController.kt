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
import cn.enaium.zensquare.model.entity.fetcher.CategoryFetcher
import cn.enaium.zensquare.repository.CategoryRepository
import org.babyfish.jimmer.client.FetchBy
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageRequest
import org.springframework.web.bind.annotation.*
import java.util.*

/**
 * category controller
 *
 * @author Enaium
 */
@RestController
class CategoryController(
    val categoryRepository: CategoryRepository
) {

    /**
     * Get category by id
     *
     * @param id category id
     * @return Category
     */
    @GetMapping("/categories/{id}/")
    fun findCategory(@PathVariable id: UUID): Category? {
        return categoryRepository.findNullable(id)
    }

    /**
     * Get all categories
     *
     * @return
     */
    @SaIgnore
    @GetMapping("/categories/")
    fun findCategories(
        @RequestParam(defaultValue = "0") page: Int = 0,
        @RequestParam(defaultValue = "10") size: Int = 10
    ): Page<@FetchBy("DEFAULT_CATEGORY", ownerType = CategoryFetcher::class) Category> {
        return categoryRepository.findAll(PageRequest.of(page, size), CategoryFetcher.DEFAULT_CATEGORY)
    }
}