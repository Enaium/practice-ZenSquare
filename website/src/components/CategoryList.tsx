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

import { defineComponent } from "vue"
import { useQuery } from "@tanstack/vue-query"
import { api } from "@/common/ApiInstance.ts"
import { NCard, NCollapse, NCollapseItem } from "naive-ui"
import ForumList from "@/components/ForumList.tsx"

const CategoryList = defineComponent({
  setup() {
    const { data } = useQuery({
      queryKey: ["forums"],
      queryFn: () => api.controller.categories(),
    })

    return () => (
      <>
        <NCard>
          <NCollapse>
            {data.value?.map((category, index) => {
              return (
                <NCollapseItem title={category.name} name={index} key={index}>
                  <ForumList category={category.id} />
                </NCollapseItem>
              )
            })}
          </NCollapse>
        </NCard>
      </>
    )
  },
})

export default CategoryList
