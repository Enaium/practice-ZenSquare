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
import { FormInst, FormItemRule, NButton, NForm, NFormItem, NInput, useMessage } from "naive-ui"
import { MemberInput } from "@/__generated/model/static"
import { api } from "@/common/ApiInstance"

const formRef = ref<FormInst | null>(null)
const form = reactive<MemberInput>({})

const Register: FunctionalComponent<{ onSuccess: () => void }> = ({ onSuccess }) => {
  const message = useMessage()
  const submit = () => {
    formRef.value?.validate((errors) => {
      if (!errors) {
        api.memberController
          .saveMember({ body: form })
          .then(() => {
            message.success(window.$i18n("view.register.success"))
            onSuccess()
          })
          .catch((error) => {
            message.error(error)
          })
      }
    })
  }

  const validatePasswordSame = (_: FormItemRule, value: string): boolean => value === form.password

  return (
    <>
      <NForm model={form} ref={formRef}>
        <NFormItem
          path={"username"}
          label={window.$i18n("view.login.username.label")}
          rule={[{ required: true, message: window.$i18n("view.login.username.message") }]}
        >
          <NInput v-model:value={form.username} />
        </NFormItem>
        <NFormItem
          path={"password"}
          label={window.$i18n("view.login.password.label")}
          rule={[{ required: true, message: window.$i18n("view.login.password.message") }]}
        >
          <NInput v-model:value={form.password} type={"password"} />
        </NFormItem>
        <NFormItem
          path={"confirmPassword"}
          label={window.$i18n("view.login.password.label")}
          rule={[
            { required: true, message: window.$i18n("view.login.password.message") },
            {
              validator: validatePasswordSame,
              message: window.$i18n("view.register.passwordDifferent"),
              trigger: ["blur", "input"],
            },
          ]}
        >
          <NInput v-model:value={form.confirmPassword} type={"password"} />
        </NFormItem>
        <NButton class={"w-full"} type={"primary"} onClick={submit}>
          {window.$i18n("view.register.register")}
        </NButton>
      </NForm>
    </>
  )
}

export default Register
