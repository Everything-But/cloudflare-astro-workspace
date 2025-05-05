// ---------------------    astro    ------------------------------------------

// import { navigate } from 'astro:transitions/client'

// const tableStyle = `
//   table {
//     table-layout: fixed;
//   }
//   th, td {
//     padding: 10px 15px;
//   }
// `

// const EventList = ({ events = [] }: { events: any[] }) => {
//   const handleCreateEvent = () => {
//     navigate('/events/create')
//   }
//   return (
//     <>
//       <div className='grid justify-end' onClick={handleCreateEvent}>
//         Create event
//       </div>
//       <table>
//         <caption>Event List</caption>
//         <thead>
//           <tr>
//             <th className='w-[350px]' scope='col'>
//               ID
//             </th>
//             <th className='w-[200px]' scope='col'>
//               Name
//             </th>
//             <th className='w-[200px]' scope='col'>
//               Start Time
//             </th>
//             <th className='w-[200px]' scope='col'>
//               End Time
//             </th>
//             <th className='w-[150px]' scope='col'>
//               Created by
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           {events
//             .slice()
//             .sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime())
//             .map((event, index) => {
//               const { createdBy, endTime, id, name, startTime } = event
//               return (
//                 <tr key={index}>
//                   <td>{id}</td>
//                   <td>{name}</td>
//                   <td>{startTime.toLocaleString()}</td>
//                   <td>{endTime.toLocaleString()}</td>
//                   <td>{createdBy}</td>
//                 </tr>
//               )
//             })}
//         </tbody>
//         <style>{tableStyle}</style>
//       </table>
//     </>
//   )
// }

// export { EventList as default }

// -----------------------------------    graphql    ------------------------------------------------------------

// import { navigate } from 'astro:transitions/client'
// import PageError from '../components/PageError'
// import { graphql } from '../graphql'
// import { execute } from '../graphql/execute'
// import { useEffect, useState } from 'react'
// import { type Event } from '../graphql/graphql'

// const eventsQuery = graphql(`
//   query events($name: String) {
//     events(filter: { name: $name }) {
//       id
//       createdAt
//       createdBy
//       endTime
//       name
//       startTime
//       slug
//       timezone
//       updatedAt
//     }
//   }
// `)
// const tableStyle = `
//   table {
//     table-layout: fixed;
//   }
//   th, td {
//     padding: 10px 15px;
//   }
// `

// const EventList = () => {
//   const variables = { name: '' }
//   const [data, setData] = useState<{ events: Event[] }>()
//   const [error, setError] = useState<Error | undefined>()
//   const [loading, setLoading] = useState(true)
//   const { events = [] } = data ?? {}
//   const handleCreateEvent = () => {
//     navigate('/events/create')
//   }
//   useEffect(() => {
//     const fetchData = async () => {
//       const { data, error } = (await execute(eventsQuery, variables)) as { data?: { events: Event[] }; error?: Error }
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
//     <>
//       <div className='grid justify-end' onClick={handleCreateEvent}>
//         Create event
//       </div>
//       <table>
//         <caption>Event List</caption>
//         <thead>
//           <tr>
//             <th className='w-[350px]' scope='col'>
//               ID
//             </th>
//             <th className='w-[200px]' scope='col'>
//               Name
//             </th>
//             <th className='w-[200px]' scope='col'>
//               Start Time
//             </th>
//             <th className='w-[200px]' scope='col'>
//               End Time
//             </th>
//             <th className='w-[150px]' scope='col'>
//               Created by
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           {events
//             .slice()
//             .sort((a, b) => new Date(b.startTime ?? 0).getTime() - new Date(a.startTime ?? 0).getTime())
//             .map((event, index) => {
//               const { createdBy, endTime, id, name, startTime } = event
//               return (
//                 <tr key={index}>
//                   <td>{id}</td>
//                   <td>{name}</td>
//                   <td>{startTime?.toLocaleString() ?? ''}</td>
//                   <td>{endTime?.toLocaleString() ?? ''}</td>
//                   <td>{createdBy}</td>
//                 </tr>
//               )
//             })}
//         </tbody>
//         <style>{tableStyle}</style>
//       </table>
//     </>
//   )
// }

// export { EventList as default }

// -----------------------------------    graphql (urql)    ------------------------------------------------------------

import { navigate } from 'astro:transitions/client'
import { useQuery } from 'urql'
import PageError from '../components/PageError'
import UrqlProvider from '../components/UrqlProvider'
import { graphql } from '../gql'

const eventsQuery = graphql(`
  query events($name: String) {
    events(filter: { name: $name }) {
      id
      createdAt
      createdBy
      endTime
      name
      startTime
      slug
      timezone
      updatedAt
    }
  }
`)
const tableStyle = `
  table {
    table-layout: fixed;
  }
  th, td {
    padding: 10px 15px;
  }
`

const EventList = () => {
  return (
    <UrqlProvider>
      <EventListContent />
    </UrqlProvider>
  )
}
const EventListContent = () => {
  const [result] = useQuery({
    query: eventsQuery,
    variables: { name: '' },
  })
  const { data, fetching, error } = result
  const { events } = data ?? {}
  const handleCreateEvent = () => {
    navigate('/events/create')
  }
  if (fetching) return <div>Loading...</div>
  if (error) return <PageError error={error} />
  return (
    <>
      <div className='grid justify-end' onClick={handleCreateEvent}>
        Create event
      </div>
      <table>
        <caption>Event List</caption>
        <thead>
          <tr>
            <th className='w-[350px]' scope='col'>
              ID
            </th>
            <th className='w-[200px]' scope='col'>
              Name
            </th>
            <th className='w-[200px]' scope='col'>
              Start Time
            </th>
            <th className='w-[200px]' scope='col'>
              End Time
            </th>
            <th className='w-[150px]' scope='col'>
              Created by
            </th>
          </tr>
        </thead>
        <tbody>
          {(events ?? [])
            .slice()
            .sort((a, b) => new Date(b?.startTime ?? 0).getTime() - new Date(a?.startTime ?? 0).getTime())
            .map((event, index) => {
              const { createdBy, endTime, id, name, startTime } = event
              return (
                <tr key={index}>
                  <td>{id}</td>
                  <td>{name}</td>
                  <td>{startTime?.toLocaleString() ?? ''}</td>
                  <td>{endTime?.toLocaleString() ?? ''}</td>
                  <td>{createdBy}</td>
                </tr>
              )
            })}
        </tbody>
        <style>{tableStyle}</style>
      </table>
    </>
  )
}

export { EventList as default }
