import CustomButton from './CustomButton'
import state from '../store'
import { useSnapshot } from 'valtio'
import { generateStyle } from '../config/helpers'

const FilePicker = ({ file, setFile, readFile }) => {
  const snap = useSnapshot(state)

  return (
    <div className='filepicker-container'>
      <div className='flex-1 flex flex-col items-center'>
        <input
          id='file-upload'
          type='file'
          accept='image/*'
          onChange={(e) => setFile(e.target.files[0])}
        />
        <label
          htmlFor='file-upload'
          className='filepicker-label min-w-full text-center'
          style={generateStyle(snap)}
        >
          Upload File
        </label>

        <p
          className='mt-2 text-gray-800 font-semibold text-[13px] overflow-hidden'
          style={generateStyle(snap, true)}
        >
          {file === ''
            ? 'No file selected'
            : `You've slelected *${file.name} file! Go and click on either button below to set it!`}
        </p>
      </div>

      <div className='mt-4 flex flex-wrap gap-3'>
        <CustomButton
          title='Logo'
          handleClick={() => readFile('logo')}
          customStyles='text-xs'
        />

        <CustomButton
          title='Full'
          handleClick={() => readFile('full')}
          customStyles='text-xs'
        />
      </div>
    </div>
  )
}

export default FilePicker
