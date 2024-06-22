import { headers, cookies } from 'next/headers'
import { fetchIdentify } from '@/app/lib/data'

export default async function Identify() {
	const headersList = headers()
	if (headersList.has('cf-access-jwt-assertion')) {
		const token = headersList.get('cf-access-jwt-assertion')
		let authorization = ""
		if (token) authorization = token

		const mem = await fetchIdentify(authorization)

		const cookieStore = cookies
		const authcookie = cookieStore.get('authorization')

		const debug = JSON.stringify({ member: mem, authorization: authcookie })
		if (debug) {
			return <code className="font-mono font-bold">{debug}</code>
		}
	}

	return <code className="font-mono font-bold">Missing CF Access JWT header</code>
}

