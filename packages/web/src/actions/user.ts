import { defineAction } from 'astro:actions'
// import { graphql } from '../graphql'
import { createUserInput, getUserInput } from '../types/user'
// import { execute } from '../graphql/execute'

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
// const createUserMutation = graphql(`
//   mutation createUser($password: String!, $role: String!, $username: String!) {
//     createUser(record: { password: $password, role: $role, username: $username }) {
//       id
//       createdAt
//       role
//       username
//     }
//   }
// `)

const user = {
  createUser: defineAction({
    input: createUserInput,
    handler: async (input, context) => {
      const { password, username } = input
      try {
        const createdUser = await context.locals.runtime.env.USER.createUser({ data: { password, username } })
        return createdUser
      } catch (error) {
        console.error('createdUser')
        console.error(error)
        throw error
      }
    },
  }),
  createUserGql: defineAction({
    input: createUserInput,
    handler: async (input, context) => {
      const { password, username } = input
      try {
        // const data = await execute(createUserMutation, {
        //   password,
        //   role: 'photographer',
        //   username,
        // })
        // return data
      } catch (error) {
        console.error('createUserGql')
        console.error(error)
        throw error
      }
    }
  }),
  getUser: defineAction({
    input: getUserInput,
    handler: async (input, context) => {
      const { id } = input
      try {
        const users = await context.locals.runtime.env.USER.getUser({ id })
        return users
      } catch (error) {
        console.error('getUser')
        console.error(error)
        throw error
      }
    },
  }),
}

export { user }
