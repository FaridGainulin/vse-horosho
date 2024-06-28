function setInitialFeedbackStore() {
  $.feedback_store = {
    phone: '',
    email: '',
    name: '',
    city: '',
    timezone: (-1 * new Date().getTimezoneOffset()) / 60,
    utm_medium: $.query.get('utm_medium') || '',
    utm_placement: $.query.get('utm_placement') || '',
    utm_source: $.query.get('utm_source') || '',
    utm_term: $.query.get('utm_term') || '',
    utm_content: $.query.get('utm_content') || '',
    utm_campaign: $.query.get('utm_campaign') || '',
    utm_campaign_name: $.query.get('utm_campaign_name') || '',
    utm_device: $.query.get('utm_device') || '',
    utm_region_name: $.query.get('utm_region_name') || '',
    yclid: $.query.get('yclid') || '',
  }

  ymaps.ready(function () {
    ymaps.geolocation
      .get({ provider: 'yandex', autoReverseGeocode: true })
      .then(function (result) {
        $.feedback_store.city =
          result.geoObjects.get(0).properties.get('metaDataProperty')
            .GeocoderMetaData.Address.formatted || ''
      })
  })
}

function createFormData(data) {
  var formData = new FormData()

  Object.entries(data).forEach(([key, value]) => {
    if (value) {
      formData.append(key, value)
    }
  })

  return formData
}

function initFeedbackForm() {
  const $forms = $('[data-feedback-form]')

  $forms.on('submit', function (event) {
    event.preventDefault()

    if ($(this).valid()) {
      var fields = $(this)
        .serializeArray()
        .reduce(function (acc, current) {
          return $.extend(acc, { [current.name]: current.value })
        }, {})

      if (fields.name) {
        localStorage.setItem('lead_name', fields.name)
      }

      if (fields.city) {
        localStorage.setItem('city', fields.city)
      }

      var data = $.extend($.feedback_store, fields)
      var formData = createFormData(data)

      $.ajax('php/formProcessor.php', {
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        dataType: 'json',
      }).always(function () {
        window.location = 'thanks.html'
      })
    }
  })
}

$(document).ready(function () {
  initFeedbackForm()
  setInitialFeedbackStore()
})
