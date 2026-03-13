
import { useEffect, useState } from 'react';

const API_BASE_URL = 'http://localhost:3000';           // variable storing the base URL of the backend API.http://localhost:3000/resources

export function useResources() {                        // Custom Hook is a reusable function that uses React hooks internally.All compomnents can reuse this hook to fetch data
  const [resources, setResources] = useState([]);       // creates state variable called resources.
  const [isLoading, setIsLoading] = useState(true);     // Tracks whether data is currently loading.Without loading state users see blank screen.
  const [error, setError] = useState(null);             // Stores API errors.

  async function fetchResources(signal) {               // API calls take time. So we use async/await.
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE_URL}/resources`, { signal });     //This sends HTTP request. Final URL becomes: http://localhost:3000/resources .fetch() is a browser API for HTTP requests. signal allows canceling request.
                                                                            // The signal option in fetch is a property that accepts an AbortSignal object, allowing you to cancel, abort, or time out an ongoing HTTP request. 
                                                                            // It is part of the AbortController interface, used to prevent unnecessary network usage and manage UI updates for requests that are no longer needed.

      if (!res.ok) {
        throw new Error(`Request failed: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();                    // Most APIs send data in JSON.Command res.json() converts JSON → JavaScript object.
      setResources(data);                               // This updates state.React automatically re-renders UI. Before: resources = [], After:resources = API data
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err);
      }
    } finally {                                         // Runs always.Loading finished.
      setIsLoading(false);
    }
  }

  useEffect(() => {                                     // Used for side effects.
    const controller = new AbortController();           // Creates request cancellation controller. AbortController API Used to cancel: fetch requests
    fetchResources(controller.signal);                  // We pass the signal.This connects request to controller.

    return () => {                                      // useEffect Cleanup, Runs when:component unmount, or effect re-runs.
      controller.abort();                               // Abort Request
    };
  }, []);                                               // runs only on mount,API request happens only one time.In real applications, data often changes.Without refetch, the component cannot trigger the fetch again.

  function refetch() {                                  // Manual reload function.
    const controller = new AbortController();           // New request controller.
    fetchResources(controller.signal);                  // Fetch data again.
  }

  return { resources, isLoading, error, refetch };      // Return Hook Data
}