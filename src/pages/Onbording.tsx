import { Box, Button, FormGroup, TextField } from "@mui/material";
import { Container } from "@mui/system";
import { useState } from "react";

export const Onbording = () => {
  const [email, setEmail] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLatName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const hendlerForm = ({ target: { id, value } }: any) => {
    switch (id) {
      case "email":
        setEmail(value);
        return;
      case "firstName":
        setFirstName(value);
        return;
      case "lastName":
        setLatName(value);
        return;
      case "password":
        setPassword(value);
        return;
      case "confirmPassword":
        setConfirmPassword(value);
        return;
    }
  };
  const submitForm = () => {
    console.log({
      email,
      firstName,
      lastName,
      password,
    });
  };
  return (
    <>
      <Container>
        <Box>
          <FormGroup>
            <TextField id="email" label="Email" onChange={hendlerForm} />
            <TextField
              id="firstName"
              label="First name"
              onChange={hendlerForm}
            />
            <TextField id="lastName" label="Last name" onChange={hendlerForm} />
            <TextField id="password" label="Password" onChange={hendlerForm} />
            <TextField
              id="confirmPassword"
              label="Confirm password"
              onChange={hendlerForm}
            />
            <Button type="submit" onClick={submitForm}>
              Create account
            </Button>
          </FormGroup>
        </Box>
      </Container>
    </>
  );
};
