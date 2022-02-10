(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 20
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('fa-bars')
    this.classList.toggle('fa-times-circle')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('fa-bars')
        navbarToggle.classList.toggle('fa-times-circle')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Initiate glightbox
   */
  const videoTwo = GLightbox({
    selector: ".glightbox",
    type: "video",
    source: "youtube", //vimeo, youtube or local
    width: 900,
    autoplayVideos: true,
  });

  /**
   * Timer
   */
   const end = new Date("Feb 24, 2022 20:19:00").getTime();
   //const end = new Date("November 09, 2020 00:00:00").getTime();
   const dayEl = document.querySelector(".days");
   const hoursEl = document.querySelector(".hours");
   const minutesEl = document.querySelector(".minutes");
   const secondsEl = document.querySelector(".seconds");
   const seconds = 1000;
   const minutes = seconds * 60;
   const hours = minutes * 60;
   const days = hours * 24;
   
   const x = setInterval(function () {
     let now = new Date().getTime();
     const difference = end - now;
   
     if (difference < 0) {
       clearInterval(x);
       document.getElementById("done").innerHTML = "";
       return;
     }
   
     dayEl.innerText = Math.floor(difference / days);
     hoursEl.innerText = Math.floor((difference % days) / hours);
     minutesEl.innerText = Math.floor((difference % hours) / minutes);
     secondsEl.innerText = Math.floor((difference % minutes) / seconds);
   }, seconds);

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

})();

  /**
   * Counter for Stats
  */
$('[data-toggle="counterUp"]').counterUp({
  delay: 15,
  time: 1500
});

  /**
   * Form Button
  */
window.addEventListener('load', function() {
  let currForm1 = document.getElementById('UserForm');
  // Validate on input:
  currForm1.querySelectorAll('.form-control').forEach((input, index) => {
    input.addEventListener(('input'), () => {
      if (input.checkValidity()) {
        console.log(input.checkValidity());
        input.classList.remove('is-invalid')
        input.classList.add('is-valid');      
      } else {
        input.classList.remove('is-valid')
        input.classList.add('is-invalid');
      }
      if(input.checkValidity() && index===1) {
        $("#submitBtn").attr("disabled", false); 
      }
    });
  });

  // Validate on submit:
  currForm1.addEventListener('submit', function(event) {
    if (currForm1.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    currForm1.classList.add('was-validated');
  }, false);
});

  /**
   * Initialise Intel Tel Input 
  */
const phoneInputField = document.querySelector("#UserContact");
const phoneInput = window.intlTelInput(phoneInputField, {
  preferredCountries: ["IN"],
  // initialCountry: "IN",
  // geoIpLookup: getIp,
  utilsScript:
    "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
 });


  /**
   * Animation on submit
   */
const button = document.querySelector('.button');
const submit = document.querySelector('.submit');

function toggleClass() {
  this.classList.toggle('active');
}

function addClass() {
  this.classList.add('finished');
}

button.addEventListener('click', toggleClass);
button.addEventListener('transitionend', toggleClass);
button.addEventListener('transitionend', addClass);

  /**
   * Connection to Google Sheet
  */
const scriptURL = 'https://script.google.com/macros/s/AKfycbziDeZWTny5xkZobaCAhTKc7bxLtpoWOChcs9fi6rFROUPRStMpzfDoC8X1F5jmy4Qu/exec'
const form = document.forms['UserDetails']

form.addEventListener('submit', e => {
  e.preventDefault()
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => alert("Registration Successfull"))
    .catch(error => console.error('Error!', error.message))
})