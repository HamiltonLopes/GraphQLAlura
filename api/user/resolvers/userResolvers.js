
const userResolvers = {
    Query: {
        users: (_root, _args, { dataSources: { usersAPI } }) => usersAPI.getUsers(),
        user: (_root, { id }, { dataSources: { usersAPI } }) => usersAPI.getUserById(id)
    }
}
module.exports = userResolvers