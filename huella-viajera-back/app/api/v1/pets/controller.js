import { prisma } from "../../../database.js";

export const add = async (req, res, next) => {
  const { body = {}, decoded = {} } = req;
  const { typeUser, idTypeUser: ownerPetId } = decoded;

  if (typeUser !== "ownerPet") {
    return next({
      message: "No autorizado para realizar esta acción",
      status: 403,
    });
  }

  try {
    const result = await prisma.pet.create({
      data: {
        ...body,
        ownerPetId,
      },
    });

    res.json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const all = async (req, res, next) => {
  const { decoded = {} } = req;
  const { idTypeUser: ownerPetId } = decoded;

  console.log("ownerPetId", ownerPetId);
  try {
    const result = await prisma.pet.findMany({
      where: {
        ownerPetId,
      },
    });

    res.json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
export const id = async (req, res, next) => {
  const { params = {} } = req;
  const { id } = params;

  try {
    const result = await prisma.pet.findUnique({
      where: {
        id,
      },
    });

    if (result === null) {
      return next({
        message: "Pet not found",
        status: 404,
      });
    } else req.data = result;
    next();
  } catch (error) {
    next(error);
  }
};
export const read = async (req, res, next) => {
  res.json({
    data: req.data,
  });
};
export const update = async (req, res, next) => {
  const { body = {}, decoded = {} } = req;
  const { id } = req.params;
  const { typeUser } = decoded;

  if (typeUser !== "ownerPet") {
    return next({
      message: "No autorizado para realizar esta acción",
      status: 403,
    });
  }

  try {
    const result = await prisma.pet.update({
      where: {
        id,
      },
      data: {
        ...body,
      },
    });

    console.log("result", result);

    res.json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
export const remove = async (req, res, next) => {
  const { decoded = {} } = req;
  const { typeUser } = decoded;
  const { id } = req.params;

  if (typeUser !== "ownerPet") {
    return next({
      message: "No autorizado para realizar esta acción",
      status: 403,
    });
  }

  try {
    const result = await prisma.pet.delete({
      where: {
        id,
      },
    });

    res.json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
