import { Component, Suspense, lazy, useEffect, useRef, useState } from 'react';
import { experience, projects, resumeUrl, skills } from './content.js';
import { useJourneyMotion } from './useJourneyMotion.js';

const AssemblyScene = lazy(() => import('./AssemblyScene.jsx'));

function Arrow({ down = false }) {
    return <span aria-hidden="true">{down ? '↘' : '↗'}</span>;
}

class SceneBoundary extends Component {
    state = { failed: false };
    static getDerivedStateFromError() { return { failed: true }; }
    render() { return this.state.failed ? null : this.props.children; }
}

function useReducedMotion() {
    const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    useEffect(() => {
        const query = window.matchMedia('(prefers-reduced-motion: reduce)');
        const update = () => setReduced(query.matches);
        query.addEventListener('change', update);
        return () => query.removeEventListener('change', update);
    }, []);
    return reduced;
}

function ProjectArt({ project }) {
    if (project.image) {
        return <img src={project.image} width="900" height="560" loading="lazy" alt={`${project.title} — archived project screenshot`} />;
    }
    return (
        <div className={`system-art system-art--${project.visual}`} aria-hidden="true">
            <span className="art-coordinate">{project.id.toUpperCase()} / SYS</span>
            <div className="art-core"><span /><span /><span /><span /><span /></div>
            <span className="art-caption">Conceptual study · internal system</span>
            <span className="art-cross">+</span>
        </div>
    );
}

function ProjectGallery() {
    const [filter, setFilter] = useState('Selected');
    const [revision, setRevision] = useState(0);
    const visible = filter === 'Selected' ? projects.slice(0, 3) : filter === 'All' ? projects : projects.filter(project => project.category === filter);
    return (
        <section className="work section-pad" id="work" aria-labelledby="work-heading">
            <div className="section-heading container" data-reveal>
                <div><p className="eyebrow">02 / Selected work</p><h2 id="work-heading">Built for<br /><em>the real world.</em></h2></div>
                <p>From real-time manufacturing applications to the first experiments that got me writing code. A selection of systems I build and support.</p>
            </div>
            <div className="gallery-toolbar container">
                <div className="filters" role="group" aria-label="Filter projects">
                    {['Selected', 'Production', 'Public', 'All'].map(item => (
                        <button key={item} type="button" aria-pressed={filter === item} onClick={() => { setFilter(item); setRevision(value => value + 1); }}>{item}</button>
                    ))}
                </div>
                <p className="mono result-count" role="status">{String(visible.length).padStart(2, '0')} projects</p>
            </div>
            <div className="project-grid container" key={revision}>
                {visible.map(project => (
                    <article className="project-card" key={project.id}>
                        <div className="project-visual"><ProjectArt project={project} /></div>
                        <div className="project-meta"><span className="mono">{project.type}</span><span aria-hidden="true">↗</span></div>
                        <h3>{project.title}</h3>
                        <p>{project.summary}</p>
                        <ul className="tags" aria-label={`${project.title} technologies`}>{project.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
                        <details className="project-detail">
                            <summary>Project notes <span aria-hidden="true">+</span></summary>
                            <div><p>{project.detail}</p>{project.category === 'Production' && <p className="project-private">Internal Kimball International system. Source code and production screens are not shared here.</p>}
                                {project.link && <a className="text-link" href={project.link} target="_blank" rel="noopener noreferrer">{project.linkLabel} <Arrow /><span className="sr-only"> (opens in a new tab)</span></a>}
                            </div>
                        </details>
                    </article>
                ))}
            </div>
            <p className="gallery-note container">Production illustrations are conceptual, not application screenshots. Public projects preserve earlier portfolio work.</p>
        </section>
    );
}

export default function App() {
    const root = useRef(null);
    const [paused, setPaused] = useState(false);
    const [theme, setTheme] = useState(() => window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    const reduced = useReducedMotion();
    const motionEnabled = !paused && !reduced;
    useJourneyMotion(root, motionEnabled);

    useEffect(() => {
        document.documentElement.dataset.theme = theme;
    }, [theme]);

    return (
        <div ref={root} className="portfolio" data-motion={motionEnabled ? 'on' : 'off'}>
            <a className="skip-link" href="#main">Skip to content</a>
            <header className="site-header">
                <a className="wordmark" href="#top" aria-label="Andrew Broshears — back to top">ab<span>.</span></a>
                <nav aria-label="Main navigation">
                    <a href="#work">Work</a><a href="#about">About</a><a href="#contact">Contact <Arrow /></a>
                </nav>
                <div className="header-tools">
                    <button className="theme-toggle" type="button" onClick={() => setTheme(value => value === 'dark' ? 'light' : 'dark')} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}><span aria-hidden="true">◐</span></button>
                    <a className="resume-link" href={resumeUrl} target="_blank" rel="noopener noreferrer">Résumé <Arrow /><span className="sr-only"> (PDF, opens in a new tab)</span></a>
                </div>
            </header>
            <main id="main" tabIndex="-1">
                <section className="hero container" id="top" aria-labelledby="hero-heading">
                    <div className="hero-topline mono"><span>Application developer</span><span>Indiana, USA / Portfolio</span></div>
                    <div className="hero-name" id="hero-heading"><h1><span>Andrew</span><span>Broshears<span className="name-period">.</span></span></h1></div>
                    <div className="hero-grid">
                        <div className="hero-copy">
                            <p className="eyebrow"><span className="status-dot" /> Building at Kimball International</p>
                            <h2>Good software starts<br />with understanding<br /><em>the people using it.</em></h2>
                            <p>I build and modernize applications for manufacturing and business operations. C#, .NET, and a perspective shaped by years on the operations side.</p>
                            <a className="button button--accent" href="#work">Explore my work <Arrow down /></a>
                            <div className="hero-footnote mono"><span>Development × operations</span><span>Scroll to explore ↓</span></div>
                        </div>
                        <figure className="portrait">
                            <picture><source srcSet="/img/ab-720.webp" type="image/webp" /><img src="/img/ab-720.jpg" width="720" height="720" fetchPriority="high" alt="Andrew Broshears" /></picture>
                            <figcaption><span>Andrew Broshears</span><span className="mono">Developer / Problem solver</span></figcaption>
                            <span className="portrait-index mono" aria-hidden="true">AB — 01</span>
                        </figure>
                    </div>
                </section>

                <section className="journey" id="approach" aria-labelledby="journey-heading">
                    <div className="journey-top container"><p className="eyebrow">01 / How I approach the work</p><div className="motion-control"><button type="button" aria-pressed={paused} disabled={reduced} onClick={() => setPaused(value => !value)}>{reduced ? 'Reduced motion enabled' : paused ? 'Resume animation' : 'Pause animation'}</button></div></div>
                    <div className="journey-layout container">
                        <div className="scene-stage" aria-hidden="true">
                            <div className="scene-grid" />
                            <div className="scene-fallback"><span /><span /><span /></div>
                            {motionEnabled && <SceneBoundary><Suspense fallback={null}><AssemblyScene /></Suspense></SceneBoundary>}
                            <div className="scene-label mono"><span>Assembly study / 001</span><span>Form follows function</span></div>
                            <div className="scene-axis mono">Y ↑<br />↙ X &nbsp; Z ↗</div>
                        </div>
                        <div className="journey-chapters">
                            <article className="journey-chapter" data-chapter="0"><span className="chapter-number mono">01 — Understand</span><h2 id="journey-heading">Start with<br /><em>the operation.</em></h2><p>Before the framework comes the workflow. My manufacturing background helps me understand operational constraints and work with the people closest to the problem.</p></article>
                            <article className="journey-chapter" data-chapter="1"><span className="chapter-number mono">02 — Build</span><h2>Connect<br /><em>the pieces.</em></h2><p>Applications, data, and integrations have to work together. I develop with ASP.NET Core, Blazor, SignalR, and SQL Server to support day-to-day business needs.</p></article>
                            <article className="journey-chapter" data-chapter="2"><span className="chapter-number mono">03 — Improve</span><h2>Keep moving<br /><em>forward.</em></h2><p>Shipping is part of the job. Maintenance, modernization, deployments, and production support keep software useful as the business changes.</p></article>
                        </div>
                    </div>
                </section>

                <ProjectGallery />

                <section className="toolset section-pad container" id="stack" aria-labelledby="stack-heading">
                    <div className="section-heading" data-reveal><div><p className="eyebrow">03 / Technical toolkit</p><h2 id="stack-heading">The right tools.<br /><em>Used with intent.</em></h2></div><p>My résumé-backed toolkit, spanning custom applications, data access, cloud platforms, and workflow automation.</p></div>
                    <div className="skills-grid">{skills.map((group, index) => <div className="skill-group" key={group.title}><p className="mono skill-index">0{index + 1}</p><h3>{group.title}</h3><ul>{group.items.map(skill => <li key={skill}><span className="skill-mark" aria-hidden="true">{skill === 'C#' ? '#' : skill === '.NET' ? 'N' : skill.slice(0, 2).toUpperCase()}</span>{skill}</li>)}</ul></div>)}</div>
                </section>

                <section className="about section-pad" id="about" aria-labelledby="about-heading">
                    <div className="container about-grid">
                        <div className="about-intro" data-reveal><p className="eyebrow">04 / A different starting point</p><h2 id="about-heading">Operations<br />shaped the<br /><em>developer.</em></h2><p>I moved from manufacturing leadership into software development. That experience still shapes how I gather requirements, solve problems, and collaborate with business users.</p><details className="personal-detail"><summary>Beyond the code <span aria-hidden="true">+</span></summary><p>Soccer has always been part of my life: playing, coaching, and refereeing. Away from work, I enjoy hiking, kayaking, and traveling with my wife.</p></details><a className="text-link" href={resumeUrl} target="_blank" rel="noopener noreferrer">The full résumé <Arrow /><span className="sr-only"> (PDF, opens in a new tab)</span></a></div>
                        <div className="experience-list">{experience.map(job => <article className="experience-item" key={job.title}><span className="mono">{job.date}</span><h3>{job.title}</h3><p className="company">{job.company}</p><p>{job.text}</p></article>)}<article className="experience-item"><span className="mono">2021 — 2022 / Education</span><h3>Eleven Fifty Academy</h3><p>24-week Software Development Immersive with 500+ hours of project-based coding and training.</p><ul className="tags"><li>EFA Gold Badge</li></ul></article></div>
                    </div>
                </section>

                <section className="contact section-pad container" id="contact" aria-labelledby="contact-heading">
                    <p className="eyebrow">05 / Start a conversation</p><div className="contact-heading" data-reveal><h2 id="contact-heading">Let's build<br /><em>something useful.</em></h2><span aria-hidden="true">↗</span></div>
                    <div className="contact-bottom"><a className="email-link" href="mailto:ambroshears@gmail.com">ambroshears@gmail.com <Arrow /></a><p>Have a software problem, a .NET question, or an opportunity to discuss? Send a note.</p></div>
                    <div className="social-links"><a href="https://github.com/AndrewBroshears" target="_blank" rel="noopener noreferrer">GitHub <Arrow /><span className="sr-only"> (opens in a new tab)</span></a><a href="https://www.linkedin.com/in/andrewbroshears/" target="_blank" rel="noopener noreferrer">LinkedIn <Arrow /><span className="sr-only"> (opens in a new tab)</span></a><a href={resumeUrl} target="_blank" rel="noopener noreferrer">Résumé / PDF <Arrow /><span className="sr-only"> (opens in a new tab)</span></a></div>
                </section>
            </main>
            <footer className="footer container mono"><span>© {new Date().getFullYear()} Andrew Broshears</span><span>Made with React · Three.js · GSAP</span><a href="#top">Back to top ↑</a></footer>
        </div>
    );
}
