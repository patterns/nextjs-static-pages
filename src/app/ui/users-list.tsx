import { cookies } from 'next/headers'
import { fetchUsers } from '@/app/lib/data'

export default async function Users() {
    // the cookie is a copy of the token from the initial identify call
    const cookie = await cookies().get('copiedjwt')
    if (!cookie) {
        return <code>Missing cookie</code>
    }

    const list = await fetchUsers(cookie.value)

    if (list) {
      return (
      <table>
      <thead>
        <tr>
          <th style={{ width: '25%' }}>Name</th>
          <th style={{ width: '30%' }}>Email</th>
          <th style={{ width: '5%' }}>Role</th>
          <th style={{ width: '40%' }}>Ref</th>
        </tr>
      </thead>
      <tbody>
      {Object.values(list).map((value, index) => {
        return (
        <tr key={index}>
          <td>{value.name}</td>
          <td>{value.email}</td>
          <td>{value.role}</td>
          <td>{value.guid}</td>
        </tr>
        )
      })}
      </tbody>
      </table>
      )
    }

    return <table><tr><td>Name</td><td>Email</td><td>Role</td></tr></table>
}

