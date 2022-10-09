import Input from "components/input";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

const Login: NextPage = () => {
  const router = useRouter();

  const onSubmit = e => {
    e.preventDefault();
    const {
      email: { value }
    } = e.target;
    if (!value) return;

    fetch("/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: value })
    })
      .then(res => res.json())
      .then(json => {
        if (json.ok) {
          router.replace("/");
        } else {
          alert("No such user.");
        }
      })
      .catch(() => alert("something went wrong."));
  };

  return (
    <div className="h-[90vh] flex flex-col items-center justify-center">
      <h1 className="font-extrabold text-2xl mb-8">Good to see you back!</h1>
      <form onSubmit={onSubmit}>
        <Input
          label="Email"
          inputProps={{ type: "email", name: "email", required: true }}
        />
        <button
          type="submit"
          className="mt-8 mx-auto block bg-blue-800 hover:bg-blue-700 py-2 px-32 rounded-lg text-white"
        >
          Login
        </button>
      </form>
      <Link href="/create-account">
        <a className="mt-2 mx-auto block border border-blue-800 hover:bg-blue-700 py-2 px-16 rounded-lg text-blue-800 hover:text-white">
          I don't have an account
        </a>
      </Link>
    </div>
  );
};

export default Login;
