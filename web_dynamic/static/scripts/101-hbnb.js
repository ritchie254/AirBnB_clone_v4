const $ = window.$;
$(function () {
  $('input[type="checkbox"]').prop("checked", false);
  const stateDict = {};
  const cityDict = {};
  const amenityDict = {};

  function checkboxes(input, h4, obj) {
    input.on('change', function () {
      const inputId = $(this).data('id');
      const inputName = $(this).data('name');
      if (this.checked) {
        obj[inputId] = inputName;
      } else {
        delete obj[inputId];
      }
      const checked = Object.values(obj).join(', ');
      h4.text(checked);
    });
  }
  checkboxes($('.amenities input[type="checkbox"]'), $('.amenities h4'), amenityDict);
  checkboxes($('.locations input[type="checkbox"]'), $('.locations h4'), stateDict);
  checkboxes($('.locations input[type="checkbox"]'), $('.locations h4'), cityDict);

  $.get('http://0.0.0.0:5001/api/v1/status/', function (data, status) {
    if (status === 'success') {
      if (data.status === 'OK') {
        $('div#api_status').addClass('available');
      } else {
        $('div#api_status').removeClass('available');
      }
    }
  });

  function ajaxPost(data) {
    let places;
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      data: JSON.stringify(data),
      contentType: 'application/json',
      success: function (data) {
		places = data;
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
          $.get(`http://0.0.0.0:5001/api/v1/places/${place.id}/reviews`, function(data, status) {
            for (let j = 0; j < data.length; j++) {
              let review = data[j];
              let reviewData = `<div class='reviews'>
			      <p>${review.text}</p>
			    </div>`;
            $('.places article').append(reviewData);
          }});
        }
      }
    });
  }

  ajaxPost({});

  $('.filters > button').on('click', function() {
    $('.places').empty();
    ajaxPost({'amenities': Object.keys(amenityDict), 'states': Object.keys(stateDict), 'cities': Object.keys(cityDict)});
  });
});
