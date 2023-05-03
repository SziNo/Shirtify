import { proxy } from 'valtio'

const state = proxy({
  intro: true,
  color: '#EFBD48',
  isLogoTexture: true,
  isFullTexture: false,
  logoDecal: './grogu1.png',
  fullDecal: './galaxy-bg2.jpg',
})

export default state
