import React from "react";

function InputText(props) {
    return (

           <div className="inputForm flex flex-col">
          <label htmlFor="FirstName">{props.title}</label>
          <input
            className=" p-5 my-3 h-4 hover:shadow-2xl focus:ring-transparent focus:border-lime-700 border-white focus:outline-none focus-border-lime-700 invalid:border-pink-500"
            type="text"
            placeholder={props.title}
            {...register(props.name)}
          />
          <div className="errorStyle text-red-600">
            {props.errors[props.name]?.message}
          </div>
        </div>

    );
}

export default InputText;
