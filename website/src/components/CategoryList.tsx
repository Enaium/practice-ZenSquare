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
import { NCard, NCollapse, NCollapseItem, NSpin, NTooltip } from "naive-ui"
import ForumList from "@/components/ForumList"
import Pagination from "@/components/Pagination"
import { RequestOf } from "@/__generated/RequestOf"

const CategoryList = defineComponent({
  setup() {
    const options = reactive<RequestOf<typeof api.categoryController.findCategories>>({})

    const { data, isLoading } = useQuery({
      queryKey: ["findCategories", options],
      queryFn: () => api.categoryController.findCategories({}),
    })

    return () => (
      <>
        <NCard>
          {isLoading.value || !data.value ? (
            <NSpin />
          ) : (
            <>
              <NCollapse>
                {data.value.content.map((category) => {
                  return (
                    <NCollapseItem
                      v-slots={{
                        header: () => (
                          <NTooltip
                            style={{ maxWidth: "400px" }}
                            v-slots={{
                              trigger: () => <div>{category.name}</div>,
                              default: () => <div>{category.description}</div>,
                            }}
                          />
                        ),
                        default: () => <ForumList category={category.id} />,
                      }}
                      name={category.id}
                      key={category.id}
                    />
                  )
                })}
              </NCollapse>
              {data.value.totalElements > data.value.size && (
                <Pagination page={data.value} v-model:changePage={options.page} />
              )}
            </>
          )}
        </NCard>
      </>
    )
  },
})

export default CategoryList
