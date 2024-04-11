'use client';
import SearchInput from "@/components/input/search-input"
import { useCallback, useState } from "react"

const ConceptComponent = () => {
    const [searchValue, setSearchValue] = useState('')
    const testHandleSearch = useCallback(
        async (value: string) => {
   
            setSearchValue(value)
        }, 
        []
    )
    return (
        <div className="flex md:container">
            <SearchInput 
            placeholder={""} 
            handler={testHandleSearch} />
            <span>
                {searchValue}
            </span>
        </div>
    )
}

export default ConceptComponent