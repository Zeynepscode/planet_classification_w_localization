$(document).ready(function () {
    // Init
    $('.image-section-model').hide();
    $('.loadermodel').hide();
    $('#resultmodel').hide();
    $('#show_image').hide();
    
    // Upload Preview
    function readURLResNet50(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#imagePreview').css('background-image', 'url(' + e.target.result + ')');
                $('#imagePreview').hide();
                $('#imagePreview').fadeIn(650);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }

  function changeImage(filepath) {
    var img = "/images/" + filepath;
    document.getElementById("test").src = img;
    $('#imagePreview').hide()
    $('#showimage').show();
  }
 
    var filePath = ''
     $("#upload-imageload").change(function () {
        $('#showimage').hide()
        document.getElementById("test").src = '' 
        filePath = $('#upload-imageload').val();
        filePath = filePath.split("\\")[2];
        filePath = filePath.replace(' ', '_')
        filePath = filePath.replace('(', '')
        filePath = filePath.replace(')','')
        $('.image-section-model').show();
        $('#btn-predict-ddnmodel').show();
        $('#resultmodel').text('');
        $('#resultmodel').hide();
        readURLResNet50(this);
    });

    // Predict
    $('#btn-predict-ddnmodel').click(function () {
        var form_data = new FormData($('#upload-file1')[0]);

        // Show loading animation
        $(this).hide();
        $('.loadermodel').show();

        

        // Make prediction by calling api /predictdnnmodel
        $.ajax({
            type: 'POST',
            url: '/predictdnnmodel',
            data: form_data,
            contentType: false,
            cache: false,
            processData: false,
            async: true,
            success: function (data) {
                // Get and display the result
                $('.loadermodel').hide();
                $('#resultmodel').fadeIn(600);
                $('#resultmodel').text(' Result:  ' + data);
              console.log('ResNet50 Success!');

              changeImage(filePath);
              //$('#showimage').show();
              //$('#imagePreview').hide()
            },
        });
        //$('#imagePreview').hide()
        //$('#showimage').show()

    });

});
