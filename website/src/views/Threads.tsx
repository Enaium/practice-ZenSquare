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
import { useRoute, useRouter } from "vue-router"
import { useQuery } from "@tanstack/vue-query"
import { api } from "@/common/ApiInstance"
import { RequestOf } from "@/__generated"
import dayjs from "dayjs"
import Avatar from "@/components/Avatar"
import Content from "@/components/Content"
import { NBreadcrumb, NBreadcrumbItem, NCard, NIcon, NSpin, NTag, NTime, NTooltip } from "naive-ui"
import { Clock16Regular, People16Regular } from "@vicons/fluent"
import ReplyForm from "@/components/ReplyForm.tsx"
import ReplyList from "@/components/ReplyList.tsx"

const Threads = defineComponent({
  setup() {
    const route = useRoute()
    const router = useRouter()

    const options = reactive<RequestOf<typeof api.threadController.findThread>>({ id: route.params.thread as string })

    const { data, isLoading } = useQuery({
      queryKey: ["threads", route.params.forum],
      queryFn: () => api.threadController.findThread(options),
    })

    return () =>
      isLoading.value ? (
        <NSpin />
      ) : (
        <>
          {/*breadcrumb*/}
          <NBreadcrumb>
            <NBreadcrumbItem onClick={() => router.push({ name: "home" })}>Forums</NBreadcrumbItem>
            <NBreadcrumbItem onClick={() => router.push({ name: "home" })}>
              {data.value?.forum.category.name}
            </NBreadcrumbItem>
            <NBreadcrumbItem
              onClick={() =>
                router.push({
                  name: "forums",
                  params: {
                    forum: data.value?.forum.id,
                  },
                })
              }
            >
              {data.value?.forum.name}
            </NBreadcrumbItem>
            <NBreadcrumbItem>{data.value?.title}</NBreadcrumbItem>
          </NBreadcrumb>
          {/*info*/}
          <h3>{data.value?.title}</h3>
          <div class={"flex gap-2"}>
            <div class={"flex"}>
              <NIcon size={24}>
                <People16Regular />
              </NIcon>
              <div>{data.value?.member.profile?.nickname}</div>
            </div>
            <div class={"flex"}>
              <NIcon size={24}>
                <Clock16Regular />
              </NIcon>
              <NTooltip
                v-slots={{
                  trigger: () => (
                    <NTime time={new Date()} to={dayjs(data.value?.modifiedTime).toDate()} type={"relative"} />
                  ),
                  default: () => <div>{dayjs(data.value?.modifiedTime).format("YYYY-MM-DD hh:mm:ss")}</div>,
                }}
              />
            </div>
          </div>
          {/*content*/}
          <div class={"flex border-solid border border-gray-100"}>
            {/*member*/}
            <div class={"flex flex-col items-center m-5"}>
              <Avatar id={data.value?.member.profile?.avatar} size={128} bordered round />
              <div>{data.value?.member.profile?.nickname}</div>
              <NTag type={"primary"}>{data.value?.member.profile?.role.name}</NTag>
            </div>
            <div class={"border-solid border-l border-gray-100"} />
            {/*content*/}
            <Content v-model={data.value!.content} previewOnly />
          </div>
          <div class={"mt-5"} />
          {/*reply list*/}
          <ReplyList thread={data.value!.id} />
          {/*reply*/}
          <div class={"mt-5"}>
            <NCard>
              <ReplyForm thread={data.value!.id} />
            </NCard>
          </div>
        </>
      )
  },
})

export default Threads
