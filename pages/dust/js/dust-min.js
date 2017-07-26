!function t(e,i,r){function n(a,s){if(!i[a]){if(!e[a]){var l="function"==typeof require&&require;if(!s&&l)return l(a,!0);if(o)return o(a,!0);var h=new Error("Cannot find module '"+a+"'");throw h.code="MODULE_NOT_FOUND",h}var u=i[a]={exports:{}};e[a][0].call(u.exports,function(t){var i=e[a][1][t];return n(i||t)},u,u.exports,t,e,i,r)}return i[a].exports}for(var o="function"==typeof require&&require,a=0;a<r.length;a++)n(r[a]);return n}({1:[function(t,e,i){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(i,"__esModule",{value:!0}),i.Dust=void 0;var n=function(){function t(t,e){for(var i=0;i<e.length;i++){var r=e[i];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,i,r){return i&&t(e.prototype,i),r&&t(e,r),e}}(),o=t("./vendor/cellauto.js"),a=(function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);e.default=t}(o),t("./worlds.js")),s=(i.Dust=function(){function t(e,i){var n=this;r(this,t),this.container=e;var o=Object.keys(a.Worlds);this.worldOptions={name:o[o.length*Math.random()<<0]},this.app=new PIXI.Application({antialias:!1,transparent:!1,resolution:1}),this.container.appendChild(this.app.view),this.app.ticker.add(function(t){n.OnUpdate(t)}),this.framecounter=new s(1,null),this.app.stop(),PIXI.loader.add("fragShader","../resources/dust.frag").load(function(t,e){n.loadedResources=e,n.Setup(),n.app.start(),i()})}return n(t,[{key:"Setup",value:function(){this.world=a.Worlds[this.worldOptions.name].call(this,this.worldOptions.width,this.worldOptions.height),this.framecounter.frameFrequency=this.world.recommendedFrameFrequency||1,this.app.renderer.resize(this.world.width,this.world.height),this.app.renderer.view.style.cssText=" \n            image-rendering: optimizeSpeed; \n            image-rendering: -moz-crisp-edges; \n            image-rendering: -webkit-optimize-contrast; \n            image-rendering: optimize-contrast;\n            image-rendering: -o-crisp-edges; \n            image-rendering: pixelated; \n            -ms-interpolation-mode: nearest-neighbor; \n        ",this.app.renderer.view.style.border="1px dashed green",this.app.renderer.view.style.width="100%",this.app.renderer.view.style.height="100%",this.app.renderer.backgroundColor=16777215,this.textureCanvas=document.createElement("canvas"),this.textureCanvas.width=this.world.width,this.textureCanvas.height=this.world.height,this.textureCtx=this.textureCanvas.getContext("2d"),this.baseTexture=new PIXI.BaseTexture.fromCanvas(this.textureCanvas),this.sprite=new PIXI.Sprite(new PIXI.Texture(this.baseTexture,new PIXI.Rectangle(0,0,this.world.width,this.world.height))),this.sprite.x=this.world.width/2,this.sprite.y=this.world.height/2,this.sprite.anchor.set(.5),this.filter=new PIXI.Filter(null,this.loadedResources.fragShader.data),this.sprite.filters=[this.filter],this.app.stage.removeChildren(),this.app.stage.addChild(this.sprite),this.UpdateTexture()}},{key:"OnUpdate",value:function(t){this.framecounter.IncrementFrame()&&(this.filter.uniforms.time+=t,this.world.step(),this.UpdateTexture(),this.app.render())}},{key:"UpdateTexture",value:function(){var t=0,e=this.textureCtx;e.fillStyle="black",e.fillRect(0,0,this.textureCanvas.width,this.textureCanvas.height);for(var i=e.createImageData(this.textureCanvas.width,this.textureCanvas.height),r=0;r<this.textureCanvas.height;r++)for(var n=0;n<this.textureCanvas.width;n++){null!=this.world.grid[r][n].newState&&(this.world.grid[r][n].state=this.world.grid[r][n].newState);var o=this.world.grid[r][n].getColor();try{var a=this.world.palette[o];i.data[t++]=a[0],i.data[t++]=a[1],i.data[t++]=a[2],i.data[t++]=a[3]}catch(t){throw console.error(o),new Error(t)}}e.putImageData(i,0,0),this.baseTexture.update()}}]),t}(),function(){function t(e){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;r(this,t),this.frameCount=0,this.passedFrames=0,this.frameFrequency=e,this.frameLimit=i}return n(t,[{key:"IncrementFrame",value:function(){return this.frameCount+=1,this.frameCount%this.frameFrequency==0&&(!(null!=this.frameLimit&&this.passedFrames>=this.frameLimit)&&(this.frameCount=0,this.passedFrames+=1,!0))}}]),t}())},{"./vendor/cellauto.js":5,"./worlds.js":6}],2:[function(t,e,i){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(i,"__esModule",{value:!0}),i.GUI=void 0;var n=function(){function t(t,e){for(var i=0;i<e.length;i++){var r=e[i];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,i,r){return i&&t(e.prototype,i),r&&t(e,r),e}}(),o=t("./worlds.js");i.GUI=function(){function t(){r(this,t)}return n(t,null,[{key:"Init",value:function(t){if("undefined"==typeof dat)return void console.warn("No DAT.GUI instance found. Import on this page to use!");var e=new dat.GUI;e.add(t.framecounter,"frameFrequency").min(1).max(30).step(1).listen(),e.add(t.worldOptions,"name",Object.getOwnPropertyNames(o.Worlds)).onChange(function(){t.Setup()}).name("Preset"),e.add(t,"Setup").name("Reset")}}]),t}()},{"./worlds.js":6}],3:[function(t,e,i){"use strict";var r=t("./utils/webgl-detect.js"),n=t("./dust.js"),o=t("./gui.js"),a=document.getElementById("dust-container");if(r.Detector.HasWebGL())var s=new n.Dust(a,function(){o.GUI.Init(s)});else console.log("WebGL is not supported on this browser."),a.innerHTML=r.Detector.GetErrorHTML(),a.classList.add("no-webgl")},{"./dust.js":1,"./gui.js":2,"./utils/webgl-detect.js":4}],4:[function(t,e,i){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(i,"__esModule",{value:!0});var n=function(){function t(t,e){for(var i=0;i<e.length;i++){var r=e[i];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,i,r){return i&&t(e.prototype,i),r&&t(e,r),e}}(),o=function(){function t(){r(this,t)}return n(t,null,[{key:"HasWebGL",value:function(){if(window.WebGLRenderingContext){for(var t=document.createElement("canvas"),e=["webgl","experimental-webgl","moz-webgl","webkit-3d"],i=!1,r=0;r<4;r++)try{if((i=t.getContext(e[r]))&&"function"==typeof i.getParameter)return!0}catch(t){}return!1}return!1}},{key:"GetErrorHTML",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;return null==t&&(t='Your graphics card does not seem to support \n                        <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation">WebGL</a>. <br>\n                        Find out how to get it <a href="http://get.webgl.org/">here</a>.'),'\n        <div class="no-webgl-support">\n        <p style="text-align: center;">'+t+"</p>\n        </div>\n        "}}]),t}();i.Detector=o},{}],5:[function(t,e,i){"use strict";function r(t,e){this.x=t,this.y=e,this.delays=[]}function n(t){this.width=24,this.height=24,this.options=t,this.wrap=!1,this.TOPLEFT={index:0,x:-1,y:-1},this.TOP={index:1,x:0,y:-1},this.TOPRIGHT={index:2,x:1,y:-1},this.LEFT={index:3,x:-1,y:0},this.RIGHT={index:4,x:1,y:0},this.BOTTOMLEFT={index:5,x:-1,y:1},this.BOTTOM={index:6,x:0,y:1},this.BOTTOMRIGHT={index:7,x:1,y:1},this.randomGenerator=Math.random;var e=[null,null,null,null,null,null,null,null];this.options.hexTiles&&(e=[null,null,null,null,null,null]),this.step=function(){var t,i;for(t=0;t<this.height;t++)for(i=0;i<this.width;i++)this.grid[t][i].reset();for(t=this.height-1;t>=0;t--)for(i=this.width-1;i>=0;i--){this.fillNeighbors(e,i,t);var r=this.grid[t][i];r.process(e);for(var n=0;n<r.delays.length;n++)--r.delays[n].steps<=0&&(r.delays[n].action(r),r.delays.splice(n,1),n--)}};var i=[{diffX:function(){return-1},diffY:function(){return-1}},{diffX:function(){return 0},diffY:function(){return-1}},{diffX:function(){return 1},diffY:function(){return-1}},{diffX:function(){return-1},diffY:function(){return 0}},{diffX:function(){return 1},diffY:function(){return 0}},{diffX:function(){return-1},diffY:function(){return 1}},{diffX:function(){return 0},diffY:function(){return 1}},{diffX:function(){return 1},diffY:function(){return 1}}];if(this.options.hexTiles&&(i=this.options.flatTopped?[{diffX:function(){return-1},diffY:function(t){return t%2?-1:0}},{diffX:function(){return 0},diffY:function(){return-1}},{diffX:function(){return 1},diffY:function(t){return t%2?-1:0}},{diffX:function(){return 1},diffY:function(t){return t%2?0:1}},{diffX:function(){return 0},diffY:function(){return 1}},{diffX:function(){return-1},diffY:function(t){return t%2?0:1}}]:[{diffX:function(t,e){return e%2?0:-1},diffY:function(){return-1}},{diffX:function(t,e){return e%2?1:0},diffY:function(){return-1}},{diffX:function(){return-1},diffY:function(){return 0}},{diffX:function(){return 1},diffY:function(){return 0}},{diffX:function(t,e){return e%2?0:-1},diffY:function(){return 1}},{diffX:function(t,e){return e%2?1:0},diffY:function(){return 1}}]),this.fillNeighbors=function(t,e,r){for(var n=0;n<i.length;n++){var o=e+i[n].diffX(e,r),a=r+i[n].diffY(e,r);this.wrap&&(o=(o+this.width)%this.width,a=(a+this.height)%this.height),!this.wrap&&(o<0||a<0||o>=this.width||a>=this.height)?t[n]=null:t[n]=this.grid[a][o]}},this.initialize=function(t){t.sort(function(t,e){return t.distribution>e.distribution?1:-1});for(var e=0,i=0;i<t.length;i++)e+=t[i].distribution,t[i].distribution=e;this.grid=[];for(var r=0;r<this.height;r++){this.grid[r]=[];for(var n=0;n<this.width;n++){var o=100*this.randomGenerator();for(i=0;i<t.length;i++)if(o<=t[i].distribution){this.grid[r][n]=new this.cellTypes[t[i].name](n,r);break}}}},this.cellTypes={},this.registerCellType=function(t,e,i){if(this.cellTypes[t]=function(t,n){if(r.call(this,t,n),i&&i.call(this,t,n),e)for(var a in e)"function"!=typeof e[a]&&("object"===o(e[a])?this[a]=JSON.parse(JSON.stringify(e[a])):this[a]=e[a])},this.cellTypes[t].prototype=Object.create(r.prototype),this.cellTypes[t].prototype.constructor=this.cellTypes[t],this.cellTypes[t].prototype.cellType=t,e)for(var n in e)"function"==typeof e[n]&&(this.cellTypes[t].prototype[n]=e[n])},t)for(var n in t)this[n]=t[n]}var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};r.prototype.process=function(t){},r.prototype.countSurroundingCellsWithValue=function(t,e){for(var i=0,r=0;r<t.length;r++)null!==t[r]&&t[r][e]&&i++;return i},r.prototype.delay=function(t,e){this.delays.push({steps:t,action:e})},r.prototype.reset=function(t){},r.prototype.getSurroundingCellsAverageValue=function(t,e){for(var i=0,r=0;r<t.length;r++)null===t[r]||!t[r][e]&&0!==t[r][e]||(i+=t[r][e]);return i/t.length},n.prototype.initializeFromGrid=function(t,e){this.grid=[];for(var i=0;i<this.height;i++){this.grid[i]=[];for(var r=0;r<this.width;r++)for(var n=0;n<t.length;n++)if(t[n].gridValue===e[i][r]){this.grid[i][r]=new this.cellTypes[t[n].name](r,i);break}}},n.prototype.createGridFromValues=function(t,e){for(var i=[],r=0;r<this.height;r++){i[r]=[];for(var n=0;n<this.width;n++){i[r][n]=e;for(var o=this.grid[r][n],a=0;a<t.length;a++)o.cellType==t[a].cellType&&o[t[a].hasProperty]&&(i[r][n]=t[a].value)}}return i},function(){var t={World:n,Cell:r};"function"==typeof define&&define.amd?define("CellAuto",function(){return t}):void 0!==e&&e.exports?e.exports=t:window.CellAuto=t}()},{}],6:[function(t,e,i){"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.Worlds=void 0;var r=t("./vendor/cellauto.js"),n=function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e.default=t,e}(r);i.Worlds={Life:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:96,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:96,i=new n.World({width:t,height:e});return i.palette=[[68,36,52,255],[255,255,255,255]],i.registerCellType("living",{getColor:function(){return this.alive?0:1},process:function(t){var e=this.countSurroundingCellsWithValue(t,"wasAlive");this.alive=3===e||2===e&&this.alive},reset:function(){this.wasAlive=this.alive}},function(){this.alive=Math.random()>.5}),i.initialize([{name:"living",distribution:100}]),i},Lava:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:128,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:128,i=new n.World({width:t,height:e,wrap:!0});i.palette=[[34,10,21,255],[68,17,26,255],[123,16,16,255],[190,45,16,255],[244,102,20,255],[254,212,97,255]];for(var r=[],o=0;o<18;++o)r[o]=1;for(;o<22;++o)r[o]=0;for(;o<25;++o)r[o]=1;for(;o<27;++o)r[o]=2;for(;o<29;++o)r[o]=3;for(;o<32;++o)r[o]=2;for(;o<35;++o)r[o]=0;for(;o<36;++o)r[o]=2;for(;o<38;++o)r[o]=4;for(;o<42;++o)r[o]=5;for(;o<44;++o)r[o]=4;for(;o<46;++o)r[o]=2;for(;o<56;++o)r[o]=1;for(;o<64;++o)r[o]=0;return i.registerCellType("lava",{getColor:function(){var t=this.value+.5+.04*Math.sin(this.x/i.width*Math.PI)+.04*Math.sin(this.y/i.height*Math.PI)-.05;return t=Math.min(1,Math.max(0,t)),r[Math.floor(r.length*t)]},process:function(t){if(!0===this.droplet){for(var e=0;e<t.length;e++)null!==t[e]&&t[e].value&&(t[e].value=.5*this.value,t[e].prev=.5*this.prev);return this.droplet=!1,!0}var i=this.getSurroundingCellsAverageValue(t,"value");return this.next=.998*(2*i-this.prev),!0},reset:function(){return Math.random()>.99993?(this.value=.3*Math.random()-.25,this.prev=this.value,this.droplet=!0):(this.prev=this.value,this.value=this.next),this.value=Math.min(.5,Math.max(-.5,this.value)),!0}},function(){this.value=0,this.prev=this.value,this.next=this.value}),i.initialize([{name:"lava",distribution:100}]),i},Maze:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:128,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:128,i=new n.World({width:t,height:e});return i.palette=[[68,36,52,255],[255,255,255,255]],i.registerCellType("living",{getColor:function(){return this.alive?0:1},process:function(t){var e=this.countSurroundingCellsWithValue(t,"wasAlive");this.simulated<20&&(this.alive=1===e||2===e&&this.alive),this.simulated>20&&2==e&&(this.alive=!0),this.simulated+=1},reset:function(){this.wasAlive=this.alive}},function(){this.alive=Math.random()>.5,this.simulated=0}),i.initialize([{name:"living",distribution:100}]),i},CyclicRainbows:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:128,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:128,i=new n.World({width:t,height:e});return i.recommendedFrameFrequency=1,i.palette=[[255,0,0,255],[255,96,0,255],[255,191,0,255],[223,255,0,255],[128,255,0,255],[32,255,0,255],[0,255,64,255],[0,255,159,255],[0,255,255,255],[0,159,255,255],[0,64,255,255],[32,0,255,255],[127,0,255,255],[223,0,255,255],[255,0,191,255],[255,0,96,255]],i.registerCellType("cyclic",{getColor:function(){return this.state},process:function(t){for(var e=(this.state+Math.floor(2*Math.random()))%16,i=!1,r=0;r<t.length;r++)null!==t[r]&&(i=i||t[r].state===e);return i&&(this.state=e),!0}},function(){this.state=Math.floor(16*Math.random())}),i.initialize([{name:"cyclic",distribution:100}]),i},CavesWithWater:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:128,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:128,i=new n.World({width:t,height:e});i.registerCellType("wall",{process:function(t){var e=this.countSurroundingCellsWithValue(t,"wasOpen");this.open=this.wasOpen&&e>=4||e>=6},reset:function(){this.wasOpen=this.open}},function(){this.open=Math.random()>.4}),i.initialize([{name:"wall",distribution:100}]);for(var r=0;r<10;r++)i.step();var o=i.createGridFromValues([{cellType:"wall",hasProperty:"open",value:0}],1);return i=new n.World({width:t,height:e,clearRect:!0}),i.palette=[[89,125,206,0],[89,125,206,1/9*255],[89,125,206,2/9*255],[89,125,206,85],[89,125,206,4/9*255],[89,125,206,5/9*255],[89,125,206,170],[89,125,206,7/9*255],[89,125,206,8/9*255],[89,125,206,255],[109,170,44,255],[68,36,52,255]],i.registerCellType("water",{getColor:function(){return this.water},process:function(t){if(0!==this.water){if(null!==t[i.BOTTOM.index]&&this.water&&t[i.BOTTOM.index].water<9){var e=Math.min(this.water,9-t[i.BOTTOM.index].water);return this.water-=e,void(t[i.BOTTOM.index].water+=e)}for(var r=5;r<=7;r++)if(r!=i.BOTTOM.index&&null!==t[r]&&this.water&&t[r].water<9){var e=Math.min(this.water,Math.ceil((9-t[r].water)/2));return this.water-=e,void(t[r].water+=e)}for(r=3;r<=4;r++)if(null!==t[r]&&t[r].water<this.water){var e=Math.min(this.water,Math.ceil((9-t[r].water)/3));return this.water-=e,void(t[r].water+=e)}}}},function(){this.water=Math.floor(9*Math.random())}),i.registerCellType("rock",{isSolid:!0,getColor:function(){return this.lighted?10:11},process:function(t){this.lighted=t[i.TOP.index]&&!(9===t[i.TOP.index].water)&&!t[i.TOP.index].isSolid&&t[i.BOTTOM.index]&&t[i.BOTTOM.index].isSolid}}),i.initializeFromGrid([{name:"rock",gridValue:1},{name:"water",gridValue:0}],o),i},Rain:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:128,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:128,i=new n.World({width:t,height:e});i.registerCellType("wall",{process:function(t){var e=this.countSurroundingCellsWithValue(t,"wasOpen");this.open=this.wasOpen&&e>=4||e>=6},reset:function(){this.wasOpen=this.open}},function(){this.open=Math.random()>.4}),i.initialize([{name:"wall",distribution:100}]);for(var r=0;r<10;r++)i.step();for(var o=i.createGridFromValues([{cellType:"wall",hasProperty:"open",value:0}],1),a=0;a<Math.floor(i.height/2);a++)for(var s=0;s<i.width;s++)o[a][s]=0;return i=new n.World({width:t,height:e,clearRect:!0}),i.palette=[[89,125,206,1],[89,125,206,1/9*255],[89,125,206,2/9*255],[89,125,206,85],[89,125,206,4/9*255],[89,125,206,5/9*255],[89,125,206,170],[89,125,206,7/9*255],[89,125,206,8/9*255],[89,125,206,255],[109,170,44,255],[68,36,52,255]],i.registerCellType("air",{getColor:function(){return this.water},process:function(t){if(null===t[i.TOP.index]&&Math.random()<.02)this.water=5;else if(0===this.water)return;if(null!==t[i.BOTTOM.index]&&this.water&&t[i.BOTTOM.index].water<9){var e=Math.min(this.water,9-t[i.BOTTOM.index].water);return this.water-=e,void(t[i.BOTTOM.index].water+=e)}for(var r=5;r<=7;r++)if(r!=i.BOTTOM.index&&null!==t[r]&&this.water&&t[r].water<9){var e=Math.min(this.water,Math.ceil((9-t[r].water)/2));return this.water-=e,void(t[r].water+=e)}for(r=3;r<=4;r++)if(null!==t[r]&&t[r].water<this.water){var e=Math.min(this.water,Math.ceil((9-t[r].water)/3));return this.water-=e,void(t[r].water+=e)}}},function(){this.water=0}),i.registerCellType("rock",{isSolid:!0,getColor:function(){return this.lighted?10:11},process:function(t){this.lighted=t[i.TOP.index]&&!(9===t[i.TOP.index].water)&&!t[i.TOP.index].isSolid&&t[i.BOTTOM.index]&&t[i.BOTTOM.index].isSolid}}),i.initializeFromGrid([{name:"rock",gridValue:1},{name:"air",gridValue:0}],o),i},Splashes:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:128,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:128,i=new n.World({width:t,height:e});i.palette=[];for(var r=[],o=0;o<64;o++)i.palette.push([89,125,206,o/64*255]),r[o]=63-o;return i.registerCellType("water",{getColor:function(){var t=Math.max(2*this.value+.02,0)-.02+.5;return r[Math.floor(r.length*t)]},process:function(t){if(1==this.droplet){for(var e=0;e<t.length;e++)null!==t[e]&&t[e].value&&(t[e].value=.5*this.value,t[e].prev=.5*this.prev);return this.droplet=!1,!0}var i=this.getSurroundingCellsAverageValue(t,"value");return this.next=.99*(2*i-this.prev),!0},reset:function(){return Math.random()>.9999?(this.value=.25*Math.random()-.2,this.prev=this.value,this.droplet=!0):(this.prev=this.value,this.value=this.next),!0}},function(){this.water=!0,this.value=0,this.prev=this.value,this.next=this.value}),i.initialize([{name:"water",distribution:100}]),i},Wolfram:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:96,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:96,i=new n.World({width:t,height:e,wrap:!0});i.recommendedFrameFrequency=2,i.palette=[[255,255,255,255],[255,110,0,255],[255,130,0,255],[255,150,0,255],[255,170,0,255],[255,180,0,255]];var r=Math.random(),o=[[[0,0,0,1,0,0,0,0,0,0],[0,2,1,1,1,1,0,0,0,0],[1,1,3,4,2,1,1,0,0,0],[0,1,1,1,4,1,1,0,0,0],[0,1,2,0,1,1,1,1,0,0],[0,1,1,1,0,0,2,2,0,0],[0,0,2,2,0,0,1,1,1,0],[0,0,1,1,1,1,0,2,1,0],[0,0,0,1,1,4,1,1,1,0],[0,0,0,1,1,2,4,3,1,1],[0,0,0,0,1,1,1,1,2,0],[0,0,0,0,0,0,1,0,0,0]],[[0,0,0,0,0,0,1,0],[1,1,1,1,0,0,1,0],[0,1,0,0,1,1,1,1],[0,1,0,0,0,0,0,0]],[[0,0,0,0,0,0,1,1],[0,0,1,1,1,0,1,1],[1,1,0,1,1,1,0,0],[1,1,0,0,0,0,0,0]],[[0,0,0,0,0,0,1,1],[0,1,1,1,1,1,0,0],[0,0,1,1,1,1,1,0],[1,1,0,0,0,0,0,0]],[[0,0,0,0,0,0,1,1],[1,0,0,0,1,1,1,0],[0,1,1,1,0,0,0,1],[1,1,0,0,0,0,0,0]],[[0,0,0,0,0,0,1,1],[1,0,0,1,1,0,1,1],[1,1,0,1,1,0,0,1],[1,1,0,0,0,0,0,0]],[[0,0,0,0,1,1,1,0],[1,1,1,0,1,1,1,1],[1,1,1,1,0,1,1,1],[0,1,1,1,0,0,0,0]],[[0,0,1,1,1,1,1,1],[1,0,1,1,0,1,1,1],[1,1,1,0,1,1,0,1],[1,1,1,1,1,1,0,0]],[[0,1,0,0,0,1,1,1],[1,0,1,1,0,1,1,1],[1,1,1,0,1,1,0,1],[1,1,1,0,0,0,1,0]],[[0,1,1,0,1,1,1,1],[0,1,0,1,0,0,1,0],[0,1,0,0,1,0,1,0],[1,1,1,1,0,1,1,0]],[[1,1,1,0,1,1,1,0],[0,1,0,0,1,1,1,0],[0,1,1,1,0,0,1,0],[0,1,1,1,0,1,1,1]],[[1,1,1,0,1,1,1,1],[1,1,0,1,1,1,1,0],[0,1,1,1,1,0,1,1],[1,1,1,1,0,1,1,1]],[[1,1,1,1,0,0,0,1],[1,1,0,1,1,0,0,1],[1,0,0,1,1,0,1,1],[1,0,0,0,1,1,1,1]],[[1,1,1,1,0,0,1,0],[0,0,1,0,1,1,0,1],[1,0,1,1,0,1,0,0],[0,1,0,0,1,1,1,1]],[[1,1,1,1,0,0,1,0],[1,0,0,1,1,0,1,1],[1,1,0,1,1,0,0,1],[0,1,0,0,1,1,1,1]],[[1,1,1,1,0,0,1,0],[1,1,1,0,1,0,0,1],[1,0,0,1,0,1,1,1],[0,1,0,0,1,1,1,1]],[[1,1,1,1,0,0,1,0],[1,1,1,0,1,1,0,1],[1,0,1,1,0,1,1,1],[0,1,0,0,1,1,1,1]],[[1,1,1,1,0,0,1,0],[1,1,1,1,0,0,1,1],[1,1,0,0,1,1,1,1],[0,1,0,0,1,1,1,1]],[[1,1,1,1,0,1,0,1],[1,1,1,0,0,1,0,0],[0,0,1,0,0,1,1,1],[1,0,1,0,1,1,1,1]],[[1,1,1,1,0,1,1,0],[0,0,0,0,0,1,1,0],[0,1,1,0,0,0,0,0],[0,1,1,0,1,1,1,1]],[[1,1,1,1,0,1,1,0],[0,1,0,0,1,0,1,0],[0,1,0,1,0,0,1,0],[0,1,1,0,1,1,1,1]],[[1,1,1,1,0,1,1,0],[1,1,1,0,0,1,1,0],[0,1,1,0,0,1,1,1],[0,1,1,0,1,1,1,1]],[[1,1,1,1,1,0,0,0],[0,0,1,1,1,1,0,0],[0,0,1,1,1,1,0,0],[0,0,0,1,1,1,1,1]],[[1,1,1,1,1,0,0,0],[1,1,0,1,1,1,1,0],[0,1,1,1,1,0,1,1],[0,0,0,1,1,1,1,1]],[[1,1,1,1,1,0,1,1],[0,0,1,1,1,0,0,0],[0,0,0,1,1,1,0,0],[1,1,0,1,1,1,1,1]],[[1,1,1,1,1,0,1,1],[0,1,1,1,1,1,0,1],[1,0,1,1,1,1,1,0],[1,1,0,1,1,1,1,1]],[[1,1,1,1,1,0,1,1],[1,1,0,1,0,1,1,0],[0,1,1,0,1,0,1,1],[1,1,0,1,1,1,1,1]],[[1,1,1,1,1,0,1,1],[1,1,1,1,0,0,1,1],[1,1,0,0,1,1,1,1],[1,1,0,1,1,1,1,1]],[[1,1,1,1,1,1,0,0],[0,0,1,0,0,1,1,1],[1,1,1,0,0,1,0,0],[0,0,1,1,1,1,1,1]],[[1,1,1,1,1,1,0,0],[0,1,1,1,1,1,1,0],[0,1,1,1,1,1,1,0],[0,0,1,1,1,1,1,1]],[[1,1,1,1,1,1,1,0],[0,0,1,0,1,0,1,1],[1,1,0,1,0,1,0,0],[0,1,1,1,1,1,1,1]]];return i.registerCellType("living",{getColor:function(){return this.state},process:function(t){var e=t.filter(function(t){return 1==t.state}).length;0==this.state?3!=e&&5!=e&&7!=e||(this.newState=1):1==this.state?0!=e&&1!=e&&2!=e&&6!=e&&8!=e||(this.newState=2):2==this.state?this.newState=3:3==this.state?this.newState=4:4==this.state&&(this.newState=0)},reset:function(){}},function(i,n){if(r<.5){var a;a=r<.25?o[Math.floor(Math.random()*o.length)]:o[0];var s=Math.floor(t/2)-Math.floor(a[0].length/2),l=Math.floor(t/2)+Math.floor(a[0].length/2),h=Math.floor(e/2)-Math.floor(a.length/2),u=Math.floor(e/2)+Math.floor(a.length/2);this.state=0,i>=s&&i<l&&n>=h&&n<u&&(this.state=a[n-h][i-s])}else this.state=Math.random()<.15?1:0;this.newState=this.state}),i.initialize([{name:"living",distribution:100}]),i},BelousovZhabotinsky:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:128,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:128,i=new n.World({width:t,height:e,wrap:!0});i.recommendedFrameFrequency=10;var r=[0,1,1,1,1,1,1,1,1].reverse();i.palette=[];for(var o=0;o<255;o++){var a=Math.floor(1*o);i.palette.push([a,a,a,255])}return i.registerCellType("bz",{getColor:function(){return this.state},process:function(t){for(var e=0,i=0,n=0,o=this.state,a=0;a<t.length+1;a++){var s;s=8==a?this:t[a],o+=s.state*r[a],r[a]>0&&(0==s.state?e+=1:s.state<254?i+=1:n+=1)}0==this.state?this.newState=i/5+n/1:this.state<254?this.newState=o/i+n+1+5:this.newState=0,this.newState=Math.max(0,Math.min(254,Math.floor(this.newState)))},reset:function(){}},function(){this.state=Math.random()<1?Math.floor(255*Math.random()):0,this.newState=this.state}),i.initialize([{name:"bz",distribution:100}]),i}}},{"./vendor/cellauto.js":5}]},{},[3]);