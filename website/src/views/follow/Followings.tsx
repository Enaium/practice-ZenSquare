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

import type { RequestOf } from "@/__generated"
import { api } from "@/common/ApiInstance"
import { useQuery } from "@tanstack/vue-query"
import { NBreadcrumb, NBreadcrumbItem, NList, NListItem, NSpin } from "naive-ui"
import { defineComponent, reactive } from "vue"
import { useRoute } from "vue-router"
import Item from "@/views/follow/Item"
import router from "@/router"
import Pagination from "@/components/Pagination"

const Followings = defineComponent(() => {
  const route = useRoute()

  const options = reactive<RequestOf<typeof api.memberFollowController.findFollowings>>({
    memberId: route.params.id as string
  })

  const { data, isLoading } = useQuery({
    queryKey: ["followings", options],
    queryFn: () => api.memberFollowController.findFollowings(options)
  })

  return () =>
    isLoading.value || !data.value ? (
      <NSpin />
    ) : (
      <>
        <NBreadcrumb>
          <NBreadcrumbItem onClick={() => router.push({ name: "members" })}>
            {window.$i18n("component.menu.members")}
          </NBreadcrumbItem>
          <NBreadcrumbItem>{window.$i18n("view.follow.followings")}</NBreadcrumbItem>
        </NBreadcrumb>
        <NList bordered>
          {data.value.content.map((member) => (
            <NListItem key={member.id}>
              <Item member={member} />
            </NListItem>
          ))}
        </NList>
        {data.value.totalElements > data.value.size && (
          <Pagination page={data.value} v-model:changePage={options.page} />
        )}
      </>
    )
})

export default Followings
