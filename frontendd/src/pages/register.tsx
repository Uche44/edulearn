
import Form from "../components/form";
const Register: React.FC = () => {
  return (
    <div>
      <Form
        route="/api/user/register/"
        method="register"
      />
    </div>
  );
};

export default Register;
