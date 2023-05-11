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

import { defineComponent, PropType, ref } from "vue"
import { ReplyDto } from "@/__generated/model/dto"
import Content from "@/components/Content"
import { NModal, NTime, NTooltip } from "naive-ui"
import ReplyForm from "@/components/ReplyForm"
import ChildReplyList from "@/components/ChildReplyList/index"
import dayjs from "dayjs"
import ReplyBottom from "@/components/ReplyBottom.tsx"

const Item = defineComponent({
  props: {
    reply: {
      type: Object as PropType<ReplyDto["ReplyController/FULL_REPLY"]>,
      required: true,
    },
  },
  setup(props) {
    const showForm = ref<string | null>(null)
    const showChild = ref<string | null>(null)

    return () => (
      <>
        <div class={"flex flex-col justify-between p-2 w-full"}>
          <div>
            <NTooltip
              v-slots={{
                trigger: () => (
                  <NTime time={new Date()} to={dayjs(props.reply.modifiedTime).toDate()} type={"relative"} />
                ),
                default: () => <div>{dayjs(props.reply.modifiedTime).format("YYYY-MM-DD hh:mm:ss")}</div>,
              }}
            />
          </div>
          <Content v-model={props.reply.content} previewOnly />
          {/*bottom*/}
          <ReplyBottom
            reply={props.reply}
            onClickShowChild={() => (showChild.value = props.reply.id)}
            onClickReply={() => (showForm.value = props.reply.id)}
          />
        </div>
        <NModal show={showForm.value != null} onClose={() => (showForm.value = null)} preset={"card"}>
          <ReplyForm thread={props.reply.threadId} parent={showForm.value!} />
        </NModal>
        <NModal show={showChild.value != null} onClose={() => (showChild.value = null)} preset={"card"}>
          <ChildReplyList parent={props.reply.id} />
        </NModal>
      </>
    )
  },
})

export default Item
