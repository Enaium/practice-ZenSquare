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
import { api } from "@/common/ApiInstance"
import { useSessionStore } from "@/store"
import { useQuery } from "@tanstack/vue-query"
import { NButton, NList, NListItem, NSpin } from "naive-ui"
import { defineComponent, reactive } from "vue"
import Item from "@/components/ConversationList/Item"
import { useRouter } from "vue-router"

const ConversationList = defineComponent(
  (props: { size?: number; onPush: () => void }) => {
    const router = useRouter()

    const session = useSessionStore()

    const options = reactive<RequestOf<typeof api.conversationController.findConversations>>({
      memberId: session.id!,
      size: props.size ?? 10
    })

    const { data, isLoading } = useQuery({
      queryKey: ["findConversations", options],
      queryFn: () => api.conversationController.findConversations(options)
    })

    return () =>
      isLoading.value || !data.value ? (
        <NSpin />
      ) : (
        <NList
          bordered
          v-slots={{
            header: () => <div>Conversations</div>,
            default: () =>
              data.value.content.map((thread) => (
                <NListItem key={thread.id}>
                  <Item thread={thread} />
                </NListItem>
              )),
            footer: () => (
              <div class={"flex gap-5"}>
                <NButton text onClick={() => props.onPush()}>
                  Show all
                </NButton>
                <NButton
                  text
                  onClick={() => {
                    router.push({ name: "new-conversation" })
                    props.onPush()
                  }}
                >
                  Start a conversation
                </NButton>
              </div>
            )
          }}
        />
      )
  },
  {
    props: ["size", "onPush"]
  }
)

export default ConversationList
