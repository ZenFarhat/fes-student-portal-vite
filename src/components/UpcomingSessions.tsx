import useUpcomingSessionsQuery from "../react-query/queries/useUpcomingSessionsQuery"

const UpcomingSessions = () => {
  const { data } = useUpcomingSessionsQuery()

  return (
    <div className="w-full h-full text-sm lg:text-auto">
      <h1 className="font-bold mb-2">UPCOMING CHECK-IN SESSIONS</h1>
      {data?.map((data) => (
        <div>
          {data.firstName} {data.lastName} - {data.nextCheckin}
        </div>
      ))}
    </div>
  )
}

export default UpcomingSessions
