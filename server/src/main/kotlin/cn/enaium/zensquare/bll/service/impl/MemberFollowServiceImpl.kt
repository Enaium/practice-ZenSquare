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

package cn.enaium.zensquare.bll.service.impl

import cn.enaium.zensquare.bll.error.ServiceException
import cn.enaium.zensquare.bll.service.MemberFollowService
import cn.enaium.zensquare.model.entity.Member
import cn.enaium.zensquare.model.entity.id
import cn.enaium.zensquare.repository.MemberFollowRepository
import cn.enaium.zensquare.util.i18n
import org.babyfish.jimmer.sql.kt.KSqlClient
import org.babyfish.jimmer.sql.kt.ast.expression.eq
import org.babyfish.jimmer.sql.kt.ast.table.target
import org.babyfish.jimmer.sql.kt.source
import org.springframework.context.MessageSource
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service
import java.util.*

/**
 * @author Enaium
 */
@Service
class MemberFollowServiceImpl(
    val memberFollowRepository: MemberFollowRepository,
    val sql: KSqlClient,
    val message: MessageSource
) : MemberFollowService {

    /**
     * Is follow
     *
     * @param memberId follower
     * @param followId following
     * @return Boolean
     */
    override fun isFollow(memberId: UUID, followId: UUID): Boolean = sql.queries.forList(Member::followings) {
        where(table.source.id eq memberId, table.target.id eq followId)
        select(table.target)
    }.fetchOneOrNull() != null

    /**
     * Find followings by member id
     *
     * @param pageable Pageable
     * @param memberId UUID
     * @return Page<Member>
     */
    override fun followings(pageable: Pageable, memberId: UUID): Page<Member> =
        memberFollowRepository.pager(pageable).execute(sql.queries.forList(Member::followings) {
            where(table.source.id eq memberId)
            select(table.target)
        })

    /**
     * Find followers by member id
     *
     * @param pageable Pageable
     * @param memberId UUID
     * @return Page<Member>
     */
    override fun followers(pageable: Pageable, memberId: UUID): Page<Member> =
        memberFollowRepository.pager(pageable).execute(sql.queries.forList(Member::followers) {
            where(table.source.id eq memberId)
            select(table.target)
        })

    /**
     * Follow
     *
     * @param memberId follower
     * @param followId following
     */
    override fun follow(memberId: UUID, followId: UUID) {
        sql.queries.forList(Member::followings) {
            where(table.source.id eq memberId, table.target.id eq followId)
            select(table.target)
        }.fetchOneOrNull()?.let {
            throw ServiceException(
                HttpStatus.BAD_REQUEST,
                message.i18n("controller.member.follow.alreadyFollow")
            )
        }
        sql.getAssociations(Member::followings).save(memberId, followId, true)
    }

    /**
     * Unfollow
     *
     * @param memberId follower
     * @param followId following
     */
    override fun unfollow(memberId: UUID, followId: UUID) {
        sql.queries.forList(Member::followings) {
            where(table.source.id eq memberId, table.target.id eq followId)
            select(table.target)
        }.fetchOneOrNull()?.let {
            throw ServiceException(
                HttpStatus.BAD_REQUEST,
                message.i18n("controller.member.follow.alreadyUnfollow")
            )
        }
        sql.getAssociations(Member::followings).delete(memberId, followId)
    }
}