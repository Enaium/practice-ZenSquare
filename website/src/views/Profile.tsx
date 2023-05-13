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

import { defineComponent, reactive } from "vue"
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
  NTooltip,
} from "naive-ui"
import { useQuery } from "@tanstack/vue-query"
import type { RequestOf } from "@/__generated"
import { api } from "@/common/ApiInstance"
import Avatar from "@/components/Avatar"
import dayjs from "dayjs"
import BiliBili from "@/assets/bilibili.svg"
import GitHub from "@/assets/github.svg"

const Profile = defineComponent({
  setup() {
    const route = useRoute()
    const router = useRouter()

    const options = reactive<RequestOf<typeof api.memberProfileController.findFullProfile>>({
      memberId: route.params.id as string,
    })

    const { data, isLoading } = useQuery({
      queryKey: ["profile", options],
      queryFn: () => api.memberProfileController.findFullProfile(options),
    })

    return () => (
      <>
        <NBreadcrumb>
          <NBreadcrumbItem onClick={() => router.push({ name: "members" })}>Members</NBreadcrumbItem>
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
                              default: () => <div>{dayjs(data.value!.createdTime).format("YYYY-MM-DD hh:mm:ss")}</div>,
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
                    <div class={"bg-gray-200 w-full h-px my-2"} />
                    <div class={"flex gap-1"}>
                      <NButton>Follow</NButton>
                      <NButtonGroup>
                        <NButton>Start conversation</NButton>
                        <NButton>Find</NButton>
                      </NButtonGroup>
                    </div>
                  </>
                ),
              }}
              segmented={{ content: true }}
            />
          </>
        )}
      </>
    )
  },
})

export default Profile
