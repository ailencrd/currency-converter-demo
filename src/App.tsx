import { FormProvider, useForm } from "react-hook-form";
import Header from "./components/atoms/Header/Header";
import MainPage from "./components/pages/MainPage";
import { ErrorBoundary } from "./components/templates/ErrorBoundary";
import type { Inputs } from "./types/form.types";

const initialValues = {
  value: "1",
  from: "USD",
  to: "EUR",
};

function App() {
  const methods = useForm<Inputs>({
    defaultValues: initialValues,
    mode: "onChange",
  });

  return (
    <ErrorBoundary>
      <FormProvider {...methods}>
        <Header title="Currency converter" />
        <MainPage />
      </FormProvider>
    </ErrorBoundary>
  );
}

export default App;
