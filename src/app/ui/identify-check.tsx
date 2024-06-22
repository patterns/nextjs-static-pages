import { headers } from 'next/headers'
import { fetchIdentify } from '@/app/lib/data'
import { CookieToken } from '@/app/ui/client-component'

export default async function Identify() {
	const headersList = headers()
	if (headersList.has('cf-access-jwt-assertion')) {
		const token = headersList.get('cf-access-jwt-assertion')
		let authorization = ""
		if (token) authorization = token

		// Forward the CF Access JWT to API to prove our identity
		const session = await fetchIdentify(authorization)

		// Store the token we received from API

		const debug = JSON.stringify(session.data)
		if (debug) {
			return (
			<>
				<code className="font-mono font-bold">{debug}</code>
				<CookieToken token={ session.token } />
			</>
			)
		}
	}

	return <code className="font-mono font-bold">Missing CF Access JWT header</code>
}


