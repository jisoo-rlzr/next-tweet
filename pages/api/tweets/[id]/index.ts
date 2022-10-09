import db from "@lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { withSession } from "@lib/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  const {
    query: { id },
    session: { user }
  } = req;

  if (!user) {
    return res.status(401).json({
      ok: false,
      error: "Please login."
    });
  }

  const tweet = await db.tweet.findUnique({
    where: {
      id: +id!.toString()
    },
    include: {
      user: {
        select: {
          id: true,
          name: true
        }
      }
    }
  });
  const isLiked = Boolean(
    await db.like.findFirst({
      where: {
        tweetId: tweet?.id,
        userId: user?.id
      },
      select: {
        id: true
      }
    })
  );
  return res.status(200).json({
    ok: true,
    tweet,
    isLiked
  });
}

export default withSession(handler);
