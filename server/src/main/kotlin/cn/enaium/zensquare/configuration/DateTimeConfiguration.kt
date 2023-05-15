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

import com.fasterxml.jackson.core.JsonGenerator
import com.fasterxml.jackson.core.JsonParser
import com.fasterxml.jackson.databind.DeserializationContext
import com.fasterxml.jackson.databind.JsonDeserializer
import com.fasterxml.jackson.databind.JsonSerializer
import com.fasterxml.jackson.databind.SerializerProvider
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule
import com.fasterxml.jackson.module.kotlin.kotlinModule
import org.babyfish.jimmer.jackson.ImmutableModule
import org.springframework.boot.autoconfigure.jackson.Jackson2ObjectMapperBuilderCustomizer
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import java.time.Instant
import java.time.LocalDate
import java.time.LocalDateTime
import java.time.ZoneId

@Configuration
class DateTimeConfiguration {
    @Bean
    fun jackson2ObjectMapperBuilderCustomizer(): Jackson2ObjectMapperBuilderCustomizer {
        return Jackson2ObjectMapperBuilderCustomizer { builder ->
            builder.modules(kotlinModule(), ImmutableModule(), JavaTimeModule().apply {
                addSerializer(LocalDateTime::class.java, object : JsonSerializer<LocalDateTime>() {
                    override fun serialize(value: LocalDateTime, gen: JsonGenerator, serializers: SerializerProvider) {
                        gen.writeNumber(value.atZone(ZoneId.systemDefault()).toInstant().toEpochMilli())
                    }
                })
                addDeserializer(LocalDateTime::class.java, object : JsonDeserializer<LocalDateTime>() {
                    override fun deserialize(p: JsonParser, ctxt: DeserializationContext): LocalDateTime {
                        return LocalDateTime.ofInstant(
                            Instant.ofEpochMilli(p.valueAsLong),
                            ZoneId.systemDefault()
                        )
                    }
                })
                addSerializer(LocalDate::class.java, object : JsonSerializer<LocalDate>() {
                    override fun serialize(value: LocalDate, gen: JsonGenerator, serializers: SerializerProvider) {
                        gen.writeNumber(value.atStartOfDay(ZoneId.systemDefault()).toInstant().toEpochMilli())
                    }
                })
                addDeserializer(LocalDate::class.java, object : JsonDeserializer<LocalDate>() {
                    override fun deserialize(p: JsonParser, ctxt: DeserializationContext): LocalDate {
                        return LocalDate.ofInstant(
                            Instant.ofEpochMilli(p.valueAsLong),
                            ZoneId.systemDefault()
                        )
                    }
                })
            })
        }
    }
}

