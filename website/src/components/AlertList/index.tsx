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

import type { RequestOf } from "@/__generated"
import { api } from "@/common/ApiInstance"
import { useSessionStore } from "@/store"
import { useQuery } from "@tanstack/vue-query"
import { NButton, NList, NListItem, NSpin } from "naive-ui"
import { defineComponent, reactive } from "vue"
import Item from "@/components/AlertList/Item"

const AlertList = defineComponent(
  (props: { size: number; onPush: () => void }) => {
    const session = useSessionStore()

    const options = reactive<RequestOf<typeof api.alertController.findAlerts>>({
      memberId: session.id!,
      size: props.size ?? 10
    })

    const { data, isLoading } = useQuery({
      queryKey: ["findAlerts"],
      queryFn: () => api.alertController.findAlerts(options)
    })

    return () =>
      isLoading.value || !data.value ? (
        <NSpin />
      ) : (
        <NList
          bordered
          v-slots={{
            header: () => <div>Alerts</div>,
            default: () =>
              data.value.content.map((alert) => (
                <NListItem key={alert.id}>
                  <Item alert={alert} />
                </NListItem>
              )),
            footer: () => (
              <NButton text type={"primary"} onClick={() => props.onPush()}>
                Show all
              </NButton>
            )
          }}
        />
      )
  },
  {
    props: ["size", "onPush"]
  }
)

export default AlertList
