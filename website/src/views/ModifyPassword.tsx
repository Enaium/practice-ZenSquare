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

import type { MemberPasswordInput } from "@/__generated/model/static"
import { api } from "@/common/ApiInstance"
import { useSessionStore } from "@/store"
import {
  NBreadcrumb,
  NBreadcrumbItem,
  NForm,
  NFormItem,
  type FormInst,
  NInput,
  NButton,
  type FormItemRule,
  useMessage
} from "naive-ui"
import { defineComponent, reactive, ref } from "vue"
import { useRoute, useRouter } from "vue-router"

const ModifyPassword = defineComponent(() => {
  const message = useMessage()

  const route = useRoute()
  const router = useRouter()

  const form = reactive<MemberPasswordInput>({ id: route.params.id as string })
  const formRef = ref<FormInst | null>(null)

  const validatePasswordSame = (_: FormItemRule, value: string): boolean => value === form.newPassword

  const submit = () => {
    formRef.value?.validate((errors) => {
      if (!errors) {
        api.memberController
          .savePassword({ body: form })
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
    <>
      <NBreadcrumb>
        <NBreadcrumbItem onClick={() => router.push({ name: "members" })}>
          {window.$i18n("component.menu.members")}
        </NBreadcrumbItem>
        <NBreadcrumbItem onClick={() => router.push({ name: "profile", params: { id: route.params.id } })}>
          {window.$i18n("view.profile.profile")}
        </NBreadcrumbItem>
        <NBreadcrumbItem>{window.$i18n("view.visitorMenu.security")}</NBreadcrumbItem>
      </NBreadcrumb>
      <NForm model={form} ref={formRef}>
        <NFormItem
          path={"oldPassword"}
          label={window.$i18n("view.modifyPassowrd.oldPassword")}
          rule={[{ required: true, message: window.$i18n("view.login.password.message") }]}
        >
          <NInput v-model:value={form.oldPassword} type={"password"} />
        </NFormItem>

        <NFormItem
          path={"newPassword"}
          label={window.$i18n("view.modifyPassowrd.newPassword")}
          rule={[{ required: true, message: window.$i18n("view.login.password.message") }]}
        >
          <NInput v-model:value={form.newPassword} type={"password"} />
        </NFormItem>

        <NFormItem
          path={"confirmPassword"}
          label={window.$i18n("view.modifyPassowrd.confirmPassword")}
          rule={[
            { required: true, message: window.$i18n("view.login.password.message") },
            {
              validator: validatePasswordSame,
              message: window.$i18n("view.register.passwordDifferent"),
              trigger: ["blur", "input"]
            }
          ]}
        >
          <NInput v-model:value={form.confirmPassword} type={"password"} />
        </NFormItem>
        <NButton type={"primary"} onClick={submit}>
          {window.$i18n("view.register.register")}
        </NButton>
      </NForm>
    </>
  )
})

export default ModifyPassword
