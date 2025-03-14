import prisma from "../../config/prismaClient.js";

export const productResolvers = {
  Query: {
    getProducts: async () => await prisma.product.findMany(),
    getProduct: async (_, { id }) => await prisma.product.findUnique({ where: { id } }),
  },

  Mutation: {
    createProduct: async (_, { name, description, price, stock }) => {
      return await prisma.product.create({
        data: { name, description, price, stock },
      });
    },
  },
};
