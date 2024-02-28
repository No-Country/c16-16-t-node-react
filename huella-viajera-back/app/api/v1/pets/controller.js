import { prisma } from "../../../database.js";
import { uploadFiles } from "../../uploadsFiles/uploads.js";
import fs from "fs";

export const add = async (req, res, next) => {
  const { body = {}, decoded = {}, files } = req;
  const { typeUser, idTypeUser: ownerPetId } = decoded;

  if (typeUser !== "ownerPet") {
    return next({
      message: "No autorizado para realizar esta acción",
      status: 403,
    });
  }

  try {
    const promises = files.map((file) => {
      return uploadFiles(file.path);
    });
    const image = await Promise.all(promises);

    // elimino los archivos temporales
    files.forEach((file) => fs.unlinkSync(file.path));

    const result = await prisma.pet.create({
      data: {
        ...body,
        age: parseInt(body.age),
        weight: parseInt(body.weight),
        ownerPetId,
        image: image[0].url,
      },
    });

    res.json({
      data: result,
    });
  } catch (error) {
    files.forEach((file) => fs.unlinkSync(file.path));
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
  const { body = {}, decoded = {}, files } = req;
  const { id } = req.params;
  const { typeUser } = decoded;

  if (typeUser !== "ownerPet") {
    return next({
      message: "No autorizado para realizar esta acción",
      status: 403,
    });
  }

  try {
    const newData = {
      ...body,
      // age: parseInt(body.age),
      // weight: parseInt(body.weight),
      ...(body.age && { age: parseInt(body.age) }),
      ...(body.weight && { weight: parseInt(body.weight) }),
    };
    if (files.length > 0) {
      const promises = files.map((file) => {
        return uploadFiles(file.path);
      });
      const image = await Promise.all(promises);
      newData.image = image[0].url;
    }

    const result = await prisma.pet.update({
      where: {
        id,
      },
      data: {
        ...newData,
        updatedAt: new Date(),
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
