import type { ServiceGuidance, ServiceGuidanceDetail } from '../../types/guidance'
import styles from './ChatbotGuidance.module.css'
import { useNavigate } from 'react-router-dom'

type GuidanceStatus = 'idle' | 'success' | 'not-found'

type ChatbotGuidanceProps = {
  status: GuidanceStatus
  query: string
  detail: ServiceGuidanceDetail | null
  suggestions: ServiceGuidance[]
  onReset: () => void
  onSelectSuggestion: (serviceId: string) => void
}

export const ChatbotGuidance = ({
  status,
  query,
  detail,
  suggestions,
  onReset,
  onSelectSuggestion,
}: ChatbotGuidanceProps) => {
  const navigate = useNavigate()
  if (status === 'idle') {
    return (
      <div className={styles.placeholder}>
        <p>궁금한 민원을 입력하면 맞춤 안내를 보여드릴게요.</p>
        <ul>
          <li>“기초연금 신청 서류”</li>
          <li>“장애인 활동지원 신청 방법”</li>
          <li>“임신 출산 바우처 요약”</li>
        </ul>
      </div>
    )
  }

  if (status === 'not-found') {
    return (
      <div className={styles.empty}>
        <h3>해당 민원 정보를 찾을 수 없습니다</h3>
        <p>
          <strong>{query}</strong>와(과) 비슷한 공공복지 민원 정보를 찾을 수 없었습니다.
          다른 표현으로 다시 검색해 보시겠어요?
        </p>
        <button type="button" onClick={onReset} className={styles.resetButton}>
          다른 민원 검색하기
        </button>
      </div>
    )
  }

  if (!detail) return null

  const documentNameMap = new Map(
    detail.documentChecklistDetails.map((doc) => [doc.id, doc.name]),
  )

  const formatDocumentList = (documentIds: string[] = []) =>
    documentIds.map((id) => documentNameMap.get(id) ?? id).join(', ')

  return (
    <div className={styles.result}>
      <header className={styles.header}>
        <div>
          <p className={styles.lead}>챗봇 추천 민원</p>
          <h2>{detail.title}</h2>
          <p className={styles.summary}>{detail.summary}</p>
        </div>
        <button type="button" onClick={onReset} className={styles.resetButton}>
          다른 민원 찾기
        </button>
      </header>

      <section className={styles.section}>
        <h3>지원 대상 요약</h3>
        <ul className={styles.bulletList}>
          {detail.eligibilityHighlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className={styles.stepGroup}>
        <article>
          <h3>온라인 신청 단계</h3>
          <ol className={styles.stepList}>
            {detail.onlineSteps.map((step) => (
              <li key={step.title}>
                <strong>{step.title}</strong>
                <p>{step.description}</p>
                {step.requiredDocuments && step.requiredDocuments.length > 0 && (
                  <p className={styles.stepNote}>
                    준비 서류: {formatDocumentList(step.requiredDocuments)}
                  </p>
                )}
              </li>
            ))}
          </ol>
        </article>
        <article>
          <h3>방문 신청 단계</h3>
          <ol className={styles.stepList}>
            {detail.offlineSteps.map((step) => (
              <li key={step.title}>
                <strong>{step.title}</strong>
                <p>{step.description}</p>
                {step.estimatedTime && (
                  <p className={styles.stepNote}>예상 소요시간: {step.estimatedTime}</p>
                )}
                {step.requiredDocuments && step.requiredDocuments.length > 0 && (
                  <p className={styles.stepNote}>
                    준비 서류: {formatDocumentList(step.requiredDocuments)}
                  </p>
                )}
              </li>
            ))}
          </ol>
        </article>
        <button
          type="button"
          onClick={() => navigate(`/services/${detail.id}/checklist`)}
        >
          필수 서류 체크리스트 안내
        </button>
      </section>

      <section className={styles.section}>
        <h3>필수 서류 체크리스트</h3>
        <div className={styles.documentList}>
          {detail.documentChecklistDetails.map((document) => (
            <article key={document.id}>
              <h5>{document.name}</h5>
              <p className={styles.documentMeta}>{document.issuingAuthority}</p>
              <p>발급 방법: {document.availableFormats.join(', ')}</p>
              {document.downloadUrl && (
                <a href={document.downloadUrl} target="_blank" rel="noreferrer">
                  온라인 발급 바로가기
                </a>
              )}
              {document.preparationNotes && <p>{document.preparationNotes}</p>}
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h3>상담 및 방문 안내</h3>
        <div className={styles.channelList}>
          {detail.supportChannelDetails.map((channel) => (
            <article key={channel.id}>
              <h5>{channel.name}</h5>
              <p className={styles.documentMeta}>{channel.type}</p>
              {channel.address && <p>{channel.address}</p>}
              {channel.hours && <p>운영시간 {channel.hours}</p>}
              <p>{channel.contact}</p>
              {channel.notes && <p>{channel.notes}</p>}
            </article>
          ))}
        </div>
      </section>

      {suggestions.length > 1 && (
        <section className={styles.section}>
          <h3>다른 안내도 확인해 보세요</h3>
          <ul className={styles.suggestionList}>
            {suggestions
              .filter((service) => service.id !== detail.id)
              .map((service) => (
                <li key={service.id}>
                  <button
                    type="button"
                    onClick={() => onSelectSuggestion(service.id)}
                    className={styles.optionButton}
                  >
                    {service.title}
                  </button>
                </li>
              ))}
          </ul>
        </section>
      )}
    </div>
  )
}

export default ChatbotGuidance
