import {
  COMMON_ERROR_MESSAGE,
  SPECIFIC_SERVER_ERROR_MESSAGE,
  TYPO_ERROR_MESSAGE,
} from "../constants/commonErrorMessage";

type ErrorMessageProps = {
  errorMessage?: any;
};

function CommonError({ errorMessage }: ErrorMessageProps) {
  if (errorMessage) {
    return (
      <>
        <h1>{errorMessage}</h1>
        <p>{SPECIFIC_SERVER_ERROR_MESSAGE}</p>
      </>
    );
  }
  return (
    <div>
      <h1>{COMMON_ERROR_MESSAGE}</h1>
      <p>{TYPO_ERROR_MESSAGE}</p>
    </div>
  );
}

export default CommonError;
