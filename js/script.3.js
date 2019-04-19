(function () {
    var d = new Date();
    var date = d.getDate();
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var day = days[d.getDay()];
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October",
        "November", "December"
    ];
    var month = months[d.getMonth()];
    var fullyear = d.getFullYear();

    var fulldate = day + ", " + month + ' ' + date + ", " + fullyear;
    document.getElementById("date").innerHTML = fulldate;


    var regForm = document.getElementById('regForm');

    regForm = validationSetup(regForm);

    regForm.addEventListener('onValidationFaild', function () {
        Captha()
        $("#ModalTitle").html('Error Message');

        $('#ord-msg').html('Please fill all the details.');
        $('#ord-msg , #ModalTitle').addClass('color-red');

        $('#order').modal('show');

    });

    regForm.addEventListener('onValidationSuccess', function () {

        $("#loader").show();
        var paymentType = $("input[name='payment_type']:checked").val();

        var price = $("input[name='price']:checked").val();

        var product
        if (price == 999) {
            product = '1 box'
        } else if (price == 2699) {
            product = '3 box'
        } else {
            product = '6 box'
        }
        var dataToSend = {
            "firstName": $('#fname').val(),
            "lastName": $('#lname').val(),
            "email": $('#email').val(),
            "phone": $('#phone').val(),
            "address": $('#adderess').val(),
            "city": $('#city').val(),
            "pincode": $('#pincode').val(),
            "state": $('#state').val(),
            "product": product,
            "price": price,
            "paymentType": paymentType

        };

        if (Captha()) {
            $('#fieldForm').prop('disabled', true);
            $.post({
                'url': "https://mojogamezone.com/development/riccha_dev/HairProduct/setFormData.php",
                'data': JSON.stringify(dataToSend),
                'processData': false,
                'success': function (res, status) {
                    var parse_data = JSON.parse(res);
                    if (parse_data.data) {
                        pymentSuccess(parse_data.data);
                    }
                    $('#order-msg').show();
                    $('#payment_type').hide();
                },
                'complete': function () {
                    $('#fieldForm').prop('disabled', false);
                    regForm.reset();
                    grecaptcha.reset();
                    
                }
            });
        }
    });
    $('#payment_type , #order-msg').hide();
})();

function pymentSuccess(id) {
    var dataToSend = {
        'id': id
    };

    $.post({
        'url': "https://mojogamezone.com/development/riccha_dev/HairProduct/successProductOrder.php",
        'data': JSON.stringify(dataToSend),
        'processData': false,
        'success': function (res, status) {
            var response = JSON.parse(res);

            hitVnativeApi(response.data.order_id, response.data.price)

            $("#ModalTitle").html('Order details');
            $('#ord-msg').html('Thank You for Placing your order, your order ID is' + '  "' + response.data.order_id + '" , we have also sent a mail to your mail ID.' + ' ');
            $('#ord-msg , #ModalTitle').addClass('color-dark-green').removeClass('color-red');

            $('#order').modal('show');
            $('#order-msg').hide();
        },
        'complete' : function(){
            $("#loader").hide();
        }
    });
}


function hitVnativeApi(ordedrId, price) {
    if (price) {
        price = (parseInt(price, 10) / 100) * 15;
    }
    // var url = 'https://mobpro.vnative.co/pixel?adid=5cb03404b6920d3de83be07b&txn_id=' + ordedrId + '&sale_amount=' + price;
    var href = new URL(window.location.href);
    
    var CLICK_ID = href.searchParams.get('cid');
    if(!CLICK_ID){
        return;
    }
    var url = 'https://track.vnative.com/acquisition?click_id=' + CLICK_ID + '&security_token=1b7781812bd841125ccf&sale_amount=' + price + '&currency=INR';
    //var url = 'https://mobpro.vnative.co/pixel?adid=5cb03404b6920d3de83be07b&txn_id=' + ordedrId + '&sale_amount=' + price;
    $.get(url);
}


function getPhoneNumber() {
    var phoneNumber = $("#phone").val()
    var length = phoneNumber.length;
    if (length >= 10 && length <= 16) {
        if (isTel(phoneNumber)) {
            var dataToSend = {

                "firstName": $('#fname').val(),
                "lastName": $('#lname').val(),
                "email": $('#email').val(),
                "phone": $('#phone').val(),
                "address": $('#adderess').val(),
                "city": $('#city').val(),
                "pincode": $('#pincode').val(),
                "state": $('#state').val(),

            };
            $.post({
                'url': "https://mojogamezone.com/development/riccha_dev/HairProduct/setUserBase.php",
                'data': JSON.stringify(dataToSend),
                'processData': false,
                'success': function (data, status) {

                }
            })
        }
    }
}

function getEmail() {
    var email = $("#email").val()
    if (isEmail(email)) {
        var dataToSend = {
            "firstName": $('#fname').val(),
            "lastName": $('#lname').val(),
            "email": $('#email').val(),
            "phone": $('#phone').val(),
            "address": $('#adderess').val(),
            "city": $('#city').val(),
            "pincode": $('#pincode').val(),
            "state": $('#state').val(),
        };
        $.post({
            'url': "https://mojogamezone.com/development/riccha_dev/HairProduct/setUserBase.php",
            'data': JSON.stringify(dataToSend),
            'processData': false,
            'success': function (data, status) { }
        })

    }
}


function Captha() {

    var response = grecaptcha.getResponse();
    if (response.length == 0) {
        document.getElementById('g-recaptcha-error').innerHTML =
            '<span style="width: 100%;margin-top: 0.25rem;font-size: 80%;color: #ef7d87;">This field is required.</span>';
        return false;
    }
    return true;
}

function verifyCaptcha() {

    document.getElementById('g-recaptcha-error').innerHTML = '';
}

(
    function () {
        var str = '<img src="assets/images/icon/star.png" alt="">';
        $('.5star').html(str.repeat(5));
        $('.4star').html(str.repeat(4));
        $('.3star').html(str.repeat(3));
        $('.2star').html(str.repeat(2));
        $('.1star').html(str.repeat(1));
    }
)();




(function () {

    $("input[name='payment_type']").change(function () {
        if (this.value == 'Paytm') {
            $('#payment_type').show();
        } else {
            $('#payment_type').hide();
        }
    });
}())