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

import { defineComponent, reactive } from "vue"
import { useSessionStore } from "@/store"
import { RequestOf } from "@/__generated"
import { api } from "@/common/ApiInstance.ts"
import { useQuery } from "@tanstack/vue-query"
import { NSpin } from "naive-ui"
import { MemberProfileDto } from "@/__generated/model/dto"
import Avatar from "@/components/Avatar"

const VisitorMenu = defineComponent({
  setup() {
    const session = useSessionStore()

    const options = reactive<RequestOf<typeof api.memberController.getProfile>>({ id: session.id! })

    const { data, isLoading } = useQuery({
      queryKey: ["memberProfile", options],
      queryFn: () => api.memberController.getProfile(options),
    })

    const profile = reactive(data.value ?? ({} as MemberProfileDto["DEFAULT"]))

    return () => (
      <>
        {isLoading.value ? (
          <NSpin />
        ) : (
          <div class={"flex"}>
            <Avatar id={profile.avatar} round bordered />
            <div class={"flex flex-col"}>
              <div>{profile.nickname}</div>
            </div>
          </div>
        )}
      </>
    )
  },
})

export default VisitorMenu