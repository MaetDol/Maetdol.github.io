
/** 스킨 옵션 정보
**/
var eBookSkin = {};
eBookSkin.options = {
	slideShowTimer	: 2,
	pageZoomMin			: 30,
	pageZoomMax			: 200,
	pageZoomDefault	: 30,
	loadingDelay		: 0,
};

eBookSkin.path = {
	image			: "images/",
	slideshow	: "images/slideshow/",
	sound			: "sounds/",
};

/** HTML 객체 생성 정보
**/
eBookSkin.objects = [

	{ type:"window"		, id:"background"	},

	// Menu for PC
	{ type:"window"		, id:"menu_window"				, 'class':"mainobjects", visible:"pc", children:[
		{ type:"window"		, id:"menu_center"			, 'class':"mainobjects"		, children:[
			{ type:"logo"			, id:"menu_logo"					, src:"logo.png"					, title:"로고"	},
			{ type:"image"		, id:"menu_tablelist_btn"	, 'class':"menuobjects", src:"menu/contents.svg"	, title:"목차"			, click:"eFnc.wndToggle('#tablelist_window')"			},
			{ type:"image"		, id:"menu_slide_btn"			, 'class':"menuobjects", src:"menu/slide.svg"			, title:"자동넘김"	, click:"eFnc.runSlideShow()"},
			{ type:"image"		, id:"menu_bookmark_btn"	, 'class':"menuobjects", src:"menu/bookmark.svg"	, title:"북마크"		, click:"eFnc.wndToggle('#bookmarklist_window')"	},
			{ type:"image"		, id:"menu_print_btn"			, 'class':"menuobjects", src:"menu/print.svg"			, title:"프린트"			, click:"eFnc.runPrint()", visible:"pc"	},
			{ type:"image"		, id:"menu_thumb_btn"	, 'class':"menuobjects"		, src:"menu/thumbnail.svg"	, title:"썸네일"	, click:"eFnc.wndToggle('#thumbnail_window')"	},
			{ type:"booklist"	, id:"booklist"	, 'class':"mainobjects"	},
			{ type:"window"		, id:"search_window"				, 'class':"mainobjects", children:[
				{ type:"input"		, id:"search_text",					'class':"mainobjects"	},
				{ type:"image"		, id:"search_text_btn"		, 'class':"menuobjects", src:"search_pc.svg"		, title:"검색"			, click:"eFnc.searchByInput('#search_text')"		},
			]},
		]},
	]},
	
	// Menu for Mobile
	{ type:"window"		, id:"menu_window"				, 'class':"mainobjects", visible:"mobile", children:[
	
		{ type:"window"		, id:"menu_center_m"			, 'class':"mainobjects"		, children:[
			{ type:"logo"			, id:"menu_logo_m"					, src:"logo.png"					, title:"로고"	},
			{ type:"image"		, id:"menu_tablelist_btn_m"	, 'class':"menuobjects_m", src:"menu/contents.svg"	, title:"목차"			, click:"eFnc.wndToggle('#tablelist_window')"	},
			{ type:"image"		, id:"menu_slide_btn_m"			, 'class':"menuobjects_m", src:"menu/slide.svg"			, title:"자동넘김"	, click:"eFnc.runSlideShow()"},
			{ type:"image"		, id:"menu_bookmark_btn_m"	, 'class':"menuobjects_m", src:"menu/bookmark.svg"	, title:"북마크"		, click:"eFnc.wndToggle('#bookmarklist_window')"	},
			{ type:"image"		, id:"menu_thumb_btn_m"	, 'class':"menuobjects_m"		, src:"menu/thumbnail.svg"	, title:"썸네일"	, click:"eFnc.wndToggle('#thumbnail_window')"	},
			{ type:"image"		, id:"search_text_btn_m"	, 'class':"menuobjects_m", src:"menu/search.svg"		, title:"검색"			, click:"eFnc.searchByInput()"},
		]},
	]},
	
	{ type:"pageview"	, id:"pageview", visible:"pc"	},
	{ type:"pageview"	, id:"pageview_m", visible:"mobile"	},
	
	// Bottom for PC
	{ type:"window"		, id:"bottom_window"			, 'class':"mainobjects"	, visible:"pc"	, children:[
	
		{ type:"home" 		, id:"sns_home"				, 'class':"snsobjects", src:"sns/home.svg"				, title:"홈"	},
		{ type:"image" 		, id:"sns_twitter"		, 'class':"snsobjects", src:"sns/twitter.svg"			, title:"트위터"			, click:"eFnc.sendSNS('twitter')"},
		{ type:"image" 		, id:"sns_facebook"		, 'class':"snsobjects", src:"sns/facebook.svg"		, title:"페이스북"		, click:"eFnc.sendSNS('facebook')"},
		
		{ type:"image"		, id:"quick_first_btn"	, 'class':"quickobjects"		, src:"quick/first.svg"		, title:"첫 페이지"		, click:"eFnc.gotoPage(1)"	},
		{ type:"image"		, id:"quick_prev_btn"		, 'class':"quickobjects"		, src:"quick/prev.svg"		, title:"이전 페이지"	, click:"eFnc.gotoPrev()"		},

		{ type:"text"			, id:"quick_pagenum_text"		, 'class':"quicktexts"	, text:"Page:"	, tabindex:-1		},
		{ type:"pagenum"	, id:"quick_pagenum_area"		},
		{ type:"text"			, id:"quick_pagenum_slash"	, 'class':"quicktexts"	, text:"/"	, tabindex:-1		},
		{ type:"pagetotal", id:"quick_pagetotal_area"	},

		{ type:"image"		, id:"quick_next_btn"		, 'class':"quickobjects"		, src:"quick/next.svg"		, title:"다음 페이지"	, click:"eFnc.gotoNext()"		},
		{ type:"image"		, id:"quick_last_btn"		, 'class':"quickobjects"		, src:"quick/last.svg"		, title:"끝 페이지"		, click:"eFnc.gotoPage(-1)"	},
	]},

	// Bottom for Mobile
	{ type:"window"		, id:"bottom_window_m"			, 'class':"mainobjects"	, visible:"mobile"	, children:[
		{ type:"image"		, id:"quick_first_btn_m"	, 'class':"quickobjects_m", src:"quick/first.svg"	, title:"첫 페이지"		, click:"eFnc.gotoPage(1)"	},
		{ type:"image"		, id:"quick_prev_btn_m"		, 'class':"quickobjects_m", src:"quick/prev.svg"		, title:"이전 페이지"	, click:"eFnc.gotoPrev()"		},
		{ type:"text"			, id:"quick_pagenum_text_m"		, 'class':"quicktexts_m"	, text:"Page:"	, tabindex:-1		},
		{ type:"pagenum"	, id:"quick_pagenum_area_m"		},
		{ type:"text"			, id:"quick_pagenum_slash_m"	, 'class':"quicktexts_m"	, text:"/"	, tabindex:-1		},
		{ type:"pagetotal", id:"quick_pagetotal_area_m"	},
		{ type:"image"		, id:"quick_next_btn_m"		, 'class':"quickobjects_m", src:"quick/next.svg"		, title:"다음 페이지"	, click:"eFnc.gotoNext()"		},
		{ type:"image"		, id:"quick_last_btn_m"		, 'class':"quickobjects_m", src:"quick/last.svg"		, title:"끝 페이지"		, click:"eFnc.gotoPage(-1)"	},
	]},
	
	{ type:"image", id:"quick_menu_switch", 'class':"mainobjects", src:"link_menu.svg", title:"링크메뉴", visible:"mobile", click:"eFnc.wndToggle('#links_window_m')"},
	
	// Links Window for Mobile
	{ type:"window"		, id:"links_window_m", 'class':"mainobjects", visible:"mobile"	, children:[
		{ type:"booklist"	, id:"booklist_m"	, 'class':"mainobjects"	},
		{ type:"home" 		, id:"sns_home"				, 'class':"snsobjects_m", src:"sns/home.svg"				, title:"홈"	},
		{ type:"image" 		, id:"sns_kakaotalk"	, 'class':"snsobjects_m", src:"sns/kakaotalk.svg"		, title:"카카오톡"		, click:"eFnc.sendSNS('kakaotalk')"},
		{ type:"image" 		, id:"sns_twitter"		, 'class':"snsobjects_m", src:"sns/twitter.svg"			, title:"트위터"			, click:"eFnc.sendSNS('twitter')"},
		{ type:"image" 		, id:"sns_facebook"		, 'class':"snsobjects_m", src:"sns/facebook.svg"		, title:"페이스북"		, click:"eFnc.sendSNS('facebook')"},
	]},
	
	{ type:"tablelist"		, id:"tablelist_window"			,	draggable:true, resizable:true	},	// 목차창
	{ type:"bookmarklist"	, id:"bookmarklist_window"	,	draggable:true, resizable:true	},	// 책갈피창
	{ type:"searchlist"		, id:"searchlist_window"		,	draggable:true, resizable:true	},	// 검색창

	{ type:"thumblist"		, id:"thumbnail_window"	},
	
];

/** 로딩화면 생성
**/
eFnc.showLoading();
