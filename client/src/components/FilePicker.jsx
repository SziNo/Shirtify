import { useEffect, useRef } from 'react'
import CustomButton from './CustomButton'
import state from '../store'
import { useSnapshot } from 'valtio'
import { generateStyle } from '../config/helpers'

const FilePicker = ({ file, setFile, readFile, setActiveEditorTab }) => {
  const snap = useSnapshot(state)
  const modalRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        !event.target.closest('.tab-btn')
      ) {
        setActiveEditorTab('')
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  return (
    <div ref={modalRef} className='filepicker-container'>
      <div className='flex-1 flex flex-col items-center'>
        <input
          id='file-upload'
          type='file'
          accept='image/*'
          onChange={(e) => setFile(e.target.files[0])}
          className='w-full pointer-events-none'
        />
        <label
          htmlFor='file-upload'
          className='filepicker-label text-center'
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
