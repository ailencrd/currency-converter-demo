import ComparisonSection from "../../molecules/ComparisonSection/ComparisonSection";
// import ComparisonSectionAsInDesign from "../../molecules/ComparisonSectionAsInDesign/ComparisonSectionAsInDesign";
import MessageSection from "../../molecules/MessageSection/MessageSection";
import CurrencyConverterForm from "../CurrencyConverterForm/CurrencyConverterForm";
import "./Form.css";

const Form = () => (
  <div className="form-container">
    <div className="full">
      <CurrencyConverterForm />
    </div>
    {/* El diseño parece estar erróneo, se hicieron dos versiones del componente hasta poder validarlo */}
    <ComparisonSection />
    {/* <ComparisonSectionAsInDesign /> */}
    <MessageSection />
  </div>
);

export default Form;
