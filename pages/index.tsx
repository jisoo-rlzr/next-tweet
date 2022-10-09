import React from "react";
import { NextPage } from "next";
import useUser from "@lib/useUser";
import useSWR from "swr";
import Link from "next/link";
import { Tweet } from "@prisma/client";

export interface TweetWithInfo extends Tweet {
  user: { name: string };
  _count: { likes: number };
}

interface Response {
  ok: boolean;
  tweets: TweetWithInfo[];
}

const Home: NextPage = () => {
  const { user, isLoading } = useUser();
  const { data } = useSWR<Response>("/api/tweets");

  if (isLoading) {
    return <div>Checking login status...</div>;
  }

  if (!user) return null;

  return (
    <div className="bg-blue-100 min-h-screen p-4 space-y-2">
      {data?.tweets?.length === 0 && (
        <div className="mt-[30vh] text-center text-blue-800 font-semibold">
          There is no tweet yet.
          <br />
          Send the first tweet now!
        </div>
      )}
      {data?.tweets?.map((tweet, i) => (
        <Link key={i} href={`tweet/${tweet.id}`}>
          <a className="block bg-white rounded-md shadow-sm p-4">
            <div>
              <p>{tweet.content}</p>
              <div className="flex justify-between mt-5 text-sm">
                <span>
                  {tweet.user.name}
                  <span className="text-xs ml-3">
                    {new Date(
                      tweet.updatedAt || tweet.createdAt
                    ).toLocaleString()}
                  </span>
                </span>
                <div className="flex items-center gap-1 text-xs">
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {tweet._count.likes}
                </div>
              </div>
            </div>
          </a>
        </Link>
      ))}
      <WriteButton />
    </div>
  );
};

const WriteButton = () => (
  <Link href="/tweet/write">
    <a className="fixed hover:bg-blue-700 border-0 aspect-square border-transparent transition-colors cursor-pointer  bottom-24 right-5 shadow-xl bg-blue-800 rounded-full w-14 flex items-center justify-center text-white">
      <svg
        className="w-6 h-6"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
      </svg>
    </a>
  </Link>
);

export default Home;
