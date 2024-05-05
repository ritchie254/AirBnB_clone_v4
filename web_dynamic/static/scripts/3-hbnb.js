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

  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    data: '{}',
    contentType: 'application/json',
    success: function (data) {
      for (let i = 0; i < data.length; i++) {
        let place = data[i];
        console.log(place);
        let placeData = `<article>
	        <div class="title_box">
	          <h2>${place.name}</h2>
	          <div class="price_by_night">$${place.price_by_night}</div>
	        </div>
	        <div class="information">
	          <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
                <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
                <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
	          </div>
            <div class="description">
	          ${place.description}
            </div>
	      </article>`;
        $('.places').append(placeData);
      }
    }
  });
});
