$.validator.addMethod(
  'email',
  function (value) {
    return value.match(/^[a-zA-Z0-9_\.%\+\-]+@[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,}$/)
  },
  '',
)

$.validator.addMethod(
  'phone',
  function (value) {
    return value.match(/\+\d{1} \([9]\d\d\) \d{3} \d{4}/g)
  },
  '',
)

$('form').each(function () {
  $(this).validate({
    errorPlacement: function () {},
    rules: {
      name: {
        required: true,
      },
      city: {
        required: true,
      },
      investammount: {
        required: true,
      },
      answer: {
        required: true,
      },
      email: {
        email: true,
        required: true,
      },
      phone: {
        phone: true,
        required: true,
      },
    },
  })
})