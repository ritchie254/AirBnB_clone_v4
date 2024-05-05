const $ = window.$;
$(function () {
  const dict = {};
  $('.amenities input[type="checkbox"]').on('change', function () {
    const amenityId = $(this).data('id');
    const amenityName = $(this).data('name');
    if (this.checked) {
      dict[amenityName] = amenityId;
    } else {
      delete dict[amenityName];
    }
    const checked = Object.keys(dict).join(', ');
    $('.amenities h4').text(checked);
  });
});
