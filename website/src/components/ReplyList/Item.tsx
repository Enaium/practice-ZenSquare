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

import { FunctionalComponent, ref } from "vue"
import { ReplyDto } from "@/__generated/model/dto"
import Avatar from "@/components/Avatar.tsx"
import { NButton, NModal, NTag, NTime, NTooltip } from "naive-ui"
import dayjs from "dayjs"
import Content from "@/components/Content.tsx"
import LikeState from "@/components/LikeState.tsx"
import ReplyForm from "@/components/ReplyForm.tsx"

const showForm = ref<string | null>(null)
const showChild = ref<string | null>(null)

const Item: FunctionalComponent<{ reply: ReplyDto["ReplyController/FULL_REPLY"] }> = ({ reply }) => {
  return (
    <>
      <div class={"flex"}>
        {/*member*/}
        <div class={"flex flex-col items-center gap-1 m-5"}>
          <Avatar id={reply.member.profile?.avatar} size={128} bordered round />
          <div>{reply.member.profile?.nickname}</div>
          <NTag type={"primary"}>{reply.member.profile?.role.name}</NTag>
          <NTooltip
            v-slots={{
              trigger: () => <NTime time={new Date()} to={dayjs(reply.modifiedTime).toDate()} type={"relative"} />,
              default: () => <div>{dayjs(reply.modifiedTime).format("YYYY-MM-DD hh:mm:ss")}</div>,
            }}
          />
        </div>
        <div class={"border-solid border-l border-gray-100"} />
        {/*content*/}
        <div class={"flex flex-col justify-between p-2 w-full"}>
          <Content v-model={reply.content} previewOnly />
          <div class={"flex justify-between"}>
            <LikeState target={reply.id} like={reply.like} />
            {reply.child > 0 && (
              <NButton type={"primary"} text onClick={() => (showChild.value = reply.id)}>
                {window.$i18n("component.replyList.viewChild", { child: reply.child })}
              </NButton>
            )}
            <NButton type={"primary"} text onClick={() => (showForm.value = reply.id)}>
              {window.$i18n("component.replyForm.reply.label")}
            </NButton>
          </div>
        </div>
      </div>
      <NModal show={showForm.value != null} onClose={() => (showForm.value = null)} preset={"card"}>
        <ReplyForm thread={reply.threadId} parent={showForm.value!} />
      </NModal>
      <NModal show={showChild.value != null} onClose={() => (showChild.value = null)} preset={"card"}>
        {showChild.value}
      </NModal>
    </>
  )
}

export default Item
