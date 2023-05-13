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

import { defineComponent, ref } from "vue"

import { NButton, NForm, NFormItem, useMessage } from "naive-ui"
import type { FormInst } from "naive-ui/lib/form/src/interface"
import type { ReplyInput } from "@/__generated/model/static"
import { ArrowReply16Regular } from "@vicons/fluent"
import Editor from "@/components/Editor"
import { api } from "@/common/ApiInstance"

const ReplyForm = defineComponent(
  (props: { thread?: string; parent?: string; id?: string }) => {
    const form = ref<ReplyInput>({})
    const formRef = ref<FormInst | null>(null)

    const message = useMessage()
    const submit = () => {
      formRef.value?.validate((errors) => {
        if (!errors) {
          api.replyController
            .saveReply({
              body: {
                ...form.value,
                id: props.id,
                threadId: props.thread,
                parentId: props.parent
              }
            })
            .then(() => {
              message.success(window.$i18n("common.success"))
              form.value = {}
            })
            .catch((error) => {
              message.error(error)
            })
        }
      })
    }

    return () => (
      <>
        <NForm model={form.value} ref={formRef}>
          <NFormItem
            path={"content"}
            label={window.$i18n("component.replyForm.reply.label")}
            rule={[{ required: true, message: window.$i18n("component.replyForm.reply.message") }]}
          >
            <Editor v-model={form.value.content} />
          </NFormItem>
          <div class={"flex flex-row-reverse"}>
            <NButton renderIcon={() => <ArrowReply16Regular />} type={"primary"} onClick={submit}>
              {window.$i18n("common.submit")}
            </NButton>
          </div>
        </NForm>
      </>
    )
  },
  { props: ["thread", "parent", "id"] }
)

export default ReplyForm
