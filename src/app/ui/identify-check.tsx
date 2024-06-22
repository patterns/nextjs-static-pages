import { headers } from 'next/headers'
import { fetchIdentify } from '@/app/lib/data'

export default async function Identify() {
	const headersList = headers()
	if (headersList.has('cf-access-jwt-assertion')) {
		const token = headersList.get('cf-access-jwt-assertion')
		let authorization = ""
		if (token) authorization = token

		const session = await fetchIdentify(authorization)

		/*const member = await res.json()
		const cookieStore = res.headers
		const cookieHeader = cookieStore.get('set-cookie')
		const debug = JSON.stringify({ member: member, cookieHeader: cookieHeader })*/

		const debug = JSON.stringify({ member: session.data, token: session.token })
		if (debug) {
			return <code className="font-mono font-bold">{debug}</code>
		}
	}

	return <code className="font-mono font-bold">Missing CF Access JWT header</code>
}

