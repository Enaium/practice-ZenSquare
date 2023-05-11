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
import { NButton, NGrid, NGridItem, NPopconfirm, NSpin, NTag, useMessage } from "naive-ui"
import Avatar from "@/components/Avatar"

const VisitorMenu = defineComponent({
  setup() {
    const session = useSessionStore()

    const options = reactive<RequestOf<typeof api.memberProfileController.findProfile>>({ memberId: session.id! })

    const message = useMessage()

    const { data, isLoading } = useQuery({
      queryKey: ["findProfile", options],
      queryFn: () => api.memberProfileController.findProfile(options),
    })

    return () => (
      <>
        {isLoading.value || !data.value ? (
          <NSpin />
        ) : (
          <>
            <div class={"flex gap-5"}>
              <Avatar id={data.value.avatar} size={128} round bordered />
              <div class={"flex flex-col w-36"}>
                <NButton text class={"text-left"}>
                  <h3>{data.value.nickname}</h3>
                </NButton>
                <div class={"flex justify-between"}>
                  <div>{window.$i18n("view.visitorMenu.role")}:</div>
                  <NTag type={"primary"}>{data.value.role.name}</NTag>
                </div>
                <div class={"flex justify-between"}>
                  <div>{window.$i18n("view.visitorMenu.thread")}:</div>
                  <div>0</div>
                </div>
                <div class={"flex justify-between"}>
                  <div>{window.$i18n("view.visitorMenu.replies")}:</div>
                  <div>0</div>
                </div>
              </div>
            </div>
            <div class={"bg-gray-200 w-full h-px"} />
            <div>
              <NGrid xGap={10} yGap={10} cols={2}>
                <NGridItem>
                  <NButton text>{window.$i18n("view.visitorMenu.threads")}</NButton>
                </NGridItem>
                <NGridItem>
                  <NButton text>{window.$i18n("view.visitorMenu.replies")}</NButton>
                </NGridItem>
              </NGrid>
            </div>
            <div class={"bg-gray-200 w-full h-px"} />
            <div>
              <NGrid xGap={10} yGap={10} cols={2}>
                <NGridItem>
                  <NButton text>{window.$i18n("view.visitorMenu.accountDetails")}</NButton>
                </NGridItem>
                <NGridItem>
                  <NButton text>{window.$i18n("view.visitorMenu.following")}</NButton>
                </NGridItem>
                <NGridItem>
                  <NButton text>{window.$i18n("view.visitorMenu.security")}</NButton>
                </NGridItem>
              </NGrid>
            </div>
            <div class={"bg-gray-200 w-full h-px"} />
            <NPopconfirm
              v-slots={{
                trigger: () => <NButton text>{window.$i18n("view.visitorMenu.logout")}</NButton>,
                default: () => {
                  return <div>{window.$i18n("view.visitorMenu.logoutConfirm")}</div>
                },
              }}
              onPositiveClick={() => {
                api.sessionController.deleteSession({ id: session.id! }).then(() => {
                  session.id = null
                  session.token = null
                  message.success(window.$i18n("view.visitorMenu.logoutSuccess"))
                })
              }}
            />
          </>
        )}
      </>
    )
  },
})

export default VisitorMenu
