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

import { defineComponent, PropType } from "vue"
import { NPagination } from "naive-ui"
import { Page } from "@/__generated/model/static"

const Pagination = defineComponent({
  props: {
    page: {
      type: Object as PropType<Page<any>>,
      required: true,
    },
    changePage: Number
  },
  emits: ["update:change"],
  setup(props, context) {
    const onUpdatePage = (page: number) => {
      context.emit("update:change", page - 1)
    }
    return () => (
      <NPagination
        onUpdate:page={onUpdatePage}
        page={props.page!.number + 1}
        pageCount={props.page!.totalPages}
        pageSize={props.page!.size}
      />
    )
  },
})

export default Pagination
