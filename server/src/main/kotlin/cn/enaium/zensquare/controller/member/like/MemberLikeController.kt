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

import cn.enaium.zensquare.bll.service.MemberLikeService
import cn.enaium.zensquare.model.entity.MemberLike
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import java.util.*

/**
 * member like controller
 *
 * @author Enaium
 */
@RestController
class MemberLikeController(val memberLikeService: MemberLikeService) {

    /**
     * find like by member id and target id
     *
     * @param memberId member id
     * @param target thread id or reply id
     * @return like
     */
    @GetMapping("/members/{memberId}/likes/{target}/")
    fun findLike(@PathVariable memberId: UUID, @PathVariable target: UUID): MemberLike? {
        return memberLikeService.findLike(memberId, target)
    }

    /**
     * like
     *
     * @param memberId member id
     * @param target target id
     * @param dislike dislike
     */
    @PutMapping("/members/{memberId}/likes/{target}/")
    @ResponseStatus(HttpStatus.OK)
    fun like(@PathVariable memberId: UUID, @PathVariable target: UUID, @RequestParam dislike: Boolean) {
        memberLikeService.like(memberId, target, dislike)
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
        memberLikeService.unlike(memberId, target)
    }
}