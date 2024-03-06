import { prisma } from "../../../database.js";

export const create = async (req, res, next) => {
  const { body = {}, decoded = {} } = req;
  const { typeUser, idTypeUser } = decoded;
  let carerId = null;
  let ownerPetId = null;

  if (typeUser === "ownerPet") {
    ownerPetId = idTypeUser;
    carerId = body.carerId;
  } else if (typeUser === "carer") {
    carerId = idTypeUser;
    ownerPetId = body.ownerPetId;
  } else {
    return res
      .status(400)
      .json({ message: "No tiene permisos para realizar esta acción" });
  }

  try {
    const rating = await prisma.rating.create({
      data: {
        value: body.value,
        comment: body.comment,
        carerId,
        ownerPetId,
        destination: typeUser,
      },
    });

    return res.json({ data: rating });
  } catch (error) {
    next(error);
  }
};
