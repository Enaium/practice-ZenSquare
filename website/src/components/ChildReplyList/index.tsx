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
import type { RequestOf } from "@/__generated"
import { api } from "@/common/ApiInstance"
import { NList, NListItem, NSpin } from "naive-ui"
import Pagination from "@/components/Pagination"
import Item from "@/components/ChildReplyList/Item"

const ChildReplyList = defineComponent(
  (props: { parent: string }) => {
    const options = reactive<RequestOf<typeof api.replyController.findChildrenReplies>>({ replyId: props.parent! })

    const { data, isLoading } = useQuery({
      queryKey: ["childReply", options],
      queryFn: () => api.replyController.findChildrenReplies(options)
    })

    return () =>
      isLoading.value || !data.value ? (
        <NSpin />
      ) : (
        <>
          <NList bordered>
            {data.value.content.map((child) => (
              <NListItem key={child.id}>
                <Item reply={child} />
              </NListItem>
            ))}
          </NList>
          {data.value.totalElements > data.value.size && <Pagination page={data.value} v-model:change={options.page} />}
        </>
      )
  },
  {
    props: ["parent"]
  }
)

export default ChildReplyList
