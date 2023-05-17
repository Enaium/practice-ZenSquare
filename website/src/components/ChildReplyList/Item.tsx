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
import type { ReplyDto } from "@/__generated/model/dto"
import { NTime, NTooltip } from "naive-ui"
import dayjs from "dayjs"
import ReplyBottom from "@/components/ReplyBottom"
import { MdPreview } from "md-editor-v3"

const Item = defineComponent(
  (props: { reply: ReplyDto["ReplyFetcher/FULL_REPLY"] }) => {
    return () => (
      <>
        <div class={"flex flex-col justify-between p-2 w-full"}>
          <div>
            <NTooltip
              v-slots={{
                trigger: () => (
                  <NTime time={new Date()} to={dayjs(props.reply.modifiedTime).toDate()} type={"relative"} />
                ),
                default: () => <div>{dayjs(props.reply.modifiedTime).format("YYYY-MM-DD hh:mm:ss")}</div>
              }}
            />
          </div>
          <MdPreview modelValue={props.reply.content} />
          {/*bottom*/}
          <ReplyBottom reply={props.reply} />
        </div>
      </>
    )
  },
  {
    props: ["reply"]
  }
)

export default Item
