import { gql } from "graphql-tag";

export const productType = gql`
  scalar DateTime

  type Product {
    id: ID!
    name: String!
    description: String!
    price: Float!
    stock: Int!
    createdAt: DateTime!
    categories: [Category!]! # This line is crucial
  }

  type Category {
      id: ID!
      name: String!
  }

  extend type Query {
    getProducts: [Product]!
    getProduct(id: ID!): Product
  }

  extend type Mutation {
    createProduct(name: String!, description: String!, price: Float!, stock: Int!): Product
  }
`;