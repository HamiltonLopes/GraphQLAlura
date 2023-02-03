const userResolvers = {
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
			user,
			{ dataSources: { usersAPI } }
		) => usersAPI.addUser(user),

		updateUser: (
			_root,
			user,
			{ dataSources: { usersAPI } }
		) => usersAPI.updateUser(user),

		deleteUser: (
			_root,
			{ id },
			{ dataSources: { usersAPI } }
		) => usersAPI.deleteUser(id),
	},
}
module.exports = userResolvers
