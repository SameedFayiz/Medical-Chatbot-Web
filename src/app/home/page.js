"use client";
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/utils/authContext";
import ChatArea from "@/components/chatArea/chatArea";
import SideBar from "@/components/sideBar/sideBar";
import ModalProvider from "@/utils/modalContext";
import MultiModal from "@/components/modals/multiModal";

const HomePage = () => {
  const [user, setUser] = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [router, user]);

  return (
    <ModalProvider>
      <MultiModal />
      <main className="relative flex min-h-screen p-8 bg-gradient-to-r from-black from-10% via-blue-900 via-40% to-blue-800">
        <div className="w-1/5 rounded-s-3xl px-2 py-10 bg-white border-4 border-slate-400">
          <SideBar />
        </div>
        <div className="w-4/5  rounded-e-3xl p-5 bg-neutral-100 border-4 border-slate-400">
          <ChatArea />
        </div>
      </main>
    </ModalProvider>
  );
};

export default HomePage;
