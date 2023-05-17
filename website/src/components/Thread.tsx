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

import type { ThreadDto } from "@/__generated/model/dto"
import { People16Regular, Clock16Regular } from "@vicons/fluent"
import dayjs from "dayjs"
import { MdPreview } from "md-editor-v3"
import { NIcon, NTooltip, NTime, NTag } from "naive-ui"
import { defineComponent } from "vue"
import { RouterLink } from "vue-router"
import Avatar from "./Avatar"
import ReplyList from "./ReplyList"
import ThreadBottom from "./ThreadBottom"

const Thread = defineComponent(
  (props: { thread: ThreadDto["ThreadFetcher/FULL_POST" | "ThreadFetcher/FULL_CONVERSATION"] }) => {
    return () => (
      <>
        <h3>{props.thread.title}</h3>
        <div class={"flex gap-2"}>
          <div class={"flex"}>
            <NIcon size={24}>
              <People16Regular />
            </NIcon>
            <div>{props.thread.member.profile?.nickname}</div>
          </div>
          <div class={"flex"}>
            <NIcon size={24}>
              <Clock16Regular />
            </NIcon>
            <NTooltip
              v-slots={{
                trigger: () => (
                  <NTime time={new Date()} to={dayjs(props.thread?.modifiedTime).toDate()} type={"relative"} />
                ),
                default: () => <div>{dayjs(props.thread?.modifiedTime).format("YYYY-MM-DD hh:mm:ss")}</div>
              }}
            />
          </div>
        </div>
        {/*content*/}
        <div class={"flex border-solid border border-gray-100"}>
          {/*member*/}
          <div class={"flex flex-col items-center m-5"}>
            <Avatar id={props.thread.member.profile?.avatar} size={128} bordered round />
            <RouterLink
              to={{
                name: "profile",
                params: { id: props.thread!.member.id }
              }}
            >
              {props.thread.member.profile!.nickname}
            </RouterLink>
            <NTag type={"primary"}>{props.thread.member.profile!.role.name}</NTag>
          </div>
          <div class={"border-solid border-l border-gray-100"} />
          {/*content*/}
          <div class={"flex flex-col w-full justify-between p-2"}>
            <MdPreview modelValue={props.thread.content} />
            <ThreadBottom thread={props.thread} />
          </div>
        </div>
        <div class={"mt-5"} />
        {/*reply list*/}
        <ReplyList thread={props.thread.id} />
      </>
    )
  },
  {
    props: ["thread"]
  }
)

export default Thread
