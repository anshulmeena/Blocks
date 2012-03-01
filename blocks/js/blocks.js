/*!
 * EightShapes Blocks framework 2012.02.07
 * http://eightshapes.com
 *
 * Copyright 2012, EightShapes LLC
 * Terms of Use: http://unify.eightshapes.com/about-the-system/terms-of-use/
 */

(function(g,b,d){var c=b.head||b.getElementsByTagName("head"),D="readyState",E="onreadystatechange",F="DOMContentLoaded",G="addEventListener",H=setTimeout;
function f(){
  // This dynamic loading of LAB.js provided by the author of 
  // LAB.js, Kyle Simpson (@getify): http://labjs.com/
  $LAB
  .script("blocks/js/jquery-1.7.1.min.js").wait()
  .script("blocks/js/jquery-bbq.js")
  .script("blocks/js/core.js")
  .wait(function(){
    $(document).ready(function(){
      EightShapes.Blocks.init();

      $(window).bind( "hashchange", function(e) {
        EightShapes.Blocks.view();
      })

      $(document).keydown(function (event) {
        EightShapes.Blocks.keyboardshortcuts(event);
      });
    });
  })
}
H(function(){if("item"in c){if(!c[0]){H(arguments.callee,25);return}c=c[0]}var a=b.createElement("script"),e=false;a.onload=a[E]=function(){if((a[D]&&a[D]!=="complete"&&a[D]!=="loaded")||e){return false}a.onload=a[E]=null;e=true;f()};

a.src="blocks/js/LAB.min.js";

c.insertBefore(a,c.firstChild)},0);if(b[D]==null&&b[G]){b[D]="loading";b[G](F,d=function(){b.removeEventListener(F,d,false);b[D]="complete"},false)}})(this,document);

