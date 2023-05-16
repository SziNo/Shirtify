import React, { Suspense } from 'react'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useSnapshot } from 'valtio'
import state from '../store'
import { reader } from '../config/helpers'
import { EditorTabs, FilterTabs, DecalTypes } from '../config/constants'
import { fadeAnimation, slideAnimation } from '../config/motion'
import { ColorPicker, CustomButton, FilePicker, Tab } from '../components'

const Customizer = () => {
  const snap = useSnapshot(state)
  const [file, setFile] = useState('')
  const [activeEditorTab, setActiveEditorTab] = useState('')
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  })

  // show tab content depending on the activeTab
  const generateTabContent = () => {
    switch (activeEditorTab) {
      case 'colorpicker':
        return (
          <Suspense fallback={null}>
            <ColorPicker setActiveEditorTab={setActiveEditorTab} />
          </Suspense>
        )
      case 'filepicker':
        return (
          <Suspense fallback={null}>
            <FilePicker
              file={file}
              setFile={setFile}
              readFile={readFile}
              setActiveEditorTab={setActiveEditorTab}
            />
          </Suspense>
        )
      default:
        return null
    }
  }

  const handleDecals = (type, result) => {
    const decalType = DecalTypes[type]

    state[decalType.stateProperty] = result

    if (!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab)
    }
  }

  const handleActiveFilterTab = (tabName) => {
    switch (tabName) {
      case 'logoShirt':
        state.isLogoTexture = !activeFilterTab[tabName]
        break
      case 'stylishShirt':
        state.isFullTexture = !activeFilterTab[tabName]
        break
      default:
        state.isLogoTexture = true
        state.isFullTexture = false
        break
    }

    // after setting the state, activeFilterTab is updated

    setActiveFilterTab((prevState) => {
      return {
        ...prevState,
        [tabName]: !prevState[tabName],
      }
    })
  }

  const readFile = (type) => {
    reader(file).then((result) => {
      handleDecals(type, result)
      setActiveEditorTab('')
    })
  }

  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div
            key='custom'
            className='absolute top-0 left-0 z-10'
            {...slideAnimation('left')}
          >
            <div className='flex items-center min-h-screen'>
              <div className='editortabs-container tabs'>
                {EditorTabs.map((tab) => (
                  <Suspense key={tab.name} fallback={null}>
                    <Tab
                      tab={tab}
                      handleClick={() => setActiveEditorTab(tab.name)}
                    />
                  </Suspense>
                ))}

                {generateTabContent()}
              </div>
            </div>
          </motion.div>

          <motion.div
            className='absolute z-10 top-5 right-5'
            {...fadeAnimation}
          >
            <Suspense fallback={null}>
              <CustomButton
                title='Go Back'
                handleClick={() => (state.intro = true)}
                customStyles='w-fit px-4 py-2.5 font-bold text-sm'
              />
            </Suspense>
          </motion.div>

          <motion.div
            className='filtertabs-container'
            {...slideAnimation('up')}
          >
            {FilterTabs.map((tab) => (
              <Suspense key={tab.name} fallback={null}>
                <Tab
                  tab={tab}
                  isFilterTab
                  isActiveTab={activeFilterTab[tab.name]}
                  handleClick={() => handleActiveFilterTab(tab.name)}
                />
              </Suspense>
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Customizer
