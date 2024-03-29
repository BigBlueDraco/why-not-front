import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {
  Alert,
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
import { FileDrop } from "../FileDrop/FileDrop";
import { ImageChoper } from "../ImageChoper/ImageChoper";
import { CreateOfferInput, CreateOfferSchema } from "./addOffer.schema";
import zIndex from "@mui/material/styles/zIndex";

interface ICreateOfferForm {
  onClose?(): void;
}
export const CreateOfferForm: React.FC<ICreateOfferForm> = ({
  onClose = () => {},
}) => {
  const theme = useTheme();
  const [file, setFile] = useState<any>();
  const [preview, setPreview] = useState<any>();
  const [isCropeningImg, setIsCropeningImg] = useState<boolean>(false);
  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = useForm<CreateOfferInput>({ resolver: zodResolver(CreateOfferSchema) });
  const [cteateOffer] = useMutation(CREATE_OFFER_MUTATION);

  const onSubmitHandler: SubmitHandler<CreateOfferInput> = async (values) => {
    try {
      const file = await fetch(preview);
      const blob = await file.blob();
      const formData = new FormData();
      formData.append("file", blob);
      if (!!formData.getAll("file")[0]) {
        await cteateOffer({
          variables: {
            data: {
              ...values,
            },
            file: formData.getAll("file")[0],
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  useResetForm({ isSubmitSuccessful: isSubmitSuccessful && preview, reset });

  return (
    <>
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
        {isCropeningImg ? (
          <>
            {file && (
              <ImageChoper
                src={file && URL.createObjectURL(file)}
                onClose={(url: string) => {
                  setPreview(url);
                  setIsCropeningImg(false);
                }}
              />
            )}
          </>
        ) : (
          <Box
            component={"form"}
            sx={{
              display: "flex",
              gap: 2,
              flexDirection: "column",
              justifyContent: "space-between",
              minHeight: "420px",
              pb: 4,
            }}
            onSubmit={handleSubmit(onSubmitHandler)}
          >
            <Grid container spacing={7}>
              <Grid
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
                item
                xs={8}
              >
                <Typography
                  align="center"
                  variant="h2"
                  fontWeight={theme.typography.fontWeightBold}
                  color="common.black"
                >
                  Create Offer
                </Typography>
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
              </Grid>
              <Grid item xs={4}>
                <FileDrop
                  src={preview}
                  onFileChoise={(file, isCropeting) => {
                    setFile(file);
                    setIsCropeningImg(isCropeting);
                  }}
                />
              </Grid>
            </Grid>
            <Button variant="contained" type="submit" fullWidth>
              Create offer
            </Button>
          </Box>
        )}
      </Box>
    </>
  );
};
