import prisma from "../../config/prismaClient.js";

export const userResolvers = {
  Query: {
    getUsers: async () => await prisma.user.findMany(),
    getUser: async (_, { id }) => await prisma.user.findUnique({ where: { id } }),
  },
  Mutation: {
    registerUser: async (_, { name, email, password }) => {
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) throw new Error("User already exists");

      return await prisma.user.create({
        data: { name, email, password },
      });
    },
  },
};
