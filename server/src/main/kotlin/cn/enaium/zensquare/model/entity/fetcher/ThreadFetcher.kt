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

package cn.enaium.zensquare.model.entity.fetcher

import cn.enaium.zensquare.model.entity.Thread
import cn.enaium.zensquare.model.entity.by
import org.babyfish.jimmer.sql.kt.fetcher.newFetcher

/**
 * @author Enaium
 */
object ThreadFetcher {
    val DEFAULT_THREAD = newFetcher(Thread::class).by {
        allScalarFields()
        content(false)
        member {
            profile {
                nickname()
                avatar()
            }
        }
        lastReplyTime()
        lastReplyMember {
            profile {
                nickname()
                avatar()
            }
        }
        reply()
    }

    val FULL_POST = newFetcher(Thread::class).by {
        allScalarFields()
        member {
            profile {
                nickname()
                avatar()
                role {
                    name()
                    description()
                }
            }
        }
        forum {
            allTableFields()
            category {
                allScalarFields()
            }
        }
        lastReplyTime()
        lastReplyMember {
            profile {
                nickname()
                avatar()
            }
        }
        like()
    }

    val FULL_CONVERSATION = newFetcher(Thread::class).by {
        allScalarFields()
        member {
            profile {
                nickname()
                avatar()
                role {
                    name()
                    description()
                }
            }
        }
        lastReplyTime()
        lastReplyMember {
            profile {
                nickname()
                avatar()
            }
        }
        like()
    }
}