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
import cn.enaium.zensquare.bll.service.ReplyService
import cn.enaium.zensquare.model.entity.Thread
import cn.enaium.zensquare.model.entity.ThreadType
import cn.enaium.zensquare.model.entity.id
import cn.enaium.zensquare.model.entity.input.ReplyInput
import cn.enaium.zensquare.repository.ReplyRepository
import cn.enaium.zensquare.repository.ThreadRepository
import cn.enaium.zensquare.util.getSession
import cn.enaium.zensquare.util.i18n
import org.babyfish.jimmer.sql.kt.KSqlClient
import org.babyfish.jimmer.sql.kt.ast.expression.eq
import org.babyfish.jimmer.sql.kt.ast.table.target
import org.babyfish.jimmer.sql.kt.source
import org.springframework.context.MessageSource
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service

/**
 * @author Enaium
 */
@Service
class ReplyServiceImpl(
    val replyRepository: ReplyRepository,
    val threadRepository: ThreadRepository,
    val sql: KSqlClient,
    val messageSource: MessageSource
) : ReplyService {
    /**
     * Reply to a thread or reply
     *
     * @param replyInput ReplyInput
     */
    override fun saveReply(replyInput: ReplyInput) {
        replyInput.memberId = getSession()
        replyInput.parentId?.let {// If parentId is not null
            val reply = replyRepository.findNullable(it)
                ?: throw ServiceException(
                    HttpStatus.NOT_FOUND,
                    messageSource.i18n("controller.thread.reply.doesntExist")
                )// If reply is null
            if (reply.threadId != replyInput.threadId) {// If parentId is not null and threadId is not equal
                throw ServiceException(
                    HttpStatus.BAD_REQUEST,
                    messageSource.i18n("controller.thread.reply.wrongThread")
                )
            }
        }
        replyInput.threadId?.let {// If threadId is not null
            val thread = threadRepository.findNullable(it) ?: throw ServiceException(
                HttpStatus.NOT_FOUND,
                messageSource.i18n("controller.thread.doesntExist")
            )
            if (thread.type == ThreadType.CONVERSATION) {// If threadId is not null and type is conversation
                sql.queries.forList(Thread::members) {
                    where(table.source.id eq getSession(), table.target.id eq thread.id)
                    select(table.target)
                }.fetchOneOrNull() ?: throw ServiceException(
                    HttpStatus.FORBIDDEN, messageSource.i18n("error.forbidden")
                )// If threadId is not null and type is conversation and member is not in the conversation
            }
        }
        replyRepository.save(replyInput)
    }
}