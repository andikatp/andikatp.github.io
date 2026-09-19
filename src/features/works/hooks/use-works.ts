import { useEffect, useState } from "react";
import { WORKS, type WorkItem } from "../data/work-data";
import { fetchWorksFromContentful } from "../services/work-service";

export function useWorks() {
  const [works, setWorks] = useState<WorkItem[]>(WORKS);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    fetchWorksFromContentful()
      .then((data) => {
        if (isMounted) {
          setWorks(data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || "Failed to load works");
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { works, isLoading, error };
}
