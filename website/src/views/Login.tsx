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

import { FormInst, NButton, NForm, NFormItem, NInput, useMessage } from "naive-ui"
import { FunctionalComponent, reactive, ref } from "vue"
import { MemberInput } from "@/__generated/model/static"
import { api } from "@/common/ApiInstance"
import { useSessionStore } from "@/store"

const formRef = ref<FormInst | null>(null)
const form = reactive<MemberInput>({})

const Login: FunctionalComponent<{ onSuccess: () => void }> = ({ onSuccess }) => {
  const message = useMessage()
  const submit = () => {
    formRef.value?.validate((errors) => {
      if (!errors) {
        api.sessionController
          .save({ body: form })
          .then((data) => {
            const sessionStore = useSessionStore()
            sessionStore.id = data.id
            sessionStore.token = data.token
            message.success(window.$i18n("view.login.success"))
            onSuccess()
          })
          .catch((error) => {
            window.$message.error(error)
          })
      }
    })
  }

  return (
    <>
      <NForm model={form} ref={formRef} class={"w-64"}>
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
          <NInput
            v-model:value={form.password}
            type={"password"}
            onKeydown={(e: KeyboardEvent) => {
              if (e.key == "Enter") {
                submit()
              }
            }}
          />
        </NFormItem>
        <NButton class={"w-full"} type={"primary"} onClick={submit}>
          {window.$i18n("view.login.login")}
        </NButton>
      </NForm>
    </>
  )
}

export default Login
