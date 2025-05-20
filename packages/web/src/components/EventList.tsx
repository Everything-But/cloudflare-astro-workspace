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

// import { navigate } from 'astro:transitions/client'
// import { useQuery } from 'urql'
// import PageError from '../components/PageError'
// import UrqlProvider from '../components/UrqlProvider'
// import { graphql } from '../gql'

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
//   return (
//     <UrqlProvider>
//       <EventListContent />
//     </UrqlProvider>
//   )
// }
// const EventListContent = () => {
//   const [result] = useQuery({
//     query: eventsQuery,
//     variables: { name: '' },
//   })
//   const { data, fetching, error } = result
//   const { events } = data ?? {}
//   const handleCreateEvent = () => {
//     navigate('/events/create')
//   }
//   if (fetching) return <div>Loading...</div>
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
//           {(events ?? [])
//             .slice()
//             .sort((a, b) => new Date(b?.startTime ?? 0).getTime() - new Date(a?.startTime ?? 0).getTime())
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

// -----------------------------------    shadcn    ------------------------------------------------------------

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
} from '@tanstack/react-table'
import { navigate } from 'astro:transitions/client'
import { ArrowDown, ArrowUp, ArrowUpDown, MoreHorizontal } from 'lucide-react'
import { useState } from 'react'
import { Button } from '../components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu'
import { Input } from '../components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table'
import type { EventType } from '../types/event'

const EventList = ({ events = [] }: { events: any[] }) => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [sorting, setSorting] = useState<SortingState>([])
  const columns: ColumnDef<EventType>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
    },
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'startTime',
      header: 'Start Time',
      cell: ({ row }) => new Date(row.getValue('startTime')).toLocaleString(),
    },
    {
      accessorKey: 'endTime',
      header: ({ column }) => {
        return (
          <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            End Time
            {!column.getIsSorted() && <ArrowUpDown className='ml-2 h-4 w-4' />}
            {column.getIsSorted() === 'asc' && <ArrowUp className='ml-2 h-4 w-4' />}
            {column.getIsSorted() === 'desc' && <ArrowDown className='ml-2 h-4 w-4' />}
          </Button>
        )
      },
      cell: ({ row }) => new Date(row.getValue('startTime')).toLocaleString(),
    },
    {
      accessorKey: 'createdBy',
      header: 'Created by',
      cell: ({ row }) => {
        const { id, createdBy } = row.original
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='h-8 w-8 p-0'>
                {createdBy ? createdBy : <MoreHorizontal className='h-4 w-4' />}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>AAA</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(id)}>Copy event ID</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>BBB</DropdownMenuItem>
              <DropdownMenuItem>CCC</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]
  const table = useReactTable({
    columns,
    data: events,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    initialState: { pagination: { pageSize: 20 } },
    state: { columnFilters, sorting },
  })
  const handleCreateEvent = () => {
    navigate('/events/create')
  }
  return (
    <>
      <div className='grid justify-end' onClick={handleCreateEvent}>
        Create event
      </div>
      <div className='flex items-center py-4'>
        <Input
          placeholder='Filter name...'
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
          className='max-w-sm'
        />
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className='h-24 text-center'>
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className='flex items-center justify-end space-x-2 py-4'>
        <Button variant='outline' size='sm' onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          Previous
        </Button>
        <Button variant='outline' size='sm' onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Next
        </Button>
      </div>
    </>
  )
}

export { EventList as default }
