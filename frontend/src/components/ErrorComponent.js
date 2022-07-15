import React from "react";
import Alert from "@material-ui/lab/Alert";

export default function ErrorComponent() {
  return (
    <div>
      <Alert variant="filled" severity="error" className="errorCom">
        Please enter a valid todo
      </Alert>
    </div>
  );
}
