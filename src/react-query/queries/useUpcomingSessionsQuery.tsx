import { useQuery } from "@tanstack/react-query"

import { getUpcomingSessions } from "../../api/students.api"

const useUpcomingSessionsQuery = (enabled: boolean = true) => {
  return useQuery({ queryFn: getUpcomingSessions, queryKey: ["upcoming_sessions"], enabled })
}

export default useUpcomingSessionsQuery
