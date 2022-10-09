import db from "lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { withSession } from "@lib/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
    session: { user }
  } = req;

  const exist = await db.like.findFirst({
    where: {
      tweetId: +id!.toString(),
      userId: user?.id
    }
  });

  if (exist) {
    await db.like.delete({
      where: {
        id: exist.id
      }
    });
  } else {
    await db.like.create({
      data: {
        user: {
          connect: {
            id: user?.id
          }
        },
        tweet: {
          connect: {
            id: +id!.toString()
          }
        }
      }
    });
  }

  res.json({ ok: true });
}

export default withSession(handler);
