import { ifetch } from "ifetch";

const delay = (x: number) => new Promise(res => setTimeout(res, x));

ifetch.interceptors.register({
  id: "sync",
  phases: {
    request(input, init) {
      console.log("sync Request:", input);
      return { input, init };
    },
    async response(response) {
      await delay(4000);
      console.log("async response: delay(4s)", response);
      return response;
    }
  }
});

ifetch.interceptors.register({
  id: "async",
  phases: {
    async request(input, init) {
      await delay(3000);
      console.log("async Request: delay(3s)", input);
      return { input, init };
    },
    response(response) {
      console.log("sync response:", response);
      return response;
    }
  }
});

(async () => console.log(await ifetch("http://localhost:3000/answer")))();
