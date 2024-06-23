'use server'

import { cookies } from 'next/headers'

export const cookieToken = async (token: string|undefined) => {
    // TODO somehow the token is truncated

    if (token) {
        await cookies().set('authorization', token)
    }
}

