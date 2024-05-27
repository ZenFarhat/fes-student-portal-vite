import { IoIosSettings } from "react-icons/io"
import EditStudentForm from "./forms/EditStudentForm"
import { IStudentProfile } from "./../types/student.interface"
import useSidePanelStore from "../store/sidepanel.store"

interface Props {
  student: IStudentProfile
}

const StudentRow = (props: Props) => {
  const { student } = props

  const { setComponent } = useSidePanelStore()

  return (
    <>
      <div className="grid grid-cols-4 border-2 rounded mb-2 shadow-xl p-2 text-xs lg:text-sm justify-items-start">
        <p>{student.firstName}</p>
        <p>{student.progress}</p>
        <p>{student.nextCheckin}</p>
        <IoIosSettings size={30} className="cursor-pointer justify-self-end" onClick={() => setComponent(<EditStudentForm student={student} />, "Edit " + student.firstName)} />
      </div>
    </>
  )
}

export default StudentRow
