"use client";
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/utils/authContext";
import ChatArea from "@/components/chatArea/chatArea";
import SideBar from "@/components/sideBar/sideBar";
import ModalProvider from "@/utils/modalContext";
import MultiModal from "@/components/modals/multiModal";
import ChatProvider from "@/utils/chatContext";

const HomePage = () => {
  const [user, setUser] = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [router, user]);

  return (
    <ChatProvider>
      <ModalProvider>
        <MultiModal />
        <main className="relative flex w-full min-h-screen p-10 bg-black">
          <div className="flex w-full min-h-full overflow-hidden rounded-3xl border-4 border-gray-200 shadow-2xl shadow-gray-200">
            <div className="w-1/5 px-1 lg:px-4 py-4 lg:py-12 border-r-4 border-gray-200">
              <SideBar />
            </div>
            <div className="w-4/5 min-h-full p-5 ">
              <ChatArea />
            </div>
          </div>
        </main>
      </ModalProvider>
    </ChatProvider>
  );
};

export default HomePage;
