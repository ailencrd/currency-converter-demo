import "./MessageBox.css";

const MessageBox = ({ text }: { text: string }) => (
  <div className="message-container">
    <span>{text}</span>
  </div>
);
export default MessageBox;
