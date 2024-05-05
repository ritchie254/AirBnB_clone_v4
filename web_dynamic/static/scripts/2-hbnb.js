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

  $.get('http://0.0.0.0:5001/api/v1/status/', function (data, status) {
    if (status === 'success') {
      if (data.status === 'OK') {
        $('div#api_status').addClass('available');
      } else {
        $('div#api_status').removeClass('available');
      }
    }
  });
});
