import { headers } from 'next/headers'
////import { fetchIdentify } from '@/app/lib/data'

export default async function Identify() {
	const headersList = headers()
	if (headersList.has('cf-access-jwt-assertion')) {
		const token = headersList.get('cf-access-jwt-assertion')
		let authorization = ""
		if (token) authorization = token

		const res = await fetch('https://hello-hono-opm.pages.dev/api/users/identify', {
			method: 'POST',
			headers: { "Cf-Access-Jwt-Assertion":authorization },
		})

		const user = await res.json()
		const debug = JSON.stringify(user)
		if (debug) {
			return <code className="font-mono font-bold">{debug}</code>
		}
	}

	return <code className="font-mono font-bold">Missing CF Access JWT header</code>
}

