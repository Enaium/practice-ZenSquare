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
import cn.enaium.zensquare.util.checkId
import cn.enaium.zensquare.util.i18n
import org.babyfish.jimmer.kt.new
import org.babyfish.jimmer.sql.kt.fetcher.newFetcher
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

    /**
     * Like or dislike a thread or reply
     *
     * @param memberId member id
     * @param target thread id or reply id
     * @param dislike dislike
     */
    override fun like(memberId: UUID, target: UUID, dislike: Boolean): Long {
        if (!checkId(memberId)) {
            throw ServiceException(HttpStatus.FORBIDDEN, messageSource.i18n("error.forbidden"))
        }

        if (dislike) {// If dislike is true, dislike
            memberLikeRepository.findByMemberIdAndTarget(memberId, target)?.let {// Find the like
                if (it.dislike) {// If it is already disliked, un-dislike
                    memberLikeRepository.deleteById(it.id)
                } else {// If it is not disliked, update the dislike to true
                    memberLikeRepository.update(new(MemberLike::class).by {
                        this.id = it.id
                        this.dislike = true
                    })
                }
            } ?: let {// If it is not liked, insert a new like with dislike true
                memberLikeRepository.insert(new(MemberLike::class).by {
                    this.memberId = memberId
                    this.target = target
                    this.dislike = true
                })
            }
        } else {// If dislike is false, like
            memberLikeRepository.findByMemberIdAndTarget(memberId, target)?.let {
                if (!it.dislike) {// If it is already liked, un-like
                    memberLikeRepository.deleteById(it.id)
                } else {// If it is not liked, update the dislike to false
                    memberLikeRepository.update(new(MemberLike::class).by {
                        this.id = it.id
                        this.dislike = false
                    })
                }
            } ?: let {// If it is not liked, insert a new like with dislike false
                memberLikeRepository.insert(new(MemberLike::class).by {
                    this.memberId = memberId
                    this.target = target
                    this.dislike = false
                })
            }
        }

        // Return the like count
        memberLikeRepository.findByMemberIdAndTarget(memberId, target, newFetcher(MemberLike::class).by {
            thread {
                like()
            }
            reply {
                like()
            }
        })?.let {// Find the like
            return it.thread?.like ?: it.reply?.like
            ?: 0// If it is a thread, return the thread like count, else return the reply like count, else return 0
        } ?: return 0// If it is not liked or disliked, return 0
    }
}