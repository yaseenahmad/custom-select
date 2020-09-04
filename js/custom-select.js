! function ($) {
  function CustomSelect(alias, options) {
    return this instanceof CustomSelect ? ($.isPlainObject(alias) ? options = alias : (options = options || {},
        options.alias = alias), this.el = void 0, this.opts = $.extend(!0, {}, this.defaults, options),
      this.events = {}, this.dataAttribute = "data-placeholder", void this.resolveAlias(this.opts.alias, options, this.opts)) : new CustomSelect(alias, options);
  }
  return CustomSelect.prototype = {}, window.CustomSelect = CustomSelect, CustomSelect;

}(jQuery),
function ($, CustomSelect) {
  return void 0 === $.fn.customSelect && ($.fn.customSelect = function (options, fn) {
    var input = this[0];
    var _options = options ? options : {};
    $(_options.after ? _options.after : input).next('.custom--select').remove();

    genrateSelect(_options);

    function genrateSelect(opt) {
      $(input).hide();

      $(opt.after ? opt.after : input).after('<div class="custom--select"><div class="search-input"><div class="selected"></div><input type="text"></div><ul></ul></div>');

      $(input).find('option').each(function (index, item) {
        var data = $(this).data();
        var html = opt.html;
        var keys = Object.keys($(this).data());
        for (i = 0; i < keys.length; i++) {
          html = html.replace('#' + keys[i] + '#', data[keys[i]]);
        }
        var selected = $(this).attr('selected') ? 'selected' : '';
        $(opt.after ? opt.after : input).next('.custom--select').find('ul').append('<li class="' + selected + '" data-valselected="' + data.valselected + '">' + html + '</li>');
      });

      $(input).find('option[selected=selected]').each(function (index, item) {
        var data = $(this).data();
        var html = opt.appendHtml ? opt.appendHtml : opt.html;
        var keys = Object.keys($(this).data());
        for (i = 0; i < keys.length; i++) {
          html = html.replace('#' + keys[i] + '#', data[keys[i]]);
        }
        $(opt.after ? opt.after : input).next('.custom--select').find('.search-input .selected').append('<div data-valselected="' + data.valselected + '">' + html + '</div>');
      });

      var $this;
      $(opt.after ? opt.after : input).next('.custom--select').find('input').focus(function () {
        $this = this;
        $($this).parents('.custom--select').find('.search-input').addClass('focus');
        $($this).parents('.custom--select').find('ul').show();
        if (opt.onfocus !== undefined) {
          opt.onfocus($this);
        }
      });
      $('body').on('click', function (e) {
        if (!$(e.target).closest('.custom--select').length) {
          $($this).parents('.custom--select').find('ul').hide();
          $($this).parents('.custom--select').find('.search-input').removeClass('focus');
          if (opt.onfocusout !== undefined) {
            opt.onfocusout($this);
          }
        }
      });
    }

    afterRenderClick();

    function afterRenderClick() {
      $(_options.after ? _options.after : input).next('.custom--select').find('ul li').click(function () {

        if ($(this).hasClass('selected')) {
          return false;
        }

        if (options.onSelect !== undefined) {
          options.onSelect(this);
        }

        var valselected = $(this).attr('data-valselected');
        $(this).addClass('selected');

        $(input).find('option').each(function (index, item) {
          if ($(item).attr('data-valselected') === valselected) {
            $(item).attr('selected', 'selected');
          }
        });

        var lastSelected = $(input).find('option[data-valselected=' + valselected + ']');
        var data = $(lastSelected).data();
        var html = _options.appendHtml ? _options.appendHtml : _options.html;
        var keys = Object.keys($(lastSelected).data());
        for (i = 0; i < keys.length; i++) {
          html = html.replace('#' + keys[i] + '#', data[keys[i]]);
        }

        if ($(input).attr('multiple')) {
          $(_options.after ? _options.after : input).next('.custom--select').find('.search-input .selected').append('<div data-valselected="' + data.valselected + '">' + html + '</div>');
        } else {
          $(_options.after ? _options.after : input).next('.custom--select').find('.search-input .selected').html('<div data-valselected="' + data.valselected + '">' + html + '</div>');
        }



      });
    }

    var backspace = false;
    $(_options.after ? _options.after : input).next('.custom--select').find('.search-input input').keyup(function (e) {
      if ($(this).val() !== '') {
        backspace = false;
      }
      if ($(this).val() === '' && e.keyCode == 8) {
        if (backspace) {
          var selected = $(this).parents('.custom--select').find('.selected > div[data-valselected]');
          var selectedval = $(selected[selected.length - 1]).attr('data-valselected');
          $(this).parents('.custom--select').prev('select').find('option[data-valselected="' + selectedval + '"]').removeAttr('selected');
          $(selected[selected.length - 1]).remove();
        }
        backspace = true;
      }
    })


    $(_options.after ? _options.after : input).next('.custom--select').find('.search-input input').on('keyup', function (e) {
      if (options.onSearch !== undefined) {
        options.onSearch(e);
      }
    });

    return {
      update: function (data) {
        var valselectedArry = []
        $(_options.after ? _options.after : input).next('.custom--select').find('.search-input .selected div').each(function (index, item) {
          valselectedArry.push($(this).attr('data-valselected'));
        });

        $(input).find('option').each(function (index, item) {
          var valselected = $(item).attr('data-valselected');
          if (valselectedArry.indexOf(valselected) === -1) {
            $(this).remove();
          }
        });

        $(_options.after ? _options.after : input).next('.custom--select').find('ul').html('');

        for (i = 0; i < data.length; i++) {
          var dataAttribute = '';
          var keys = Object.keys(data[i]);
          for (f = 0; f < keys.length; f++) {
            if (keys[f] !== 'value') {
              dataAttribute += ' data-' + keys[f] + '=' + '"' + data[i][keys[f]] + '"';
            } else {
              dataAttribute += ' ' + keys[f] + '=' + '"' + data[i][keys[f]] + '"';
            }
          }
          var option = ''
          if (valselectedArry.indexOf(data[i].value) === -1) {
            option = '<option ' + dataAttribute + '>' + data[i].value + '</option>';
          }
          $(input).append(option);
        }

        $(input).find('option').each(function (index, item) {
          var data = $(this).data();
          var html = _options.html;
          var keys = Object.keys($(this).data());
          for (i = 0; i < keys.length; i++) {
            html = html.replace('#' + keys[i] + '#', data[keys[i]]);
          }

          if (valselectedArry.indexOf(data.valselected.toString()) === -1) {
            $('.custom--select ul').append('<li data-valselected="' + data.valselected + '">' + html + '</li>');
          }
        });
        afterRenderClick();
      }
    }

  }), $.fn.customSelect;
}(jQuery, CustomSelect);