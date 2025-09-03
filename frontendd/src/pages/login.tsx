import React from "react";
import Form from "../components/form";
const Login: React.FC = () => {
  return (
    <div>
      <Form
        route="api/token/"
        method="login"
      />
    </div>
  );
};

export default Login;
