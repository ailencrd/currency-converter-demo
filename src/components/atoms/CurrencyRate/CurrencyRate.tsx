import type { ReactNode } from "react";
import "./CurrencyRate.css";

const CurrencyRate = ({ title, detail }: { title: ReactNode; detail: ReactNode }) => (
  <div className="container">
    <h1 className="title">{title}</h1>
    <h2 className="detail">{detail}</h2>
  </div>
);

export default CurrencyRate;
