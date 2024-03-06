import { prisma } from "../../../database.js";
import { uploadFiles } from "../../uploadsFiles/uploads.js";
import fs from "fs";

export const id = async (req, res, next) => {
  const { params = {} } = req;
  const { id } = params;
  console.log("id", id);

  try {
    const result = await prisma.ownerPet.findUnique({
      where: {
        id,
      },
      include: {
        ratings: {
          where: {
            destination: "ownerPet",
          },
          include: {
            Carer: true,
          },
        },
        photos: true,
        pets: true,
      },
    });

    console.log("result", result);
    if (result === null) {
      return next({
        message: "Owner not found",
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
  const { typeUser } = decoded;
  const { id } = req.params;

  if (typeUser !== "ownerPet") {
    return next({
      message: "No autorizado para realizar esta acción",
      status: 403,
    });
  }

  try {
    let newData = {
      ...body,
    };

    if (files.length > 0) {
      const promises = files.map((file) => uploadFiles(file.path));
      const images = await Promise.all(promises);

      const fotosCloudinary = [];
      images.forEach((element) => {
        fotosCloudinary.push({ image: element.url });
      });

      files.forEach((file) => {
        fs.unlinkSync(file.path);
      });
      newData = {
        ...newData,
        photos: {
          deleteMany: {},
          create: fotosCloudinary,
        },
      };
    }

    const result = await prisma.ownerPet.update({
      where: {
        id,
      },
      data: { ...newData },
    });

    res.json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
export const remove = async (req, res, next) => {};

export const updateProfilePhoto = async (req, res, next) => {
  const { decoded = {}, files } = req;
  const { typeUser } = decoded;
  const { id } = req.params;

  if (files === undefined || files?.length === 0) {
    return next({
      message: "No se ha enviado ninguna imagen",
      status: 400,
    });
  }

  if (typeUser !== "ownerPet") {
    return next({
      message: "No autorizado para realizar esta acción",
      status: 403,
    });
  }

  try {
    const promises = files.map((file) => uploadFiles(file.path));
    const images = await Promise.all(promises);
    files.forEach((file) => {
      fs.unlinkSync(file.path);
    });

    const result = await prisma.ownerPet.update({
      where: {
        id,
      },
      data: {
        image: images[0].url,
      },
    });

    res.json({
      data: result,
    });
  } catch (error) {
    files.forEach((file) => {
      fs.unlinkSync(file.path);
    });
    next(error);
  }
};
