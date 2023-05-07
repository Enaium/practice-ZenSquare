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

package cn.enaium.zensquare.repository

import cn.enaium.zensquare.controller.category.forum.thread.ThreadController
import cn.enaium.zensquare.model.entity.*
import cn.enaium.zensquare.model.entity.input.ThreadInput
import org.babyfish.jimmer.spring.repository.KRepository
import org.babyfish.jimmer.sql.fetcher.Fetcher
import org.babyfish.jimmer.sql.kt.ast.expression.eq
import org.babyfish.jimmer.sql.kt.ast.expression.ilike
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Repository
import java.util.*

/**
 * @author Enaium
 */
@Repository
interface ThreadRepository : KRepository<Thread, UUID> {
    fun findAllByForumId(pageable: Pageable, forumId: UUID, fetcher: Fetcher<Thread>? = null): Page<Thread>

    fun findAllByThread(pageable: Pageable, threadInput: ThreadInput?): Page<Thread> =
        pager(pageable).execute(sql.createQuery(Thread::class) {
            if (threadInput != null) {
                threadInput.title?.takeIf { it.isNotBlank() }?.let { where(table.title ilike it) }
                threadInput.content?.takeIf { it.isNotBlank() }?.let { where(table.content ilike it) }
                threadInput.memberId?.let {
                    where(table.memberId eq it)
                }
                threadInput.forumId?.let {
                    where(table.forumId eq it)
                }
            }
            select(table.fetch(ThreadController.DEFAULT_THREAD))
        })
}
