import Link from 'next/link'

////export const runtime = 'edge'

export default Users

function Users() {

    return (
        <>
            <h1>Users</h1>
            <Link href="/users/add" >Add User</Link>
            <table >
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

        const debug = await res.json()
	const log = JSON.stringify(debug)

        return (
                <tr>
                    <td colSpan={4}>
			{log}
                    </td>
                </tr>
        );
}
