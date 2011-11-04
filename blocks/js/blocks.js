var ESB = {

	// Set Display Settings (MOVE CONFIGURATION TO PROJECT FILE)

  display : {
		toolbar : true,
		markers : true,
		markeractions: true,
		ids : false,
		library : false,
		projects : true,
		homepage : false,
		aspectratio : 1.25,
		galleryscale : 0.2,
		componentcontainer : "ESBcomponentcontainer",
		lastView : "pages", // or "pages","components","activepage","activecomponent"
		lastViewID : ""
	},

	// Initializing

	v : {},															// versions
	p : {},															// pages
	c : {},															// components
	s : {},															// sets
	m : 0,															// markers, as an index increment
	pc : 0,
	metadata : {},
	setDisplayPreferences : function(XMLconfig) {
		if($(XMLconfig).find('display > property[name="componentcontainer"]')) {
			ESB.display.componentcontainer = $(XMLconfig).find('display > property[name="componentcontainer"]').attr('value');
		}
		($(XMLconfig).find('display > property[name="markers"]').attr('value') === "false") ? ESB.display.markers = false : ESB.display.markers = true;
		($(XMLconfig).find('display > property[name="toolbar"]').attr('value') === "false") ? ESB.display.toolbar = false : ESB.display.toolbar = true;
	},
	setPrototypeMetadata : function(XMLconfig) {
		// ESB Header Title 
		ESB.metadata.title = $(XMLconfig).find('metadata').attr('title');
		$('body > header').append('<h1>' + ESB.metadata.title + '</h1><dl></dl>');
		
		// ESB Header Metadata
		ESB.metadata.version = $(XMLconfig).find('metadata > version').attr('number');
		ESB.metadata.author = $(XMLconfig).find('metadata > author').attr('name');
		ESB.metadata.versiondate = $(XMLconfig).find('metadata > version').attr('date');
		ESB.metadata.client = $(XMLconfig).find('metadata > client').attr('name');
		$('body > header > dl')
			.append('<dt>Version</dt> <dd>' + ESB.metadata.version + '</dd> ')
			.append('<dt>by</dt> <dd>' + ESB.metadata.author + '</dd> ')
			.append('<dt>on</dt> <dd>' + ESB.metadata.versiondate + '</dd> ')
			.append('<dt>for</dt> <dd>' + ESB.metadata.client + '</dd> ')
	},
	init : function() {

		var componentid;
		
		// Add Additional Style Sheets to Header
		$('head').prepend('<link rel="stylesheet" href="blocks/css/blocks.css"></link>');
		$('head').append('<link rel="stylesheet" href="blocks/css/ui-lightness/jquery-ui-1.8.6.custom.css" />');

		// Error Check Markup and Setup Overall DOM
		if (!ESB.markupCore()) return false;

		$.get('_config.xml', function(XMLconfig) {
			
			ESB.setDisplayPreferences(XMLconfig);
			ESB.setPrototypeMetadata(XMLconfig);
			
			// Identify and ID Current Page's Article
			var hrefsplit = window.location.href.split('/');
			ESB.metadata.currentpageid = hrefsplit[hrefsplit.length-1].substr(0,hrefsplit[hrefsplit.length-1].length-5);
			$('#esb > section.pages > article').attr('data-id',ESB.metadata.currentpageid);
			ESB.rP($('#esb > section.pages > article.active'));

			// Register Pages, Components, and Sets from XML to ESB.p
			ESB.rP($(XMLconfig).find('pages > page'));
			ESB.rC($(XMLconfig).find('components > component'));
			ESB.rS($(XMLconfig).find('sets > set'));
			
			// Mark Embedded Components in Current Page
			ESB.mC($('#esb > section.pages > article.active > section.design > *.component'));
			ESB.aAtP($('#esb > section.pages > article.active > section.design'));
			
		});

		// Live Functions for Blocks Navigation
		
		// Click Component Title > Go To Component Notes
		$('#esb > section.components > article > header > h2').live('click', function() {
			$.bbq.pushState({view:"component", id:$(this).closest('article').attr('data-id')});
		})
		// Click Page Title > Go To Page Notes
		$('#esb > section.pages > article > header > h2').live('click', function() {
			$.bbq.pushState({view:"page", id:$(this).closest('article').attr('data-id')});
		})
		// Control Mode of Section Grid/List/Thumbnails
		// Notes Component List Hovers
		$('#esb > section.pages > article.page > aside.notes ul.componentlist li').live('mouseover',function() {
			$(this).closest('article.page').find('section.design  section[data-marker='+$(this).attr('data-marker')+']').closest('.component').addClass('highlight');
		});
		$('#esb > section.pages > article.page > aside.notes ul.componentlist li').live('mouseout', function() {
			$(this).closest('article.page').find('section.design  section[data-marker='+$(this).attr('data-marker')+']').closest('.component').removeClass('highlight');
		});
		// Go From Article (Page, Component) to Main Section (Pages, Components)
		$('#esb > section.active.selected > header > h2, #esb > section.active.notes > header > h2').live('click', function() {
			$('#esb > header > nav.primary > ul > li.' + $(this).children('h2').html().toLowerCase()).click();
		});
		// Go From Article to Article
		$('#esb > section > menu > button.next').live('click', function() {
			var currentPage = $('#esb > section.pages > article.page.active');
			if($(currentPage).next().is('article')) {
				if($('#esb').hasClass('fullscreen')) {
					$.bbq.pushState({view:"fullscreen",id:$(currentPage).next().attr('data-id')});
				} else {
					$.bbq.pushState({id:$(currentPage).next().attr('data-id')});
				}
			}
		})
		$('#esb > section > menu > button.previous').live('click', function() {
			var currentPage = $('#esb > section.pages > article.page.active');
			if($(currentPage).prev().is('article')) {
				$.bbq.pushState({view:"page", id:$(currentPage).prev().attr('data-id')});
			}
		})
		$('#esb > section > menu > button.markers').live('click', function() {
			($('body').hasClass('markers')) ? $('body').removeClass('markers') : $('body').addClass('markers');
		})
		$('#esb > section.pages > article > header > button.fullscreen').live('click', function() {
			$.bbq.pushState({view:"fullscreen", id:$(this).closest('article').attr('data-id')});
		})
		$('#esb > section > menu > button.exitfullscreen').live('click', function() {
			$.bbq.pushState({ view : ESB.display.lastView, id : ESB.display.lastViewID });
			for(componentid in ESB.c) {
				if(!ESB.c[componentid].loaded) {
					ESB.lC($('<div data-component="' + componentid + '"></div>'));
				}
			}
			for(pageid in ESB.p) {
				if(!ESB.p[pageid].loaded) {
					ESB.lP(pageid);
				}
			}
		})
		$('#esb > section > menu > span.viewas > button').live('click', function() {
			$(this).addClass('active').siblings().removeClass('active');
			$('#esb > section.active')
				.removeClass('list grid thumbnail notes').attr('style','').addClass($(this).html().toLowerCase())
				.children('article').attr('style','').children('section.design').attr('style','');

			$('#esb > section.components.active.grid > article > section.variation:nth-child(3)').each( function(i,element) {
				$(element).css('width',($(element).find('section.design').width()/2+10)+'px');
				$(element).css('height',($(element).find('section.design').height()/2+60)+'px');
				$(element).parent().css('height',($(element).find('section.design').height()/2+75)+'px');
			});
		})
	},

	// Constructors

	C : function() {										// Component ESB Constructor
		this.loadStarted = false;
		this.loaded = false;
		this.locationsToAddIt = [];
		this.type = "component";
		this.html = "";
		this.title = "";
		this.variationCount = 1;
		this.hasNotes = false;
		this.notes = "";
		this.notesLoaded = false;
		this.registered = false;
		this.doneness = "";
		this.description = "";
		this.container = "";
	},	
	P : function() {										// Page ESB Constructor
		this.loaded = false;
		this.html = "";
		this.type = "page";
		this.title = "[untitled]";
		this.doneness = "unknown";
		this.description = "";
		this.index = ESB.pc++;
	},
	S : function(element) {							// Set ESB Constructor
		this.pages = [];
		this.title = ($(element).attr('title')) ? $(element).attr('title') : '[Untitled]';
		this.type = ($(element).attr('type')) ? $(element).attr('type') : 'basic';
		this.version = ($(element).attr('version')) ? $(element).attr('version') : '';
		this.description = ($(element).attr('description')) ? $(element).attr('description') : '';
		this.doneness = ($(element).attr('doneness')) ? $(element).attr('doneness') : 'notyetstarted';
		this.loaded = false;
	},

	// Loading & Constructing

	markupCore : function() {
		if ($('body > .design').length < 1) {
			alert('EightShapes Blocks will not function without <section class="design">');
			return false;
		}
		$('body')
			.attr('id','esb').addClass('fullscreen')
			.wrapInner('<section class="pages active" data-section="pages"><article class="page active"></article></section>')
			.append('<section class="components" data-section="components"><header><h2>Components</h2></header></section>');
		$('#esb > section.pages').prepend(ESB.menuMarkup());

		// Grid's Page Sizing
		$('body > section > menu > span.sizeslider > div.esbgallerysize').slider({
			value:0.2,
			min:0.15,
			max:0.4,
			step: 0.01,
			slide: function(event,ui) {
				ESB.display.galleryscale = ui.value
				$('#esb > section.pages > article')
					.css('width',1000*ESB.display.galleryscale)
					.css('height',1000*ESB.display.aspectratio*ESB.display.galleryscale+50);
				$('#esb > section.pages > article > section.design')
					.css('-moz-transform','scale('+ESB.display.galleryscale+')')
					.css('-webkit-transform','scale('+ESB.display.galleryscale+')')
					.css('height',960*ESB.display.aspectratio);
			}
		})
		$('body > section > menu > span.heightslider > div.esbgalleryaspectratio').slider({
			value:1.25,
			min:0.6,
			max:2.0,
			step:0.05,
			slide: function(event,ui) {
				ESB.display.aspectratio = ui.value;
				$('#esb > section.pages > article')
					.css('width',1000*ESB.display.galleryscale)
					.css('height',1000*ESB.display.aspectratio*ESB.display.galleryscale+50);
				$('#esb > section.pages > article > section.design')
					.css('-moz-transform','scale('+ESB.display.galleryscale+')')
					.css('-webkit-transform','scale('+ESB.display.galleryscale+')')
					.css('height',960*ESB.display.aspectratio);
			}
		})

		$('body').prepend('<header><nav class="primary"><ul></ul></nav></header>');
		$('body > header > nav > ul')
			.append('<li class="pages" data-view="pages">Pages</a></li>')
			.append('<li class="components" data-view="components">Components</a></li>')

		$('body > header > nav.primary > ul > li').click( function() {
			$.bbq.pushState({view:$(this).attr("data-view"),id:"n/a"});
			return false;
		})

		return true;
	},
	hI : function(item) {								// Return an Article Header from an ESB Collection ID
		if (ESB.display.toolbar) {
			return '<button class="fullscreen"></button><h2 class="' + item.doneness + '" data-view="' + item.id + '">' + item.title + '</h2><span class="version">' + item.version + '</span><span class="description">' + item.description + '</span>';
		} else {
			return '';
		}
		
	},
	lP : function(pageID) {							// Load Page from File to ESB
		var pageArticle = $('body > section.pages > article[data-id=' + pageID + ']').append('<section class="design"></section>');
		$.get(pageID+".html", function(results) {
			results = "<div>" + results + "</div>";
			ESB.p[pageID].html = results;
			ESB.p[pageID].design = $(results).children('.design').children();
			ESB.p[pageID].designclasses = $(results).children('.design').attr('class');
			ESB.p[pageID].notes = $(results).children('aside.notes').children();
			ESB.p[pageID].loaded = true;
			$('#esb > section.pages > article[data-id=' + pageID + '] > section.design').append($(ESB.p[pageID].design)).addClass(ESB.p[pageID].designclasses);
			$('#esb > section.pages > article[data-id=' + pageID + '] > aside.notes').append($(ESB.p[pageID].notes));
			ESB.mC($('#esb > section.pages > article[data-id=' + pageID + '] > section.design > *.component'));
			ESB.aAtP($('#esb > section.pages > article[data-id=' + pageID + '] > section.design'));
		})
	},
	rP : function(elements,setid) {			// Register Page from XML to ESB, add Article Stub
		var loadedPageID = $('#esb > section.pages > article.active').attr('data-id');
		var reachedLoadedPageYet = false;
		
		elements.each(function (i,element) {
			
			var currentArticle = "";
			var id = $(element).attr('id');
			if ( $(element).attr('data-id')) {
				currentArticle = element;
				id = $(element).attr('data-id');
			}
			if(id === loadedPageID) {
				reachedLoadedPageYet = true;
			}

			// ESB Page exist?
			
			if (!ESB.p[id]) {
				ESB.p[id] = new ESB.P();
			}
			
			// Update with Properties from Element Provided
			
			if ($(element).attr('doneness')) {
				ESB.p[id].doneness = $(element).attr('doneness');
			} 
			if ($(element).attr('description')) {
				ESB.p[id].description = $(element).attr('description');
			} 
			if ($(element).attr('title')) {
				ESB.p[id].title = $(element).attr('title');
			}
			
			// ARTICLE Empty Components List
			
			var articleComponentsList = '<h3>Components</h3><ul class="componentlist itemstack"></ul>';			

			// Section > Article exist?
			
			if ($('#esb > section.pages > article[data-id=' + id + ']').length === 0) {
				if (reachedLoadedPageYet) {
					$('#esb > section.pages').append('<article data-id="' + id + '" class="page"></article>');
				} else {
					$('#esb > section.pages > article.active').before('<article data-id="' + id + '" class="page"></article>');
				}
			}

			currentArticle = $('#esb > section.pages > article[data-id=' + id + ']');
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
			$(currentArticle).children('header').html(ESB.hI(ESB.p[id]));
			
			// Section > Article > Design exist?
			if($(currentArticle).children('section.design').length > 0) {
				ESB.p[id].loaded = true;
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
				$(currentArticle).children('aside.notes').children('ul.appearsinlist').append('<li>' + ESB.s[setid].title + '</li>');
			}
			
		});	
	},
	dP : function(setID,pageID) {				// Delete Page from Set
		
	},	
	cPfS : function(setID) {						// Clone Pages into Set
		
	},
	aAtP : function(pageElement) {			// Add Components to Pages
		var pageID = $(pageElement).parent().attr('data-id')
		$(pageElement).find('*[data-component]').each( function(i) {
			var id=$(this).attr('data-component');
			if(ESB.c[id] && ESB.c[id].loaded) {
				ESB.aC(this);
			} else {
				if (!ESB.c[id]) {
					ESB.c[id] = new ESB.C();
				}
				ESB.c[id].locationsToAddIt.push(this);
				ESB.lC(this);
			}
		});
	},
	rC : function(elements) {						// Register Component into ESB (from XML OR file load), add Item to Section
		elements.each(function (i,element) {
			var id;
			if($(element).attr('data-component')) {
				id = $(element).attr('data-component');
			} else {
				id = $(element).attr('id');
			}
			var articleStub = false;
			if (!ESB.c[id]) {
				ESB.c[id] = new ESB.C();
			}
			if (($(element).attr('data-description')) && (ESB.c[id].description === "")) {
				ESB.c[id].description = $(element).attr('data-description');
			}
			if (($(element).attr('data-doneness')) && (ESB.c[id].doneness === "")) {
				ESB.c[id].doneness = $(element).attr('data-doneness');
			}
			if (($(element).attr('title')) && (ESB.c[id].title === "")) {
				ESB.c[id].title = $(element).attr('title');
			}

			// Article Header 
			var articleHeader = '<header><button class="esb remove"></button><h2 class="' + ESB.c[id].doneness + '">' + ESB.c[id].title + '</h2><span class="description">' + ESB.c[id].description + '</span></header>';

			// Article Notes Default
			var articleNotes = '<h3>Variations</h3><ul class="variationlist itemstack"></ul>';			
			if (ESB.c[id].hasNotes) {
				articleNotes += ESB.c[id].notes;
			}

			$('#esb > section.components > article').each(function (i,articleelement) {
				if($(articleelement).attr('data-id') === id) {
					articleStub = true;
					if($(articleelement).children('header').length === 0) {
						$(articleelement).prepend(articleHeader);
					}
					if($(articleelement).children('section.variation').length > 0) {
						ESB.c[id].loaded = true;
					}
					if($(articleelement).children('aside.notes').length === 0){
						$(articleelement).append('<aside class="notes">' + articleNotes + '</aside>');
						return;
					}
					if ($(articleelement).children('aside.notes').children('ul.variationlist').length === 0) {
						$(articleelement).find('aside.notes').prepend(articleNotes);
						return;
					} 
					if (ESB.c[id].hasNotes && !ESB.c[id].notesLoaded) {
						$(articleelement).find('aside.notes').append(ESB.c[id].notes);
						ESB.c[id].notesLoaded = true;
						return;
					}
					return;
				}
			});
			if (!articleStub) {
				$('#esb > section.components').append('<article data-id="' + id + '" class="component">' + articleHeader + '<aside class="notes">' + articleNotes + '</aside></article>');
				if(ESB.c[id].hasNotes) {
					ESB.c[id].notesLoaded = true;
				}
			}
			ESB.c[id].registered = true;
		});
	},
	aC : function(element) {						// Add Component Variations from ESB to Item in Components Section
    $(elements).each(function(index, element) {
		  var id = $(element).attr('data-component');
		  var clonedComponent;

		  // Clone the Component
      if ($(element).attr('data-variation')) {
        clonedComponent = $('#esb > section.components > article[data-id=' + id + ']').find('section[data-id=' + $(element).attr('data-variation') + '] > section.design').clone(true);

        // Need to add an ELSE IF for if variation can't be found
        // then append first, and if not
        // then append entire c[].html
        
      } else {
        clonedComponent = $('#esb > section.components > article[data-id=' + id + ']').find('section:nth-child(3) > section.design').clone(true);
      }
      
      // Append Clone to Page Layout
      $(element).append($(clonedComponent).children()).addClass('loaded');

      // Class Component within Page Layout
      if (ESB.c[id].classes) {
        $(element).addClass(ESB.c[id].classes);
      }
      ESB.mC(element);
    });
	},
	lC : function(element) {						// Load Component from File to ESB
		var id=$(element).attr('data-component');
		var source = ($(element).attr('data-source')) ? $(element).attr('data-source') : "project";
		if(ESB.c[id].loadStarted) return false;
		ESB.c[id].loadStarted = true;
		$.get( ESB.sourceURL(source)+id+".html", function(results) {
			results = "<div>" + results + "</div>";
			ESB.c[id].id 							= id;
			ESB.c[id].header 					= $(results).children('header').attr('id',id);
			ESB.c[id].html						= $(results).children('#variations');
			ESB.c[id].notes						= $(results).children('aside.notes').html();
			ESB.c[id].title 					= $(results).children('header').attr('title');
			ESB.c[id].classes					= $(results).children('header').attr('class');
			ESB.c[id].container				= $(results).children('header').attr('data-container');
			ESB.c[id].hasNotes				= ($(results).children('aside.notes').length > 0);
			ESB.c[id].variationCount	= $(results).children('article#variations').children().length;
			if (ESB.c[id].variationCount > 1 && !ESB.c[id].loaded) {
				$('#esb > section.components > article[data-id=' + id + '] > header > h2').append(' <span class="count">(' + ESB.c[id].variationCount + ')</span>');
			}
			ESB.rC(ESB.c[id].header);
			if($('#esb > section.components > article[data-id=' + id + '] > section.variation').length === 0) {
				$(ESB.c[id].html).children('section[data-variation]').each( function(index,element) {
					var variationid = $(this).attr('data-variation');
					var variationtitle = $(this).attr('title');
					$('#esb > section.components > article[data-id=' + id + ']')
						.append('<section class="variation ' + ESB.containC(id) + '" data-id="' + variationid + '" ><header><h3>' + variationtitle + '</h3></header>' + 
						 	'<section class="design ' + ESB.c[id].classes + '">' + $(this).html() + '</section></section>')
						.children('aside.notes').find('ul.variationlist').append('<li data-variationid="' + variationid + '">' + variationtitle + '</li>');	
				})
			}

			// Load Component-Specific CSS
			if(!ESB.c[id].cssloaded) {
				$('head').append('<link rel="stylesheet" href="' + ESB.sourceURL(source)+"css/"+id+".css" + '" />');
				ESB.c[id].cssloaded = true;
			}
			
			// Load - And Bind - Component-Specific JavaScript
			$.ajax( {
				type: 'GET',
				url: ESB.sourceURL(source)+"js/"+id+".js",
				dataType: 'script',
				success: function(data) {
					ESB.c[id].loaded = true;
					ESB.aC(ESB.c[id].locationsToAddIt);
				},
				error: function(data) {
					ESB.c[id].loaded = true;
					ESB.aC(ESB.c[id].locationsToAddIt);
				}
			});	
		});
	},
	mC : function(componentElements) {	// Mark Component in Page Design and Notes
		$(componentElements).each( function (i,element) {
			var marker = ESB.m++;
			
			var componentid = "";
			var componentname = "[Untitled]";
			var variationTitle = "Default";
			
			if ($(element).attr('data-component')) {
				componentid = $(element).attr('data-component');
			}
			if ($(element).attr('title')) {
				componentname = $(element).attr('title');
			} else if (ESB.c[componentid]) {
				if (ESB.c[componentid].title !== "") {
					componentname = ESB.c[componentid].title;
				} 
			}
			if ($(element).attr('data-variation')) {
				var variationHTML = $(ESB.c[componentid].html).find('[data-variation='+$(element).attr('data-variation')+']');
				variationTitle = ($(variationHTML).attr('title')) ? $(variationHTML).attr('title') : $(variationHTML).attr('data-variation');
			}
			
			// Ensure Component has Component Class
			$(element).addClass('component');
			
			// Add Marker to Design
			if(ESB.display.markers) {
				$(element).prepend(' <div class="esbmarker-wrapper"><section class="esbmarker" data-marker="' + marker + '"><div><button class="esb showhide"></button><button class="esb remove"></button>' + componentname + '</div></section></div>');
				// Notes
				if(ESB.c[componentid] && (ESB.c[componentid].hasNotes || ESB.c[componentid].variationCount > 1)) {
					$(element).find('section.esbmarker > div:first-child').append('<button class="esb notes"></button>')
				}
				/* 
				$(element).find('section.esbmarker').click( function() {
					$('#esb > section').removeClass('active');
					$('#esb > section.components').addClass('active').addClass('notes');
				})
				*/
				$(element).find('section.esbmarker button.showhide').click( function(event) { ESB.showhideC(event); event.stopPropagation(); })
				$(element).find('section.esbmarker button.remove').click( function(event) { ESB.removeC(event); event.stopPropagation(); })
			}
			
			// Add Marker to Notes
			var noteElement = $(element).closest('article.page').children('aside.notes').find('ul.componentlist').append('<li class="esbmarker" data-marker="' + marker + '" data-id=' + componentid + '></li>').find('li:last-child');
			$(noteElement).append('<div><button class="esb showhide"></button><button class="esb remove"></button>' + componentname + '</div>')
			$(noteElement).find('button.remove').click( function(event) { ESB.removeC(event) })
			$(noteElement).find('button.showhide').click( function(event) { ESB.showhideC(event) })
			$(noteElement).click( function() {
				if ($(this).attr('data-id') !== "") {
					ESB.gtC($(this).attr('data-id'));
				}
			})
			// Variations
			/*
			if(ESB.c[componentid] && (ESB.c[componentid].variationCount>1)) {
				$(noteElement).append(' <div class="variations"><button class="next"></button><button class="previous"></button>' + variationTitle + '</div>')
				$(noteElement).find('button.previous').click( function(event) { ESB.previousC(event) })
				$(noteElement).find('button.next').click( function(event) { ESB.nextC(event) })
			}
			*/

		});
	},
	showhideC : function(event) {				// Toggle the component's visibility within a layout
		event.stopPropagation();
		var marker = $(event.target).closest('.esbmarker[data-marker]').attr('data-marker');
		var notesItem = $('body').find('aside.notes li[data-marker='+marker+']');
		var designItem = $('body').find('section.design .component .esbmarker[data-marker='+marker+']').parent().parent();
		if ($(notesItem).hasClass('hidden')) {
			$(notesItem).removeClass('hidden');
			$(designItem).slideDown(1000);
		} else {
			$(notesItem).addClass('hidden');
			$(designItem).slideUp(1000);
		}
	},
	removeC : function(event) {					// Remove a component from a layout
		event.stopPropagation();
		var marker = $(event.target).closest('.esbmarker[data-marker]').attr('data-marker');
		var notesItem = $('body').find('aside.notes li[data-marker='+marker+']');
		var designItem = $('body').find('section.design .component .esbmarker[data-marker='+marker+']').parent().parent();

		$(notesItem).slideUp(500, function() { $(this).remove() });
		$(designItem).slideUp(1000, function() { $(this).remove() });
	},
	previousC : function(event) {
		var marker = $(event.target).closest('.esbmarker[data-marker]').attr('data-marker');
		var notesItem = $('body').find('aside.notes li[data-marker='+marker+']');
		var designItem = $('body').find('section.design .component .esbmarker[data-marker='+marker+']').parent().parent();
		var componenthtml = $(ESB.c[$(designItem).attr('data-component')].html);
		var variationid = $(designItem).attr('data-variation');
		var previousVariation;

		$(designItem).children('*:not(.esbmarker)').remove();
		
		if ($(componenthtml).find('#v'+variationid).index() > 0) {
			previousVariation = $(componenthtml).find('#v'+currentVariation).prev().clone(); 
		} else {
			previousVariation = $(componenthtml).children().parents("#variations").children(':last-child').clone();
		}

		$(designItem)
			.append($(previousVariation).children())
			.attr('data-variation',$(previousVariation).attr('id').split('v')[1])
 
	},
	nextC : function(event) {
		var marker = $(event.target).closest('.esbmarker[data-marker]').attr('data-marker');
		
		
		/*
			var domCom = $('div[data-esumarker="' + $(this).closest('li[data-esumarkerref]').attr('data-esumarkerref') + '"]').parent()
			$(domCom).children('*:not(.actions,.marker)').remove()
	
			var nextVariation
			if ($(esu.components[$(domCom).attr('data-componentid')].html).find('#v'+$(domCom).attr('data-variation')).index() < (esu.components[$(domCom).attr('data-componentid')].variationCount - 1)) {
				nextVariation = $(esu.components[$(domCom).attr('data-componentid')].html).find('#v'+$(domCom).attr('data-variation')).next().clone()
			} else {
				nextVariation = $(esu.components[$(domCom).attr('data-componentid')].html).children().parents("#variations").children(':first-child').clone()
			}
	
			$(domCom)
				.append($(nextVariation).children())
				.attr('data-variation',$(nextVariation).attr('id').split('v')[1])
				
		*/
	},
	containC : function(id) {
		return (ESB.c[id].container) ? ESB.c[id].container : ESB.display.componentcontainer; 
	},
	lS : function(setID) {							// Load Sets by cloning Pages

		if (ESB.s[setID].pages.length > 1 && !ESB.s[setID].loaded) {
			$('#esb > section.sets > section[data-id=set' + setID + '] > header > h2').append(' <span class="count">(' + ESB.s[setID].pages.length + ')</span>');
		}

		for(pagecount=0;pagecount<ESB.s[setID].pages.length;pagecount++) {
			$('#esb > section.sets > section[data-id=set' + setID + '] > article[data-id=' + ESB.s[setID].pages[pagecount] + ']')
				.append($('#esb > section.pages > article[data-id=' + ESB.s[setID].pages[pagecount] + ']').clone(true).children('section.design,header'));
		}
		ESB.s[setID].loaded = true;
	},
	rS : function(elements) {						// Register Set(s) from XML to ESB, add Stubs
		elements.each(function (i,element) {

			ESB.s[i] = new ESB.S(element);
			if ($(element).attr('pages')) {
				ESB.s[i].pages = $(element).attr('pages').split(',');
			} else if ($(element).children('page').length > 0) {
				$(element).children('page').each( function(pageindex,pageelement) {
					ESB.s[i].pages[pageindex] = $(pageelement).attr('id');
				});
			} else {
				// What happens if no pages exist?
			}

			$('#esb > section.sets').append('<section data-id="set' + i + '" class="set"><header></header></section>')
//			$('#esb > section.sets > section[data-id=set' + i + '] > header').html(ESB.hI(ESB.s[i])).after(ESB.asideToolbarMarkup());
			for(pagecount=0;pagecount<ESB.s[i].pages.length;pagecount++) {
				$('#esb > section.sets > section[data-id=set' + i + ']')
					.append('<article class="page" data-id="' + ESB.s[i].pages[pagecount] + '"></article>');
				ESB.rP($('#esb > section.sets > section[data-id=set' + i + '] > article.page:last-child'),i);
			}
			
		})
	},
	llC : function() {									// Lazy Load Not-Yet-Loaded Components from Files to Components Section
		var componentid;
		for(componentid in ESB.c) {
			if(!ESB.c[componentid].loaded) {
				ESB.lC($('<div data-component="' + componentid + '"></div>'));
				break;
			}
		}
	},

	// Navigating
	
	gtS : function(id) {								// Go to Set in default display mode

		var section = $('#esb > section.sets > section[data-id=' + id + ']');
		
		// Activate the Sets Section
		$('body > section.' + ESB.articleType(section) + 's')
			.addClass('active selected').removeClass('list thumbnail notes grid').attr('style','')
			.siblings().removeClass('active notes list thumbnail grid')
			.children().removeClass('active').attr('style','');

		// Activate the Set Section
		$(section)
			.addClass('active grid').removeClass('thumbnail list inlineflow').attr('style','')
			.siblings().removeClass('active inlineflow grid thumbnail list').attr('style','');
			
	},
	view : function() {
		
		var article;

		// Determine Current View
  	var view = $.bbq.getState( "view" );
		var id = $.bbq.getState( "id" );
		
		// Flush View Classes
		$('body').removeClass('fullscreen');
		$('body > header > nav > ul > li').removeClass('active');
		$('body > section').removeClass('active notes grid list thumbnail').attr('style','');
		$('body > section > article').removeClass('active list thumbnail grid inlineflow').attr('style','').children('section.design').attr('style','');

		// Set View Classes for Current View
		switch (view) {
			case "pages":
				$('body > header > nav > ul > li.pages').addClass('active');
				$('body > section.pages').addClass('active grid');
				ESB.display.lastView = "pages";
				ESB.display.lastViewID = "";
				break;
			case "page":
				$('body > header > nav > ul > li.pages').addClass('active');
				$('body > section.pages').addClass('active notes');
				$('body > section.pages > article[data-id=' + id + ']').addClass('active')
				ESB.display.lastView = "page";
				ESB.display.lastViewID = id;
				break;
			case "components":
				$('body > header > nav > ul > li.components').addClass('active');
				$('body > section.components').addClass('active grid');
				ESB.display.lastView = "components";
				ESB.display.lastViewID = "";
				break;
			case "component":
				$('body > header > nav > ul > li.components').addClass('active');
				$('body > section.components').addClass('active notes')
				$('body > section.components > article[data-id=' + id + ']').addClass('active')
					.children('section.variation').each( function(i,element) {
						$(element).css('width','').css('height','')
						$(element).css('width',($(element).find('section.design').width()/2+10)+'px');
						$(element).css('height',($(element).find('section.design').height()/2+60)+'px');
					});
				ESB.display.lastView = "component";
				ESB.display.lastViewID = id;
				break;
			case "fullscreen":
				$('body').addClass('fullscreen');
				$('body > section.pages').addClass('active');
				$('body > section.pages > article[data-id=' + id + ']').addClass('active');
				break;
		}
	},

	// Utilities

	menuMarkup : function() {
		return '<menu><span class="controlset sizeslider"><h3>Size</h3><span class="icon small"></span><div class="esbgallerysize" style="width: 100px;"></div><span class="icon large"></span></span><span class="controlset heightslider"><h3>Height</h3><span class="icon short"></span><div class="esbgalleryaspectratio" style="width: 100px;"></div><span class="icon tall"></span></span> <span class="controlset  viewas"><button class="list active">List</button><button class="thumbnail">Thumbnail</button><button class="grid">Grid</button></span><button class="exitfullscreen">Exit Full Screen</button><button class="markers">Markers</button><button class="previous">Previous</button><button class="next">Next</button></menu>';
	},
	articleType : function(element) {
		if ($(element).hasClass('page')) {
			return 'page'
		} else if ($(element).hasClass('component')) {
			return 'component'
		} else if ($(element).hasClass('set')) {
			return 'set'
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
							if(!ESB.p[$(currentPage).next().attr('data-id')].loaded) {
								ESB.lP($(currentPage).next().attr('data-id'));
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
	}

}

$(document).ready(function(){
	ESB.init();
  $(window).bind( "hashchange", function(e) {
		ESB.view();
	})
	$(document).keydown(function (event) {
		ESB.keyboardshortcuts(event);
	});
	
});
