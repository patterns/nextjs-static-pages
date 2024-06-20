import Link from 'next/link';
import { headers } from 'next/headers'
export const runtime = 'edge'

export default Users


function Users() {
    const headersList = headers()


    return (
        <>
            <h1>Users</h1>
            <Link href="/users/add" >Add User</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '30%' }}>Name</th>
                        <th style={{ width: '30%' }}>Email</th>
                        <th style={{ width: '10%' }}>Role</th>
                        <th style={{ width: '30%' }}>Ref#</th>
                    </tr>
                </thead>
                <tbody>
                    <TableBody />
                </tbody>
            </table>
        </>
    );

    async function TableBody() {

        if (!headersList.has('cf-access-jwt-assertion')) {
            return (
                <tr>
                    <td colSpan={4}>
                    Missing CF Access JWT header
                    </td>
                </tr>
            );
        }

        const token = headersList.get('cf-access-jwt-assertion')
        let authorization = ""
        if (token) authorization = token
        const res = await fetch('https://hello-hono-opm.pages.dev/api/users/', {
            method: 'GET',
            headers: { "Cf-Access-Jwt-Assertion":authorization },
        })
	type JSONResponse = {
	    data?: { users: Array<{ name: string, email: string, role: string, guid: string }> }
	    errors?: Array<{message: string}>
	}
        const { data, errors }: JSONResponse = await res.json()
	const users = data.users
        if (users?.length) {
            return (users.map(user =>
                <tr key={user.guid}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>{user.guid}</td>
                </tr>
            ));
        }

        if (!users) {
            return (
                <tr>
                    <td colSpan={4}>

                    </td>
                </tr>
            );
        }

        if (users?.length === 0) {
            return (
                <tr>
                    <td colSpan={4} className="text-center">
                        <div className="p-2">No Users To Display</div>
                    </td>
                </tr>
            );
        }
    }
}
