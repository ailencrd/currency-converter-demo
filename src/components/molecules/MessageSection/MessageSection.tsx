import MessageBox from "../../atoms/MessageBox/MessageBox";
import ConversionDetailAndDate from "../ConversionDetailAndDate/ConversionDetailAndDate";
import "./MessageSection.css";

const MessageSection = () => (
  <div className="message-section-container">
    <MessageBox text="We use the mid-market rate for our Converter. This is for informational purposes only. You won't recieve this rate when sending money." />
    <ConversionDetailAndDate />
  </div>
);

export default MessageSection;
