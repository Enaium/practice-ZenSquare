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

package cn.enaium.zensquare.controller.forum

import cn.enaium.zensquare.model.entity.Thread
import cn.enaium.zensquare.model.entity.by
import cn.enaium.zensquare.repository.ThreadRepository
import org.babyfish.jimmer.client.FetchBy
import org.babyfish.jimmer.sql.kt.fetcher.newFetcher
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.util.*

/**
 * @author Enaium
 */
@RestController
@RequestMapping("/forum/")
class ForumController(
    val threadRepository: ThreadRepository
) {
    @RequestMapping("{id}/threads")
    fun threads(@PathVariable id: UUID): List<@FetchBy("DEFAULT_THREAD") Thread> {
        return threadRepository.findAllByForumId(id, DEFAULT_THREAD)
    }

    companion object {
        val DEFAULT_THREAD = newFetcher(Thread::class).by {
            allScalarFields()
            content(false)
        }
    }
}