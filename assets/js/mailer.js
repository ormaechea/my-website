$(document).ready(function(){

  // Get the form.
  var form = $('#ajax-contact');

  // Get the messages div.
  var formMessages = $('#form-messages');

  // Set up an event listener for the contact form.
  $(form).submit(function(e) {
    // Stop the browser from submitting the form.
    e.preventDefault();

    // Serialize the form data.
    var formData = $(form).serialize();

    // Submit the form using AJAX.
    $.ajax({
      type: 'POST',
      // url: $(form).attr('action'),
      url: 'assets/php/recaptcha.php',
      data: formData

     }).done(function(response){
        console.log(response)
        if(response == 'true'){
          // Set the message text.
            if ( $('#name').val() != "" && $('#email').val() != "" && $('#message').val() != ""){
              $.ajax({
                type: 'POST',
                url: $(form).attr('action'),
                data: formData
                }).done(function(response){
                  $(formMessages).text(response);
                  // Set the message text color.
                   $('#form-messages').removeClass('error');
                   $('#form-messages').addClass('success');
                  // Clear the form.
                  $('#name').val('');
                  $('#email').val('');
                  $('#message').val('');
                });
            }else{
               $('#form-messages').text('Por favor rellene el formulario completo.');
            }

        }else{
          $('#form-messages').removeClass('success');
          $('#form-messages').addClass('error');
          $('#form-messages').text('Por favor complete el Captcha correctamente.');

        }

     });




  });
  });
    // .fail(function(data) {
    //   // Make sure that the formMessages div has the 'error' class.
    //   $(formMessages).removeClass('success');
    //   $(formMessages).addClass('error');

    //   // Set the message text.
    //   if (data.responseText !== '') {
    //     $(formMessages).text(data.responseText);
    //   } else {
    //     $(formMessages).text('Oops! An error occured and your message could not be sent.');
    //   }
    // });

