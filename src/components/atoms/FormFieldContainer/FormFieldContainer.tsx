import type { ReactNode } from "react";
import "./FormFieldContainer.css";

const FormFieldContainer = ({ children }: { children: ReactNode }) => (
  <div className="form-field">{children}</div>
);

export default FormFieldContainer;
