import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { z } from "zod";
import { useAuth } from "../../hooks/useAuth";
import { FormInput } from "../Form/form-input";

export type loginFormProps = {
  email: string;
  password: string;
};

const validateInputSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(8, "InValid Password"),
});

type validationSchema = z.infer<typeof validateInputSchema>;

export const LoginForm = () => {
  const { login, error, isAuthenticated } = useAuth();
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<validationSchema>({ resolver: zodResolver(validateInputSchema) });

  const onSubmit: SubmitHandler<validationSchema> = (data) => login(data);

  return (
    <div>
      <div className="mb-3">
        {error ? (
          <Alert key="danger" variant="danger">
            {error}
          </Alert>
        ) : (
          ""
        )}
      </div>
      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormInput<loginFormProps>
              type="email"
              id="email"
              name="email"
              placeholder="Enter email"
              register={register}
              errors={errors}
            />
            <FormInput<loginFormProps>
              type="password"
              id="password"
              name="password"
              placeholder="Enter password"
              register={register}
              errors={errors}
            />
            <Button className="w-100" variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};
