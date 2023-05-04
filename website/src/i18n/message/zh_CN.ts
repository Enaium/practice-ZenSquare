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

export default {
  view: {
    login: {
      username: {
        label: "用户名",
        message: "请输入你的用户名",
      },
      password: {
        label: "密码",
        message: "请输入你的密码",
      },
      login: "登录",
      success: "登录成功",
    },
  },
  component: {
    state: {
      login: "登录",
      register: "注册",
    },
    menu: {
      forums: "论坛",
      whatsNew: "新鲜事",
      members: "会员",
    },
  },
}
