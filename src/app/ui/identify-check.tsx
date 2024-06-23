import { headers } from 'next/headers'
import { fetchIdentify } from '@/app/lib/data'
import { SessionToken } from '@/app/ui/client-component'
//import useStore from '@/app/lib/useStore'
//import { useToken } from '@/app/lib/token-'


export default async function Identify() {
	const headersList = headers()
	if (headersList.has('cf-access-jwt-assertion')) {
		const token = headersList.get('cf-access-jwt-assertion')
		let authorization = ""
		if (token) authorization = token

		// Forward the CF Access JWT to API to prove our identity
		const session = await fetchIdentify(authorization)

		// Store the token
		//const add = useStore(useToken, (state) => state.add)
		//add(authorization)

		const debug = JSON.stringify({ member: session.data, token: session.token })
		if (debug) {
			return (
<>
<code className="font-mono font-bold">{debug}</code>
<SessionToken token={authorization} />
</>
			)
		}
	}

	return <code className="font-mono font-bold">Missing CF Access JWT header</code>
}


