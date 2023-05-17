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
import cn.dev33.satoken.stp.StpUtil
import cn.enaium.zensquare.bll.error.ServiceException
import cn.enaium.zensquare.bll.service.MemberService
import cn.enaium.zensquare.model.entity.Member
import cn.enaium.zensquare.model.entity.by
import cn.enaium.zensquare.model.entity.input.MemberInput
import cn.enaium.zensquare.model.entity.input.MemberPasswordInput
import cn.enaium.zensquare.repository.MemberRepository
import cn.enaium.zensquare.util.checkId
import cn.enaium.zensquare.util.i18n
import org.babyfish.jimmer.kt.new
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

    /**
     * create member
     *
     * @param memberInput MemberInput
     */
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
        memberRepository.insert(memberInput)
    }

    /**
     * modify password
     *
     * @param memberPasswordInput MemberPasswordInput
     */
    override fun modifyPassword(memberPasswordInput: MemberPasswordInput) {
        //Find Member
        val member = memberRepository.findNullable(memberPasswordInput.id)
            ?: throw ServiceException(
                HttpStatus.BAD_REQUEST,
                messageSource.i18n("controller.session.username.doesntExist")
            )

        //Check owner
        if (!(checkId(memberPasswordInput.id) || StpUtil.hasRole("admin"))) {
            throw ServiceException(HttpStatus.FORBIDDEN)
        }

        //Check old password
        if (!BCrypt.checkpw(memberPasswordInput.newPassword, member.password)) {
            throw ServiceException(HttpStatus.BAD_REQUEST, messageSource.i18n("controller.session.password.incorrect"))
        }

        //Check new password
        if (memberPasswordInput.newPassword != memberPasswordInput.confirmPassword) {
            throw ServiceException(HttpStatus.BAD_REQUEST, messageSource.i18n("controller.session.password.different"))
        }

        //Modify password
        memberRepository.update(new(Member::class).by {
            id = memberPasswordInput.id
            password = BCrypt.hashpw(memberPasswordInput.newPassword)
        })
    }
}