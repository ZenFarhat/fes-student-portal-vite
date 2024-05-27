import { useState } from "react"
import SidePanel from "./components/SidePanel"
import StudentRow from "./components/StudentRow"
import UpcomingSessions from "./components/UpcomingSessions"
import CreateUserForm from "./components/forms/AddStudentForm"

import useStudentsQuery from "./react-query/queries/useStudentsQuery"
import useSidePanelStore from "./store/sidepanel.store"
import SearchBar from "./components/SearchBar"

function App() {
  const [name, setName] = useState<string | undefined>(undefined)
  const { data, refetch } = useStudentsQuery(true, name?.trim())

  const { setComponent } = useSidePanelStore()

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="mb-4 text-2xl">FES Student Database</h1>
        <button className="p-2 bg-blue-500 text-white mb-4 rounded-xl shadow-xl" onClick={() => setComponent(<CreateUserForm />, "Create a student record")}>
          Add Student
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 mb-8">
        <UpcomingSessions />
      </div>
      <SearchBar onChange={(e) => setName(e)} onSearch={() => refetch()} />
      <div className="grid grid-cols-4 text-xs">
        <p>First Name</p>
        <p>Progress</p>
        <p>Next check-in</p>
        <p className="text-right">Edit / View Info</p>
      </div>
      <div>
        {data?.map((item) => (
          <StudentRow student={item} key={item.id} />
        ))}
      </div>
      <SidePanel />
    </div>
  )
}

export default App
