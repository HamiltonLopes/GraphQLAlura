const {
	RESTDataSource,
} = require('apollo-datasource-rest')

class UsersAPI extends RESTDataSource {
	constructor() {
		super()
		this.baseURL = 'http://localhost:3000'
		this.badRequestResponse = {
			code: 400,
			message: 'Bad request',
		}
		this.internalErrorResponse = {
			code: 500,
			message: 'Internal server Error',
		}
		this.successResponse = {
			code: 200,
			message: 'Operation success',
		}
	}

	async getUsers() {
		const users = await this.get('/users')

		return users.map(async user => ({
			id: user.id,
			name: user.name,
			active: user.active,
			email: user.email,
			role: await this.get(`/roles/${user.role}`),
		}))
	}

	async getUserById(id) {
		try {
			const user = await this.get(`/users/${id}`)

			user.role = await this.get(
				`/roles/${user.role}`
			)

			return {
				...this.successResponse,
				user,
			}
		} catch (error) {
			return {
				...this.badRequestResponse,
				user: null,
			}
		}
	}

	async addUser(user) {
		const users = await this.get('/users')
		user.id = users.length + 1
		const role = await this.get(
			`roles?type=${user.role}`
		)

		user.role = role[0].id
		try {
			await this.post('users', user)
		} catch (error) {
			return {
				...this.internalErrorResponse,
				user: null,
			}
		}
		return {
			code: 201,
			message: 'User was successfully added',
			user: { ...user, role: role[0] },
		}
	}

	async updateUser(user) {
		try {
			const newRole = await this.get(
				`/roles?type=${user.role}`
			)

			await this.put(`/users/${user.id}`, {
				...user,
				role: newRole[0].id,
			})

			return {
				...this.successResponse,
				user: { ...user, role: newRole[0] },
			}
		} catch (error) {
			return {
				...this.badRequestResponse,
				user: null,
			}
		}
	}

	async deleteUser(id) {
		try {
			await this.delete(`/users/${id}`)

			return this.successResponse
		} catch (error) {
			return this.badRequestResponse
		}
	}
}

module.exports = UsersAPI
