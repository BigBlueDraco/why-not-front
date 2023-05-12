import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { ImageChoper } from "../ImageChoper/ImageChoper";

interface FileDropProps {
  src?: string;
  onFileChoise(file: File, isCropening: boolean): void;
}
export const FileDrop: React.FC<FileDropProps> = ({ src, onFileChoise }) => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  useEffect(() => {
    onFileChoise(acceptedFiles[0], !!acceptedFiles[0]);
  }, [acceptedFiles]);
  return (
    <>
      <Box
        sx={{
          bgcolor: "brown",
          minHeight: 520,
          maxWidth: 360,
          borderRadius: "10px",
          overflow: "hidden",
          flex: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        }}
        {...getRootProps({ className: "dropzone" })}
      >
        <input {...getInputProps()} required id="photo" type="file" />
        {src && (
          <img
            height="520"
            width="360"
            src={src}
            alt="A photo will be added here "
          />
        )}
      </Box>
    </>
  );
};
