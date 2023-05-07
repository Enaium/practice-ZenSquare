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

package cn.enaium.zensquare.bll.resolver

import cn.enaium.zensquare.model.entity.*
import org.babyfish.jimmer.sql.kt.KSqlClient
import org.babyfish.jimmer.sql.kt.KTransientResolver
import org.babyfish.jimmer.sql.kt.ast.expression.max
import org.babyfish.jimmer.sql.kt.ast.expression.valueIn
import org.springframework.stereotype.Component
import java.util.*

/**
 * find last reply member
 *
 * @author Enaium
 */
@Component
class ThreadLastReplyMemberResolver(val sql: KSqlClient) : KTransientResolver<UUID, UUID> {
    override fun resolve(ids: Collection<UUID>): Map<UUID, UUID> = sql.createQuery(Thread::class) {
        where(table.id valueIn ids)
        groupBy(table.id, table.asTableEx().replies.member.id)
        select(table.id, max(table.asTableEx().replies.modifiedTime), table.asTableEx().replies.member.id)
    }.execute().associateBy({ it._1 }) { it._3 }
}