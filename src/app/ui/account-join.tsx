import { cookies, headers } from 'next/headers'
import { fetchAccount } from '@/app/lib/data'

export default async function Account() {
/*******
    // the cookie is a copy of the token from the initial identify call
    const cookie = await cookies().get('copiedjwt')
    if (!cookie) {
        return <code>Missing cookie</code>
    }

    // send the cookie/token to the API as the create/POST request
    //     (for minimal case, this is the visitor signing up as a new account)
    //     So the API will extract the ref# and email from the token 
    //     and insert into the members table with the role as PENDING.

    const list = await fetchAccount(cookie.value)
****************************/
    const headersList = headers()

    if (!headersList.has('cf-access-jwt-assertion')) {
        return <code>Missing header</code>
    }
    const token = headersList.get('cf-access-jwt-assertion')
    let authorization = ""
    if (token) authorization = token

    const list = await fetchAccount(authorization)
    if (list) {
        const debug = JSON.stringify(list)
        return <code>{ debug }</code>
    }
/***********************
    if (list) {
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
***********************/
    return <code>Account fail</code>
}

