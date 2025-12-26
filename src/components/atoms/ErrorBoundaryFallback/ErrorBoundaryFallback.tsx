import "./ErrorBoundaryFallback.css";

const ErrorBoundaryFallback = ({ onRetry }: { onRetry: () => void }) => (
  <div className="error-boundary">
    <h2 className="error-boundary-title">Algo salió mal</h2>
    <p className="error-boundary-message">
      Recargá la página o intentá nuevamente.
    </p>
    <button
        className="error-boundary-button"
        onClick={onRetry}
      >
        Reintentar
      </button>
  </div>
);
export default ErrorBoundaryFallback;
