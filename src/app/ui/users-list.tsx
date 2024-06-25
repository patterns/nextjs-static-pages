import { cookies } from 'next/headers'
import { fetchUsers } from '@/app/lib/data'

export default async function Users() {
    // we created the cookie to copy token from the initial identify call
    const cookie = await cookies().get('copiedjwt')
    if (!cookie) {
        return <code>Missing cookie</code>
    }

    const token = cookie.value
    const list = await fetchUsers(token)
    ////const debug = JSON.stringify(list)
    ////return <code>{debug}</code>
    type OnlyKeys = keyof typeof list

  if (list) {
    return (
      <table>
      <thead>
        <tr>
          <th style={{ width: '30%' }}>Name</th>
          <th style={{ width: '30%' }}>Email</th>
          <th style={{ width: '10%' }}>Role</th>
          <th style={{ width: '30%' }}>Ref</th>
        </tr>
      </thead>
      <tbody>
      {Object.keys(list).map((key, index) => {
        return (
        <tr key={index}>
          <td>{list[key as OnlyKeys].name}</td>
          <td>{list[key as OnlyKeys].email}</td>
          <td>{list[key as OnlyKeys].role}</td>
          <td>{list[key as OnlyKeys].guid}</td>
        </tr>
        )
      })}
      </tbody>
      </table>
    )
  }

  return <table><tr><td>Name</td><td>Email</td><td>Role</td></tr></table>
}

