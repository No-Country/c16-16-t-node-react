import {prisma} from "../../../database.js";

export const add = async (req, res, next) => {
    const { body = {}, decoded = {} } = req;
    const { typeUser, idTypeUser: carerId } = decoded;

    if (typeUser !== "carer") {
        return next({
            message: "No autorizado para realizar esta acción",
            status: 403,
        });
    }

    try {
        const { postingId } = body;

        // Verificar si el posting al que se quiere postular existe
        const posting = await prisma.posting.findUnique({
            where: {
                id: postingId,
            },
        });

        if (!posting) {
            return next({
                message: "El posting al que intenta postularse no existe",
                status: 404,
            });
        }

        const result = await prisma.request.create({
            data: {
                message: body.message,
                postingId,
                carerId,
            },
        });

        res.json({
            data: result,
        })
    } catch (error) {
        next(error);
    }
};


export const all = async (req, res, next) => {
    const { decoded = {} } = req;
    const { idTypeUser: carerId } = decoded;
  
    console.log("carerId", carerId);
    try {
      const result = await prisma.request.findMany({
        where: {
          carerId,
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
        const result = await prisma.request.findUnique({
            where: {
                id,
            },
        });

        if (result === null) {
            return next({
                message: "request not found",
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

    if (typeUser !== "carer" && typeUser !== "ownerPet") {
        return next({
            message: "No autorizado para realizar esta acción",
            status: 403,
        });
    }

    try {
        const result = await prisma.request.update({
            where: {
                id,
            },
            data: {
                message: body.message,
                status: body.status,
            },
        });

        console.log("result", result);

        res.json({
            data: result,
        });
    } catch(error) {
        next(error);
    }
};


export const remove = async (req, res, next) => {
    const { decoded = {} } = req;
    const { typeUser } = decoded;
    const { id } = req.params;

    if (typeUser !== "carer") {
        return next({
            message: "No autorizado para realizar esta acción",
            status: 403,
        });
    }

    try {
        const result = await prisma.request.delete({
            where: {
                id,
            },
        });

        res.json({
            data: result,
        });
    } catch(error) {
        next(error);
    }
};