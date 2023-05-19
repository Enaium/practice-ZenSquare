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

import cn.enaium.zensquare.bll.service.AlertService
import cn.enaium.zensquare.model.entity.Alert
import cn.enaium.zensquare.model.entity.AlertType
import cn.enaium.zensquare.model.entity.by
import cn.enaium.zensquare.model.entity.fetcher.AlertFetcher
import cn.enaium.zensquare.model.entity.targetMemberId
import cn.enaium.zensquare.repository.AlertRepository
import org.babyfish.jimmer.kt.new
import org.babyfish.jimmer.sql.kt.KSqlClient
import org.babyfish.jimmer.sql.kt.ast.expression.eq
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Service
import java.util.*

/**
 * @author Enaium
 */
@Service
class AlertServiceImpl(
    val alertRepository: AlertRepository,
    val sql: KSqlClient
) : AlertService {
    override fun createAlert(sourceMemberId: UUID, targetMemberId: UUID, target: UUID, type: AlertType) {
        alertRepository.save(new(Alert::class).by {
            this.sourceMemberId = sourceMemberId
            this.targetMemberId = targetMemberId
            this.target = target
            this.type = type
        })
    }

    override fun findAlertsByMemberId(pageable: Pageable, memberId: UUID): Page<Alert> {
        return alertRepository.pager(pageable).execute(sql.createQuery(Alert::class) {
            where(table.targetMemberId eq memberId)
            select(table.fetch(AlertFetcher.DEFAULT_FETCHER))
        })
    }
}