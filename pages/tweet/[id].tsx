import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { TweetWithInfo } from "pages";
import useSWR from "swr";

interface Response {
  ok: boolean;
  tweet: TweetWithInfo;
  isLiked: boolean;
}

const TweetDetail: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, mutate } = useSWR<Response>(id ? `/api/tweets/${id}` : null);

  if (!data?.tweet) {
    return <div>Loading the tweet...</div>;
  }

  const { tweet, isLiked } = data;

  const onLikeClick = () => {
    toggleLike();
    mutate({ ...data, isLiked: !data.isLiked }, false);
  };

  const toggleLike = () => {
    fetch(`/api/tweets/${id}/like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: "{}"
    });
  };

  const {
    content,
    createdAt,
    updatedAt,
    user: { name }
  } = tweet;
  return (
    <div className="bg-blue-100 min-h-screen p-4 block">
      <div className="border-b p-4 bg-white rounded-md shadow-sm">
        <span>
          {name}
          <span className="text-xs ml-3">
            {new Date(updatedAt || createdAt).toLocaleString()}
          </span>
        </span>
        <p className="mt-4 text-lg">{content}</p>
        <div className="flex justify-between text-sm">
          <button
            onClick={onLikeClick}
            className="bg-gray-100 mt-6 rounded-md px-4 py-1"
          >
            {isLiked ? (
              <div className="flex items-center gap-1">
                <svg
                  className="w-4 h-4 fill-blue-800"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  />
                </svg>
                Unlike
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <svg
                  className="h-4 w-4 stroke-blue-800"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                Like
              </div>
            )}
          </button>
          <Link href="/">
            <a className="bg-gray-100 mt-6 rounded-md px-4 py-1">Back</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TweetDetail;
