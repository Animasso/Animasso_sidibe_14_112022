import React from "react";
import DatePicker from "react-datepicker";
import { Typography } from "@mui/material";
import validationSchema from "../Utils/ValidationInput";
import "react-datepicker/dist/react-datepicker.css";
import { useForm, Controller } from "react-hook-form";
import "react-dropdown/style.css";
import useFetchUrl from "../hooks/useFetch";
import { addEmployee } from "../Features/employeeSlice";
import { useDispatch } from "react-redux";
import formatDate from "../Utils/FormatDate";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";

import Modal from "new-modal";
function UserForm(props) {
  const cityList = useFetchUrl(`/mockData/mockDataStates.json`);
  console.log("cityList:", cityList);
  const options = cityList?.states?.map((city) => {
    return city.name;
  });
  console.log("options:", options);
  const departements = [
    "Sales",
    "Marketing",
    "Engineering",
    "Resources",
    "Legal",
  ];

  const dispatch = useDispatch();
  const {
    formState: { errors },
    register,
    control,
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const submitForm = (data) => {
    data = {
      ...data,
      DateofBirth: formatDate(data.DateofBirth),
      StartDate: formatDate(data.StartDate),

      Departement: data.Departement,
    };

    console.log("data:", data);
    dispatch(addEmployee(data));
    setModal(true);
    reset();
  };

  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <>
      {modal ? (
        <Modal textModal={"Employee Create"} toggleModal={toggleModal} />
      ) : null}

      <form
        className=" shadow hover:shadow-2xl bg-gray-100   flex-col justify-center p-4 my-9 border rounded-lg text-center "
        onSubmit={handleSubmit(submitForm)}
      >
        <div className="inputForm flex flex-col">
          <label htmlFor="FirstName">Firstname</label>
          <input
            className=" p-5 my-3 h-4 hover:shadow-2xl focus:ring-transparent focus:border-lime-700 border-white focus:outline-none focus-border-lime-700"
            type="text"
            placeholder="Firstname"
            {...register("FirstName")}
          />
          <div className="errorStyle text-red-600">
            {errors.FirstName?.message}
          </div>
        </div>
        <div className="inputForm inputForm flex flex-col">
          <label htmlFor="LastName">Lastname</label>
          <input
            type="text"
            className="p-5 my-3 h-4 hover:shadow-2xl focus:ring-transparent focus:border-lime-700 border-white focus:outline-none focus-border-lime-700"
            placeholder="LastName"
            {...register("LastName")}
          />
          <div className="errorStyle text-red-600">
            {errors.LastName?.message}
          </div>
        </div>

        <label>Date of Birth</label>
        <Controller
          control={control}
          name="DateofBirth"
          rules={{ required: true }}
          render={({ field }) => (
            <>
              <DatePicker
                name="DateofBirth"
                className="input"
                placeholderText="Select date"
                format="dd/MM/yyyy"
                onChange={(e) => field.onChange(e)}
                selected={field.value}
                error={errors.DateofBirth ? true : false}
              />
              <Typography variant="inherit" color="#b71c1c">
                {errors.DateofBirth?.message}
              </Typography>
            </>
          )}
        />
        <label>Start Date</label>
        <Controller
          control={control}
          rules={{ required: true }}
          name="StartDate"
          render={({ field }) => (
            <>
              <DatePicker
                name="StartDate"
                format="dd/MM/yyyy"
                className="input"
                placeholderText="Select date"
                onChange={(e) => field.onChange(e)}
                selected={field.value}
              />
              <Typography variant="inherit" color="#b71c1c">
                {errors.StartDate?.message}
              </Typography>
            </>
          )}
        />
        <fieldset className="border border-solid border-gray-300 p-3 mt-7">
          <legend>Address</legend>

          <div className="inputForm flex flex-col">
            <label htmlFor="Address">Address</label>
            <input
              type="text"
              className="p-5 my-3 h-4 hover:shadow-2xl focus:ring-transparent focus:border-lime-700 border-white focus:outline-none focus-border-lime-700"
              placeholder="Address"
              {...register("Address")}
            />
            <div className="errorStyle text-red-600">
              {errors.Address?.message}
            </div>
          </div>
          <br />

          <div className="inputForm flex flex-col">
            <label htmlFor="City">City</label>
            <input
              type="text"
              className="p-5 my-3 h-4 hover:shadow-2xl focus:ring-transparent focus:border-lime-700 border-white focus:outline-none focus-border-lime-700"
              placeholder="City"
              {...register("City")}
            />
            <div className="errorStyle text-red-600">
              {errors.City?.message}
            </div>
          </div>

          <div className="inputForm flex flex-col">
            <label htmlFor="State">State</label>

            <select defaultValue="" {...register("State")}>
              <option value="" disabled>
                Select a state
              </option>
              {options?.map((option, index) => {
                return (
                  <option value={option} key={index}>
                    {option}
                  </option>
                );
              })}
            </select>
            <Typography variant="inherit" color="#b71c1c">
              {errors.State?.message}
            </Typography>
          </div>
          <div className="inputForm flex flex-col">
            <label htmlFor="ZipCode">ZipCode</label>
            <input
              type="text"
              className="p-5 my-3 h-4 hover:shadow-2xl focus:ring-transparent focus:border-lime-700 border-white focus:outline-none focus-border-lime-700"
              placeholder="ZipCode"
              {...register("ZipCode")}
            />
            <div className="errorStyle text-red-600">
              {errors.ZipCode?.message}
            </div>
          </div>
        </fieldset>

        <div className="inputForm flex flex-col">
          <label htmlFor="Departement">Departement</label>

          <select defaultValue="" {...register("Departement")}>
            <option value="" disabled>
              Select your departement
            </option>
            {departements?.map((Departement, index) => {
              return (
                <option value={Departement} key={index}>
                  {Departement}
                </option>
              );
            })}
          </select>
          <div className="errorStyle text-red-600">
            {errors.Departement?.message}
          </div>
        </div>
        <input
          type="submit"
          className="sendForm mt-7 w-32 p-3 rounded-md border-white border-2 bg-slate-400 hover:bg-slate-500"
        />
      </form>
      {}
    </>
  );
}

export default UserForm;
