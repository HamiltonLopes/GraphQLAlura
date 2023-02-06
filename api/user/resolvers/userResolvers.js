const { GraphQLScalarType } = require('graphql')

const userResolvers = {
	RolesType: {
		ESTUDANTE: 'ESTUDANTE',
		DOCENTE: 'DOCENTE',
		COORDENACAO: 'COORDENACAO'
	},

	DateTime: new GraphQLScalarType({
		name: 'DateTime',
		description: 'Date string with date and hour on ISO-8601 format',
		serialize: (value) => value.toISOString(),
		parseValue: (value) => new Date(value),
		parseLiteral: (ast) => new Date(ast.value)
	}),

	Query: {
		users: (
			_root,
			_args,
			{ dataSources: { usersAPI } }
		) => usersAPI.getUsers(),
		user: (
			_root,
			{ id },
			{ dataSources: { usersAPI } }
		) => usersAPI.getUserById(id),
	},

	Mutation: {
		addUser: (
			_root,
			{ user },
			{ dataSources: { usersAPI } }
		) => usersAPI.addUser(user),

		updateUser: (
			_root,
			user,
			{ dataSources: { usersAPI } }
		) => usersAPI.updateUser({ id: user.id, ...user.user }),

		deleteUser: (
			_root,
			{ id },
			{ dataSources: { usersAPI } }
		) => usersAPI.deleteUser(id),
	},
}
module.exports = userResolvers
