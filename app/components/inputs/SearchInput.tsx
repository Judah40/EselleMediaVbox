import { Search } from 'lucide-react'
import React from 'react'

const SearchInput = () => {
  return (
    <div className='flex w-full '>
        <input className='flex-1 p-3 rounded-l-full' placeholder='Search'/>
        <button className='px-4 rounded-r-full border'>

        <Search size={24} />
        </button>
    </div>
  )
}

export default SearchInput