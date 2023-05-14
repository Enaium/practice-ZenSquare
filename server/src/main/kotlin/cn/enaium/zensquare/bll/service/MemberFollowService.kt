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

package cn.enaium.zensquare.bll.service

import cn.enaium.zensquare.model.entity.Member
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import java.util.*

/**
 * @author Enaium
 */
interface MemberFollowService {
    fun isFollow(memberId: UUID, followId: UUID): Boolean
    fun followings(pageable: Pageable, memberId: UUID): Page<Member>
    fun followers(pageable: Pageable, memberId: UUID): Page<Member>
    fun follow(memberId: UUID, followId: UUID)
    fun unfollow(memberId: UUID, followId: UUID)
}