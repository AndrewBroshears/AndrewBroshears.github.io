import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useJourneyMotion(root, enabled) {
    useEffect(() => {
        if (!enabled || !root.current) return;
        const context = gsap.context(() => {
            gsap.from('.hero-name h1 > span', {
                y: 45, opacity: 0, duration: 1.1, stagger: .12, ease: 'power3.out',
                clearProps: 'all',
            });
            gsap.from(['.hero-copy', '.portrait'], {
                y: 25, opacity: 0, duration: .9, stagger: .15, delay: .25,
                ease: 'power2.out', clearProps: 'all',
            });
            gsap.utils.toArray('[data-reveal]').forEach(element => {
                gsap.from(element, {
                    y: 32, opacity: 0, duration: .8, ease: 'power2.out',
                    clearProps: 'all',
                    scrollTrigger: { trigger: element, start: 'top 94%', once: true },
                });
            });
            const media = gsap.matchMedia();
            media.add('(min-width: 761px)', () => {
                gsap.utils.toArray('.journey-chapter').forEach(chapter => {
                    gsap.fromTo(chapter, { opacity: .45 }, {
                        opacity: 1, ease: 'none',
                        scrollTrigger: { trigger: chapter, start: 'top 80%', end: 'top 45%', scrub: true },
                    });
                });
            });
        }, root);
        let disposed = false;
        let resizeFrame = 0;
        const resizeObserver = new ResizeObserver(() => {
            cancelAnimationFrame(resizeFrame);
            resizeFrame = requestAnimationFrame(() => ScrollTrigger.refresh());
        });
        resizeObserver.observe(root.current);
        document.fonts.ready.then(() => { if (!disposed) ScrollTrigger.refresh(); });
        return () => {
            disposed = true;
            cancelAnimationFrame(resizeFrame);
            resizeObserver.disconnect();
            context.revert();
        };
    }, [root, enabled]);
}
