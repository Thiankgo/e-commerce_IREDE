import { useEffect, useState } from "react"
import { IoMdSearch } from "react-icons/io"
import { useNavigate } from "react-router-dom"

export default function SearchBar() {
    const [searchText, setSearchText] = useState('')
    const navigate = useNavigate()

    function handleSearch(e) {
        if (e.key === 'Enter') {
            window.location.href = `/produtos?search=${encodeURIComponent(searchText)}`
        }
    }

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search)
        const querySearch = searchParams.get('search')
        if (querySearch) {
            setSearchText(querySearch)
        }
    }, [])

    return (
        <>
            <div className="flex lg:hidden align-middle w-full max-w-[600px] relative mx-auto">
                <IoMdSearch className="fill-[#666666] absolute w-4 left-2 bottom-2" />
                <input placeholder="Buscar" type="text" value={searchText} onChange={(e) => setSearchText(e.target.value)} onKeyDown={handleSearch} className="h-[32px] w-full pl-[28px] text-[#666666] text-[12px] font-[400] rounded" />
            </div>
            <div className="hidden lg:flex align-bottom w-full max-w-[520px] relative mx-auto">
                <IoMdSearch className="fill-[#666666] absolute w-6 left-1 bottom-[14px]" />
                <input placeholder="Buscar" type="text" value={searchText} onChange={(e) => setSearchText(e.target.value)} onKeyDown={handleSearch} className="h-[44px] w-full pl-[28px] text-[#666666] text-[16px] font-[400] rounded" />
            </div>
        </>
    )
}