import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@material-ui/core";
import { Formik, Form } from "formik";
import * as Yup from "yup";

const phoneRegExp = /^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,3})|(\(?\d{2,3}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/;

const FormSchema = Yup.object().shape({
  id: Yup.number().min(1, "Too Short!").required("Required"),
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  phone: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

function AddForm({ open, onClose, onSubmit }) {
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Add a new user</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={{
            id: "",
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
          }}
          validationSchema={FormSchema}
          onSubmit={(values) => {
            onSubmit(values);
          }}
        >
          {({ values, handleChange, handleBlur, errors, touched, isValid }) => (
            <Form>
              <TextField
                margin="dense"
                name="id"
                label="Id"
                type="text"
                value={values.id}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.id && touched.id}
                helperText={errors.id}
                fullWidth
              />
              <TextField
                margin="dense"
                name="firstName"
                label="First name"
                type="text"
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.firstName && touched.firstName}
                helperText={errors.firstName}
                fullWidth
              />
              <TextField
                margin="dense"
                name="lastName"
                label="Last name"
                type="text"
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.lastName && touched.lastName}
                helperText={errors.lastName}
                fullWidth
              />
              <TextField
                margin="dense"
                name="email"
                label="Email"
                type="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.email && touched.email}
                helperText={errors.email}
                fullWidth
              />
              <TextField
                margin="dense"
                name="phone"
                label="Phone"
                type="text"
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.phone && touched.phone}
                helperText={errors.phone}
                fullWidth
              />
              <DialogActions>
                <Button onClick={onClose} color="primary">
                  Cancel
                </Button>
                <Button type="submit" color="primary" disabled={!isValid}>
                  Add
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}

export default AddForm;
