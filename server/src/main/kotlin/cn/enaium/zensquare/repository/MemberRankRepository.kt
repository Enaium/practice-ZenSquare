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

import cn.enaium.zensquare.controller.member.rank.MemberRankController.Companion.DEFAULT_MEMBER_RANK
import cn.enaium.zensquare.model.entity.*
import org.babyfish.jimmer.spring.repository.KRepository
import org.babyfish.jimmer.sql.kt.ast.expression.count
import org.babyfish.jimmer.sql.kt.ast.expression.desc
import org.babyfish.jimmer.sql.kt.ast.expression.eq
import org.babyfish.jimmer.sql.kt.ast.expression.valueIn
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Repository
import java.util.*

/**
 * @author Enaium
 */
@Repository
interface MemberRankRepository : KRepository<Member, UUID> {

    /**
     * Find top 100 member order by thread count
     *
     * @param pageable Pageable
     * @return Page<Member>
     */
    fun findTop100OrderByThread(pageable: Pageable): Page<Member> =
        pager(pageable).execute(sql.createQuery(Member::class) {
            where(table.id valueIn subQuery(Thread::class) {
                groupBy(table.member.id)
                orderBy(count(table.id).desc())
                select(table.member.id).limit(100)
            })
            select(table.fetch(DEFAULT_MEMBER_RANK))
        })

    /**
     * Find top 100 member order by reply count
     *
     * @param pageable Pageable
     * @return Page<Member>
     */
    fun findTop100OrderByReply(pageable: Pageable): Page<Member> =
        pager(pageable).execute(sql.createQuery(Member::class) {
            where(table.id valueIn subQuery(Reply::class) {
                groupBy(table.member.id)
                orderBy(count(table.id).desc())
                select(table.member.id).limit(100)
            })
            select(table.fetch(DEFAULT_MEMBER_RANK))
        })

    //TODO: Find top 100 member order by message count
    fun findTop100OrderByMessage(pageable: Pageable): Page<Member> =
        pager(pageable).execute(sql.createQuery(Member::class) {

            subQuery(Thread::class) {
                where(table.member.id eq parentTable.id)
                select(table.member.id)
            }

            subQuery(Reply::class) {
                where(table.member.id eq parentTable.id)
                select(table.member.id)
            }


            groupBy(table.id)
            select(table.fetch(DEFAULT_MEMBER_RANK))
        })
}