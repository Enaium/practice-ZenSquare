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

package cn.enaium.zensquare.configuration

import cn.enaium.zensquare.model.entity.ReportType
import cn.enaium.zensquare.model.entity.ThreadType
import org.babyfish.jimmer.sql.EnumItem
import org.babyfish.jimmer.sql.kt.cfg.KCustomizer
import org.babyfish.jimmer.sql.runtime.ScalarProvider
import org.postgresql.util.PGobject
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import java.util.*
import kotlin.reflect.KClass

/**
 * @author Enaium
 */
@Configuration
class JimmerConfiguration {
    @Bean
    fun customizer(): KCustomizer = KCustomizer {
        it.addScalarProvider(UUIDScalar())
        it.addScalarProvider(EnumScalar(ReportType::class))
        it.addScalarProvider(EnumScalar(ThreadType::class))
    }

    private class UUIDScalar : ScalarProvider<UUID, PGobject>() {
        override fun toScalar(sqlValue: PGobject): UUID {
            return UUID.fromString(sqlValue.value)
        }

        override fun toSql(scalarValue: UUID): PGobject {
            return PGobject().apply {
                type = "uuid"
                value = scalarValue.toString()
            }
        }
    }

    private class EnumScalar<E : Enum<E>>(val enumType: KClass<E>) :
        ScalarProvider<E, PGobject>(enumType.java, PGobject::class.java) {
        override fun toScalar(sqlValue: PGobject): E {
            return enumType.java.declaredFields.firstOrNull {
                it.getAnnotation(EnumItem::class.java)?.name == sqlValue.value
            }?.let { java.lang.Enum.valueOf(enumType.java, it.name) } ?: throw IllegalArgumentException()
        }

        override fun toSql(scalarValue: E): PGobject {
            return PGobject().apply {
                type = enumType.simpleName?.toSnakeCase() ?: ""
                value = enumType.java.declaredFields.firstOrNull {
                    it.name == scalarValue.name
                }?.getAnnotation(EnumItem::class.java)?.name ?: ""
            }
        }

        fun String.toSnakeCase(): String {
            return replace(Regex("(?<!^)([A-Z])"), "_$1").lowercase()
        }
    }
}