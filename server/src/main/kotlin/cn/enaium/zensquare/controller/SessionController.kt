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

package cn.enaium.zensquare.controller

import cn.enaium.zensquare.bll.service.SessionService
import cn.enaium.zensquare.model.entity.input.MemberInput
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import java.util.*

/**
 * @author Enaium
 */
@RestController
@RequestMapping("/session/")
class SessionController(
    val sessionService: SessionService
) {
    /**
     * Register
     */
    @PutMapping
    @ResponseStatus(HttpStatus.OK)
    fun put(@RequestBody memberInput: MemberInput) {
        sessionService.register(memberInput)
    }

    /**
     * Login
     */
    @PostMapping
    @ResponseStatus(HttpStatus.OK)
    fun post(@RequestBody memberInput: MemberInput) {
        sessionService.login(memberInput)
    }

    /**
     * Logout
     *
     * @param id Member
     */
    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.OK)
    fun delete(@PathVariable id: UUID) {
        sessionService.logout(id)
    }
}