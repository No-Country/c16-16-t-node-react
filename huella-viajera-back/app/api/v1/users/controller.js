import { prisma } from "../../../database.js";
import { signToken } from "../auth.js";
import { encryptPassword, verifyPassword } from "./model.js";

export const signup = async (req, res, next) => {
  const { body } = req;
  const { userData, dataTypeUser } = body;
  console.log(userData);

  if (
    userData.role !== "ownerPet" &&
    userData.role !== "carer" &&
    userData.role !== "Admin"
  ) {
    return next({
      message: "Invalid role",
      status: 400,
    });
  }

  try {
    const password = await encryptPassword(body.userData.password);

    const user = await prisma.user.create({
      data: {
        ...userData,
        password,
      },
    });

    console.log("user", user);

    if (user) {
      if (userData.role === "ownerPet") {
        const owner = await prisma.ownerPet.create({
          data: {
            userId: user.id,
            ...dataTypeUser,
          },
        });
      } else if (userData.role === "carer") {
        const carer = await prisma.carer.create({
          data: {
            userId: user.id,
            ...dataTypeUser,
          },
        });
      }
      res.status(201);
      res.json({
        data: "User created successfully",
      });
    }
  } catch (error) {
    next({
      message: "Error creating user",
      status: 400,
      error,
    });
  }
};

export const signin = async (req, res, next) => {
  const { body } = req;
  const { email, password } = body;

  console.log(body);

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
        email: true,
        password: true,
        role: true,
        carer: true,
        ownerPet: true,
      },
    });

    if (user === null) {
      return next({
        message: "Invalid credentials",
        status: 401,
      });
    }
    const passwordMatch = await verifyPassword(password, user.password);

    if (!passwordMatch) {
      return next({
        message: "Invalid credentials",
        status: 401,
      });
    }

    const token = signToken({
      id: user.id,
      typeUser: user.role,
      idTypeUser:
        user.role === "Admin"
          ? null
          : user.role === "ownerPet"
          ? user.ownerPet.id
          : user.carer.id,
    });

    console.log("token", token);

    res.json({
      data: { ...user, password: undefined },
      meta: {
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const id = async (req, res, next) => {
  const { params = {} } = req;
  const { id } = params;

  try {
    const result = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (result === null) {
      next({ message: "User not found", status: 404 });
    } else {
      req.result = result;
      next();
    }
  } catch (error) {
    next(error);
  }
};

export const all = (req, res) => {
  res.json({
    data: [],
  });
};

export const read = (req, res, next) => {
  res.json({
    data: req.result,
  });
};
export const update = (req, res) => {
  res.json({
    data: {},
  });
};
export const remove = (req, res) => {
  res.status(204);
  res.end();
};
