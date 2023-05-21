import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Button, Form, Stack } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { FormInput } from "../Form/form-input";

type postType = "draft" | "post";
export type EventFormProps = {
  title: string;
  type: postType;
  content: string;
};

const validateInputSchema = z.object({
  title: z.string(),
  type: z.enum(["draft", "post"]),
  content: z.string(),
});

type validationSchema = z.infer<typeof validateInputSchema>;

export const CreateEventForm = () => {
  const [postType, setPostType] = useState<string>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<validationSchema>({ resolver: zodResolver(validateInputSchema) });

  const onSubmit: SubmitHandler<validationSchema> = (data) => console.log(data);

  const handleDraft = () => {
    setPostType("draft");
  };

  const handlePost = () => {
    setPostType("post");
  };

  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormInput<EventFormProps>
          id="title"
          name="title"
          placeholder="Event title"
          register={register}
          errors={errors}
        />
        <FormInput<EventFormProps>
          type="text"
          id="content"
          name="content"
          placeholder="Start typing ..."
          register={register}
          errors={errors}
          style={{ height: "100px" }}
        />
        <div style={{ display: "none" }}>
          <FormInput<EventFormProps> id="type" name="type" register={register} value={postType} errors={errors} />
        </div>
        <div>
          <Stack direction="horizontal" gap={3}>
            <div className="ms-auto">
              <Button variant="dark" type="submit" onClick={handleDraft}>
                Draft
              </Button>
            </div>
            <div>
              <Button variant="success" type="submit" onClick={handlePost}>
                Post
              </Button>
            </div>
          </Stack>
        </div>
      </Form>
    </div>
  );
};
