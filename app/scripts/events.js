let seller = 'John'
let good_name = ''
let description = 'abc'
let value = '10'

$(function () {
  var name = $('#name'),
    addr = $('#address'),
    allFields = $([]).add(name).add(addr),
    tips = $('.validateTips')

  function updateTips (t) {
    tips
      .text(t)
      .addClass('ui-state-highlight')
    setTimeout(function () {
      tips.removeClass('ui-state-highlight', 1500)
    }, 500)
  }

  $('#login-form').dialog({
    autoOpen: false,
    height: 300,
    width: 350,
    modal: true,
    buttons: {
      'Login': function () {
        var name  = $("#name").val()
        var addr = $("#address").val()
        App.log_in(name, addr)
        seller = name
        allFields.removeClass('ui-state-error')
        $(this).dialog('close')
      },
      Cancel: function () {
        $(this).dialog('close')
      }
    },
    close: function () {
      allFields.val('').removeClass('ui-state-error')
    }
  })

  $('#login')
    .button()
    .click(function () {
      $('#login-form').dialog('open')
    })
})

$(function () {
  var name = $('#new_good_name'),
    des = $('#new_good_des'),
    val = $('#value'),
    allFields = $([]).add(name).add(des).add(val),
    tips = $('.validateTips')

  function updateTips (t) {
    tips
      .text(t)
      .addClass('ui-state-highlight')
    setTimeout(function () {
      tips.removeClass('ui-state-highlight', 1500)
    }, 500)
  }

  function checkLength (o, n, min, max) {
    if (o.val().length > max || o.val().length < min) {
      o.addClass('ui-state-error')
      updateTips('' + n + ' 的长度必须在 ' +
        min + ' 和 ' + max + ' 之间。')
      return false
    } else {
      return true
    }
  }

  function checkRegexp (o, regexp, n) {
    if (!(regexp.test(o))) {
      o.addClass('ui-state-error')
      updateTips(n)
      return false
    } else {
      return true
    }
  }

  $('#dialog-form').dialog({
    autoOpen: false,
    height: 300,
    width: 350,
    modal: true,
    buttons: {
      'add a trade': function () {
        var bValid = true
        // bValid = bValid && checkRegexp(value, /^([0-9])+$/, '价格只允许: 0-9'  )
        allFields.removeClass('ui-state-error')
        if (!bValid) {
          return;
        }
        $('#trades tbody').append('<tr>' +
          '<td>' + seller + '</td>' +
          '<td>' + name.val() + '</td>' +
          '<td>' + des.val() + '</td>' +
          '<td>' + val.val() + '</td>' +
          '<td>For sale</td>' +
          '</tr>')

        $('#seller_trades tbody').append('<tr>' +
          '<td>' + seller + '</td>' +
          '<td>' + name.val() + '</td>' +
          '<td>' + des.val() + '</td>' +
          '<td>' + val.val() + '</td>' +
          '<td>For sale</td>' +
          '</tr>')
        $(this).dialog('close')
        App.start_a_trade(name.val(), des.val(), val.val())
        load_table()
        /*
        bValid = bValid && checkLength( name, 'username', 3, 16 );
        bValid = bValid && checkLength( email, 'email', 6, 80 );
        bValid = bValid && checkLength( password, 'password', 5, 16 );

        bValid = bValid && checkRegexp( name, /^[a-z]([0-9a-z_])+$/i, '用户名必须由 a-z、0-9、下划线组成，且必须以字母开头。' );
        // From jquery.validate.js (by joern), contributed by Scott Gonzalez: http://projects.scottsplayground.com/email_address_validation/
        bValid = bValid && checkRegexp( email, /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i, 'eg. ui@jquery.com' );
        bValid = bValid && checkRegexp( password, /^([0-9a-zA-Z])+$/, '密码字段只允许： a-z 0-9' );

        if ( bValid ) {
          $( '#users tbody' ).append( '<tr>' +
            '<td>' + name.val() + '</td>' +
            '<td>' + email.val() + '</td>' +
            '<td>' + password.val() + '</td>' +
            '</tr>' );
          $( this ).dialog( 'close' );
        }
        */
      },
      Cancel: function () {
        $(this).dialog('close')
      }
    },
    close: function () {
      allFields.val('').removeClass('ui-state-error')
    }
  })

  $('#add_trade')
    .button()
    .click(function () {
      $('#dialog-form').dialog('open')
    })
})

$(function () {

  var show_seller = $('#show-seller'),
    show_des = $('#show-des'),
    show_value = $('#show-value')
  var allFields = $([]).add(show_seller).add(show_des).add(show_value),
    tips = $('.validateTips')

  function updateTips (t) {
    tips
      .text(t)
      .addClass('ui-state-highlight')
    setTimeout(function () {
      tips.removeClass('ui-state-highlight', 1500)
    }, 500)
  }

  $('#trade-form').dialog({
    autoOpen: false,
    height: 300,
    width: 350,
    modal: true,
    buttons: {
      'purchase': function () {

        allFields.removeClass('ui-state-error')
        $(this).dialog('close')
      },
      'exchange': function () {
        $('#exchange-form').dialog('open')
        allFields.removeClass('ui-state-error')
        $(this).dialog('close')
      },
      Cancel: function () {
        $(this).dialog('close')
      }
    },
    close: function () {
      allFields.val('').removeClass('ui-state-error')
    }
  })

  // $( '#login' )
  //   .button()
  //   .click(function() {
  //     $( '#trade-form' ).dialog( 'open' );
  //   });
})

$(function () {

  var exchange_good = $('#exchange_good_name'),
    exchange_des = $('#exchange_good_des'),
    exchange_value = $('#exchange_value')
  var allFields = $([]).add(exchange_good).add(exchange_des).add(exchange_value),
    tips = $('.validateTips')

  function updateTips (t) {
    tips
      .text(t)
      .addClass('ui-state-highlight')
    setTimeout(function () {
      tips.removeClass('ui-state-highlight', 1500)
    }, 500)
  }

  $('#exchange-form').dialog({
    autoOpen: false,
    height: 300,
    width: 350,
    modal: true,
    buttons: {
      'want to exchange': function () {
        // something to do
        allFields.removeClass('ui-state-error')
        $(this).dialog('close')
      },
      Cancel: function () {
        $(this).dialog('close')
      }
    },
    close: function () {
      allFields.val('').removeClass('ui-state-error')
    }
  })

  // $( '#login' )
  //   .button()
  //   .click(function() {
  //     $( '#trade-form' ).dialog( 'open' );
  //   });
})

function load_table () {
  let table = document.getElementById('trades')
  let trs = table.getElementsByTagName('tr')
  for (let i = 1; i < trs.length; i++) {
    let tr = trs[i]
    tr.onmouseover = function () {
      this.style.background = '#fff000'
    }
    tr.onmouseout = function () {
      this.style.background = '#ffffe0'
    }
    tr.onclick = function () {
      seller = tr.cells[0].innerHTML
      good_name = tr.cells[1].innerHTML
      description = tr.cells[2].innerHTML
      value = tr.cells[3].innerHTML
      // alert(seller + description +value)
      document.getElementById('show-seller').innerHTML = seller
      document.getElementById('good-name').innerHTML = good_name
      document.getElementById('show-des').innerHTML = description
      document.getElementById('show-value').innerHTML = value
      $('#trade-form').dialog('open')
    }
  }
}
