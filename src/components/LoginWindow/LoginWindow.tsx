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
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { forwardRef, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { gql, useMutation } from "@apollo/client";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginInput, LoginSchema } from "./login.shema";
import { useNavigate } from "react-router-dom";
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
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
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard");
    }
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      navigate("/dashboard");
      reset();
    }
    if (localStorage.getItem("token")) {
      navigate("/dashboard");
    }
  }, [isSubmitSuccessful, reset, navigate]);
  const LOGIN = gql`
    mutation Login($loginData: LoginUserInput!) {
      login(loginUserInput: $loginData) {
        access_token
        user {
          id
        }
      }
    }
  `;

  const [login, { data }] = useMutation(LOGIN);

  useEffect(() => {
    if (data?.login?.access_token) {
      localStorage.setItem("token", data?.login?.access_token);
    }
  }, [data]);
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
