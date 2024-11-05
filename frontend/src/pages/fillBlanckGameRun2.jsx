import React from 'react'
import { useParams } from 'react-router-dom'
import { SelectOptions } from '../components/fillBlanckGame/select-options';


/**
 * Renders the FillBlankGameRun2 component
 * @returns {JSX.Element} A div containing the SelectOptions component
 */
export const FillBlankGameRun2 = () => {      

  return (
    <div className='w-full'>
        <SelectOptions />
    </div>
  )
}

    // export default FillBlankGameRun