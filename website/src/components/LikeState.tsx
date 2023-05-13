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

import { defineComponent, ref } from "vue"
import { NButton, NIcon, useMessage } from "naive-ui"
import { Heart20Regular, HeartBroken20Regular, Vote24Filled } from "@vicons/fluent"
import { useSessionStore } from "@/store"
import { api } from "@/common/ApiInstance"

const LikeState = defineComponent(
  (props: { target: string; like: number }) => {
    const likeCount = ref(props.like)
    const session = useSessionStore()
    const message = useMessage()

    const like = (dislike: boolean) => {
      if (session.id) {
        api.memberLikeController
          .like({
            memberId: session.id,
            target: props.target!,
            dislike: dislike
          })
          .then((data) => {
            likeCount.value = data
          })
          .catch((error) => {
            message.error(error)
          })
      } else {
        message.error(window.$i18n("component.likeState.notLogin"))
      }
    }

    return () => (
      <>
        <div class={"flex items-center gap-2"}>
          <NIcon size={24} color={"green"}>
            <Vote24Filled />
          </NIcon>
          <div class={"text-2xl"}>{likeCount.value}</div>
          <NButton text onClick={() => like(false)}>
            <NIcon size={24}>
              <Heart20Regular />
            </NIcon>
          </NButton>
          <NButton text onClick={() => like(true)}>
            <NIcon size={24}>
              <HeartBroken20Regular />
            </NIcon>
          </NButton>
        </div>
      </>
    )
  },
  {
    props: ["target", "like"]
  }
)

export default LikeState
