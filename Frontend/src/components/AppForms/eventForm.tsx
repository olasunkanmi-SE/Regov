import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useAuth } from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { ICreateEvent, IEventResponse, IUpdateEvent } from "../../interfaces/event.interface";
import { FormInput } from "../Form/form-input";

export type EventFormProps = {
  title: string;
  type: string;
  content: string;
  saveAsPost?: boolean;
  id?: string;
};

const validateInputSchema = z.object({
  title: z.string().min(1),
  type: z.string().min(1),
  content: z.string().min(1),
});

type validationSchema = z.infer<typeof validateInputSchema>;

export const CreateEventForm = ({ title, content, saveAsPost, id }: Partial<EventFormProps>) => {
  const queryClient = useQueryClient();

  const { isAuthenticated } = useAuth();

  const navigate = useNavigate();

  const { reset } = useForm();

  const axiosPrivate = useAxiosPrivate();

  const updatePostApi = async (review: Partial<ICreateEvent>): Promise<IEventResponse> => {
    const response = await axiosPrivate.patch("/events", review);
    return response.data;
  };
  const createReviewMutation = useMutation(updatePostApi, {
    onSuccess: () => {
      queryClient.invalidateQueries("events");
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const updatePost = (review: IUpdateEvent) => {
    createReviewMutation.mutate(review);
  };

  const CreateEvent = async (event: ICreateEvent): Promise<IEventResponse> => {
    const response = await axiosPrivate.post("/events", event);
    return response.data;
  };
  const createEventMutation = useMutation(CreateEvent, {
    onSuccess: () => {
      queryClient.invalidateQueries("events");
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const createEvent = (event: ICreateEvent) => {
    createEventMutation.mutate(event);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<validationSchema>({ resolver: zodResolver(validateInputSchema) });

  const onSubmit: SubmitHandler<validationSchema> = (data) => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      if (saveAsPost && id) {
        updatePost({ ...data, id });
      } else {
        createEvent(data);
      }
    }
    reset();
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
          value={title}
        />
        <textarea
          className="form"
          id="content"
          placeholder="  Start typing..."
          style={{ height: "100px", width: "100%" }}
          {...register("content")}
          value={content}
        />
        {saveAsPost ? (
          <div>
            <select {...register("type")} style={{ width: "100%", height: "40px" }} className="form mt-3">
              <option value="">Select Post Type</option>
              <option value="post">Post</option>
            </select>
            <Button className="w-100 mt-4" variant="success" type="submit">
              Post
            </Button>
          </div>
        ) : (
          <div>
            <select {...register("type")} style={{ width: "100%", height: "40px" }} className="form mt-3">
              <option value="">Select Post Type</option>
              <option value="post">Post</option>
              <option value="draft">Draft</option>
            </select>
            <Button className="w-100 mt-4" variant="success" type="submit">
              Post
            </Button>
          </div>
        )}
      </Form>
    </div>
  );
};
