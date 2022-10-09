import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

const Write: NextPage = () => {
  const router = useRouter();

  const onSubmit = e => {
    e.preventDefault();
    const { content } = e.target;
    if (!content.value || content.value.length < 5) {
      return alert("Please write more content.");
    }

    const params = {
      content: content.value.trim()
    };
    fetch("/api/tweets/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(params)
    })
      .then(res => res.json())
      .then(json => {
        if (json.ok) {
          router.replace("/");
        } else {
          alert(json.message);
        }
      })
      .catch(() => alert("something went wrong."));
  };

  return (
    <div className="h-[90vh] flex flex-col items-center justify-center">
      <form onSubmit={onSubmit} className="w-1/2 min-w-[300px]">
        <textarea name="content" rows={3} className="w-full resize-none" />
        <button
          type="submit"
          className="mt-8 mx-auto block bg-blue-800 hover:bg-blue-700 py-2 px-28 rounded-lg text-white"
        >
          Send
        </button>
      </form>
      <Link href="/">
        <a className="mt-4 mx-auto block text-gray-400 hover:text-blue-800">
          Cancel
        </a>
      </Link>
    </div>
  );
};

export default Write;
