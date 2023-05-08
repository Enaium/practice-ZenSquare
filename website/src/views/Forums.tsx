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

import { useRoute, useRouter } from "vue-router"
import ThreadList from "@/components/ThreadList"
import { NBreadcrumb, NBreadcrumbItem, NCard, NSpin } from "naive-ui"
import { defineComponent } from "vue"
import { useQuery } from "@tanstack/vue-query"
import { api } from "@/common/ApiInstance.ts"

const Forums = defineComponent({
  setup() {
    const route = useRoute()
    const router = useRouter()

    const { data, isLoading } = useQuery({
      queryKey: ["findForum"],
      queryFn: () => api.forumController.findForum({ id: route.params.forum as string }),
    })

    return () => (
      <>
        {isLoading.value || !data.value ? (
          <NSpin />
        ) : (
          <NBreadcrumb>
            <NBreadcrumbItem onClick={() => router.push({ name: "home" })}>Forums</NBreadcrumbItem>
            <NBreadcrumbItem onClick={() => router.push({ name: "home" })}>{data.value?.category.name}</NBreadcrumbItem>
            <NBreadcrumbItem>{data.value.name}</NBreadcrumbItem>
          </NBreadcrumb>
        )}
        <NCard>
          <ThreadList forum={route.params.forum as string} />
        </NCard>
      </>
    )
  },
})

export default Forums
