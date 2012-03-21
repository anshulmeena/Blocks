/*
 * jQuery BBQ: Back Button & Query Library - v1.2.1 - 2/17/2010
 * http://benalman.com/projects/jquery-bbq-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function($,p){var i,m=Array.prototype.slice,r=decodeURIComponent,a=$.param,c,l,v,b=$.bbq=$.bbq||{},q,u,j,e=$.event.special,d="hashchange",A="querystring",D="fragment",y="elemUrlAttr",g="location",k="href",t="src",x=/^.*\?|#.*$/g,w=/^.*\#/,h,C={};function E(F){return typeof F==="string"}function B(G){var F=m.call(arguments,1);return function(){return G.apply(this,F.concat(m.call(arguments)))}}function n(F){return F.replace(/^[^#]*#?(.*)$/,"$1")}function o(F){return F.replace(/(?:^[^?#]*\?([^#]*).*$)?.*/,"$1")}function f(H,M,F,I,G){var O,L,K,N,J;if(I!==i){K=F.match(H?/^([^#]*)\#?(.*)$/:/^([^#?]*)\??([^#]*)(#?.*)/);J=K[3]||"";if(G===2&&E(I)){L=I.replace(H?w:x,"")}else{N=l(K[2]);I=E(I)?l[H?D:A](I):I;L=G===2?I:G===1?$.extend({},I,N):$.extend({},N,I);L=a(L);if(H){L=L.replace(h,r)}}O=K[1]+(H?"#":L||!K[1]?"?":"")+L+J}else{O=M(F!==i?F:p[g][k])}return O}a[A]=B(f,0,o);a[D]=c=B(f,1,n);c.noEscape=function(G){G=G||"";var F=$.map(G.split(""),encodeURIComponent);h=new RegExp(F.join("|"),"g")};c.noEscape(",/");$.deparam=l=function(I,F){var H={},G={"true":!0,"false":!1,"null":null};$.each(I.replace(/\+/g," ").split("&"),function(L,Q){var K=Q.split("="),P=r(K[0]),J,O=H,M=0,R=P.split("]["),N=R.length-1;if(/\[/.test(R[0])&&/\]$/.test(R[N])){R[N]=R[N].replace(/\]$/,"");R=R.shift().split("[").concat(R);N=R.length-1}else{N=0}if(K.length===2){J=r(K[1]);if(F){J=J&&!isNaN(J)?+J:J==="undefined"?i:G[J]!==i?G[J]:J}if(N){for(;M<=N;M++){P=R[M]===""?O.length:R[M];O=O[P]=M<N?O[P]||(R[M+1]&&isNaN(R[M+1])?{}:[]):J}}else{if($.isArray(H[P])){H[P].push(J)}else{if(H[P]!==i){H[P]=[H[P],J]}else{H[P]=J}}}}else{if(P){H[P]=F?i:""}}});return H};function z(H,F,G){if(F===i||typeof F==="boolean"){G=F;F=a[H?D:A]()}else{F=E(F)?F.replace(H?w:x,""):F}return l(F,G)}l[A]=B(z,0);l[D]=v=B(z,1);$[y]||($[y]=function(F){return $.extend(C,F)})({a:k,base:k,iframe:t,img:t,input:t,form:"action",link:k,script:t});j=$[y];function s(I,G,H,F){if(!E(H)&&typeof H!=="object"){F=H;H=G;G=i}return this.each(function(){var L=$(this),J=G||j()[(this.nodeName||"").toLowerCase()]||"",K=J&&L.attr(J)||"";L.attr(J,a[I](K,H,F))})}$.fn[A]=B(s,A);$.fn[D]=B(s,D);b.pushState=q=function(I,F){if(E(I)&&/^#/.test(I)&&F===i){F=2}var H=I!==i,G=c(p[g][k],H?I:{},H?F:2);p[g][k]=G+(/#/.test(G)?"":"#")};b.getState=u=function(F,G){return F===i||typeof F==="boolean"?v(F):v(G)[F]};b.removeState=function(F){var G={};if(F!==i){G=u();$.each($.isArray(F)?F:arguments,function(I,H){delete G[H]})}q(G,2)};e[d]=$.extend(e[d],{add:function(F){var H;function G(J){var I=J[D]=c();J.getState=function(K,L){return K===i||typeof K==="boolean"?l(I,K):l(I,L)[K]};H.apply(this,arguments)}if($.isFunction(F)){H=F;return G}else{H=F.handler;F.handler=G}}})})(jQuery,this);
/*
 * jQuery hashchange event - v1.2 - 2/11/2010
 * http://benalman.com/projects/jquery-hashchange-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function($,i,b){var j,k=$.event.special,c="location",d="hashchange",l="href",f=$.browser,g=document.documentMode,h=f.msie&&(g===b||g<8),e="on"+d in i&&!h;function a(m){m=m||i[c][l];return m.replace(/^[^#]*#?(.*)$/,"$1")}$[d+"Delay"]=100;k[d]=$.extend(k[d],{setup:function(){if(e){return false}$(j.start)},teardown:function(){if(e){return false}$(j.stop)}});j=(function(){var m={},r,n,o,q;function p(){o=q=function(s){return s};if(h){n=$('<iframe src="javascript:0"/>').hide().insertAfter("body")[0].contentWindow;q=function(){return a(n.document[c][l])};o=function(u,s){if(u!==s){var t=n.document;t.open().close();t[c].hash="#"+u}};o(a())}}m.start=function(){if(r){return}var t=a();o||p();(function s(){var v=a(),u=q(t);if(v!==t){o(t=v,u);$(i).trigger(d)}else{if(u!==t){i[c][l]=i[c][l].replace(/#.*/,"")+"#"+u}}r=setTimeout(s,$[d+"Delay"])})()};m.stop=function(){if(!n){r&&clearTimeout(r);r=0}};return m})()})(jQuery,this);


/*!
 * EightShapes Blocks framework
 * http://eightshapes.com
 *
 * ©Copyright 2012 Eight Shapes LLC
 *
 * Terms of Use: http://unify.eightshapes.com/about-the-system/terms-of-use/
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

var EightShapes = EightShapes || {};
EightShapes.Blocks = {

  //======================================================================================================
  // Default Blocks Collections
  display : {
    // Show toolbar at all in the initial layout? Values: on, off
    toolbar : "on",
    // Set toolbar location? Values: topleft, topright, bottomleft, bottomright
    toolbarlocation : "topright",
    // Show markers button (and thus, markers overlaid in page layouts)? Values: on, off
    markers : "on",
    // Enable component interactions like remove, previous/next, and more?
    markeractions: true,
    // In addition to component name, also reveal library's/spec's ID number? Values: on, off
    ids : "off",
    // (pending idea) Does a related library exist? (and thus, expand Blocks views for accessing library assets)
    library : false,
    projects : true,
    // Does a prototype Blocks homepage exist, and if so, default to it?
    homepage : false,
		startpage : "page",
    // Default sizing for Grid items
    aspectratio : 1.25,
    galleryscale : 0.28,
    // Default component container
    componentcontainer : "",
    // Default page viewed when you exit full screen
    lastView : "pages", // or "pages","components","activepage","activecomponent"
    lastViewID : "",
		currentDisplayMode: "grid",
		deviceprofiles : []
  },

  p : {},              // Pages  
  c : {},              // Components
  s : {},              // Sets
	home : {
		load : function() {
      $.ajax({
				type: 'GET',
				url: "index.html", 
				dataType: 'html',
				success: function(results) {
	        EightShapes.Blocks.home.loaded = true;
	        results = "<div>" + results + "</div>";
	        $('#esb > section.home').append($(results).children('section.home').children())
					EightShapes.Blocks.home.wrap();
				}	// end success
      }); // end ajax
		},
		wrap : function() {
			$('#esb > section.home')
				.wrapInner(document.createElement("aside"))
				.wrapInner(document.createElement("article"));
			$('#esb > section.home > article > aside').addClass('notes');
		},
		loaded : false
	},					// Home Page
  m : 0,              // Marker Count (enumerated to relate marked components in layouts and ASIDE.notes lists)
  pc : 0,             // Page Count (enumerated because...I don't remember)
  metadata : {},      // Prototype Metadata (eventually, author, last updated, version, etc)

  init : function() {

    // Summary: Initializes the Blocks framework and current page layout
    // Called by: document.ready
    // Precondition: a page to display that may or may not contain embedded or linked components
    // Core steps include:
    //  1. Expand CSS and HTML DOM (Add style sheets, build out DOM above and around the initial page)
    //  2. Load prototype configuration (to inventory all parts: settings, pages, components, etc)
    //  3. Register (into JS Object) and create stubs (in DOM) for all prototype parts
    //  4. Load and mark all embedded and linked components in initial page
    //
    // Initialization ends with a fully loaded and marked page in view. 
    // Initialization does NOT load remaining pages, components, etc, which instead load upon exiting full screen.

    // Add Additional Style Sheets to Header
    $('head').prepend('<link rel="stylesheet" href="blocks/css/blocks.css"></link>');
    // $('head').append('<link rel="stylesheet" href="blocks/css/ui-lightness/jquery-ui-1.8.6.custom.css" />');

    // Error Check Markup and Setup Overall DOM
    if (!EightShapes.Blocks.markupCore()) return false;

    // Attempt to Load _config.xml
    //   If successful -> invoke Blocks
    //   If failure -> remove Toolbar, still try to load page components into "standalone page"
    $.ajax({
      type: 'GET',
      url: '_config.xml',
      dataType: 'xml',
      success: function(XMLconfig) {
        // Configure experience based on project-specific preferences 
        EightShapes.Blocks.setDisplayPreferences(XMLconfig);
        EightShapes.Blocks.setPrototypeMetadata(XMLconfig);
        
        // Identify and ID Current Page's Article
        var hrefsplit = window.location.href.split('/');
//RM        EightShapes.Blocks.metadata.currentpageid = hrefsplit[hrefsplit.length-1].substr(0,hrefsplit[hrefsplit.length-1].length-5);
        // hrefsplit[hrefsplit.length-1].length-5
        EightShapes.Blocks.metadata.currentpageid = hrefsplit[hrefsplit.length-1].split('.html')[0];

        // Reset hash upon page refresh, since it may contain irrelevant hash values
				if (EightShapes.Blocks.display.startpage === "page") {
        	$.bbq.pushState({view:"fullscreen", id:EightShapes.Blocks.metadata.currentpageid});
        	$('#esb > section.pages > article').attr('data-id',EightShapes.Blocks.metadata.currentpageid);
        	EightShapes.Blocks.registerPage($('#esb > section.pages > article.active'));
				} else {
        	$.bbq.pushState({view:"home", id:""});
				}

        // Register Pages, Components, and Sets from Config XML to EightShapes.Blocks.p, 
        // EightShapes.Blocks.c, and EightShapes.Blocks.s
        EightShapes.Blocks.registerPage($(XMLconfig).find('pages > page'));
        EightShapes.Blocks.registerComponent($(XMLconfig).find('components > component'));
        EightShapes.Blocks.registerSet($(XMLconfig).find('sets > set'));
				EightShapes.Blocks.registerDeviceProfiles($(XMLconfig).find('deviceprofiles > profile'));
        EightShapes.Blocks.registerMap($(XMLconfig).find('maps > map'));

        // Mark Embedded Components in Current Page
        EightShapes.Blocks.markComponent($('#esb > section.pages > article.active > section.viewport *.component'));
        // Load and Add Linked Components in Current Page
        EightShapes.Blocks.addComponentsToBlock($('#esb > section.pages > article.active > section.viewport'));
      },
      error: function() {
        console.log('WARNING: _config.xml was not found in your prototype root directory.')
        // Remove the Toolbar
        $('body#esb > section.pages > menu').remove();
        // Load and Add Linked Components in Current Page
        EightShapes.Blocks.addComponentsToBlock($('#esb > section.pages > article.active > section.viewport'));
      }
    });

    //======================================================================================================
    // Blocks Toolbar & Menu Events

    // Exit Full Screen
    $('#esb > section > menu').on('click','button.exitfullscreen', function() {
			if(EightShapes.Blocks.pc === 1) {
				$.bbq.pushState({view:"page", id:$('body > section.pages > article').attr('data-id')});
			} else {
	      $.bbq.pushState({ view : EightShapes.Blocks.display.lastView, id : EightShapes.Blocks.display.lastViewID });
			}
    });
    // Go From Article to Article
    $('#esb > section > menu').on('click','button.next', function() {
      var currentPage = $('#esb > section.pages > article.page.active');
      if($(currentPage).next().is('article')) {
        if($('#esb').hasClass('fullscreen')) {
          $.bbq.pushState({view:"fullscreen",id:$(currentPage).next().attr('data-id')});
        } else {
          $.bbq.pushState({id:$(currentPage).next().attr('data-id')});
        }
      }
    });
    $('#esb > section > menu').on('click','button.previous', function() {
      var currentPage = $('#esb > section.pages > article.page.active');
      if($(currentPage).prev().is('article')) {
				if($('#esb').hasClass('fullscreen')) {
          $.bbq.pushState({view:"fullscreen",id:$(currentPage).prev().attr('data-id')});
				} else {
	        $.bbq.pushState({view:"page", id:$(currentPage).prev().attr('data-id')});
				}
      }
    });
    // Toggle Markers On/Off
    $('#esb > section > menu').on('click','button.markers', function() {
      ($('body').hasClass('markers')) ? $('body').removeClass('markers') : $('body').addClass('markers');
    });
    // Toggle Grid/Thumbnail/List view mode for Pages and Components
    $('#esb > section > menu').on('click','span.viewas > button', function() {
      
			// Get Selected Mode
			var displayMode = $(this).html().toLowerCase();
      
			// Set Display Preference (for memory when returning to view)
			EightShapes.Blocks.display.currentDisplayMode = displayMode;
			
      $(this).addClass('active').siblings().removeClass('active');
      $('#esb > section.active')
        .removeClass('list grid thumbnail notes map').attr('style','').addClass(displayMode)
        .children('article').attr('style','').children('section.viewport').attr('style','');

			// Size Components Correctly within it's Block
      $('#esb > section.components.active.grid > article > section.variation:nth-child(3)').each( function(i,element) {
        $(element).css('width',($(element).find('section.viewport').width()/2+10)+'px');
        $(element).css('height',($(element).find('section.viewport').height()/2+60)+'px');
        $(element).parent().css('height',($(element).find('section.viewport').height()/2+75)+'px');
      });
    });
		// Open / Close Device Menu
		$('#esb > section.pages > menu').on('click','div.dropdown > button.selectionCurrent', function(event) {
			var dropdownButton = $(this);
			var dropdownOptions = dropdownButton.next('ul');
			if (this) {
				if (dropdownButton.parent().hasClass('opened')) {
					dropdownOptions.hide();
					dropdownButton.parent().removeClass('opened');
				} else {
					$('#esb > section > menu > div.dropdown').removeClass('opened');
					$('#esb > section > menu > div.dropdown > ul').hide();
					dropdownOptions.show();
					dropdownOptions.parent().addClass('opened');
					dropdownOptions.parent().bind('mousedownoutside', function(event){
						dropdownOptions.next('ul').hide()
						dropdownOptions.parent().removeClass('opened');
					});
				}
			};
			event.stopPropagation();
		});
		// Make Device Menu Selection
		$('#esb > section.pages > menu').on('click','div.dropdown > ul > li', function(event) {
			$(this).parent().hide().parent().removeClass('opened').find('.selected').removeClass('selected');
			$(this).closest('div.dropdown').find('button.selectionCurrent').html($(this).html());
			if ($(this).closest('div.dropdown').hasClass('deviceprofiles')) {
				EightShapes.Blocks.setDeviceProfile($(this));
			} else if ($(this).closest('div.dropdown').hasClass('deviceorientation')) {
				EightShapes.Blocks.setDeviceOrientation($(this).html().toLowerCase());
			}
		});

    //======================================================================================================
    // Blocks Article By Article Events

    // Enter Full Screen for Page from Any Blocks View
    $(document).on('click','#esb > section.pages > article > header > button.fullscreen', function() {
      $.bbq.pushState({view:"fullscreen", id:$(this).closest('article').attr('data-id')});
    });
		// Capture any basic link from one prototype to another to prevent complete blocks reload
		$(document).on('click','#esb > section.pages > article > section.viewport a', function(event) {
			for (var page in EightShapes.Blocks.p) {
				if ($(this).attr('href').split(".html")[0] === page) {
      		$.bbq.pushState({view:"fullscreen", id:page});
					return false;
				}
			}
		})
    // Grid/Thumbnail/List View: Click Page Title > Go To Page Notes
    $(document).on('click','#esb > section.pages > article > header > h2', function() {
      $.bbq.pushState({view:"page", id:$(this).closest('article').attr('data-id')});
    });
    // Notes View: Component List Hovers
    $(document).on('mouseover','#esb > section.pages > article.page > aside.notes ul.componentlist li',function() {
      $(this).closest('article.page').find('.component[data-marker='+$(this).attr('data-marker')+']').addClass('highlight');
    });
    $(document).on('mouseout','#esb > section.pages > article.page > aside.notes ul.componentlist li', function() {
      $(this).closest('article.page').find('.component[data-marker='+$(this).attr('data-marker')+']').removeClass('highlight');
    });
    // Grid/Thumbnail/List View: Click Component Title > Go To Component Notes
    $(document).on('click','#esb > section.components > article > header > h2', function() {
      $.bbq.pushState({view:"component", id:$(this).closest('article').attr('data-id')});
    });
    // Go From Article (Page, Component) to Main Section (Pages, Components)
    $(document).on('click','#esb > section.active.selected > header > h2, #esb > section.active.notes > header > h2', function() {
      $('#esb > header > nav.primary > ul > li.' + $(this).children('h2').html().toLowerCase()).click();
    });

  },

  //======================================================================================================
  // Constructors
  Component : function(id) {
    this.id = id;
    this.source = "project";
    this.loadStarted = false;
    this.loaded = false;
    this.locationsToAddIt = [];
    this.type = "component";
    this.html = "";
    this.title = "";
    this.variationCount = 1;
		this.variations = {};
    this.hasNotes = false;
    this.notes = "";
    this.notesLoaded = false;
    this.registered = false;
    this.doneness = "";
		this.description = "";
		this.classes = "";
    this.container = "";					// Customizable container for Components section Notes view, at component level (not variation)
    
    // Load the component (all variations) from a file
    this.load = function() {
      var component = EightShapes.Blocks.c[id];
      if (component.loadStarted) {
        return false;
      }
      component.loadStarted = true;

      $.ajax( {
	      type: 'GET',
	      url: EightShapes.Blocks.sourceURL(component.source)+id+".html",
	      dataType: 'html',
	      success: function(results) {
	        results = "<div>" + results + "</div>";
	        component.header          = $(results).children('header').attr('id',id);
	        component.html            = $(results).children('#variations');
	        component.notes           = $(results).children('aside.notes').html();
	        component.title           = $(results).children('header').attr('title');
	        component.classes         = $(results).children('header').attr('class');
	        component.container       = $(results).children('header').attr('data-container');
	        component.hasNotes        = ($(results).children('aside.notes').length > 0);
	        component.variationCount  = $(results).children('article#variations').children().length;

	        if (component.variationCount > 1 && !component.loaded) {
	          $('#esb > section.components > article[data-id="' + id + '"] > header > h2').append(' <span class="count">(' + component.variationCount + ')</span>');
	        }
	        EightShapes.Blocks.registerComponent(component.header);
	        if($('#esb > section.components > article[data-id="' + component.id + '"] > section.variation').length === 0) {
		
						// Define and Load Markup for each variation into Components section
	          $(component.html).children('section[data-variation]').each( function(index,element) {
	            var variationid = $(this).attr('data-variation');
	            var variationtitle = $(this).attr('title');
							EightShapes.Blocks.c[id].variations[variationid] = new EightShapes.Blocks.ComponentVariation(variationid);
							EightShapes.Blocks.c[id].variations[variationid].id = variationid;
							EightShapes.Blocks.c[id].variations[variationid].title = variationtitle;
							EightShapes.Blocks.c[id].variations[variationid].html = $(this).html();
							EightShapes.Blocks.c[id].variations[variationid].classes = $(this).attr('class');
							EightShapes.Blocks.c[id].variations[variationid].container = $(this).attr('data-container');
	            $('#esb > section.components > article[data-id="' + id + '"]')
	              .append('<section class="variation ' + EightShapes.Blocks.containComponent(id,variationid) + '" data-id="' + variationid + '" ><header><h3>' + variationtitle + '</h3></header>' + 
	                 '<section class="viewport ' + component.classes + '">' + $(this).html() + '</section></section>')
	              .children('aside.notes').find('ul.variationlist').append('<li data-variationid="' + variationid + '">' + variationtitle + '</li>');
	          })
	        }

          // Load Component-Specific CSS
          if (!component.cssloaded) {
            // We do a HEAD request so that we only load present files
            var css_request,
              css_resource_uri = EightShapes.Blocks.sourceURL(component.source) + "css/" + id + ".css";

            css_request = $.ajax({
              type: 'HEAD',
              url: css_resource_uri,
              success: function() {
                // Note: Content-Length isn't present when Blocks is loaded via file://
                // and responseText isn't present when Blocks is loaded via http://.
                if (css_request.getResponseHeader('Content-Length') > 0 ||
                    css_request.responseText.length > 0) {
                  $('head').append('<link rel="stylesheet" href="' + css_resource_uri + '" />');
                  component.cssloaded = true;
                } else {
                  console.log('CSS resource is empty: ' + css_resource_uri);
                }
              },
              error: function(data) {
               console.log('CSS resource is missing: ' + css_resource_uri);
              }
            });
          }

					// Determine if there are any data-component descendants inside 
          // these components, otherwise load JS and clone 'em
					if ($('#esb > section.components > article[data-id="' + component.id + '"]').find('*[data-component]').length > 0) {
						EightShapes.Blocks.addComponentsToBlock($('#esb > section.components > article[data-id="' + component.id + '"]'));
					} else {
						EightShapes.Blocks.loadComponentJSandAddToLocations(component);
					}
				}
      });
    }
  },
  Page : function(id) {
    this.id = id;
    this.loaded = false;
    this.html = "";
    this.embeddedclasses = "";
		this.configclasses = "";
    this.design = "";
    this.type = "page";
    this.title = "[untitled]";
    this.doneness = "unknown";
    this.description = "";
		this.pagefilename = id;
    this.index = EightShapes.Blocks.pc++;
    
    // Load page from a file in the project root directory into EightShapes.Blocks and the section.pages>article
    
    this.load = function() {
      var page = EightShapes.Blocks.p[id];
      var pageArticle = $('body > section.pages > article[data-id="' + page.id + '"]').append('<section class="viewport"></section>');

      $.ajax({
				type: 'GET',
				url: page.pagefilename+".html", 
				dataType: 'html',
				success: function(results) {
	        results = "<div>" + results + "</div>";
	        page.html = results;
	        page.design = $(results).children('section.viewport').children();
	        page.embeddedclasses = $(results).children('section.viewport').attr('class');
	        page.notes = $(results).children('aside.notes').children();
	        page.loaded = true;
	        $('#esb > section.pages > article[data-id="' + page.id + '"] > section.viewport')
	          .append($(page.design))
						.addClass(page.configclasses)
	          .addClass(page.embeddedclasses);
	        $('#esb > section.pages > article[data-id="' + page.id + '"] > aside.notes')
	          .append($(page.notes));
        
	        // Mark all components embedded in the loaded page classed with "component" 
	        EightShapes.Blocks.markComponent($('#esb > section.pages > article[data-id="' + page.id + '"] > section.viewport > *.component'));
        
	        // Load all components into the page that contain data-component attribute
	        EightShapes.Blocks.addComponentsToBlock($('#esb > section.pages > article[data-id="' + page.id + '"] > section.viewport'));
				}	// end success

      }); // end ajax

    }; // end this.load
  },
	ComponentVariation : function(id) {
		this.id = id;
		this.title = "";
		this.container = "";
		this.classes = "";
		this.hasNotes = false;
	},

  //======================================================================================================
  // Markup & Modular Loading, Adding & Marking
  markupCore : function() {

    // Summary: Wraps markup of current page with the core DOM element structure, sets up some live events
    // Called by: init
    // Preconditions: 
    //    A child of the BODY tag with a class="viewport", demarking the page layout
    //    An <aside class="notes"> tag - child of the BODY tag - can also be included
    //    The BODY tag should have no other children
    //

		// Add ESB ID to BODY tag
    $('body').attr('id','esb')

		// If Page Viewport, then Set Up Full Screen
		if ($('body > section.viewport').length === 1) {
			EightShapes.Blocks.display.startpage = "page";
      $('body')
				.addClass('fullscreen')
				.wrapInner('<section class="pages active" data-section="pages"><article class="page active"></article></section>');

		// If Home, then Setup Home Start Page
		} else if ($('body > section.home').length === 1) {
			EightShapes.Blocks.display.startpage = "home";
			EightShapes.Blocks.home.loaded = true;
			EightShapes.Blocks.home.wrap();
      $('body')
				.append('<section class="pages active" data-section="pages"><article class="page active"></article></section>')

		// Else Return Failed Load
		} else {
      alert('EightShapes Blocks will not function without one and only one <section class="viewport"> or <section class="home">.');
      return false;
		}

		// Add Empty Components Element
    $('body').append('<section class="components" data-section="components"><header><h2>Components</h2></header></section>');

    // Pages Menu Bar
    $('#esb > section.pages').prepend('<menu><span class="controlset  viewas"><button class="list">List</button><button class="thumbnail">Thumbnail</button><button class="grid active">Grid</button></span><button class="exitfullscreen">Exit Full Screen</button><button class="markers">Markers</button><button class="previous">Previous</button><button class="next">Next</button></menu>');

		 // Sliders HTML <span class="controlset sizeslider"><h3>Size</h3><span class="icon small"></span><div class="esbgallerysize" style="width: 100px;"></div><span class="icon large"></span></span><span class="controlset heightslider"><h3>Height</h3><span class="icon short"></span><div class="esbgalleryaspectratio" style="width: 100px;"></div><span class="icon tall"></span></span>

    // Components Menu Bar
    $('#esb > section.components').prepend('<menu></menu>');
		
    // Grid's Page Sizing
    // $('body > section > menu > span.sizeslider > div.esbgallerysize').slider({
    //   value: 0.28,
    //   min: 0.15,
    //   max: 0.4,
    //   step: 0.01,
    //   slide: function(event,ui) {
    //     EightShapes.Blocks.display.galleryscale = ui.value;
    // 
    //     $('#esb > section.pages > article')
    //       .css('width',1000*EightShapes.Blocks.display.galleryscale)
    //       .css('height',1000*EightShapes.Blocks.display.aspectratio*EightShapes.Blocks.display.galleryscale+50);
    // 
    //     $('#esb > section.pages > article > section.viewport')
    //       .css('-moz-transform','scale('+EightShapes.Blocks.display.galleryscale+')')
    //       .css('-webkit-transform','scale('+EightShapes.Blocks.display.galleryscale+')')
    //       .css('height',960*EightShapes.Blocks.display.aspectratio);
    //   }
    // });
    // $('body > section > menu > span.heightslider > div.esbgalleryaspectratio').slider({
    //   value:1.25,
    //   min:0.6,
    //   max:2.0,
    //   step:0.05,
    //   slide: function(event,ui) {
    //     EightShapes.Blocks.display.aspectratio = ui.value;
    //     $('#esb > section.pages > article')
    //       .css('width',1000*EightShapes.Blocks.display.galleryscale)
    //       .css('height',1000*EightShapes.Blocks.display.aspectratio*EightShapes.Blocks.display.galleryscale+50);
    //     $('#esb > section.pages > article > section.viewport')
    //       .css('-moz-transform','scale('+EightShapes.Blocks.display.galleryscale+')')
    //       .css('-webkit-transform','scale('+EightShapes.Blocks.display.galleryscale+')')
    //       .css('height',960*EightShapes.Blocks.display.aspectratio);
    //   }
    // });

    $('body').prepend('<header><nav class="primary"><ul></ul></nav></header>');
    $('body > header > nav > ul')
      .append('<li class="pages" data-view="pages">Pages</a></li>')
      .append('<li class="components" data-view="components">Components</a></li>');

    $('body > header > nav.primary > ul > li').live('click', function() {
      $.bbq.pushState({view:$(this).attr("data-view"),id:"n/a"});
      return false;
    });

    return true;
  },
  registerPage : function(elements,setid) {

    // Summary: Registers the current page and pages identified in Config XML into EightShapes.Blocks.p
    // Called by: init, registerSet
    // Parameters:
    //    elements: 1 (current page in DOM) or 0+ (from Config XML PAGES element)
    //    setid (optional): Used for registering page in a set in BODY>SECTION.sets>SECTION.set (future)
    //

    // Make the assumption that the active page article is the page loaded into the browser at page load
    var loadedPageID = $('#esb > section.pages > article.active').attr('data-id');

    // reachedLoadedPageYet : Used to order page <articles> in DOM to match sequence of config XML file
    var reachedLoadedPageYet = false;

    elements.each(function (i,element) {
      var currentArticle = "";
			var pagefilename = "";

			// Assign ID from id (config file) or data-id (if inline for default page assigned during markup core)
      var id = $(element).attr('id');
      if ($(element).attr('data-id')) {
        currentArticle = element;
        id = $(element).attr('data-id');
      }

			// Handle variations intended to load the same page multiple times
			pagefilename = id;
			if ($(element).attr('variation')) {
				id = id + "_" + $(element).attr('variation');
			}

      if (id === loadedPageID) {
        reachedLoadedPageYet = true;
      }

      // ESB Page exist?
      if (!EightShapes.Blocks.p[id]) {
        EightShapes.Blocks.p[id] = new EightShapes.Blocks.Page(id);
      }

      // Update with Properties from Element Provided
			if ($(element).attr('variation')) {
				EightShapes.Blocks.p[id].pagefilename = pagefilename;
			}
      if ($(element).attr('doneness')) {
        EightShapes.Blocks.p[id].doneness = $(element).attr('doneness');
      } 
      if ($(element).attr('description')) {
        EightShapes.Blocks.p[id].description = $(element).attr('description');
      } 
      if ($(element).attr('title')) {
        EightShapes.Blocks.p[id].title = $(element).attr('title');
      }
			if ($(element).attr('class')) {
      	EightShapes.Blocks.p[id].configclasses = $(element).attr('class');
			}

      // ARTICLE Empty Components List
      var articleComponentsList = '<h3>Components</h3><ul class="componentlist itemstack"></ul>';      

      // Section > Article exist?
      if ($('#esb > section.pages > article[data-id="' + id + '"]').length === 0) {
        if (reachedLoadedPageYet) {
          $('#esb > section.pages').append('<article data-id="' + id + '" class="page"></article>');
        } else {
          $('#esb > section.pages > article.active').before('<article data-id="' + id + '" class="page"></article>');
        }
      }

      currentArticle = $('#esb > section.pages > article[data-id="' + id + '"]');
      if ($(element).attr('type')) {
        $(currentArticle).attr('data-pagetype',$(element).attr('type'));
        if(($(currentArticle).prev().attr('data-pagetype') === $(element).attr('type'))) {
          $(currentArticle).addClass('variation');
        }
      }

      // Section > Article > Header exist?
      if($(currentArticle).children('header').length === 0) {
        $(currentArticle).prepend('<header></header>');
      }
      $(currentArticle).children('header').html(EightShapes.Blocks.articleHeader(EightShapes.Blocks.p[id]));
      
      // Section > Article > Design exist?
      if($(currentArticle).children('section.viewport').length > 0) {
        EightShapes.Blocks.p[id].loaded = true;
      }

      // Section > Article > Aside.notes exist?
      if ($(currentArticle).children('aside.notes').length === 0) {
        $(currentArticle).children('header').after('<aside class="notes">' + articleComponentsList + '</aside>');
      } else if ($(currentArticle).children('aside.notes').children('ul.componentlist').length === 0) {
        $(currentArticle).children('aside.notes').prepend(articleComponentsList)
      }

      if(setid !== undefined) {
        if($(currentArticle).children('aside.notes').children('ul.appearsinlist').length === 0) {
          $(currentArticle).children('aside.notes').append('<h3>Appears In</h3><ul class="appearsinlist itemstack"></ul>');
        }
        $(currentArticle).children('aside.notes').children('ul.appearsinlist').append('<li>' + EightShapes.Blocks.s[setid].title + '</li>');
      }
      
    });  
  },
  registerComponent : function(elements) {

    // Summary: Register a component found in XML>COMPONENTS, the default page, or a loaded page
    // Description: Will clarify essential component properties (such as title and source), create the object, and
    //    stub out the HEADER, ARTICLE, and ASIDE.notes within BODY>SECTION.components>ARTICLE
    // Parameter: 1+ elements within a page layout or found in XML

    elements.each(function (i,element) {
      var id;
      if($(element).attr('data-component')) {
        id = $(element).attr('data-component');
      } else {
        id = $(element).attr('id');
      }
      var articleStub = false;
      if (!EightShapes.Blocks.c[id]) {
        EightShapes.Blocks.c[id] = new EightShapes.Blocks.Component(id);
      }
      if ($(element).attr('data-source')) {
        EightShapes.Blocks.c[id].source =  $(element).attr('data-source');
      }
      if (($(element).attr('data-description')) && (EightShapes.Blocks.c[id].description === "")) {
        EightShapes.Blocks.c[id].description = $(element).attr('data-description');
      }
      if (($(element).attr('data-doneness')) && (EightShapes.Blocks.c[id].doneness === "")) {
        EightShapes.Blocks.c[id].doneness = $(element).attr('data-doneness');
      }
      if (($(element).attr('title')) && (EightShapes.Blocks.c[id].title === "")) {
        EightShapes.Blocks.c[id].title = $(element).attr('title');
      }

      // Article Header 
      var articleHeader = '<header><button class="esb remove"></button><h2 class="' + EightShapes.Blocks.c[id].doneness + '">' + EightShapes.Blocks.c[id].title + '</h2><span class="description">' + EightShapes.Blocks.c[id].description + '</span></header>';

      // Article Notes Default
      var articleNotes = '<h3>Variations</h3><ul class="variationlist itemstack"></ul>';      
      // Append Notes from Component File
      if (EightShapes.Blocks.c[id].hasNotes) {
        articleNotes += EightShapes.Blocks.c[id].notes;
      }

      // Cycle through existing component ARTICLES to find the current element's ARTICLE and initialize aspects
      $('#esb > section.components > article').each(function (i,articleelement) {
        if($(articleelement).attr('data-id') === id) {
          articleStub = true;
          if($(articleelement).children('header').length === 0) {
            $(articleelement).prepend(articleHeader);
          }
          if($(articleelement).children('section.variation').length > 0) {
            EightShapes.Blocks.c[id].loaded = true;
          }
          if($(articleelement).children('aside.notes').length === 0){
            $(articleelement).append('<aside class="notes">' + articleNotes + '</aside>');
            return;
          }
          if ($(articleelement).children('aside.notes').children('ul.variationlist').length === 0) {
            $(articleelement).find('aside.notes').prepend(articleNotes);
            return;
          } 
          if (EightShapes.Blocks.c[id].hasNotes && !EightShapes.Blocks.c[id].notesLoaded) {
            $(articleelement).find('aside.notes').append(EightShapes.Blocks.c[id].notes);
            EightShapes.Blocks.c[id].notesLoaded = true;
            return;
          }
          return;
        }
      });
      if (!articleStub) {
        $('#esb > section.components').append('<article data-id="' + id + '" class="component">' + articleHeader + '<aside class="notes">' + articleNotes + '</aside></article>');
        if(EightShapes.Blocks.c[id].hasNotes) {
          EightShapes.Blocks.c[id].notesLoaded = true;
        }
      }
      EightShapes.Blocks.c[id].registered = true;
    });
  },
  addComponentsToBlock : function(blockElement) {

    // Summary: Traverses a portion of a DOM and loads & adds all not-yet-loaded components
    // Description: If a component is already available (loaded), it's added immediately.
    //    Otherwise, the system will queue the component for loading, which once complete, 
    //    will add it to the element(s) waiting for it  
    // Parameter: blockElement, An existing DOM node already loaded

    $(blockElement).find('*[data-component]').each( function(i) {
      var id = $(this).attr('data-component');
      var $component = EightShapes.Blocks.c[id];
      if ($component && $component.loaded) {
				if ($(this).hasClass('loaded') === false) {
        	EightShapes.Blocks.addComponent(this);
				}
      } else {
        if (!$component) {
          EightShapes.Blocks.c[id] = new EightShapes.Blocks.Component(id);
					if ($(this).attr('data-source')) {
						EightShapes.Blocks.c[id].source = $(this).attr('data-source');
					}
          $component = EightShapes.Blocks.c[id];
        }
        $component.locationsToAddIt.push(this);
        $component.load();
      }
    });
  },
  addComponent : function(elements) {
    
    // Summary: Clone 1+ component variations from BODY>SECTION.components into a BODY>SECTION.pages>ARTICLE layout
    // Parameter: 1+ elements within BODY>SECTION.pages>ARTICLE layouts 
    // Called by: 
    //    addComponentsToBlock (for each component in a layout that's already known to be loaded)
    //    Component.load (for when a component load is triggered, to complete the circle and get it 
    //                    – and other queued places to add that component - in their layout locations)

    $(elements).each(function(index,element) {
      var id = $(element).attr('data-component');
      var clonedComponent;
			var containingComponentArticle = false;
			var variationid = $(element).attr('data-variation');

      // Clone the Component
      if (variationid) {
        clonedComponent = $('#esb > section.components > article[data-id="' + id + '"]').find('section[data-id="' + $(element).attr('data-variation') + '"] > section.viewport').clone(true);

        // Need to add an ELSE IF for if variation can't be found
        // then append first, and if not
        // then append entire c[].html
      
      } else {
				variationid = $('#esb > section.components > article[data-id="' + id + '"]').find('section:nth-child(3)').attr('data-id');
        clonedComponent = $('#esb > section.components > article[data-id="' + id + '"]').find('section:nth-child(3) > section.viewport').clone(true);
      }

			// Remove descendent component markers and style
			$(clonedComponent).find('.component').removeClass('component').find('div.esbmarker-wrapper').remove();

      // Append Clone to Page Layout
      $(element).append($(clonedComponent).children())
				.addClass(EightShapes.Blocks.c[id].classes)														// Component class
				.addClass('loaded');																									// Designate as loaded
				
			if(EightShapes.Blocks.c[id].variations[variationid]) {
				$(element).addClass(EightShapes.Blocks.c[id].variations[variationid].classes) // Component variation class
			}
      
			// Check if its a decendant component
			containingComponentArticle = $(element).closest('#esb > section.components > article.component');
			if (containingComponentArticle && containingComponentArticle.length > 0) {
				
				// Check to see if any descendents still need to be loaded for the parent, and if not, finish the loading process for the parent
				if ($(containingComponentArticle).find('*[data-component]:not(.loaded)').length === 0) {
					EightShapes.Blocks.loadComponentJSandAddToLocations(EightShapes.Blocks.c[$(containingComponentArticle).attr('data-id')]);
				}
			}

      // Mark (single) Component that's just been added to one layout
      EightShapes.Blocks.markComponent(element);
    })
  },
  markComponent : function(componentElements) {

    // Summary: Mark a component in a page layout with the orange annotation marker and 
    // outline & add it to the Notes list
    // Parameter: componentElements, a collection of 1+ components in a BODY>SECTION.pages>ARTICLE>section.viewport
    // Description: Marks the component with a label and also embeds relevant buttons (previous/next variation, 
    //    show/hide, remove) and notations (notes available? variation id, etc)

    $(componentElements).each(function (i, element) {
      var marker = EightShapes.Blocks.m++,
      // Default values
        componentid = "",
        componentname = "[Untitled]",
        variationHTML = null,
        variationTitle = "Default";
      
      if ($(element).attr('data-component')) {
        componentid = $(element).attr('data-component');
      }

      if ($(element).attr('title')) {
        componentname = $(element).attr('title');
      } else if (EightShapes.Blocks.c[componentid]) {
        if (EightShapes.Blocks.c[componentid].title !== "") {
          componentname = EightShapes.Blocks.c[componentid].title;
        } 
      }

      if ($(element).attr('data-variation')) {
        variationHTML = $(EightShapes.Blocks.c[componentid].html)
                          .find('[data-variation='+$(element)
                          .attr('data-variation')+']');
        variationTitle = ($(variationHTML).attr('title')) ? $(variationHTML).attr('title') : $(variationHTML).attr('data-variation');
      }
      
      // Ensure Component has Component Class
      $(element).addClass('component');
      $(element).attr('data-marker', marker);

      // Add Marker to Design
      if (EightShapes.Blocks.display.markers === "on") {
        $(element).prepend(' <div class="esbmarker-wrapper"><section class="esbmarker" data-marker="' + marker + '"><div><button class="esb remove"></button><button class="esb showhide"></button>' + componentname + '</div></section></div>');

        // Notes
        if (EightShapes.Blocks.c[componentid] && 
            (EightShapes.Blocks.c[componentid].hasNotes || 
             EightShapes.Blocks.c[componentid].variationCount > 1)) {
          $(element).find('section.esbmarker > div:first-child').append('<button class="esb notes"></button>');
        }
        /* 
        $(element).find('section.esbmarker').click( function() {
          $('#esb > section').removeClass('active');
          $('#esb > section.components').addClass('active').addClass('notes');
        });
        */
        $(element).find('section.esbmarker button.showhide').click( function(event) { 
          EightShapes.Blocks.toggleComponentDisplay(event); 
          event.stopPropagation(); 
        });
        $(element).find('section.esbmarker button.remove').click( function(event) { 
          EightShapes.Blocks.removeComponent(event); 
          event.stopPropagation(); 
        });
      }
      
      // Add Marker to Notes
      var noteElement = $(element)
        .closest('article.page')
        .children('aside.notes')
        .find('ul.componentlist')
        .append('<li class="esbmarker" data-marker="' + marker + '" data-id="' + componentid + '"></li>')
        .find('li:last-child');

      $(noteElement).append('<div><button class="esb remove"></button><button class="esb showhide"></button>' + componentname + '</div>')
      $(noteElement).find('button.remove').click( function(event) { 
        EightShapes.Blocks.removeComponent(event) 
      });
      $(noteElement).find('button.showhide').click( function(event) { 
        EightShapes.Blocks.toggleComponentDisplay(event) 
      });
      $(noteElement).click( function() {
        if ($(this).attr('data-id') !== "") {
//	Function call needs to be revised based on state-machine	
//         EightShapes.Blocks.gtC($(this).attr('data-id'));
        }
      });

			// If variations exist, add Previous & Next buttons.
      if (EightShapes.Blocks.c[componentid] && 
          (EightShapes.Blocks.c[componentid].variationCount > 1)) {

        $(noteElement)
          .find('button.showhide')
          .after('<button class="esb next"></button><button class="esb previous"></button>');

        $(noteElement).find('button.previous').click(function(event) { 
          EightShapes.Blocks.previousComponent(event) 
        });

        $(noteElement).find('button.next').click(function(event) { 
          EightShapes.Blocks.nextComponent(event) 
        });
      }

    });
  },
	loadComponentJSandAddToLocations : function(component) {
    $.ajax({
      type: 'GET',
      url: EightShapes.Blocks.sourceURL(component.source) + "js/" + component.id + ".js",
      dataType: 'script',
			complete: function(data) {
        EightShapes.Blocks.addComponent(component.locationsToAddIt);
        component.loaded = true;
			} 
    });
	},

  //======================================================================================================
  // Component Interactions

  toggleComponentDisplay : function(event) {

    // Summary: Toggles the visible display of a component element in BODY>SECTION.pages>ARTICLE>section.viewport

    event.stopPropagation();

    var marker = $(event.target).closest('.esbmarker[data-marker]').attr('data-marker');
    var notesItem = $('body').find('aside.notes li[data-marker='+marker+']');
    var designItem = $('body').find('section.viewport .component[data-marker='+marker+']');

    if ($(notesItem).hasClass('hidden')) {
      $(notesItem).removeClass('hidden');
      $(designItem).slideDown(1000);
    } else {
      $(notesItem).addClass('hidden');
      $(designItem).slideUp(1000);
    }
  },
  removeComponent : function(event) {

    // Summary: Removes a component element from a BODY>SECTION.pages>ARTICLE>section.viewport

    event.stopPropagation();
    var marker = $(event.target).closest('.esbmarker[data-marker]').attr('data-marker');
    var notesItem = $('body').find('aside.notes li[data-marker='+marker+']');
    var designItem = $('body').find('section.viewport .component[data-marker='+marker+']');

    $(notesItem).slideUp(500, function() { $(this).remove() });
    $(designItem).slideUp(1000, function() { $(this).remove() });
  },
  previousComponent : function(event) {

    // Summary: From a marker in the layout or Page Notes component list, 
    // toggle between 2+ variations of a component

    var marker = $(event.target).closest('.esbmarker[data-marker]').attr('data-marker');
    var notesItem = $('body').find('aside.notes li[data-marker='+marker+']');
    var designItem = $('body').find('.component[data-marker='+marker+']');
    var componenthtml = $(EightShapes.Blocks.c[$(designItem).attr('data-component')].html);
    var variationid = $(designItem).attr('data-variation');
		
    var previousVariation;

		// Remove current variation from layout
    $(designItem).children('*:not(.esbmarker-wrapper)').remove();
    
		// Determine the previous variation to add to the layout
    if ($(componenthtml).find('*[data-variation='+variationid+']').index() > 0) {
      previousVariation = $(componenthtml).find('*[data-variation='+variationid+']').prev().clone(); 
    } else {
      previousVariation = $(componenthtml).children().parents("#variations").children(':last-child').clone();
    }

		// Add the variation to the layout
    $(designItem)
      .append($(previousVariation).children())
      .attr('data-variation',$(previousVariation).attr('data-variation'))
 
  },
  nextComponent : function(event) {

    // Summary: From a marker in the layout or Page Notes component list, 
    // toggle between 2+ variations of a component
    // Status: Worked in previous versions, not currently functional

    var marker = $(event.target).closest('.esbmarker[data-marker]').attr('data-marker');
    var notesItem = $('body').find('aside.notes li[data-marker='+marker+']');
    var designItem = $('body').find('.component[data-marker='+marker+']');
    var componenthtml = $(EightShapes.Blocks.c[$(designItem).attr('data-component')].html);
    var variationid = $(designItem).attr('data-variation');
		
    var nextVariation;

		// Remove current variation from layout
    $(designItem).children('*:not(.esbmarker-wrapper)').remove();
    
		// Determine the previous variation to add to the layout
    if ($(componenthtml).find('*[data-variation='+variationid+']').index() < EightShapes.Blocks.c[$(designItem).attr('data-component')].variationCount - 1) {
      nextVariation = $(componenthtml).find('*[data-variation='+variationid+']').next().clone(); 
    } else {
      nextVariation = $(componenthtml).children().parents("#variations").children(':first-child').clone();
    }

		// Add the variation to the layout
    $(designItem)
      .append($(nextVariation).children())
      .attr('data-variation',$(nextVariation).attr('data-variation'))
 
  },

  //======================================================================================================
  // Sets "Stuff"

  Set : function(element) {
    this.pages = [];
    this.title = ($(element).attr('title')) ? $(element).attr('title') : '[Untitled]';
    this.type = ($(element).attr('type')) ? $(element).attr('type') : 'basic';
    this.version = ($(element).attr('version')) ? $(element).attr('version') : '';
    this.description = ($(element).attr('description')) ? $(element).attr('description') : '';
    this.doneness = ($(element).attr('doneness')) ? $(element).attr('doneness') : 'notyetstarted';
    this.loaded = false;
  },
  loadSet : function(setID) {

    // Summary: Loads a set into BODY>SECTION.sets>SECTION.set by cloning from BODY>SECTION.pages>ARTICLE>section.viewport(s)
    // Status: Worked in previous versions, not currently functional

    if (EightShapes.Blocks.s[setID].pages.length > 1 && !EightShapes.Blocks.s[setID].loaded) {
      $('#esb > section.sets > section[data-id="set' + setID + '"] > header > h2').append(' <span class="count">(' + EightShapes.Blocks.s[setID].pages.length + ')</span>');
    }

    for(pagecount=0;pagecount<EightShapes.Blocks.s[setID].pages.length;pagecount++) {
      $('#esb > section.sets > section[data-id="set' + setID + '"] > article[data-id="' + EightShapes.Blocks.s[setID].pages[pagecount] + '"]')
        .append($('#esb > section.pages > article[data-id="' + EightShapes.Blocks.s[setID].pages[pagecount] + '"]').clone(true).children('section.viewport,header'));
    }
    EightShapes.Blocks.s[setID].loaded = true;
  },
  registerSet : function(elements) {
    elements.each(function (i,element) {

      EightShapes.Blocks.s[i] = new EightShapes.Blocks.Set(element);
      if ($(element).attr('pages')) {
        EightShapes.Blocks.s[i].pages = $(element).attr('pages').split(',');
      } else if ($(element).children('page').length > 0) {
        $(element).children('page').each( function(pageindex,pageelement) {
          EightShapes.Blocks.s[i].pages[pageindex] = $(pageelement).attr('id');
        });
      } else {
        // What happens if no pages exist?
      }

      $('#esb > section.sets').append('<section data-id="set' + i + '" class="set"><header></header></section>')
//      $('#esb > section.sets > section[data-id="set' + i + '"] > header').html(EightShapes.Blocks.articleHeader(EightShapes.Blocks.s[i])).after(EightShapes.Blocks.asideToolbarMarkup());

      for(pagecount=0;pagecount<EightShapes.Blocks.s[i].pages.length;pagecount++) {
        $('#esb > section.sets > section[data-id="set' + i + '"]')
          .append('<article class="page" data-id="' + EightShapes.Blocks.s[i].pages[pagecount] + '"></article>');
        EightShapes.Blocks.registerPage($('#esb > section.sets > section[data-id="set' + i + '"] > article.page:last-child'),i);
      }
      
    })
  },

  //======================================================================================================
	// Device Profiles

	registerDeviceProfiles : function(profiles) {
		
		// Summary: Register zero or more device profiles from XML into the toolbar and default to the first device/orientation
		
    $('head').append('<link rel="stylesheet" href="blocks/css/blocks-devices.css"></link>');
		profiles.each( function(i,profile) {
			if (i === 0) {
				EightShapes.Blocks.deviceMenuMarkup(profile);
			}
			var newDevice = $('#esb > section.pages > menu > div.deviceprofiles > ul').append('<li>' + $(profile).attr('name') + '</li>').children().last();
			$(newDevice).attr('data-value',$(profile).attr('value'));
			if ($(profile).attr('orientationToggle') === "on") {
				$(newDevice).attr('data-orientationToggle','on');
				if ($(profile).attr('orientationDefault') === "landscape") {
					$(newDevice).attr('data-currentOrientation','landscape');
				} else {
					$(newDevice).attr('data-currentOrientation','portrait');
				}
			} else {
				$(newDevice).attr('data-orientationToggle','off');
			};
			if (i === 0) {
				EightShapes.Blocks.setDeviceProfile(newDevice);
			}
		});
	},
	deviceMenuMarkup : function(profile) {
  
		// Summary: Generate the markup for the device and orientation menus
  
		$('#esb > section > menu')
		  .append('<div class="deviceprofiles dropdown"><button class="selectionCurrent">' + $(profile).attr('name') + '</button><ul></ul></div>')
		  .append('<div class="deviceorientation dropdown"><button class="selectionCurrent">Portrait</button><ul><li data-value="Portrait">Portrait</li><li data-value="Landscape">Landscape</li></ul></div>')
		$('#esb > section.pages > menu > div.deviceprofiles').after('<span class="controlset orientationtoggle"><button class="portrait active">Portrait</button><button class="landscape">Landscape</button></span>');
  },
	setDeviceProfile : function(option) {
		$('#esb > section.pages > menu > div.deviceprofiles > ul > li').each( function(i,profile) {
			$('body#esb').removeClass($(profile).attr('data-value'));
		})
		$('body#esb').addClass($(option).attr('data-value'));
		if ($(option).attr('data-orientationToggle') === "on") {
			EightShapes.Blocks.setDeviceOrientation($(option).attr('data-currentOrientation'))
			$('#esb > section.pages > menu > div.deviceorientation').show();
		} else {
			$('#esb').removeClass('portrait landscape').find('section.pages > menu > div.deviceorientation').hide();
		}
		
	},
	setDeviceOrientation : function(orientation) {
		if (orientation === "landscape") { 
			$('#esb > section.pages > menu > div.deviceorientation > button.selectionCurrent').html('Landscape');
		} else {
			$('#esb > section.pages > menu > div.deviceorientation > button.selectionCurrent').html('Portrait');
		}
		$('#esb').removeClass('portrait landscape').addClass(orientation.toLowerCase());
	},

  //======================================================================================================
	// Maps

	registerMap : function(maps) {
	  if(($('#esb > section.maps').length === 0) && ($(maps).length > 0)) {
	    $('#esb').append('<section class="maps" data-section="maps"><header><h2>Maps</h2></header></section>');
	    $('#esb > section.maps').append('<menu><button class="addmap">Add Map</button></menu>');
//	    $('body > header > nav > ul').prepend('<li class="maps" data-view="maps">Maps</a></li>')
	  }
	},
	displayMap : function() {
	},
	newMap : function() {
	},
	generateMapXML : function() {
	},
	zoomMap : function() {
	},
	
  //======================================================================================================
  // Utilities

  view : function() {
    
    // Summary: Flushes all view-controlling classes from top-level elements (BODY>SECTION, ARTICLES within, etc),
    //    then sets the appropriate class combinations to create the requested view. Also accounts for back button.

    var article;

    // Determine Current View
    var view = $.bbq.getState( "view" );
    var id = $.bbq.getState( "id" );

    // Discard links within prototype pages 
    // (links containing a hash tag will tigger hashchange).
    // https://github.com/EightShapes/Blocks/issues/7
    if (view == undefined && id == undefined) {
      return false;
    }
    
    // Flush View Classes
    $('body').removeClass('fullscreen esb-home');
    $('body > header > nav > ul > li').removeClass('active');
    $('body > section').removeClass('active notes grid list thumbnail').attr('style','');
    $('body > section > article').removeClass('active list thumbnail grid inlineflow').attr('style','').children('section.viewport').attr('style','');

    // Set View Classes for Current View
    switch (view) {
			case "home":
				$('body').addClass('esb-home');
				$('body > section.home').addClass('notes');
				$('body > section.pages').addClass('list');
				$('body > section.components').addClass('list');
        EightShapes.Blocks.display.lastView = "home";
        EightShapes.Blocks.display.lastViewID = "";
        if(!EightShapes.Blocks.home.loaded) {
          EightShapes.Blocks.home.load();
        }
				break;
      case "pages":
        $('body > header > nav > ul > li.pages').addClass('active');
				$('body > section.pages').addClass('active');
				$('body > section.pages').addClass(EightShapes.Blocks.display.currentDisplayMode);
        EightShapes.Blocks.display.lastView = "pages";
        EightShapes.Blocks.display.lastViewID = "";
	      for(pageid in EightShapes.Blocks.p) {
	        if(!EightShapes.Blocks.p[pageid].loaded) {
	          EightShapes.Blocks.p[pageid].load();
	        }
	      }
        break;
      case "page":
        $('body > header > nav > ul > li.pages').addClass('active');
        $('body > section.pages').addClass('active notes');
        $('body > section.pages > article[data-id="' + id + '"]').addClass('active')
        EightShapes.Blocks.display.lastView = "page";
        EightShapes.Blocks.display.lastViewID = id;
        if(!EightShapes.Blocks.p[id].loaded) {
          EightShapes.Blocks.p[id].load();
        }
        break;
      case "components":
        $('body > header > nav > ul > li.components').addClass('active');
        $('body > section.components').addClass('active grid');
        EightShapes.Blocks.display.lastView = "components";
        EightShapes.Blocks.display.lastViewID = "";
	      for(componentid in EightShapes.Blocks.c) {
	        if(!EightShapes.Blocks.c[componentid].loaded) {
	          EightShapes.Blocks.c[componentid].load();
	        }
	      }
        break;
      case "component":
        $('body > header > nav > ul > li.components').addClass('active');
        $('body > section.components').addClass('active notes')
        $('body > section.components > article[data-id="' + id + '"]').addClass('active')
          .children('section.variation').each( function(i,element) {
            $(element).css('width','').css('height','')
            $(element).css('width',($(element).find('section.viewport').width()/1.25+10)+'px');
            $(element).css('height',($(element).find('section.viewport').height()/1.25+60)+'px');
          });
        EightShapes.Blocks.display.lastView = "component";
        EightShapes.Blocks.display.lastViewID = id;
        if(!EightShapes.Blocks.c[id].loaded) {
          EightShapes.Blocks.c[id].load();
        }
        break;
      case "fullscreen":
        $('body').addClass('fullscreen');
        $('body > section.pages').addClass('active');
        $('body > section.pages > article[data-id="' + id + '"]').addClass('active');
        if(!EightShapes.Blocks.p[id].loaded) {
          EightShapes.Blocks.p[id].load();
        }
        break;
			case "maps":
				$('body > header > nav > ul > li.maps').addClass('active');
				$('body > section.maps').addClass('active');
				EightShapes.Blocks.display.lastView = "maps";
				EightShapes.Blocks.display.lastViewID = "";
				break;
    }
  },
  setDisplayPreferences : function(XMLconfig) {

    // Summary: Read the XML and update any preferences based on what's included

    if($(XMLconfig).find('display > property[name="componentcontainer"]')) {
      EightShapes.Blocks.display.componentcontainer = $(XMLconfig).find('display > property[name="componentcontainer"]').attr('value');
    }
    if(($(XMLconfig).find('display > property[name="markers"]').attr('value') === "true") || ($(XMLconfig).find('display > property[name="markers"]').attr('value') === "on")) {
			EightShapes.Blocks.display.markers = "on";
		} else {
			EightShapes.Blocks.display.markers = "off";
			$('body#esb > section.pages > menu > button.markers').remove();
		}
    if(($(XMLconfig).find('display > property[name="homepage"]').attr('value') === "on") || (EightShapes.Blocks.display.homepage === "on")) {
			EightShapes.Blocks.display.homepage = "on";
			$('body#esb > header > nav.primary > ul')
				.prepend('<li class="home" data-view="home"></li>');
			if($('body').children('section.home').length === 0) {
				$('body').append('<section class="home"></section>');
			}
		}
    if(($(XMLconfig).find('display > property[name="toolbar"]').attr('value') === "true") || ($(XMLconfig).find('display > property[name="toolbar"]').attr('value') === "on")) {
			EightShapes.Blocks.display.toolbar = "on";		
		} else {
			EightShapes.Blocks.display.toolbar = "off";
			$('body#esb > section.pages > menu').hide();
			if (EightShapes.Blocks.display.markers === "on") {
				$('body').addClass('markers');
			}
		}
    if($(XMLconfig).find('display > property[name="toolbarlocation"]').attr('value')) {
			switch ($(XMLconfig).find('display > property[name="toolbarlocation"]').attr('value')) {
				case "topleft":
					$('body#esb > section.pages > menu').attr('class','topleft');
					break;
				case "topright":
					$('body#esb > section.pages > menu').attr('class','topright');
					break;
				case "bottomleft":
					$('body#esb > section.pages > menu').attr('class','bottomleft');
					break;
				case "bottomright":
					$('body#esb > section.pages > menu').attr('class','bottomright');
					break;
				default:
					$('body#esb > section.pages > menu').attr('class','topright');
					break;
			}
		}
  },
  setPrototypeMetadata : function(XMLconfig) {

    // Summary: Read the XML and setup the prototype metadata (author, title, etc)

    // ESB Header Title 
    EightShapes.Blocks.metadata.title = $(XMLconfig).find('metadata').attr('title');
    $('body > header').append('<h1>' + EightShapes.Blocks.metadata.title + '</h1><dl></dl>');
    
    // ESB Header Metadata
    EightShapes.Blocks.metadata.version = $(XMLconfig).find('metadata > version').attr('number');
    EightShapes.Blocks.metadata.author = $(XMLconfig).find('metadata > author').attr('name');
    EightShapes.Blocks.metadata.versiondate = $(XMLconfig).find('metadata > version').attr('date');
    EightShapes.Blocks.metadata.client = $(XMLconfig).find('metadata > client').attr('name');
    $('body > header > dl')
      .append('<dt>Version</dt> <dd>' + EightShapes.Blocks.metadata.version + '</dd> ')
      .append('<dt>by</dt> <dd>' + EightShapes.Blocks.metadata.author + '</dd> ')
      .append('<dt>on</dt> <dd>' + EightShapes.Blocks.metadata.versiondate + '</dd> ')
      .append('<dt>for</dt> <dd>' + EightShapes.Blocks.metadata.client + '</dd> ')
  },
  menuMarkup : function(blocksSection) {

    // Summary: Centralize the markup added for toolbar sliders, buttons, etc

		if($(blocksSection).hasClass('pages')) {
    	$(blocksSection).prepend('<menu><span class="controlset  viewas"><button class="list active">List</button><button class="thumbnail">Thumbnail</button><button class="grid">Grid</button></span><button class="exitfullscreen">Exit Full Screen</button><button class="markers">Markers</button><button class="previous">Previous</button><button class="next">Next</button></menu>');
		} else {
			$(blocksSection).prepend('<menu></menu>');
		}

		// Sliders HTML <span class="controlset sizeslider"><h3>Size</h3><span class="icon small"></span><div class="esbgallerysize" style="width: 100px;"></div><span class="icon large"></span></span><span class="controlset heightslider"><h3>Height</h3><span class="icon short"></span><div class="esbgalleryaspectratio" style="width: 100px;"></div><span class="icon tall"></span></span>

  },
  articleHeader : function(item) {

    // Summary: Adds simple markup inside HEADER of an article in BODY>SECTION.pages, 
    // including buttons, labels, and more
    // Called by: registerPage
    // Preconditions: ARTICLE>HEADER exists

    if (EightShapes.Blocks.display.toolbar) {
      return '<button class="fullscreen"></button><h2 class="' + item.doneness + '" data-view="' + item.id + '">' + item.title + '</h2><span class="version">' + item.version + '</span><span class="description">' + item.description + '</span>';
    } else {
      return '';
    }
    
  },
  sourceURL : function(type) {
    switch(type) {
    case "library":
      return "library/components/";
    case "project":
      return "components/";
    default:
      return "components/";
    }
  },
  keyboardshortcuts : function(event) {
    var currentView = $.bbq.getState( "view" ) ? $.bbq.getState( "view" ) : "fullscreen";
    if (event.altKey) {
      if (event.shiftKey) {
      switch(event.keyCode) {
        case 77: // M
          ($('body').hasClass('markers')) ? $('body').removeClass('markers') : $('body').addClass('markers');
          break;
        case 39: // ALT ARROW >
          if ($('body#esb > section.pages.active.notes') || $('body#esb.fullscreen')) {
            var currentPage = $('#esb > section.pages > article.page.active');
            if($(currentPage).next().is('article')) {
              if(!EightShapes.Blocks.p[$(currentPage).next().attr('data-id')].loaded) {
                EightShapes.Blocks.p[$(currentPage).next().attr('data-id')].load();
              }
              $.bbq.pushState({view: currentView, id:$(currentPage).next().attr('data-id')});
            }
          }
          break; 
        case 37: // ALT ARROW <
          if ($('body#esb > section.pages.active.notes') || $('body#esb.fullscreen')) {
            var currentPage = $('#esb > section.pages > article.page.active');
            if($(currentPage).prev().is('article')) {
              $.bbq.pushState({view: currentView, id:$(currentPage).prev().attr('data-id')});
            }
          }
          break; 
      } 
      }
    }
  },
  containComponent : function(id,variationid) {

    // Summary: Adds a class to component variations for "customizeable width displays" 
    // within Component Grids and Notes
		if (variationid && EightShapes.Blocks.c[id].variations[variationid].container) {
			return EightShapes.Blocks.c[id].variations[variationid].container;
		} else if (EightShapes.Blocks.c[id].container) {
			return EightShapes.Blocks.c[id].container;
		} else {
			return EightShapes.Blocks.display.componentcontainer;
		}
  }

};

$(document).ready(function(){
  EightShapes.Blocks.init();

  $(window).bind( "hashchange", function(e) {
    EightShapes.Blocks.view();
  })

  $(document).keydown(function (event) {
    EightShapes.Blocks.keyboardshortcuts(event);
  });
});
