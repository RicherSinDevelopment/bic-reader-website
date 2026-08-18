import { useEffect, useState } from 'react'
import './App.css'

type Page = 'home' | 'privacy' | 'terms' | 'support'
const links: { page: Page; label: string }[] = [
  { page: 'home', label: 'Home' }, { page: 'privacy', label: 'Privacy Policy' },
  { page: 'terms', label: 'Terms of Service' }, { page: 'support', label: 'Support' },
]
const getPage = (): Page => {
  const page = window.location.hash.replace('#/', '') as Page
  return links.some((link) => link.page === page) ? page : 'home'
}

function Brand() {
  return <a className="brand" href="#/home" aria-label="Bic Reader home"><span className="brand-mark" aria-hidden="true"><span/><span/><span/></span><span>Bic Reader</span></a>
}

function HomePage() {
  return <main>
    <section className="hero-section">
      <div className="hero-glow" />
      <div className="hero-copy">
        <span className="eyebrow">Read better. Remember more.</span>
        <h1>Your reading, beautifully organized.</h1>
        <p>Bic Reader gives you a calm, focused place to enjoy your books, save your progress, and keep every great idea close at hand.</p>
        <div className="hero-actions"><a className="button button-primary" href="#/support">Get started</a><a className="button button-secondary" href="#features">Explore features</a></div>
      </div>
      <div className="reader-preview" aria-label="Bic Reader application preview">
        <div className="preview-toolbar"><span className="mini-brand">B</span><span className="preview-title">My Library</span><span className="preview-avatar">AR</span></div>
        <div className="preview-body"><aside><span className="active-line"/><span/><span/><span/></aside><article><span className="chapter">CHAPTER 04</span><h2>The quiet power of a good book</h2><p>Reading gives us somewhere to go when we have to stay where we are.</p><div className="text-lines"><i/><i/><i/><i/><i/></div><div className="progress"><span/></div><small>42% complete</small></article></div>
      </div>
    </section>
    <section className="features" id="features">
      <div className="section-heading"><span className="eyebrow">Made for readers</span><h2>Everything you need. Nothing you don't.</h2></div>
      <div className="feature-grid">
        <article><span className="feature-icon">Aa</span><h3>Focused reading</h3><p>A clean, distraction-free reading experience that puts your book first.</p></article>
        <article><span className="feature-icon">✓</span><h3>Always in sync</h3><p>Pick up exactly where you left off, whenever you're ready to read.</p></article>
        <article><span className="feature-icon">✦</span><h3>Your own library</h3><p>Keep your collection organized and find your next read in seconds.</p></article>
      </div>
    </section>
  </main>
}

const policyContent = {
  privacy: { eyebrow:'Your data matters', title:'Privacy Policy', intro:'We believe privacy should be simple and transparent. This policy explains what information Bic Reader collects and how we use it.', sections:[
    ['Information we collect','We collect only the information needed to provide and improve Bic Reader, such as account details, reading progress, and basic usage information.'],
    ['How we use information','Your information helps us operate the service, keep your library synchronized, provide support, and improve the reading experience.'],
    ['Data security','We use reasonable technical and organizational safeguards to protect your information from unauthorized access, alteration, or loss.'],
    ['Your choices','You may request access to, correction of, or deletion of your personal information by contacting our support team.'],
  ]},
  terms: { eyebrow:'Clear and straightforward', title:'Terms of Service', intro:'These terms describe the rules for using Bic Reader. By using the service, you agree to follow them.', sections:[
    ['Using Bic Reader','You may use Bic Reader for lawful, personal purposes. You are responsible for activity on your account and for keeping your login details secure.'],
    ['Your content','You retain ownership of content you upload. You give us permission to process it only as needed to provide the service.'],
    ['Acceptable use','Do not misuse the service, interfere with its operation, attempt unauthorized access, or upload content that violates applicable laws.'],
    ['Changes and availability','We may improve or change features over time. When these terms materially change, we will provide reasonable notice.'],
  ]},
}

function PolicyPage({ type }: { type:'privacy'|'terms' }) {
  const content = policyContent[type]
  return <main className="document-page"><header><span className="eyebrow">{content.eyebrow}</span><h1>{content.title}</h1><p>{content.intro}</p><small>Last updated: August 17, 2026</small></header><div className="document-content">{content.sections.map(([title,text],index)=><section key={title}><span>0{index+1}</span><div><h2>{title}</h2><p>{text}</p></div></section>)}</div></main>
}

function SupportPage() {
  return <main className="support-page"><section className="support-intro"><span className="eyebrow">We're here to help</span><h1>How can we help?</h1><p>Have a question, found an issue, or want to share an idea? Send us a message and we'll get back to you.</p></section><section className="support-grid"><div className="contact-card"><span className="contact-icon">@</span><h2>Email support</h2><p>For general questions and account help.</p><a href="mailto:support@bicreader.com">support@bicreader.com</a></div><form className="contact-form" onSubmit={(event)=>event.preventDefault()}><label>Name<input type="text" placeholder="Your name"/></label><label>Email<input type="email" placeholder="you@example.com"/></label><label>How can we help?<textarea rows={5} placeholder="Tell us what you need help with..."/></label><button className="button button-primary" type="submit">Send message</button></form></section></main>
}

function App() {
  const [page,setPage]=useState<Page>(getPage), [menuOpen,setMenuOpen]=useState(false)
  useEffect(()=>{ const update=()=>{setPage(getPage());setMenuOpen(false);window.scrollTo(0,0)}; window.addEventListener('hashchange',update); return()=>window.removeEventListener('hashchange',update)},[])
  return <div className="site-shell"><header className="navbar"><Brand/><button className="menu-toggle" onClick={()=>setMenuOpen(!menuOpen)} aria-label="Toggle navigation" aria-expanded={menuOpen}><span/><span/><span/></button><nav className={menuOpen?'open':''}>{links.map(link=><a key={link.page} className={page===link.page?'active':''} href={`#/${link.page}`}>{link.label}</a>)}</nav></header>{page==='home'&&<HomePage/>}{page==='privacy'&&<PolicyPage type="privacy"/>}{page==='terms'&&<PolicyPage type="terms"/>}{page==='support'&&<SupportPage/>}<footer><Brand/><p>Thoughtful reading, every day.</p><span>© 2026 Bic Reader</span></footer></div>
}
export default App
