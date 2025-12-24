import Card from "../../atoms/Card/Card";
import MainTitle from "../../molecules/MainTitle/MainTitle";
import Form from "../../organisms/Form/Form";
import "./FormContent.css";

const FormContent = () => (
  <div className="form-content">
    <MainTitle />
    <Card>
      <Form />
    </Card>
  </div>
);
export default FormContent;
