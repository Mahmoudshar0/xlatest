document.querySelectorAll('.btn-number').forEach(function(button) {
    button.addEventListener('click', function(e) {
        e.preventDefault();

        var fieldName = this.getAttribute('data-field');
        var type = this.getAttribute('data-type');
        var input = document.querySelector("input[name='" + fieldName + "']");
        var currentVal = parseInt(input.value);

        if (!isNaN(currentVal)) {
            if (type === 'minus') {
                if (currentVal > input.getAttribute('min')) {
                    input.value = currentVal - 1;
                    input.dispatchEvent(new Event('change'));
                }
                if (parseInt(input.value) === parseInt(input.getAttribute('min'))) {
                    this.setAttribute('disabled', true);
                }
            } else if (type === 'plus') {
                if (currentVal < input.getAttribute('max')) {
                    input.value = currentVal + 1;
                    input.dispatchEvent(new Event('change'));
                }
                if (parseInt(input.value) === parseInt(input.getAttribute('max'))) {
                    this.setAttribute('disabled', true);
                }
            }
        } else {
            input.value = 0;
        }
    });
});

document.querySelectorAll('.input-number').forEach(function(input) {
    input.addEventListener('focusin', function() {
        this.setAttribute('data-oldValue', this.value);
    });

    input.addEventListener('change', function() {
        var minValue = parseInt(this.getAttribute('min'));
        var maxValue = parseInt(this.getAttribute('max'));
        var valueCurrent = parseInt(this.value);
        var name = this.getAttribute('name');

        if (valueCurrent >= minValue) {
            document.querySelector(".btn-number[data-type='minus'][data-field='" + name + "']").removeAttribute('disabled');
        } else {
            alert('Sorry, the minimum value was reached');
            this.value = this.getAttribute('data-oldValue');
        }

        if (valueCurrent <= maxValue) {
            document.querySelector(".btn-number[data-type='plus'][data-field='" + name + "']").removeAttribute('disabled');
        } else {
            alert('Sorry, the maximum value was reached');
            this.value = this.getAttribute('data-oldValue');
        }
    });

    input.addEventListener('keydown', function(e) {
        var allowedKeys = [46, 8, 9, 27, 13, 190];
        var ctrlA = e.keyCode === 65 && e.ctrlKey === true;
        var navigationKeys = e.keyCode >= 35 && e.keyCode <= 39;

        if (allowedKeys.includes(e.keyCode) || ctrlA || navigationKeys) {
            return;
        }

        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });
});





var tabsActions = function (element) {
    this.element = $(element);
  
    this.setup = function () {
      if (this.element.length <= 0) {
        return;
      }
      this.init();
      // Update after resize window.
      var resizeId = null;
      $(window).resize(function () {
        clearTimeout(resizeId);
        resizeId = setTimeout(() => {this.init()}, 50);
      }.bind(this));
    };
    
    this.init = function () {
   
      // Add class to overflow items.
      this.actionOverflowItems();
      var tabs_overflow = this.element.find('.overflow-tab');
   
      // Build overflow action tab element.
      if (tabs_overflow.length > 0) {
        if (!this.element.find('.overflow-tab-action').length) {
          var tab_link = $('<a>')
            .addClass('nav-link')
            .attr('href', '#')
            .attr('data-toggle', 'dropdown')
            .text('...')
            .on('click', function (e) {
              e.preventDefault();
              $(this).parents('.nav.nav-tabs').children('.nav-item.overflow-tab').toggle();
            });
  
          var overflow_tab_action = $('<li>')
            .addClass('nav-item')
            .addClass('overflow-tab-action')
            .append(tab_link);
  
          // Add hide to overflow tabs when click on any tab.
          this.element.find('.nav-link').on('click', function (e) {
            $(this).parents('.nav.nav-tabs').children('.nav-item.overflow-tab').hide();
          });
          this.element.append(overflow_tab_action);
        }
        
        this.openOverflowDropdown();
      }
      else {
        this.element.find('.overflow-tab-action').remove();
      }
   };
   
    this.openOverflowDropdown = function () {
      var overflow_sum_height = 0;
      var overflow_first_top = 41;
      
      this.element.find('.overflow-tab').hide();
      // Calc top position of overflow tabs.
      this.element.find('.overflow-tab').each(function () {
        var overflow_item_height = $(this).height() - 1;
        if (overflow_sum_height === 0) {
          $(this).css('top', overflow_first_top + 'px');
          overflow_sum_height += overflow_first_top + overflow_item_height;
        }
        else {
          $(this).css('top', overflow_sum_height + 'px');
          overflow_sum_height += overflow_item_height;
        }
  
      });
    };
  
    this.actionOverflowItems = function () {
      var tabs_limit = this.element.width() - 100;
      var count = 0;
      
      // Calc tans width and add class to any tab that is overflow.
      for (var i = 0; i < this.element.children().length; i += 1) {
        var item = $(this.element.children()[i]);
        if (item.hasClass('overflow-tab-action')) {
          continue;
        }
        
        count += item.width();
        if (count > tabs_limit) {
          item.addClass('overflow-tab');
        }
        else if (count < tabs_limit) {
          item.removeClass('overflow-tab');
          item.show();
        }
      }
    };
  };
  
  var tabsAction = new tabsActions('.layout--tabs .nav-tabs-wrapper .nav-tabs');
  tabsAction.setup();



  