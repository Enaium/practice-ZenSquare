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

import { MenuOption, NMenu } from "naive-ui"
import { RouterLink, useRoute } from "vue-router"

const menuOptions: MenuOption[] = [
  {
    label: () => {
      return <RouterLink to={{ name: "home" }}>{window.$i18n("component.menu.forums")}</RouterLink>
    },
    key: "home",
  },
  {
    label: () => {
      return <RouterLink to={{ name: "whats-new" }}>{window.$i18n("component.menu.whatsNew")}</RouterLink>
    },
    key: "whats-new",
  },
  {
    label: () => {
      return <RouterLink to={{ name: "members" }}>{window.$i18n("component.menu.members")}</RouterLink>
    },
    key: "members",
  },
]

const Menu = () => {
  const route = useRoute()
  return <NMenu options={menuOptions} mode={"horizontal"} value={route.name!.toString()} />
}

export default Menu
