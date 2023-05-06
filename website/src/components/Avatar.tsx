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

import { FunctionalComponent } from "vue"
import { AvatarProps, NAvatar } from "naive-ui"
import { BASE_URL } from "@/common/ApiInstance"
import Default from "@/assets/avatar.jpg"

interface Props extends AvatarProps {
  id?: string
}

const Avatar: FunctionalComponent<Props> = ({ id, ...props }) => {
  return id ? (
    <NAvatar src={`${BASE_URL}/image/${id}`} fallbackSrc={Default} {...props} class={"border-2 border-gray-50"} />
  ) : (
    <NAvatar src={Default} {...props} class={"border-2 border-gray-50"} />
  )
}

export default Avatar
