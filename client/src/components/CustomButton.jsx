import state from '../store'
import { useSnapshot } from 'valtio'
import { generateStyle } from '../config/helpers'

const CustomButton = ({ title, customStyles, handleClick }) => {
  const snap = useSnapshot(state)

  return (
    <button
      className={`px-2 py-1.5 flex-1 font-semibold rounded-md ${customStyles} hover:scale-110 transition ease-in-out duration-200`}
      style={generateStyle(snap)}
      onClick={handleClick}
    >
      {title}
    </button>
  )
}

export default CustomButton
