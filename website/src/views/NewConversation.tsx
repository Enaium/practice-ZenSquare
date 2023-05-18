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

import type { RequestOf } from "@/__generated"
import type { MemberProfileDto } from "@/__generated/model/dto"
import type { Page } from "@/__generated/model/static"
import { api } from "@/common/ApiInstance"
import Editor from "@/components/Editor"
import { NButton, NCard, NForm, NFormItem, NInput, NSelect, c, type SelectOption, useMessage, NSpin } from "naive-ui"
import type { FormInst } from "naive-ui/lib"
import { defineComponent, reactive, ref } from "vue"
import { useRoute } from "vue-router"
import { useQuery } from "@tanstack/vue-query"
import ThreadForm from "@/components/ThreadForm"

const NewConversation = defineComponent(() => {
  const route = useRoute()

  const message = useMessage()

  const form = reactive<{
    members?: string[]
    title?: string
    content?: string
  }>({})

  const loading = ref(false)
  const optionMembers = ref<SelectOption[]>([])

  const formRef = ref<FormInst | null>(null)

  const submit = () => {
    formRef.value?.validate((errors) => {
      if (!errors) {
        api.conversationController.saveConversations({ body: form, members: form.members! }).then(() => {
          message.success(window.$i18n("common.success"))
        })
      }
    })
  }

  const searchMember = (query: string) => {
    if (!query.trim().length) {
      optionMembers.value = []
      return
    }

    loading.value = true

    window.setTimeout(() => {
      api.memberProfileController
        .findComplexProfiles({ memberProfileInput: { nickname: query } })
        .then((value: Page<MemberProfileDto["MemberProfileController/DEFAULT_MEMBER_PROFILE"]>) => {
          optionMembers.value = value.content.map((profile) => {
            return {
              label: profile.nickname,
              value: profile.member.id
            }
          })
          loading.value = false
        })
    }, 1000)
  }

  const options = reactive<RequestOf<typeof api.conversationController.findConversation>>({
    threadId: route.params.thread as string
  })

  const { data, isLoading } = useQuery({
    queryKey: ["findConversation", options],
    queryFn: () => api.conversationController.findConversation(options),
    enabled: route.params.thread !== undefined
  })

  return () =>
    route.params.thread !== undefined ? (
      isLoading.value && !data.value ? (
        <NSpin />
      ) : (
        <ThreadForm thread={{ ...data.value }} />
      )
    ) : (
      <NForm labelPlacement={"left"} model={form} ref={formRef}>
        <NFormItem
          path={"members"}
          label={window.$i18n("view.conversations.member.label")}
          rule={[{ required: true, message: window.$i18n("view.conversations.member.message") }]}
        >
          <NSelect
            v-model:value={form.members}
            multiple
            filterable
            placeholder={window.$i18n("view.conversations.member.message")}
            loading={loading.value}
            options={optionMembers.value}
            clearable
            remote
            clearFilterAfterSelect={false}
            onSearch={searchMember}
          />
        </NFormItem>
        <NFormItem
          path={"title"}
          label={window.$i18n("view.conversations.title.label")}
          rule={[{ required: true, message: window.$i18n("view.conversations.title.message") }]}
        >
          <NInput v-model:value={form.title} />
        </NFormItem>
        <NFormItem
          path={"content"}
          label={window.$i18n("view.conversations.content.label")}
          rule={[{ required: true, message: window.$i18n("view.conversations.content.message") }]}
        >
          <Editor v-model={form.content} />
        </NFormItem>
        <div class={"flex flex-row-reverse"}>
          <NButton type={"primary"} onClick={submit}>
            {window.$i18n("common.submit")}
          </NButton>
        </div>
      </NForm>
    )
})

export default NewConversation
