import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { Point, Area } from "react-easy-crop/types";
import { Box, Button, Slider } from "@mui/material";
import CropIcon from "@mui/icons-material/Crop";
import getCroppedImg from "../../utils/getCroppedImg";

export const ImageChoper = ({
  src,
  onClose = (url: string) => {},
}: {
  src: string;
  onClose?(url: any): void;
}) => {
  const [imageSrc, setImageSrc] = useState<any>();
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>();
  const [croppedImage, setCroppedImage] = useState<any>();
  const onCropComplete = useCallback(
    async (croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        src,
        croppedAreaPixels,
        rotation
      );
      setCroppedImage(croppedImage);
      return croppedImage;
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, rotation]);

  return (
    <Box sx={{ position: "relative", minHeight: "100%" }}>
      <Box>
        <Cropper
          style={{
            containerStyle: { backgroundColor: "transparent" },
          }}
          image={src}
          crop={crop}
          zoom={zoom}
          aspect={36 / 52}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </Box>

      <Button
        onClick={async () => {
          const url = await showCroppedImage();
          onClose(url);
        }}
        sx={{
          position: "absolute",
          right: 2,
          bottom: 4,
          zIndex: 1000000,
          minWidth: "48px",
          minHeight: "48px",
        }}
      >
        <CropIcon sx={{ minWidth: "48px", minHeight: "48px" }} />
      </Button>
    </Box>
  );
};
