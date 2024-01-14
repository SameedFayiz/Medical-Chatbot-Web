"use client";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { AuthContext } from "@/utils/authContext";
import RegisterComponent from "@/components/register/registerUser";
import LoginComponent from "@/components/login/loginUser";
import Loading from "@/components/loading/loading";

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      router.push("/home");
    }
  }, [router, user]);
  const [authType, setAuthType] = useState(false);

  if (!user) {
    return (
      <main className="relative flex min-h-screen flex-col items-center justify-center">
        <Image
          src={"/sampleBG4.jpg"}
          alt="Background Image"
          fill={true}
          className="absolute -z-50"
        />
        {authType ? (
          <RegisterComponent onclick={setAuthType} />
        ) : (
          <LoginComponent onclick={setAuthType} />
        )}
      </main>
    );
  } else {
    return <Loading />;
  }
}
