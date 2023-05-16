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
        label: "ユーザー名",
        message: "ユーザー名を入力してください"
      },
      password: {
        label: "パスワード",
        message: "パスワードを入力してください"
      },
      login: "ログイン",
      success: "ログイン成功"
    },
    register: {
      confirmPassword: "パスワードを再入力してください",
      passwordDifferent: "入力したパスワードと確認したパスワードが異なります",
      register: "登録",
      success: "登録成功"
    },
    modifyProfile: {
      nickname: {
        label: "ニックネーム",
        message: "ニックネームを入力してください"
      },
      birthday: {
        label: "誕生日"
      },
      location: {
        label: "住所"
      },
      website: {
        label: "ウェブサイト"
      },
      description: {
        label: "説明"
      },
      github: {
        label: "GitHub"
      },
      bilibili: {
        label: "BiliBili"
      },
      email: {
        label: "メールアドレス"
      }
    },
    visitorMenu: {
      role: "役割",
      thread: "スレッド",
      reply: "返信",
      accountDetails: "アカウントの詳細",
      followers: "フォロワー",
      followings: "フォロー中",
      security: "パスワードとセキュリティ",
      logout: "ログアウト",
      logoutConfirm: "ログアウトしますか？",
      logoutSuccess: "ログアウト成功"
    },
    forums: {
      newPost: "新しい投稿",
      newThread: "新しいスレッド"
    },
    profile: {
      profile: "プロフィール",
      startConversation: "会話を開始",
      find: "検索",
      modify: "変更"
    },
    follow: {
      followers: "フォロワー",
      followings: "フォロー中"
    }
  },
  component: {
    state: {
      login: "ログイン",
      register: "登録",
      profile: "プロフィール",
      createProfile: "プロフィールを作成"
    },
    menu: {
      forums: "フォーラム",
      whatsNew: "新着情報",
      members: "メンバー"
    },
    threadForm: {
      title: {
        label: "タイトル",
        message: "タイトルを入力してください"
      },
      content: {
        label: "内容",
        message: "内容を入力してください"
      }
    },
    replyForm: {
      reply: {
        label: "返信",
        message: "返信を入力してください"
      }
    },
    replyList: {
      viewChild: "子を見る {count} 件"
    },
    followButton: {
      follow: "フォロー",
      unfollow: "フォロー解除"
    },
    reportForm: {
      reason: {
        label: "理由",
        message: "理由を入力してください"
      }
    },
    button: {
      report: "報告",
      edit: "編集",
      reply: "返信",
      delete: "削除"
    }
  },
  common: {
    submit: "提出する",
    success: "成功",
    notLogin: "続行するには最初にログインしてください"
  }
}
