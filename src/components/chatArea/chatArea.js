import { Avatar } from "@mui/material";

const MessageBox = () => {
  return (
    <div className="w-full flex gap-4 bg-slate-50 rounded-lg border-2 border-slate-300 border-dashed p-4">
      <Avatar
        alt="Bot"
        src="/bot.png"
        sx={{ width: 32, height: 32, border: 2, borderColor: "black" }}
      />
      <div className="flex flex-col bg-slate-40">
        <p className="font-semibold">Sameed fayiz</p>
        <div className="">How are you today???</div>
      </div>
    </div>
  );
};

const ChatArea = () => {
  return (
    <div className="w-full h-full flex flex-col bg-fuchsia-200">
      <div className="w-full h-10 flex items-center text-3xl font-bold tracking-wider bg-slate-400 ps-10">
        Chat 1
      </div>
      <div className="flex flex-col grow gap-10 overflow-y-scroll bg-slate-500 p-10">
        <MessageBox />
        <MessageBox />
      </div>
    </div>
  );
};

export default ChatArea;
