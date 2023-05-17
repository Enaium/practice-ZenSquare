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

import cn.enaium.zensquare.model.entity.Report
import cn.enaium.zensquare.model.entity.by
import cn.enaium.zensquare.model.entity.input.ReportInput
import cn.enaium.zensquare.repository.ReportRepository
import cn.enaium.zensquare.util.getSession
import org.babyfish.jimmer.client.FetchBy
import org.babyfish.jimmer.sql.kt.fetcher.newFetcher
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageRequest
import org.springframework.web.bind.annotation.*
import java.util.*

/**
 * @author Enaium
 */
@RestController
class ReportController(
    val reportRepository: ReportRepository
) {

    /**
     * Get all reports
     *
     * @param page page
     * @param size size
     * @return Page<Report>
     */
    @GetMapping("/reports/")
    fun findReports(
        @RequestParam(defaultValue = "0") page: Int = 0,
        @RequestParam(defaultValue = "10") size: Int = 10,
    ): Page<@FetchBy("DEFAULT_REPORT") Report> {
        return reportRepository.findAll(PageRequest.of(page, size), DEFAULT_REPORT)
    }


    /**
     * Get report by id
     *
     * @param reportInput reportInput
     */
    @PutMapping("/reports/")
    fun saveReport(@RequestBody reportInput: ReportInput) {
        reportInput.memberId = getSession()
        reportRepository.insert(reportInput)
    }

    companion object {
        val DEFAULT_REPORT = newFetcher(Report::class).by {
            allScalarFields()
        }
    }
}