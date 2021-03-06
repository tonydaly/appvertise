(function($) {
  $.fn.appvertise = function(custom) {
    var defaults = {
      width: 950,
      height: 300,
      rotateInterval: 6000,
      slideAnimation: "top",
      slideSpeed: "slow"
    };
    var settings  = $.extend({}, defaults, custom);
    
    var box = this;
    var start_zindex  = 10;
    var current_slide = "slide1";
    var current_slide_number = 1;
    var slide_count	= 0;
    var rotator = ""

    // Internal wrapper
		box.wrapInner('<div class="appbox"></div>');
    var inner = box.find(".appbox");
    
    // Create divs for slide and navigation
    inner.prepend('<div class="navigation"></div>')
    inner.prepend('<div class="app-slide1" style="z-index:50"></div>')
    inner.prepend('<div class="app-slide2" style="z-index:51;display:none"></div>')
    
    box.find("ul").addClass("slides");
    box.find("ul li").each(function(i) {
      $(this).hide();
      $(this).addClass("slide" + (i + 1));
      start_zindex--;
      slide_count++;
    });
    
    // Set images
    box.find(".app-slide1").html(box.find("." + current_slide).children().eq(0).clone());
    
    // Navigation
    var navigation = "<ul>";
    for (var i=slide_count - 1; i >= 0; i--) {
      navigation += '<li class="nav' + (i + 1) + '">' + box.find(".slide" + (i + 1)).children().last().html() + "</li>";
    };
    navigation += "</ul>"
    
    var navigation_box = box.find(".navigation");
    navigation_box.html(navigation);
    
    box.show();
    
    startRotate();
    
    // TODO move the rotateInterval into a setting
    function startRotate() {
      rotator = setInterval(rotate, settings.rotateInterval)
    }
    
    function stopRotate() {
      window.clearInterval(rotator);
    }
    
    function rotate() {
      // what's our next slide number? If we're over the slide count, cycle back around.
      var next_slide_number = (current_slide_number + 1) > slide_count ? 1 : (current_slide_number + 1);
      
      // transition to that slide!      
      transition(current_slide_number, next_slide_number);
      
      // Update our current_slide
      // TODO this should probably be moved to the 'transition' funciton, 
      // as that'll will know if the change occurred or not.
      current_slide = "slide" + next_slide_number;
      current_slide_number = next_slide_number;
    }
    
    // Transition from one slide to another
    function transition(from, to) {
      stopRotate();
      
      var from_slide = "slide" + from;
      var to_slide = "slide" + to;
      
      // Swap content of app-slides
      box.find(".app-slide1").html(box.find("." + from_slide).children().eq(0).clone());
      box.find(".app-slide2").html(box.find("." + to_slide).children().eq(0).clone());
      
      var nav_list = box.find(".navigation ul");
      var nav_last_slide = nav_list.children().last();
      // Remove the last element from the list
      nav_list.children().last().remove();
      // Put it back on the top
      nav_list.prepend(nav_last_slide);
      
      switch(settings.slideAnimation) {
        case "top":
          slideTopSlidesAnimation();
          break;
        case "bottom":
          slideBottomSlidesAnimation();
          break;
        case "left":
          slideLeftSlidesAnimation();
          break;
        case "right":
          slideRightSlidesAnimation();
          break;
      }
    }
    
    function slideTopSlidesAnimation() {
			box.find(".app-slide2").css("top", -settings.height);
			box.find(".app-slide2").show();
			box.find(".app-slide2").animate({ top : "0px" }, settings.slideSpeed, null, startRotate);
		}
		
		function slideBottomSlidesAnimation(){
			box.find(".app-slide2").css("top", settings.height);
			box.find(".app-slide2").show();
			box.find(".app-slide2").animate({ top : "0px" }, settings.slideSpeed, null, startRotate);
		}
		
		function slideLeftSlidesAnimation(){
			box.find(".app-slide2").css("left", -settings.width);
			box.find(".app-slide2").show();
			box.find(".app-slide2").animate({ left : "0px" }, settings.slideSpeed, null, startRotate);
		}
		
		function slideRightSlidesAnimation(){
			box.find(".app-slide2").css("left", settings.width);
			box.find(".app-slide2").show();
			box.find(".app-slide2").animate({ left : "0px" }, settings.slideSpeed, null, startRotate);
		}
    
  }
  
})(jQuery);