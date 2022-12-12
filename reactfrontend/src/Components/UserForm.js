// import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { TextField } from "@mui/material";
import "react-datepicker/dist/react-datepicker.css";
import { useForm, Controller } from "react-hook-form";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import useFetchUrl from "../hooks/useFetch";
import { addEmployee } from "../Features/employeeSlice";
import { useDispatch } from "react-redux";
import formatDate from "../Utils/FormatDate";
import { useState } from "react";
import { Modal } from "n-modal-react";

function UserForm(props) {
  const cityList = useFetchUrl(`/mockData/mockDataStates.json`);
  const options = cityList?.states?.map((city) => {
    return city.name;
  });
  const defaultOption = options?.[0];
  const dispatch = useDispatch();
  const { control, handleSubmit } = useForm();
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
  const departementDefault = departements[0];

  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
  };
  return (
    <>
      {modal ? (
        <Modal toggleModal={toggleModal} textModal={"Utilisateur crée"} />
      ) : null}

      <form onSubmit={handleSubmit(submitForm)}>
        <Controller
          name="FirstName"
          control={control}
          defaultValue=""
          rules={{ required: "first name required" }}
          render={({ field: { onChange, value } }) => (
            <TextField
              id="standard-basic"
              label="FirstName"
              variant="standard"
              value={value}
              onChange={onChange}
            />
          )}
        />

        <Controller
          name="LastName"
          control={control}
          defaultValue=""
          rules={{ required: "last name required" }}
          render={({ field: { onChange, value } }) => (
            <TextField
              id="standard-basic"
              label="LastName"
              variant="standard"
              value={value}
              onChange={onChange}
            />
          )}
        />

        <label>Date of Birth</label>
        <Controller
          control={control}
          name="DateofBirth"
          rules={{ required: true }}
          type="date"
          render={({ field }) => (
            <DatePicker
              name="DateofBirth"
              className="input"
              placeholderText="Select date"
              dateFormat="dd/MM/yyyy"
              onChange={(e) => field.onChange(e)}
              selected={field.value}
            />
          )}
        />
        <label>Start Date</label>
        <Controller
          control={control}
          name="StartDate"
          render={({ field }) => (
            <DatePicker
              format="y-MM-dd"
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
                id="standard-basic"
                label="Address"
                variant="standard"
                value={value}
                onChange={onChange}
              />
            )}
          />

          <Controller
            name="City"
            control={control}
            defaultValue=""
            rules={{ required: "city required" }}
            render={({ field: { onChange, value } }) => (
              <TextField
                id="standard-basic"
                label="City"
                variant="standard"
                value={value}
                onChange={onChange}
              />
            )}
          />

          <legend>States</legend>
          <Controller
            name="State"
            control={control}
            defaultValue=""
            rules={{ required: "State required" }}
            render={({ field: { onChange, value } }) => (
              <Dropdown
                options={options}
                onChange={onChange}
                value={defaultOption}
                placeholder="Select an option"
              />
            )}
          />

          <Controller
            name="ZipCode"
            control={control}
            defaultValue=""
            rules={{ required: "ZipCode required" }}
            render={({ field: { onChange, value } }) => (
              <TextField
                id="standard-basic"
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                label="ZipCode"
                variant="standard"
                value={value}
                onChange={onChange}
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
              value={departementDefault}
              placeholder="Select an option"
            />
          )}
        />
        <input type="submit" />
      </form>
      {}
    </>
  );
}

export default UserForm;
