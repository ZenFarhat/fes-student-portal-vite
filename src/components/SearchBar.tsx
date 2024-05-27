interface Props {
  onChange: (val: string) => void
  onSearch: () => void
}

const SearchBar = (props: Props) => {
  const { onChange, onSearch } = props

  return (
    <div className="flex mb-4 items-stretch">
      <input type="text" className="flex-1 border-2 p-2" onChange={(e) => onChange(e.target.value)} onKeyDown={(e) => e.key === "Enter" && onSearch()} />
      <button className="bg-blue-500 text-white shadow-xl block self-stretch" onClick={onSearch}>
        Search
      </button>
    </div>
  )
}

export default SearchBar
