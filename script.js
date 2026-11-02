/**
 * Portfólio de Davi Duarte Teixeira
 * JavaScript Puro (Vanilla JS)
 */

document.addEventListener('DOMContentLoaded', () => {
  // ========================================================================
  // 1. ALTERNADOR DE TEMA CLARO/ESCURO (Ref: Artemii Lebedev)
  // ========================================================================
  const themeToggleBtn = document.getElementById('theme-toggle');
  const rootElement = document.documentElement;

  // Carrega o tema salvo no localStorage ou adota o padrão (dark)
  const savedTheme = localStorage.getItem('theme') || 'dark';
  rootElement.setAttribute('data-theme', savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = rootElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      rootElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }

  // ========================================================================
  // 2. MENU MOBILE RESPONSIVO
  // ========================================================================
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navContainer = document.getElementById('nav-container');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileMenuBtn && navContainer) {
    // Alterna o menu mobile ao clicar no botão hambúrguer
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = navContainer.classList.contains('is-open');
      
      navContainer.classList.toggle('is-open');
      mobileMenuBtn.classList.toggle('is-active');
      mobileMenuBtn.setAttribute('aria-expanded', !isOpen);
    });

    // Fecha o menu mobile automaticamente ao clicar em qualquer link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navContainer.classList.contains('is-open')) {
          navContainer.classList.remove('is-open');
          mobileMenuBtn.classList.remove('is-active');
          mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  // ========================================================================
  // 3. EFEITO DE VIDRO NO HEADER E ATIVAÇÃO DE LINKS POR SCROLL
  // ========================================================================
  const siteHeader = document.getElementById('site-header');

  const handleHeaderScroll = () => {
    if (window.scrollY > 20) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll(); // Checagem inicial

  // Atualiza link ativo no menu conforme a seção visível
  const sections = document.querySelectorAll('section[id]');
  const updateActiveNavLink = () => {
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      const targetLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

      if (targetLink && scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => link.classList.remove('active'));
        targetLink.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });

  // ========================================================================
  // ROLAMENTO SUAVE & REVEAL DE ELEMENTOS AO ROLAR (Ref: Nothin')
  // ========================================================================
  const scrollProgressBar = document.getElementById('scroll-progress');
  const updateScrollProgress = () => {
    if (!scrollProgressBar) return;
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgressBar.style.width = `${scrollPercent}%`;
  };
  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  updateScrollProgress(); // Checagem inicial

  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target); // Revela suavemente uma vez
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback para navegadores sem IntersectionObserver
    revealElements.forEach(el => el.classList.add('is-revealed'));
  }

  // ========================================================================
  // 4. PALCO ELÍPTICO INTERATIVO DE PROJETOS (Ref: Reed Hilderbrand)
  // ========================================================================
  const projectsData = [
    {
      counter: "PROJETO 01 DE 04",
      category: "Web Design",
      title: "Portfólio Pessoal (v1)",
      desc: "Primeira versão do portfólio digital desenvolvida para apresentar trajetória escolar, projetos e habilidades fundamentais em desenvolvimento front-end.",
      tags: ["HTML5", "CSS3", "JavaScript", "Responsivo"],
      link: "https://portfolio-pessoal-jade.vercel.app/",
      badge: ""
    },
    {
      counter: "PROJETO 02 DE 04",
      category: "Interface UI",
      title: "Minecraft Login Screen",
      desc: "Interface temática de autenticação inspirada na estética visual do universo Minecraft, combinando elementos gráficos imersivos e interações front-end.",
      tags: ["HTML5", "CSS3", "JavaScript", "UI/UX"],
      link: "https://minecraft-login.vercel.app/",
      badge: ""
    },
    {
      counter: "PROJETO 03 DE 04",
      category: "Aplicação Web",
      title: "Projeto 2 - BTI",
      desc: "Aplicação concebida com foco prioritário em dispositivos móveis, apresentando usabilidade tátil ágil, layout adaptado para telas verticais e navegação dinâmica.",
      tags: ["Mobile First", "CSS3 Flexbox", "JavaScript", "BTI"],
      link: "https://projeto2-bti.vercel.app/",
      badge: "📱 Otimizado para Celular"
    },
    {
      counter: "PROJETO 04 DE 04",
      category: "Interatividade",
      title: "Metamorfs",
      desc: "Experimento criativo explorando transições visuais dinâmicas, manipulação de elementos via JavaScript e comportamento interativo no navegador.",
      tags: ["JavaScript", "CSS Animations", "Front-end", "Lógica"],
      link: "https://metamorfs.vercel.app/",
      badge: ""
    }
  ];

  const arcNodes = document.querySelectorAll('.arc-node');
  const centerInfo = document.getElementById('reed-center-info');
  const counterEl = document.getElementById('center-proj-counter');
  const categoryEl = document.getElementById('center-proj-category');
  const badgeEl = document.getElementById('center-proj-badge');
  const titleEl = document.getElementById('center-proj-title');
  const descEl = document.getElementById('center-proj-desc');
  const tagsEl = document.getElementById('center-proj-tags');
  const linkEl = document.getElementById('center-proj-link');

  let activeProjectIndex = 0;
  let transitionTimeout = null;

  const updateCenterProject = (index) => {
    if (index === activeProjectIndex || !projectsData[index]) return;
    activeProjectIndex = index;

    // Atualiza estado visual dos nós no arco
    arcNodes.forEach((node, i) => {
      const isActive = i === index;
      node.classList.toggle('active', isActive);
      node.setAttribute('aria-selected', isActive);
    });

    // Inicia transição suave de opacidade e escala
    if (centerInfo) {
      centerInfo.classList.add('is-transitioning');
      
      clearTimeout(transitionTimeout);
      transitionTimeout = setTimeout(() => {
        const proj = projectsData[index];

        if (counterEl) counterEl.textContent = proj.counter;
        if (categoryEl) categoryEl.textContent = proj.category;
        if (titleEl) titleEl.textContent = proj.title;
        if (descEl) descEl.textContent = proj.desc;
        if (linkEl) linkEl.setAttribute('href', proj.link);

        // Badge especial (mobile)
        if (badgeEl) {
          if (proj.badge) {
            badgeEl.textContent = proj.badge;
            badgeEl.style.display = 'inline-block';
          } else {
            badgeEl.style.display = 'none';
          }
        }

        // Tags
        if (tagsEl) {
          tagsEl.innerHTML = proj.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
        }

        centerInfo.classList.remove('is-transitioning');
      }, 150);
    }
  };

  arcNodes.forEach(node => {
    const nodeIndex = parseInt(node.getAttribute('data-index'), 10);
    
    // Troca imediata ao passar o mouse por cima
    node.addEventListener('mouseenter', () => updateCenterProject(nodeIndex));
    // Suporte para teclado / clique / toque mobile
    node.addEventListener('click', () => updateCenterProject(nodeIndex));
    node.addEventListener('focus', () => updateCenterProject(nodeIndex));
  });

  // ========================================================================
  // 5. VALIDAÇÃO E ENVIO DO FORMULÁRIO DE CONTATO (JS PURO)
  // ========================================================================
  const contactForm = document.getElementById('contact-form');
  const nameInput = document.getElementById('form-name');
  const emailInput = document.getElementById('form-email');
  const subjectInput = document.getElementById('form-subject');
  const messageInput = document.getElementById('form-message');
  const formFeedback = document.getElementById('form-feedback');
  const submitBtn = document.getElementById('submit-btn');

  // Regex para formato de e-mail válido
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Função auxiliar para exibir erro
  const setError = (input, errorElementId, message) => {
    input.classList.add('invalid');
    const errorEl = document.getElementById(errorElementId);
    if (errorEl) {
      errorEl.textContent = message;
    }
  };

  // Função auxiliar para limpar erro
  const clearError = (input, errorElementId) => {
    input.classList.remove('invalid');
    const errorEl = document.getElementById(errorElementId);
    if (errorEl) {
      errorEl.textContent = '';
    }
  };

  // Limpeza de erros em tempo real ao digitar
  if (nameInput) nameInput.addEventListener('input', () => clearError(nameInput, 'name-error'));
  if (emailInput) emailInput.addEventListener('input', () => clearError(emailInput, 'email-error'));
  if (subjectInput) subjectInput.addEventListener('input', () => clearError(subjectInput, 'subject-error'));
  if (messageInput) messageInput.addEventListener('input', () => clearError(messageInput, 'message-error'));

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Validação do Nome
      if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
        setError(nameInput, 'name-error', 'Por favor, informe seu nome (mínimo 2 caracteres).');
        isValid = false;
      } else {
        clearError(nameInput, 'name-error');
      }

      // Validação do E-mail
      if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
        setError(emailInput, 'email-error', 'Informe um endereço de e-mail válido.');
        isValid = false;
      } else {
        clearError(emailInput, 'email-error');
      }

      // Validação do Assunto
      if (!subjectInput.value.trim() || subjectInput.value.trim().length < 3) {
        setError(subjectInput, 'subject-error', 'Informe o assunto da mensagem (mínimo 3 caracteres).');
        isValid = false;
      } else {
        clearError(subjectInput, 'subject-error');
      }

      // Validação da Mensagem
      if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
        setError(messageInput, 'message-error', 'A mensagem deve conter pelo menos 10 caracteres.');
        isValid = false;
      } else {
        clearError(messageInput, 'message-error');
      }

      // Se todas as validações passarem
      if (isValid) {
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span>Enviando...</span>`;

        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;

          // Exibe notificação de sucesso
          formFeedback.className = 'form-feedback success';
          formFeedback.textContent = '✅ Mensagem enviada com sucesso! Obrigado pelo contato, Davi responderá em breve.';

          // Limpa os campos
          contactForm.reset();

          // Remove a mensagem de sucesso após 6 segundos
          setTimeout(() => {
            formFeedback.className = 'form-feedback';
            formFeedback.textContent = '';
          }, 6000);
        }, 600);
      }
    });
  }
});
