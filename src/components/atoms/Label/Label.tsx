import "./Label.css";

const Label = ({ htmlFor, text }: { htmlFor: string; text: string }) => (
  <label htmlFor={htmlFor} className="form-label">
    {text}
  </label>
);
export default Label;
