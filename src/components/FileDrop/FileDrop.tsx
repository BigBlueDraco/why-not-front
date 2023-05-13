import { Box } from "@mui/material";
import { useEffect } from "react";
import { useDropzone } from "react-dropzone";

interface FileDropProps {
  src?: string;
  onFileChoise(file: File, isCropening: boolean): void;
}
export const FileDrop: React.FC<FileDropProps> = ({ src, onFileChoise }) => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  useEffect(() => {
    onFileChoise(acceptedFiles[0], !!acceptedFiles[0]);
  }, [acceptedFiles, onFileChoise]);
  return (
    <>
      <Box
        sx={{
          minHeight: 520,
          maxWidth: 360,
          borderRadius: "10px",
          overflow: "hidden",
          border: "2px dashed #1C6EA4",
          boxShadow: "inset 0px 0px 30px 10px rgba(0,0,0,0.3)",
          flex: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        }}
        {...getRootProps({ className: "dropzone" })}
      >
        <input {...getInputProps()} required id="photo" type="file" />
        {src ? (
          <img height="520" width="360" src={src} alt="Preview" />
        ) : (
          <p>Drop file or click</p>
        )}
      </Box>
    </>
  );
};
