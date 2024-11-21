import rideRepositories from "./../repositories/ride-repository";

async function getAllUser() {
  return await rideRepositories.getAll();
}

export default {
    getAllUser,
  };