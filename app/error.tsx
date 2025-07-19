"use client";

import Image from "next/image";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

function Error() {
  const router = useRouter();
  function handleError() {
    Cookies.remove("session");
    Cookies.remove("sessionData");
    router.push("/login/with-img");
  }
  return (
    <div className="h-screen w-screen bg-white flex flex-col justify-center items-center">
      <Image src="/savebite.svg" width={500} height={500} alt="savebite" />
      <p className="text-error-500 font-bold text-lg">
        something went wrong 😢😢
      </p>
      <Button
        onClick={handleError}
        className="text-primary-500 bg-transparent hover:bg-transparent text-lg underline font-semibold"
      >
        Take me home
      </Button>
    </div>
  );
}

export default Error;
