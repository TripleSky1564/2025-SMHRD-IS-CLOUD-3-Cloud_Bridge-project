import { useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { guidanceContent } from '../../data/serviceGuidance'
import { getServiceDetail, getCategoryById, getServicesByCategory } from '../../utils/guidanceSearch'
import { ServiceSummaryCard } from '../../components/service/ServiceSummaryCard'
import styles from './ServiceDetailPage.module.css'

export const ServiceDetailPage = () => {
  const navigate = useNavigate()
  const { serviceId = '' } = useParams<{ serviceId: string }>()

  const detail = useMemo(() => getServiceDetail(serviceId, guidanceContent), [serviceId])

  if (!detail) {
    return (
      <div className={styles.emptyState}>
        <h1>서비스 정보를 찾을 수 없습니다</h1>
        <p>선택한 서비스가 더 이상 제공되지 않거나 주소가 잘못되었습니다.</p>
        <button type="button" onClick={() => navigate(-1)} className={styles.backButton}>
          이전 페이지로 돌아가기
        </button>
      </div>
    )
  }

  const primaryCategory = detail.categories[0]
  const relatedCategory = primaryCategory
    ? getCategoryById(primaryCategory.id, guidanceContent)
    : null
  const relatedServices = relatedCategory
    ? getServicesByCategory(relatedCategory.id, guidanceContent).filter(
        (service) => service.id !== detail.id,
      )
    : []

  const documentNameMap = new Map(detail.documentChecklistDetails.map((doc) => [doc.id, doc.name]))
  const formatDocumentList = (documentIds: string[] = []) =>
    documentIds
      .map((id) => documentNameMap.get(id) ?? id)
      .join(', ')

  return (
    <article className={styles.page}>
      <header className={styles.header}>
        <div>
          <p className={styles.categoryLabel}>{relatedCategory?.title ?? '공공복지 서비스'}</p>
          <h1>{detail.title}</h1>
          <p className={styles.summary}>{detail.summary}</p>
        </div>
        {detail.lastReviewed && (
          <p className={styles.reviewed}>정보 확인일 {detail.lastReviewed}</p>
        )}
      </header>

      <section className={styles.section}>
        <h2>지원 대상 주요 요건</h2>
        <ul className={styles.bulletList}>
          {detail.eligibilityHighlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className={styles.channelSection}>
        <div className={styles.channelCard}>
          <h2>온라인 신청 단계</h2>
          <ol className={styles.stepList}>
            {detail.onlineSteps.map((step) => (
              <li key={step.title}>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
                {step.requiredDocuments && step.requiredDocuments.length > 0 && (
                  <p className={styles.documentHint}>
                    준비 서류: {formatDocumentList(step.requiredDocuments)}
                  </p>
                )}
              </li>
            ))}
          </ol>
        </div>
        <div className={styles.channelCard}>
          <h2>방문 신청 단계</h2>
          <ol className={styles.stepList}>
            {detail.offlineSteps.map((step) => (
              <li key={step.title}>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
                {step.estimatedTime && (
                  <p className={styles.eta}>예상 소요시간: {step.estimatedTime}</p>
                )}
                {step.requiredDocuments && step.requiredDocuments.length > 0 && (
                  <p className={styles.documentHint}>
                    준비 서류: {formatDocumentList(step.requiredDocuments)}
                  </p>
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.section}>
        <h2>필수 서류 체크리스트</h2>
        <div className={styles.documentList}>
          {detail.documentChecklistDetails.map((document) => (
            <article key={document.id}>
              <h3>{document.name}</h3>
              <p className={styles.meta}>{document.issuingAuthority}</p>
              {document.purpose && <p>{document.purpose}</p>}
              <p>
                발급 가능: {document.availableFormats.map((format) => format).join(', ')}
                {document.downloadUrl && (
                  <>
                    {' '}
                    ·{' '}
                    <a href={document.downloadUrl} target="_blank" rel="noreferrer">
                      온라인 발급 바로가기
                    </a>
                  </>
                )}
              </p>
              {document.fee && <p>수수료 {document.fee}</p>}
              {document.preparationNotes && <p>{document.preparationNotes}</p>}
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2>상담 및 방문 안내</h2>
        <div className={styles.channelGrid}>
          {detail.supportChannelDetails.map((channel) => (
            <article key={channel.id}>
              <h3>{channel.name}</h3>
              <p className={styles.meta}>{channel.type}</p>
              {channel.address && <p>{channel.address}</p>}
              {channel.hours && <p>운영시간 {channel.hours}</p>}
              <p className={styles.meta}>{channel.contact}</p>
              {channel.notes && <p>{channel.notes}</p>}
              {channel.appointmentRequired && <p>※ 방문 전 예약이 필요합니다.</p>}
            </article>
          ))}
        </div>
      </section>

      {relatedServices.length > 0 && (
        <section className={styles.section}>
          <h2>이 서비스와 함께 보면 좋은 안내</h2>
          <div className={styles.relatedGrid}>
            {relatedServices.map((service) => (
              <ServiceSummaryCard key={service.id} service={service} />
            ))}
          </div>
        </section>
      )}
    </article>
  )
}

export default ServiceDetailPage
