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

export default MessageBox;
