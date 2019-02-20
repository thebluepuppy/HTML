// change menu current active item
// Cache selectors
var lastId,
    topMenu = $("#menu-nav"),
    topMenuHeight = topMenu.outerHeight(),
    // All list items
    menuItems = topMenu.find(".item-link"),
    // Anchors corresponding to menu items
    scrollItems = menuItems.map(function(){
      var item = $($(this).attr("href"));
      if (item.length) { return item; }
    });

// Bind click handler to menu items
// so we can get a fancy scroll animation
menuItems.click(function(e){
    var href = $(this).attr("href"),
        offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
    $('html, body').stop().animate({
        scrollTop: offsetTop
    }, 300);
    e.preventDefault();
});

// Bind to scroll
$(window).scroll(function(){
    // Get container scroll position
    var fromTop = $(this).scrollTop()+topMenuHeight;

    // Get id of current scroll item
    var cur = scrollItems.map(function(){
        if ($(this).offset().top < fromTop)
        return this;
    });
    // Get the id of the current element
    cur = cur[cur.length-1];
    var id = cur && cur.length ? cur[0].id : "";

    if (lastId !== id) {
        lastId = id;
        // Set/remove active class
        menuItems
            .parent().removeClass("current-item")
            .end().filter("[href='#"+id+"']").parent().addClass("current-item");
   }
});

//change menu background color
window.onscroll = () => {
    const menu = $('#menu-nav');
    if (this.scrollY <= 200) menu.removeClass('scroll');
    else menu.addClass('scroll');
};

// slide show
var sliderObjects = [];
createSliderObjects();

function createSliderObjects() {
    var sliders = $('.slider');
    $.each(sliders, function(i, item) {
        var obj = {};
        obj.id = $(item).attr('id');
        obj.content = item;
        obj.slideIndex = 1;
        obj.slideContents = $(item).find('.slide-item');
        obj.slideDots = $(item).find('.slide-dot');
        showSlide(obj);
        sliderObjects.push(obj);
    });
}

function showSlide(obj) {
    // move to start slide
    if (obj.slideIndex > obj.slideContents.length) {
        obj.slideIndex = 1;
    }
    // move to end slide
    if (obj.slideIndex < 1) {
        obj.slideIndex = obj.slideContents.length;
    }
    // hide another slide
    for (var i = 0; i < obj.slideContents.length; i++) {
        obj.slideContents[i].style.display = "none";
        obj.slideDots[i].classList.remove("active");
    }
    // show current slide
    obj.slideContents[obj.slideIndex - 1].style.display = "flex";
    obj.slideDots[obj.slideIndex - 1].classList.add("active");
}

function changeSlide(obj, n) {
    var parentObj = $(obj).parents('.slider');
    var matchedObj;
    $.each(sliderObjects, function(i, item) {
        if ($(parentObj[0]).attr('id') == $(item).attr('id')) {
            matchedObj = item;
            return false;
        }
    });
    matchedObj.slideIndex += n;
    showSlide(matchedObj);
}

function chooseSlide(obj, n) {
    var parentObj = $(obj).parents(".slider"); //important :>
    var matchedObj;
    $.each(sliderObjects, function(i, item) {
        if ($(parentObj[0]).attr('id') == $(item).attr('id')) {
            matchedObj = item;
            return false;
        }
    });
    matchedObj.slideIndex = n;
    showSlide(matchedObj);
}

// show video
$('#videolink').click(function() {
    //show div video
    $('#videostory').show();
});

$('#videostory').click(function() {
    //stop iframe
    $("iframe").each(function() {
        var src= $(this).attr('src');
        $(this).attr('src',src);
    });
    //hide div video
    $('#videostory').hide();
});
