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
import { NCard, NList, NListItem, NSpin } from "naive-ui"
import { defineComponent, reactive } from "vue"
import { RouterLink } from "vue-router"

const SelectForum = defineComponent(() => {
  const options = reactive<RequestOf<typeof api.categoryController.findCategories>>({})
  const { data, isLoading } = useQuery({
    queryKey: ["categoryList"],
    queryFn: () => api.categoryController.findCategories(options)
  })

  return () =>
    isLoading.value ? (
      <NSpin />
    ) : (
      data.value?.content.map((category, categoryIndex) => (
        <NCard title={category.name} key={categoryIndex} segmented={{ content: true }}>
          <NList>
            {category.forums?.map((forum, forumIndex) => (
              <NListItem key={forumIndex}>
                <RouterLink
                  to={{
                    name: "new-post",
                    params: { forum: forum.id }
                  }}
                >
                  {forum.name}
                </RouterLink>
              </NListItem>
            ))}
          </NList>
        </NCard>
      ))
    )
})

export default SelectForum
