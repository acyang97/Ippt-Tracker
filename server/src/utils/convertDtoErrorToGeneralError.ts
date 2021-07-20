import {
  GeneralError,
  GeneralSingleError,
} from "../interfaces/erros.interface";

interface DtoError {
  [key: string]: string;
}
export const converDtoErrorToGeneralError = (
  errors: DtoError[]
): GeneralError => {
  const modifiedErrors: GeneralSingleError[] = [];
  errors.forEach((err) => {
    for (const key in err) {
      modifiedErrors.push({ message: err[key] });
    }
  });
  return {
    errors: modifiedErrors,
  };
};
