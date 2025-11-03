import styles from './Header.module.css'

export const Header = () => (
  <header className={styles.header}>
    <div className={styles.container}>
      <div className={styles.branding}>
        <span aria-hidden="true" className={styles.badge}>
          공공
        </span>
        <div>
          <p className={styles.siteName}>공공복지 도우미</p>
          <p className={styles.tagline}>민원 서류 준비를 쉽게, 한곳에서</p>
        </div>
      </div>
      <nav aria-label="주요 메뉴" className={styles.nav}>
        <a href="#chatbot">챗봇 안내</a>
        <a href="#life-events">생애주기별 서비스</a>
        <a href="#accessibility">접근성 도구</a>
      </nav>
    </div>
  </header>
)

export default Header
