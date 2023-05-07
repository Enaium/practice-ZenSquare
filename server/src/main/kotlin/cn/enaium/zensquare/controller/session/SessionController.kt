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

package cn.enaium.zensquare.controller.session

import cn.dev33.satoken.annotation.SaIgnore
import cn.enaium.zensquare.bll.service.SessionService
import cn.enaium.zensquare.model.entity.input.MemberInput
import cn.enaium.zensquare.model.response.LoginResponse
import cn.enaium.zensquare.util.checkOwner
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import java.util.*

/**
 * session controller
 *
 * @author Enaium
 */
@SaIgnore
@RestController
@RequestMapping("/sessions/")
class SessionController(
    val sessionService: SessionService
) {
    /**
     * Login
     */
    @PutMapping
    fun saveSession(@RequestBody memberInput: MemberInput): LoginResponse {
        return sessionService.login(memberInput)
    }

    /**
     * Logout
     *
     * @param id Member
     */
    @DeleteMapping("{id}/")
    @ResponseStatus(HttpStatus.OK)
    fun deleteSession(@PathVariable id: UUID) {
        if (checkOwner(id)) {
            sessionService.logout(id)
        }
    }
}