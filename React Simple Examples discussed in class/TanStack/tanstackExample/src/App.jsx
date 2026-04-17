import Demo from "./Demo"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

function App() {
 
  const queryCient = new QueryClient();
  return (
    <>
    <QueryClientProvider client = {queryCient}>
      <h1> TanStack query Example</h1>
      <Demo/>
    </QueryClientProvider>
    </>
  )
}

export default App
