import { prisma } from "../../../database.js";

export const id = async (req, res, next) => {
  const { params = {} } = req;
  const { id } = params;
  console.log("id", id);

  try {
    const result = await prisma.carer.findUnique({
      where: {
        id,
      },
      include: {
        ratings: true,
      },
    });

    console.log("result", result);
    if (result === null) {
      return next({
        message: "Carer not found",
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
  const { typeUser } = decoded;
  const { id } = req.params;

  if (typeUser !== "carer") {
    return next({
      message: "No autorizado para realizar esta acción",
      status: 403,
    });
  }

  try {
    const result = await prisma.carer.update({
      where: {
        id,
      },
      data: body,
    });

    res.json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
export const remove = async (req, res, next) => {};
