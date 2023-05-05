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

package cn.enaium.zensquare.model.entity.input

import cn.enaium.zensquare.model.entity.MemberProfile
import org.babyfish.jimmer.Input
import org.mapstruct.BeanMapping
import org.mapstruct.Mapper
import org.mapstruct.ReportingPolicy
import org.mapstruct.factory.Mappers
import java.time.LocalDate
import java.util.*

data class MemberProfileInput(
    val id: UUID?,
    val memberId: UUID?,
    val nickname: String?,
    val birthday: LocalDate?,
    val location: String?,
    val website: String?,
    val description: String?,
    val github: String?,
    val bilibili: String?,
    val email: String?,
    val roleId: UUID?,
    val avatar: UUID?
) : Input<MemberProfile> {

    override fun toEntity(): MemberProfile {
        return CONVERTER.toMemberProfile(this)
    }

    @Mapper
    interface Converter {
        @BeanMapping(unmappedTargetPolicy = ReportingPolicy.IGNORE)
        fun toMemberProfile(input: MemberProfileInput): MemberProfile
    }

    companion object {
        @JvmStatic
        private val CONVERTER = Mappers.getMapper(Converter::class.java)
    }
}

