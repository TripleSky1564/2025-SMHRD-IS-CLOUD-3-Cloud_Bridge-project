import { Link } from 'react-router-dom'
import type { Category, ServiceGuidance } from '../../types/guidance'
import { Grid } from '../../layout/Grid'
import { ServiceSummaryCard } from '../service/ServiceSummaryCard'
import styles from './CategoryGrid.module.css'

type CategoryGridProps = {
  categories: Category[]
  services: ServiceGuidance[]
}

const getServicesForCategory = (category: Category, services: ServiceGuidance[]) =>
  services.filter((service) => category.serviceIds.includes(service.id))

export const CategoryGrid = ({ categories, services }: CategoryGridProps) => (
  <Grid columns="three" gap="lg">
    {categories.map((category) => {
      const categoryServices = getServicesForCategory(category, services)
      return (
        <article
          key={category.id}
          className={styles.card}
          style={{ borderTopColor: category.primaryColor ?? 'var(--color-primary-sky)' }}
        >
          <header className={styles.header}>
            <h3>{category.title}</h3>
            {category.description && <p>{category.description}</p>}
          </header>
          <div className={styles.services}>
            {categoryServices.map((service) => (
              <ServiceSummaryCard key={service.id} service={service} variant="compact" />
            ))}
          </div>
          {categoryServices.length > 0 && (
            <footer className={styles.footer}>
              <Link to={`/services/${categoryServices[0].id}`} className={styles.viewAll}>
                전체 안내 보기
              </Link>
            </footer>
          )}
        </article>
      )
    })}
  </Grid>
)

export default CategoryGrid
