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

package cn.enaium.zensquare.controller.category.forum.thread.reply

import cn.enaium.zensquare.bll.service.ReplyService
import cn.enaium.zensquare.model.entity.input.ReplyInput
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.ResponseStatus
import org.springframework.web.bind.annotation.RestController

/**
 * reply controller
 *
 * @author Enaium
 */
@RestController
class ReplyController(
    val replyService: ReplyService
) {
    /**
     * Reply to a thread or reply
     *
     * @param replyInput
     */
    @PutMapping("/categories/forum/thread/reply")
    @ResponseStatus(HttpStatus.OK)
    fun saveReply(@RequestBody replyInput: ReplyInput) {
        replyService.reply(replyInput)
    }
}