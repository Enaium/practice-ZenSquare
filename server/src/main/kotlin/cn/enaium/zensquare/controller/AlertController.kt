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

import cn.enaium.zensquare.bll.service.AlertService
import cn.enaium.zensquare.model.entity.Alert
import cn.enaium.zensquare.model.entity.fetcher.AlertFetcher
import org.babyfish.jimmer.client.FetchBy
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageRequest
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import java.util.*

/**
 * @author Enaium
 */
@RestController
class AlertController(val alertService: AlertService) {
    @GetMapping("/members/{memberId}/alerts/")
    fun findAlerts(
        @RequestParam(defaultValue = "0") page: Int = 0,
        @RequestParam(defaultValue = "10") size: Int = 10,
        @PathVariable memberId: UUID
    ): Page<@FetchBy("DEFAULT_FETCHER", ownerType = AlertFetcher::class) Alert> {
        return alertService.findAlertsByMemberId(PageRequest.of(page, size), memberId)
    }
}