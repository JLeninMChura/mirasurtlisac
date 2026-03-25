/* ═══════════════════════════════════════════════
   MIRASUR TLI S.A.C. — MAIN.JS  |  2026
   Corrected & aligned with all HTML pages
═══════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

    /* ── NAVBAR SCROLL ─────────────────────────── */
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 60);
        }, { passive: true });
    }

    /* ── MOBILE NAV TOGGLE ─────────────────────── */
    const toggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    if (toggle && navLinks) {
        toggle.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('open');
            const spans = toggle.querySelectorAll('span');
            if (isOpen) {
                spans[0].style.cssText = 'transform:rotate(45deg) translate(5px,5px)';
                spans[1].style.cssText = 'opacity:0';
                spans[2].style.cssText = 'transform:rotate(-45deg) translate(5px,-5px)';
            } else {
                spans.forEach(s => s.style.cssText = '');
            }
        });
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                toggle.querySelectorAll('span').forEach(s => s.style.cssText = '');
            });
        });
        document.addEventListener('click', e => {
            if (navbar && !navbar.contains(e.target)) {
                navLinks.classList.remove('open');
                toggle.querySelectorAll('span').forEach(s => s.style.cssText = '');
            }
        });
    }

    /* ── SMOOTH SCROLL ─────────────────────────── */
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const id = a.getAttribute('href').slice(1);
            if (!id) return;
            const target = document.getElementById(id);
            if (target) {
                e.preventDefault();
                window.scrollTo({
                    top: target.getBoundingClientRect().top + window.scrollY - 90,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* ── SCROLL REVEAL — [data-aos] ────────────── */
    const aosEls = document.querySelectorAll('[data-aos], [data-aos="left"], [data-aos="right"], [data-aos="scale"]');
    if (aosEls.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const el = entry.target;
                // Stagger siblings in same parent
                const siblings = [...el.parentElement.querySelectorAll('[data-aos], [data-aos="left"], [data-aos="right"], [data-aos="scale"]')];
                const idx = siblings.indexOf(el);
                setTimeout(() => el.classList.add('vis'), idx * 80);
                observer.unobserve(el);
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
        aosEls.forEach(el => observer.observe(el));
    }

    /* ── HERO TITLE STAGGER (index.html) ────────── */
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const lines = heroTitle.querySelectorAll('span, em');
        lines.forEach((line, i) => {
            line.style.cssText = `opacity:0; transform:translateY(36px); transition:opacity .75s ease ${0.2 + i * 0.16}s, transform .75s cubic-bezier(.22,1,.36,1) ${0.2 + i * 0.16}s;`;
        });

        const heroEls = [
            { sel: '.eyebrow', delay: 0.08 },
            { sel: '.hero-sub', delay: 0.65 },
            { sel: '.hero-btns', delay: 0.80 },
            { sel: '.hero-metrics', delay: 0.95 },
        ];
        heroEls.forEach(({ sel, delay }) => {
            const el = document.querySelector(sel);
            if (!el) return;
            el.style.cssText = `opacity:0; transform:translateY(22px); transition:opacity .65s ease ${delay}s, transform .65s ease ${delay}s;`;
        });

        requestAnimationFrame(() => {
            setTimeout(() => {
                lines.forEach(line => { line.style.opacity = '1'; line.style.transform = 'none'; });
                heroEls.forEach(({ sel }) => {
                    const el = document.querySelector(sel);
                    if (el) { el.style.opacity = '1'; el.style.transform = 'none'; }
                });
            }, 60);
        });
    }

    /* ── PAGE HERO STAGGER (interior pages) ─────── */
    const pageTitle = document.querySelector('.page-title');
    if (pageTitle) {
        ['.eyebrow', '.page-title', '.page-sub', '.quick-links'].forEach((sel, i) => {
            const el = document.querySelector(sel);
            if (!el) return;
            el.style.cssText = `opacity:0; transform:translateY(20px); transition:opacity .65s ease ${i * 0.13}s, transform .65s ease ${i * 0.13}s;`;
        });
        setTimeout(() => {
            ['.eyebrow', '.page-title', '.page-sub', '.quick-links'].forEach(sel => {
                const el = document.querySelector(sel);
                if (el) { el.style.opacity = '1'; el.style.transform = 'none'; }
            });
        }, 80);
    }

    /* ── PARALLAX ORBS ─────────────────────────── */
    const orbs = document.querySelectorAll('.orb');
    if (orbs.length) {
        window.addEventListener('scroll', () => {
            const y = window.scrollY;
            orbs.forEach((orb, i) => {
                const speed = i % 2 === 0 ? 0.16 : 0.10;
                const dir = i % 2 === 0 ? 1 : -1;
                orb.style.transform = `translateY(${y * speed * dir}px)`;
            });
        }, { passive: true });
    }

    /* ── PARALLAX HERO PHOTO ─────────────────────  */
    const heroPhotoSide = document.querySelector('.hero-photo-side');
    if (heroPhotoSide) {
        window.addEventListener('scroll', () => {
            heroPhotoSide.style.transform = `translateY(${window.scrollY * 0.055}px)`;
        }, { passive: true });
    }

    /* ── MAGNETIC BUTTONS ──────────────────────── */
    document.querySelectorAll('.btn-primary').forEach(btn => {
        btn.addEventListener('mousemove', e => {
            const r = btn.getBoundingClientRect();
            const x = (e.clientX - r.left - r.width / 2) * 0.28;
            const y = (e.clientY - r.top - r.height / 2) * 0.28;
            btn.style.transform = `translate(${x}px, ${y}px)`;
        });
        btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
    });

    /* ── 3D TILT ON CARDS ──────────────────────── */
    if (window.matchMedia('(pointer:fine)').matches) {
        const tiltSelectors = [
            '.why-item', '.mvv-card', '.licit-card',
            '.gastro-card', '.comercio-card', '.transport-card',
            '.turismo-block', '.valor-item', '.team-card'
        ].join(',');
        document.querySelectorAll(tiltSelectors).forEach(card => {
            card.addEventListener('mousemove', e => {
                const r = card.getBoundingClientRect();
                const cx = (e.clientX - r.left) / r.width - 0.5;
                const cy = (e.clientY - r.top) / r.height - 0.5;
                card.style.transform = `perspective(700px) rotateX(${-cy * 5}deg) rotateY(${cx * 5}deg) translateZ(4px)`;
            });
            card.addEventListener('mouseleave', () => { card.style.transform = ''; });
        });
    }

    /* ── SERVICE CARD HOVER ARROW ──────────────── */
    document.querySelectorAll('.srv-card').forEach(card => {
        const arrow = card.querySelector('.srv-arrow');
        if (!arrow) return;
        card.addEventListener('mouseenter', () => { arrow.style.transform = 'translateX(6px)'; });
        card.addEventListener('mouseleave', () => { arrow.style.transform = ''; });
    });

    /* ── PHOTO FRAMES ──────────────────────────── */
    document.querySelectorAll('.photo-frame').forEach(frame => {
        frame.addEventListener('mouseenter', () => {
            frame.style.transform = 'scale(1.012)';
            frame.style.transition = 'transform .4s cubic-bezier(.22,1,.36,1), box-shadow .4s ease';
        });
        frame.addEventListener('mouseleave', () => { frame.style.transform = ''; });
    });

    /* ── IMAGE FADE-IN ─────────────────────────── */
    document.querySelectorAll('img').forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity .5s ease';
        const show = () => { img.style.opacity = '1'; };
        if (img.complete) show();
        else { img.addEventListener('load', show); img.addEventListener('error', show); }
    });

    /* ── ACCORDION (Comercio page) ─────────────── */
    document.querySelectorAll('.acc-trigger').forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.parentElement;
            const isOpen = item.classList.contains('open');
            document.querySelectorAll('.acc-item').forEach(i => i.classList.remove('open'));
            if (!isOpen) item.classList.add('open');
        });
    });
    // Open first accordion item by default
    const firstAcc = document.querySelector('.acc-item');
    if (firstAcc) firstAcc.classList.add('open');

    /* ── QUICK SERVICE BUTTONS (contacto.html) ─── */
    document.querySelectorAll('.sq-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const srv = btn.dataset.srv;
            const sel = document.getElementById('servicio');
            if (!sel || !srv) return;
            const opt = [...sel.options].find(o => o.text.startsWith(srv));
            if (opt) sel.value = opt.value || opt.text;
            const formSection = document.getElementById('form-section');
            if (formSection) formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    /* ── CONTACT FORM ──────────────────────────── */
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', e => {
            e.preventDefault();
            const ok = document.getElementById('formSuccess');
            const err = document.getElementById('formError');
            const get = id => document.getElementById(id)?.value.trim();

            if (!get('nombre') || !get('email') || !document.getElementById('servicio')?.value || !get('mensaje')) {
                err?.classList.remove('hidden');
                form.style.animation = 'formShake .4s ease';
                setTimeout(() => { form.style.animation = ''; err?.classList.add('hidden'); }, 3500);
                return;
            }

            const submitBtn = form.querySelector('button[type="submit"]');
            submitBtn.textContent = 'Enviando…';
            submitBtn.disabled = true;

            setTimeout(() => {
                ok?.classList.remove('hidden');
                form.reset();
                submitBtn.textContent = 'Enviar mensaje →';
                submitBtn.disabled = false;
                setTimeout(() => ok?.classList.add('hidden'), 5000);
            }, 1400);
        });
    }

    /* ── CURSOR GLOW (desktop only) ─────────────── */
    if (window.matchMedia('(pointer:fine)').matches) {
        const glow = document.createElement('div');
        glow.id = 'cursorGlow';
        glow.style.cssText = [
            'position:fixed', 'pointer-events:none', 'z-index:9999',
            'width:280px', 'height:280px', 'border-radius:50%',
            'background:radial-gradient(circle,rgba(200,121,10,.07) 0%,transparent 70%)',
            'transform:translate(-50%,-50%)', 'top:0', 'left:0',
            'transition:opacity .3s ease', 'will-change:left,top'
        ].join(';');
        document.body.appendChild(glow);
        document.addEventListener('mousemove', e => {
            glow.style.left = e.clientX + 'px';
            glow.style.top = e.clientY + 'px';
        }, { passive: true });
    }

    /* ── SECTION NUMBER ENTRANCE ─────────────────  */
    document.querySelectorAll('.srv-section-label').forEach(label => {
        label.style.cssText = 'opacity:0; transform:translateX(40px); transition:opacity .9s ease, transform .9s ease;';
        const obs = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                label.style.opacity = '1';
                label.style.transform = 'translateX(0)';
                obs.disconnect();
            }
        }, { threshold: 0.2 });
        obs.observe(label.closest('.srv-section') || label);
    });

    /* ── INJECT ANIMATION KEYFRAMES ─────────────── */
    const style = document.createElement('style');
    style.textContent = `
    @keyframes formShake {
      0%,100% { transform:translateX(0) }
      20%     { transform:translateX(-8px) }
      40%     { transform:translateX(8px) }
      60%     { transform:translateX(-5px) }
      80%     { transform:translateX(5px) }
    }
  `;
    document.head.appendChild(style);

});