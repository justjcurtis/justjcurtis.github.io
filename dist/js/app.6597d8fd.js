(function(t){function e(e){for(var s,r,o=e[0],c=e[1],l=e[2],d=0,u=[];d<o.length;d++)r=o[d],Object.prototype.hasOwnProperty.call(n,r)&&n[r]&&u.push(n[r][0]),n[r]=0;for(s in c)Object.prototype.hasOwnProperty.call(c,s)&&(t[s]=c[s]);h&&h(e);while(u.length)u.shift()();return a.push.apply(a,l||[]),i()}function i(){for(var t,e=0;e<a.length;e++){for(var i=a[e],s=!0,o=1;o<i.length;o++){var c=i[o];0!==n[c]&&(s=!1)}s&&(a.splice(e--,1),t=r(r.s=i[0]))}return t}var s={},n={app:0},a=[];function r(e){if(s[e])return s[e].exports;var i=s[e]={i:e,l:!1,exports:{}};return t[e].call(i.exports,i,i.exports,r),i.l=!0,i.exports}r.m=t,r.c=s,r.d=function(t,e,i){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},r.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(r.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)r.d(i,s,function(e){return t[e]}.bind(null,s));return i},r.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],c=o.push.bind(o);o.push=e,o=o.slice();for(var l=0;l<o.length;l++)e(o[l]);var h=c;a.push([0,"chunk-vendors"]),i()})({0:function(t,e,i){t.exports=i("56d7")},"034f":function(t,e,i){"use strict";var s=i("85ec"),n=i.n(s);n.a},1366:function(t,e,i){},2100:function(t,e,i){},"2c2f":function(t,e,i){"use strict";var s=i("dc8c"),n=i.n(s);n.a},"3ae2":function(t,e,i){"use strict";var s=i("f292"),n=i.n(s);n.a},"3d29":function(t,e,i){"use strict";var s=i("a9a2"),n=i.n(s);n.a},"477d":function(t,e,i){t.exports=i.p+"img/avatar_2.1a6c342e.jpg"},"4b16":function(t,e,i){"use strict";var s=i("5ce7"),n=i.n(s);n.a},"561a":function(t,e,i){},"56d7":function(t,e,i){"use strict";i.r(e);i("e260"),i("e6cf"),i("cca6"),i("a79d");var s=i("2b0e"),n=i("0086"),a=i.n(n),r=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"app"}},[i("Navbar"),i("router-view",{attrs:{id:"#router"}})],1)},o=[],c=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("div",{staticClass:"nav-bg"},[i("div",{staticClass:"logo"},[t._v("J")]),i("div",{staticClass:"buttons"},[i("router-link",{attrs:{to:{name:"home"}}},[i("fa-icon",{staticClass:"icon",attrs:{icon:["fab","houzz"]}})],1),i("router-link",{attrs:{to:{name:"projects"}}},[i("fa-icon",{staticClass:"icon",attrs:{icon:["fas","th"]}})],1),i("router-link",{attrs:{to:{name:"about"}}},[i("fa-icon",{staticClass:"icon",attrs:{icon:["fas","user-astronaut"]}})],1),i("router-link",{attrs:{to:{name:"contact"}}},[i("fa-icon",{staticClass:"icon",attrs:{icon:["fas","envelope"]}})],1)],1)])])},l=[],h={name:"Navbar"},d=h,u=(i("e6670"),i("2877")),v=Object(u["a"])(d,c,l,!1,null,null,null),f=v.exports,p={components:{Navbar:f}},m=p,g=(i("034f"),Object(u["a"])(m,r,o,!1,null,null,null)),b=g.exports,y=i("8c4f"),w=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{directives:[{name:"touch",rawName:"v-touch:swipe.up",value:t.land,expression:"land",arg:"swipe",modifiers:{up:!0}}]},[this.preLanded?t._e():i("div",{staticClass:"section landing",class:{flyaway:t.hasLanded}}),this.preLanded||this.typingFinished?i("div",{staticClass:"section hey"},[i("h1",{staticClass:"typing"},[t._v("Hey, I'm Jacson.")]),i("div",[i("vue-typed-js",{attrs:{loop:!0,smartBackspace:!0,typeSpeed:50,backSpeed:40,cursorChar:"|",strings:["Desktop.","Mobile.","Web.","Fun."]}},[i("h1",[t._v(" I write code for "),i("span",{staticClass:"typing",staticStyle:{color:"#ff9c40","background-color":"#191c31"}})])])],1)]):t._e(),this.preLanded||this.typingFinished?t._e():i("div",{staticClass:"section hey"},[i("div",{ref:"a"},[i("vue-typed-js",{attrs:{typeSpeed:50,startDelay:1e3,cursorChar:"|",strings:["Hey, I'm Jacson."]},on:{onComplete:function(e){return t.cursorStep()}}},[i("h1",{staticClass:"typing"})])],1),i("div",{ref:"b",staticStyle:{visibility:"hidden"}},[i("vue-typed-js",{attrs:{smartBackspace:!0,typeSpeed:50,backSpeed:40,startDelay:3e3,cursorChar:"|",strings:["I write code for <span style='color: #FF9C40; background-color: #191c31;'>Desktop.<span>","I write code for <span style='color: #FF9C40; background-color: #191c31;'>Mobile.</span>","I write code for <span style='color: #FF9C40; background-color: #191c31;'>Web.</span>","I write code for <span style='color: #FF9C40; background-color: #191c31;'>Fun.</span>"]},on:{onComplete:function(e){return t.cursorStep()}}},[i("h1",{staticClass:"typing"})])],1)]),t._m(0),i("div",{staticClass:"triggerSpacer",class:{hide:t.hasLanded}}),i("span",{directives:[{name:"landertrigger",rawName:"v-landertrigger"}],ref:"landertrigger",class:{hide:t.hasLanded},on:{landed:function(e){return t.land()}}})])},k=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"home section"},[s("img",{attrs:{id:"avatar",src:i("477d")}})])}],j=i("5530"),C=i("2f62"),_={created:function(){this.preLanded=this.hasLanded},computed:Object(C["c"])(["hasLanded"]),data:function(){return{cursorPos:0,preLanded:!1,typingFinished:!1}},name:"Home",methods:Object(j["a"])(Object(j["a"])({},Object(C["b"])(["land"])),{},{cursorStep:function(){var t=this;0==this.cursorPos?(this.$refs.a.firstChild.lastChild.remove(),this.$refs.b.style.visibility="visible",this.cursorPos++):1==this.cursorPos&&setTimeout((function(){t.$refs.b.firstChild.lastChild.remove(),t.typingFinished=!0}),500)}})},S=_,x=(i("3d29"),Object(u["a"])(S,w,k,!1,null,"7e02b3ac",null)),O=x.exports,I=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("div",{staticClass:"section root"}),i("div",{directives:[{name:"masonry",rawName:"v-masonry",value:t.containerId,expression:"containerId"}],staticClass:"masonry",attrs:{"transition-duration":"0.3s","item-selector":".item"}},[i("ImageCard",{attrs:{src:"/aMaze.png",title:"aMaze",short:"A maze generation and solving demonstration.",long:"I used random walk and A* algorithms to generate mazes that are random, solvable and find the optimal path in the least amount of search steps."}}),i("ImageCard",{attrs:{src:"/randomquotes.png",title:"RandomQuotes",short:"A random quote generator.",long:"With twitter and clipboard itergration, you get random quotes to share, remember or save.",goto:"https://justjcurtis.dev/randomquotes"}}),i("ImageCard",{attrs:{src:"/spacejnvaders.png",title:"SpaceJnvaders",short:"A custom SpaceInvaders implementation.",long:"A simple SpaceInvaders clone I made from scratch with a custom physics and game engine.",goto:"https://justjcurtis.dev/spaceJnvaders"}}),i("ImageCard",{attrs:{src:"/sort.png",title:"Sort",short:"Sorting algorithms demonstrated visually.",long:"A visual demo of selection, bubble & quick sort. All slowed down to allow comprehensible viewing.",goto:"https://justjcurtis.dev/sort"}}),i("ImageCard",{attrs:{src:"/bonemeal.png",title:"BoneMeal",short:"A dividend growth companion for Freetrade.io",long:"I use BoneMeal to help me find and pick stocks to add to my dividend growth portfolio. I made this public for the freetrade community and my friends.",goto:"https://bonemeal.app"}}),i("ImageCard",{attrs:{src:"/funemployed.png",title:"Funemployed",short:"An online Funemployed clone",long:"During the first Covid-19 lockdown I created this Funemployed clone to enable people to play together over video call or in their homes.",goto:"https://justjcurtis.dev/funemployed"}}),i("ImageCard",{attrs:{src:"/boids.png",title:"Boids",short:"Boids with neuroevolution built in",long:"This is my implementation of boids using a custom implementation of neuroevolution which allows the boid population to optimise to the hunters & food around them.",goto:"https://justjcurtis.dev/boids"}})],1),t._e()])},F=[],z=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("div",{directives:[{name:"masonry-tile",rawName:"v-masonry-tile"}],staticClass:"item"},[i("div",{staticClass:"scroll-tracker"}),i("div",{ref:"card",staticClass:"flip-card"},[i("div",{staticClass:"flip-card-inner"},[i("div",{staticClass:"flip-card-front"},[i("img",{ref:"img",staticClass:"pointer",attrs:{src:t.src},on:{click:function(e){return t.flip()}}})]),i("div",{ref:"cardBack",staticClass:"flip-card-back pointer",on:{click:function(e){return t.flip()}}},[i("h1",[t._v(t._s(t.title))]),i("p",[t._v(t._s(t.short))]),i("p",[t._v(t._s(t.long))]),i("div",{staticClass:"icon-wrapper"},[t.goto?t._e():i("router-link",{attrs:{to:{name:"projectDetail",params:{id:t.title}}}},[i("fa-icon",{staticClass:"icon",attrs:{icon:["fas","rocket"]}})],1),t.goto?i("a",{attrs:{href:t.goto,target:"_blank"}},[i("fa-icon",{staticClass:"icon",attrs:{icon:["fas","rocket"]}})],1):t._e()],1)])])])])])},N=[],A={name:"ImageCard",props:["src","title","short","long","goto"],data:function(){return{flipped:!1}},methods:{onResize:function(){this.setHeights()},flip:function(){this.flipped?this.$refs.card.classList.remove("flip-card-clicked"):(this.setHeights(),this.$refs.card.classList.add("flip-card-clicked")),this.flipped=!this.flipped},setHeights:function(){var t=this.$refs.img.clientHeight;this.$refs.card.style.height="".concat(t,"px"),this.$refs.cardBack.style.height="".concat(t,"px"),this.$refs.cardBack.style.marginTop="-".concat(t,"px")}},mounted:function(){window.addEventListener("resize",this.onResize)},beforeDestroy:function(){window.removeEventListener("resize",this.onResize)}},E=A,M=(i("6f07"),Object(u["a"])(E,z,N,!1,null,"75c84b0c",null)),T=M.exports,L={name:"Projects",components:{ImageCard:T},created:function(){this.land()},methods:Object(j["a"])({},Object(C["b"])(["land"]))},P=L,$=(i("3ae2"),Object(u["a"])(P,I,F,!1,null,"c70f16e8",null)),J=$.exports,D=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"section"},["aMaze"==t.id?i("div",{staticClass:"project-wrapper"},[i("aMaze")],1):t._e(),"SmartRockets"==t.id?i("div",{staticClass:"project-wrapper"},[i("smartRockets")],1):t._e(),"SpaceJnvaders"==t.id?i("div",{staticClass:"project-wrapper"},[i("spaceJnvaders")],1):t._e()])},B=[],q=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("div",{staticClass:"p5sketch"},[i("h1",{staticClass:"mobile"},[t._v("aMaze")]),i("vue-p5",{on:{sketch:t.sketch}}),t._m(0)],1)])},H=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"instructions"},[i("h1",[t._v("aMaze")]),i("p",[t._v("This simulation will generate random mazes and then solve them using the A* algorithm in the least steps possible.")]),i("p",[t._v("Green squares represent potential paths to the end, yet to be explored.")]),i("p",[t._v("Red squares represent squres already visited and evaluated.")]),i("p",[t._v("The blue path shown at the end of each simulation is the most optimal path through the maze.")]),i("span",{staticClass:"highlight"},[i("p",[t._v("Click / Tap the screen to play or pause the simulation.")])])])}],R=(i("caad"),i("a434"),i("2532"),i("b85c")),G=i("d4ec"),W=i("bee2"),Q=function(){function t(e,i){Object(G["a"])(this,t),this.f=void 0,this.g=void 0,this.h=void 0,this.i=e,this.j=i,this.previous=void 0}return Object(W["a"])(t,null,[{key:"FromMazeCell",value:function(e){return new t(e.i,e.j)}}]),t}(),U=function(){function t(e){var i=arguments.length>1&&void 0!==arguments[1]&&arguments[1],s=arguments.length>2&&void 0!==arguments[2]&&arguments[2];Object(G["a"])(this,t),this.grid=void 0,this.grid2D=void 0,this.nodes=void 0,this.openSet=[],this.closedSet=[],this.noSolution=!1,this.done=!1,this.path=[],this.start=void 0,this.end=void 0,this.canDiagonal=s,this.alwaysShowPath=i,this.current=void 0,this.sk=e}return Object(W["a"])(t,[{key:"reset",value:function(){this.grid=void 0,this.grid2D=void 0,this.nodes=void 0,this.openSet=[],this.closedSet=[],this.noSolution=!1,this.done=!1,this.path=[],this.start=void 0,this.end=void 0}},{key:"removeArrElem",value:function(t,e){for(var i=0;i<t.length;i++)t[i]==e&&t.splice(i,1)}},{key:"nodeForIJ",value:function(t,e){var i=void 0;return void 0!=this.nodes[e]&&(i=this.nodes[e][t]),i}},{key:"_diagonalNeighbors",value:function(t){for(var e=[this.nodeForIJ(t.i+1,t.j+1),this.nodeForIJ(t.i-1,t.j-1),this.nodeForIJ(t.i+1,t.j+1),this.nodeForIJ(t.i-1,t.j-1)],i=e.length;i>=0;i--)void 0==e[i]&&e.splice(i,1);if(e.length<1)return[];for(var s=this.cellForNode(t),n=e.length-1;n>=0;n--){var a=e[n],r=!1,o=this.cellForNode(a);s.j>o.j&&(s.i<o.i&&(r=!(!o.walls[3]&&!s.walls[0]||!o.walls[2]&&!s.walls[1])),s.i>o.i&&(r=!(!o.walls[1]&&!s.walls[0]||!o.walls[2]&&!s.walls[3]))),s.j<o.j&&(s.i<o.i&&(r=!(!o.walls[0]&&!s.walls[1]||!o.walls[3]&&!s.walls[2])),s.i>o.i&&(r=!(!o.walls[0]&&!s.walls[3]||!o.walls[1]&&!s.walls[2]))),r&&e.splice(n,1)}return e}},{key:"_squareNeighbors",value:function(t){for(var e=[this.nodeForIJ(t.i,t.j+1),this.nodeForIJ(t.i,t.j-1),this.nodeForIJ(t.i+1,t.j),this.nodeForIJ(t.i-1,t.j)],i=e.length;i>=0;i--)void 0==e[i]&&e.splice(i,1);if(e.length<1)return[];for(var s=this.cellForNode(t),n=e.length-1;n>=0;n--){var a=e[n],r=!1,o=this.cellForNode(a);if(s.i!=o.i){var c=s.i<o.i?s:o,l=s.i<o.i?o:s;(c.walls[1]||l.walls[3])&&(r=!0)}if(s.j!=o.j){var h=s.j<o.j?s:o,d=s.j<o.j?o:s;(h.walls[2]||d.walls[0])&&(r=!0)}r&&e.splice(n,1)}return e}},{key:"nodeNeighbors",value:function(t){var e=this._squareNeighbors(t),i=[];return this.canDiagonal&&(i=this._diagonalNeighbors(t)),[e,i]}},{key:"cellForNode",value:function(t){return this.grid2D[t.j][t.i]}},{key:"seek",value:function(){if(void 0!=this.nodes){if(this.done||this.noSolution)return this.updatePath(),[this.done,this.noSolution];void 0==this.start&&this.setStart(0,0),this.openSet.length<1&&(this.openSet.push(this.start),this.start.g=0,void 0==this.end&&this.setEnd(this.nodes[this.nodes.length-1].length-1,this.nodes.length-1),this.start.h=this.heuristic(this.start,this.end),this.start.f=this.start.g+this.start.h),this.current=void 0;for(var t=0;t<this.openSet.length;t++)(void 0==this.current||this.openSet[t].f<this.current.f)&&(this.current=this.openSet[t]);this.current==this.end&&(this.updatePath(),this.done=!0),this.closedSet.push(this.current),this.removeArrElem(this.openSet,this.current);var e,i=this.nodeNeighbors(this.current),s=Object(R["a"])(i[0]);try{for(s.s();!(e=s.n()).done;){var n=e.value,a=this.current.g+10;this.closedSet.includes(n)||((void 0==n.g||n.g>a)&&(n.previous=this.current,n.g=a,n.h=this.heuristic(n,this.end),n.f=n.g+n.h),this.openSet.push(n))}}catch(h){s.e(h)}finally{s.f()}if(this.canDiagonal){var r,o=Object(R["a"])(i[1]);try{for(o.s();!(r=o.n()).done;){var c=r.value,l=this.current.g+14;this.closedSet.includes(c)||((void 0==c.g||c.g>l)&&(c.previous=this.current,c.g=l,c.h=this.heuristic(c,this.end),c.f=c.g+c.h),this.openSet.push(c))}}catch(h){o.e(h)}finally{o.f()}}this.alwaysShowPath&&this.updatePath()}}},{key:"updatePath",value:function(){this.path=[];var t=this.current;this.path.push(t);while(t.previous)this.path.push(t.previous),t=t.previous;this.path=this.path.reverse(),this.openSet.length<1&&(this.noSolution=!0)}},{key:"heuristic",value:function(t,e){var i=10*this.sk.dist(t.i,t.j,e.i,e.j);return i}},{key:"setGrid",value:function(t,e,i){this.grid=t,this.grid2D=this.to2D(t,e,i),this.nodes=this.nodesFrom2D(this.grid2D)}},{key:"setStart",value:function(t,e){this.start=this.nodes[e][t]}},{key:"setEnd",value:function(t,e){this.end=this.nodes[e][t]}},{key:"nodesFrom2D",value:function(t){for(var e=[],i=0;i<t.length;i++){e.push([]);for(var s=0;s<t[i].length;s++)e[i].push(Q.FromMazeCell(t[i][s]))}return e}},{key:"to2D",value:function(t,e,i){for(var s=[],n=0;n<i;n++){s.push([]);for(var a=0;a<e;a++){var r=a+n*e;s[n].push(t[r])}}return s}},{key:"from2D",value:function(t){for(var e=[],i=0;i<t.length;i++)for(var s=0;s<t[i].length;s++)e.push(t[i][s]);return e}},{key:"render",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:.5;if(void 0!=this.nodes){t*=255,(this.done||this.noSolution)&&(t/=2),this.sk.noStroke();var e=[0,255,0,t];if(this.openSet){var i,s=Object(R["a"])(this.openSet);try{for(s.s();!(i=s.n()).done;){var n=i.value,a=this.cellForNode(n);a.render(e)}}catch(m){s.e(m)}finally{s.f()}}if(e=[255,0,0,t],this.closedSet){var r,o=Object(R["a"])(this.closedSet);try{for(o.s();!(r=o.n()).done;){var c=r.value,l=this.cellForNode(c);l.render(e)}}catch(m){o.e(m)}finally{o.f()}}if(e=[0,0,255,this.done||this.noSolution?255:t],this.path.length>0){var h,d=Object(R["a"])(this.path);try{for(d.s();!(h=d.n()).done;){var u=h.value,v=this.cellForNode(u);v.render(e)}}catch(m){d.e(m)}finally{d.f()}var f=this.path[this.path.length-1],p=this.cellForNode(f);p.render([0,0,200,255])}}}}]),t}(),Y=(i("d81d"),i("cb29"),function(){function t(e,i,s,n,a){var r=arguments.length>5&&void 0!==arguments[5]?arguments[5]:0,o=arguments.length>6&&void 0!==arguments[6]?arguments[6]:0;Object(G["a"])(this,t),this.i=i,this.j=s,this.xoffset=r,this.yoffset=o,this.size=n,this.index=a,this.x=this.i*this.size+r,this.y=this.j*this.size+o,this.walls=[!0,!0,!0,!0],this.visited=!1,this.sk=e}return Object(W["a"])(t,[{key:"render",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:void 0;this.sk.push(),void 0==t&&(t=this.visited?[100,10,100]:this.sk.color("#191c31")),this.sk.fill(t),this.sk.noStroke(),this.sk.rect(this.x,this.y,this.size,this.size),this.sk.stroke(255),this.walls[0]&&this.sk.line(this.x,this.y,this.x+this.size,this.y),this.walls[1]&&this.sk.line(this.x+this.size,this.y,this.x+this.size,this.y+this.size),this.walls[2]&&this.sk.line(this.x+this.size,this.y+this.size,this.x,this.y+this.size),this.walls[3]&&this.sk.line(this.x,this.y+this.size,this.x,this.y),this.sk.pop()}}]),t}()),V=function(){function t(e,i,s,n){var a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:0,r=arguments.length>5&&void 0!==arguments[5]?arguments[5]:0;Object(G["a"])(this,t),this.sk=e,this.w=i,this.h=s,this.xoffset=a,this.yoffset=r,this.cellSize=n,this.cols=Math.floor(i/n),this.rows=Math.floor(s/n),this.grid=this.newBlankGrid(),this.current=void 0,this.stack=[],this.generated=!1,this.target=void 0,this.start=void 0}return Object(W["a"])(t,[{key:"reset",value:function(){this.grid=this.newBlankGrid(),this.current=void 0,this.stack=[],this.generated=!1,this.target=void 0,this.start=void 0}},{key:"newBlankGrid",value:function(){this.generated=!1;for(var t=[],e=0;e<this.rows;e++)for(var i=0;i<this.cols;i++)t.push(new Y(this.sk,i,e,this.cellSize,t.length,this.xoffset,this.yoffset));return t}},{key:"cellIndex",value:function(t,e){if(t>this.cols-1||t<0)return-1;if(e>this.rows-1||e<0)return-1;var i=t+e*this.cols;return i}},{key:"checkNeighbors",value:function(t,e){for(var i=[this.grid[this.cellIndex(t.i,t.j-1)],this.grid[this.cellIndex(t.i+1,t.j)],this.grid[this.cellIndex(t.i,t.j+1)],this.grid[this.cellIndex(t.i-1,t.j)]],s=i.length;s>=0;s--)void 0!=i[s]&&(this.sk.random(0,1)<this.sk.map(e,0,1,0,.13)||!i[s].visited)||i.splice(s,1);if(i.length>0)return i[Math.floor(this.sk.random(0,i.length))]}},{key:"removeWalls",value:function(t,e){if(t.i!=e.i){var i=t.i<e.i?t:e,s=t.i<e.i?e:t;i.walls[1]=!1,s.walls[3]=!1}else if(t.j!=e.j){var n=t.j<e.j?t:e,a=t.j<e.j?e:t;n.walls[2]=!1,a.walls[0]=!1}}},{key:"visit",value:function(t){t.visited=!0}},{key:"setCurrent",value:function(t){void 0!=this.current&&this.stack.push(this.current),this.visit(t),this.current=t}},{key:"stepBack",value:function(){this.current=this.stack.pop()}},{key:"generate",value:function(t){if(!this.generated)if(void 0!=this.current){var e=this.checkNeighbors(this.current,t);void 0==e?(this.stepBack(),void 0==this.current&&(this.start=this.grid[0],this.target=this.grid[this.cellIndex(this.cols-1,this.rows-1)],this.generated=!0)):(this.removeWalls(this.current,e),this.setCurrent(e))}else this.setCurrent(this.grid[0])}},{key:"render",value:function(){for(var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:void 0,e=0;e<this.grid.length;e++){var i=this.grid[e];i.render()}this.current&&this.current.render([50,200,10]),void 0!=t&&t.render(),this.generated&&(this.target&&this.target.render([100,250,100]),this.start&&this.start.render([250,100,100]))}}]),t}(),X=i("e25d"),K=i.n(X),Z={name:"aMaze",components:{"vue-p5":K.a},methods:{sketch:function(t){var e,i,s,n,a,r=!1,o=!1,c=!1,l=!1,h=!0,d=.5,u=!1,v=0;function f(){r?(c&&p(),o&&(l||(l=!0))):r=!0}function p(){o&&l&&c&&(o=!1,l=!1,c=!1,a.reset(),n.reset())}t.touchStarted=function(){u=!u},t.mouseClicked=function(){u=!u},t.keyPressed=function(t){"a"!=t.key?f():h=!h},t.setup=function(){window.innerWidth>=window.innerHeight?(e=.6*window.innerWidth,i=.9*window.innerHeight):(e=.9*window.innerWidth,i=.5*window.innerHeight);var r=50;s=25,n=new V(t,e-r,i-r,Math.floor(Math.min(e,i)/s),r/2,r/2),a=new U(t,!1,!1),t.createCanvas(e,i)},t.draw=function(){if(u||1!=v){if(t.background(t.color("#191c31")),o){if(l){a.grid||a.setGrid(n.grid,n.cols,n.rows);for(var e=0;e<Math.floor(s/25*6);e++){var i=a.seek();i&&(i[0]||i[1])&&(c||h&&setTimeout((function(){c=!0}),3e3))}}}else{v=0;for(var p=0;p<Math.floor(s/25*20);p++)if(r&&(l=!1,c=!1,n.generate(d),o=n.generated,v=1,!u||o))break}n.render(a),h&&f()}}}}},tt=Z,et=(i("c2ab"),Object(u["a"])(tt,q,H,!1,null,"394ab1f2",null)),it=et.exports,st=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div")},nt=[],at={name:"smartRockets"},rt=at,ot=Object(u["a"])(rt,st,nt,!1,null,"d60b0016",null),ct=ot.exports,lt=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div")},ht=[],dt={name:"spaceJnvaders"},ut=dt,vt=Object(u["a"])(ut,lt,ht,!1,null,"128d2f18",null),ft=vt.exports,pt={name:"ProjectDetail",props:["id"],components:{aMaze:it,smartRockets:ct,spaceJnvaders:ft},created:function(){this.land()},methods:Object(j["a"])({},Object(C["b"])(["land"]))},mt=pt,gt=(i("2c2f"),Object(u["a"])(mt,D,B,!1,null,"267f38ee",null)),bt=gt.exports,yt=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("div",{staticClass:"section bg"}),i("div",{staticClass:"container"},[t._m(0),i("Timeline",{attrs:{id:"timeline"}})],1)])},wt=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"avatar-wrapper"},[s("img",{attrs:{id:"avatar",src:i("8787")}})])}],kt=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("div",{staticClass:"timeline"},[i("TimelineContent",{directives:[{name:"scrollAnimation",rawName:"v-scrollAnimation"}],attrs:{side:"left",date:"2018 - Present",text:"Mobile software developer @ Ideagen using C# Javascript & Xamarin.Forms."}}),i("TimelineContent",{directives:[{name:"scrollAnimation",rawName:"v-scrollAnimation"}],attrs:{side:"right",date:"2017",text:"Gymnastics coaching @ Camp Awosting CT & Owner and Biomechanics coach @ FitFix"}}),i("TimelineContent",{directives:[{name:"scrollAnimation",rawName:"v-scrollAnimation"}],attrs:{side:"left",date:"2014 - 2016",text:"Studying Physics BSC @ Open University"}}),i("TimelineContent",{directives:[{name:"scrollAnimation",rawName:"v-scrollAnimation"}],attrs:{side:"right",date:"2012 - 2014",text:"Studying Physics, Maths, Philosophy, Psychology & Law & Bilborough College"}}),i("TimelineContent",{directives:[{name:"scrollAnimation",rawName:"v-scrollAnimation"}],attrs:{side:"left",date:"2012 - 2016",text:"Got back into coding teaching myself Python, JavaScript, HTML & CSS, revisited computer science fundementals learning Linux & bash."}}),i("TimelineContent",{directives:[{name:"scrollAnimation",rawName:"v-scrollAnimation"}],attrs:{side:"right",date:"2005-2009",text:"Began teaching myself to code, starting with batch files & VB.NET - Quickly moving on to C# & Java."}}),i("TimelineContent",{directives:[{name:"scrollAnimation",rawName:"v-scrollAnimation"}],attrs:{side:"left",date:"2000 - 2012",text:"School & Internatonal level gymnast representing Team GB Under 16s"}}),i("TimelineContent",{directives:[{name:"scrollAnimation",rawName:"v-scrollAnimation"}],attrs:{side:"right",date:"1995",text:"Born."}})],1)])},jt=[],Ct=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("div",{class:"timelineContainer "+t.side},[i("div",{staticClass:"timelineContent"},[i("h2",[t._v(t._s(t.date))]),i("p",[t._v(t._s(t.text))])])])])},_t=[],St={name:"TimelineContent",props:["side","date","image","text"]},xt=St,Ot=(i("4b16"),Object(u["a"])(xt,Ct,_t,!1,null,"748c48cd",null)),It=Ot.exports,Ft={name:"Timeline",components:{TimelineContent:It}},zt=Ft,Nt=(i("c63c"),Object(u["a"])(zt,kt,jt,!1,null,"04a3eea1",null)),At=Nt.exports,Et={name:"About",components:{Timeline:At},created:function(){this.land()},methods:Object(j["a"])({},Object(C["b"])(["land"]))},Mt=Et,Tt=(i("b944"),Object(u["a"])(Mt,yt,wt,!1,null,"4e7b4971",null)),Lt=Tt.exports,Pt=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},$t=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"section bg"},[i("div",{staticClass:"content"},[i("div",{staticClass:"instructions non-mobile"},[i("h1",[t._v("Contact")]),i("p",[t._v(" Feel free to contact me here if you have any feedback for this site or any of the project sites. ")]),i("p",[t._v(" If you have any ideas for new projects you'd like to see here let me know. ")]),i("p",[t._v("Red squares represent squres already visited and evaluated.")]),i("span",{staticClass:"highlight"},[i("p",[t._v(" I hope you've enjoyed the site & got a decent score on spaceJnvaders :) ")])])]),i("div",{staticClass:"standoff"},[i("form",{attrs:{action:"https://formspree.io/f/xqkgqvgq",method:"POST"}},[i("p",[t._v("Your email:")]),i("input",{attrs:{type:"text",name:"_replyto"}}),i("p",[t._v("Your message:")]),i("textarea",{attrs:{name:"message"}}),i("br"),i("button",{attrs:{type:"submit"}},[t._v("Send")])])]),i("div",{staticClass:"instructions mobile"},[i("h1",[t._v("Contact")]),i("p",[t._v(" Feel free to contact me here if you have any feedback for this site or any of the project sites. ")]),i("p",[t._v(" If you have any ideas for new projects you'd like to see here let me know. ")]),i("p",[t._v("Red squares represent squres already visited and evaluated.")]),i("span",{staticClass:"highlight"},[i("p",[t._v(" I hope you've enjoyed the site & got a decent score on spaceJnvaders :) ")])])])])])}],Jt={name:"About",created:function(){this.land()},methods:Object(j["a"])({},Object(C["b"])(["land"]))},Dt=Jt,Bt=(i("e5df"),Object(u["a"])(Dt,Pt,$t,!1,null,"5f10be9e",null)),qt=Bt.exports;s["a"].use(y["a"]);var Ht=[{path:"/",name:"home",component:O},{path:"/projects",name:"projects",component:J},{path:"/projects/:id",name:"projectDetail",component:bt,props:!0},{path:"/about",name:"about",component:Lt},{path:"/contact",name:"contact",component:qt}],Rt=new y["a"]({routes:Ht}),Gt=Rt,Wt=i("8cb8"),Qt=i("3f9b"),Ut=i("ecee"),Yt=i("ad3d"),Vt=i("c074"),Xt=i("f2d1");Ut["c"].add(Xt["c"],Vt["c"],Vt["a"],Vt["d"],Vt["b"],Xt["a"],Xt["d"],Xt["e"],Xt["b"]),s["a"].component("fa-icon",Yt["a"]);i("4160"),i("159b");var Kt=new IntersectionObserver((function(t,e){t.forEach((function(t){t.intersectionRatio>0&&(t.target.classList.add("enter"),e.unobserve(t.target))}))})),Zt={bind:function(t){t.classList.add("before-enter"),Kt.observe(t)}},te=new IntersectionObserver((function(t,e){t.forEach((function(t){if(t.isIntersecting){var i=new Event("landed");t.target.dispatchEvent(i),e.unobserve(t.target)}}))})),ee={bind:function(t){t.classList.add("lander-trigger"),te.observe(t)}},ie={hasLanded:!1},se={hasLanded:function(t){return t.hasLanded}},ne={land:function(t){var e=t.commit;e("setHasLanded",!0)}},ae={setHasLanded:function(t,e){return t.hasLanded=e}},re={state:ie,getters:se,actions:ne,mutations:ae};s["a"].use(C["a"]);var oe=new C["a"].Store({state:{},mutations:{},actions:{},modules:{Lander:re}});s["a"].use(a.a),s["a"].use(Wt["default"]),s["a"].use(Gt),s["a"].use(Qt["a"]),s["a"].directive("scrollAnimation",Zt),s["a"].directive("landertrigger",ee),s["a"].config.productionTip=!1,new s["a"]({router:Gt,store:oe,render:function(t){return t(b)}}).$mount("#app")},"5ce7":function(t,e,i){},"6f07":function(t,e,i){"use strict";var s=i("1366"),n=i.n(s);n.a},"85ec":function(t,e,i){},8787:function(t,e,i){t.exports=i.p+"img/avatar_1.b3e34607.jpg"},a9a2:function(t,e,i){},b944:function(t,e,i){"use strict";var s=i("f4d7"),n=i.n(s);n.a},beb2:function(t,e,i){},c2ab:function(t,e,i){"use strict";var s=i("cde3"),n=i.n(s);n.a},c63c:function(t,e,i){"use strict";var s=i("561a"),n=i.n(s);n.a},cde3:function(t,e,i){},dc8c:function(t,e,i){},e5df:function(t,e,i){"use strict";var s=i("beb2"),n=i.n(s);n.a},e6670:function(t,e,i){"use strict";var s=i("2100"),n=i.n(s);n.a},f292:function(t,e,i){},f4d7:function(t,e,i){}});
//# sourceMappingURL=app.6597d8fd.js.map