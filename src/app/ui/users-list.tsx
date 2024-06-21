////import { headers } from 'next/headers'
////import { fetchUsers } from '@/app/lib/data'

export default async function Users() {

/*
	const user = await fetchUsers()
	const debug = JSON.stringify(user)
	if (debug) {
		return <code className="font-mono font-bold">{debug}</code>
	}*/


	return <table><tr><td>Name</td><td>Email</td><td>Role</td></tr></table>
}

