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
import { useMessage, NSpin, NButton, NForm, NFormItem, NInput, type FormInst } from "naive-ui"
import { useRoute } from "vue-router"
import { useQuery } from "@tanstack/vue-query"
import type { RequestOf } from "@/__generated"
import ThreadForm from "@/components/ThreadForm"
import Editor from "@/components/Editor"
import type { ThreadInput } from "@/__generated/model/static"

const NewPost = defineComponent(() => {
  const route = useRoute()

  const message = useMessage()

  const form = reactive<ThreadInput>({ forumId: route.params.forum as string })
  const formRef = ref<FormInst | null>(null)

  const submit = () => {
    formRef.value?.validate((errors) => {
      if (!errors) {
        api.postController
          .savePost({ body: form })
          .then(() => {
            message.success(window.$i18n("common.success"))
          })
          .catch((error) => {
            message.error(error)
          })
      }
    })
  }

  const options = reactive<RequestOf<typeof api.postController.findPost>>({ id: route.params.thread as string })

  const { data, isLoading } = useQuery({
    queryKey: ["forums", options],
    queryFn: () => api.postController.findPost(options),
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
      <NForm model={form} ref={formRef}>
        <NFormItem
          path={"title"}
          label={window.$i18n("component.threadForm.title.label")}
          rule={[{ required: true, message: window.$i18n("component.threadForm.title.message") }]}
        >
          <NInput v-model:value={form.title} />
        </NFormItem>
        <NFormItem
          path={"content"}
          label={window.$i18n("component.threadForm.content.label")}
          rule={[{ required: true, message: window.$i18n("component.threadForm.content.message") }]}
        >
          <Editor v-model={form.content} />
        </NFormItem>
        <NButton onClick={submit} type={"primary"}>
          {window.$i18n("common.submit")}
        </NButton>
      </NForm>
    )
})

export default NewPost
