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
package cn.enaium.zensquare.aspect

import cn.dev33.satoken.stp.StpUtil
import cn.enaium.zensquare.bll.error.ServiceException
import org.aspectj.lang.JoinPoint
import org.aspectj.lang.annotation.Aspect
import org.aspectj.lang.annotation.Before
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Component
import java.lang.reflect.Field
import java.util.*

/**
 * @author Enaium
 */
//@Component
//@Aspect
class OwnerCheck {
    @Before("execution (* cn.enaium.zensquare.controller..*.*(..)) && @annotation(org.springframework.web.bind.annotation.PutMapping)")
    fun put(joinPoint: JoinPoint) {
        val arg1 = joinPoint.args[0]
        val idField: Field? = arg1.javaClass.getDeclaredField("id")
        idField?.let {
            idField.isAccessible = true
            val id = idField.get(arg1)
            if (id is UUID) {
                check(id)
            }
        }
    }

    @Before("execution (* cn.enaium.zensquare.controller..*.*(..)) && @annotation(org.springframework.web.bind.annotation.DeleteMapping)")
    fun delete(joinPoint: JoinPoint) {
        val arg1 = joinPoint.args[0]
        if (arg1 is UUID) {
            check(arg1)
        }
    }

    fun check(id: UUID) {

    }
}
