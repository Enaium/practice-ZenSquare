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

import { defineComponent, reactive, ref } from "vue"
import { api } from "@/common/ApiInstance"
import { NButton, NForm, NFormItem, NInput, useMessage, type FormInst, NSpin } from "naive-ui"
import type { ThreadInput } from "@/__generated/model/static"
import Editor from "@/components/Editor"
import { useRoute } from "vue-router"
import { useQuery } from "@tanstack/vue-query"
import type { RequestOf } from "@/__generated"
import ThreadForm from "@/components/ThreadForm"

const PostThread = defineComponent(() => {
  const route = useRoute()
  const message = useMessage()

  const options = reactive<RequestOf<typeof api.threadController.findThread>>({ id: route.params.thread as string })

  const { data, isLoading } = useQuery({
    queryKey: ["forums", options],
    queryFn: () => api.threadController.findThread(options),
    enabled: route.params.thread !== undefined
  })

  return () =>
    route.params.thread !== undefined ? (
      isLoading.value && !data.value ? (
        <NSpin />
      ) : (
        <ThreadForm thread={{ ...data.value }} />
      )
    ) : (
      <ThreadForm thread={{ forumId: route.params.forum as string }} />
    )
})

export default PostThread
