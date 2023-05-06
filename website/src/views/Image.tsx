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

import { ImageProps, NImage } from "naive-ui"
import { FunctionalComponent, VNode } from "vue"
import { BASE_URL } from "@/common/ApiInstance.ts"

interface Props extends ImageProps {
  id?: string
  fallback?: VNode
}

const Image: FunctionalComponent<Props> = ({ id, fallback, ...props }) => {
  return id ? <NImage src={`${BASE_URL}/image/${id}`} {...props} /> : fallback
}

export default Image
