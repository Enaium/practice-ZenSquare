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

import cn.enaium.zensquare.bll.resolver.ThreadLastReplyMemberResolver
import cn.enaium.zensquare.bll.resolver.ThreadLastReplyTimeResolver
import cn.enaium.zensquare.bll.resolver.ThreadLikeCountResolver
import cn.enaium.zensquare.bll.resolver.ThreadReplyCountResolver
import cn.enaium.zensquare.model.entity.common.BaseEntity
import org.babyfish.jimmer.sql.*
import org.babyfish.jimmer.sql.meta.UUIDIdGenerator
import java.time.LocalDateTime
import java.util.*

/**
 * @author Enaium
 */
@Entity
interface Thread : BaseEntity {
    @Id
    @GeneratedValue(generatorType = UUIDIdGenerator::class)
    val id: UUID
    val title: String

    val content: String

    val memberId: UUID?

    @ManyToOne
    val member: Member

    val forumId: UUID?

    @ManyToOne
    val forum: Forum

    @OneToMany(mappedBy = "thread")
    val replies: List<Reply>

    @Transient(ThreadReplyCountResolver::class)
    val reply: Long

    /**
     * latest reply time
     */
    @Transient(ThreadLastReplyTimeResolver::class)
    val lastReplyTime: LocalDateTime?

    /**
     * latest reply member
     */
    @Transient(ThreadLastReplyMemberResolver::class)
    val lastReplyMember: Member?

    @OneToMany(mappedBy = "thread")
    val likes: List<MemberLike>

    /**
     * like count
     */
    @Transient(ThreadLikeCountResolver::class)
    val like: Long

    @OneToMany(mappedBy = "targetThread")
    val reports: List<Report>
}
