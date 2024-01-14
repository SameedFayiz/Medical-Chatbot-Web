import { Delete } from "@mui/icons-material";

const SideBarItem = (props) => {
  return (
    <div
      id={props.id}
      onClick={props.onclick}
      className="bg-white w-full h-10 flex justify-center items-center rounded-lg shadow-2xl shadow-black px-5 relative"
    >
      <div className="flex items-center justify-center">{props.children}</div>
      {props.newOpt ? null : (
        <Delete
          id={props.id}
          onClick={props.onDelete}
          className="absolute right-5 text-lg hover:text-rose-600 transition duration-200"
        />
      )}
    </div>
  );
};

export default SideBarItem;
