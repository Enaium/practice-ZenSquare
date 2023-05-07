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
    register: {
      confirmPassword: "请重新输入你的密码",
      passwordDifferent: "输入的密码和确认的密码不同",
      register: "注册",
      success: "注册成功",
    },
    modifyProfile: {
      nickname: { label: "昵称", message: "请输入你的昵称" },
      birthday: { label: "生日" },
      location: { label: "地址" },
      website: { label: "网站" },
      description: { label: "描述" },
      github: { label: "GitHub" },
      bilibili: { label: "哔哩哔哩" },
      email: { label: "邮箱" },
    },
    visitorMenu: {
      role: "角色",
      thread: "帖子",
      reply: "回复",
      threads: "帖子",
      replies: "回复",
      accountDetails: "账户详情",
      following: "关注",
      security: "密码和安全",
      logout: "登出",
      logoutConfirm: "你确定要登出吗?",
      logoutSuccess: "登出成功",
    },
    forums: {
      newPost: "新帖子",
      newThread: "新主题",
    },
  },
  component: {
    state: {
      login: "登录",
      register: "注册",
      profile: "个人资料",
      createProfile: "创建个人资料",
    },
    menu: {
      forums: "论坛",
      whatsNew: "新鲜事",
      members: "会员",
    },
    threadForm: {
      title: { label: "标题", message: "请输入标题" },
      content: { label: "内容", message: "请输入内容" },
    },
  },
  common: {
    submit: "提交",
    success: "成功",
  },
}
