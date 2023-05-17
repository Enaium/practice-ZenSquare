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

import cn.dev33.satoken.annotation.SaIgnore
import cn.dev33.satoken.stp.StpUtil
import cn.enaium.zensquare.bll.error.ServiceException
import cn.enaium.zensquare.bll.service.ImageService
import cn.enaium.zensquare.model.entity.MemberProfile
import cn.enaium.zensquare.model.entity.by
import cn.enaium.zensquare.model.entity.input.MemberProfileInput
import cn.enaium.zensquare.repository.MemberProfileRepository
import cn.enaium.zensquare.util.checkId
import org.babyfish.jimmer.client.FetchBy
import org.babyfish.jimmer.kt.new
import org.babyfish.jimmer.sql.kt.fetcher.newFetcher
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageRequest
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile
import java.util.*

/**
 * member profile controller
 *
 * @author Enaium
 */
@RestController
class MemberProfileController(
    val memberProfileRepository: MemberProfileRepository,
    val imageService: ImageService
) {

    /**
     * Get member profile by member id
     *
     * @param memberId Member id
     * @return MemberProfile
     */
    @SaIgnore
    @GetMapping("/members/{memberId}/profiles/")
    fun findProfile(@PathVariable memberId: UUID): @FetchBy("DEFAULT_MEMBER_PROFILE") MemberProfile? {
        return memberProfileRepository.findByMemberId(memberId, DEFAULT_MEMBER_PROFILE)
    }

    /**
     * Get member profile by member id with full
     *
     * @param memberId Member id
     * @return MemberProfile
     */
    @SaIgnore
    @GetMapping("/members/{memberId}/profiles/full/")
    fun findFullProfile(@PathVariable memberId: UUID): @FetchBy("FULL_MEMBER_PROFILE") MemberProfile? {
        return memberProfileRepository.findByMemberId(memberId, FULL_MEMBER_PROFILE)
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
    ): Page<@FetchBy("DEFAULT_MEMBER_PROFILE") MemberProfile> {
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
        memberProfileInput.memberId?.let {
            if (!(checkId(it) || StpUtil.hasRole("admin"))) {
                throw ServiceException(HttpStatus.FORBIDDEN)
            }
        }
        memberProfileRepository.save(memberProfileInput)
    }

    @PutMapping("/members/{memberId}/profiles/avatar/")
    @ResponseStatus(HttpStatus.OK)
    fun saveAvatar(@PathVariable memberId: UUID, file: MultipartFile) {
        //Check member profile owner
        if (!(checkId(memberId) || StpUtil.hasRole("admin"))) {
            throw ServiceException(HttpStatus.FORBIDDEN)
        }
        imageService.upload(file)
        memberProfileRepository.update(new(MemberProfile::class).by {
            this.memberId = memberId
            avatar = imageService.upload(file)
        })
    }

    companion object {
        /**
         * Default member profile fetcher
         */
        val DEFAULT_MEMBER_PROFILE = newFetcher(MemberProfile::class).by {
            nickname()
            avatar()
            createdTime()
            modifiedTime()
            member {
                createdTime()
            }
            role {
                name()
            }
        }

        /**
         * Full member profile fetcher
         */
        val FULL_MEMBER_PROFILE = newFetcher(MemberProfile::class).by {
            allScalarFields()
            member {
                allScalarFields()
                thread()
                reply()
                message()
                password(false)
            }
            role {
                allScalarFields()
            }
        }
    }
}