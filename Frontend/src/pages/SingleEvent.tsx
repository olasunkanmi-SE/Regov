import { Navigate, useParams } from "react-router-dom";
import { GetEventById } from "../apis/eventsApi";
import { Rate } from "../components/Rating";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form } from "react-bootstrap";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { IEventReview, IEventReviewResponse } from "../interfaces/review.interface";
import { useMutation, useQueryClient } from "react-query";
import { useAuth } from "../hooks/useAuth";
import { Reviews } from "../components/Reviews";

export type loginFormProps = {
  content: string;
  rate: string;
};

const validateInputSchema = z.object({
  content: z.string().min(1),
  rate: z.string(),
});

type validationSchema = z.infer<typeof validateInputSchema>;

export const SingleEvent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<validationSchema>({ resolver: zodResolver(validateInputSchema) });

  const queryClient = useQueryClient();

  const { isAuthenticated, currentUser } = useAuth();

  const axiosPrivate = useAxiosPrivate();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const CreateReview = async (review: IEventReview): Promise<IEventReviewResponse> => {
    const response = await axiosPrivate.post("/reviews", review);
    return response.data;
  };
  const createReviewMutation = useMutation(CreateReview, {
    onSuccess: () => {
      queryClient.invalidateQueries("events");
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const createEventReview = (review: IEventReview) => {
    createReviewMutation.mutate(review);
  };

  const { id } = useParams();

  const onSubmit: SubmitHandler<validationSchema> = (data: any) => {
    const userId = currentUser._id;
    const eventId = id;
    data = { ...data, user: userId, event: eventId };
    createEventReview(data);
  };

  const ratings: string[] = ["1", "2", "3", "4", "5"];

  let response;
  if (id) {
    const { isLoading, data: event } = GetEventById(id);
    if (isLoading) {
      response = (
        <div className="loading-skeleton">
          <div className="rectangular-div"></div>
        </div>
      );
    } else {
      if (event) {
        const { title, content, averageRate } = event.data;
        return (
          <div className="mt-3">
            <div className="card w-100">
              <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <div className="mb-2 mt-2">
                  {" "}
                  <i className="card-text">
                    <p style={{ fontSize: "14px", color: "green" }}>{`Hosted by ${event.data.user.userName}`}</p>
                  </i>
                </div>

                <p className="card-text">{content}.</p>
                <Rate rate={Number(averageRate)} />
                <p>Leave a Review</p>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <div>
                    <textarea
                      className="form"
                      id="content"
                      placeholder="  Start typing..."
                      style={{ height: "100px", width: "100%" }}
                      {...register("content")}
                    />
                    <select {...register("rate")} style={{ width: "100%", height: "40px" }} className="form mt-3">
                      <option value="">Rating this event</option>
                      {ratings.map((rate) => (
                        <option key={rate} value={rate}>
                          {rate}
                        </option>
                      ))}
                    </select>
                    <Button className="w-100 mt-4" variant="success" type="submit">
                      Review
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
            <Reviews />
          </div>
        );
      }
    }
  }
  return <>{response}</>;
};
