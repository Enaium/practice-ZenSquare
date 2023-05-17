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
import type { RequestOf } from "@/__generated"
import { NBreadcrumb, NBreadcrumbItem, NSpin } from "naive-ui"
import Thread from "@/components/Thread"

const Post = defineComponent({
  setup() {
    const route = useRoute()
    const router = useRouter()

    const options = reactive<RequestOf<typeof api.postController.findPost>>({ id: route.params.thread as string })

    const { data, isLoading } = useQuery({
      queryKey: ["threads", options],
      queryFn: () => api.postController.findPost(options)
    })

    return () =>
      isLoading.value || !data.value ? (
        <NSpin />
      ) : (
        <>
          {/*breadcrumb*/}
          <NBreadcrumb>
            <NBreadcrumbItem onClick={() => router.push({ name: "forums" })}>Forums</NBreadcrumbItem>
            <NBreadcrumbItem onClick={() => router.push({ name: "forums" })}>
              {data.value.forum.category.name}
            </NBreadcrumbItem>
            <NBreadcrumbItem
              onClick={() =>
                router.push({
                  name: "forum",
                  params: {
                    forum: data.value?.forum.id
                  }
                })
              }
            >
              {data.value.forum.name}
            </NBreadcrumbItem>
            <NBreadcrumbItem>{data.value?.title}</NBreadcrumbItem>
          </NBreadcrumb>
          <Thread thread={data.value} />
        </>
      )
  }
})

export default Post
