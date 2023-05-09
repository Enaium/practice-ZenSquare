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
import { Heart20Filled, HeartBroken20Filled } from "@vicons/fluent"
import { useSessionStore } from "@/store"
import { api } from "@/common/ApiInstance.ts"

const LikeState = defineComponent({
  props: {
    target: String,
    like: Number,
    dislike: Number,
  },
  setup(props) {
    const session = useSessionStore()
    const message = useMessage()

    const like = () => {
      // if (session.id) {
      //   api.memberLikeController
      //     .like({
      //       memberId: session.id,
      //       target: props.target!,
      //       dislike: false,
      //     })
      //     .then(() => {
      //       context.emit("update:like", props.like! + 1)
      //     })
      //     .catch((error) => {
      //       message.error(error)
      //     })
      // }
    }

    const dislike = () => {
      if (session.id) {
        // api.memberLikeController
        //   .like({
        //     memberId: session.id,
        //     target: props.target!,
        //     dislike: true,
        //   })
        //   .then(() => {
        //     context.emit("update:dislike", props.dislike! + 1)
        //   })
        //   .catch((error) => {
        //     message.error(error)
        //   })
      }
    }

    return () => (
      <>
        <div class={"flex gap-2"}>
          <div class={"flex items-center"}>
            <NButton text type={"primary"} onClick={like}>
              <NIcon size={32}>
                <Heart20Filled />
              </NIcon>
            </NButton>
            <div>{props.like}</div>
          </div>
          <div class={"flex items-center"}>
            <NButton text type={"primary"} onClick={dislike}>
              <NIcon size={32}>
                <HeartBroken20Filled />
              </NIcon>
            </NButton>
            <div>{props.dislike}</div>
          </div>
        </div>
      </>
    )
  },
})

export default LikeState
