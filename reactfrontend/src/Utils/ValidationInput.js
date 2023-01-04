import * as Yup from "yup";
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
  StartDate: Yup.date().required("Start Date is required"),
  State: Yup.string().required("State is required"),
  Departement: Yup.string().required("Departement is required"),
});

export default validationSchema;
