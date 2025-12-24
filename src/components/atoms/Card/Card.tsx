import type { ReactNode } from "react";
import "./Card.css";

const Card = ({ children }: { children: ReactNode }) => (
  <div className="card">{children}</div>
);
export default Card;
