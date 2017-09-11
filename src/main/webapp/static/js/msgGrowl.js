(function($) {
	$.msgGrowl = function(config) {
		
		var defaults, options, container, msgGrowl, content, title, text, close;

		defaults = {
			type: '',
			title: '',
			text: '',
			html: '', // show content in html		add by xuzhh at 2014-11-7 15:34:03
			lifetime: 6500,
			sticky: false,
			position: 'bottom-right',
			closeTrigger: true,
			onOpen: function (growl, options) {},
			onClose: function (growl, options) {},
			css : ''//add by vince at 2014-5-16 15:20:25
		};
		
		options = $.extend(defaults, config);
		
		container = $('.msgGrowl-container.' + options.position);
		
		if (!container.length) {
			container = $('<div>', {
				'class': 'msgGrowl-container ' + options.position
			}).appendTo ('body');
		}
		
		//add by vince at 2014-5-16 15:20:25	begin
		if(options.css && (typeof options.css == "object")){
			try{
				container.css(options.css)
			}catch(e){
			}
		}
		//add by vince at 2014-5-16 15:20:25	end
		
		msgGrowl = $('<div>', {
			'class': 'msgGrowl ' + options.type
		});
			
		content = $('<div>', {
			'class': 'msgGrowl-content'
		}).appendTo (msgGrowl);	
		
		// modify by xuzhh at 2014-11-7 15:34:03		begin
		var obj = {};
		if (options.html) {
			obj.html = options.html;
		} else {
			obj.text = options.text;
		}
		text = $('<span>', obj).appendTo (content);
		// modify by xuzhh at 2014-11-7 15:34:03		end
		
		if (options.closeTrigger) {
			close = $('<div>', {
				'class': 'msgGrowl-close'
				, 'click': function (e) { 
					e.preventDefault (); 
					if (typeof options.onClose === 'function') {
						options.onClose (msgGrowl, options);
					}
					$(this).parent ().fadeOut ('medium', function () { 
						$(this).remove (); 
					});
				}
			}).appendTo (msgGrowl);
		}
		
		if (options.title != '') {
			title = $('<h4>', {
				text: options.title
			}).prependTo (content);
		}
		
		if (options.lifetime > 0 && !options.sticky) {
			setTimeout (function () {
				if (typeof options.onClose === 'function') {
					options.onClose ();
				}
				msgGrowl.fadeOut ('medium', function () { $(this).remove (); });		
			}, options.lifetime);
		}		
		
		container.addClass (options.position);
		
		if (options.position.split ('-')[0] == 'top') {
			msgGrowl.prependTo (container).hide ().fadeIn ('slow');
		} else {
			msgGrowl.appendTo (container).hide ().fadeIn ('slow');	
		}
		
		if (typeof options.onOpen === 'function') {
			options.onOpen (msgGrowl, options);
		}			
	}
})(jQuery);