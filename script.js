


  
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileSlideMenu = document.getElementById("mobile-slide-menu");
const mobileMenuClose = document.getElementById("mobile-menu-close");

// Open mobile menu on hamburger click
mobileMenuBtn.addEventListener("click", () => {
  mobileSlideMenu.classList.add("active");
});

// Close mobile menu on close button click
mobileMenuClose.addEventListener("click", () => {
  mobileSlideMenu.classList.remove("active");
});

// Close menu when clicking on a link (optional but user friendly)
function closeMobileMenu() {
  mobileSlideMenu.classList.remove("active");
}



//    Contact Form
    (function(){
      const form = document.getElementById('leadForm');
      const submitBtn = document.getElementById('submitBtn');
      const btnText = document.getElementById('btnText');
      const statusOk = document.getElementById('statusOk');
      const statusFail = document.getElementById('statusFail');
      const toastOk = document.getElementById('toastOk');
      const toastErr = document.getElementById('toastErr');

      const ACTION_URL = 'https://formspree.io/f/mqadlgwy';
      const COOLDOWN_MS = 30000;
      let lastSentAt = 0;

      function show(el){ el.style.display = 'block'; }
      function hide(el){ el.style.display = 'none'; }
      function toast(el){ el.style.display='block'; setTimeout(()=> el.style.display='none', 2200); }

      function setLoading(loading){
        submitBtn.dataset.loading = String(loading);
        submitBtn.disabled = loading;
        btnText.textContent = loading ? 'Sending…' : 'Send request';
      }

      function setFieldError(id, msg){
        const box = document.querySelector(`.error[data-error-for="${id}"]`);
        if(!box) return;
        if(msg){ box.textContent = msg; box.style.display = 'block'; }
        else { box.textContent = ''; box.style.display = 'none'; }
      }

      function validate(){
        let ok = true;
        const required = [
          ['name','Please enter your full name.'],
          ['email','A valid email is required.'],
          ['service','Please choose a service.'],
          ['message','Please tell us a bit about your project.'],
          ['consent','Please accept the privacy policy.']
        ];
        required.forEach(([id, msg])=>{
          const el = document.getElementById(id);
          if(id === 'consent'){
            if(!el.checked){ setFieldError(id, msg); ok = false; }
            else setFieldError(id, '');
          } else {
            if(!el.checkValidity()){ setFieldError(id, msg); ok = false; }
            else setFieldError(id, '');
          }
        });
        return ok;
      }

      form.addEventListener('submit', async (e)=>{
        e.preventDefault();
        hide(statusOk); hide(statusFail);

        if(Date.now() - lastSentAt < COOLDOWN_MS){
          show(statusFail); statusFail.textContent = 'Please wait a few seconds before sending again.';
          toast(toastErr); return;
        }

        if(!validate()) return;

        const botField = document.getElementById('company');
        if(botField && botField.value){ return; }

        const data = Object.fromEntries(new FormData(form).entries());
        setLoading(true);
        try{
          if(ACTION_URL){
            const res = await fetch(ACTION_URL, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(data)
            });
            if(!res.ok) throw new Error('Network');
          } else {
            await new Promise(r => setTimeout(r, 900));
          }
          show(statusOk); hide(statusFail); toast(toastOk); form.reset();
          lastSentAt = Date.now();
        } catch(err){
          show(statusFail); hide(statusOk); toast(toastErr);
        } finally {
          setLoading(false);
        }
      });

      form.addEventListener('input', (e)=>{
        const target = e.target;
        if(target.id){ setFieldError(target.id, ''); }
      });
    })();
 