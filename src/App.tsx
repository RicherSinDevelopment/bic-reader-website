import { useEffect, useState, type ReactNode } from 'react'
import './App.css'

type Page = 'home' | 'privacy' | 'terms' | 'support'
const links: { page: Page; label: string }[] = [
  { page: 'home', label: 'Home' }, { page: 'privacy', label: 'Privacy Policy' },
  { page: 'terms', label: 'Terms of Service' }, { page: 'support', label: 'Support' },
]
const getPage = (): Page => {
  const pathPage = window.location.pathname.replace(/^\/+|\/+$/g, '') as Page
  const hashPage = window.location.hash.replace('#/', '') as Page
  const page = hashPage || pathPage
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

type PolicySection = { title: string; body: ReactNode }

const policyContent: Record<'privacy' | 'terms', { eyebrow: string; title: string; intro: string; sections: PolicySection[] }> = {
  privacy: { eyebrow:'Your data matters', title:'Privacy Policy', intro:'This policy explains what Bic Reader processes, why that information is used, and the choices available to you. Items marked "Verification needed" require confirmation from the Bic Reader application or service implementation before they are published as a statement of practice.', sections:[
    { title:'Information we collect', body:<><h3>Account information</h3><p><strong>Verification needed:</strong> Confirm whether the app processes an email address, a name when provided, a Supabase user or account ID, authentication or session tokens, Apple Sign-In data, and Google Sign-In data.</p><p><strong>Verification needed:</strong> Confirm that passwords are handled by Supabase and that Bic Reader does not store passwords in readable or plain-text form.</p><h3>Operator and contact information</h3><p>Bicreader operates Bic Reader and the website at <a href="https://bicreader.com">https://bicreader.com</a>. For privacy questions or support, contact <a href="mailto:support@bicreader.com">support@bicreader.com</a>.</p><p><strong>Verification needed:</strong> This repository does not identify a different formal legal or business name. Add one here before publishing if Bicreader uses a different formal name.</p></> },
    { title:'How we use information', body:<p><strong>Verification needed:</strong> The website code alone does not establish the purposes for which the Bic Reader application processes information. After the application and service implementation are reviewed, describe only the purposes supported by that review.</p> },
    { title:'PDFs and reading data', body:<><h3>Local and cloud data</h3><p><strong>Verification needed:</strong> This repository does not implement PDF storage, cloud sync, or a reading-data model. Confirm whether PDFs are stored locally on the device by default and whether an optional Premium cloud-sync feature uploads PDFs to Supabase.</p><h3>Data to verify for cloud sync</h3><p>If cloud sync is confirmed, verify the exact synced fields:</p><ul><li>PDFs, filenames, and file metadata</li><li>Highlights, annotations, and notes</li><li>Reading position, completion percentage, and timestamps</li><li>Reader settings, typography preferences, and appearance or background preferences</li></ul><p><strong>Verification needed:</strong> Confirm whether AI conversation history is stored locally on the device.</p></> },
    { title:'AI Assistant', body:<><p><strong>Verification needed:</strong> No AI assistant, Supabase Edge Function, or OpenAI integration appears in this repository. Verify whether a user's question and selected or extracted PDF text are sent to a Supabase Edge Function, whether that function sends the request to OpenAI, and whether it uses the OpenAI Responses API with <code>store=false</code>.</p><p>If confirmed, state that AI use is optional; explain OpenAI's applicable abuse-monitoring or security-log practices by linking to the relevant OpenAI policy; and advise users not to submit confidential or highly sensitive information unless they accept that processing.</p></> },
    { title:'Purchases', body:<><p><strong>Verification needed:</strong> This repository contains no purchase or subscription integration. Confirm whether Apple processes App Store payments and RevenueCat manages subscription status and entitlements.</p><p>If confirmed, state exactly which information RevenueCat receives, such as subscription, entitlement, product, transaction, and restore information. Confirm that Bic Reader does not receive payment-card or bank-account details; that deleting a Bic Reader account does not cancel an Apple subscription; and that users manage App Store subscriptions through Apple.</p></> },
    { title:'Diagnostics', body:<><p><strong>Verification needed:</strong> No Sentry configuration is present in this repository. Confirm the real configuration before stating that Sentry may receive privacy-filtered crash reports, JavaScript or native errors, app or build versions, device and operating-system information, or limited operational breadcrumbs.</p><h3>Data excluded from diagnostics</h3><p><strong>Verification needed:</strong> Only if confirmed by the implementation, state that Sentry is configured not to receive:</p><ul><li>PDF text, filenames, or file paths</li><li>Annotations or highlights</li><li>AI questions or AI answers</li><li>Screenshots, recordings, or view hierarchies</li><li>Network-request contents</li></ul><p><strong>Verification needed:</strong> Also confirm before stating that Bic Reader does not use diagnostic information for advertising tracking.</p></> },
    { title:'Service providers', body:<><p><strong>Verification needed:</strong> This repository does not establish that Bic Reader uses the following providers. List only those confirmed in the application or service implementation:</p><ul><li><strong>Supabase</strong> for account, cloud, or server functions</li><li><strong>RevenueCat</strong> for subscription status and entitlements</li><li><strong>OpenAI</strong> for optional AI assistance</li><li><strong>Apple</strong> for App Store payments or Apple Sign-In</li><li><strong>Google</strong> for Google Sign-In</li><li><strong>Sentry</strong> for diagnostics</li></ul></> },
    { title:'Your choices', body:<><p><strong>Verification needed:</strong> Confirm whether cloud sync and AI are optional, and whether social sign-in is optional when another sign-in method is available.</p><p>For privacy, access, correction, deletion, or restriction requests, contact <a href="mailto:support@bicreader.com">support@bicreader.com</a>.</p></> },
    { title:'Deleting your account', body:<p><strong>Verification needed:</strong> Confirm whether account deletion is available through Profile to Delete account; what cloud account data it removes; and whether locally stored offline PDFs remain on the device and must be removed separately. Do not promise deletion of Apple or RevenueCat transaction records unless that is specifically verified.</p> },
    { title:'Children', body:<p><strong>OWNER INPUT REQUIRED:</strong> Bic Reader is intended for users aged [INSERT MINIMUM AGE] and is not directed to children under that age. The owner must supply the minimum age before publication.</p> },
    { title:'Security', body:<p><strong>Verification needed:</strong> This repository does not establish specific security measures. Do not add encryption guarantees, certifications, retention periods, international-transfer mechanisms, analytics or cookie practices, or legal-compliance claims unless they are verified.</p> },
    { title:'Policy changes and contact', body:<><p>We may update this Privacy Policy when Bic Reader practices change. The Last updated date below will show when it was most recently revised.</p><p>Contact <a href="mailto:support@bicreader.com">support@bicreader.com</a> with privacy questions or requests.</p></> },
  ]},
  terms: { eyebrow:'Clear and straightforward', title:'Terms of Service', intro:'These terms describe the rules for using Bic Reader. By using the service, you agree to follow them.', sections:[
    { title:'Using Bic Reader', body:'You may use Bic Reader for lawful, personal purposes. You are responsible for activity on your account and for keeping your login details secure.' },
    { title:'Your content', body:'You retain ownership of content you upload. You give us permission to process it only as needed to provide the service.' },
    { title:'Acceptable use', body:'Do not misuse the service, interfere with its operation, attempt unauthorized access, or upload content that violates applicable laws.' },
    { title:'Changes and availability', body:'We may improve or change features over time. When these terms materially change, we will provide reasonable notice.' },
  ]},
}

function PolicyPage({ type }: { type:'privacy'|'terms' }) {
  const content = policyContent[type]
  return <main className="document-page"><header><span className="eyebrow">{content.eyebrow}</span><h1>{content.title}</h1><p>{content.intro}</p><small>Last updated: September 14, 2026</small></header><div className="document-content">{content.sections.map(({ title, body },index)=><section id={`${type}-${index+1}`} key={title}><span>{String(index+1).padStart(2,'0')}</span><div><h2>{title}</h2><div className="policy-body">{typeof body === 'string' ? <p>{body}</p> : body}</div></div></section>)}</div></main>
}

function SupportPage() {
  return <main className="support-page"><section className="support-intro"><span className="eyebrow">We're here to help</span><h1>How can we help?</h1><p>Have a question, found an issue, or want to share an idea? Send us a message and we'll get back to you.</p></section><section className="support-grid"><div className="contact-card"><span className="contact-icon">@</span><h2>Email support</h2><p>For general questions and account help.</p><a href="mailto:support@bicreader.com">support@bicreader.com</a></div><form className="contact-form" onSubmit={(event)=>event.preventDefault()}><label>Name<input type="text" placeholder="Your name"/></label><label>Email<input type="email" placeholder="you@example.com"/></label><label>How can we help?<textarea rows={5} placeholder="Tell us what you need help with..."/></label><button className="button button-primary" type="submit">Send message</button></form></section></main>
}

function App() {
  const [page,setPage]=useState<Page>(getPage), [menuOpen,setMenuOpen]=useState(false)
  useEffect(()=>{ const update=()=>{setPage(getPage());setMenuOpen(false);window.scrollTo(0,0)}; window.addEventListener('hashchange',update); window.addEventListener('popstate',update); return()=>{window.removeEventListener('hashchange',update);window.removeEventListener('popstate',update)}},[])
  return <div className="site-shell"><header className="navbar"><Brand/><button className="menu-toggle" onClick={()=>setMenuOpen(!menuOpen)} aria-label="Toggle navigation" aria-expanded={menuOpen}><span/><span/><span/></button><nav className={menuOpen?'open':''}>{links.map(link=><a key={link.page} className={page===link.page?'active':''} href={`#/${link.page}`}>{link.label}</a>)}</nav></header>{page==='home'&&<HomePage/>}{page==='privacy'&&<PolicyPage type="privacy"/>}{page==='terms'&&<PolicyPage type="terms"/>}{page==='support'&&<SupportPage/>}<footer><Brand/><p>Thoughtful reading, every day.</p><span>© 2026 Bic Reader</span></footer></div>
}
export default App
