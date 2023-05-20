import axios from "axios";
import { QueryObserverResult, useQuery } from "react-query";
import { baseURL } from "../constants";
import { ICreateEvent, IEventResponse } from "../interfaces/event.interface";

const userApi = axios.create({
  baseURL: baseURL,
});

export const GetEvents = async (): Promise<IEventResponse[]> => {
  const response = await userApi.get("/events");
  return response.data;
};

export const CreateEvent = async (event: ICreateEvent): Promise<IEventResponse> => {
  const response = await userApi.post("/events", event);
  return response.data;
};

const QueryEventItem = async (id: string): Promise<IEventResponse> => {
  const response = await userApi.get(`/events/event?id=${id}`);
  return response.data;
};

export const GetUserById = (id: string): QueryObserverResult<IEventResponse> => {
  return useQuery<IEventResponse, Error>(["event", id], async () => QueryEventItem(id), {
    staleTime: 1000000,
    cacheTime: 1000000,
    onSuccess: (res) => {
      return {
        data: res.data,
        isSuccess: res.success,
      };
    },
    onError: (err) => {
      return err.message;
    },
  });
};
