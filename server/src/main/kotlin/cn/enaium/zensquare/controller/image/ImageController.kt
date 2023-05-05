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

package cn.enaium.zensquare.controller.image

import cn.dev33.satoken.annotation.SaIgnore
import cn.enaium.zensquare.bll.service.ImageService
import jakarta.servlet.http.HttpServletResponse
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile
import java.util.*

/**
 * @author Enaium
 */
@RestController
@RequestMapping("/image/")
class ImageController(
    val imageService: ImageService
) {

    /**
     * Get a image
     *
     * @param id image id
     */
    @SaIgnore
    @GetMapping("{id}")
    fun get(@PathVariable id: UUID, httpServletResponse: HttpServletResponse) {
        httpServletResponse.contentType = MediaType.APPLICATION_OCTET_STREAM_VALUE
        httpServletResponse.outputStream.write(imageService.find(id))
    }

    /**
     * Update image assets
     *
     * @param file
     */
    @PutMapping
    fun put(file: MultipartFile): UUID {
        return imageService.upload(file)
    }
}