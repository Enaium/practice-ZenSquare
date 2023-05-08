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

package cn.enaium.zensquare.bll.service.impl

import cn.dev33.satoken.secure.BCrypt
import cn.enaium.zensquare.bll.error.ServiceException
import cn.enaium.zensquare.bll.service.SessionService
import cn.enaium.zensquare.model.entity.input.MemberInput
import cn.enaium.zensquare.model.response.LoginResponse
import cn.enaium.zensquare.repository.MemberRepository
import cn.enaium.zensquare.util.createSession
import cn.enaium.zensquare.util.deleteSession
import cn.enaium.zensquare.util.i18n
import org.springframework.context.MessageSource
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service
import java.util.*

/**
 * @author Enaium
 */
@Service
class SessionServiceImpl(
    val messageSource: MessageSource,
    val memberRepository: MemberRepository
) : SessionService {
    override fun login(memberInput: MemberInput): LoginResponse {
        //If username is blank, return not found
        memberInput.username?.takeIf { it.isNotBlank() }
            ?: let {
                throw ServiceException(
                    HttpStatus.NOT_FOUND,
                    messageSource.i18n("controller.session.username.doesntExist")
                )
            }
        //If password is blank, return unauthorized
        memberInput.password?.takeIf { it.isNotBlank() }
            ?: let {
                throw ServiceException(
                    HttpStatus.UNAUTHORIZED,
                    messageSource.i18n("controller.session.password.blank")
                )
            }
        //Find the member by username
        memberRepository.findByUsername(memberInput.username)?.let { member ->
            //Check the member's password
            member.password.takeIf { BCrypt.checkpw(memberInput.password, it) }?.let {
                //If successful, return the member id and token
                return LoginResponse(member.id, createSession(member.id))
            } ?: let {
                //If failed, return unauthorized
                throw ServiceException(
                    HttpStatus.UNAUTHORIZED,
                    messageSource.i18n("controller.session.password.incorrect")
                )
            }
        }
        //If the member doesn't exist, returns not found
        throw ServiceException(HttpStatus.NOT_FOUND, messageSource.i18n("controller.session.username.doesntExist"))
    }

    override fun logout(id: UUID) {
        deleteSession(id)
    }
}