'use client'

export default Users

function Users() {
    return (
        <>
            <h1>Users</h1>
            <TableBody />
        </>
    )
}

async function TableBody() {
    const res = await fetch('https://hello-hono-opm.pages.dev/api/users/')
    const debug = await res.json()
    const log = JSON.stringify(debug)
    return <code>{ log }</code>
}
