import { Row } from "react-bootstrap";
import { useQuery } from "react-query";
import { GetDraftEvents } from "../apis/eventsApi";
import { IEvent, IEventsResponse } from "../interfaces/event.interface";
import { CreateEventForm } from "../components/AppForms/eventForm";

export const EventDraft = () => {
  const {
    isLoading,
    isError,
    error,
    data: draftEvents,
  } = useQuery<IEventsResponse, Error>("reviews", GetDraftEvents, { staleTime: 10000, cacheTime: 10000 });
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
    response = draftEvents?.data?.map((event: IEvent, i) => {
      const { content, title, _id } = event;
      return (
        <div className="mt-5" key={i}>
          <div style={{ marginTop: "10px" }}>
            <CreateEventForm title={title} content={content} saveAsPost={true} id={_id} />
          </div>
        </div>
      );
    });
  }
  return (
    <>
      <Row className="g-3">{response}</Row>
    </>
  );
};
