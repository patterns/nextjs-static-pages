'use server'

import { cookies } from 'next/headers'

export const cookieToken = async (token: string|undefined) => {
    if (token) {
        await cookies().set('authorization', token)
    }
}

