"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
export default function Page() {
  const router = useRouter();
  const signUp = () => {
    router.push("/dashboard");
  };
  const login = () => {
    router.push("/login");
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Welcome, ATS Resume Matcher </h1>
      <p className="text-lg text-gray-700 mb-8">
        Your AI-powered resume matching solution
      </p>
      <div>
        <Button variant={"outline"} onClick={signUp}>
          Get started
        </Button>
        <Button className="ml-4" variant={"outline"} onClick={login}>
          Login
        </Button>
      </div>
    </div>
  );
}
