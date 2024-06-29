import { cookies } from 'next/headers'
import { fetchAccount } from '@/app/lib/data'

export default async function Account() {
    // the cookie is a copy of the token from the initial identify call
    const cookie = await cookies().get('copiedjwt')
    if (!cookie) {
        return <code>Missing cookie</code>
    }

    //TODO send the cookie/token to the API as the create/POST request
    //     (for minimal case, this is the visitor signing up as a new account)
    //     So the API will extract the ref# and email from the token 
    //     and insert into the members table with the role as PENDING.

    const confirm = await fetchAccount(cookie.value)


    if (confirm) {
      return (
      <table>
      <thead>
        <tr>
          <th style={{ width: '20%' }}>Name</th>
          <th style={{ width: '30%' }}>Email</th>
          <th style={{ width: '5%' }}>Role</th>
          <th style={{ width: '45%' }}>Ref</th>
        </tr>
      </thead>
      <tbody>


        <tr >
          <td>{confirm.name}</td>
          <td>{confirm.email}</td>
          <td>{confirm.role}</td>
          <td>{confirm.refid}</td>
        </tr>


      </tbody>
      </table>
      )
    }

    return <code>Account fail</code>
}

