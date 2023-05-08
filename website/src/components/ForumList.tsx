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
import { NIcon, NList, NListItem, NSpin } from "naive-ui"
import { Chat24Regular } from "@vicons/fluent"
import Image from "@/views/Image"
import { RouterLink } from "vue-router"
import Pagination from "@/components/Pagination.tsx"

const ForumList = defineComponent({
  props: {
    category: String,
  },
  setup: function (props) {
    const options = reactive<RequestOf<typeof api.forumController.findForums>>({ categoryId: props.category! })

    const { data, isLoading } = useQuery({
      queryKey: ["findForums", options],
      queryFn: () => api.forumController.findForums(options),
    })

    return () =>
      isLoading.value || !data.value ? (
        <NSpin />
      ) : (
        <>
          <NList bordered>
            {data.value?.content.map((forum, index) => (
              <NListItem key={index}>
                <div class={"flex justify-between items-center"}>
                  {/*left*/}
                  <div class={"flex gap-5"}>
                    {/*icon*/}
                    <div class={"text-4xl flex justify-center items-center"}>
                      <Image
                        id={forum.icon}
                        fallback={
                          <NIcon>
                            <Chat24Regular />
                          </NIcon>
                        }
                      />
                    </div>
                    {/*content*/}
                    <div class={"flex flex-col"}>
                      <RouterLink class={"font-bold"} to={{ name: "forums", params: { forum: forum.id } }}>
                        {forum.name}
                      </RouterLink>
                      <div>{forum.description}</div>
                    </div>
                  </div>
                  {/*right*/}
                  <div class={"flex gap-5"}>
                    <div class={"flex flex-col items-center"}>
                      <div>thread</div>
                      <div>{forum.thread}</div>
                    </div>
                    <div class={"bg-gray-200 w-px"} />
                    <div class={"flex flex-col items-center"}>
                      <div>message</div>
                      <div>0</div>
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

export default ForumList
