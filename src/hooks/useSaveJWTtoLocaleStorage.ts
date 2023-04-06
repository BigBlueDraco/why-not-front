import { useEffect } from "react";

export const useSaveJWTtoLocaleStorage = (access_token: string) => {
  useEffect(() => {
    if (access_token) {
      localStorage.setItem("token", access_token);
    }
  }, [access_token]);
};
