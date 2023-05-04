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

import cn.enaium.zensquare.model.entity.common.BaseEntity
import org.babyfish.jimmer.sql.*
import org.babyfish.jimmer.sql.meta.UUIDIdGenerator
import java.util.*

/**
 * @author Enaium
 */
@Entity
interface Report : BaseEntity {
    @Id
    @GeneratedValue(generatorType = UUIDIdGenerator::class)
    val id: UUID
    val memberId: UUID

    @ManyToOne
    val member: Member

    val target: UUID

    val reportTypeId: UUID

    val description: String
}
