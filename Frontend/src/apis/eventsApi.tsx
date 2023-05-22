import { QueryObserverResult, useQuery } from "react-query";
import { ICreateEvent, IEventResponse, IEventsResponse } from "../interfaces/event.interface";
import { eventApi } from "./axios";

export const GetEvents = async (): Promise<IEventsResponse> => {
  const response = await eventApi.get("/events");
  return response.data;
};

export const CreateEvent = async (event: ICreateEvent): Promise<IEventResponse> => {
  const response = await eventApi.post("/events", event);
  return response.data;
};

const QueryEventItem = async (id: string): Promise<IEventResponse> => {
  const response = await eventApi.get(`/events/event?id=${id}`);
  return response.data;
};

export const GetEventById = (id: string): QueryObserverResult<IEventResponse> => {
  return useQuery<IEventResponse, Error>(["event", id], async () => QueryEventItem(id), {
    staleTime: 10000,
    cacheTime: 10000,
    onSuccess: (res) => {
      return {
        data: res,
        isSuccess: res.success,
      };
    },
    onError: (err) => {
      return err.message;
    },
  });
};
