import db from "@lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { withSession } from "@lib/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }
  if (!req.session.user) {
    return res.status(401).json({
      ok: false,
      error: "Please login."
    });
  }

  const tweets = await db.tweet.findMany({
    orderBy: {
      createdAt: "desc"
    },
    include: {
      user: {
        select: {
          name: true
        }
      },
      _count: {
        select: {
          likes: true
        }
      }
    }
  });
  return res.status(200).json({
    ok: true,
    tweets
  });
}

export default withSession(handler);
