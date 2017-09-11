
var zx_console = function () {

  "use strict"

  var getLayoutColors = function () {
    var colors
    
    colors = ['#D74B4B', '#475F77', '#E5723F', '#777777', '#6685a4', '#E68E8E'] // Slate
    //colors = ['#2980b9', '#7CB268', '#A9A9A9', '#888888', '#74B5E0', '#B3D1A7'] // Belize    
   // colors = ['#6B5C93', '#444444', '#569BAA', '#AFB7C2', '#A89EC2', '#A9CCD3'] // Square
    //colors = ['#e74c3c', '#444444', '#569BAA', '#AFB7C2', '#F2A299', '#A9CBD3'] // Pom
    //colors = ['#3498DB', '#2c3e50', '#569BAA', '#AFB7C2', '#ACCDD5', '#6487AA'] // Royal
    //colors = ['#E5723F', '#67B0DE', '#373737', '#BCBCBC', '#F2BAA2', '#267BAE'] // Carrot

    return colors
  }   

  var isLayoutCollapsed = function () {
    return $('.navbar-toggle').css ('display') == 'block'
  }

  var initFormValidation = function(formId) {
	  
    if ($.fn.parsley) {
      var opt = {
        trigger: 'change',
        messages: {
	      defaultMessage: "不是有效的值.",
	      type: {
	        email:     "邮件格式不合法.",
	        url:       "url 格式不合法.",
	        urlstrict: "url 格式不合法.",
	        number:    "不是一个有效的数字.",
	        digits:    "不是一个有效的数字.",
	        dateIso:   "不是一个有效的时间格式 (YYYY-MM-DD).",
	        alphanum:  "不是一个有效的值 (字母、数字、下划线).",
	        phone:     "不是一个有效的电话号码."
	      },
	      notnull:     "不能为空.",
	      notblank:    "不能为空白.",
	      required:    "这是必填项.",
	      regexp:      "不是有效的值.",
	      min:         "值最小为 %s.",
	      max:         "值最大为 %s.",
	      range:       "取值范围从 %s 到 %s.",
	      minlength:   "长度不能小于 %s.",
	      maxlength:   "长度不能大于 %s.",
	      rangelength: "长度超出范围. 请限制在 %s 到 %s 个字符.",
	      mincheck:    "请至少选择 %s 项.",
	      maxcheck:    "最多选择 %s 项.",
	      rangecheck:  "请选择 %s 到 %s 个选项.",
	      equalto:     "值不相等."
        },
        errors: {
          container: function (element, isRadioOrCheckbox) {
            if (element.parents ('form').is ('.form-horizontal')) {
              return element.parents ("*[class^='col-']")
            }
            return element.parents ('.form-group')
          }
        },
        listeners: {
          onFormSubmit: function (isFormValid, event, ParsleyForm) {
            return false;
          }
        }
      };
      
      if (formId) {
        $((formId.charAt(0) != "#") ? "#" + formId : formId).parsley(opt);
      } else {
        $('.parsley-form').each(function() {
          $(this).parsley(opt);
        });
      }
    }
  }

  var initAccordions = function () {
    $('.accordion-simple, .accordion-panel').each (function (i) {
      var accordion = $(this),
          toggle = accordion.find ('.accordion-toggle'),
          activePanel = accordion.find ('.panel-collapse.in').parent ()

      activePanel.addClass ('is-open')

      if (accordion.is ('.accordion-simple')) {
        toggle.prepend('<i class="fa accordion-caret"></i>')
      }

      toggle.on ('click', function (e) {
        var panel = $(this).parents ('.panel')

        panel.toggleClass ('is-open')
        panel.siblings ().removeClass ('is-open')
      })
    })
  }

  var initTooltips = function () {
    $('.ui-tooltip').tooltip ({ container: 'body' })
    $('.ui-popover').popover ({ container: 'body' })
  }

  var initBackToTop = function () {
    var backToTop = $('<a>', { id: 'back-to-top', href: '#top' }),
        icon = $('<i>', { 'class': 'fa fa-chevron-up' })

    backToTop.appendTo ('body')
    icon.appendTo (backToTop)

    backToTop.hide ()

    $(window).scroll (function () {
      if ($(this).scrollTop () > 150) {
        backToTop.fadeIn ()
      } else {
        backToTop.fadeOut ()
      }
    })

    backToTop.click (function (e) {
      e.preventDefault ()

      $('body, html').animate({
        scrollTop: 0
      }, 600)
    })
  }

  var navEnhancedInit = function () {
    $('.mainnav-menu').find ('> .active').addClass ('is-open')

    $('.mainnav-menu > .dropdown').on ('show.bs.dropdown', function () {
      $(this).addClass ('is-open')
      $(this).siblings ().removeClass ('is-open')
    })
  }

  var navHoverInit = function (config) {
    $('[data-hover="dropdown"]').each (function () {
      var $this = $(this),
          defaults = { delay: { show: 1000, hide: 1000 } },
          $parent = $this.parent (),
          settings = $.extend (defaults, config),
          timeout

      if (!('ontouchstart' in document.documentElement)) {
        $parent.find ('.dropdown-toggle').click (function (e) {
            if (!isLayoutCollapsed ()) {
              e.preventDefault ()
              e.stopPropagation ()
            }
        })
      }

      $parent.mouseenter(function () {
        if (isLayoutCollapsed ()) { return false }

        timeout = setTimeout (function () {
          $parent.addClass ('open')
          $parent.trigger ('show.bs.dropdown')
        }, settings.delay.show)
      })

      $parent.mouseleave(function () {
        if (isLayoutCollapsed ()) { return false }

        clearTimeout (timeout)

        timeout = setTimeout (function () {
          $parent.removeClass ('open keep-open')
          $parent.trigger ('hide.bs.dropdown')
        }, settings.delay.hide)
      })
    })
  }

  var initLightbox = function () {
    if ($.fn.magnificPopup) {
      $('.ui-lightbox').magnificPopup ({
        type: 'image',
        closeOnContentClick: false,
        closeBtnInside: true,
        fixedContentPos: true,
        mainClass: 'mfp-no-margins mfp-with-zoom',
        image: {
          verticalFit: true,
          tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
        }
      })

      $('.ui-lightbox-video, .ui-lightbox-iframe').magnificPopup ({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
      })

      $('.ui-lightbox-gallery').magnificPopup ({
        delegate: 'a',
        type: 'image',
        tLoading: 'Loading image #%curr%...',
        mainClass: 'mfp-img-mobile',
        gallery: {
          enabled: true,
          navigateByImgClick: true,
          preload: [0,1]
        },
        image: {
          tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
          titleSrc: function(item) {
            return item.el.attr('title') + '<small>by Marsel Van Oosten</small>'
          }
        }
      })
    }
  }

  return {    
    navEnhancedInit: navEnhancedInit,
    navHoverInit: navHoverInit,

    initAccordions: initAccordions,   
    initFormValidation: initFormValidation,
    initTooltips: initTooltips,
    initBackToTop: initBackToTop,    
    initLightbox: initLightbox,
    isLayoutCollapsed: isLayoutCollapsed,

    layoutColors: getLayoutColors(),
    
    /**
     * message hint
     */
    growl: function(options) {
        var opt = $.extend({position: 'top-right', lifetime: 6000, css:{zIndex : 10000}}, options);
        $.msgGrowl(opt);
    }
  }

}()