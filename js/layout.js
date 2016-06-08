(function( $ ) {
  $.fn.validation = function() {
  	this.each(function(){
  		element = $(this);
  		var email_re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    	
  		if(element.hasClass("validate") && element.val().length == 0){
  			element.addClass("bad-validation");
	  	}else{	  		
	  		element.removeClass("bad-validation");
	  	}

	  	if (element.hasClass("email")) {
	  		email_re.test(element.val()) ? element.removeClass("bad-validation") : element.addClass("bad-validation");
	  	}	  	
	  	
	  	if (element.attr('type') == 'radio'){
	  		if($("input[type='radio'][name='"+ element.attr('name') +"']:checked").length == 0){
	  			element.addClass("bad-validation");
	  			element.parent().find(".text").addClass("bad-validation");
	  		}else{
	  			element.removeClass("bad-validation");
	  			element.parent().find(".text").removeClass("bad-validation");
	  		}
	  	}

	  	if(element.hasClass("number")){
	  		if (parseInt(element.val()) > 0){
	  			element.removeClass("bad-validation");
	  		}else{
	  			element.addClass("bad-validation");
	  		}
	  	}
	});  	
  };
})(jQuery);

var swiper = new Swiper('.swiper-main', {
	setWrapperSize: true,
	simulateTouch: false,
	// initialSlide: 8,
	onInit: function(swiper){
		var paginations = $(".questions .swiper-paginator");
		var startSlide = 1;
		paginations.each(function(){
			var str = '';
			var index = $(this).parent().index() - startSlide;
			for(var i = 0; i < paginations.length; i++){
				var className = '';
				if (i < index){
					className = 'swiper-prev';
				}else{
					className = 'swiper-next';
				}
				if (index === i) className += ' swiper-pagination-bullet-active';
				str += '<span class="' + className +'"></span>';
			}
			$(this).html(str);
		});
	}
	// pagination: '.swiper-paginator',
	// onSlideChangeEnd: function(swiper){
	// 	swiper.bullets.removeClass('swiper-prev').removeClass('swiper-next');
	// 	swiper.bullets.each(function () { 
	//         if ($(this).index() < swiper.activeIndex){
	//             $(this).addClass('swiper-prev');
	//         }else{
	//             $(this).addClass('swiper-next');
	//         }
	//     });
	// }
});

// inputs
var stores    = $(".stores");
var dev_mon   = $(".dev_mon");
var ntf_ret   = $(".ntf_ret");
var ntf_cost  = $(".ntf_cost");
var data_mon  = $(".data_mon");
var data_cost = $(".data_cost");

// outputs
var mons      = $(".mons span");
var mon_cost  = $(".mon_cost span");
var mon_saves = $(".mon_saves span");
var mon_total = $(".mon_total span");
var anns      = $(".anns span");
var ann_cost  = $(".ann_cost span");
var ann_saves = $(".ann_saves span");
var ann_total = $(".ann_total span");

function validate(){
	for (var i = 0; i < arguments.length; i++){
		arguments[i].validation();
		if (arguments[i].hasClass("bad-validation")){
			swiper.slideTo(arguments[i].parent().index() - 1);
			return;
		}		
	}
}

function p(decimal){
	return (decimal+'').replace(/(\d{1,3}(?=(\d{3})+(?:\.\d|\b)))/g,"\$1,");
}

function count(){
	validate(stores, dev_mon, ntf_ret, ntf_cost, data_mon, data_cost);

	// inputs
	var stor      = parseInt(stores.val());
	var ntf       = parseInt(dev_mon.val());
	var cost      = parseInt(ntf_cost.val());
	var ntf_saves = parseInt(ntf_ret.val())/ntf;

	// outputs
	var n1 = ntf*stor;
	var n2 = stor*cost;
	var n3 = stor*ntf*ntf_saves;
	var n4 = n3*cost;
	mons.text(p(n1));
	mon_cost.text("$"+p(n2));
	mon_saves.text(p(n3));
	mon_total.text("$"+p(n4));

	anns.text(p(n1*12));
	ann_cost.text("$"+p(n2*12));
	ann_saves.text(p(n3*12));
	ann_total.text("$"+p(n4*12));
	swiper.slideNext();
}

$(".btn").on("click", function(){
	var inputs = $(this).parent().find("input");
	if (inputs.length > 0){
		inputs.validation();
		if (!inputs.hasClass("bad-validation")){
			if($(this).hasClass("btn_form")){
				count()
			}else{
				swiper.slideNext();
			}			
		}
	}else{
		swiper.slideNext();
	}	
});