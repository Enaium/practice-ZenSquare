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

import cn.enaium.zensquare.model.entity.*
import cn.enaium.zensquare.model.entity.fetcher.ThreadFetcher
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

    /**
     * Find thread by id and type
     *
     * @param id thread id
     * @param type thread type
     * @param fetcher fetcher
     * @return thread
     */
    fun findByIdAndType(id: UUID, type: ThreadType, fetcher: Fetcher<Thread>? = null): Thread?

    /**
     * Find all thread by forum id and type
     *
     * @param pageable page
     * @param forumId forum id
     * @param type thread type
     * @param fetcher fetcher
     * @return thread page
     */
    fun findAllByForumIdAndType(
        pageable: Pageable,
        forumId: UUID,
        type: ThreadType,
        fetcher: Fetcher<Thread>? = null
    ): Page<Thread>

    /**
     * Find all thread by member id and type
     *
     * @param pageable page
     * @param memberId member id
     * @param type thread type
     * @param fetcher fetcher
     * @return thread page
     */
    fun findAllByMemberIdAndType(
        pageable: Pageable,
        memberId: UUID,
        type: ThreadType,
        fetcher: Fetcher<Thread>? = null
    ): Page<Thread>

    /**
     * Find all thread by member id and type
     *
     * @param pageable page
     * @param type thread type
     * @param fetcher fetcher
     * @return thread page
     */
    fun findTop30ByTypeOrderByModifiedTimeDesc(
        pageable: Pageable,
        type: ThreadType,
        fetcher: Fetcher<Thread>? = null,
    ): Page<Thread>

    /**
     * Find all thread by thread input and type
     *
     * @param pageable page
     * @param threadInput thread input
     * @param type thread type
     * @return thread page
     */
    fun findAllByThreadAndType(
        pageable: Pageable,
        threadInput: ThreadInput?,
        type: ThreadType
    ): Page<Thread> =
        pager(pageable).execute(sql.createQuery(Thread::class) {
            where(table.type eq type)
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
            select(table.fetch(ThreadFetcher.DEFAULT_THREAD))
        })
}
