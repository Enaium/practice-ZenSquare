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

import Menu from "@/components/Menu"
import { NButton, NDivider, NLayout, NLayoutHeader, NPopover } from "naive-ui"
import { RouterView } from "vue-router"
import { Clipboard16Regular, Key16Regular } from "@vicons/fluent"

const Home = () => {
  return (
    <>
      <NLayout class={"h-screen"}>
        <NLayoutHeader class={"h-16"} bordered>
          <div class={"mx-48 flex justify-between items-center h-full"}>
            <Menu />
            <div class={"flex gap-2"}>
              <NPopover
                trigger={"click"}
                v-slots={{
                  trigger: () => (
                    <NButton renderIcon={() => <Key16Regular />} text>
                      Login
                    </NButton>
                  ),
                  default: () => <div>123</div>,
                }}
              />
              <NButton renderIcon={() => <Clipboard16Regular />} text>
                Register
              </NButton>
            </div>
          </div>
        </NLayoutHeader>
        <NLayout style={{ top: "64px" }} position={"absolute"} hasSider>
          <NLayout nativeScrollbar={false}>
            <div class={"mx-48"} style={{ minHeight: "85vh" }}>
              <RouterView />
            </div>
            <NDivider />
            <div class={"mx-48"}>
              <div class={"flex flex-col items-center m-5"}>
                <p>Copyright &copy; 2023 Enaium</p>
              </div>
            </div>
          </NLayout>
        </NLayout>
      </NLayout>
    </>
  )
}

export default Home
