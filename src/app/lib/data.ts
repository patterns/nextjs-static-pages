

export async function fetchIdentify(authorization: string) {
	try {
		const res = await fetch('https://hello-hono-opm.pages.dev/api/users/identify', {
			method: 'POST',
			headers: { "Cf-Access-Jwt-Assertion": authorization },
		})

		const data = await res.json()

		// contract: API adds authorization cookie
		let token
		const cookieHeader = res.headers.get('set-cookie')
		const cookiesArray = cookieHeader.split(/[;,]/)
		for (const cookie of cookiesArray) {
			const [name, value] = cookie.trim().split('=')
			if (name === 'authorization') {
				token = value
				break
			}
		}

		return ( data: data, token: token }
	} catch (error) {
		console.log('API identify:', error)
		return { error: 'Fetch identify fail.' }
	}
}

export async function fetchUsers() {
	try {
		const res = await fetch('https://hello-hono-opm.pages.dev/api/users/')

		const data = await res.json()
		return data
	} catch (error) {
		console.log('API users:', error)
		return { error: 'Fetch users fail.' }
	}
}


