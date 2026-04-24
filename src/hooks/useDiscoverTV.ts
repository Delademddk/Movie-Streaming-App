import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { discoverTV } from "@/api/tmdb";

export function useDiscoverTV(filters: any) {
  return useQuery({
    queryKey: ["discover-tv", filters],
    queryFn: () => discoverTV(filters),
    placeholderData: keepPreviousData,
  });
}