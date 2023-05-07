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
import { NList, NListItem, NTime } from "naive-ui"
import Avatar from "@/components/Avatar.tsx"
import dayjs from "dayjs"

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
        <NList bordered>
          {data.value?.content.map((thread, index) => (
            <NListItem key={index}>
              <div class={"flex justify-between"}>
                {/*left*/}
                <div class={"flex"}>
                  <Avatar id={thread.member.profile?.avatar} size={48} bordered round />
                  <div class={"flex flex-col justify-between"}>
                    <div>{thread.title}</div>
                    <div>
                      <span>{thread.member.profile?.nickname}</span>
                      <NTime time={new Date()} to={dayjs(thread.modifiedTime).toDate()} type={"relative"} />
                    </div>
                  </div>
                </div>
                {/*right*/}
                <div class={"w-24"}>
                  <div class={"flex justify-between"}>
                    <span>Replies:</span>
                    <span>0</span>
                  </div>
                  <div class={"flex justify-between"}>
                    <span>Views:</span>
                    <span>0</span>
                  </div>
                </div>
              </div>
            </NListItem>
          ))}
        </NList>
      </>
    )
  },
})

export default ThreadList
