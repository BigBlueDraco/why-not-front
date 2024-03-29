import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterInput, RegisterSchema } from "./register.schema";
import { useMutation } from "@apollo/client";
import { SIGNUP_MUTATION } from "../../apollo/Auth/auth";
import { useRedirectIfLoggedin } from "../../hooks/useRedirectIfLoggedIn";
import { useSaveJWTtoLocaleStorage } from "../../hooks/useSaveJWTtoLocaleStorage";
import { useResetForm } from "../../hooks/useResetForm";
import { useResponsive } from "../../hooks/useResponsive";

export const RegistrationForm = () => {
  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = useForm<RegisterInput>({ resolver: zodResolver(RegisterSchema) });

  const theme = useTheme();
  const { isMobile } = useResponsive();

  const [singup, { data }] = useMutation(SIGNUP_MUTATION);
  const onSubmitHandler: SubmitHandler<RegisterInput> = async (values) => {
    const { passwordConfirm, ...rest } = values;
    await singup({
      variables: {
        signupData: {
          ...rest,
        },
      },
    });
  };

  useSaveJWTtoLocaleStorage(data?.signup?.access_token);
  useRedirectIfLoggedin();
  useResetForm({ isSubmitSuccessful, reset });

  return (
    <Box
      marginTop={4}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      <Typography
        align="center"
        variant="h1"
        fontWeight={theme.typography.fontWeightBold}
        color="common.black"
      >
        Registration
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          component={"form"}
          minWidth={isMobile ? "320px" : "520px"}
          onSubmit={handleSubmit(onSubmitHandler)}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <TextField
            id="email"
            label="Email"
            fullWidth
            type="email"
            error={!!errors["email"]}
            helperText={errors["email"] ? errors["email"].message : ""}
            {...register("email")}
          />
          <TextField
            id="firstName"
            label="First name"
            fullWidth
            type="text"
            error={!!errors["first_name"]}
            helperText={
              errors["first_name"] ? errors["first_name"].message : ""
            }
            {...register("first_name")}
          />
          <TextField
            id="lastName"
            label="Last name"
            fullWidth
            type="text"
            error={!!errors["last_name"]}
            helperText={errors["last_name"] ? errors["last_name"].message : ""}
            {...register("last_name")}
          />
          <TextField
            id="password"
            label="Password"
            fullWidth
            type="password"
            error={!!errors["password"]}
            helperText={errors["password"] ? errors["password"].message : ""}
            {...register("password")}
          />
          <TextField
            id="password"
            label="Password Confirm"
            fullWidth
            type="password"
            error={!!errors["passwordConfirm"]}
            helperText={
              errors["passwordConfirm"] ? errors["passwordConfirm"].message : ""
            }
            {...register("passwordConfirm")}
          />
          <Button variant="contained" type="submit">
            Create account
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
