import { gql } from "graphql-tag";
import { userType } from "./userType.js";
import { productType } from "./productType.js";

const rootTypeDefs = gql`
    scalar DateTime
    type Query {
        _empty: String
    }
    type Mutation {
        _empty: String
    }
`;

export const typeDefs = [
    rootTypeDefs,
    userType,
    productType
];
