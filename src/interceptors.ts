import { Interceptors, Interceptor } from "./types";

export const icContainer: Interceptor[] = [];

export const interceptors: Interceptors = {
  register(interceptor) {
    icContainer.push(interceptor);
  }
};
