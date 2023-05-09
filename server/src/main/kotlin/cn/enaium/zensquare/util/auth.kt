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

package cn.enaium.zensquare.util

import cn.dev33.satoken.stp.StpUtil
import java.util.*

/**
 * @author Enaium
 */
fun createSession(id: UUID): String = StpUtil.createLoginSession(id)
fun deleteSession(id: UUID) = StpUtil.logout(id)
fun getSession(): UUID = UUID.fromString(StpUtil.getLoginId().toString())

/**
 * check current id is equal to id
 *
 * @param id
 * @return
 */
fun checkId(id: UUID): Boolean = try {
    UUID.fromString(StpUtil.getLoginId().toString()) == id
} catch (_: Exception) {
    false
}