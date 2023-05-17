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

import type { ThreadInput } from "@/__generated/model/static"
import { NForm, NFormItem, NInput, NButton, type FormInst, useMessage } from "naive-ui"
import { defineComponent, ref } from "vue"
import Editor from "./Editor"
import { api } from "@/common/ApiInstance"

const ThreadForm = defineComponent(
  (props: { thread: ThreadInput }) => {
    const message = useMessage()

    const formRef = ref<FormInst | null>(null)

    const submit = () => {
      formRef.value?.validate((errors) => {
        if (!errors) {
          api.postController
            .savePost({ body: props.thread })
            .then(() => {
              message.success(window.$i18n("common.success"))
            })
            .catch((error) => {
              message.error(error)
            })
        }
      })
    }

    return () => (
      <NForm model={props.thread} ref={formRef}>
        <NFormItem
          path={"title"}
          label={window.$i18n("component.threadForm.title.label")}
          rule={[{ required: true, message: window.$i18n("component.threadForm.title.message") }]}
        >
          <NInput v-model:value={props.thread.title} />
        </NFormItem>
        <NFormItem
          path={"content"}
          label={window.$i18n("component.threadForm.content.label")}
          rule={[{ required: true, message: window.$i18n("component.threadForm.content.message") }]}
        >
          <Editor v-model={props.thread.content} />
        </NFormItem>
        <NButton onClick={submit} type={"primary"}>
          {window.$i18n("common.submit")}
        </NButton>
      </NForm>
    )
  },
  {
    props: ["thread"]
  }
)

export default ThreadForm
