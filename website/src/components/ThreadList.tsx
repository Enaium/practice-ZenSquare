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
import { NIcon, NList, NListItem, NSpin, NTime, NTooltip } from "naive-ui"
import Avatar from "@/components/Avatar"
import dayjs from "dayjs"
import { RouterLink } from "vue-router"
import { Clock16Regular } from "@vicons/fluent"
import Pagination from "@/components/Pagination.tsx"

const ThreadList = defineComponent({
  props: {
    forum: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const options = reactive<RequestOf<typeof api.threadController.findThreads>>({ forumId: props.forum! })
    const { data, isLoading } = useQuery({
      queryKey: ["findThreads", options],
      queryFn: () => api.threadController.findThreads(options),
    })

    return () =>
      isLoading.value || !data.value ? (
        <NSpin />
      ) : (
        <>
          <NList bordered>
            {data.value.content.map((thread, index) => (
              <NListItem key={index}>
                <div class={"flex justify-between"}>
                  {/*left*/}
                  <div class={"flex"}>
                    <Avatar id={thread.member.profile?.avatar} size={48} bordered round />
                    <div class={"flex flex-col justify-between"}>
                      <RouterLink
                        to={{
                          name: "threads",
                          params: { thread: thread.id },
                        }}
                      >
                        {thread.title}
                      </RouterLink>
                      <div class={"flex"}>
                        <span>{thread.member.profile?.nickname}</span>
                        <NIcon size={24}>
                          <Clock16Regular />
                        </NIcon>
                        <NTooltip
                          v-slots={{
                            trigger: () => (
                              <NTime time={new Date()} to={dayjs(thread.modifiedTime).toDate()} type={"relative"} />
                            ),
                            default: () => <div>{dayjs(thread.modifiedTime).format("YYYY-MM-DD hh:mm:ss")}</div>,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  {/*right*/}
                  <div class={"flex gap-10"}>
                    {/*thread info*/}
                    <div class={"h-full w-24 flex flex-col justify-between"}>
                      <div class={"flex justify-between"}>
                        <span>Replies:</span>
                        <span>{thread.reply}</span>
                      </div>
                      <div class={"flex justify-between"}>
                        <span>Views:</span>
                        <span>0</span>
                      </div>
                    </div>
                    {/*last reply*/}
                    <div class={"flex"}>
                      <div class={"h-full flex flex-col justify-between items-end"}>
                        <NTooltip
                          v-slots={{
                            trigger: () => (
                              <NTime
                                time={new Date()}
                                to={dayjs(thread.lastReplyTime ?? thread.modifiedTime).toDate()}
                                type={"relative"}
                              />
                            ),
                            default: () => (
                              <div>
                                {dayjs(thread.lastReplyTime ?? thread.modifiedTime).format("YYYY-MM-DD hh:mm:ss")}
                              </div>
                            ),
                          }}
                        />
                        <div>{thread.lastReplyMember?.profile?.nickname ?? thread.member.profile?.nickname}</div>
                      </div>
                      <Avatar
                        id={thread.lastReplyMember?.profile?.avatar ?? thread.member.profile?.avatar}
                        size={48}
                        bordered
                        round
                      />
                    </div>
                  </div>
                </div>
              </NListItem>
            ))}
          </NList>
          {data.value.totalElements > data.value.size && <Pagination page={data.value} v-model:change={options.page} />}
        </>
      )
  },
})

export default ThreadList
