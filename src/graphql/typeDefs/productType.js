import { gql } from "graphql-tag";

export const productType = gql`
  type Product {
    id: ID!
    name: String!
    description: String!
    price: Float!
    stock: Int!
    createdAt: String!
  }

  extend type Query {
    getProducts: [Product]!
    getProduct(id: ID!): Product
  }

  extend type Mutation {
    createProduct(name: String!, description: String!, price: Float!, stock: Int!): Product
  }
`;