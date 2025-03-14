import { mergeResolvers } from "@graphql-tools/merge";
import { userResolvers } from "./userResolver.js";
import { productResolvers } from "./productResolver.js";
import { DateTime } from './dateTimeScalar.js';

const dateTimeResolvers = {
    DateTime, 
};

export const resolvers = mergeResolvers([userResolvers, productResolvers, dateTimeResolvers]);