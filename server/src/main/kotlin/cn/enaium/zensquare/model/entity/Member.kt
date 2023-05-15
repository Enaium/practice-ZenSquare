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

package cn.enaium.zensquare.model.entity

import cn.enaium.zensquare.bll.resolver.MemberMessageCountResolver
import cn.enaium.zensquare.bll.resolver.MemberReplyCountResolver
import cn.enaium.zensquare.bll.resolver.MemberThreadCountResolver
import cn.enaium.zensquare.model.entity.common.BaseEntity
import org.babyfish.jimmer.sql.*
import org.babyfish.jimmer.sql.GenerationType.USER
import org.babyfish.jimmer.sql.meta.UUIDIdGenerator
import java.util.*

/**
 * @author Enaium
 */
@Entity
interface Member : BaseEntity {
    @Id
    @GeneratedValue(strategy = USER, generatorType = UUIDIdGenerator::class)
    val id: UUID

    val username: String

    val password: String

    @OneToOne(mappedBy = "member")
    val profile: MemberProfile?

    @OneToMany(mappedBy = "targetMember")
    val alerts: List<Alert>

    @ManyToMany
    @JoinTable(name = "follow_mapping", joinColumnName = "follower_id", inverseJoinColumnName = "following_id")
    val followers: List<Member>

    @ManyToMany(mappedBy = "followers")
    val followings: List<Member>

    @OneToMany(mappedBy = "member")
    val threads: List<Thread>

    @Transient(MemberThreadCountResolver::class)
    val thread: Long

    @OneToMany(mappedBy = "member")
    val replies: List<Reply>

    @Transient(MemberReplyCountResolver::class)
    val reply: Long

    @Transient(MemberMessageCountResolver::class)
    val message: Long

    @OneToMany(mappedBy = "targetMember")
    val reports: List<Report>
}
