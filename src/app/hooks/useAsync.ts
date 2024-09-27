import { useCallback, useState } from 'react';

// Define the possible states for async operations
export const ASYNC_STATE = {
  LOADING: 'LOADING',
  HAS_VALUE: 'HAS_VALUE',
  HAS_ERROR: 'HAS_ERROR',
};

// Interface for the async state
export interface IAsyncState {
  loading: null | typeof ASYNC_STATE.LOADING;
  hasValue: null | typeof ASYNC_STATE.HAS_VALUE;
  hasError: null | typeof ASYNC_STATE.HAS_ERROR;
  contents: any;
}

// Initial state definition
const initialState: IAsyncState = {
  loading: null,
  hasValue: null,
  hasError: null,
  contents: null,
};

/**
 * Hook to provide async status of an API call
 *
 * @returns a tuple [state, executeAsync, resetState]
 * state - async state of Promise
 * executeAsync - function that accepts a Promise and can be invoked on event handling etc...
 * resetState - function to reset the state to initial null values
 */
const useAsync = () => {
  const [state, setState] = useState<IAsyncState>(initialState);

  // Function to reset state to initial values
  const resetState = useCallback(() => {
    setState(initialState);
  }, []);

  // Function to execute an async promise and set state accordingly
  const executeAsync = useCallback(async (promise: Promise<any>) => {
    setState({
      loading: ASYNC_STATE.LOADING,
      hasValue: null,
      hasError: null,
      contents: null,
    });

    try {
      const res = await promise; // Wait for the promise to resolve
      setState({
        loading: null,
        hasValue: ASYNC_STATE.HAS_VALUE,
        hasError: null,
        contents: res,
      });
    } catch (err: any) {
      setState({
        loading: null,
        hasValue: null,
        hasError: ASYNC_STATE.HAS_ERROR,
        contents: err,
      });
      throw new Error(err); // Optional: propagate the error
    }
  }, []);

  return [state, executeAsync, resetState] as [
    IAsyncState,
    (promise: Promise<any>) => Promise<void>,
    () => void
  ];
};

export default useAsync;
