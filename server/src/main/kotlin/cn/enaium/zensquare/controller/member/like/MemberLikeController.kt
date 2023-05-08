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

package cn.enaium.zensquare.controller.member.like

import cn.enaium.zensquare.model.entity.MemberLike
import cn.enaium.zensquare.model.entity.by
import cn.enaium.zensquare.repository.MemberLikeRepository
import org.babyfish.jimmer.kt.new
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import java.util.*

/**
 * member like controller
 *
 * @author Enaium
 */
@RestController
class MemberLikeController(val memberLikeRepository: MemberLikeRepository) {
    /**
     * like
     *
     * @param memberId member id
     * @param target  target id
     */
    @PutMapping("/members/{memberId}/likes/{target}/")
    @ResponseStatus(HttpStatus.OK)
    fun like(@PathVariable memberId: UUID, @PathVariable target: UUID) {
        memberLikeRepository.insert(new(MemberLike::class).by {
            this.memberId = memberId
            this.target = target
        })
    }

    /**
     * unlike
     *
     * @param memberId member id
     * @param target target id
     */
    @DeleteMapping("/members/{memberId}/likes/{target}/")
    @ResponseStatus(HttpStatus.OK)
    fun unlike(@PathVariable memberId: UUID, @PathVariable target: UUID) {
        memberLikeRepository.delete(new(MemberLike::class).by {
            this.memberId = memberId
            this.target = target
        })
    }
}