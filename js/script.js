/**
 * This is script for index page
 */

(function ($) {
  $(document).ready(function () {
    
    $(window).scroll(function(){
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        $('.footer .scroll-notification').css({'opacity': 0});
      } else {
        $('.footer .scroll-notification').css({'opacity': 1});
      }

      var trigger_point = window.innerHeight / 2 + window.scrollY;
      $( "section" ).each(function( index, element ) {
        let anchor = $(element).data('anchor');
        if ( $(element).offset().top < trigger_point ) {
          $('.header-menu__item a[href="#' + anchor + '"]').parent().addClass('active');
        } else {
          $('.header-menu__item a[href="#' + anchor + '"]').parent().removeClass('active');
        }
      });
    });

    $('.modal-trigger').on('click', function(e) {
      e.preventDefault();
      $('.modal').fadeIn();
      $('.modal-overlay').fadeIn();
    })

    $('.modal-overlay').on('click', function() {
      $('.modal').fadeOut();
      $('.modal-overlay').fadeOut();
    })

    $('.header-menu__item a').on('click', function(e) {
      e.preventDefault();
      var target = $(this).attr('href').replace("#", "");
      $('html, body').animate({
        scrollTop: $("section[data-anchor=" + target + "]").offset().top - 200
      }, 300);
    });

    $('.footer-menu__item a').on('click', function(e) {
      e.preventDefault();
      var target = $(this).attr('href').replace("#", "");
      $('html, body').animate({
        scrollTop: $("section[data-anchor=" + target + "]").offset().top - 200
      }, 300);
    });

    $('input, textarea').on('change', function() {
      console.log($(this).val());
      if ( $(this).val() != '' ) {
        $(this).addClass('filled');
      } else {
        $(this).removeClass('filled');
      }
    });

    /*******************************
     *       Mouse Behaviour       *
     *******************************/

    var cursor = $(".cursor"),
      follower = $(".cursor-follower");

    var posX = 0,
      posY = 0;

    var mouseX = 0,
      mouseY = 0;

    gsap.to({}, 0.016, {
      repeat: -1,
      onRepeat: function () {
        posX += (mouseX - posX) / 9;
        posY += (mouseY - posY) / 9;

        gsap.set(follower, {
          css: {
            left: posX - 12,
            top: posY - 12
          }
        });

        gsap.set(cursor, {
          css: {
            left: mouseX,
            top: mouseY
          }
        });
      }
    });

    $(document).on("mousemove", function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    // Intro page heading effect
    $(".intro h1").on("mouseenter", function () {
      cursor.addClass("active").addClass("invert");
      follower.addClass("active").addClass("invert");
    });
    $(".intro h1").on("mouseleave", function () {
      cursor.removeClass("active").removeClass("invert");
      follower.removeClass("active").removeClass("invert");
    });

    // About page heading effect
    $("h2").on("mouseenter", function () {
      cursor.addClass("active").addClass("invert");
      follower.addClass("active").addClass("invert");
    });
    $("h2").on("mouseleave", function () {
      cursor.removeClass("active").removeClass("invert");
      follower.removeClass("active").removeClass("invert");
    });

    /***************************************
     *      Scroll into View Animation     *
     ***************************************/
    function animateFrom(elem, direction) {
      direction = direction || 1;
      var x = 0,
        y = direction * 100;
      if (elem.classList.contains("gs_reveal_fromLeft")) {
        x = -100;
        y = 0;
      } else if (elem.classList.contains("gs_reveal_fromRight")) {
        x = 100;
        y = 0;
      }
      elem.style.transform = "translate(" + x + "px, " + y + "px)";
      elem.style.opacity = "0";
      gsap.fromTo(elem, { x: x, y: y, autoAlpha: 0 }, {
        duration: 3,
        x: 0,
        y: 0,
        autoAlpha: 1,
        ease: "expo",
        overwrite: "auto"
      });
    }

    function hide(elem) {
      gsap.set(elem, { autoAlpha: 0 });
    }

    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray(".gs_reveal").forEach(function (elem) {
      hide(elem); // assure that the element is hidden when scrolled into view

      ScrollTrigger.create({
        trigger: elem,
        onEnter: function () { animateFrom(elem) },
        onEnterBack: function () { animateFrom(elem, -1) },
        onLeave: function () { hide(elem) } // assure that the element is hidden when scrolled into view
      });
    });

    /*************************************
     *      Intro Section Animations     *
     *************************************/
    particlesJS.load('intro-particles', 'js/particles.json');

    const introHeading = document.querySelector('.intro h1');
    Splitting({ target: introHeading });
    const introSubheading = document.querySelector('.intro .subheading');
    Splitting({ target: introSubheading });

    var num_char = 0;
    $('.intro h1').css({ opacity: 1 });
    $('.intro h1 span.char').each(function (index, element) {
      setTimeout((element) => {
        $(element).addClass('show');
      }, index * 100, element);
      num_char = index;
    });

    setTimeout(() => {
      $('.intro .subheading').css({ opacity: 1 });
      $('.intro .subheading span.char').each(function (index, element) {
        setTimeout((element) => {
          $(element).addClass('show');
        }, index * 100, element);
        num_char = index;
      });
    }, (num_char + 5) * 100);

    /************************************
     *        Headings Animations       *
     ************************************/

    const s_heading = document.querySelectorAll('h2');
    s_heading.forEach(element => {
      Splitting({ target: element });
    });

    gsap.utils.toArray("h2").forEach(function (elem) {
      ScrollTrigger.create({
        trigger: elem,
        onEnter: function () {
          $(elem).css({ opacity: 1 });
          $(elem).find('span.char').each(function (index, element) {
            setTimeout((element) => {
              $(element).addClass('show');
            }, index * 100, element);
            num_char = index;
          });
        },
        onEnterBack: function () {
          $(elem).css({ opacity: 1 });
          $(elem).find('span.char').each(function (index, element) {
            setTimeout((element) => {
              $(element).addClass('show');
            }, index * 100, element);
            num_char = index;
          });
        },
        onLeave: function () {
          $(elem).css({ opacity: 0 });
          $(elem).find('span.char').each(function (index, element) {
            $(element).removeClass('show');
          });
        },
        onLeaveBack: function () {
          $(elem).css({ opacity: 0 });
          $(elem).find('span.char').each(function (index, element) {
            $(element).removeClass('show');
          });
        }
      });
    });

    /*************************************
     *        Skill Bar Animations       *
     *************************************/

    gsap.utils.toArray(".skill-item .bar").forEach(function (elem) {
      ScrollTrigger.create({
        trigger: elem,
        onEnter: function () {
          let w = parseInt($(elem).data('width'), 10);
          $(elem).css({ width: w + '%' });
        },
        onEnterBack: function () {
          let w = parseInt($(elem).data('width'), 10);
          $(elem).css({ width: w + '%' });
        },
        onLeave: function () {
          $(elem).css({ width: 0 });
        },
        onLeaveBack: function () {
          $(elem).css({ width: 0 });
        }
      });
    });

    const skillTags = [
      'Javascript', 'CSS', 'HTML', 'Git',
      'Typescript', 'PHP', 'React', 'Vue','API',
      'NodeJS', 'GSAP', 'MySQL', 'AWS', 'Fabric.js',
      'TailwindCSS', 'SCSS', 'ReactJS', 
      'WordPress','E-Commerce', 'Laravel', 'Next.js', 'Vue', 'Nuxt.js'
    ];
    if (window.innerWidth < 768) {
      var tagCloud = TagCloud('.skill-cloud', skillTags, {
        radius: 150,
        maxSpeed: 'fast',
        initSpeed: 'fast',
        direction: 135,
        keep: true
      }); 
    } else {
      var tagCloud = TagCloud('.skill-cloud', skillTags, {
        radius: 300,
        maxSpeed: 'fast',
        initSpeed: 'fast',
        direction: 135,
        keep: true
      }); 
    }

    
    /*************************************
     *        Portfolio Animations       *
     *************************************/
    $('.portfolio-item').each(function(index, element) {
      element.addEventListener('mousemove', (e) => {
        const centerPosition = {
          x: element.getBoundingClientRect().left + element.offsetWidth / 2,
          y: element.getBoundingClientRect().top + element.offsetHeight / 2,
        };
        let angleY = Math.atan2(e.clientX - centerPosition.x, 45) * (15 / Math.PI);
        let angleX = (-1) * Math.atan2(e.clientY - centerPosition.y, 45) * (15 / Math.PI);
        gsap.to(element, {
          rotationY: `${angleY}deg`,
          rotationX: `${angleX}deg`,
        });
      });
      
      element.addEventListener('mouseleave', (e) => {
        gsap.to(element, {
          rotationY: `0deg`,
          rotationX: `0deg`,
          ease: 'strong.inOut',
        });
      });
    });

    $('.testimonial-items').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      infinite: false,
      arrows: false,
      dots: true,
    });
  });

  $('.hamburger').on('click', function () {
    $(this).toggleClass('open');
    $('.header-menu').toggleClass('open');
  });

})(jQuery);
