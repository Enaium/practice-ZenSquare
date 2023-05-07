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
import { api } from "@/common/ApiInstance.ts"
import { RequestOf } from "@/__generated"
import { NList, NListItem } from "naive-ui"

const ThreadList = defineComponent({
  props: {
    forum: String,
  },
  setup(props) {
    const options = reactive<RequestOf<typeof api.threadController.findThreads>>({ forumId: props.forum! })
    const { data } = useQuery({
      queryKey: ["findThreads", options],
      queryFn: () => api.threadController.findThreads(options),
    })
    return () => (
      <>
        <NList>
          {data.value?.content.map((thread, index) => (
            <NListItem key={index}>{thread.title}</NListItem>
          ))}
        </NList>
      </>
    )
  },
})

export default ThreadList
