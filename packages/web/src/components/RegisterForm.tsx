// ---------------------    astro + zod    ------------------------------------------

// import { useState, type ChangeEvent, type FormEvent } from 'react'
// import { ActionError, actions, isActionError, isInputError } from 'astro:actions'

// type InputError = { fields?: Record<string, string[]> }

// const RegisterForm = () => {
//   const [actionError, setActionError] = useState<ActionError>()
//   const [inputError, setInputError] = useState<InputError>()
//   const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
//     event.preventDefault()
//     const formData = new FormData(event.target as HTMLFormElement)
//     const dataObject: Record<string, any> = Object.fromEntries(formData.entries())
//     const { password, terms: _terms, username } = dataObject
//     const terms = Boolean(_terms)
//     const { error } = await actions.user.createUser({ password, terms, username })
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
//     alert(`Registration successful`)
//   }
//   const onChange = (event: ChangeEvent<HTMLInputElement>) => {
//     const { name } = event.target
//     if (!!inputError?.fields?.[name]?.length) {
//       setInputError((prev) => ({ ...prev, fields: { ...prev?.fields, [name]: [] } }))
//     }
//   }

//   return (
//     <form className='grid' onSubmit={onSubmit}>
//       <label className='grid'>
//         Username
//         <input name='username' onChange={onChange} type='text' />
//         {inputError?.fields?.username && <div className='text-red-500'>{inputError?.fields?.username?.join(', ')}</div>}
//       </label>
//       <label className='grid'>
//         Password
//         <input name='password' onChange={onChange} type='text' />
//         {inputError?.fields?.password && <div className='text-red-500'>{inputError?.fields?.password?.join(', ')}</div>}
//       </label>
//       <label className='gap-[10px] grid grid-cols-[auto_1fr]'>
//         <input name='terms' onChange={onChange} type='checkbox' />I agree to the terms of
//         {inputError?.fields?.terms && <div className='text-red-500'>{inputError?.fields?.terms?.join(', ')}</div>}
//       </label>
//       <button>Send</button>
//     </form>
//   )
// }

// export { RegisterForm as default }

// ---------------------    graphql + zod    ------------------------------------------

// import { useState, type ChangeEvent, type FormEvent } from 'react'
// import { graphql } from '../graphql'
// import { execute } from '../graphql/execute'
// import type { CreateUserMutation } from '../graphql/graphql'
// import { createUserInput } from '../types/user'

// type InputError = { fields?: Record<string, string[]> }

// const createUserMutation = graphql(`
//   mutation createUser($password: String!, $username: String!) {
//     createUser(record: { password: $password, username: $username }) {
//       id
//       username
//     }
//   }
// `)

// const RegisterForm = () => {
//   const [inputError, setInputError] = useState<InputError>()
//   const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
//     event.preventDefault()
//     const formData = new FormData(event.target as HTMLFormElement)
//     const dataObject: Record<string, any> = Object.fromEntries(formData.entries())
//     const { password, terms: _terms, username } = dataObject
//     const terms = Boolean(_terms)
//     const { error, success } = createUserInput.safeParse({ password, terms, username })
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
//     const { data, errors } = (await execute(createUserMutation, { password, username })) as { data?: CreateUserMutation; errors?: [any] }
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
//     alert(`Registration successful`)
//   }
//   const onChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name } = event.target
//     if (!!inputError?.fields?.[name]?.length) {
//       setInputError((prev) => ({ ...prev, fields: { ...prev?.fields, [name]: [] } }))
//     }
//   }
//   return (
//     <form className='grid' onSubmit={onSubmit}>
//       <label className='grid'>
//         Username
//         <input name='username' onChange={onChange} type='text' />
//         {inputError?.fields?.username && <div className='text-red-500'>{inputError?.fields?.username?.join(', ')}</div>}
//       </label>
//       <label className='grid'>
//         Password
//         <input name='password' onChange={onChange} type='text' />
//         {inputError?.fields?.password && <div className='text-red-500'>{inputError?.fields?.password?.join(', ')}</div>}
//       </label>
//       <label className='gap-[10px] grid grid-cols-[auto_1fr]'>
//         <input name='terms' onChange={onChange} type='checkbox' />I agree to the terms of
//         {inputError?.fields?.terms && <div className='text-red-500'>{inputError?.fields?.terms?.join(', ')}</div>}
//       </label>
//       <button>Submit</button>
//     </form>
//   )
// }

// export { RegisterForm as default }

// ---------------------    react-hook-form + zod    ------------------------------------------

// import { zodResolver } from '@hookform/resolvers/zod'
// import { actions, isActionError } from 'astro:actions'
// import { type FormEvent } from 'react'
// import { useForm } from 'react-hook-form'
// import { createUserInput, type CreateUserInputType } from '../types/user'

// const RegisterForm = () => {
//   const {
//     formState: { errors },
//     handleSubmit,
//     register,
//   } = useForm<CreateUserInputType>({ resolver: zodResolver(createUserInput) })
//   const onSubmit = (event: FormEvent<HTMLFormElement>) => {
//     event.preventDefault()
//     handleSubmit(async (data) => {
//       const { password, terms: _terms, username } = data
//       const terms = Boolean(_terms)
//       const { error } = await actions.user.createUser({ password, terms, username })
//       if (error) {
//         const { message, status, type } = error
//         console.error(error)
//         if (isActionError(error)) {
//           alert(`${status} ${type}: ${message}`)
//         }
//         return
//       }
//       ;(event.target as HTMLFormElement).reset()
//       alert(`Registration successful`)
//     })()
//   }

//   return (
//     <form className='grid' onSubmit={onSubmit}>
//       <label className='grid'>
//         Username
//         <input {...register('username', { required: true })} />
//         {errors.username && <div className='text-red-500'>{errors.username.message}</div>}
//       </label>
//       <label className='grid'>
//         Password
//         <input {...register('password', { required: true })} />
//         {errors.password && <div className='text-red-500'>{errors.password.message}</div>}
//       </label>
//       <label className='gap-[10px] grid grid-cols-[auto_1fr]'>
//         <input {...register('terms', { required: true })} type='checkbox' />I agree to the terms of service
//         {errors.terms && <div className='text-red-500'>{errors.terms.message}</div>}
//       </label>
//       <button type='submit'>Submit</button>
//     </form>
//   )
// }

// export { RegisterForm as default }

// ---------------------    react-hook-form + zod + graphql (urql)    ------------------------------------------

import { zodResolver } from '@hookform/resolvers/zod'
import { type FormEvent } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from 'urql'
import UrqlProvider from '../components/UrqlProvider'
import { graphql } from '../gql'
import { createUserInput, type CreateUserInputType } from '../types/user'

const createUserMutation = graphql(`
  mutation createUser($password: String!, $username: String!) {
    createUser(record: { password: $password, username: $username }) {
      id
      username
    }
  }
`)

const RegisterForm = () => {
  return (
    <UrqlProvider>
      <RegisterFormContent />
    </UrqlProvider>
  )
}

const RegisterFormContent = () => {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<CreateUserInputType>({ resolver: zodResolver(createUserInput) })
  const [createUserResult, createUser] = useMutation(createUserMutation)
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    handleSubmit(async (data) => {
      const { password, terms: _terms, username } = data
      const { error } = await createUser({ password, username })
      const { graphQLErrors, networkError } = error ?? {}
      if (networkError) {
        console.error(networkError)
        const { message, name } = networkError
        alert(`${name}: ${message}`)
        return
      }
      if (graphQLErrors) {
        const errorMessages = graphQLErrors.map((graphQLError) => {
          console.error(graphQLError)
          const { message, name } = graphQLError
          return `${name}: ${message}`
        })
        alert(errorMessages.join('\n'))
        return
      }
      ;(event.target as HTMLFormElement).reset()
      alert(`Registration successful`)
    })()
  }

  return (
    <form className='grid' onSubmit={onSubmit}>
      <label className='grid'>
        Username
        <input {...register('username', { required: true })} />
        {errors.username && <div className='text-red-500'>{errors.username.message}</div>}
      </label>
      <label className='grid'>
        Password
        <input {...register('password', { required: true })} />
        {errors.password && <div className='text-red-500'>{errors.password.message}</div>}
      </label>
      <label className='gap-[10px] grid grid-cols-[auto_1fr]'>
        <input {...register('terms', { required: true })} type='checkbox' />I agree to the terms of service
        {errors.terms && <div className='text-red-500'>{errors.terms.message}</div>}
      </label>
      <button type='submit'>Submit</button>
    </form>
  )
}

export { RegisterForm as default }
