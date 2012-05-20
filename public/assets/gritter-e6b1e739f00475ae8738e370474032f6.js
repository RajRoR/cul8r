/*
 * Gritter for jQuery
 * http://www.boedesign.com/
 *
 * Copyright (c) 2011 Jordan Boesch
 * Dual licensed under the MIT and GPL licenses.
 *
 * Date: March 29, 2011
 * Version: 1.7.1
 */
// Modernizr for CSS3 support check.
window.Modernizr=function(a,b,c){function d(a,b){var c=a.charAt(0).toUpperCase()+a.substr(1),d=(a+" "+s.join(c+" ")+c).split(" ");return e(d,b)}function e(a,b){for(var d in a)if(p[a[d]]!==c)return b=="pfx"?a[d]:!0;return!1}function f(a,b){return!!~(""+a).indexOf(b)}function g(a,b){return typeof a===b}function h(a,b){return i(prefixes.join(a+";")+(b||""))}function i(a){p.cssText=a}var j="2.0.6",k={},l=b.documentElement,m=b.head||b.getElementsByTagName("head")[0],n="modernizr",o=b.createElement(n),p=o.style,q,r=Object.prototype.toString,s="Webkit Moz O ms Khtml".split(" "),t={},u={},v={},w=[],x=function(a,c,d,e){var f,g,h,i=b.createElement("div");if(parseInt(d,10))while(d--)h=b.createElement("div"),h.id=e?e[d]:n+(d+1),i.appendChild(h);return f=["&shy;","<style>",a,"</style>"].join(""),i.id=n,i.innerHTML+=f,l.appendChild(i),g=c(i,a),i.parentNode.removeChild(i),!!g},y,z={}.hasOwnProperty,A;!g(z,c)&&!g(z.call,c)?A=function(a,b){return z.call(a,b)}:A=function(a,b){return b in a&&g(a.constructor.prototype[b],c)},t.rgba=function(){return i("background-color:rgba(150,255,150,.5)"),f(p.backgroundColor,"rgba")},t.borderradius=function(){return d("borderRadius")};for(var B in t)A(t,B)&&(y=B.toLowerCase(),k[y]=t[B](),w.push((k[y]?"":"no-")+y));return i(""),o=q=null,k._version=j,k._domPrefixes=s,k.testProp=function(a){return e([a])},k.testAllProps=d,k.testStyles=x,k}(this,this.document),function(a){a.gritter={},a.gritter.options={position:"",fade_in_speed:"medium",fade_out_speed:1e3,time:6e3},a.gritter.add=function(a){try{return d.add(a||{})}catch(b){var c="Gritter Error: "+b;typeof console!="undefined"&&console.error?console.error(c,a):alert(c)}},a.gritter.remove=function(a,b){d.removeSpecific(a,b||{})},a.gritter.removeAll=function(a){d.stop(a||{})};var b,c='[[close]][[image]]<div class="[[class_name]]"><span class="gritter-title">[[username]]</span><p>[[text]]</p></div><div style="clear:both"></div>';Modernizr.borderradius&&Modernizr.rgba?b='<div class="gritter-item gritter-css3">'+c+"</div>":b='<div class="gritter-top"></div><div class="gritter-item gritter-css2">'+c+'</div><div class="gritter-bottom"></div>';var d={position:"",fade_in_speed:"",fade_out_speed:"",time:"",_custom_timer:0,_item_count:0,_is_setup:0,_tpl_close:'<div class="gritter-close"></div>',_tpl_item:'<div id="gritter-item-[[number]]" class="gritter-item-wrapper [[item_class]]" style="display:none">'+b+"</div>",_tpl_wrap:'<div id="gritter-notice-wrapper"></div>',add:function(b){if(!b.title||!b.text)throw'You need to fill out the first 2 params: "title" and "text"';this._is_setup||this._runSetup();var c=b.title,e=b.text,f=b.image||"",g=b.sticky||!1,h=b.class_name||"",i=a.gritter.options.position,j=b.time||"";this._verifyWrapper(),this._item_count++;var k=this._item_count,l=this._tpl_item;a(["before_open","after_open","before_close","after_close"]).each(function(c,e){d["_"+e+"_"+k]=a.isFunction(b[e])?b[e]:function(){}}),this._custom_timer=0,j&&(this._custom_timer=j);var m=f!=""?'<img src="'+f+'" class="gritter-image" />':"",n=f!=""?"gritter-with-image":"gritter-without-image";l=this._str_replace(["[[username]]","[[text]]","[[close]]","[[image]]","[[number]]","[[class_name]]","[[item_class]]"],[c,e,this._tpl_close,m,this._item_count,n,h],l),this["_before_open_"+k](),a("#gritter-notice-wrapper").addClass(i).append(l);var o=a("#gritter-item-"+this._item_count);return o.fadeIn(this.fade_in_speed,function(){d["_after_open_"+k](a(this))}),g||this._setFadeTimer(o,k),a(o).bind("mouseenter mouseleave",function(b){b.type=="mouseenter"?g||d._restoreItemIfFading(a(this),k):g||d._setFadeTimer(a(this),k),d._hoverState(a(this),b.type)}),k},_countRemoveWrapper:function(b,c,d){c.remove(),this["_after_close_"+b](c,d),a(".gritter-item-wrapper").length==0&&a("#gritter-notice-wrapper").remove()},_fade:function(a,b,c,e){var c=c||{},f=typeof c.fade!="undefined"?c.fade:!0;fade_out_speed=c.speed||this.fade_out_speed,manual_close=e,this["_before_close_"+b](a,manual_close),e&&a.unbind("mouseenter mouseleave"),f?a.fadeOut(fade_out_speed,function(){a.animate({height:0},300,function(){d._countRemoveWrapper(b,a,manual_close)})}):this._countRemoveWrapper(b,a)},_hoverState:function(a,b){b=="mouseenter"?(a.addClass("hover"),a.find(".gritter-close").show(),a.find(".gritter-close").click(function(){var b=a.attr("id").split("-")[2];d.removeSpecific(b,{},a,!0)})):(a.removeClass("hover"),a.find(".gritter-close").hide())},removeSpecific:function(b,c,d,e){if(!d)var d=a("#gritter-item-"+b);this._fade(d,b,c||{},e)},_restoreItemIfFading:function(a,b){clearTimeout(this["_int_id_"+b]),a.stop().css({opacity:""})},_runSetup:function(){for(opt in a.gritter.options)this[opt]=a.gritter.options[opt];this._is_setup=1},_setFadeTimer:function(a,b){var c=this._custom_timer?this._custom_timer:this.time;this["_int_id_"+b]=setTimeout(function(){d._fade(a,b)},c)},stop:function(b){var c=a.isFunction(b.before_close)?b.before_close:function(){},d=a.isFunction(b.after_close)?b.after_close:function(){},e=a("#gritter-notice-wrapper");c(e),e.fadeOut(function(){a(this).remove(),d()})},_str_replace:function(a,b,c,d){var e=0,f=0,g="",h="",i=0,j=0,k=[].concat(a),l=[].concat(b),m=c,n=l instanceof Array,o=m instanceof Array;m=[].concat(m),d&&(this.window[d]=0);for(e=0,i=m.length;e<i;e++){if(m[e]==="")continue;for(f=0,j=k.length;f<j;f++)g=m[e]+"",h=n?l[f]!==undefined?l[f]:"":l[0],m[e]=g.split(k[f]).join(h),d&&m[e]!==g&&(this.window[d]+=(g.length-m[e].length)/k[f].length)}return o?m:m[0]},_verifyWrapper:function(){a("#gritter-notice-wrapper").length==0&&a("body").append(this._tpl_wrap)}}}(jQuery);