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

package cn.enaium.zensquare.controller.member.profile

import cn.dev33.satoken.stp.StpUtil
import cn.enaium.zensquare.bll.error.ServiceException
import cn.enaium.zensquare.model.entity.MemberProfile
import cn.enaium.zensquare.model.entity.by
import cn.enaium.zensquare.model.entity.input.MemberProfileInput
import cn.enaium.zensquare.repository.MemberProfileRepository
import cn.enaium.zensquare.util.checkOwner
import org.babyfish.jimmer.client.FetchBy
import org.babyfish.jimmer.sql.kt.fetcher.newFetcher
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageRequest
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import java.util.*

/**
 * member profile controller
 *
 * @author Enaium
 */
@RestController
class MemberProfileController(
    val memberProfileRepository: MemberProfileRepository
) {

    /**
     * Get member profile by member id
     *
     * @param memberId Member id
     * @return MemberProfile
     */
    @GetMapping("/members/{memberId}/profiles/")
    fun findProfile(@PathVariable memberId: UUID): @FetchBy("DEFAULT_MEMBER_PROFILE") MemberProfile? {
        return memberProfileRepository.findByMemberId(memberId, DEFAULT_MEMBER_PROFILE)
    }

    /**
     * Get member profiles
     *
     * @param page Page
     * @param size Size
     * @param memberProfileInput MemberProfileInput
     * @return Page<MemberProfile>
     */
    @GetMapping("/members/profiles/")
    fun findComplexProfiles(
        @RequestParam(defaultValue = "0") page: Int = 0,
        @RequestParam(defaultValue = "10") size: Int = 10,
        memberProfileInput: MemberProfileInput?
    ): Page<MemberProfile> {
        return memberProfileRepository.findAllByMemberProfile(PageRequest.of(page, size), memberProfileInput)
    }


    /**
     * Put member profile
     *
     * @param memberProfileInput MemberProfileInput
     */
    @PutMapping("/members/profiles/")
    fun save(@RequestBody memberProfileInput: MemberProfileInput) {
        //Check member profile owner
        memberProfileInput.id ?: memberProfileInput.memberId?.let {
            if (!(checkOwner(it) || StpUtil.hasRole("admin"))) {
                throw ServiceException(HttpStatus.FORBIDDEN)
            }
        }

        //Check admin
        memberProfileInput.roleId?.let {
            if (!StpUtil.hasRole("admin")) {
                throw ServiceException(HttpStatus.FORBIDDEN)
            }
        }
        memberProfileRepository.save(memberProfileInput)
    }


    companion object {
        /**
         * Default member profile fetcher
         */
        val DEFAULT_MEMBER_PROFILE = newFetcher(MemberProfile::class).by {
            allScalarFields()
            role {
                name()
            }
        }
    }
}