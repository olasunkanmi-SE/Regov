import { useQuery } from "react-query";
import { CreateEventForm } from "../components/AppForms/eventForm";
import { IEvent, IEventsResponse } from "../interfaces/event.interface";
import { GetEvents } from "../apis/eventsApi";
import { Col, Row } from "react-bootstrap";

export const Event = () => {
  const {
    isLoading,
    isError,
    error,
    data: events,
  } = useQuery<IEventsResponse, Error>("events", GetEvents, { staleTime: 1000000, cacheTime: 1000000 });
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
      const { _id, content, title, averageRate, user } = event;
      return (
        <Col className="mt-5" xs={12} key={_id}>
          <div className="card w-100">
            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <p className="card-text">{content}</p>
              <p className="card-text">{averageRate ? `Average rating: ${averageRate}` : ""}</p>
              <a href="#" className="btn btn-success">
                Rate
              </a>
              <p className="card-text mt-3">Hosted by: {event.user.userName}</p>
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
