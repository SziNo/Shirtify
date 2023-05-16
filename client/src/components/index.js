import React from 'react'

const CustomButton = React.lazy(() => import('./CustomButton'))
const ColorPicker = React.lazy(() => import('./ColorPicker'))
const FilePicker = React.lazy(() => import('./FilePicker'))
const Tab = React.lazy(() => import('./Tab'))

export { CustomButton, ColorPicker, FilePicker, Tab }
