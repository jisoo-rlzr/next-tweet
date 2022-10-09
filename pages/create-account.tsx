import useUser from "@lib/useUser";
import Input from "components/input";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

const CreateAccount: NextPage = () => {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace("/");
    }
  }, [user]);

  if (user) return null;

  const onSubmit = e => {
    e.preventDefault();
    const { name, email } = e.target;
    if (name.value && email.value) {
      const params = {
        name: name.value,
        email: email.value
      };
      fetch("/api/users/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(params)
      })
        .then(res => res.json())
        .then(json => {
          if (json.ok) {
            alert("Account created.");
            router.replace("/log-in");
          } else {
            alert(json.message);
          }
        })
        .catch(() => alert("something went wrong."));
    }
  };

  return (
    <div className="h-[90vh] flex flex-col items-center justify-center">
      <h1 className="font-extrabold text-2xl mb-8">Welcome!</h1>
      <form onSubmit={onSubmit}>
        <div>
          <Input
            label="name"
            inputProps={{
              type: "text",
              name: "name",
              placeholder: "your name",
              required: true
            }}
          />
        </div>
        <div className="mt-2">
          <Input
            label="email"
            inputProps={{
              type: "email",
              name: "email",
              placeholder: "example@abc.com",
              required: true
            }}
          />
        </div>
        <button
          type="submit"
          className="mt-8 mx-auto block bg-blue-800 hover:bg-blue-700 py-2 px-28 rounded-lg text-white"
        >
          Create Account
        </button>
      </form>
      <Link href="/log-in">
        <a className="mt-2 mx-auto block border border-blue-800 hover:bg-blue-700 py-2 px-20 rounded-lg text-blue-800 hover:text-white">
          Already have an account
        </a>
      </Link>
    </div>
  );
};

export default CreateAccount;
