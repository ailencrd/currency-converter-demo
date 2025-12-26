import "./Toast.css";

interface IToastProps {
  message: string;
  visible: boolean;
  onClose: () => void;
}

const Toast = ({ message, visible, onClose }: IToastProps) => (
  <div className={`toast-container ${visible ? "enter" : "exit"}`}>
    <span>{message}</span>
    <button className={"toast-button"} onClick={onClose}>
      ✕
    </button>
  </div>
);

export default Toast;
