import { Box, Grid } from "@mui/material";
import React from "react";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

interface RegisterFormProps {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  password: string;
  confirmPassword: string;
}

const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().required(),
  age: yup.number().required(),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(40, "Password must not exceed 40 characters"),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password"), null], "Confirm Password does not match"),
});

// const RegisterFormAttributes = [
//   {name:"firstName", }
//   {name:"lastName", }
//   {name:"email", }
//   {name:"age", }
//   {name:"password", }
//   {name:"confirmPassword", }
// ]

export const RegisterForm: React.FC = () => {
  const { control, handleSubmit } = useForm<RegisterFormProps>({
    resolver: yupResolver(schema),
  });

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {/* <Controller name="firstName" /> */}
        </Grid>
      </Grid>
    </Box>
  );
};
