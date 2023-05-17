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
import type { ThreadDto } from "@/__generated/model/dto"
import Avatar from "@/components/Avatar"
import { RouterLink } from "vue-router"
import { NIcon, NTime, NTooltip } from "naive-ui"
import { Clock16Regular } from "@vicons/fluent"
import dayjs from "dayjs"

const Item = defineComponent(
  (props: { thread: ThreadDto["ThreadFetcher/DEFAULT_THREAD"] }) => () =>
    (
      <div class={"flex justify-between"}>
        {/*left*/}
        <div class={"flex"}>
          <Avatar id={props.thread.member.profile?.avatar} size={48} bordered round />
          <div class={"flex flex-col justify-between"}>
            <RouterLink
              to={{
                name: "threads",
                params: { thread: props.thread.id }
              }}
            >
              {props.thread.title}
            </RouterLink>
            <div class={"flex"}>
              <span>{props.thread.member.profile?.nickname}</span>
              <NIcon size={24}>
                <Clock16Regular />
              </NIcon>
              <NTooltip
                v-slots={{
                  trigger: () => (
                    <NTime time={new Date()} to={dayjs(props.thread.modifiedTime).toDate()} type={"relative"} />
                  ),
                  default: () => <div>{dayjs(props.thread.modifiedTime).format("YYYY-MM-DD hh:mm:ss")}</div>
                }}
              />
            </div>
          </div>
        </div>
        {/*right*/}
        <div class={"flex justify-between w-72 gap-10"}>
          {/*thread info*/}
          <div class={"h-full w-24 flex flex-col justify-between"}>
            <div class={"flex justify-between"}>
              <span>Replies:</span>
              <span>{props.thread.reply}</span>
            </div>
            <div class={"flex justify-between"}>
              <span>Views:</span>
              <span>0</span>
            </div>
          </div>
          {/*last reply*/}
          <div class={"flex"}>
            <div class={"h-full flex flex-col justify-between items-end"}>
              <NTooltip
                v-slots={{
                  trigger: () => (
                    <NTime
                      time={new Date()}
                      to={dayjs(props.thread.lastReplyTime ?? props.thread.modifiedTime).toDate()}
                      type={"relative"}
                    />
                  ),
                  default: () => (
                    <div>
                      {dayjs(props.thread.lastReplyTime ?? props.thread.modifiedTime).format("YYYY-MM-DD hh:mm:ss")}
                    </div>
                  )
                }}
              />
              <div>{props.thread.lastReplyMember?.profile?.nickname ?? props.thread.member.profile?.nickname}</div>
            </div>
            <Avatar
              id={props.thread.lastReplyMember?.profile?.avatar ?? props.thread.member.profile?.avatar}
              size={48}
              bordered
              round
            />
          </div>
        </div>
      </div>
    ),
  {
    props: ["thread"]
  }
)

export default Item
