import { gql } from "graphql-tag";

export const userType = gql`
  scalar DateTime

  type User {
    id: ID!
    name: String!
    email: String!
    role: Role!
    balance: Float!
    createdAt: DateTime!
    orders: [Order!]! # Add this line
  }

  type Order {
    id: ID!
    total: Float!
  }

  enum Role {
    CUSTOMER
    ADMIN
  }

  extend type Query {
    getUsers: [User]!
    getUser(id: ID!): User
  }

  extend type Mutation {
    registerUser(name: String!, email: String!, password: String!): User
  }
`;