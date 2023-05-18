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
import HomeLayout from "@/layouts/HomeLayout"
import Forums from "@/views/Forums"
import WhatsNew from "@/views/WhatsNew"
import Members from "@/views/Members"
import Forum from "@/views/Forum"
import NewPost from "@/views/NewPost"
import Post from "@/views/Post"
import Profile from "@/views/Profile"
import Followings from "@/views/follow/Followings"
import Followers from "@/views/follow/Followers"
import ModifyProfile from "@/views/ModifyProfile"
import ModifyPassword from "@/views/ModifyPassword"
import NewConversation from "@/views/NewConversation"
import Conversation from "@/views/Conversation"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: <HomeLayout />,
      redirect: {
        name: "forums"
      },
      children: [
        {
          path: "forums",
          name: "forums",
          component: <Forums />
        },
        {
          path: "forums/:forum",
          name: "forum",
          component: <Forum />
        },
        {
          path: "forums/:forum/threads",
          name: "new-post",
          component: <NewPost />
        },
        {
          path: "forums/threads/:thread/modify",
          name: "modify-post",
          component: <NewPost />
        },
        {
          path: "forums/threads/:thread",
          name: "threads",
          component: <Post />
        },
        {
          path: "whats-new",
          name: "whats-new",
          component: <WhatsNew />
        },
        {
          path: "members",
          name: "members",
          component: <Members />
        },
        {
          path: "members/:id",
          name: "profile",
          component: <Profile />
        },
        {
          path: "members/:id/modify",
          name: "modify-profile",
          component: <ModifyProfile />
        },
        {
          path: "members/:id/security",
          name: "security",
          component: <ModifyPassword />
        },
        {
          path: "members/:id/followings",
          name: "followings",
          component: <Followings />
        },
        {
          path: "members/:id/followers",
          name: "followers",
          component: <Followers />
        },
        {
          path: "conversations",
          name: "new-conversation",
          component: <NewConversation />
        },
        {
          path: "conversations/:thread/modify",
          name: "modify-conversation",
          component: <NewConversation />
        },
        {
          path: "conversations/:thread",
          name: "conversations",
          component: <Conversation />
        }
      ]
    }
  ]
})

export default router
