import { useRef, useEffect } from "react"
import useSidePanelStore from "../store/sidepanel.store"

const SidePanel = () => {
  const { component, setComponent, header } = useSidePanelStore()
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleMouseUp = (event: MouseEvent) => {
      console.log(ref.current)
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setComponent(null, null)
      }
    }

    document.addEventListener("mouseup", handleMouseUp)

    return () => {
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [setComponent])

  if (!component) return null

  return (
    <div className="w-3/6 fixed top-0 right-0 bg-white h-screen shadow-2xl rounded-xl p-4" ref={ref}>
      <h1 className="text-4xl mb-4">{header}</h1>
      {component}
    </div>
  )
}

export default SidePanel
