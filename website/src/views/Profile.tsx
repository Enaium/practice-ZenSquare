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

import { defineComponent, reactive, ref, watch } from "vue"
import { useRoute, useRouter } from "vue-router"
import {
  NBreadcrumb,
  NBreadcrumbItem,
  NButton,
  NButtonGroup,
  NCard,
  NIcon,
  NSpin,
  NTag,
  NTime,
  NTooltip
} from "naive-ui"
import { useQuery } from "@tanstack/vue-query"
import type { RequestOf } from "@/__generated"
import { api } from "@/common/ApiInstance"
import Avatar from "@/components/Avatar"
import dayjs from "dayjs"
import BiliBili from "@/assets/bilibili.svg"
import GitHub from "@/assets/github.svg"
import { useSessionStore } from "@/store"
import FollowButton from "@/components/FollowButton"

const Profile = defineComponent({
  setup() {
    const route = useRoute()
    const router = useRouter()

    const session = useSessionStore()

    const options = ref<RequestOf<typeof api.memberProfileController.findFullProfile>>({
      memberId: route.params.id as string
    })

    const { data, isLoading } = useQuery({
      queryKey: ["profile", options],
      queryFn: () => api.memberProfileController.findFullProfile(options.value)
    })

    watch(
      () => route.params.id,
      () => (options.value = { memberId: route.params.id as string })
    )

    return () => (
      <>
        <NBreadcrumb>
          <NBreadcrumbItem onClick={() => router.push({ name: "members" })}>{window.$i18n("component.menu.members")}</NBreadcrumbItem>
          <NBreadcrumbItem>Profile</NBreadcrumbItem>
        </NBreadcrumb>
        {isLoading.value || !data.value ? (
          <NSpin />
        ) : (
          <>
            <NCard
              v-slots={{
                header: () => (
                  <>
                    <div class={"flex"}>
                      <Avatar id={data.value!.avatar} bordered round size={128} />
                      <div class={"flex flex-col justify-between"}>
                        <div>{data.value!.nickname}</div>
                        <NTag type={"primary"}>{data.value!.nickname}</NTag>
                        <div>
                          Joined:
                          <NTooltip
                            v-slots={{
                              trigger: () => (
                                <NTime
                                  time={new Date()}
                                  to={dayjs(data.value!.createdTime).toDate()}
                                  type={"relative"}
                                />
                              ),
                              default: () => <div>{dayjs(data.value!.createdTime).format("YYYY-MM-DD hh:mm:ss")}</div>
                            }}
                          />
                        </div>
                        {data.value!.birthday && <div>Birthday:{dayjs(data.value!.birthday).format("YYY-MM-DD")}</div>}
                      </div>
                    </div>
                    <div class={"flex gap-5"}>
                      {data.value!.github && (
                        <div onClick={() => window.open(data.value!.github)}>
                          <NIcon size={32}>
                            <img src={GitHub} alt={"github"} />
                          </NIcon>
                        </div>
                      )}
                      {data.value!.bilibili && (
                        <div onClick={() => window.open(data.value!.bilibili)}>
                          <NIcon size={32}>
                            <img src={BiliBili} alt={"bili-bili"} />
                          </NIcon>
                        </div>
                      )}
                    </div>
                  </>
                ),
                default: () => (
                  <>
                    <div class={"flex justify-between"}>
                      <div class={"flex flex-col items-center"}>
                        <div>Thread</div>
                        <div>{data.value!.member.thread}</div>
                      </div>
                      <div class={"flex flex-col items-center"}>
                        <div>Reply</div>
                        <div>{data.value!.member.reply}</div>
                      </div>
                      <div class={"flex flex-col items-center"}>
                        <div>Message</div>
                        <div>{data.value!.member.message}</div>
                      </div>
                    </div>
                    {data.value!.member.id != session.id && (
                      <>
                        <div class={"bg-gray-200 w-full h-px my-2"} />
                        <div class={"flex gap-1"}>
                          <FollowButton following={data.value!.member.id} />
                          <NButtonGroup>
                            <NButton>{window.$i18n("view.profile.startConversation")}</NButton>
                            <NButton>{window.$i18n("view.profile.find")}</NButton>
                          </NButtonGroup>
                        </div>
                      </>
                    )}
                  </>
                )
              }}
              segmented={{ content: true }}
            />
          </>
        )}
      </>
    )
  }
})

export default Profile
