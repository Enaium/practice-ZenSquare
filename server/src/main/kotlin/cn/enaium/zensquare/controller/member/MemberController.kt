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

package cn.enaium.zensquare.controller.member

import cn.enaium.zensquare.bll.service.MemberService
import cn.enaium.zensquare.model.entity.input.MemberInput
import cn.enaium.zensquare.model.entity.input.MemberProfileInput
import cn.enaium.zensquare.repository.MemberProfileRepository
import org.springframework.data.domain.PageRequest
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*

/**
 * @author Enaium
 */
@RestController
@RequestMapping("/member/")
class MemberController(
    val memberService: MemberService,
    val memberProfileRepository: MemberProfileRepository
) {
    @GetMapping("profiles")
    fun profiles(
        @RequestParam(defaultValue = "0") page: Int = 0,
        @RequestParam(defaultValue = "10") size: Int = 10,
        memberProfileInput: MemberProfileInput?
    ) {
        memberProfileRepository.findAllByMemberProfile(PageRequest.of(page, size), memberProfileInput)
    }

    /**
     * Register
     */
    @PutMapping
    @ResponseStatus(HttpStatus.OK)
    fun put(@RequestBody memberInput: MemberInput) {
        memberService.register(memberInput)
    }
}