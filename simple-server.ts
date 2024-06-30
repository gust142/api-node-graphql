import { ApolloServer, gql } from "apollo-server";
import {randomUUID} from 'node:crypto';
 
const TypeDefs = gql` 
    type User{
        id: String!
        name: String!
    }

    type Query {
        users: [User!]!
    }

    type Mutation {
        createUser(name:String!):User!
    }
`
var users: User[] = [];

interface User {
    id:string,
    name:string
}

const server = new ApolloServer({
    typeDefs:TypeDefs,
    resolvers:{
        Query:{
            users:()=>{
                return users;
            }
        },
        Mutation:{
            createUser:(_,args)=>{
                const user = {
                    id: randomUUID(),
                    name:args.name
                }
                users.push(user);
                return user;
            }
        }
    }
});

server.listen().then(({url})=>{
    console.log(`Rodando servidor HTTP na url ${url}`);
})