console.log('JS loaded');

$(() => {
  $('.answers-container').slick({
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    infinite: true,
    prevArrow: false,
    nextArrow: false,
    dots: true
  });
});
