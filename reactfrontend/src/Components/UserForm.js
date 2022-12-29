import React, { Fragment } from "react";
import DatePicker from "react-datepicker";
import { TextField, Typography } from "@mui/material";

import "react-datepicker/dist/react-datepicker.css";
import { useForm, Controller } from "react-hook-form";
// import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import useFetchUrl from "../hooks/useFetch";
import { addEmployee } from "../Features/employeeSlice";
import { useDispatch } from "react-redux";
import formatDate from "../Utils/FormatDate";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Modal from "new-modal";
import Select from "react-select";
function UserForm(props) {
  const cityList = useFetchUrl(`/mockData/mockDataStates.json`);
  const options = cityList?.states?.map((city) => {
    return { value: city.name, label: city.name };
  });
  console.log("options:", options);
  const [selectedOption, setSelectedOption] = useState(null);
  const departements = [
    { value: "Sales", label: "Sales" },
    { value: "Marketing", label: "Marketing" },
    { value: "Engineering", label: "Engineering" },
    { value: "Resources", label: "Resources" },
    { value: "Legal", label: "Legal" },
  ];

  const validationSchema = Yup.object().shape({
    FirstName: Yup.string()
      .required("firstname is required")
      .min(2, "firstname must be at least 2 characters"),
    LastName: Yup.string()
      .required("lastname is required")
      .min(2, "lastname must be at least 2 characters"),
    Address: Yup.string().required("Address is required"),
    City: Yup.string().required("City is required"),
    ZipCode: Yup.string()
      .required()
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(5, "Must be exactly 5 digits")
      .max(5, "Must be exactly 5 digits"),

    DateofBirth: Yup.date().required("Date of birth is required"),
    StartDate: Yup.date().required("StarDate is required"),
    // Departement: Yup.object().shape({
    //   label: Yup.string().required("label is required"),
    //   value: Yup.string().required("value is required"),
    // }),
  });
  const dispatch = useDispatch();
  const {
    formState: { errors },
    register,
    control,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const submitForm = (data) => {
    data = {
      ...data,
      DateofBirth: formatDate(data.DateofBirth),
      StartDate: formatDate(data.StartDate),
      Departement: selectedOption.value,
      State: data.State.value,
    };
    console.log("data:", data);
    dispatch(addEmployee(data));
    setModal(true);
    console.log(selectedOption);
  };

  // const departementDefault = departements[0];

  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <>
      {modal ? (
        <Modal
          textModal={"Employee Create"}
          toggleModal={toggleModal}
          aria={{
            labelledby: "modal",
            describedby: "modal window open employee create",
          }}
        />
      ) : null}

      <form
        className=" shadow hover:shadow-2xl bg-gray-100  w-full md:w-1/3 flex-col justify-center p-4 my-9 border rounded-lg text-center "
        onSubmit={handleSubmit(submitForm)}
      >
        {/* <Controller
          name="FirstName"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <>
              <TextField
                fullWidth
                id="standard-basic"
                label="FirstName"
                variant="standard"
                aria-label={"FirstName"}
                value={value}
                onChange={onChange}
                {...register("FirstName", { required: "Firstname required" })}
                error={Boolean(errors.FirstName)}
              />
              <Typography variant="inherit" color="#b71c1c">
                {errors.FirstName?.message}
              </Typography>
            </>
          )}
        /> */}
        <div className="inputForm flex flex-col">
          <label htmlFor="FirstName">Firstname</label>
          <input
            className=" p-5 my-3 h-4 hover:shadow-2xl focus:ring-transparent focus:border-lime-700 border-white focus:outline-none focus-border-lime-700 invalid:border-pink-500"
            type="text"
            placeholder="Firstname"
            {...register("FirstName")}
          />
          <div className="errorStyle text-red-600">
            {errors.FirstName && "First name must be at least 2 characters"}
          </div>
        </div>
        <div className="inputForm inputForm flex flex-col">
          <label htmlFor="LastName">Lastname</label>
          <input
            type="text"
            className="p-5 my-3 h-4 border-none hover:shadow-2xl"
            placeholder="LastName"
            {...register("LastName")}
          />
          <div className="errorStyle text-red-600">
            {errors.LastName && " LastName must be at least 2 characters"}
          </div>
        </div>
        {/* <Controller
          name="LastName"
          control={control}
          defaultValue=""
          rules={{ required: "last name required" }}
          render={({ field: { onChange, value } }) => (
            <>
              <TextField
                fullWidth
                id="standard-basic"
                label="LastName"
                variant="standard"
                value={value}
                onChange={onChange}
                {...register("LastName")}
                error={errors.LastName ? true : false}
              />
              <Typography variant="inherit" color="#b71c1c">
                {errors.LastName?.message}
              </Typography>
            </>
          )}
        /> */}

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
          {/* <Controller
            name="Address"
            control={control}
            defaultValue=""
            rules={{ required: "address required" }}
            render={({ field: { onChange, value } }) => (
              <>
                <TextField
                  fullWidth
                  label="Address"
                  id="fullWidth"
                  variant="standard"
                  value={value}
                  onChange={onChange}
                  {...register("Address")}
                  error={errors.Address ? true : false}
                />
                <Typography variant="inherit" color="#b71c1c">
                  {errors.Address?.message}
                </Typography>
              </>
            )}
          /> */}
          <div className="inputForm">
            <label htmlFor="Address">Address</label>
            <input type="text" placeholder="Address" {...register("Address")} />
            <div className="errorStyle text-red-600">
              {errors.Address && " Address is required"}
            </div>
          </div>
          <br />
          <Controller
            name="City"
            control={control}
            defaultValue=""
            rules={{ required: "city required" }}
            render={({ field: { onChange, value } }) => (
              <>
                <TextField
                  fullWidth
                  label="City"
                  id="fullWidth"
                  variant="standard"
                  value={value}
                  onChange={onChange}
                  {...register("City")}
                  error={errors.City ? true : false}
                />
                <Typography variant="inherit" color="#b71c1c">
                  {errors.City?.message}
                </Typography>
              </>
            )}
          />

          <legend>States</legend>
          <Controller
            name="State"
            htmlFor="State"
            control={control}
            defaultValue=""
            className="State"
            rules={{ required: "State required" }}
            render={({ field: { onChange, value } }) => (
              <Select
                options={options}
                onChange={onChange}
                // value={defaultOption}
                placeholder="Select a State"
              />
            )}
          />

          <Controller
            name="ZipCode"
            control={control}
            defaultValue=""
            className="myClassName"
            rules={{ required: "ZipCode required" }}
            render={({ field: { onChange, value } }) => (
              <>
                <TextField
                  id="standard-basic"
                  label="ZipCode"
                  variant="standard"
                  value={value}
                  onChange={onChange}
                  {...register("ZipCode")}
                  error={errors.ZipCode ? true : false}
                />
                <Typography variant="inherit" color="#b71c1c">
                  {errors.ZipCode?.message}
                </Typography>
              </>
            )}
          />
        </fieldset>
        <legend>Departement</legend>
        <Controller
          name="Departement"
          htmlFor="Departement"
          control={control}
          defaultValue=""
          rules={{ required: "departement required" }}
          render={({ field: { selectedOption } }) => (
            <>
              <Select
                name="Departement"
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={departements}
                placeholder="Select a Departement"
                error={errors.Departement ? true : false}
              />

              <Typography variant="inherit" color="#b71c1c">
                {errors.Departement != null && "departement required"}
              </Typography>
            </>
          )}
        />
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
