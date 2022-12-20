import React, { Fragment } from "react";
import DatePicker from "react-datepicker";
import { TextField, Typography } from "@mui/material";

import "react-datepicker/dist/react-datepicker.css";
import { useForm, Controller } from "react-hook-form";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import useFetchUrl from "../hooks/useFetch";
import { addEmployee } from "../Features/employeeSlice";
import { useDispatch } from "react-redux";
import formatDate from "../Utils/FormatDate";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Modal from "new-modal";

function UserForm(props) {
  const cityList = useFetchUrl(`/mockData/mockDataStates.json`);
  const options = cityList?.states?.map((city) => {
    return city.name;
  });
  const validationSchema = Yup.object().shape({
    FirstName: Yup.string().required("firstname is required"),
    LastName: Yup.string()
      .required("lastname is required")
      .min(6, "Username must be at least 6 characters")
      .max(20, "Username must not exceed 20 characters"),
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
      Departement: data.Departement.value,
      State: data.State.value,
    };
    dispatch(addEmployee(data));
    setModal(true);
  };
  const departements = [
    "Sales",
    "Marketing",
    "Engineering",
    "Human Resources",
    "Legal",
  ];
  // const departementDefault = departements[0];

  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <>
      {modal ? (
        <Modal textModal={"Utilisateur crée"} toggleModal={toggleModal} />
      ) : null}

      <form onSubmit={handleSubmit(submitForm)}>
        <Controller
          name="FirstName"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <>
              <TextField
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
        />

        <Controller
          name="LastName"
          control={control}
          defaultValue=""
          rules={{ required: "last name required" }}
          render={({ field: { onChange, value } }) => (
            <>
              <TextField
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
        />

        <label>Date of Birth</label>
        <Controller
          control={control}
          name="DateofBirth"
          rules={{ required: true }}
          render={({ field }) => (
            <DatePicker
              name="DateofBirth"
              className="input"
              placeholderText="Select date"
              format="dd/MM/yyyy"
              onChange={(e) => field.onChange(e)}
              selected={field.value}

              // {...register("DateofBirth")}
              // error={errors.DateofBirth ? true : false}
            />
          )}
        />
        <label>Start Date</label>
        <Controller
          control={control}
          rules={{ required: true }}
          name="StartDate"
          render={({ field }) => (
            <DatePicker
              name="StartDate"
              format="dd/MM/yyyy"
              className="input"
              placeholderText="Select date"
              onChange={(e) => field.onChange(e)}
              selected={field.value}
            />
          )}
        />
        <fieldset>
          <legend>Address</legend>
          <Controller
            name="Address"
            control={control}
            defaultValue=""
            rules={{ required: "address required" }}
            render={({ field: { onChange, value } }) => (
              <TextField
                fullWidth
                label="Address"
                id="fullWidth"
                variant="standard"
                value={value}
                onChange={onChange}
                {...register("Address")}
                error={errors.Address ? true : false}
                helperText="ENTER AN Address"
              />
            )}
          />
          <br />
          <Controller
            name="City"
            control={control}
            defaultValue=""
            rules={{ required: "city required" }}
            render={({ field: { onChange, value } }) => (
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
            )}
          />

          <legend>States</legend>
          <Controller
            name="State"
            control={control}
            defaultValue=""
            className="myClassName"
            rules={{ required: "State required" }}
            render={({ field: { onChange, value } }) => (
              <Dropdown
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
              <TextField
                id="standard-basic"
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                label="ZipCode"
                variant="standard"
                value={value}
                onChange={onChange}
                {...register("ZipCode")}
                error={errors.ZipCode ? true : false}
              />
            )}
          />
        </fieldset>
        <legend>Departement</legend>
        <Controller
          name="Departement"
          control={control}
          defaultValue=""
          rules={{ required: "departement required" }}
          render={({ field }) => (
            <Dropdown
              {...field}
              options={departements}
              // value={departementDefault}
              placeholder="Select a Departement"
            />
          )}
        />
        <input type="submit" className="sendForm" />
      </form>
      {}
    </>
  );
}

export default UserForm;
