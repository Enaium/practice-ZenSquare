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

import { createI18n } from "vue-i18n"
import zh_CN from "@/i18n/message/zh_CN"
import en_US from "@/i18n/message/en_US"
import ja_JP from "@/i18n/message/ja_JP"
import fr_FR from "@/i18n/message/fr_FR"

const messages = {
  "zh-CN": zh_CN,
  "en-US": en_US,
  "ja-JP": ja_JP,
  "fr-FR": fr_FR,
}

const i18n = createI18n({ legacy: false, locale: navigator.language.toString(), fallbackLocale: "en-US", messages })
export default i18n
