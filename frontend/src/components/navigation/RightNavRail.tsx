import { useEffect, useMemo, useRef, useState } from 'react'
import styles from './RightNavRail.module.css'

type SectionInfo = { el: HTMLElement; title: string }

export const RightNavRail = () => {
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
      { threshold: [0.25, 0.5, 0.75], rootMargin: '-40% 0px -40% 0px' },
    )
    nodes.forEach((n) => io.observe(n))
    observerRef.current = io
    return () => io.disconnect()
  }, [])

  const canUp = active > 0
  const canDown = active < Math.max(0, sections.length - 1)

  const onSelect = (idx: number) => {
    const target = sections[idx]?.el
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const onUp = () => {
    const idx = Math.max(0, active - 1)
    sections[idx]?.el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  const onDown = () => {
    const idx = Math.min(sections.length - 1, active + 1)
    sections[idx]?.el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  if (sections.length === 0) return null

  return (
    <nav className={styles.rail} aria-label="섹션 내비게이션">
      <div className={styles.panel}>
        <div className={styles.header}>목차</div>
        <div className={styles.list} role="tablist" aria-orientation="vertical">
          {sections.map((s, i) => (
            <button
              key={s.title + i}
              type="button"
              className={styles.item}
              role="tab"
              aria-selected={i === active}
              aria-label={`${s.title}로 이동`}
              onClick={() => onSelect(i)}
            >
              {s.title}
            </button>
          ))}
        </div>
        <div className={styles.footer}>
          <button className={styles.arrow} onClick={onUp} disabled={!canUp} aria-label="이전 섹션으로 이동">위로</button>
          <button className={styles.arrow} onClick={onDown} disabled={!canDown} aria-label="다음 섹션으로 이동">아래로</button>
        </div>
      </div>
    </nav>
  )
}

export default RightNavRail
