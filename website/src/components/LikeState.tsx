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

import { defineComponent } from "vue"
import { NButton, NIcon, useMessage } from "naive-ui"
import { Heart20Regular, HeartBroken20Regular } from "@vicons/fluent"
import { useSessionStore } from "@/store"
import { api } from "@/common/ApiInstance.ts"
import { Vote24Filled } from "@vicons/fluent"

const LikeState = defineComponent({
  props: {
    target: String,
    like: Number,
  },
  setup(props) {
    const session = useSessionStore()
    const message = useMessage()

    const like = () => {
      if (session.id) {
        api.memberLikeController
          .like({
            memberId: session.id,
            target: props.target!,
            dislike: false,
          })
          .catch((error) => {
            message.error(error)
          })
      }
    }

    const dislike = () => {
      if (session.id) {
        api.memberLikeController
          .like({
            memberId: session.id,
            target: props.target!,
            dislike: true,
          })
          .catch((error) => {
            message.error(error)
          })
      }
    }

    return () => (
      <>
        <div class={"flex items-center gap-2"}>
          <NIcon size={24} color={"green"}>
            <Vote24Filled />
          </NIcon>
          <div class={"text-2xl"}>{props.like}</div>
          <NButton text onClick={like}>
            <NIcon size={24}>
              <Heart20Regular />
            </NIcon>
          </NButton>
          <NButton text onClick={dislike}>
            <NIcon size={24}>
              <HeartBroken20Regular />
            </NIcon>
          </NButton>
        </div>
      </>
    )
  },
})

export default LikeState
