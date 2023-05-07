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

import { FunctionalComponent, reactive, ref } from "vue"
import { ReplyInput } from "@/__generated/model/static"
import { FormInst, NButton, NForm, NFormItem, useMessage } from "naive-ui"
import Content from "@/components/Content.tsx"
import { ArrowReply16Regular } from "@vicons/fluent"
import { api } from "@/common/ApiInstance.ts"

const form = reactive<ReplyInput>({})
const formRef = ref<FormInst | null>(null)

const ReplyForm: FunctionalComponent<{ thread: string }> = ({ thread }) => {
  const message = useMessage()
  const submit = () => {
    formRef.value?.validate((errors) => {
      if (!errors) {
        api.replyController
          .saveReply({ body: { ...form, threadId: thread } })
          .then(() => {
            message.success(window.$i18n("common.success"))
          })
          .catch((error) => {
            message.error(error)
          })
      }
    })
  }

  return (
    <>
      <NForm model={form} ref={formRef}>
        <NFormItem
          path={"content"}
          label={window.$i18n("component.replyForm.reply.label")}
          rule={[{ required: true, message: window.$i18n("component.replyForm.reply.message") }]}
        >
          <Content v-model={form.content} />
        </NFormItem>
        <div class={"flex flex-row-reverse"}>
          <NButton renderIcon={() => <ArrowReply16Regular />} type={"primary"} onClick={submit}>
            {window.$i18n("common.submit")}
          </NButton>
        </div>
      </NForm>
    </>
  )
}

export default ReplyForm