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

import cn.enaium.zensquare.model.entity.input.MemberInput
import cn.enaium.zensquare.model.response.LoginResponse
import cn.enaium.zensquare.model.response.Response
import org.springframework.http.ResponseEntity
import java.util.*

/**
 * @author Enaium
 */
interface SessionService {
    fun register(memberInput: MemberInput)
    fun login(memberInput: MemberInput): Response<LoginResponse>
    fun logout(id: UUID)
}