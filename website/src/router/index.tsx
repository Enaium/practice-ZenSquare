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

import { createRouter, createWebHistory } from "vue-router"
import Home from "@/layouts/Home.tsx"
import Forums from "@/pages/Forums.tsx"
import WhatsNew from "@/pages/WhatsNew.tsx"
import Members from "@/pages/Members.tsx"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: <Home />,
      redirect: { name: "forums" },
      children: [
        {
          path: "forums",
          name: "forums",
          component: <Forums />,
        },
        {
          path: "whats-new",
          name: "whats-new",
          component: <WhatsNew />,
        },
        {
          path: "members",
          name: "members",
          component: <Members />,
        },
      ],
    },
  ],
})

export default router
