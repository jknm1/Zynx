document.addEventListener("DOMContentLoaded", () => {

  // ===== Fade-in on scroll =====
  const fadeElements = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
  );
  fadeElements.forEach(el => observer.observe(el));

  // ===== Smooth scrolling =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e){
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if(target){
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      // Close nav
      const navToggle = document.getElementById("nav-toggle");
      if(navToggle) navToggle.checked = false;
    });
  });

  // ===== Dark mode toggle =====
  const themeToggle = document.getElementById('theme-toggle');
  if(themeToggle){
    if(localStorage.getItem('darkMode')==='enabled'){
      document.body.classList.add('dark');
      themeToggle.textContent = '☀️';
    }
    themeToggle.addEventListener('click', ()=>{
      document.body.classList.toggle('dark');
      if(document.body.classList.contains('dark')){
        themeToggle.textContent='☀️';
        localStorage.setItem('darkMode','enabled');
      } else {
        themeToggle.textContent='🌙';
        localStorage.setItem('darkMode','disabled');
      }
    });
  }

  // ===== FAQ toggle =====
  document.querySelectorAll('.faq-item h3').forEach(faq => {
    faq.addEventListener('click', ()=>{
      const p = faq.nextElementSibling;
      if(p.style.display==='block'){
        p.style.display='none';
      } else {
        p.style.display='block';
      }
    });
  });

  // ===== Live support =====
  const supportOpen = document.getElementById('support-open');
  const liveSupport = document.getElementById('live-support');
  const supportClose = document.getElementById('support-close');
  const supportSend = document.getElementById('support-send');
  const supportInput = document.getElementById('support-input');
  const supportMessages = document.getElementById('support-messages');
  const supportHuman = document.getElementById('support-human');

  supportOpen.addEventListener('click', ()=> liveSupport.style.display='flex');
  supportClose.addEventListener('click', ()=> liveSupport.style.display='none');

  supportSend.addEventListener('click', ()=>{
    if(supportInput.value.trim()==='') return;
    const userMsg = document.createElement('div');
    userMsg.className='user-message';
    userMsg.textContent=supportInput.value;
    supportMessages.appendChild(userMsg);
    supportInput.value='';
    supportMessages.scrollTop = supportMessages.scrollHeight;

    setTimeout(()=>{
      const botMsg = document.createElement('div');
      botMsg.className='bot-message';
      botMsg.textContent='Thank you for your message. A human agent will assist shortly.';
      supportMessages.appendChild(botMsg);
      supportMessages.scrollTop = supportMessages.scrollHeight;
    },1000);
  });

  supportHuman.addEventListener('click', ()=>{
    const botMsg = document.createElement('div');
    botMsg.className='bot-message';
    botMsg.textContent='Connecting you to a human agent...';
    supportMessages.appendChild(botMsg);
    supportMessages.scrollTop = supportMessages.scrollHeight;
  });

});
