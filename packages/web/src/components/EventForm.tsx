// ---------------------    astro + zod    ------------------------------------------

// import { ActionError, actions, isActionError, isInputError } from 'astro:actions'
// import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'

// type InputError = { fields?: Record<string, string[]> }

// const EventForm = () => {
//   const [actionError, setActionError] = useState<ActionError>()
//   const [inputError, setInputError] = useState<InputError>()
//   const [now, setNow] = useState('')
//   const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
//     event.preventDefault()
//     const formData = new FormData(event.target as HTMLFormElement)
//     const dataObject: Record<string, any> = Object.fromEntries(formData.entries())
//     const { endTime, name, startTime, timezone } = dataObject
//     const { data, error } = await actions.event.createEvent({ endTime, name, slug: name.toLowerCase().replace(/\s+/g, '-'), startTime, timezone })
//     if (error) {
//       const { message, status, type } = error
//       console.error(error)
//       if (isActionError(error)) {
//         setActionError(error)
//         alert(`${status} ${type}: ${message}`)
//       }
//       if (isInputError(error)) {
//         setInputError(error)
//       }
//       return
//     }
//     ;(event.target as HTMLFormElement).reset()
//     alert(`Create event (${name}) successful`)
//   }
//   const onChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name } = event.target
//     if (!!inputError?.fields?.[name]?.length) {
//       setInputError((prev) => ({ ...prev, fields: { ...prev?.fields, [name]: [] } }))
//     }
//   }
//   useEffect(() => {
//     const current = new Date()
//     current.setHours(0, 0, 0, 0)
//     const timezoneOffset = current.getTimezoneOffset()
//     const localDatetime = new Date(current.getTime() - timezoneOffset * 60 * 1000)
//     const formattedNow = localDatetime.toISOString().slice(0, 19)
//     setNow(formattedNow)
//   }, [])
//   return (
//     <form className='grid' onSubmit={onSubmit}>
//       <label htmlFor='name'>Name</label>
//       <input id='name' name='name' onChange={onChange} type='text' />
//       {inputError?.fields?.name && <div className='text-red-500'>{inputError.fields.name.join(', ')}</div>}
//       <div className='gap-[50px] grid grid-cols-[auto_1fr_auto_1fr]'>
//         <div className='grid'>
//           <label htmlFor='startTime'>Start time</label>
//           <input className='grid justify-start' id='startTime' min={now} name='startTime' onChange={onChange} step={1} type='datetime-local' />
//           {inputError?.fields?.startTime && <div className='text-red-500'>{inputError.fields.startTime.join(', ')}</div>}
//         </div>
//         <div className='grid'>
//           <label htmlFor='endTime'>End time</label>
//           <input className='grid justify-start' id='endTime' min={now} name='endTime' onChange={onChange} step={1} type='datetime-local' />
//           {inputError?.fields?.endTime && <div className='text-red-500'>{inputError.fields.endTime.join(', ')}</div>}
//         </div>
//       </div>
//       <label htmlFor='timezone'>Timezone</label>
//       <select id='timezone' name='timezone' onChange={onChange} required>
//         <option value=''>Select a timezone</option>
//         {Array.from({ length: 25 }, (_, i) => (i < 12 ? `UTC${i - 12}` : i > 12 ? `UTC+${i - 12}` : 'UTC')).map((tz) => (
//           <option key={tz} value={tz}>
//             {tz}
//           </option>
//         ))}
//       </select>
//       {inputError?.fields?.timezone && <div className='text-red-500'>{inputError.fields.timezone.join(', ')}</div>}
//       <button>Create</button>
//     </form>
//   )
// }

// export { EventForm as default }

// ---------------------    graphql + zod    ------------------------------------------

// import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
// import { graphql } from '../graphql'
// import { execute } from '../graphql/execute'
// import type { CreateEventMutation } from '../graphql/graphql'
// import { createEventInput } from '../types/event'

// type InputError = { fields?: Record<string, string[]> }

// const createEventMutation = graphql(`
//   mutation createEvent($endTime: String!, $name: String!, $slug: String!, $startTime: String!, $timezone: String!) {
//     createEvent(record: { endTime: $endTime, name: $name, slug: $slug, startTime: $startTime, timezone: $timezone }) {
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

// const EventForm = () => {
//   const [inputError, setInputError] = useState<InputError>()
//   const [now, setNow] = useState('')
//   const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
//     event.preventDefault()
//     const formData = new FormData(event.target as HTMLFormElement)
//     const dataObject: Record<string, any> = Object.fromEntries(formData.entries())
//     const { endTime, name, startTime, timezone } = dataObject
//     const { error, success } = createEventInput.safeParse({ name, startTime, endTime, timezone })
//     if (!success) {
//       const fieldErrors: Record<string, string[]> = {}
//       error.errors.forEach((error) => {
//         const [field] = error.path ?? []
//         if (field) {
//           if (!fieldErrors[field]) {
//             fieldErrors[field] = []
//           }
//           fieldErrors[field].push(error.message)
//         }
//       })
//       setInputError({ fields: fieldErrors })
//       return
//     }
//     setInputError({})
//     const { data, errors } = await execute(createEventMutation, { endTime, name, slug: name.toLowerCase().replace(/\s+/g, '-'), startTime, timezone }) as { data?: CreateEventMutation; errors?: [any] }
//     if (errors) {
//       const errorMessages = errors.map((error) => {
//         console.error(error)
//         const { message, name = 'graphQLError' } = error
//         return `${name}: ${message}`
//       })
//       alert(errorMessages.join('\n'))
//       return
//     }
//     ;(event.target as HTMLFormElement).reset()
//     alert(`Create event (${name}) successful`)
//   }
//   const onChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name } = event.target
//     if (!!inputError?.fields?.[name]?.length) {
//       setInputError((prev) => ({ ...prev, fields: { ...prev?.fields, [name]: [] } }))
//     }
//   }
//   useEffect(() => {
//     const current = new Date()
//     current.setHours(0, 0, 0, 0)
//     const timezoneOffset = current.getTimezoneOffset()
//     const localDatetime = new Date(current.getTime() - timezoneOffset * 60 * 1000)
//     const formattedNow = localDatetime.toISOString().slice(0, 19)
//     setNow(formattedNow)
//   }, [])
//   return (
//     <form className='grid' onSubmit={onSubmit}>
//       <label htmlFor='name'>Name</label>
//       <input id='name' name='name' onChange={onChange} type='text' />
//       {inputError?.fields?.name && <div className='text-red-500'>{inputError.fields.name.join(', ')}</div>}
//       <div className='gap-[50px] grid grid-cols-[auto_1fr_auto_1fr]'>
//         <div className='grid'>
//           <label htmlFor='startTime'>Start time</label>
//           <input className='grid justify-start' id='startTime' min={now} name='startTime' onChange={onChange} step={1} type='datetime-local' />
//           {inputError?.fields?.startTime && <div className='text-red-500'>{inputError.fields.startTime.join(', ')}</div>}
//         </div>
//         <div className='grid'>
//           <label htmlFor='endTime'>End time</label>
//           <input className='grid justify-start' id='endTime' min={now} name='endTime' onChange={onChange} step={1} type='datetime-local' />
//           {inputError?.fields?.endTime && <div className='text-red-500'>{inputError.fields.endTime.join(', ')}</div>}
//         </div>
//       </div>
//       <label htmlFor='timezone'>Timezone</label>
//       <select id='timezone' name='timezone' onChange={onChange} required>
//         <option value=''>Select a timezone</option>
//         {Array.from({ length: 25 }, (_, i) => (i < 12 ? `UTC${i - 12}` : i > 12 ? `UTC+${i - 12}` : 'UTC')).map((tz) => (
//           <option key={tz} value={tz}>
//             {tz}
//           </option>
//         ))}
//       </select>
//       {inputError?.fields?.timezone && <div className='text-red-500'>{inputError.fields.timezone.join(', ')}</div>}
//       <button>Create</button>
//     </form>
//   )
// }

// export { EventForm as default }

// ---------------------    react-hook-form + zod    ------------------------------------------

// import { zodResolver } from '@hookform/resolvers/zod'
// import { actions, isActionError } from 'astro:actions'
// import { useEffect, useState, type FormEvent } from 'react'
// import { useForm } from 'react-hook-form'
// import { createEventInput, type CreateEventInputType } from '../types/event'

// const EventForm = () => {
//   const form = useForm<CreateEventInputType>({ resolver: zodResolver(createEventInput) })
//   const {
//     formState: { errors },
//     handleSubmit,
//     register,
//   } = form
//   const [now, setNow] = useState('')
//   const onSubmit = (event: FormEvent<HTMLFormElement>) => {
//     event.preventDefault()
//     handleSubmit(async (input) => {
//       const { endTime, name, startTime, timezone } = input
//       const { data, error } = await actions.event.createEvent({ endTime, name, slug: name.toLowerCase().replace(/\s+/g, '-'), startTime, timezone })
//       if (error) {
//         const { message, status, type } = error
//         if (isActionError(error)) {
//           alert(`${status} ${type}: ${message}`)
//         }
//         return
//       }
//       ;(event.target as HTMLFormElement).reset()
//       alert(`Create event (${name}) successful`)
//     })()
//   }
//   useEffect(() => {
//     const current = new Date()
//     current.setHours(0, 0, 0, 0)
//     const timezoneOffset = current.getTimezoneOffset()
//     const localDatetime = new Date(current.getTime() - timezoneOffset * 60 * 1000)
//     const formattedNow = localDatetime.toISOString().slice(0, 19)
//     setNow(formattedNow)
//   }, [])
//   return (
//     <form className='grid' onSubmit={onSubmit}>
//       <label>Name</label>
//       <input {...register('name', { required: true })} />
//       {errors.name && <div className='text-red-500'>{errors.name.message}</div>}
//       <div className='gap-[50px] grid grid-cols-[auto_1fr_auto_1fr]'>
//         <div className='grid'>
//           <label htmlFor='startTime'>Start time</label>
//           <input
//             {...register('startTime', { required: true })}
//             className='grid justify-start'
//             id='startTime'
//             min={now}
//             step={1}
//             type='datetime-local'
//           />
//           {errors.startTime && <div className='text-red-500'>{errors.startTime.message}</div>}
//         </div>
//         <div className='grid'>
//           <label htmlFor='endTime'>End time</label>
//           <input {...register('endTime', { required: true })} className='grid justify-start' id='endTime' min={now} step={1} type='datetime-local' />
//           {errors.endTime && <div className='text-red-500'>{errors.endTime.message}</div>}
//         </div>
//       </div>
//       <label htmlFor='timezone'>Timezone</label>
//       <select {...register('timezone', { required: true })} id='timezone' required>
//         <option value=''>Select a timezone</option>
//         {Array.from({ length: 25 }, (_, i) => (i < 12 ? `UTC${i - 12}` : i > 12 ? `UTC+${i - 12}` : 'UTC')).map((tz) => (
//           <option key={tz} value={tz}>
//             {tz}
//           </option>
//         ))}
//       </select>
//       {errors.timezone && <div className='text-red-500'>{errors.timezone.message}</div>}
//       <button type='submit'>Submit</button>
//     </form>
//   )
// }

// export { EventForm as default }

// ---------------------    react-hook-form + zod + graphql (urql)    ------------------------------------------

// import { zodResolver } from '@hookform/resolvers/zod'
// import { useEffect, useState, type FormEvent } from 'react'
// import { useForm } from 'react-hook-form'
// import { useMutation } from 'urql'
// import UrqlProvider from '../components/UrqlProvider'
// import { graphql } from '../gql'
// import { createEventInput, type CreateEventInputType } from '../types/event'

// const createEventMutation = graphql(`
//   mutation createEvent($endTime: String!, $name: String!, $slug: String!, $startTime: String!, $timezone: String!) {
//     createEvent(record: { endTime: $endTime, name: $name, slug: $slug, startTime: $startTime, timezone: $timezone }) {
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

// const EventForm = () => {
//   return (
//     <UrqlProvider>
//       <EventFormContent />
//     </UrqlProvider>
//   )
// }

// const EventFormContent = () => {
//   const form = useForm<CreateEventInputType>({ resolver: zodResolver(createEventInput) })
//   const {
//     formState: { errors },
//     handleSubmit,
//     register,
//   } = form
//   const [createEventResult, createEvent] = useMutation(createEventMutation)
//   const [now, setNow] = useState('')
//   const onSubmit = (event: FormEvent<HTMLFormElement>) => {
//     event.preventDefault()
//     handleSubmit(async (input) => {
//       const { endTime, name, startTime, timezone } = input
//       const { error } = await createEvent({
//         endTime: `${endTime}`,
//         name,
//         slug: name.toLowerCase().replace(/\s+/g, '-'),
//         startTime: `${startTime}`,
//         timezone,
//       })
//       const { graphQLErrors, networkError } = error ?? {}
//       if (networkError) {
//         console.error(networkError)
//         const { message, name } = networkError
//         alert(`${name}: ${message}`)
//         return
//       }
//       if (graphQLErrors) {
//         const errorMessages = graphQLErrors.map((graphQLError) => {
//           console.error(graphQLError)
//           const { message, name } = graphQLError
//           return `${name}: ${message}`
//         })
//         alert(errorMessages.join('\n'))
//         return
//       }
//       ;(event.target as HTMLFormElement).reset()
//       alert(`Create event (${name}) successful`)
//     })()
//   }
//   useEffect(() => {
//     const current = new Date()
//     current.setHours(0, 0, 0, 0)
//     const timezoneOffset = current.getTimezoneOffset()
//     const localDatetime = new Date(current.getTime() - timezoneOffset * 60 * 1000)
//     const formattedNow = localDatetime.toISOString().slice(0, 19)
//     setNow(formattedNow)
//   }, [])
//   return (
//     <form className='grid' onSubmit={onSubmit}>
//       <label>Name</label>
//       <input {...register('name', { required: true })} />
//       {errors.name && <div className='text-red-500'>{errors.name.message}</div>}
//       <div className='gap-[50px] grid grid-cols-[auto_1fr_auto_1fr]'>
//         <div className='grid'>
//           <label htmlFor='startTime'>Start time</label>
//           <input
//             {...register('startTime', { required: true })}
//             className='grid justify-start'
//             id='startTime'
//             min={now}
//             step={1}
//             type='datetime-local'
//           />
//           {errors.startTime && <div className='text-red-500'>{errors.startTime.message}</div>}
//         </div>
//         <div className='grid'>
//           <label htmlFor='endTime'>End time</label>
//           <input {...register('endTime', { required: true })} className='grid justify-start' id='endTime' min={now} step={1} type='datetime-local' />
//           {errors.endTime && <div className='text-red-500'>{errors.endTime.message}</div>}
//         </div>
//       </div>
//       <label htmlFor='timezone'>Timezone</label>
//       <select {...register('timezone', { required: true })} id='timezone' required>
//         <option value=''>Select a timezone</option>
//         {Array.from({ length: 25 }, (_, i) => (i < 12 ? `UTC${i - 12}` : i > 12 ? `UTC+${i - 12}` : 'UTC')).map((tz) => (
//           <option key={tz} value={tz}>
//             {tz}
//           </option>
//         ))}
//       </select>
//       {errors.timezone && <div className='text-red-500'>{errors.timezone.message}</div>}
//       <button type='submit'>Submit</button>
//     </form>
//   )
// }

// export { EventForm as default }

// ---------------------    shadcn    ------------------------------------------

import { zodResolver } from '@hookform/resolvers/zod'
import { actions, isActionError } from 'astro:actions'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { type FormEvent } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '../components/ui/button'
import { Calendar } from '../components/ui/calendar'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../components/ui/form'
import { Input } from '../components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { cn } from '../lib/utils'
import { createEventInput, type CreateEventInputType } from '../types/event'

const EventForm = () => {
  const form = useForm<CreateEventInputType>({ resolver: zodResolver(createEventInput) })
  const { control, handleSubmit } = form
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    handleSubmit(async (input) => {
      const { endTime, name, startTime, timezone } = input
      const { data, error } = await actions.event.createEvent({ endTime, name, slug: name.toLowerCase().replace(/\s+/g, '-'), startTime, timezone })
      if (error) {
        const { message, status, type } = error
        if (isActionError(error)) {
          alert(`${status} ${type}: ${message}`)
        }
        return
      }
      ;(event.target as HTMLFormElement).reset()
      alert(`Create event (${name}) successful`)
    })()
  }
  return (
    <Form {...form}>
      <form className='grid' onSubmit={onSubmit}>
        <FormField
          control={control}
          defaultValue={''}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder='Name' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          defaultValue={''}
          name='slug'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input placeholder='Slug' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name='startTime'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start time</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button variant={'outline'} className={cn('w-[240px] pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}>
                      {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                      <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0' align='start'>
                  <Calendar
                    mode='single'
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => new Date().setHours(0, 0, 0, 0) > date.getTime()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name='endTime'
          render={({ field }) => (
            <FormItem>
              <FormLabel>End time</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button variant={'outline'} className={cn('w-[240px] pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}>
                      {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                      <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0' align='start'>
                  <Calendar
                    mode='single'
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => new Date().setHours(0, 0, 0, 0) > date.getTime()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name='timezone'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Timezone</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select a timezone' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Array.from({ length: 25 }, (_, i) => (i < 12 ? `UTC${i - 12}` : i > 12 ? `UTC+${i - 12}` : 'UTC')).map((tz) => (
                    <SelectItem key={tz} value={tz}>
                      {tz}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  )
}

export { EventForm as default }
