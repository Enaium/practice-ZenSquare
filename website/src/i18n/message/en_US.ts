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
        label: "Username",
        message: "Please input your username",
      },
      password: {
        label: "Password",
        message: "Please input your password",
      },
      login: "Login",
      success: "Login successful",
    },
    register: {
      confirmPassword: "Please input your password again",
      passwordDifferent: "The input password is different from the confirm password",
      register: "Register",
      success: "Register successful",
    },
    modifyProfile: {
      nickname: { label: "Nickname", message: "Please input your nickname" },
      birthday: { label: "Birthday" },
      location: { label: "Location" },
      website: { label: "Website" },
      description: { label: "Description" },
      github: { label: "GitHub" },
      bilibili: { label: "BiliBili" },
      email: { label: "Email" },
    },
    visitorMenu: {
      role: "Role",
      thread: "Thread",
      reply: "Reply",
      accountDetails: "Account details",
      following: "Following",
      security: "Password and Security",
      logout: "Logout",
      logoutConfirm: "Are you sure you want to log out?",
      logoutSuccess: "Logout successful",
    },
    forums: {
      newPost: "New Post",
      newThread: "New Thread",
    },
  },
  component: {
    state: {
      login: "Login",
      register: "Register",
      profile: "Profile",
      createProfile: "Create your profile",
    },
    menu: {
      forums: "Forums",
      whatsNew: "What's New",
      members: "Members",
    },
    threadForm: {
      title: {
        label: "Title",
        message: "Please input title",
      },
      content: {
        label: "Content",
        message: "Please input content",
      },
    },
    replyForm: {
      reply: {
        label: "Reply",
        message: "Please input reply",
      },
    },
    replyList: {
      viewChild: "View {count} child replies",
    },
    likeState: {
      notLogin: "Please login first to like",
    },
    button: {
      report: "Report",
      edit: "Edit",
      reply: "Reply",
      delete: "Delete",
    },
  },
  common: {
    submit: "Submit",
    success: "Success",
  },
}
