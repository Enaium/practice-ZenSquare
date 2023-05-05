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

import { defineComponent, PropType, reactive, ref } from "vue"
import {
  FormInst,
  NAvatar,
  NButton,
  NDatePicker,
  NForm,
  NFormItem,
  NGrid,
  NGridItem,
  NInput,
  useMessage,
} from "naive-ui"
import { useQuery } from "@tanstack/vue-query"
import { api, BASE_URL } from "@/common/ApiInstance.ts"
import { useSessionStore } from "@/store"
import { RequestOf } from "@/__generated"
import { MemberProfileDto } from "@/__generated/model/dto"
import Avatar from "@/assets/avatar.jpg"

const ModifyProfile = defineComponent({
  props: {
    onSuccess: {
      type: Object as PropType<() => void>,
    },
  },
  setup() {
    const message = useMessage()
    const session = useSessionStore()
    const options = reactive<RequestOf<typeof api.memberController.getProfile>>({ id: session.id! })
    const { data } = useQuery({
      queryKey: ["ModifyProfile", options],
      queryFn: () => api.memberController.getProfile(options),
    })

    const form = reactive(data.value ?? ({ memberId: session.id } as MemberProfileDto["DEFAULT"]))
    const formRef = ref<FormInst | null>(null)

    const submit = () => {
      formRef.value?.validate((errors) => {
        if (!errors) {
          api.memberProfileController.put({ body: form }).then(() => {
            message.success(window.$i18n("common.success"))
          })
        }
      })
    }

    return () => (
      <>
        <NForm model={form} ref={formRef}>
          <NFormItem class={"flex justify-center"}>
            <NAvatar size={96} round bordered src={`${BASE_URL}/image/${form.avatar}`} fallbackSrc={Avatar} />
          </NFormItem>
          <NGrid xGap={12} yGap={8} cols={4}>
            <NGridItem>
              <NFormItem
                path={"nickname"}
                label={window.$i18n("view.modifyProfile.nickname.label")}
                rule={[{ required: true, message: window.$i18n("view.modifyProfile.nickname.message") }]}
              >
                <NInput v-model:value={form.nickname} />
              </NFormItem>
            </NGridItem>
            <NGridItem>
              <NFormItem path={"birthday"} label={window.$i18n("view.modifyProfile.birthday.label")}>
                <NDatePicker class={"w-full"} v-model:value={form.birthday} />
              </NFormItem>
            </NGridItem>
            <NGridItem>
              <NFormItem path={"location"} label={window.$i18n("view.modifyProfile.location.label")}>
                <NInput v-model:value={form.location} />
              </NFormItem>
            </NGridItem>
            <NGridItem>
              <NFormItem path={"website"} label={window.$i18n("view.modifyProfile.website.label")}>
                <NInput v-model:value={form.website} />
              </NFormItem>
            </NGridItem>
            <NGridItem>
              <NFormItem path={"description"} label={window.$i18n("view.modifyProfile.description.label")}>
                <NInput v-model:value={form.description} />
              </NFormItem>
            </NGridItem>
            <NGridItem>
              <NFormItem path={"github"} label={window.$i18n("view.modifyProfile.github.label")}>
                <NInput v-model:value={form.github} />
              </NFormItem>
            </NGridItem>
            <NGridItem>
              <NFormItem path={"bilibili"} label={window.$i18n("view.modifyProfile.bilibili.label")}>
                <NInput v-model:value={form.bilibili} />
              </NFormItem>
            </NGridItem>
            <NGridItem>
              <NFormItem path={"email"} label={window.$i18n("view.modifyProfile.email.label")}>
                <NInput v-model:value={form.email} />
              </NFormItem>
            </NGridItem>
          </NGrid>

          <NButton class={"w-full"} type={"primary"} onClick={submit}>
            {window.$i18n("common.submit")}
          </NButton>
        </NForm>
      </>
    )
  },
})

export default ModifyProfile
