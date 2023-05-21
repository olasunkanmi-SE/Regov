import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Alert, Card } from "react-bootstrap";
import { FormInput } from "../Form/form-input";
import { useAuth } from "../../hooks/useAuth";
import { Navigate } from "react-router-dom";

export type RegisterFormProps = {
  email: string;
  userName: string;
  password: string;
  confirmPassword: string;
};

const validateInputSchema = z
  .object({
    email: z.string().email("Enter a valid email address"),
    userName: z.string().min(2),
    password: z.string().min(8, "Enter a minimum of 8 characters").max(256, "Consider using a short password"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password does not match",
  });

type validationSchema = z.infer<typeof validateInputSchema>;

export const AuthForm = () => {
  const { signUp, error, isAuthenticated } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<validationSchema>({ resolver: zodResolver(validateInputSchema) });

  const onSubmit: SubmitHandler<validationSchema> = (data) => signUp(data);
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }
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
            <FormInput<RegisterFormProps>
              type="email"
              id="email"
              name="email"
              placeholder="email"
              register={register}
              errors={errors}
            />
            <FormInput<RegisterFormProps>
              type="text"
              id="userName"
              name="userName"
              placeholder="Username"
              register={register}
              errors={errors}
            />
            <FormInput<RegisterFormProps>
              id="password"
              name="password"
              type="password"
              placeholder="password"
              register={register}
              errors={errors}
            />
            <FormInput<RegisterFormProps>
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="confirm password"
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
