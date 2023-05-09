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

import cn.enaium.zensquare.model.entity.Thread
import cn.enaium.zensquare.model.entity.dislike
import cn.enaium.zensquare.model.entity.id
import cn.enaium.zensquare.model.entity.likes
import org.babyfish.jimmer.sql.kt.KSqlClient
import org.babyfish.jimmer.sql.kt.KTransientResolver
import org.babyfish.jimmer.sql.kt.ast.expression.count
import org.babyfish.jimmer.sql.kt.ast.expression.eq
import org.babyfish.jimmer.sql.kt.ast.expression.valueIn
import org.springframework.stereotype.Component
import java.util.*

/**
 * count like
 *
 * @author Enaium
 */
@Component
class ThreadLikeCountResolver(val sql: KSqlClient) : KTransientResolver<UUID, Long> {
    /**
     * count like
     *
     * @param ids ids
     * @return count
     */
    override fun resolve(ids: Collection<UUID>): Map<UUID, Long> = sql.createQuery(Thread::class) {
        where(table.id valueIn ids, table.asTableEx().likes.dislike eq false)
        groupBy(table.id)
        select(table.id, count(table.asTableEx().likes.id, true))
    }.execute().associateBy({ it._1 }) { it._2 }

    override fun getDefaultValue(): Long = 0
}