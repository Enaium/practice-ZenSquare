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

package cn.enaium.zensquare.model.entity

import org.babyfish.jimmer.sql.EnumItem

/**
 * @author Enaium
 */
enum class AlertType {
    @EnumItem(name = "create_thread")
    CREATE_THREAD,

    @EnumItem(name = "create_reply")
    CREATE_REPLY,

    @EnumItem(name = "like_thread")
    LIKE_THREAD,

    @EnumItem(name = "like_reply")
    LIKE_REPLY,
}