import { Col, Row, Stack } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { GetEventReviewsById } from "../apis/reviewsApi";
import { Rate } from "../components/Rating";
import { IEventReviewResponse } from "../interfaces/review.interface";

export const Reviews = () => {
  const { id } = useParams();
  let response;
  if (id) {
    const { isLoading, data: reviews } = GetEventReviewsById(id);
    if (isLoading) {
      response = (
        <div className="loading-skeleton">
          <div className="rectangular-div"></div>
        </div>
      );
    } else {
      response = reviews?.map((event: IEventReviewResponse) => {
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
  }

  return (
    <>
      <Row className="g-3">{response}</Row>
    </>
  );
};
