import { useEffect, useState } from "react"
import { IoMdSearch } from "react-icons/io"
import { useNavigate, useSearchParams } from "react-router-dom"

export default function SearchBar() {
    const [searchParams, setSearchParams] = useSearchParams();

    const [searchText, setSearchText] = useState('')
    const navigate = useNavigate()

    function handleSearch(e) {
        // e.preventDefault()
        let params = serializeFormQuery(e.target)
        // searchParams.append("search", searchText)
        setSearchParams(params)
        console.log(params)
        // setSearchParams(encodeURIComponent(searchText))
        // navigate( `/produtos?search=${encodeURIComponent(searchText)}`)

    }

    useEffect(() => {
        const querySearch = searchParams.get('search')
        if (querySearch) {
            setSearchText(querySearch)
        }
    }, [searchParams])

    return (
        <>
            <form onSubmit={handleSearch} className="flex lg:hidden align-middle w-full max-w-[600px] relative mx-auto">
                <IoMdSearch className="fill-[#666666] absolute w-4 left-2 bottom-2" />
                <input placeholder="Buscar" type="text" name="search" value={searchText} onChange={(e) => setSearchText(e.target.value)} className="h-[32px] w-full pl-[28px] text-[#666666] text-[12px] font-[400] rounded" />
            </form>
            <form onSubmit={handleSearch} className="hidden lg:flex align-bottom w-full max-w-[520px] relative mx-auto">
                <IoMdSearch className="fill-[#666666] absolute w-6 left-1 bottom-[14px]" />
                <input placeholder="Buscar" type="text" name="search"  value={searchText} onChange={(e) => setSearchText(e.target.value)} className="h-[44px] w-full pl-[28px] text-[#666666] text-[16px] font-[400] rounded" />
            </form>
        </>
    )
}