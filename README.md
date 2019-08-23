# ifetch
Ifetch is the same as the `fetch` browser API but also it has the feature to intercept request and response.

```typescript
import ifetch from 'ifetch'

ifetch.interceptor.register({
  id: "ID for this interceptors",
  phases: {
    request:(input: RequestInfo, init?: RequestInit) {
      return {input, init}
    }
  }
})
```
