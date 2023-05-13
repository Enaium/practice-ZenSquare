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
import { NCard } from "naive-ui"
import MostThread from "@/views/MostThread"
import MostReply from "@/views/MostReply"
import MostMessage from "@/views/MostMessage"

const Members = defineComponent({
  setup() {
    return () => (
      <>
        <div class={"mt-5"}>
          <div>{window.$i18n("component.menu.members")}</div>
        </div>
        <div class={"flex justify-between mt-5"}>
          <NCard
            segmented={{ content: true }}
            v-slots={{ header: () => <div>Most thread</div>, default: () => <MostThread /> }}
          />
          <NCard
            segmented={{ content: true }}
            v-slots={{ header: () => <div>Most reply</div>, default: () => <MostReply /> }}
          />
          <NCard
            segmented={{ content: true }}
            v-slots={{ header: () => <div>Most message</div>, default: () => <MostMessage /> }}
          />
        </div>
      </>
    )
  },
})

export default Members
