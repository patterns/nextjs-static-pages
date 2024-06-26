// Note, don't throw exceptions and prefer return error type.

// server side POST to API
export async function fetchIdentify(authorization: string) {
	try {
		const res = await fetch('https://hello-hono-opm.pages.dev/api/users/identify', {
			method: 'POST',
			headers: { "Cf-Access-Jwt-Assertion": authorization },
		})

		const data = await res.json()
		return { data: data }
	} catch (error) {
		console.log('API identify:', error)
		return { error: 'Fetch identify fail.' }
	}
}

// server side GET to API
export async function fetchUsers(token: string) {
	if (token == "") {
		return { error: 'Users requires token.' }
	}
	try {
		const res = await fetch('https://hello-hono-opm.pages.dev/api/users', {
			headers: { "Cf-Access-Jwt-Assertion": token },
		})

		const data = await res.json()
		return data
	} catch (error) {
		console.log('API users:', error)
		return { error: error }
	}
}

// server side GET to API
export async function fetchCourses(token: string) {
	if (token == "") {
		return { error: 'Courses requires token.' }
	}
	try {
		const res = await fetch('https://hello-hono-opm.pages.dev/api/courses', {
			headers: { "Cf-Access-Jwt-Assertion": token },
		})

		const data = await res.json()
		return data
	} catch (error) {
		console.log('API courses:', error)
		return { error: error }
	}
}

// server side POST to API
export async function fetchAccount(token: string) {
	if (token == "") {
		return { error: 'Account requires token.' }
	}
	try {
		const res = await fetch('https://hello-hono-opm.pages.dev/api/users', {
			method: 'POST',
			headers: { "Cf-Access-Jwt-Assertion": token },
		})

		const data = await res.json()
		return data
	} catch (error) {
		console.log('API account:', error)
		return { error: 'Fetch account fail.' }
	}
}

