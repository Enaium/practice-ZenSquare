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
import { RequestOf } from "@/__generated"
import { NList, NListItem, NSpin, NTag, NTime, NTooltip } from "naive-ui"
import Avatar from "@/components/Avatar"
import Content from "@/components/Content"
import dayjs from "dayjs"
import Pagination from "@/components/Pagination"

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
      isLoading.value || !data.value ? (
        <NSpin />
      ) : (
        <>
          <NList bordered>
            {data.value.content.map((reply) => (
              <NListItem key={reply.id} style={{ padding: 0 }}>
                <div class={"flex"}>
                  {/*member*/}
                  <div class={"flex flex-col items-center gap-1 m-5"}>
                    <Avatar id={reply.member.profile?.avatar} size={128} bordered round />
                    <div>{reply.member.profile?.nickname}</div>
                    <NTag type={"primary"}>{reply.member.profile?.role.name}</NTag>
                    <NTooltip
                      v-slots={{
                        trigger: () => (
                          <NTime time={new Date()} to={dayjs(reply.modifiedTime).toDate()} type={"relative"} />
                        ),
                        default: () => <div>{dayjs(reply.modifiedTime).format("YYYY-MM-DD hh:mm:ss")}</div>,
                      }}
                    />
                  </div>
                  <div class={"border-solid border-l border-gray-100"} />
                  {/*content*/}
                  <Content v-model={reply.content} previewOnly />
                </div>
              </NListItem>
            ))}
          </NList>
          {data.value.totalElements > data.value.size && <Pagination page={data.value} v-model:change={options.page} />}
        </>
      )
  },
})

export default ReplyList
