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

import cn.enaium.zensquare.bll.error.ServiceException
import cn.enaium.zensquare.bll.service.ThreadService
import cn.enaium.zensquare.model.entity.ThreadType
import cn.enaium.zensquare.model.entity.input.ThreadInput
import cn.enaium.zensquare.repository.ThreadRepository
import cn.enaium.zensquare.util.i18n
import org.springframework.context.MessageSource
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service

/**
 * @author Enaium
 */
@Service
class ThreadServiceImpl(
    val threadRepository: ThreadRepository,
    val messageSource: MessageSource
) : ThreadService {
    override fun updateThread(threadInput: ThreadInput) {
        threadInput.id ?: throw ServiceException(
            HttpStatus.BAD_REQUEST,
            messageSource.i18n("controller.thread.doesntExist")
        )

        val thread = threadRepository.findNullable(threadInput.id) ?: throw ServiceException(
            HttpStatus.BAD_REQUEST,
            messageSource.i18n("controller.thread.doesntExist")
        )

        if (thread.type == ThreadType.POST) {
            if (threadInput.forumId == null) {
                throw ServiceException(
                    HttpStatus.BAD_REQUEST,
                    messageSource.i18n("controller.thread.forumDoesntExist")
                )
            }
        } else if (thread.type == ThreadType.CONVERSATION) {
            if (threadInput.forumId != null) {
                throw ServiceException(
                    HttpStatus.BAD_REQUEST,
                    messageSource.i18n("controller.thread.forumIsExisted")
                )
            }
        }
        threadRepository.update(threadInput)
    }
}