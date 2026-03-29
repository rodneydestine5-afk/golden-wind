
(function () {
  const cursor = document.getElementById('cursor');
  const ring   = document.getElementById('cursor-ring');
  let mx = 0, my = 0, rx = 0, ry = 0;

  
  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
  });

 
  function animateRing() {
    rx += (mx - rx) * 0.15;
    ry += (my - ry) * 0.15;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();


  const interactives = 'a, button, .menu-card, .g-item, input, textarea';
  document.querySelectorAll(interactives).forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width  = '18px';
      cursor.style.height = '18px';
      ring.style.width    = '56px';
      ring.style.height   = '56px';
      ring.style.opacity  = '.3';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.width  = '10px';
      cursor.style.height = '10px';
      ring.style.width    = '36px';
      ring.style.height   = '36px';
      ring.style.opacity  = '.5';
    });
  });


  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    ring.style.opacity   = '0';
  });
  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
    ring.style.opacity   = '.5';
  });
})();



(function () {
  const html = document.documentElement;
  const btn  = document.getElementById('themeToggle');
  const icon = document.getElementById('themeIcon');


  const saved = localStorage.getItem('golden-wind-theme') || 'light';
  html.setAttribute('data-theme', saved);
  icon.className = saved === 'dark' ? 'bi bi-sun' : 'bi bi-moon-stars';

  btn.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next    = current === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', next);
    localStorage.setItem('golden-wind-theme', next);
    icon.className = next === 'dark' ? 'bi bi-sun' : 'bi bi-moon-stars';
  });
})();



(function () {
  const nav     = document.getElementById('mainNav');
  const ham     = document.getElementById('hamburger');
  const links   = document.getElementById('navLinks');
  const overlay = document.getElementById('navOverlay');


  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });


  function toggleMenu(open) {
    ham.classList.toggle('active', open);
    links.classList.toggle('open', open);
    overlay.classList.toggle('show', open);
    ham.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.style.overflow = open ? 'hidden' : '';
  }

  ham.addEventListener('click', () => {
    toggleMenu(!links.classList.contains('open'));
  });

  
  overlay.addEventListener('click', () => toggleMenu(false));


  document.querySelectorAll('.nav-link-item, .nav-links .btn-gold').forEach(a => {
    a.addEventListener('click', () => toggleMenu(false));
  });
})();



(function () {
  const bar = document.getElementById('progress');
  window.addEventListener('scroll', () => {
    const max = document.body.scrollHeight - window.innerHeight;
    const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
    bar.style.width = pct + '%';
  }, { passive: true });
})();



(function () {
  const els = document.querySelectorAll('.reveal');

  
  if (!('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('visible'));
    return;
  }

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target); 
      }
    });
  }, { threshold: 0.12 });

  els.forEach(el => obs.observe(el));
})();



(function () {
  const tabs   = document.querySelectorAll('.menu-tab');
  const panels = document.querySelectorAll('.menu-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
     
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      
      tab.classList.add('active');
      const target = document.getElementById('tab-' + tab.dataset.tab);
      if (target) {
        target.classList.add('active');
        
        target.querySelectorAll('.reveal:not(.visible)').forEach(el => {
          el.classList.add('visible');
        });
      }
    });
  });
})();



(function () {
  const submitBtn  = document.getElementById('submitBtn');
  const formWrap   = document.getElementById('contactForm');
  const successMsg = document.getElementById('formSuccess');
  const resetBtn   = document.getElementById('resetForm');

  submitBtn.addEventListener('click', () => {
    
    const name   = document.getElementById('fname').value.trim();
    const email  = document.getElementById('femail').value.trim();
    const guests = document.getElementById('fguests').value.trim();
    const date   = document.getElementById('fdate').value;

    
    if (!name || !email || !guests || !date) {
      [
        { id: 'fname',   val: name   },
        { id: 'femail',  val: email  },
        { id: 'fguests', val: guests },
        { id: 'fdate',   val: date   },
      ].forEach(f => {
        const el = document.getElementById(f.id);
        if (!f.val) {
          el.style.borderColor = '#C0392B';
          
          el.addEventListener('input', () => { el.style.borderColor = ''; }, { once: true });
        }
      });
      return;
    }

    
    submitBtn.innerHTML     = '<span>Envoi en cours…</span><i class="bi bi-hourglass-split"></i>';
    submitBtn.style.opacity = '.7';
    submitBtn.style.pointerEvents = 'none';

    
    setTimeout(() => {
      formWrap.style.display   = 'none';
      successMsg.style.display = 'block';
    }, 1200);
  });

  
  resetBtn.addEventListener('click', () => {
    formWrap.style.display   = 'block';
    successMsg.style.display = 'none';
    submitBtn.innerHTML      = '<span>Envoyer la demande</span><i class="bi bi-send"></i>';
    submitBtn.style.opacity  = '1';
    submitBtn.style.pointerEvents = '';
    ['fname', 'femail', 'fphone', 'fguests', 'fdate', 'ftime', 'fmessage']
      .forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
      });
  });
})();



(function () {
  const btn = document.getElementById('backTop');
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
})();



document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 80; 
    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY - offset,
      behavior: 'smooth',
    });
  });
});
