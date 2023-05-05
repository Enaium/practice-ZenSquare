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

import { NAlert, NButton, NModal, NPopover } from "naive-ui"
import { Clipboard16Regular, Key16Regular } from "@vicons/fluent"
import Login from "@/views/Login"
import { defineComponent, reactive, ref } from "vue"
import Register from "@/views/Register.tsx"
import { useSessionStore } from "@/store"
import { api } from "@/common/ApiInstance.ts"
import { useQuery } from "@tanstack/vue-query"
import { RequestOf } from "@/__generated"

let showLogin = ref(false)
let showRegister = ref(false)

const NoStatus = () => {
  return (
    <div class={"flex gap-2"}>
      <NPopover
        show={showLogin.value}
        onClickoutside={() => (showLogin.value = false)}
        trigger={"click"}
        v-slots={{
          trigger: () => (
            <NButton renderIcon={() => <Key16Regular />} text onClick={() => (showLogin.value = true)}>
              {window.$i18n("component.state.login")}
            </NButton>
          ),
          default: () => <Login onSuccess={() => (showLogin.value = false)} />,
        }}
      />
      <NButton renderIcon={() => <Clipboard16Regular />} text onClick={() => (showRegister.value = true)}>
        {window.$i18n("component.state.register")}
      </NButton>
    </div>
  )
}

const Stateful = defineComponent({
  setup() {
    const session = useSessionStore()

    const options = reactive<RequestOf<typeof api.memberProfileController.get>>({ id: session.id! })

    const { data } = useQuery({
      queryKey: ["memberProfile", options],
      queryFn: () => api.memberProfileController.get(options),
    })
    return () => (
      <>
        {data.value?.nickname ?? (
          <NAlert type={"warning"}>
            <NButton type={"warning"} text>
              {window.$i18n("component.state.createProfile")}
            </NButton>
          </NAlert>
        )}
      </>
    )
  },
})

const State = () => {
  const session = useSessionStore()
  return (
    <>
      {session.id ? <Stateful /> : <NoStatus />}
      <NModal
        v-model:show={showRegister.value}
        preset={"dialog"}
        onClose={() => (showRegister.value = false)}
        v-slots={{
          header: () => <div>{window.$i18n("view.register.register")}</div>,
          default: () => <Register onSuccess={() => (showRegister.value = false)} />,
        }}
      />
    </>
  )
}

export default State
