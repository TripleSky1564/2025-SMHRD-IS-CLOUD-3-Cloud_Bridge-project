import { useCallback, useMemo, useState } from 'react'
import { guidanceContent } from '../../data/serviceGuidance'
import { ChatbotInput } from '../../components/chatbot/ChatbotInput'
import { ChatbotGuidance } from '../../components/chatbot/ChatbotGuidance'
import { CategoryGrid } from '../../components/category/CategoryGrid'
import { AudioSummaryButton } from '../../components/accessibility/AudioSummaryButton'
import {
  buildGuidanceSearchSuggestion,
  getServiceDetail,
  searchServices,
} from '../../utils/guidanceSearch'
import type { ServiceGuidanceDetail } from '../../types/guidance'
import styles from './HomePage.module.css'
import { RightNavRail } from '../../components/navigation/RightNavRail'

type ChatbotStatus = 'idle' | 'success' | 'not-found'

export const HomePage = () => {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<ChatbotStatus>('idle')
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null)
  const [suggestions, setSuggestions] = useState(guidanceContent.services.slice(0, 3))

  const detail: ServiceGuidanceDetail | null = useMemo(() => {
    if (!selectedServiceId) return null
    return getServiceDetail(selectedServiceId, guidanceContent)
  }, [selectedServiceId])

  const handleSearch = useCallback(
    (input: string) => {
      if (!input) {
        setStatus('idle')
        setSelectedServiceId(null)
        setSuggestions(guidanceContent.services.slice(0, 3))
        return
      }

      const found = searchServices(input, guidanceContent)
      setSuggestions(found)

      if (found.length === 0) {
        setStatus('not-found')
        setSelectedServiceId(null)
        return
      }

      setSelectedServiceId(found[0].id)
      setStatus('success')
    },
    [setSuggestions],
  )

  const handleReset = useCallback(() => {
    setQuery('')
    setStatus('idle')
    setSelectedServiceId(null)
    setSuggestions(guidanceContent.services.slice(0, 3))
  }, [])

  const handleSuggestionSelect = useCallback((serviceId: string) => {
    setSelectedServiceId(serviceId)
    setStatus('success')
  }, [])

  return (
    <div className={styles.page}>
      <RightNavRail />
      <section className={styles.hero}>
        <div>
          <p className={styles.sectionLabel}>공공복지 도우미</p>
          <h1 className={styles.heading}>
            민원 서류 준비, <span className={styles.highlight}>챗봇이 먼저 안내</span>해
            드릴게요
          </h1>
          <p className={styles.description}>
            궁금한 민원을 입력하면 온라인과 오프라인 준비방법을 한 번에 알려드립니다.
            누구나 이해하기 쉬운 단계별 안내로 빠르게 준비하세요.
          </p>
          <a className={styles.cta} href="#chatbot">
            챗봇에게 민원 물어보기
          </a>
        </div>
        <div className={styles.heroCard} aria-hidden="true">
          <p>“기초연금 신청하려면 어떤 서류가 필요할까?”</p>
          <span>챗봇이 온라인·방문 방법을 알려줍니다</span>
        </div>
      </section>

      <section
        id="chatbot"
        data-section
        data-title="챗봇 안내"
        className={styles.chatbotShell}
        style={{ scrollMarginTop: '80px' }}
      >
        <h2>챗봇으로 바로 민원 안내 받기</h2>
        <p className={styles.helperText}>
          상황을 자유롭게 입력하면 단계별로 안내해 드립니다.
        </p>
        <ChatbotInput
          value={query}
          onChange={setQuery}
          onSubmit={(value) => {
            setQuery(value)
            handleSearch(value)
          }}
          suggestion={buildGuidanceSearchSuggestion(query)}
        />
        <ChatbotGuidance
          status={status}
          query={query}
          detail={detail}
          suggestions={suggestions}
          onReset={handleReset}
          onSelectSuggestion={handleSuggestionSelect}
        />
      </section>

      <section
        id="life-events"
        data-section
        data-title="생애주기별"
        className={styles.categories}
        style={{ scrollMarginTop: '80px' }}
      >
        <h2>생애주기별 공공복지 서비스</h2>
        <p className={styles.helperText}>
          상황에 맞는 카테고리를 선택하면 관련 서비스를 살펴볼 수 있습니다.
        </p>
        <CategoryGrid
          categories={guidanceContent.categories}
          services={guidanceContent.services}
        />
      </section>

      <section
        id="accessibility"
        data-section
        data-title="접근성"
        className={styles.accessibilityBanner}
        style={{ scrollMarginTop: '80px' }}
      >
        <h2>누구나 편하게 이용할 수 있도록 준비 중입니다</h2>
        <p>
          글자 크기 조절, 고대비 모드, 음성 안내 등 접근성 도구를 곧 제공할 예정입니다.
          계속해서 의견을 들으며 개선해 나가겠습니다.
        </p>
        <AudioSummaryButton text="접근성 도구 안내: 글자 크기 조절, 고대비 모드, 음성 안내 기능을 제공합니다." />
      </section>
    </div>
  )
}

export default HomePage
