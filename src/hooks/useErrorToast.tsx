import { useEffect, useState } from "react";

export const useErrorToast = (error: Error | null) => {
  const [message, setMessage] = useState<string>();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!error) return;

    const msg =
      error instanceof Error ? error.message : "Ocurrió un error inesperado";

    // Ignoramos este error porque no es un proyecto para producción
    // Error: Calling setState synchronously within an effect can trigger cascading renders
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMessage(msg);
    setVisible(true);
  }, [error]);

  useEffect(() => {
    if (!visible) return;

    const timer = setTimeout(() => {
      setVisible(false);
    }, 4000);

    return () => {
      clearTimeout(timer);
    };
  }, [visible]);

  return {
    visible,
    message,
    onClose: () => {
      setVisible(false);
    },
  };
};
