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
import { useQuery } from "@tanstack/vue-query"
import { api } from "@/common/ApiInstance"
import type { RequestOf } from "@/__generated"
import { NList, NListItem, NSpin } from "naive-ui"
import Item from "@/components/ThreadList/Item"
import Pagination from "@/components/Pagination"

const WhatsNew = defineComponent({
  setup() {
    const options = reactive<RequestOf<typeof api.threadController.findLatest>>({})

    const { data, isLoading } = useQuery({
      queryKey: ["whatsNew", options],
      queryFn: () => api.threadController.findLatest(options),
    })

    return () => (
      <>
        <div class={"mt-5"}>
          <div>{window.$i18n("component.menu.whatsNew")}</div>
        </div>
        <div class={"mt-5"}>
          {isLoading.value || !data.value ? (
            <NSpin />
          ) : (
            <>
              <NList bordered>
                {data.value.content.map((thread) => (
                  <NListItem>
                    <Item thread={thread} />
                  </NListItem>
                ))}
              </NList>
              {data.value.totalElements > data.value.size && (
                <Pagination page={data.value} v-model:change={options.page} />
              )}
            </>
          )}
        </div>
      </>
    )
  },
})

export default WhatsNew
