import "./FieldErrorMessage.css";

const FieldErrorMessage = ({ message }: { message: string }) => (
  <span className="error-message">{message}</span>
);

export default FieldErrorMessage;
