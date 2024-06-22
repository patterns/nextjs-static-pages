'use server'

import { cookies } from 'next/headers'

export const cookieToken = async (token: string) => {
    if (token) {
        await cookies().set('authorization', token)
    }
}

