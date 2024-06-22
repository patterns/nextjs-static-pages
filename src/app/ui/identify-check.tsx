import { headers, cookies } from 'next/headers'
import { fetchIdentify } from '@/app/lib/data'
////import { ServerAction } from '@/app/ui/server-action'

export default async function Identify() {
	const headersList = headers()
	if (headersList.has('cf-access-jwt-assertion')) {
		const token = headersList.get('cf-access-jwt-assertion')
		let authorization = ""
		if (token) authorization = token

		// Forward the CF Access JWT to API to prove our identity
		const session = await fetchIdentify(authorization)

		// Store the token we received from API
		if (session.token) {
			await cookies().set('authorization', session.token)
		}

		const debug = JSON.stringify(session.data)
		if (debug) {
			return (
				<code className="font-mono font-bold">{debug}</code>
			)
		}
	}

	return <code className="font-mono font-bold">Missing CF Access JWT header</code>
}
/*
function addCookie() {
	// Store the token we received from API
	if (session.token) {
		cookies().set('authorization', session.token)
	}
}

*/
