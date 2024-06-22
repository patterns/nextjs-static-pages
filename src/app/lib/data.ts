

export async function fetchIdentify(authorization: string) {
	try {
		const res = await fetch('https://hello-hono-opm.pages.dev/api/users/identify', {
			method: 'POST',
			headers: { "Cf-Access-Jwt-Assertion": authorization },
		})

		const data = await res.json()
		return data
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


