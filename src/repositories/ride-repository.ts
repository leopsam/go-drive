import { prisma } from "./../config/database";

async function getAll() {
  return prisma.user.findMany();
}

export default {
    getAll,
  };