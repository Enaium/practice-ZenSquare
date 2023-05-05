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
import cn.enaium.zensquare.bll.service.MemberService
import cn.enaium.zensquare.model.entity.input.MemberInput
import cn.enaium.zensquare.repository.MemberRepository
import cn.enaium.zensquare.util.i18n
import org.babyfish.jimmer.sql.ast.mutation.SaveMode
import org.springframework.context.MessageSource
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service

/**
 * @author Enaium
 */
@Service
class MemberServiceImpl(
    val messageSource: MessageSource,
    val memberRepository: MemberRepository
) : MemberService {
    override fun register(memberInput: MemberInput) {
        memberInput.username?.takeIf { it.isNotBlank() } ?: let {
            throw ServiceException(HttpStatus.BAD_REQUEST, messageSource.i18n("controller.session.username.blank"))
        }
        memberInput.password?.takeIf { it.isNotBlank() } ?: let {
            throw ServiceException(HttpStatus.BAD_REQUEST, messageSource.i18n("controller.session.password.blank"))
        }

        if (memberInput.password != memberInput.confirmPassword) {
            throw ServiceException(HttpStatus.BAD_REQUEST, messageSource.i18n("controller.session.password.different"))
        }

        memberInput.password = BCrypt.hashpw(memberInput.password)
        memberRepository.save(memberInput) {
            setMode(SaveMode.INSERT_ONLY)
        }
    }
}