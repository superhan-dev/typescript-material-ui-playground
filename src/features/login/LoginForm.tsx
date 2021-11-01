import {
  Avatar,
  Container,
  CssBaseline,
  Input,
  FormControlLabel,
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import * as yup from "yup";
import LockIcon from "@mui/icons-material/Lock";
import { yupResolver } from "@hookform/resolvers/yup";

const useStyles = makeStyles((theme?: any) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

type LoginFormData = {
  email: string;
  password: string;
  remember: boolean;
};

const validationSchema = yup.object({
  email: yup.string().email("Enter a valid email").required("Required"),
  password: yup
    .string()
    .min(6, "Password should be longer than 6 characters")
    .required("Required"),
  remember: yup.boolean().optional(),
});

const defaultValues: LoginFormData = {
  email: "",
  password: "",
  remember: false,
};

export const LoginForm = ({
  onSubmit = (data: any) => alert(JSON.stringify(data)),
}) => {
  const classes = useStyles();
  const { handleSubmit, control } = useForm<LoginFormData>({
    mode: "onBlur",
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  // manual setError
  // useEffect(() => {
  //   setError("email", {
  //     type: "manual",
  //     message: "Dont Forget Your Username Should Be Cool!"
  //   });
  // }, [setError])

  // const onSubmit = handleSubmit((values: LoginFormData) => {
  //   const { email, password, remember } = values;
  //   console.log("stremailingField: " + email);
  //   console.log("password: " + password);
  //   console.log("remember: " + remember);
  // });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.paper}>
          <LockIcon></LockIcon>
        </Avatar>
        <form className={classes.form} onSubmit={onSubmit}>
          <Controller
            control={control}
            name="email"
            defaultValue={""}
            render={({
              field: { onChange, onBlur, value, name, ref },
              fieldState: { invalid, isTouched, isDirty, error },
              formState,
            }) => (
              <FormControl error={!!error} variant="standard" fullWidth>
                <InputLabel htmlFor="email-input">Email Address</InputLabel>
                <Input
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                  inputRef={ref}
                  inputProps={{ "data-testid": "email-input" }}
                  name={name}
                  id="email-input"
                ></Input>
                <FormHelperText
                  id="email-input-text"
                  data-testid="email-input-text"
                >
                  {error?.message}
                </FormHelperText>
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="password"
            defaultValue={""}
            render={({
              field: { onChange, onBlur, value, name, ref },
              fieldState: { invalid, isTouched, isDirty, error },
              formState,
            }) => (
              <FormControl error={!!error} variant="standard" fullWidth>
                <InputLabel htmlFor="password-input">Password</InputLabel>
                <Input
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                  name={name}
                  inputRef={ref}
                  type="password"
                  inputProps={{ "data-testid": "password-input" }}
                  id="password-input"
                ></Input>

                <FormHelperText id="password-input-text">
                  {error?.message}
                </FormHelperText>
              </FormControl>
            )}
          />

          <Controller
            control={control}
            name="remember"
            defaultValue={false}
            render={({
              field: { onChange, onBlur, value, name, ref },
              fieldState: { invalid, isTouched, isDirty, error },
              formState,
            }) => (
              <FormControlLabel
                control={
                  <Checkbox
                    onBlur={onBlur}
                    onChange={onChange}
                    checked={value}
                    name={name}
                    inputRef={ref}
                    data-testid="remember-checkbox"
                  ></Checkbox>
                }
                label="Remember me"
              />
            )}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            data-testid="submit-button"
          >
            Login
          </Button>
        </form>
        <DevTool control={control} /> {/* set up the dev tool */}
      </div>
    </Container>
  );
};
