import { Col, Row, Stack } from "react-bootstrap";
import { useQuery } from "react-query";
import { GetReviews } from "../apis/reviewsApi";
import { Rate } from "../components/Rating";
import { IEventReviewResponse, IEventReviewsResponse } from "../interfaces/review.interface";

export const Reviews = () => {
  const {
    isLoading,
    isError,
    error,
    data: reviews,
  } = useQuery<IEventReviewsResponse, Error>("reviews", GetReviews, { staleTime: 10000, cacheTime: 10000 });
  let response;
  if (isLoading) {
    response = (
      <div className="loading-skeleton">
        <div className="rectangular-div"></div>
      </div>
    );
  } else if (isError) {
    response = <p>`${error.message}`</p>;
  } else {
    response = reviews?.data?.map((event: IEventReviewResponse) => {
      const { content, rate, _id, userName } = event;
      return (
        <Col className="mt-5" xs={12} key={_id}>
          <div className="card w-100">
            <div className="card-body">
              <p className="card-text">{content}</p>
              <Stack direction="horizontal" gap={3}>
                <div>
                  <p>
                    Reviewed by: <i>{userName}</i>
                  </p>
                </div>
                <span className="ms-auto"></span>
                <div>
                  <Rate rate={rate} />
                </div>
              </Stack>
            </div>
          </div>
        </Col>
      );
    });
  }
  return (
    <>
      <Row className="g-3">{response}</Row>
    </>
  );
};
