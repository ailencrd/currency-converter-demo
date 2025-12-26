import { useCurrencyConverter } from "../../hooks/useCurrencyConverter";
import { useErrorToast } from "../../hooks/useErrorToast";
import Toast from "../molecules/Toast/Toast";
import FormContent from "../templates/FormContent/FormContent";
import "./MainPage.css";

const MainPage = () => {
  const { error } = useCurrencyConverter();
  const { visible, message, onClose } = useErrorToast(error);
  
  return (
    <>
      <Toast visible={visible} message={message ?? ''} onClose={onClose} />
      <div className="content">
        <FormContent />
      </div>
    </>
  );
};
export default MainPage;
