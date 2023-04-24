import { useEffect } from "react";

interface IUseResetForm {
  reset(): void;
  isSubmitSuccessful: Boolean;
}
export const useResetForm = ({ reset, isSubmitSuccessful }: IUseResetForm) => {
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);
};
