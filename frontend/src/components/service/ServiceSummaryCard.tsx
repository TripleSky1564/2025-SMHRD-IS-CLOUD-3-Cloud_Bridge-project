import { Link } from 'react-router-dom'
import type { ServiceGuidance } from '../../types/guidance'
import styles from './ServiceSummaryCard.module.css'

type ServiceSummaryCardProps = {
  service: ServiceGuidance
  variant?: 'default' | 'compact'
}

export const ServiceSummaryCard = ({ service, variant = 'default' }: ServiceSummaryCardProps) => (
  <article className={`${styles.card} ${styles[variant]}`}>
    <div>
      <h3 className={styles.title}>{service.title}</h3>
      <p className={styles.summary}>{service.summary}</p>
    </div>
    <ul className={styles.eligibility}>
      {service.eligibilityHighlights.slice(0, variant === 'compact' ? 2 : 3).map((line) => (
        <li key={line}>{line}</li>
      ))}
    </ul>
    <Link
      to={`/services/${service.id}`}
      className={styles.link}
      aria-label={`${service.title} 상세 안내 보기`}
    >
      상세 안내 보기
    </Link>
  </article>
)

export default ServiceSummaryCard
