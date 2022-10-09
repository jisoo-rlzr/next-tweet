import db from "@lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { withSession } from "@lib/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const {
    body: { content },
    session: { user }
  } = req;

  if (!user) {
    return res.status(401).json({
      ok: false,
      error: "Please login."
    });
  }

  const tweet = await db.tweet.create({
    data: {
      content,
      user: {
        connect: {
          id: user?.id
        }
      }
    }
  });
  return res.status(200).json({
    ok: true,
    tweet
  });
}

export default withSession(handler);
