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

import { computed, defineComponent } from "vue"
import { useQuery } from "@tanstack/vue-query"
import { api } from "@/common/ApiInstance"
import { RouterLink, useRoute } from "vue-router"
import { NCard, NList, NListItem } from "naive-ui"
import ThreadForm from "@/components/ThreadForm"

const PostThread = defineComponent({
  props: {
    forum: {
      type: String,
      nullable: true,
    },
  },
  setup(props) {
    const route = useRoute()
    const { data } = useQuery({
      queryKey: ["categoryList"],
      queryFn: () => api.controller.categories(),
    })

    const forum = computed(() => props.forum ?? route.params.forum ?? null)

    return () => (
      <>
        {forum.value ? (
          <ThreadForm forum={forum.value as string} />
        ) : (
          <>
            {data.value?.map((category, categoryIndex) => {
              return (
                <NCard title={category.name} key={categoryIndex} segmented={{ content: true }}>
                  <NList>
                    {category.forums?.map((forum, forumIndex) => (
                      <NListItem key={forumIndex}>
                        <RouterLink
                          to={{
                            name: "post-thread",
                            params: { forum: forum.id },
                          }}
                        >
                          {forum.name}
                        </RouterLink>
                      </NListItem>
                    ))}
                  </NList>
                </NCard>
              )
            })}
          </>
        )}
      </>
    )
  },
})

export default PostThread
