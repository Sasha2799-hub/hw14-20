import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormHelperText from "@mui/material/FormHelperText";
import Button from "@mui/material/Button";
import { useState } from "react";
import { Form, Field } from "react-final-form";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const LoginPage = () => {
  const navigation = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const validation = (values) => {
    const errors = {};

    if (!values.username) {
      errors.username = "You have to enter your login";
    }
    if (!values.password) {
      errors.password = "You have to enter your password";
    }

    if (
      values.username &&
      values.password &&
      (values.username !== "admin" || values.password !== "admin")
    ) {
      errors.username = "Your login or password is incorrect";
      errors.password = "Your login or password is incorrect";
    }

    return errors;
  };

  const onSubmit = (values) => {
    localStorage.setItem("token", "admin-token");
    navigation("/products");
  };

  return (
    <div className="login-box">
      <Form
        onSubmit={onSubmit}
        validate={validation}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Field name="username">
                {({ input, meta }) => (
                  <TextField
                    {...input}
                    label="User Name"
                    variant="outlined"
                    sx={{
                      marginBottom: 4,
                      marginLeft: 1,
                      marginTop: 5,
                      width: "30ch",
                    }}
                    error={meta.error && meta.touched}
                    helperText={meta.touched && meta.error ? meta.error : ""}
                  />
                )}
              </Field>
              <Field name="password">
                {({ input, meta }) => (
                  <FormControl
                    sx={{ mb: 4, ml: 1, width: "30ch" }}
                    variant="outlined"
                    error={meta.error && meta.touched}
                  >
                    <InputLabel htmlFor="outlined-adornment-password">
                      Password
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={showPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label={
                              showPassword
                                ? "hide the password"
                                : "display the password"
                            }
                            onClick={handleClickShowPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                      {...input}
                    />
                    <FormHelperText>
                      {meta.touched && meta.error ? meta.error : ""}
                    </FormHelperText>
                  </FormControl>
                )}
              </Field>
              <Button
                variant="contained"
                sx={{
                  marginBottom: 10,
                  marginLeft: 1,
                  width: "30ch",
                  backgroundColor: "#44B26F",
                }}
                type="submit"
              >
                Login
              </Button>
            </Box>
          </form>
        )}
      />
    </div>
  );
};

export default LoginPage;
