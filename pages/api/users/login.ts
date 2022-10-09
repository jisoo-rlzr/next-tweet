import db from "@lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { withSession } from "@lib/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { email } = req.body;
  const user = await db.user.findUnique({
    where: { email }
  });

  if (user) {
    req.session.user = {
      id: user.id
    };
    await req.session.save();
  }

  return res.status(200).json({
    ok: user != null
  });
}

export default withSession(handler);
