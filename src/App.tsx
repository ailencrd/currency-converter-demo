import { FormProvider, useForm } from "react-hook-form";
import Header from "./components/atoms/Header/Header";
import MainPage from "./components/pages/MainPage";
import type { Inputs } from "./types/form.types";

const initialValues = {
  value: '1',
  from: "USD",
  to: "EUR",
};

function App() {
  const methods = useForm<Inputs>({
    defaultValues: initialValues,
    mode: "onChange",
  });

  return (
    <FormProvider {...methods}>
      <Header title="Currency converter" />
      <MainPage />
    </FormProvider>
  );
}

export default App;
