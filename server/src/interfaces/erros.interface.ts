export interface AuthError {
  errors: [
    {
      message: string;
    }
  ];
}

export interface GeneralError {
  errors: GeneralSingleError[];
}

export interface GeneralSingleError {
  message: string;
}
