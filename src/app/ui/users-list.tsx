import { cookies } from 'next/headers'
import { fetchUsers } from '@/app/lib/data'
//import useStore from '@app/lib/useStore'
//import { useTokenStore } from '@/app/lib/token-store'

export default async function Users() {

    const token = await cookies().get('authorization')

    ////const token = useStore(useTokenStore, (state) => state.tokens)

    //const list = await fetchUsers(token)

    const debug = JSON.stringify(token)

    return <pre><code>{ debug }</code></pre>



/*
  if (list && list.length >= 1) {
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
      {list.map((item) => {
        return (
        <tr>
          <td>{item.name}</td>
          <td>{item.email}</td>
          <td>{item.role}</td>
          <td>{item.guid}</td>
        </tr>
        )
      })}
      </tbody>
      </table>
    )
  }

  return <table><tr><td>Name</td><td>Email</td><td>Role</td></tr></table>
*/
}

