import { headers } from 'next/headers'
import { fetchIdentify } from '@/app/lib/data'

// identify is to help debug by printing the fields after the API validates the token
export default async function Identify() {
    const headersList = headers()

    if (headersList.has('cf-access-jwt-assertion')) {
        const token = headersList.get('cf-access-jwt-assertion')
        let authorization = ""
        if (token) authorization = token

        // Forward the CF Access JWT to API to prove our identity
        const session = await fetchIdentify(authorization)

        const debug = JSON.stringify({ member: session.data })
        if (debug) {
            return <code className="font-mono font-bold">{debug}</code>
        }
    }

    return <code className="font-mono font-bold">Missing CF Access JWT header</code>
}


