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

import type { MemberProfileInput } from "@/__generated/model/static"
import { BASE_URL, api } from "@/common/ApiInstance"
import {
  useMessage,
  type FormInst,
  NButton,
  NDatePicker,
  NForm,
  NFormItem,
  NGrid,
  NGridItem,
  NInput,
  NUpload,
  type UploadCustomRequestOptions
} from "naive-ui"
import { defineComponent, ref } from "vue"
import Avatar from "@/components/Avatar"
import dayjs from "dayjs"
import { useSessionStore } from "@/store"

const ProfileForm = defineComponent(
  (props: { profile: MemberProfileInput; onSuccess?: () => void }) => {
    const session = useSessionStore()
    const message = useMessage()

    const formRef = ref<FormInst | null>(null)

    const submit = () => {
      formRef.value?.validate((errors) => {
        if (!errors) {
          api.memberProfileController
            .save({
              body: props.profile.birthday
                ? { ...props.profile, birthday: dayjs(props.profile.birthday).toISOString() }
                : props.profile
            })
            .then(() => {
              message.success(window.$i18n("common.success"))
              props.onSuccess?.()
            })
        }
      })
    }

    const uploadAvatar = (options: UploadCustomRequestOptions) => {
      const formData = new FormData()
      if (options.file.file) {
        formData.append("file", options.file.file)
      }

      fetch(`${BASE_URL}/members/${props.profile.memberId}/profiles/avatar/`, {
        method: "PUT",
        body: formData,
        headers: {
          token: session.token!
        }
      })
        .then(() => {
          message.success(window.$i18n("common.success"))
        })
        .catch((error) => {
          console.error(error)
        })
    }

    return () => (
      <>
        <NForm model={props.profile} ref={formRef}>
          {props.profile.memberId && (
            <NUpload class={"flex justify-center"} customRequest={uploadAvatar}>
              <Avatar id={props.profile.avatar} size={96} round bordered />
            </NUpload>
          )}
          <NGrid xGap={12} yGap={8} cols={4}>
            <NGridItem>
              <NFormItem
                path={"nickname"}
                label={window.$i18n("view.modifyProfile.nickname.label")}
                rule={[{ required: true, message: window.$i18n("view.modifyProfile.nickname.message") }]}
              >
                <NInput v-model:value={props.profile.nickname} />
              </NFormItem>
            </NGridItem>
            <NGridItem>
              <NFormItem path={"birthday"} label={window.$i18n("view.modifyProfile.birthday.label")}>
                <NDatePicker class={"w-full"} v-model:value={props.profile.birthday} clearable />
              </NFormItem>
            </NGridItem>
            <NGridItem>
              <NFormItem path={"location"} label={window.$i18n("view.modifyProfile.location.label")}>
                <NInput v-model:value={props.profile.location} />
              </NFormItem>
            </NGridItem>
            <NGridItem>
              <NFormItem path={"website"} label={window.$i18n("view.modifyProfile.website.label")}>
                <NInput v-model:value={props.profile.website} />
              </NFormItem>
            </NGridItem>
            <NGridItem>
              <NFormItem path={"description"} label={window.$i18n("view.modifyProfile.description.label")}>
                <NInput v-model:value={props.profile.description} />
              </NFormItem>
            </NGridItem>
            <NGridItem>
              <NFormItem path={"github"} label={window.$i18n("view.modifyProfile.github.label")}>
                <NInput v-model:value={props.profile.github} />
              </NFormItem>
            </NGridItem>
            <NGridItem>
              <NFormItem path={"bilibili"} label={window.$i18n("view.modifyProfile.bilibili.label")}>
                <NInput v-model:value={props.profile.bilibili} />
              </NFormItem>
            </NGridItem>
            <NGridItem>
              <NFormItem path={"email"} label={window.$i18n("view.modifyProfile.email.label")}>
                <NInput v-model:value={props.profile.email} />
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
  {
    props: ["profile", "onSuccess"]
  }
)

export default ProfileForm
