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
import type { RequestOf } from "@/__generated"
import { api } from "@/common/ApiInstance"
import { useQuery } from "@tanstack/vue-query"
import { NAlert, NButton, NButtonGroup, NIcon, NModal, NPopover, NSpin } from "naive-ui"
import VisitorMenu from "@/views/VisitorMenu"
import Avatar from "@/components/Avatar"
import ProfileForm from "../ProfileForm"
import { Alert24Regular, Mail24Regular, Search24Regular } from "@vicons/fluent"
import ConversationList from "@/components/ConversationList"

const showModifyProfile = ref(false)

const Sessional = defineComponent(() => {
  const showVistorMenu = ref(false)
  const showConversation = ref(false)

  const session = useSessionStore()

  const options = reactive<RequestOf<typeof api.memberProfileController.findProfile>>({ memberId: session.id! })

  const { data, isLoading } = useQuery({
    queryKey: ["findProfile", options],
    queryFn: () => api.memberProfileController.findProfile(options)
  })

  return () => (
    <>
      {data.value ? (
        <div class={"flex items-center gap-2"}>
          <NButtonGroup>
            <NPopover
              show={showVistorMenu.value}
              onClickoutside={() => (showVistorMenu.value = false)}
              v-slots={{
                trigger: () => (
                  <NButton class={"flex items-center"} onClick={() => (showVistorMenu.value = true)}>
                    <Avatar id={data.value!.avatar} size={"small"} round bordered />
                    <div>{data.value!.nickname}</div>
                  </NButton>
                ),
                default: () => <VisitorMenu onPush={() => (showVistorMenu.value = false)} />
              }}
            />
            <NPopover
              raw
              show={showConversation.value}
              onClickoutside={() => (showConversation.value = false)}
              v-slots={{
                trigger: () => (
                  <NButton onClick={() => (showConversation.value = true)}>
                    <NIcon size={24}>
                      <Mail24Regular />
                    </NIcon>
                  </NButton>
                ),
                default: () => <ConversationList size={3} onPush={() => (showConversation.value = false)} />
              }}
            />
            <NButton>
              <NIcon size={24}>
                <Alert24Regular />
              </NIcon>
            </NButton>
          </NButtonGroup>
          <NButton renderIcon={() => <Search24Regular />}>Search</NButton>
        </div>
      ) : isLoading.value ? (
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
          default: () => <ProfileForm profile={{}} onSuccess={() => (showModifyProfile.value = false)} />
        }}
      />
    </>
  )
})

export default Sessional
