import db from "@lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { withSession } from "@lib/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  const id = req.session.user?.id;
  const user = await db.user.findUnique({
    where: { id }
  });

  if (user) {
    req.session.user = {
      id: user.id
    };
    await req.session.save();
  }

  return res.status(200).json({
    ok: user != null,
    profile: user
  });
}

export default withSession(handler);
