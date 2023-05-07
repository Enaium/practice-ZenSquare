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
import { NList, NListItem, NSpin, NTag } from "naive-ui"
import Avatar from "@/components/Avatar.tsx"
import Content from "@/components/Content.tsx"

const ReplyList = defineComponent({
  props: {
    thread: String,
  },
  setup(props) {
    const options = reactive<RequestOf<typeof api.replyController.findReplies>>({ threadId: props.thread! })

    const { data, isLoading } = useQuery({
      queryKey: ["replyList", options],
      queryFn: () => api.replyController.findReplies(options),
    })

    return () =>
      isLoading.value ? (
        <NSpin />
      ) : (
        <NList bordered>
          {data.value?.content.map((reply, index) => (
            <NListItem key={index} style={{ padding: 0 }}>
              <div class={"flex"}>
                {/*member*/}
                <div class={"flex flex-col items-center m-5"}>
                  <Avatar id={reply.member.profile?.avatar} size={128} bordered round />
                  <div>{reply.member.profile?.nickname}</div>
                  <NTag type={"primary"}>{reply.member.profile?.role.name}</NTag>
                </div>
                <div class={"border-solid border-l border-gray-100"} />
                {/*content*/}
                <Content v-model={reply.content} previewOnly />
              </div>
            </NListItem>
          ))}
        </NList>
      )
  },
})

export default ReplyList
