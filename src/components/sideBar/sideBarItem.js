import { Delete } from "@mui/icons-material";

const SideBarItem = (props) => {
  return (
    <div
      id={props.id}
      onClick={props.onclick}
      className="w-full h-10 flex justify-center items-center rounded-lg bg-white shadow-2xl shadow-white px-5 relative hover:bg-slate-100 transition duration-200 ease-in-out hover:scale-105 text-sm lg:text-base"
    >
      <div id={props.id} className="flex items-center justify-center">
        {props.children}
      </div>
      {props.newOpt ? null : (
        <Delete
          id={props.id}
          onClick={props.onDelete}
          className="absolute right-1 lg:right-5 md:right-2 hover:text-rose-600 transition duration-200 ease-in-out hover:scale-125 text-sm lg:text-base"
        />
      )}
    </div>
  );
};

export default SideBarItem;
