/*
 * Copyright (c) 2023 Enaium
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { Api } from "@/__generated"
import { useSessionStore } from "@/store"

// The base URL of the API
export const BASE_URL = import.meta.env.VITE_APP_BASE_URL

// Create an instance of the API
export const api = new Api(async ({ uri, method, body }) => {
  // Get the user's token from the store
  const token = useSessionStore().token as string | undefined
  // Call the API
  const response = await fetch(`${BASE_URL}${uri}`, {
    method,
    body: body !== undefined ? JSON.stringify(body) : undefined,
    headers: {
      "content-type": "application/json;charset=UTF-8",
      ...(token !== undefined && token !== "" ? { token } : {}),
    },
  })
  // If the response is not 200, throw an error
  if (response.status !== 200) {
    throw await response.text()
  }
  // Get the response text
  const text = await response.text()
  // If the response is empty, return null
  if (text.length === 0) {
    return null
  }
  // Parse the response text as JSON
  return JSON.parse(text)
})
