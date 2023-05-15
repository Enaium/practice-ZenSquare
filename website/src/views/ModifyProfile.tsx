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
import ProfileForm from "@/components/ProfileForm"
import { useQuery } from "@tanstack/vue-query"
import { NBreadcrumb, NBreadcrumbItem, NSpin } from "naive-ui"
import { defineComponent, reactive } from "vue"
import { useRoute, useRouter } from "vue-router"

const ModifyProfile = defineComponent(() => {
  const route = useRoute()
  const router = useRouter()

  const options = reactive<RequestOf<typeof api.memberProfileController.findFullProfile>>({
    memberId: route.params.id as string
  })

  const { data, isLoading } = useQuery({
    queryKey: ["findFullProfile", route.params],
    queryFn: () => api.memberProfileController.findFullProfile(options)
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
          <NBreadcrumbItem onClick={() => router.push({ name: "profile", params: { id: data.value!.memberId } })}>
            {window.$i18n("view.profile.profile")}
          </NBreadcrumbItem>
          <NBreadcrumbItem>{window.$i18n("view.profile.modify")}</NBreadcrumbItem>
        </NBreadcrumb>
        <ProfileForm profile={{ ...data.value }} />
      </>
    )
})

export default ModifyProfile
