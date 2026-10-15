(() => {
  'use strict';
  const eventTime = Date.parse('2026-11-04T19:00:00-06:00');
  const fields = ['days','hours','minutes','seconds'].map(id => document.getElementById(id));
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let interval;
  function updateCountdown() {
    const seconds = Math.max(0,Math.floor((eventTime-Date.now())/1000));
    const values = [Math.floor(seconds/86400),Math.floor(seconds/3600)%24,Math.floor(seconds/60)%60,seconds%60];
    fields.forEach((field,i) => {
      const next = String(values[i]).padStart(2,'0');
      if(field.textContent !== next) {
        field.textContent=next;
        if(!reducedMotion.matches) {field.classList.remove('tick');void field.offsetWidth;field.classList.add('tick');}
      }
    });
    if(seconds===0) {document.getElementById('event-state').hidden=false;if(interval) clearInterval(interval);}
  }
  updateCountdown();
  if(Date.now()<eventTime) interval=setInterval(updateCountdown,1000);
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)updateCountdown();});
  // Forms are handled by Tally; this page never stores respondent details.
  const frame=document.getElementById('registration-form');
  const fallback=document.getElementById('form-fallback');
  const cta=document.querySelector('.hero-cta');
  const eventPassed=Date.now()>=eventTime;
  const parameters=new URLSearchParams(location.search);
  const formUrl=new URL(frame.dataset.tallySrc);
  const fallbackUrl=new URL(fallback.href);
  for (const key of ['utm_source','utm_medium','utm_campaign','utm_content','utm_term']) {
    const value=parameters.get(key);
    if(value){formUrl.searchParams.set(key,value.slice(0,250));fallbackUrl.searchParams.set(key,value.slice(0,250));}
  }
  frame.dataset.tallySrc=formUrl.href;
  fallback.href=fallbackUrl.href;

  window.dataLayer=window.dataLayer||[];
  window.gtag=window.gtag||function(){window.dataLayer.push(arguments);};
  window.gtag('js',new Date());
  window.gtag('config','G-9REVXE3CQC');
  if(!window.fbq){
    const pixel=window.fbq=function(){pixel.callMethod?pixel.callMethod.apply(pixel,arguments):pixel.queue.push(arguments);};
    window._fbq=window._fbq||pixel;pixel.push=pixel;pixel.loaded=true;pixel.version='2.0';pixel.queue=[];
    const script=document.createElement('script');script.async=true;script.src='https://connect.facebook.net/en_US/fbevents.js';document.head.appendChild(script);
    pixel('init','2201485733932576');pixel('track','PageView');
  }
  cta.addEventListener('click',()=>{
    window.gtag('event','masterclass_registration_click',{event_name:'masterclass_2026_11_04',cta_location:'hero'});
  });
  // Only a confirmed submission from our own Tally iframe counts as a conversion.
  let conversionReported=false;
  window.addEventListener('message',event=>{
    if(event.origin!=='https://tally.so'||event.source!==frame.contentWindow||typeof event.data!=='string')return;
    if(!event.data.includes('Tally.FormSubmitted'))return;
    let message;try{message=JSON.parse(event.data);}catch{return;}
    if(message.payload?.formId!=='zEXNbE'||conversionReported)return;
    conversionReported=true;
    window.gtag('event','generate_lead',{event_name:'masterclass_2026_11_04'});
    window.fbq?.('track','CompleteRegistration',{content_name:'Masterclass Barbie Beiles 2026-11-04',status:true});
  });
  const widget=document.createElement('script');
  widget.src='https://tally.so/widgets/embed.js';widget.async=true;
  widget.onload=()=>window.Tally?.loadEmbeds();
  widget.onerror=()=>{frame.hidden=true;fallback.textContent='Abrir formulario de registro';fallback.classList.add('cta');};
  document.head.appendChild(widget);
})();
