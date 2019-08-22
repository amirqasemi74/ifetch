import { interceptors, icContainer } from "./interceptors";
import { Ifetch, InterceptedRequest } from "./types";

const env = window;
export const originalFetch = env.fetch.bind(window);

export const ifetch: Ifetch = async (
  input: RequestInfo,
  init?: RequestInit
) => {
  // Request intercepting
  let request: InterceptedRequest = { input, init };
  const requestICs = icContainer
    .filter(ic => ic.phases.request)
    .map(ic => ic.phases.request);
  for (const requestIC of requestICs) {
    request = await requestIC(request.input, request.init);
  }

  // Response Intercepting
  let response = await originalFetch(input, init);
  const responseICs = icContainer
    .filter(ic => ic.phases.response)
    .map(ic => ic.phases.response);
  for (const responseIC of responseICs) {
    response = await responseIC(response);
  }

  return response;
};
ifetch.interceptors = interceptors;
