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
import { NDivider, NLayout, NLayoutHeader } from "naive-ui"
import { RouterView } from "vue-router"
import State from "@/components/State"

const Home = () => {
  return (
    <>
      <NLayout class={"vh-100"}>
        <NLayoutHeader style={{ height: "4rem" }} bordered>
          <div class={"container d-flex justify-content-between align-items-center h-100"}>
            <Menu />
            <State />
          </div>
        </NLayoutHeader>
        <NLayout style={{ top: "64px" }} position={"absolute"} hasSider>
          <NLayout nativeScrollbar={false}>
            <div class={"container"} style={{ minHeight: "85vh" }}>
              <RouterView />
            </div>
            <NDivider />
            <div class={"container"}>
              <div class={"d-flex justify-content-center m-5"}>
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
