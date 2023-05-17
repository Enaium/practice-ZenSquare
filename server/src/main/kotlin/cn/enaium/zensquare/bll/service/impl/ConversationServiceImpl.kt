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
import cn.enaium.zensquare.bll.service.ConversationService
import cn.enaium.zensquare.model.entity.*
import cn.enaium.zensquare.model.entity.fetcher.ThreadFetcher
import cn.enaium.zensquare.model.entity.input.ThreadInput
import cn.enaium.zensquare.repository.MemberRepository
import cn.enaium.zensquare.repository.ThreadRepository
import cn.enaium.zensquare.util.getSession
import cn.enaium.zensquare.util.i18n
import org.babyfish.jimmer.sql.kt.KSqlClient
import org.babyfish.jimmer.sql.kt.ast.expression.desc
import org.babyfish.jimmer.sql.kt.ast.expression.eq
import org.babyfish.jimmer.sql.kt.ast.expression.max
import org.babyfish.jimmer.sql.kt.ast.table.target
import org.babyfish.jimmer.sql.kt.source
import org.springframework.context.MessageSource
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageImpl
import org.springframework.data.domain.Pageable
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.util.*

/**
 * @author Enaium
 */
@Service
class ConversationServiceImpl(
    val threadRepository: ThreadRepository,
    val memberRepository: MemberRepository,
    val sql: KSqlClient,
    val messageSource: MessageSource
) : ConversationService {

    /**
     * Create a conversation
     *
     * @param threadId thread id
     * @return conversation
     */
    override fun findConversation(threadId: UUID): Thread? {
        sql.queries.forList(Thread::members) {
            where(table.source.id eq threadId, table.target.id eq getSession())
            select(table.target)
        }.fetchOneOrNull() ?: throw ServiceException(
            HttpStatus.FORBIDDEN, messageSource.i18n("error.forbidden")
        )

        return threadRepository.findByIdAndType(
            threadId,
            ThreadType.CONVERSATION,
            ThreadFetcher.FULL_CONVERSATION
        )
    }

    /**
     * Find conversations by member id
     *
     * @param pageable page
     * @param memberId member id
     * @return conversations
     */
    override fun findConversations(pageable: Pageable, memberId: UUID): Page<Thread> {
        return PageImpl(sql.queries.forList(Member::conversations) {
            where(table.source.id eq memberId)
            val subQuery = subQuery(Reply::class) {
                where(table.thread.id eq parentTable.target.id)
                select(max(table.modifiedTime))
            }
            orderBy(subQuery.desc())
            select(table.target.fetch(ThreadFetcher.DEFAULT_THREAD)).limit(pageable.pageSize, pageable.offset.toInt())
        }.execute())
    }

    /**
     * Create conversation
     *
     * @param threadInput thread input
     * @param members members
     * @return conversation
     */
    @Transactional
    override fun createConversation(threadInput: ThreadInput, members: Array<UUID>) {
        threadInput.memberId = getSession()
        threadInput.type = ThreadType.CONVERSATION

        //If title is null or blank throw error, title is required
        if (threadInput.title.isNullOrBlank()) {
            throw ServiceException(
                HttpStatus.BAD_REQUEST,
                messageSource.i18n("controller.thread.titleIsEmpty")
            )
        }

        //If content is null or blank throw error, content is required
        if (threadInput.content.isNullOrBlank()) {
            throw ServiceException(
                HttpStatus.BAD_REQUEST,
                messageSource.i18n("controller.thread.contentIsEmpty")
            )
        }

        //If forum id is not null throw error, forum id must be null, because conversation is not belong to forum
        if (threadInput.forumId != null) {
            throw ServiceException(
                HttpStatus.BAD_REQUEST,
                messageSource.i18n("controller.thread.forumIsExisted")
            )
        }

        //If members is empty throw error, members is required
        if (members.distinct().isEmpty()) {
            throw ServiceException(
                HttpStatus.BAD_REQUEST,
                messageSource.i18n("controller.thread.membersAreEmpty")
            )
        }

        //If members contains null throw error, members can't contain null
        members.forEach {
            if (!memberRepository.existsById(it)) {
                throw ServiceException(
                    HttpStatus.BAD_REQUEST,
                    messageSource.i18n("controller.thread.memberDoesntExist")
                )
            }
        }

        //Insert conversation
        val thread = threadRepository.insert(threadInput)

        //Insert members
        sql.getAssociations(Thread::members)
            .batchSave(listOf(thread.id), members.toMutableSet().apply { add(threadInput.memberId!!) })
    }
}