const navbar = document.getElementById("nav")
            const sticky = navbar.offsetTop; // Get the offset position of the navbar
            // navbarSubstitute is a substitute for the navbar's height
            // when it gets stickied, stopping the sudden jump
            const navbarSubstitute = document.getElementById("navbarSubstitute")
            navbarSubstitute.style.height = 0;
            const navbarSubstituteHeight = navbar.offsetHeight

            let disableAutoNavbarHighlight = false;
            
            
            // navbar-highlight variables
            const navbarLis = $('#navbarList').children();
            const navbarLinks = $('#navbarList').find('a');
            let anchorBottoms = [];

            for(let i=0; i<navbarLinks.length; i++){
                let a = navbarLinks[i]
                let idToFind = a.getAttribute('href')
                let anchor = $(idToFind)
                anchorBottoms.push(anchor.offset().top + anchor.height())
                
            }
             
             // i dont think this is doing anything, the implementation in the onscroll function seems to be fixing the problem resize problem
             $(window).on('resize',function(){
                for(let i=0; i<navbarLinks.length; i++){
                    let a = navbarLinks[i]
                    let idToFind = a.getAttribute('href')
                    let anchor = $(idToFind)
                    anchorBottoms[i] = (anchor.offset().top + anchor.height())
                }
            })
            
            
            window.onscroll = function() {
            // Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
                if (window.pageYOffset >= sticky) {
                    //navbar.classList.add("fixed-top")
                    navbar.classList.add("sticky-header");
                    navbarSubstitute.style.height = navbarSubstituteHeight + "px"
                } else {
                    //navbar.classList.remove("fixed-top");
                    navbar.classList.remove("sticky-header");
                    navbarSubstitute.style.height = 0
                }
                
                
                // Position based navbar highlighting
                
                // fixes resize bug
                for(let i=0; i<navbarLinks.length; i++){
                    let a = navbarLinks[i]
                    let idToFind = a.getAttribute('href')
                    let anchor = $(idToFind)
                    anchorBottoms[i] = (anchor.offset().top + anchor.height())

                }
                // we round here to reduce a little workload https://stackoverflow.com/questions/20276166/how-do-i-make-my-navbar-change-css-class-upon-scrolling-past-an-anchor-point
                let stopy = Math.floor($(window).scrollTop() + 1);

                for(let i=0; i<navbarLinks.length; i++){
//                    if(!anchorBottoms[i]) continue; // be careful can be 0!
                    let bottom = anchorBottoms[i]
                    let top = anchorBottoms[i + 1] ? anchorBottoms[i + 1] : Number.POSITIVE_INFINITY
                    let a = navbarLinks[i]
                    let idToFind = a.getAttribute('href')
                    
                    if (stopy > bottom && stopy <= top) {
                        if(!disableAutoNavbarHighlight)
                            navbarLis[i].classList.add('active');
                    } else {
                        navbarLis[i].classList.remove('active');
                    }
                }
                
                
                
                
                revealOnScroll();
            };
            
            // smooth scrolling
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    
                    removeAllNavHighlights();
//                    disableAutoNavbarHighlight = true;  // temporarily disable
                    document.querySelector(this.getAttribute('href')).scrollIntoView({
                        behavior: 'smooth',
                        block: "start" // or "end"
                    });
//                    disableAutoNavbarHighlight = false; // reenable
                    window.onscroll(); // simulate a scroll update
                });
            });
            
            function removeAllNavHighlights(){
                $('#navbarList').children().removeClass("active")
            }
            
            // just a function to help me figure out measurements the css :)
            function calculateMaxSizeForCard(picWidth, percentCardWidth, percentDescriptionWidth){
                // assumes no margins
                return picWidth / (percentCardWidth - percentCardWidth * percentDescriptionWidth)
            }
            
             
            let $window = $(window);
            let win_height_padded = $window.height() * 1;
             
            function revealOnScroll() {
                var scrolled = $window.scrollTop();
                $(".revealOnScroll:not(.animated)").each(function () {
                  var $this     = $(this),
                      offsetTop = $this.offset().top,
                      offsetBottom = $this.position().top + $this.outerHeight(true),
                      mid = (offsetTop + offsetBottom)/2
                    
                    
                  if (scrolled + win_height_padded > mid && scrolled < mid) {
                    if ($this.data('timeout')) {
                      window.setTimeout(function(){
                        $this.addClass('animated ' + $this.data('animation'));
                      }, parseInt($this.data('timeout'),10));
                    } else {
                      $this.addClass('animated ' + $this.data('animation'));
                    }
                  }
                });
            }

            function show(target) {
                let showLink = document.getElementById('show');
                showLink.classList += ' hidden';

                let showTarget = document.getElementById(target);
                showTarget.classList = showTarget.classList.remove('hidden');
            }

            function hide(target) {
                let hideTarget = document.getElementById(target);
                hideTarget.classList += ' hidden';

                let showTarget = document.getElementById('show');
                showTarget.classList = showTarget.classList.remove('hidden');
            }
             
             
            window.onscroll()