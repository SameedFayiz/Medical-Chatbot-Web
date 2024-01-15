import wrapText from "@/utils/wrapText";
import { Avatar } from "@mui/material";

const MessageBox = (props) => {
  return (
    <div
      className={`w-full flex gap-4 bg-white rounded-lg border-slate-400 p-4 ${
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
        <p className="font-semibold uppercase">{props.username}</p>
        <div className="">{wrapText(props.message)}</div>
      </div>
    </div>
  );
};

export default MessageBox;
