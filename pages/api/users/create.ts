import db from "@lib/db";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { name, email } = req.body;
  const existUser = await db.user.findUnique({
    where: { email }
  });
  if (existUser) {
    return res.status(200).json({
      ok: false,
      message: "User with the email already exist."
    });
  }

  await db.user.create({
    data: {
      name,
      email
    }
  });
  return res.status(200).json({
    ok: true
  });
}

export default handler;
