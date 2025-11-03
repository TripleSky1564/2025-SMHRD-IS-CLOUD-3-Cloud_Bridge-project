import { useEffect, useMemo, useRef, useState } from 'react'
import styles from './SectionOptionBar.module.css'

type SectionInfo = { el: HTMLElement; title: string }

export const SectionOptionBar = () => {
  const [sections, setSections] = useState<SectionInfo[]>([])
  const [active, setActive] = useState(0)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-section]'))
    const mapped = nodes.map((el, i) => ({
      el,
      title: el.getAttribute('data-title') || el.id || `섹션 ${i + 1}`,
    }))
    setSections(mapped)

    observerRef.current?.disconnect()
    const mid = (entry: IntersectionObserverEntry) => {
      const r = entry.boundingClientRect
      const vh = window.innerHeight || document.documentElement.clientHeight
      return (r.top + r.bottom) / 2 / vh
    }
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => Math.abs(0.5 - mid(a)) - Math.abs(0.5 - mid(b)))
        if (visible[0]) {
          const idx = nodes.indexOf(visible[0].target as HTMLElement)
          if (idx >= 0) setActive(idx)
        }
      },
      { threshold: [0.25, 0.5, 0.75] },
    )
    nodes.forEach((n) => io.observe(n))
    observerRef.current = io
    return () => io.disconnect()
  }, [])

  const onClick = (idx: number) => {
    const target = sections[idx]?.el
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  if (sections.length === 0) return null

  return (
    <nav aria-label="옵션 선택 바">
      <div className={styles.bar} role="tablist" aria-orientation="horizontal">
        {sections.map((s, i) => (
          <button
            key={s.title + i}
            type="button"
            className={styles.chip}
            role="tab"
            aria-selected={i === active}
            aria-label={`${s.title}로 이동`}
            onClick={() => onClick(i)}
          >
            {s.title}
          </button>
        ))}
      </div>
    </nav>
  )
}

export default SectionOptionBar

