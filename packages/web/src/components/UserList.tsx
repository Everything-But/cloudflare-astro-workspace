// ---------------------    astro    ------------------------------------------

// const tableStyle = `
//   th, td {
//     padding: 10px 15px;
//   }
// `

// const UserList = ({ users = [] }: { users: any[] }) => {
//   return (
//     <table>
//       <caption>User list</caption>
//       <thead>
//         <tr>
//           <th className='w-[350px]' scope='col'>
//             ID
//           </th>
//           <th className='w-[200px]' scope='col'>
//             Username
//           </th>
//           <th className='w-[100px]' scope='col'>
//             Role
//           </th>
//           <th className='w-[150px]' scope='col'>
//             Create date
//           </th>
//         </tr>
//       </thead>
//       <tbody>
//         {users
//           .slice()
//           .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
//           .map((user, index) => {
//             const { createdAt, id, role, username } = user
//             return (
//               <tr key={index}>
//                 <th scope='row'>{id}</th>
//                 <td>{username}</td>
//                 <td>{role}</td>
//                 <td>{createdAt.toLocaleString()}</td>
//               </tr>
//             )
//           })}
//       </tbody>
//       <tfoot>
//         <tr>
//           <th colSpan={3} scope='row'>
//             total
//           </th>
//           <td className='text-center'>{users.length}</td>
//         </tr>
//       </tfoot>
//       <style>{tableStyle}</style>
//     </table>
//   )
// }

// export { UserList as default }

// -----------------------------------    graphql    ------------------------------------------------------------

// import { useEffect, useState } from 'react'
// import PageError from '../components/PageError'
// import { graphql } from '../graphql'
// import { execute } from '../graphql/execute'
// import type { User } from '../graphql/graphql'

// const usersQuery = graphql(`
//   query users($role: String) {
//     users(filter: { role: $role }) {
//       id
//       createdAt
//       role
//       username
//     }
//   }
// `)
// const tableStyle = `
//   th, td {
//     padding: 10px 15px;
//   }
// `

// const UserList = () => {
//   const [data, setData] = useState<{ users: User[] }>()
//   const [error, setError] = useState<Error | undefined>()
//   const [loading, setLoading] = useState(true)
//   const { users = [] } = data ?? {}
//   useEffect(() => {
//     const fetchData = async () => {
//       const { data, error } = (await execute(usersQuery, { role: '' })) as { data?: { users: User[] }; error?: Error }
//       if (error) {
//         setError(error)
//       }
//       setData(data)
//       setLoading(false)
//     }
//     fetchData()
//   }, [])
//   if (loading) return <div>Loading...</div>
//   if (error) return <PageError error={error} />
//   return (
//     <table>
//       <caption>User list</caption>
//       <thead>
//         <tr>
//           <th className='w-[350px]' scope='col'>
//             ID
//           </th>
//           <th className='w-[200px]' scope='col'>
//             Username
//           </th>
//           <th className='w-[100px]' scope='col'>
//             Role
//           </th>
//           <th className='w-[150px]' scope='col'>
//             Create date
//           </th>
//         </tr>
//       </thead>
//       <tbody>
//         {users
//           .slice()
//           .sort((a, b) => new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime())
//           .map((user, index) => {
//             const { createdAt, id, role, username } = user
//             return (
//               <tr key={index}>
//                 <th scope='row'>{id}</th>
//                 <td>{username}</td>
//                 <td>{role}</td>
//                 <td>{createdAt?.toLocaleString() ?? ''}</td>
//               </tr>
//             )
//           })}
//       </tbody>
//       <tfoot>
//         <tr>
//           <th colSpan={3} scope='row'>
//             total
//           </th>
//           <td className='text-center'>{users.length}</td>
//         </tr>
//       </tfoot>
//       <style>{tableStyle}</style>
//     </table>
//   )
// }

// export { UserList as default }

// -----------------------------------    graphql (urql)    ------------------------------------------------------------

import { useQuery } from 'urql'
import PageError from '../components/PageError'
import UrqlProvider from '../components/UrqlProvider'
import { graphql } from '../gql'

const usersQuery = graphql(`
  query users($role: String) {
    users(filter: { role: $role }) {
      id
      createdAt
      role
      username
    }
  }
`)
const tableStyle = `
  th, td {
    padding: 10px 15px;
  }
`

const UserList = () => {
  return (
    <UrqlProvider>
      <UserListContent />
    </UrqlProvider>
  )
}

const UserListContent = () => {
  const [result] = useQuery({
    query: usersQuery,
    variables: { role: '' },
  })
  const { data, error, fetching } = result ?? {}
  const { users } = data ?? {}
  if (fetching) return <div>Loading...</div>
  if (error) return <PageError error={error} />
  return (
    <table>
      <caption>User list</caption>
      <thead>
        <tr>
          <th className='w-[350px]' scope='col'>
            ID
          </th>
          <th className='w-[200px]' scope='col'>
            Username
          </th>
          <th className='w-[100px]' scope='col'>
            Role
          </th>
          <th className='w-[150px]' scope='col'>
            Create date
          </th>
        </tr>
      </thead>
      <tbody>
        {(users ?? [])
          .slice()
          .sort((a, b) => new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime())
          .map((user, index) => {
            const { createdAt, id, role, username } = user
            return (
              <tr key={index}>
                <th scope='row'>{id}</th>
                <td>{username}</td>
                <td>{role}</td>
                <td>{createdAt?.toLocaleString() ?? ''}</td>
              </tr>
            )
          })}
      </tbody>
      <tfoot>
        <tr>
          <th colSpan={3} scope='row'>
            total
          </th>
          <td className='text-center'>{users?.length ?? 0}</td>
        </tr>
      </tfoot>
      <style>{tableStyle}</style>
    </table>
  )
}

export { UserList as default }
