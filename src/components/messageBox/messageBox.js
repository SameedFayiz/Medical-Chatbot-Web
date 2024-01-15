import { Avatar } from "@mui/material";

const MessageBox = (props) => {
  return (
    <div
      className={`w-full flex gap-4 bg-slate-50 rounded-lg border-slate-400 p-4 ${
        props.username == "bot"
          ? "border-4 border-double"
          : "border-2 border-dashed"
      }`}
    >
      <Avatar
        alt="Bot"
        src={props.username == "bot" ? "/bot.png" : ""}
        sx={{ width: 32, height: 32, border: 2, borderColor: "black" }}
      />
      <div className="flex flex-col bg-slate-40">
        <p className="font-semibold">{props.username}</p>
        <div className="flex overflow-hidden">
          <p>{props.message}</p>
        </div>
      </div>
    </div>
  );
};

export default MessageBox;
