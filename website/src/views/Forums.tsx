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

import { NButton, NButtonGroup } from "naive-ui"
import CategoryList from "@/components/CategoryList.tsx"

const Forums = () => (
  <>
    <div class={"flex justify-between mt-5"}>
      <div>Forums</div>
      <div>
        <NButtonGroup>
          <NButton type={"primary"}>New posts</NButton>
          <NButton type={"warning"}>Post thread...</NButton>
        </NButtonGroup>
      </div>
    </div>
    <div class={"mt-5"} />
    <CategoryList />
  </>
)

export default Forums
