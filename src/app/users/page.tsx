import Link from 'next/link'

export const runtime = 'edge'

export default Users

function Users() {

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
                        <th style={{ width: '30%' }}>Ref</th>
                    </tr>
                </thead>
                <tbody>

                    <TableBody />

                </tbody>
            </table>
        </>
    );
}

async function TableBody() {

    // When this /users link is clicked, it is triggered inside the browser.
    // Should we have kept a copy (from the referer) of the CF JWT in the browser's local storage?

    const res = await fetch('https://hello-hono-opm.pages.dev/api/users/')

/*
            headers: { "Cf-Access-Jwt-Assertion":authorization },

	type JSONResponse = {
	    data?: { users: Array<{ name: string, email: string, role: string, guid: string }> }
	    errors?: Array<{message: string}>
	}
        const { data, errors }: JSONResponse = await res.json()
	const users = data?.users
*/
        const debug = await res.json()
	const log = JSON.stringify(debug)

        return (
                <tr>
                    <td colSpan={4}>
			{log}
                    </td>
                </tr>
        );

/*
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
        }*/

}
