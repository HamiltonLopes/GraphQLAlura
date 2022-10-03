import { ApolloServer, gql } from 'apollo-server';

const users = [
    {
        nome: "Joao",
        ativo: true
    },
    {
        nome: "Carla",
        ativo: false
    }
];

const typeDefs = gql`
    type User {
        nome: String! #! = notnull
        ativo: Boolean!
        email: String
    }
`;


const server = new ApolloServer({typeDefs, resolvers});