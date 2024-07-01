'use server'

import { cookies, headers } from 'next/headers'
import { redirect } from 'next/navigation'

async function loadExamples(prevState, formData) {
    // access header
    const token = headers().get('cf-access-jwt-assertion')
    if (token) {
      // copy header to cookie (probably not necessary, duplicated work)
      cookies().set('copiedjwt', token)
      // access field from the submit button
      const action = formData.get('examples-action')
      if (action == "users") {
          redirect('/users')
      }
      if (action == "courses") {
          redirect('/courses')
      }
      if (action == "join") {
          redirect('/join')
      }
    }
}


/*******
export const cookieToken = async (token: string|undefined) => {
    // TODO somehow the token is truncated

    if (token) {
        await cookies().set('authorization', token)
    }
}
**************/
