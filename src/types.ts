type AlsoPromised<T> = Promise<T> | T;

export interface Ifetch {
  (input: RequestInfo, init?: RequestInit): Promise<Response>;
  interceptors: Interceptors;
}

export interface InterceptedRequest {
  input: RequestInfo;
  init?: RequestInit;
}

export interface Interceptors {
  register(interceptor: Interceptor): void;
}

export interface Interceptor {
  id: string;
  phases: InterceptPhases;
}

export interface InterceptPhases {
  request?(
    input: RequestInfo,
    init?: RequestInit
  ): AlsoPromised<InterceptedRequest>;
  response?(response: Response, input: RequestInfo, init?: RequestInit): AlsoPromised<Response>;
}
