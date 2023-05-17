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

package cn.enaium.zensquare.controller

import cn.enaium.zensquare.bll.service.MemberFollowService
import cn.enaium.zensquare.model.entity.Member
import cn.enaium.zensquare.model.entity.by
import org.babyfish.jimmer.client.FetchBy
import org.babyfish.jimmer.sql.kt.fetcher.newFetcher
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageRequest
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import java.util.*

/**
 * @author Enaium
 */
@RestController
class MemberFollowController(
    val memberFollowService: MemberFollowService
) {
    /**
     * Is follow
     *
     * @param memberId member id
     * @param followId follow id
     * @return is followed
     */
    @GetMapping("/members/{memberId}/followings/{followId}/")
    fun isFollowed(
        @PathVariable memberId: UUID,
        @PathVariable followId: UUID
    ): Boolean {
        return memberFollowService.isFollow(memberId, followId)
    }

    /**
     * Get followings
     *
     * @param memberId member id
     * @param page page
     * @param size size
     * @return followings
     */
    @GetMapping("/members/{memberId}/followings/")
    fun findFollowings(
        @PathVariable memberId: UUID,
        @RequestParam(defaultValue = "0") page: Int = 0,
        @RequestParam(defaultValue = "10") size: Int = 10
    ): Page<@FetchBy("DEFAULT_MEMBER_FOLLOW") Member> {
        return memberFollowService.followings(PageRequest.of(page, size), memberId)
    }

    /**
     * Get followers
     *
     * @param memberId member id
     * @param page page
     * @param size size
     * @return followers
     */
    @GetMapping("/members/{memberId}/followers/")
    fun findFollowers(
        @PathVariable memberId: UUID,
        @RequestParam(defaultValue = "0") page: Int = 0,
        @RequestParam(defaultValue = "10") size: Int = 10
    ): Page<@FetchBy("DEFAULT_MEMBER_FOLLOW") Member> {
        return memberFollowService.followers(PageRequest.of(page, size), memberId)
    }

    /**
     * Follow
     *
     * @param memberId member id
     * @param followId follow id
     */
    @PutMapping("/members/{memberId}/followings/{followId}/")
    @ResponseStatus(HttpStatus.OK)
    fun follow(
        @PathVariable memberId: UUID,
        @PathVariable followId: UUID
    ) {
        memberFollowService.follow(memberId, followId)
    }

    /**
     * Unfollow
     *
     * @param memberId member id
     * @param followId follow id
     */
    @DeleteMapping("/members/{memberId}/followings/{followId}/")
    @ResponseStatus(HttpStatus.OK)
    fun unfollow(
        @PathVariable memberId: UUID,
        @PathVariable followId: UUID
    ) {
        memberFollowService.unfollow(memberId, followId)
    }

    companion object {
        val DEFAULT_MEMBER_FOLLOW = newFetcher(Member::class).by {
            allScalarFields()
            password(false)
            profile {
                nickname()
                description()
                avatar(false)
            }
        }
    }
}