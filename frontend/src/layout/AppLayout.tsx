import { useEffect, useMemo, useState } from 'react'
import { Outlet } from 'react-router-dom'
import styles from './AppLayout.module.css'
import { Footer } from './Footer'
import { Header } from './Header'
import { AccessibilityContext } from './AccessibilityContext'
import type { TextScale } from './AccessibilityContext'
import { AccessibilityControls } from '../components/accessibility/AccessibilityControls'

const fontSizeMap: Record<TextScale, string> = {
  standard: '16px',
  large: '18px',
  extra: '20px',
}

export const AppLayout = () => {
  const [textScale, setTextScale] = useState<TextScale>('standard')
  const [highContrast, setHighContrast] = useState(false)

  useEffect(() => {
    document.documentElement.style.fontSize = fontSizeMap[textScale]
    const baseRem =
      textScale === 'standard' ? '1rem' : textScale === 'large' ? '1.125rem' : '1.25rem'
    document.documentElement.style.setProperty('--font-size-base', baseRem)
  }, [textScale])

  useEffect(() => {
    document.body.classList.toggle('high-contrast', highContrast)
  }, [highContrast])

  const playAudioSummary = (text: string) => {
    if (typeof window === 'undefined') return
    if ('speechSynthesis' in window && 'SpeechSynthesisUtterance' in window) {
      const utterance = new window.SpeechSynthesisUtterance(text)
      utterance.lang = 'ko-KR'
      window.speechSynthesis.cancel()
      window.speechSynthesis.speak(utterance)
    }
  }

  const accessibilityValue = useMemo(
    () => ({
      textScale,
      setTextScale,
      highContrast,
      toggleHighContrast: () => setHighContrast((prev) => !prev),
      playAudioSummary,
    }),
    [textScale, highContrast],
  )

  return (
    <AccessibilityContext.Provider value={accessibilityValue}>
      <div className={styles.appShell}>
        <a className="visually-hidden" href="#main-content">
          메인 콘텐츠로 바로가기
        </a>
        <Header />
        <div className={styles.accessibilityBar}>
          <AccessibilityControls />
        </div>
        <main id="main-content" className={styles.main}>
          <div className={styles.contentRegion}>
            <Outlet />
          </div>
        </main>
        <Footer />
      </div>
    </AccessibilityContext.Provider>
  )
}

export default AppLayout
