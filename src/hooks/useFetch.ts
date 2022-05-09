import { useEffect, useReducer } from "react";

import { fetchAllData } from "../apis/api";

interface State<T> {
  data?: T;
  error?: Error;
  status?: string;
}

// discriminated union type
type Action<T> =
  | { type: "loading" }
  | { type: "fetched"; payload: T }
  | { type: "error"; payload: Error };

function useFetch<T = unknown>(url?: string): State<T> {
  const initialState: State<T> = {
    error: undefined,
    data: undefined,
    status: "",
  };

  // Keep state logic separated
  const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
      case "loading":
        return { ...initialState, status: action.type };
      case "fetched":
        return { ...initialState, data: action.payload, status: action.type };
      case "error":
        return { ...initialState, error: action.payload, status: action.type };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(fetchReducer, initialState);
  useEffect(() => {
    // Do nothing if the url is not given
    if (!url) {
      return;
    }

    const fetchData = async () => {
      dispatch({ type: "loading" });

      try {
        // const response = await fetch(url, options);
        const response = await fetchAllData();

        // if (!response.ok) {
        //   throw new Error(response.statusText);
        // }
        // if (response.ok && response.status !== 200) {
        //   // console.log(response.status);
        //   throw new Error("302 error happen. Maybe you forgat .json");
        // }

        // const data = (await response.json()) as T;
        const data = response;

        dispatch({ type: "fetched", payload: data as any });
      } catch (error) {
        dispatch({ type: "error", payload: error as Error });
      }
    };

    void fetchData();
  }, [url]);

  return state;
}

export default useFetch;
