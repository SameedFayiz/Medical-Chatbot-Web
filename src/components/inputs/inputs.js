"use client";
import { useRef, useState } from "react";

const Inputs = (props) => {
  const inputRef = useRef(null);
  const [focus0, setFocus0] = useState(false);
  const [focus1, setFocus1] = useState(false);
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState("");
  return (
    <div className="w-full h-[56px] min-w-64 relative bg-transparent">
      <p
        className={`absolute bg-white transition-all ease-in-out duration-200 tracking-wide rounded-md ${
          focus0
            ? "left-4 -top-2 font-medium text-[12px] px-1"
            : "left-9 top-1/2 -translate-x-1/2 -translate-y-1/2"
        } ${focus1 ? "text-blue-500" : "text-slate-400"}`}
      >
        {props.label || "label"}
      </p>
      <input
        ref={inputRef}
        value={props.value}
        // type={props.type || "text"}
        className="w-full h-full pl-4 rounded-md border-2 border-slate-300 outline-blue-500"
        onFocus={() => {
          setFocus0(true);
          setFocus1(true);
        }}
        onBlur={() => {
          if (!value) {
            setFocus0(false);
          }
          setFocus1(false);
        }}
        onChange={(e) => {
          setValue(e.target.value);
          if (props.onchange) {
            props.onchange(val);
          }
        }}
      />
      <div className="absolute right-4 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <button
          onClick={() => {
            setVisible(!visible);
            if (visible) {
              inputRef.current.type = "text";
            } else {
              inputRef.current.type = "password";
            }
            console.log(inputRef.current.type);
            console.log(inputRef.current);
          }}
        >
          O
        </button>
      </div>
    </div>
  );
};

export default Inputs;
