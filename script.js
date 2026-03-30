// === INITIAL SETUP ===
var initialSlide = $('.slides-container [data-order="1"]');
var initialSelected = $('.slide-navigation__txt [data-order="1"]');
var mq_medium = window.matchMedia('(min-width: 860px)');
var mq_big = window.matchMedia('(min-width: 1200px)');
var currentSlide = 1;

// === ACTIVATE SLIDE ===
function activate_slide(order) {
  var unactiveSlide = $('.slide.active');
  var activeSlide = $('.slides-container [data-order="' + order + '"]');

  if (!activeSlide.hasClass('active')) {
    slide_in(activeSlide);
    slide_out(unactiveSlide);
  }
}

// === SLIDE IN / OUT ANIMATION ===
function slide_in(slide) {
  slide.addClass('active');
  animation_in(slide);
  TweenMax.to(slide, 1, { autoAlpha: 1 });
}

function slide_out(slide) {
  slide.css('z-index', '2');
  slide.removeClass('active');
  TweenMax.to(slide, 1, { autoAlpha: 0, onComplete: function() { slide.css('z-index', '1'); } });
  animation_out(slide);
}

// === IN / OUT ANIMATIONS ===
function animation_in(slide) {
  var title = slide.find('h1');
  var subtitle = slide.find('h2');
  var text = slide.find('p');
  var button = slide.find('button');
  var image = slide.find('img');

  TweenMax.fromTo(title, 0.6, { autoAlpha: 0, x: 100 }, { autoAlpha: 0.6, x: 0, ease: Power2.easeOut });
  TweenMax.fromTo(subtitle, 0.5, { autoAlpha: 0, x: -200 }, { autoAlpha: 1, x: 0, ease: Power2.easeOut });
  TweenMax.fromTo(text, 0.8, { autoAlpha: 0, x: 50 }, { autoAlpha: 1, x: 0, ease: Power2.easeOut });
  TweenMax.fromTo(button, 0.5, { autoAlpha: 0 }, { autoAlpha: 1 });
  TweenMax.to(image, 0, { autoAlpha: 1, scale: 1 });
}

function animation_out(slide) {
  var title = slide.find('h1');
  var subtitle = slide.find('h2');
  var text = slide.find('p');
  var button = slide.find('button');
  var image = slide.find('img');

  TweenMax.to(title, 0.6, { autoAlpha: 0, x: 0 });
  TweenMax.to(subtitle, 0.5, { autoAlpha: 0, x: 200 });
  TweenMax.to(text, 0.5, { autoAlpha: 0 });
  TweenMax.to(button, 0.5, { autoAlpha: 0 });
  TweenMax.to(image, 1, { scale: 1.1 });
}

// === STAGGER NAVIGATION SQUARES ===
function stagger_squares(order, current) {
  var mq = 0.7;
  var squares = $('.slide-navigation__squares .square');
  var staggerTime = -0.12;

  if (order < current) staggerTime *= -1;
  if (mq_medium.matches) mq = 1;
  if (mq_big.matches) mq = 1.3;

  var moveY = (order - 1) * (15 * mq);
  TweenMax.staggerTo(squares, 0.1, { y: moveY }, staggerTime);
}

// === SLIDE NAVIGATION CLICK ===
$('.slide-navigation__txt span').on('click', function () {
  var _this = $(this);
  var order = _this.data('order');
  var spans = $('.slide-navigation__txt span');
  var current = $('.slide.active').data('order');

  spans.removeClass('active');
  _this.addClass('active');

  // Direct jump to clicked slide
  activate_slide(order);
  stagger_squares(order, current);

  // Update currentSlide so autoSlide continues properly
  currentSlide = order;
});

// === DOCUMENT READY ===
$(document).ready(function () {
  initialSlide.addClass('active');
  initialSelected.addClass('active');
  TweenMax.to(initialSlide, 0.5, { autoAlpha: 1 });

  var totalSlides = $('.slides-container .slide').length;

  // Auto-slide every 4 seconds
  setInterval(function autoSlide() {
    var nextSlide = parseInt(currentSlide) + 1;
    if (nextSlide > totalSlides) nextSlide = 1;

    $('.slide-navigation__txt span[data-order="' + nextSlide + '"]').click();
  }, 4000);
});



// Hamburger Menu Toggle
document.getElementById('hamburger').addEventListener('click', function () {
  const navLinks = document.querySelector('.nav-links');
  navLinks.classList.toggle('show');
});
