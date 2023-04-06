import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormGroup,
  IconButton,
  Slide,
  TextField,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { forwardRef } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useMutation } from "@apollo/client";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginInput, LoginSchema } from "./login.shema";
import { LOGIN_MUTATION } from "../../apollo/Auth/auth";
import { useRedirectIfLoggedin } from "../../hooks/useRedirectIfLoggedIn";
import { useResetForm } from "../../hooks/useResetForm";
import { useSaveJWTtoLocaleStorage } from "../../hooks/useSaveJWTtoLocaleStorage";
import { useResponsive } from "../../hooks/useResponsive";
const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="left" ref={ref} {...props} />;
});

interface ILoginWindow {
  isOpen: boolean;
  onClose: any;
}
export const LoginWindow: React.FC<ILoginWindow> = ({ isOpen, onClose }) => {
  const { isMobile } = useResponsive();
  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = useForm<LoginInput>({ resolver: zodResolver(LoginSchema) });

  const onSubmitHandler: SubmitHandler<LoginInput> = async (values) => {
    await login({
      variables: {
        loginData: {
          ...values,
        },
      },
    });
  };
  const [login, { data }] = useMutation(LOGIN_MUTATION);
  useRedirectIfLoggedin();
  useResetForm({ isSubmitSuccessful, reset });
  useSaveJWTtoLocaleStorage(data?.login?.access_token);

  return (
    <>
      <Dialog
        TransitionComponent={Transition}
        fullScreen={isMobile}
        open={isOpen && !localStorage.getItem("token")}
        onClose={() => onClose()}
        disableEscapeKeyDown={true}
        maxWidth="md"
      >
        <DialogTitle sx={{ pl: 6, pr: 6, pt: 3 }}>
          Вхід у обліковий запис
          <IconButton
            onClick={() => onClose()}
            sx={{
              position: "absolute",
              right: 2,
              top: 2,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmitHandler)}
            sx={{ display: "flex", flexDirection: "column", gap: 6 }}
          >
            <FormGroup
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
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
                id="password"
                label="Password"
                fullWidth
                type="password"
                error={!!errors["password"]}
                helperText={
                  errors["password"] ? errors["password"].message : ""
                }
                {...register("password")}
              />
            </FormGroup>
            <Button variant="contained" type="submit">
              Увійти
            </Button>
          </Box>
        </DialogContent>

        {/* <Container maxWidth="xs"></Container> */}
      </Dialog>
    </>
  );
};
