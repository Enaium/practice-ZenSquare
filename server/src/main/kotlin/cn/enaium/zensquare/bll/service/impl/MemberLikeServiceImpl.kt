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
import cn.enaium.zensquare.bll.service.MemberLikeService
import cn.enaium.zensquare.model.entity.MemberLike
import cn.enaium.zensquare.model.entity.by
import cn.enaium.zensquare.repository.MemberLikeRepository
import cn.enaium.zensquare.util.i18n
import org.babyfish.jimmer.kt.new
import org.springframework.context.MessageSource
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service
import java.util.*

/**
 * @author Enaium
 */
@Service
class MemberLikeServiceImpl(
    val memberLikeRepository: MemberLikeRepository,
    val messageSource: MessageSource
) : MemberLikeService {
    override fun findLike(memberId: UUID, target: UUID): MemberLike? {
        return memberLikeRepository.findByMemberIdAndTarget(memberId, target)
    }

    override fun like(memberId: UUID, target: UUID, dislike: Boolean) {
        memberLikeRepository.findByMemberIdAndTarget(memberId, target)?.let {
            throw ServiceException(
                HttpStatus.BAD_REQUEST,
                if (it.dislike)
                    messageSource.i18n("controller.member.like.hasDisliked")
                else
                    messageSource.i18n("controller.member.like.hasLiked")
            )
        } ?: let {
            memberLikeRepository.insert(new(MemberLike::class).by {
                this.memberId = memberId
                this.target = target
                this.dislike = dislike
            })
        }
    }

    override fun unlike(memberId: UUID, target: UUID) {
        memberLikeRepository.findByMemberIdAndTarget(memberId, target)?.let {
            memberLikeRepository.delete(new(MemberLike::class).by {
                this.memberId = memberId
                this.target = target
            })
        } ?: throw ServiceException(
            HttpStatus.BAD_REQUEST,
            messageSource.i18n("controller.member.like.doesntLikeOrDislike")
        )
    }
}