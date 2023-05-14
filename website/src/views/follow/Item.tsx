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

import type { MemberDto } from "@/__generated/model/dto/MemberDto"
import Avatar from "@/components/Avatar"
import FollowButton from "@/components/FollowButton"
import { defineComponent } from "vue"

const Item = defineComponent(
  (props: { member: MemberDto["MemberFollowController/DEFAULT_MEMBER_FOLLOW"] }) => {
    return () => (
      <div class={"flex items-center justify-between"}>
        <div class={"flex items-center"}>
          <Avatar id={props.member.id} bordered round size={64} />
          <div class={"flex flex-col"}>
            <div>{props.member.profile!.nickname}</div>
            <div>{props.member.profile!.description}</div>
          </div>
        </div>
        <FollowButton following={props.member.id} />
      </div>
    )
  },
  {
    props: ["member"]
  }
)

export default Item
