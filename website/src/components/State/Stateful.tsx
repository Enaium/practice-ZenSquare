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

import { defineComponent, reactive, ref } from "vue"
import { useSessionStore } from "@/store"
import { RequestOf } from "@/__generated"
import { api, BASE_URL } from "@/common/ApiInstance"
import { useQuery } from "@tanstack/vue-query"
import { NAlert, NAvatar, NButton, NModal, NSpin } from "naive-ui"
import Avatar from "@/assets/avatar.jpg"
import ModifyProfile from "@/views/ModifyProfile"

let showModifyProfile = ref(false)

const Stateful = defineComponent({
  setup() {
    const session = useSessionStore()

    const options = reactive<RequestOf<typeof api.memberController.getProfile>>({ id: session.id! })

    const { data, isLoading } = useQuery({
      queryKey: ["memberProfile", options],
      queryFn: () => api.memberController.getProfile(options),
    })
    return () => (
      <>
        {data.value ? (
          <div class={"flex items-center"}>
            <NAvatar
              size={"large"}
              round
              bordered
              src={`${BASE_URL}/image/${data.value.avatar}`}
              fallbackSrc={Avatar}
            />
            <div>{data.value.nickname}</div>
          </div>
        ) : isLoading ? (
          <NSpin />
        ) : (
          <NAlert type={"warning"}>
            <NButton type={"warning"} text onClick={() => (showModifyProfile.value = true)}>
              {window.$i18n("component.state.createProfile")}
            </NButton>
          </NAlert>
        )}
        <NModal
          v-model:show={showModifyProfile.value}
          preset={"card"}
          onClose={() => (showModifyProfile.value = false)}
          v-slots={{
            header: () => <div>{window.$i18n("component.state.profile")}</div>,
            default: () => <ModifyProfile onSuccess={() => (showModifyProfile.value = false)} />,
          }}
        />
      </>
    )
  },
})

export default Stateful
