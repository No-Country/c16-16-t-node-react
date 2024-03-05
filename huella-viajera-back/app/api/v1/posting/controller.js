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
    const result = await prisma.posting.create({
      data: {
        title: body.title,
        description: body.description,
        initialDate: body.initialDate,
        finalDate: body.finalDate,
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
    const result = await prisma.posting.findMany({
      where: {
        ownerPetId,
      },
      include: {
        requests: {
          include: {
            Carer: {
              select: {
                id: true,
                name: true,
                image: true,
                ratings: true,
              },
            },
          },
        },
      },
    });

    res.json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const list = async (req, res, next) => {
  try {
    const result = await prisma.posting.findMany({
      include: {
        requests: true,
        OwnerPet: {
          select: {
            photos: true,
            name: true,
            address: true,
            phone: true,

            image: true,
            country: true,
            city: true,
            pets: true,
          },
        },
      },

      orderBy: {
        createdAt: "desc",
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
    const result = await prisma.posting.findUnique({
      where: {
        id,
      },
    });

    if (result === null) {
      return next({
        message: "Posting not found",
        status: 404,
      });
    } else {
      req.data = result;
      next();
    }
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

  if (typeUser !== "ownerPet") {
    return next({
      message: "No autorizado para realizar esta acción",
      status: 403,
    });
  }

  try {
    const result = await prisma.posting.update({
      where: {
        id,
      },
      data: {
        title: body.title,
        description: body.description,
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
    const result = await prisma.posting.delete({
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
