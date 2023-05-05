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

import cn.enaium.zensquare.bll.error.ServiceException
import cn.enaium.zensquare.bll.service.ImageService
import cn.enaium.zensquare.model.entity.Image
import cn.enaium.zensquare.model.entity.by
import cn.enaium.zensquare.repository.ImageRepository
import org.babyfish.jimmer.kt.new
import org.springframework.beans.factory.annotation.Value
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service
import org.springframework.util.DigestUtils
import org.springframework.web.multipart.MultipartFile
import java.util.*
import kotlin.io.path.Path
import kotlin.io.path.createDirectories
import kotlin.io.path.readBytes
import kotlin.io.path.writeBytes

/**
 * @author Enaium
 */
@Service
class ImageServiceImpl(
    val imageRepository: ImageRepository,
    @Value("\${zensquare.image.dir}") val imageDir: String
) : ImageService {
    override fun find(id: UUID): ByteArray {
        imageRepository.findNullable(id)
            ?.let { return Path(System.getProperty("user.dir"), imageDir, it.hash).readBytes() }
            ?: throw ServiceException(HttpStatus.NOT_FOUND)
    }

    override fun upload(file: MultipartFile): UUID {
        val hash = DigestUtils.md5DigestAsHex(file.bytes)
        imageRepository.findByHash(hash)?.let {
            return it.id
        } ?: let {
            with(Path(System.getProperty("user.dir"), imageDir, hash)) {
                parent.createDirectories()
                writeBytes(file.bytes)
            }
            return imageRepository.insert(new(Image::class).by {
                this.hash = hash
            }).id
        }
    }
}