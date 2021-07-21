export interface Alert {
  message: string;
  messageType: string;
  id?: string;
}

export interface ErrorAlert extends Alert {}

export interface SuccessAlert extends Alert {}
