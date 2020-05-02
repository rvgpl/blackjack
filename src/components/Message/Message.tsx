import React, { FunctionComponent } from "react";
import "./Message.css";

const Message: FunctionComponent = ({ children }) => {
  return children ? <h3 className="message">{children}</h3> : null;
};

export default Message;
