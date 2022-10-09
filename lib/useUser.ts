import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";

export default function useUser() {
  const { data, error } = useSWR("/api/users/profile");
  const router = useRouter();

  useEffect(() => {
    if (error || (data && !data.ok)) {
      router.replace("/create-account");
    }
  }, [data, error, router]);

  return {
    user: data?.profile,
    isLoading: !data && !error
  };
}
