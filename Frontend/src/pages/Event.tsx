import { useQuery } from "react-query";
import { CreateEventForm } from "../components/AppForms/eventForm";
import { IEvent, IEventsResponse } from "../interfaces/event.interface";
import { GetEvents } from "../apis/eventsApi";
import { Col, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Rate } from "../components/Rating";

export const Event = () => {
  const {
    isLoading,
    isError,
    error,
    data: events,
  } = useQuery<IEventsResponse, Error>("events", GetEvents, { staleTime: 10000, cacheTime: 10000 });
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
    response = events?.data?.map((event: IEvent) => {
      const { _id, content, title, averageRate } = event;
      return (
        <Col className="mt-5" xs={12} key={_id}>
          <div className="card w-100">
            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <p className="card-text">{content}</p>
              <Link to={`/events/${_id}`}>
                <p>Click to Rate and Review</p>
                <div className="card-text">{averageRate ? <Rate rate={Number(averageRate)} /> : ""}</div>
              </Link>
              <Stack direction="horizontal" gap={3}>
                <p className="card-text mt-3">Hosted by: {event.user.userName}</p>
                <span className="ms-auto"></span>
              </Stack>
            </div>
          </div>
        </Col>
      );
    });
  }
  return (
    <>
      <div className="mt-4">
        <p>Create a New Event</p>
      </div>
      <div style={{ marginTop: "10px" }}>
        <CreateEventForm />
      </div>
      <Row className="g-3">{response}</Row>
    </>
  );
};
