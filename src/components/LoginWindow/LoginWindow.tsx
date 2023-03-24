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
import { forwardRef } from "react";
import CloseIcon from "@mui/icons-material/Close";
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
  return (
    <>
      <Dialog
        TransitionComponent={Transition}
        fullScreen={isMobile}
        open={isOpen || false}
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
            onSubmit={(e) => {
              e.preventDefault();
            }}
            sx={{ display: "flex", flexDirection: "column", gap: 6 }}
          >
            <FormGroup
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              <TextField label="Email" variant="standard" />
              <TextField label="password" variant="standard" />
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
