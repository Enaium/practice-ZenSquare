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

import { NConfigProvider, NMessageProvider, zhCN } from "naive-ui"
import { RouterView, useRouter } from "vue-router"
import { useI18n } from "vue-i18n"
import Message from "@/components/Message"

const App = () => {
  const { t } = useI18n()
  window.$i18n = t
  window.$router = useRouter()
  return (
    <>
      <NConfigProvider locale={zhCN}>
        <NMessageProvider>
          <Message />
        </NMessageProvider>
        <NMessageProvider>
          <RouterView />
        </NMessageProvider>
      </NConfigProvider>
    </>
  )
}

export default App
