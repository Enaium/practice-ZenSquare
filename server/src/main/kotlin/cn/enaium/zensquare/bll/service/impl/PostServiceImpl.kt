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
import cn.enaium.zensquare.bll.service.AlertService
import cn.enaium.zensquare.bll.service.PostService
import cn.enaium.zensquare.model.entity.AlertType
import cn.enaium.zensquare.model.entity.Thread
import cn.enaium.zensquare.model.entity.ThreadType
import cn.enaium.zensquare.model.entity.fetcher.ThreadFetcher
import cn.enaium.zensquare.model.entity.input.ThreadInput
import cn.enaium.zensquare.repository.ThreadRepository
import cn.enaium.zensquare.util.getSession
import cn.enaium.zensquare.util.i18n
import org.springframework.context.MessageSource
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service
import java.util.*

/**
 * @author Enaium
 */
@Service
class PostServiceImpl(
    val threadRepository: ThreadRepository,
    val alertService: AlertService,
    val messageSource: MessageSource
) : PostService {

    /**
     * Find thread by id
     *
     * @param id Thread id
     * @return Thread
     */
    override fun findPost(id: UUID): Thread? {
        return threadRepository.findByIdAndType(id, ThreadType.POST, ThreadFetcher.FULL_POST)
    }

    /**
     * Find latest threads
     *
     * @param pageable Pageable
     * @return Page<Thread>
     */
    override fun findLatestPosts(pageable: Pageable): Page<Thread> {
        return threadRepository.findTop30ByTypeOrderByModifiedTimeDesc(
            pageable,
            ThreadType.POST,
            ThreadFetcher.DEFAULT_THREAD
        )
    }

    /**
     * Find threads by forum id
     *
     * @param id Forum id
     * @param pageable Pageable
     * @return Page<Thread>
     */
    override fun findPostsByForumId(pageable: Pageable, id: UUID): Page<Thread> {
        return threadRepository.findAllByForumIdAndType(pageable, id, ThreadType.POST, ThreadFetcher.DEFAULT_THREAD)
    }

    /**
     * Search threads
     *
     * @param pageable Pageable
     * @param threadInput ThreadInput
     * @return Page<Thread>
     */
    override fun searchPosts(pageable: Pageable, threadInput: ThreadInput?): Page<Thread> {
        return threadRepository.findAllByThreadAndType(pageable, threadInput, ThreadType.POST)
    }

    /**
     * Create thread
     *
     * @param threadInput ThreadInput
     */
    override fun createPost(threadInput: ThreadInput) {
        threadInput.memberId = getSession()
        threadInput.type = ThreadType.POST

        //Check title
        if (threadInput.title.isNullOrBlank()) {
            throw ServiceException(
                HttpStatus.BAD_REQUEST,
                messageSource.i18n("controller.thread.titleIsEmpty")
            )
        }

        //Check content
        if (threadInput.content.isNullOrBlank()) {
            throw ServiceException(
                HttpStatus.BAD_REQUEST,
                messageSource.i18n("controller.thread.contentIsEmpty")
            )
        }

        //Check forum exist
        if (threadInput.forumId == null) {
            throw ServiceException(
                HttpStatus.BAD_REQUEST,
                messageSource.i18n("controller.thread.forumDoesntExist")
            )
        }
        val thread = threadRepository.insert(threadInput)
        alertService.createAlert(thread.memberId, thread.memberId, thread.id, AlertType.CREATE_THREAD)
    }
}