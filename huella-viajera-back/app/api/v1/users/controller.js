import { prisma } from "../../../database.js";

export const create = async (req, res) => {
  const { body } = req;

  console.log("body", body);

  try {
    const user = await prisma.user.create({
      data: {
        ...body,
      },
    });

    console.log("user", user);

    res.json({
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const all = (req, res) => {
  res.json({
    data: [],
  });
};

export const read = (req, res) => {
  res.json({
    data: {},
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
