import { useMediaQuery } from "@mui/material";
import { theme } from "../themes/themeMaterialUI";

export const useResponsive = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isDesk = useMediaQuery(theme.breakpoints.up("md"));

  return { isMobile, isTablet, isDesk };
};
