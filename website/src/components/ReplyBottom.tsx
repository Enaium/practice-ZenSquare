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
import type { ReplyDto } from "@/__generated/model/dto"
import { NButton, NIcon, NModal, NPopconfirm, NPopover } from "naive-ui"
import { useSessionStore } from "@/store"
import LikeState from "@/components/LikeState"
import { MoreHorizontal32Filled } from "@vicons/fluent"
import ReplyForm from "@/components/ReplyForm"
import ReportForm from "./ReportForm"
import ChildReplyList from "./ChildReplyList"

const ReplyBottom = defineComponent(
  (props: { reply: ReplyDto["ReplyController/FULL_REPLY"] }) => {
    const session = useSessionStore()
    const showPop = ref(false)
    const showEdit = ref(false)
    const showReport = ref(false)
    const showReply = ref(false)
    const showChild = ref(false)

    return () => (
      <>
        <div class={"flex justify-between"}>
          {/*left*/}
          <LikeState target={props.reply.id} like={props.reply.like} />
          {/*middle*/}
          {props.reply.child > 0 && (
            <NButton type={"primary"} text onClick={() => (showChild.value = true)}>
              {window.$i18n("component.replyList.viewChild", { child: props.reply.child })}
            </NButton>
          )}
          {/*right*/}
          <NPopover
            trigger={"click"}
            onClickoutside={() => (showPop.value = false)}
            v-slots={{
              trigger: () => (
                <NButton text type={"primary"}>
                  <NIcon size={32}>
                    <MoreHorizontal32Filled />
                  </NIcon>
                </NButton>
              ),
              default: () => (
                <div class={"flex gap-5 items-center"}>
                  {/*If the session id is not equal to the reply member id, then show the report button.*/}
                  {session.id != props.reply.memberId && (
                    <NButton text type={"primary"} onClick={() => (showReport.value = true)}>
                      {window.$i18n("component.button.report")}
                    </NButton>
                  )}
                  {/*If the session id is equal to the reply member id, then show the edit button.*/}
                  {session.id == props.reply.memberId && (
                    <NButton text type={"primary"} onClick={() => (showEdit.value = true)}>
                      {window.$i18n("component.button.edit")}
                    </NButton>
                  )}
                  {/*If the session id is equal to the reply member id, then show the delete button.*/}
                  {session.id == props.reply.memberId && (
                    <NPopconfirm
                      v-slots={{
                        trigger: () => (
                          <NButton text type={"primary"}>
                            {window.$i18n("component.button.delete")}
                          </NButton>
                        )
                      }}
                      onPositiveClick={() => {}}
                    />
                  )}
                  <NButton type={"primary"} text onClick={() => (showReply.value = true)}>
                    {window.$i18n("component.button.reply")}
                  </NButton>
                </div>
              )
            }}
          />
        </div>
        {/* edit reply */}
        <NModal show={showEdit.value} preset={"card"} onClose={() => (showEdit.value = false)}>
          <ReplyForm reply={{ ...props.reply }} />
        </NModal>
        {/* report reply */}
        <NModal show={showReport.value} onClose={() => (showReport.value = false)} preset={"card"}>
          <ReportForm report={{ targetId: props.reply.id!, type: "REPLY" }} />
        </NModal>
        {/* reply reply */}
        <NModal show={showReply.value} onClose={() => (showReply.value = false)} preset={"card"}>
          <ReplyForm reply={{ threadId: props.reply.threadId!, parentId: props.reply.id! }} />
        </NModal>
        {/* child reply */}
        <NModal show={showChild.value} onClose={() => (showChild.value = false)} preset={"card"}>
          <ChildReplyList parent={props.reply.id!} />
        </NModal>
      </>
    )
  },
  {
    props: ["reply"]
  }
)

export default ReplyBottom
