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

import { defineComponent, reactive, toRef } from "vue"
import { useSessionStore } from "@/store"
import { api } from "@/common/ApiInstance"
import { useQuery } from "@tanstack/vue-query"
import type { RequestOf } from "@/__generated"
import { NButton, NSpin, useMessage } from "naive-ui"

const FollowButton = defineComponent(
  (props: { following: string }) => {
    const session = useSessionStore()

    const message = useMessage()

    const options = reactive<RequestOf<typeof api.memberFollowController.isFollowed>>({
      memberId: session.id!,
      followId: props.following
    })

    const { data, isLoading } = useQuery({
      queryKey: ["follow", options],
      queryFn: () => api.memberFollowController.isFollowed(options),
      enabled: session.id != null
    })

    const isFollow = toRef(data.value)

    const follow = () => {
      api.memberFollowController
        .follow({ memberId: session.id!, followId: props.following })
        .then(() => {
          isFollow.value = true
        })
        .catch((error) => {
          message.error(error)
        })
    }

    const unfollow = () => {
      api.memberFollowController
        .unfollow({ memberId: session.id!, followId: props.following })
        .then(() => {
          isFollow.value = false
        })
        .catch((error) => {
          message.error(error)
        })
    }

    return () =>
      isLoading.value ? (
        <NSpin />
      ) : (
        <>
          {isFollow.value == undefined ? (
            <NButton>{window.$i18n("component.followButton.follow")}</NButton>
          ) : isFollow.value ? (
            <NButton onClick={unfollow} type={"error"}>
              {window.$i18n("component.followButton.unfollow")}
            </NButton>
          ) : (
            <NButton onClick={follow} type={"primary"}>
              {window.$i18n("component.followButton.follow")}
            </NButton>
          )}
        </>
      )
  },
  { props: ["following"] }
)

export default FollowButton
