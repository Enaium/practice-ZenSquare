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

package cn.enaium.zensquare.controller.member.rank

import cn.dev33.satoken.annotation.SaIgnore
import cn.enaium.zensquare.model.entity.Member
import cn.enaium.zensquare.repository.MemberRankRepository
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageRequest
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

/**
 * @author Enaium
 */
@SaIgnore
@RestController
class RankController(
    val memberRankRepository: MemberRankRepository
) {
    /**
     * Find member rank by post
     *
     * @param page page
     * @param size size
     * @return member rank
     */
    @GetMapping("/members/rank/thread/")
    fun findThreadRank(
        @RequestParam(defaultValue = "0") page: Int = 0,
        @RequestParam(defaultValue = "10") size: Int = 10
    ): Page<Member> {
        return memberRankRepository.findTop100OrderByThread(PageRequest.of(page, size))
    }
}