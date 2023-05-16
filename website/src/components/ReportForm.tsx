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

import type { ReportInput } from "@/__generated/model/static"
import { NForm, type FormInst, NButton, NFormItem, useMessage } from "naive-ui"
import { defineComponent, ref } from "vue"
import Editor from "@/components/Editor"
import { api } from "@/common/ApiInstance"

const ReportForm = defineComponent(
  (props: { report: ReportInput; onSuccess: () => void }) => {
    const message = useMessage()

    const formRef = ref<FormInst | null>(null)

    const submit = () => {
      formRef.value?.validate((errors) => {
        if (!errors) {
          api.reportController.saveReport({ body: props.report }).then(() => {
            message.success(window.$i18n("common.success"))
          })
        }
      })
    }

    return () => (
      <NForm model={props.report} ref={formRef}>
        <NFormItem
          path="reason"
          label={window.$i18n("component.reportForm.reason.label")}
          rule={[{ required: true, message: window.$i18n("component.reportForm.reason.message") }]}
        >
          <Editor v-model={props.report.reason} />
        </NFormItem>
        <NButton onClick={submit}>{window.$i18n("common.submit")}</NButton>
      </NForm>
    )
  },
  {
    props: ["report", "onSuccess"]
  }
)

export default ReportForm
