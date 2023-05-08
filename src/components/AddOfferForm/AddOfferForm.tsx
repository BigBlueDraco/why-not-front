import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {
  Box,
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { CREATE_OFFER_MUTATION } from "../../apollo/offer/offer";
import { useResetForm } from "../../hooks/useResetForm";
import { CreateOfferInput, CreateOfferSchema } from "./addOffer.schema";

interface ICreateOfferForm {
  onClose?(): void;
}
export const CreateOfferForm: React.FC<ICreateOfferForm> = ({
  onClose = () => {},
}) => {
  const theme = useTheme();
  const [file, setFile] = useState();
  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = useForm<CreateOfferInput>({ resolver: zodResolver(CreateOfferSchema) });
  const [cteateOffer] = useMutation(CREATE_OFFER_MUTATION);

  const onSubmitHandler: SubmitHandler<CreateOfferInput> = async (values) => {
    console.log(values);
    try {
      await cteateOffer({
        variables: {
          data: {
            ...values,
          },
          file: file,
        },
      });

      console.log("File uploaded successfully");
    } catch (error) {
      console.error(error);
    }
  };

  useResetForm({ isSubmitSuccessful, reset });

  const handleFileUpload = async (event: any) => {
    const file = event.target.files[0];
    console.log(file);
    setFile(file);
  };

  return (
    <Box
      sx={{
        minWidth: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      <IconButton
        onClick={() => onClose()}
        sx={{
          position: "absolute",
          left: 4,
          top: 4,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <ArrowBackIosIcon />
      </IconButton>
      <Typography
        align="center"
        variant="h1"
        fontWeight={theme.typography.fontWeightBold}
        color="common.black"
      >
        Create Offer
      </Typography>
      <Box
        component={"form"}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          minHeight: "420px",
          pb: 4,
        }}
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <Grid container spacing={6}>
          <Grid
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
            item
            xs={7}
          >
            <TextField
              id="title"
              label="Title"
              fullWidth
              type="text"
              error={!!errors["title"]}
              helperText={errors["title"] ? errors["title"].message : ""}
              {...register("title")}
            />
            <TextField
              id="description"
              label="Description"
              fullWidth
              type="text"
              error={!!errors["description"]}
              helperText={
                errors["description"] ? errors["description"].message : ""
              }
              {...register("description")}
              multiline
            />
            <input
              id="photo"
              type="file"
              required
              onChange={handleFileUpload}
            />
          </Grid>
          <Grid item xs={5}>
            <Box>A photo will be added here </Box>
            <img
              width="360"
              src={file && URL.createObjectURL(file)}
              alt="A photo will be added here "
            />
          </Grid>
        </Grid>
        <Button variant="contained" type="submit" fullWidth>
          Create offer
        </Button>
      </Box>
    </Box>
  );
};
