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

  Product: {
    categories: async (parent) => {
      try {
        console.log("Parent product ID:", parent.id);
        const product = await prisma.product.findUnique({
          where: {
            id: parent.id,
          },
          include: { 
            categories: true,
          },
        });
        const categories = product.categories; 
        return categories;
      } catch (error) {
        console.error("Error fetching categories:", error);
        return []; 
      }
    },
  },
};