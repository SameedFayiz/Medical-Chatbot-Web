import { Avatar } from "@mui/material";

const MessageBox = (props) => {
  return (
    <div className="w-full flex gap-4 bg-slate-50 rounded-lg border-2 border-slate-300 border-dashed p-4">
      <Avatar
        alt="Bot"
        src={props.username == "bot" ? "/bot.png" : ""}
        sx={{ width: 32, height: 32, border: 2, borderColor: "black" }}
      />
      <div className="flex flex-col bg-slate-40">
        <p className="font-semibold">{props.username}</p>
        <div className="">{props.message}</div>
      </div>
    </div>
  );
};

const ChatArea = (props) => {
  return (
    <div className="w-full h-full flex flex-col bg-fuchsia-200">
      <div className="w-full h-10 flex items-center text-3xl font-bold tracking-wider bg-slate-400 ps-10">
        Chat 1
      </div>
      <div className="flex flex-col grow gap-10 overflow-y-scroll bg-slate-500 p-10">
        {props.chat?.map((i) => {
          <MessageBox username={i.name} message={i.message} />;
        })}
        <MessageBox />
      </div>
    </div>
  );
};

export default ChatArea;
