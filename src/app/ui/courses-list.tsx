import { cookies } from 'next/headers'
import { fetchCourses } from '@/app/lib/data'

export default async function Courses() {
    // the cookie is a copy of the token from the initial identify call
    const cookie = await cookies().get('copiedjwt')
    if (!cookie) {
        return <code>Missing cookie</code>
    }

    const list = await fetchCourses(cookie.value)

    if (list) {
      return (
      <table>
      <thead>
        <tr>
          <th style={{ width: '10%' }}>Title</th>
          <th style={{ width: '10%' }}>Descr</th>
          <th style={{ width: '5%' }}>Category</th>
          <th style={{ width: '30%' }}>URL</th>
          <th style={{ width: '45%' }}>Ref</th>
        </tr>
      </thead>
      <tbody>
      {Object.values(list).map((value, index) => {
        return (
        <tr key={index}>
          <td>{value.title}</td>
          <td>{value.description}</td>
          <td>{value.category}</td>
          <td>{value.url}</td>
          <td>{value.guid}</td>
        </tr>
        )
      })}
      </tbody>
      </table>
      )
    }

    return <table><tr><td>Title</td><td>Descr</td><td>Category</td></tr></table>
}

