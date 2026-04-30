import { useState, useEffect, useRef } from 'react';

interface ApiResult<T> {
  data: T;
  loading: boolean;
  error: string | null;
  usingMock: boolean;
  refetch: () => void;
}

export function useApiWithFallback<T>(
  apiCall: () => Promise<T>,
  mockData: T,
  deps: unknown[] = [],
): ApiResult<T> {
  const [data, setData] = useState<T>(mockData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usingMock, setUsingMock] = useState(false);
  const [tick, setTick] = useState(0);

  // keep apiCall stable via ref so we don't get stale closure issues
  const callRef = useRef(apiCall);
  callRef.current = apiCall;

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    callRef.current()
      .then((result) => {
        if (!cancelled) {
          setData(result);
          setUsingMock(false);
          setError(null);
        }
      })
      .catch((err: Error) => {
        if (!cancelled) {
          setData(mockData);
          setUsingMock(true);
          setError(err.message);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tick, ...deps]);

  const refetch = () => setTick((t) => t + 1);

  return { data, loading, error, usingMock, refetch };
}
