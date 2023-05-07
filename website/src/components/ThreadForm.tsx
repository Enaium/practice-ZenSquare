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
import { FormInst, NButton, NForm, NFormItem, NInput } from "naive-ui"
import ContentEditor from "@/components/ContentEditor.tsx"
import { api } from "@/common/ApiInstance.ts"
import { ThreadInput } from "@/__generated/model/static"

const form = reactive<ThreadInput>({})
const formRef = ref<FormInst | null>(null)

const ThreadForm: FunctionalComponent<{ forum: string }> = ({ forum }) => {
  const submit = () => {
    formRef.value?.validate((errors) => {
      if (!errors) {
        api.threadController.saveThread({ body: { ...form, forumId: forum } }).then(() => {
          window.$message.success(window.$i18n("common.success"))
        })
      }
    })
  }
  return (
    <>
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
          <ContentEditor v-model={form.content} />
        </NFormItem>
        <NButton onClick={submit} type={"primary"}>
          {window.$i18n("common.submit")}
        </NButton>
      </NForm>
    </>
  )
}

export default ThreadForm
