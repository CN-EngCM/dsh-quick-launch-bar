/* dsh-quick-launch-bar 浏览器端产物，由 tools/build.mjs 依据 src 生成。 */
(()=>{var cl=2,ul=1,Ss=class{activate(e){this._terminal=e}dispose(){}fit(){let e=this.proposeDimensions();if(!e||!this._terminal||isNaN(e.cols)||isNaN(e.rows))return;let t=this._terminal._core;(this._terminal.rows!==e.rows||this._terminal.cols!==e.cols)&&(t._renderService.clear(),this._terminal.resize(e.cols,e.rows))}proposeDimensions(){if(!this._terminal||!this._terminal.element||!this._terminal.element.parentElement)return;let e=this._terminal._core._renderService.dimensions;if(e.css.cell.width===0||e.css.cell.height===0)return;let t=this._terminal.options.scrollback===0?0:this._terminal.options.overviewRuler?.width||14,i=window.getComputedStyle(this._terminal.element.parentElement),r=parseInt(i.getPropertyValue("height")),o=Math.max(0,parseInt(i.getPropertyValue("width"))),s=window.getComputedStyle(this._terminal.element),n={top:parseInt(s.getPropertyValue("padding-top")),bottom:parseInt(s.getPropertyValue("padding-bottom")),right:parseInt(s.getPropertyValue("padding-right")),left:parseInt(s.getPropertyValue("padding-left"))},a=n.top+n.bottom,l=n.right+n.left,d=r-a,h=o-l-t;return{cols:Math.max(cl,Math.floor(h/e.css.cell.width)),rows:Math.max(ul,Math.floor(d/e.css.cell.height))}}};var Dn=Object.defineProperty,pl=Object.getOwnPropertyDescriptor,vl=(e,t)=>{for(var i in t)Dn(e,i,{get:t[i],enumerable:!0})},fe=(e,t,i,r)=>{for(var o=r>1?void 0:r?pl(t,i):t,s=e.length-1,n;s>=0;s--)(n=e[s])&&(o=(r?n(t,i,o):n(o))||o);return r&&o&&Dn(t,i,o),o},F=(e,t)=>(i,r)=>t(i,r,e),ys="Terminal input",$r={get:()=>ys,set:e=>ys=e},xs="Too much output to announce, navigate to rows manually to read",Fr={get:()=>xs,set:e=>xs=e};function gl(e){return e.replace(/\r?\n/g,"\r")}function ml(e,t){return t?"\x1B[200~"+e+"\x1B[201~":e}function fl(e,t){e.clipboardData&&e.clipboardData.setData("text/plain",t.selectionText),e.preventDefault()}function _l(e,t,i,r){if(e.stopPropagation(),e.clipboardData){let o=e.clipboardData.getData("text/plain");En(o,t,i,r)}}function En(e,t,i,r){e=gl(e),e=ml(e,i.decPrivateModes.bracketedPasteMode&&r.rawOptions.ignoreBracketedPasteMode!==!0),i.triggerDataEvent(e,!0),t.value=""}function Pn(e,t,i){let r=i.getBoundingClientRect(),o=e.clientX-r.left-10,s=e.clientY-r.top-10;t.style.width="20px",t.style.height="20px",t.style.left=`${o}px`,t.style.top=`${s}px`,t.style.zIndex="1000",t.focus()}function Cs(e,t,i,r,o){Pn(e,t,i),o&&r.rightClickSelect(e),t.value=r.selectionText,t.select()}function At(e){return e>65535?(e-=65536,String.fromCharCode((e>>10)+55296)+String.fromCharCode(e%1024+56320)):String.fromCharCode(e)}function ar(e,t=0,i=e.length){let r="";for(let o=t;o<i;++o){let s=e[o];s>65535?(s-=65536,r+=String.fromCharCode((s>>10)+55296)+String.fromCharCode(s%1024+56320)):r+=String.fromCharCode(s)}return r}var bl=class{constructor(){this._interim=0}clear(){this._interim=0}decode(e,t){let i=e.length;if(!i)return 0;let r=0,o=0;if(this._interim){let s=e.charCodeAt(o++);56320<=s&&s<=57343?t[r++]=(this._interim-55296)*1024+s-56320+65536:(t[r++]=this._interim,t[r++]=s),this._interim=0}for(let s=o;s<i;++s){let n=e.charCodeAt(s);if(55296<=n&&n<=56319){if(++s>=i)return this._interim=n,r;let a=e.charCodeAt(s);56320<=a&&a<=57343?t[r++]=(n-55296)*1024+a-56320+65536:(t[r++]=n,t[r++]=a);continue}n!==65279&&(t[r++]=n)}return r}},wl=class{constructor(){this.interim=new Uint8Array(3)}clear(){this.interim.fill(0)}decode(e,t){let i=e.length;if(!i)return 0;let r=0,o,s,n,a,l=0,d=0;if(this.interim[0]){let u=!1,p=this.interim[0];p&=(p&224)===192?31:(p&240)===224?15:7;let v=0,g;for(;(g=this.interim[++v]&63)&&v<4;)p<<=6,p|=g;let m=(this.interim[0]&224)===192?2:(this.interim[0]&240)===224?3:4,f=m-v;for(;d<f;){if(d>=i)return 0;if(g=e[d++],(g&192)!==128){d--,u=!0;break}else this.interim[v++]=g,p<<=6,p|=g&63}u||(m===2?p<128?d--:t[r++]=p:m===3?p<2048||p>=55296&&p<=57343||p===65279||(t[r++]=p):p<65536||p>1114111||(t[r++]=p)),this.interim.fill(0)}let h=i-4,c=d;for(;c<i;){for(;c<h&&!((o=e[c])&128)&&!((s=e[c+1])&128)&&!((n=e[c+2])&128)&&!((a=e[c+3])&128);)t[r++]=o,t[r++]=s,t[r++]=n,t[r++]=a,c+=4;if(o=e[c++],o<128)t[r++]=o;else if((o&224)===192){if(c>=i)return this.interim[0]=o,r;if(s=e[c++],(s&192)!==128){c--;continue}if(l=(o&31)<<6|s&63,l<128){c--;continue}t[r++]=l}else if((o&240)===224){if(c>=i)return this.interim[0]=o,r;if(s=e[c++],(s&192)!==128){c--;continue}if(c>=i)return this.interim[0]=o,this.interim[1]=s,r;if(n=e[c++],(n&192)!==128){c--;continue}if(l=(o&15)<<12|(s&63)<<6|n&63,l<2048||l>=55296&&l<=57343||l===65279)continue;t[r++]=l}else if((o&248)===240){if(c>=i)return this.interim[0]=o,r;if(s=e[c++],(s&192)!==128){c--;continue}if(c>=i)return this.interim[0]=o,this.interim[1]=s,r;if(n=e[c++],(n&192)!==128){c--;continue}if(c>=i)return this.interim[0]=o,this.interim[1]=s,this.interim[2]=n,r;if(a=e[c++],(a&192)!==128){c--;continue}if(l=(o&7)<<18|(s&63)<<12|(n&63)<<6|a&63,l<65536||l>1114111)continue;t[r++]=l}}return r}},Tn="",It=" ",Di=class zn{constructor(){this.fg=0,this.bg=0,this.extended=new Zi}static toColorRGB(t){return[t>>>16&255,t>>>8&255,t&255]}static fromColorRGB(t){return(t[0]&255)<<16|(t[1]&255)<<8|t[2]&255}clone(){let t=new zn;return t.fg=this.fg,t.bg=this.bg,t.extended=this.extended.clone(),t}isInverse(){return this.fg&67108864}isBold(){return this.fg&134217728}isUnderline(){return this.hasExtendedAttrs()&&this.extended.underlineStyle!==0?1:this.fg&268435456}isBlink(){return this.fg&536870912}isInvisible(){return this.fg&1073741824}isItalic(){return this.bg&67108864}isDim(){return this.bg&134217728}isStrikethrough(){return this.fg&2147483648}isProtected(){return this.bg&536870912}isOverline(){return this.bg&1073741824}getFgColorMode(){return this.fg&50331648}getBgColorMode(){return this.bg&50331648}isFgRGB(){return(this.fg&50331648)===50331648}isBgRGB(){return(this.bg&50331648)===50331648}isFgPalette(){return(this.fg&50331648)===16777216||(this.fg&50331648)===33554432}isBgPalette(){return(this.bg&50331648)===16777216||(this.bg&50331648)===33554432}isFgDefault(){return(this.fg&50331648)===0}isBgDefault(){return(this.bg&50331648)===0}isAttributeDefault(){return this.fg===0&&this.bg===0}getFgColor(){switch(this.fg&50331648){case 16777216:case 33554432:return this.fg&255;case 50331648:return this.fg&16777215;default:return-1}}getBgColor(){switch(this.bg&50331648){case 16777216:case 33554432:return this.bg&255;case 50331648:return this.bg&16777215;default:return-1}}hasExtendedAttrs(){return this.bg&268435456}updateExtended(){this.extended.isEmpty()?this.bg&=-268435457:this.bg|=268435456}getUnderlineColor(){if(this.bg&268435456&&~this.extended.underlineColor)switch(this.extended.underlineColor&50331648){case 16777216:case 33554432:return this.extended.underlineColor&255;case 50331648:return this.extended.underlineColor&16777215;default:return this.getFgColor()}return this.getFgColor()}getUnderlineColorMode(){return this.bg&268435456&&~this.extended.underlineColor?this.extended.underlineColor&50331648:this.getFgColorMode()}isUnderlineColorRGB(){return this.bg&268435456&&~this.extended.underlineColor?(this.extended.underlineColor&50331648)===50331648:this.isFgRGB()}isUnderlineColorPalette(){return this.bg&268435456&&~this.extended.underlineColor?(this.extended.underlineColor&50331648)===16777216||(this.extended.underlineColor&50331648)===33554432:this.isFgPalette()}isUnderlineColorDefault(){return this.bg&268435456&&~this.extended.underlineColor?(this.extended.underlineColor&50331648)===0:this.isFgDefault()}getUnderlineStyle(){return this.fg&268435456?this.bg&268435456?this.extended.underlineStyle:1:0}getUnderlineVariantOffset(){return this.extended.underlineVariantOffset}},Zi=class An{constructor(t=0,i=0){this._ext=0,this._urlId=0,this._ext=t,this._urlId=i}get ext(){return this._urlId?this._ext&-469762049|this.underlineStyle<<26:this._ext}set ext(t){this._ext=t}get underlineStyle(){return this._urlId?5:(this._ext&469762048)>>26}set underlineStyle(t){this._ext&=-469762049,this._ext|=t<<26&469762048}get underlineColor(){return this._ext&67108863}set underlineColor(t){this._ext&=-67108864,this._ext|=t&67108863}get urlId(){return this._urlId}set urlId(t){this._urlId=t}get underlineVariantOffset(){let t=(this._ext&3758096384)>>29;return t<0?t^4294967288:t}set underlineVariantOffset(t){this._ext&=536870911,this._ext|=t<<29&3758096384}clone(){return new An(this._ext,this._urlId)}isEmpty(){return this.underlineStyle===0&&this._urlId===0}},Je=class In extends Di{constructor(){super(...arguments),this.content=0,this.fg=0,this.bg=0,this.extended=new Zi,this.combinedData=""}static fromCharData(t){let i=new In;return i.setFromCharData(t),i}isCombined(){return this.content&2097152}getWidth(){return this.content>>22}getChars(){return this.content&2097152?this.combinedData:this.content&2097151?At(this.content&2097151):""}getCode(){return this.isCombined()?this.combinedData.charCodeAt(this.combinedData.length-1):this.content&2097151}setFromCharData(t){this.fg=t[0],this.bg=0;let i=!1;if(t[1].length>2)i=!0;else if(t[1].length===2){let r=t[1].charCodeAt(0);if(55296<=r&&r<=56319){let o=t[1].charCodeAt(1);56320<=o&&o<=57343?this.content=(r-55296)*1024+o-56320+65536|t[2]<<22:i=!0}else i=!0}else this.content=t[1].charCodeAt(0)|t[2]<<22;i&&(this.combinedData=t[1],this.content=2097152|t[2]<<22)}getAsCharData(){return[this.fg,this.getChars(),this.getWidth(),this.getCode()]}},ks="di$target",Vr="di$dependencies",Dr=new Map;function Sl(e){return e[Vr]||[]}function Ie(e){if(Dr.has(e))return Dr.get(e);let t=function(i,r,o){if(arguments.length!==3)throw new Error("@IServiceName-decorator can only be used to decorate a parameter");yl(t,i,o)};return t._id=e,Dr.set(e,t),t}function yl(e,t,i){t[ks]===t?t[Vr].push({id:e,index:i}):(t[Vr]=[{id:e,index:i}],t[ks]=t)}var Ne=Ie("BufferService"),Gn=Ie("CoreMouseService"),qt=Ie("CoreService"),xl=Ie("CharsetService"),Eo=Ie("InstantiationService"),Mn=Ie("LogService"),Be=Ie("OptionsService"),On=Ie("OscLinkService"),Cl=Ie("UnicodeService"),Ei=Ie("DecorationService"),qr=class{constructor(e,t,i){this._bufferService=e,this._optionsService=t,this._oscLinkService=i}provideLinks(e,t){let i=this._bufferService.buffer.lines.get(e-1);if(!i){t(void 0);return}let r=[],o=this._optionsService.rawOptions.linkHandler,s=new Je,n=i.getTrimmedLength(),a=-1,l=-1,d=!1;for(let h=0;h<n;h++)if(!(l===-1&&!i.hasContent(h))){if(i.loadCell(h,s),s.hasExtendedAttrs()&&s.extended.urlId)if(l===-1){l=h,a=s.extended.urlId;continue}else d=s.extended.urlId!==a;else l!==-1&&(d=!0);if(d||l!==-1&&h===n-1){let c=this._oscLinkService.getLinkData(a)?.uri;if(c){let u={start:{x:l+1,y:e},end:{x:h+(!d&&h===n-1?1:0),y:e}},p=!1;if(!o?.allowNonHttpProtocols)try{let v=new URL(c);["http:","https:"].includes(v.protocol)||(p=!0)}catch{p=!0}p||r.push({text:c,range:u,activate:(v,g)=>o?o.activate(v,g,u):kl(v,g),hover:(v,g)=>o?.hover?.(v,g,u),leave:(v,g)=>o?.leave?.(v,g,u)})}d=!1,s.hasExtendedAttrs()&&s.extended.urlId?(l=h,a=s.extended.urlId):(l=-1,a=-1)}}t(r)}};qr=fe([F(0,Ne),F(1,Be),F(2,On)],qr);function kl(e,t){if(confirm(`Do you want to navigate to ${t}?

WARNING: This link could potentially be dangerous`)){let i=window.open();if(i){try{i.opener=null}catch{}i.location.href=t}else console.warn("Opening link blocked as opener could not be cleared")}}var dr=Ie("CharSizeService"),_t=Ie("CoreBrowserService"),Po=Ie("MouseService"),bt=Ie("RenderService"),Dl=Ie("SelectionService"),Ln=Ie("CharacterJoinerService"),Qt=Ie("ThemeService"),Rn=Ie("LinkProviderService"),El=class{constructor(){this.listeners=[],this.unexpectedErrorHandler=function(e){setTimeout(()=>{throw e.stack?Ds.isErrorNoTelemetry(e)?new Ds(e.message+`

`+e.stack):new Error(e.message+`

`+e.stack):e},0)}}addListener(e){return this.listeners.push(e),()=>{this._removeListener(e)}}emit(e){this.listeners.forEach(t=>{t(e)})}_removeListener(e){this.listeners.splice(this.listeners.indexOf(e),1)}setUnexpectedErrorHandler(e){this.unexpectedErrorHandler=e}getUnexpectedErrorHandler(){return this.unexpectedErrorHandler}onUnexpectedError(e){this.unexpectedErrorHandler(e),this.emit(e)}onUnexpectedExternalError(e){this.unexpectedErrorHandler(e)}},Pl=new El;function $i(e){Tl(e)||Pl.onUnexpectedError(e)}var Ur="Canceled";function Tl(e){return e instanceof zl?!0:e instanceof Error&&e.name===Ur&&e.message===Ur}var zl=class extends Error{constructor(){super(Ur),this.name=this.message}};function Al(e){return e?new Error(`Illegal argument: ${e}`):new Error("Illegal argument")}var Ds=class Kr extends Error{constructor(t){super(t),this.name="CodeExpectedError"}static fromError(t){if(t instanceof Kr)return t;let i=new Kr;return i.message=t.message,i.stack=t.stack,i}static isErrorNoTelemetry(t){return t.name==="CodeExpectedError"}},Yr=class Nn extends Error{constructor(t){super(t||"An unexpected bug occurred."),Object.setPrototypeOf(this,Nn.prototype)}};function Il(e,t,i=0,r=e.length){let o=i,s=r;for(;o<s;){let n=Math.floor((o+s)/2);t(e[n])?o=n+1:s=n}return o-1}var Gl=class Bn{constructor(t){this._array=t,this._findLastMonotonousLastIdx=0}findLastMonotonous(t){if(Bn.assertInvariants){if(this._prevFindLastPredicate){for(let r of this._array)if(this._prevFindLastPredicate(r)&&!t(r))throw new Error("MonotonousArray: current predicate must be weaker than (or equal to) the previous predicate.")}this._prevFindLastPredicate=t}let i=Il(this._array,t,this._findLastMonotonousLastIdx);return this._findLastMonotonousLastIdx=i+1,i===-1?void 0:this._array[i]}};Gl.assertInvariants=!1;function He(e,t=0){return e[e.length-(1+t)]}var Wn;(e=>{function t(s){return s<0}e.isLessThan=t;function i(s){return s<=0}e.isLessThanOrEqual=i;function r(s){return s>0}e.isGreaterThan=r;function o(s){return s===0}e.isNeitherLessOrGreaterThan=o,e.greaterThan=1,e.lessThan=-1,e.neitherLessOrGreaterThan=0})(Wn||={});function Ml(e,t){return(i,r)=>t(e(i),e(r))}var Ol=(e,t)=>e-t,Es=class Xr{constructor(t){this.iterate=t}forEach(t){this.iterate(i=>(t(i),!0))}toArray(){let t=[];return this.iterate(i=>(t.push(i),!0)),t}filter(t){return new Xr(i=>this.iterate(r=>t(r)?i(r):!0))}map(t){return new Xr(i=>this.iterate(r=>i(t(r))))}some(t){let i=!1;return this.iterate(r=>(i=t(r),!i)),i}findFirst(t){let i;return this.iterate(r=>t(r)?(i=r,!1):!0),i}findLast(t){let i;return this.iterate(r=>(t(r)&&(i=r),!0)),i}findLastMaxBy(t){let i,r=!0;return this.iterate(o=>((r||Wn.isGreaterThan(t(o,i)))&&(r=!1,i=o),!0)),i}};Es.empty=new Es(e=>{});function Ll(e,t){let i=Object.create(null);for(let r of e){let o=t(r),s=i[o];s||(s=i[o]=[]),s.push(r)}return i}var Ps,Ts,em=class{constructor(e,t){this.toKey=t,this._map=new Map,this[Ps]="SetWithKey";for(let i of e)this.add(i)}get size(){return this._map.size}add(e){let t=this.toKey(e);return this._map.set(t,e),this}delete(e){return this._map.delete(this.toKey(e))}has(e){return this._map.has(this.toKey(e))}*entries(){for(let e of this._map.values())yield[e,e]}keys(){return this.values()}*values(){for(let e of this._map.values())yield e}clear(){this._map.clear()}forEach(e,t){this._map.forEach(i=>e.call(t,i,i,this))}[(Ts=Symbol.iterator,Ps=Symbol.toStringTag,Ts)](){return this.values()}},Rl=class{constructor(){this.map=new Map}add(e,t){let i=this.map.get(e);i||(i=new Set,this.map.set(e,i)),i.add(t)}delete(e,t){let i=this.map.get(e);i&&(i.delete(t),i.size===0&&this.map.delete(e))}forEach(e,t){let i=this.map.get(e);i&&i.forEach(t)}get(e){return this.map.get(e)||new Set}};function Nl(e,t){let i=this,r=!1,o;return function(){if(r)return o;if(r=!0,t)try{o=e.apply(i,arguments)}finally{t()}else o=e.apply(i,arguments);return o}}var Hn;(e=>{function t(D){return D&&typeof D=="object"&&typeof D[Symbol.iterator]=="function"}e.is=t;let i=Object.freeze([]);function r(){return i}e.empty=r;function*o(D){yield D}e.single=o;function s(D){return t(D)?D:o(D)}e.wrap=s;function n(D){return D||i}e.from=n;function*a(D){for(let T=D.length-1;T>=0;T--)yield D[T]}e.reverse=a;function l(D){return!D||D[Symbol.iterator]().next().done===!0}e.isEmpty=l;function d(D){return D[Symbol.iterator]().next().value}e.first=d;function h(D,T){let R=0;for(let x of D)if(T(x,R++))return!0;return!1}e.some=h;function c(D,T){for(let R of D)if(T(R))return R}e.find=c;function*u(D,T){for(let R of D)T(R)&&(yield R)}e.filter=u;function*p(D,T){let R=0;for(let x of D)yield T(x,R++)}e.map=p;function*v(D,T){let R=0;for(let x of D)yield*T(x,R++)}e.flatMap=v;function*g(...D){for(let T of D)yield*T}e.concat=g;function m(D,T,R){let x=R;for(let C of D)x=T(x,C);return x}e.reduce=m;function*f(D,T,R=D.length){for(T<0&&(T+=D.length),R<0?R+=D.length:R>D.length&&(R=D.length);T<R;T++)yield D[T]}e.slice=f;function S(D,T=Number.POSITIVE_INFINITY){let R=[];if(T===0)return[R,D];let x=D[Symbol.iterator]();for(let C=0;C<T;C++){let L=x.next();if(L.done)return[R,e.empty()];R.push(L.value)}return[R,{[Symbol.iterator](){return x}}]}e.consume=S;async function w(D){let T=[];for await(let R of D)T.push(R);return Promise.resolve(T)}e.asyncToArray=w})(Hn||={});var Bl=!1,$t=null,Wl=class $n{constructor(){this.livingDisposables=new Map}getDisposableData(t){let i=this.livingDisposables.get(t);return i||(i={parent:null,source:null,isSingleton:!1,value:t,idx:$n.idx++},this.livingDisposables.set(t,i)),i}trackDisposable(t){let i=this.getDisposableData(t);i.source||(i.source=new Error().stack)}setParent(t,i){let r=this.getDisposableData(t);r.parent=i}markAsDisposed(t){this.livingDisposables.delete(t)}markAsSingleton(t){this.getDisposableData(t).isSingleton=!0}getRootParent(t,i){let r=i.get(t);if(r)return r;let o=t.parent?this.getRootParent(this.getDisposableData(t.parent),i):t;return i.set(t,o),o}getTrackedDisposables(){let t=new Map;return[...this.livingDisposables.entries()].filter(([,i])=>i.source!==null&&!this.getRootParent(i,t).isSingleton).flatMap(([i])=>i)}computeLeakingDisposables(t=10,i){let r;if(i)r=i;else{let l=new Map,d=[...this.livingDisposables.values()].filter(c=>c.source!==null&&!this.getRootParent(c,l).isSingleton);if(d.length===0)return;let h=new Set(d.map(c=>c.value));if(r=d.filter(c=>!(c.parent&&h.has(c.parent))),r.length===0)throw new Error("There are cyclic diposable chains!")}if(!r)return;function o(l){function d(c,u){for(;c.length>0&&u.some(p=>typeof p=="string"?p===c[0]:c[0].match(p));)c.shift()}let h=l.source.split(`
`).map(c=>c.trim().replace("at ","")).filter(c=>c!=="");return d(h,["Error",/^trackDisposable \(.*\)$/,/^DisposableTracker.trackDisposable \(.*\)$/]),h.reverse()}let s=new Rl;for(let l of r){let d=o(l);for(let h=0;h<=d.length;h++)s.add(d.slice(0,h).join(`
`),l)}r.sort(Ml(l=>l.idx,Ol));let n="",a=0;for(let l of r.slice(0,t)){a++;let d=o(l),h=[];for(let c=0;c<d.length;c++){let u=d[c];u=`(shared with ${s.get(d.slice(0,c+1).join(`
`)).size}/${r.length} leaks) at ${u}`;let p=s.get(d.slice(0,c).join(`
`)),v=Ll([...p].map(g=>o(g)[c]),g=>g);delete v[d[c]];for(let[g,m]of Object.entries(v))h.unshift(`    - stacktraces of ${m.length} other leaks continue with ${g}`);h.unshift(u)}n+=`


==================== Leaking disposable ${a}/${r.length}: ${l.value.constructor.name} ====================
${h.join(`
`)}
============================================================

`}return r.length>t&&(n+=`


... and ${r.length-t} more leaking disposables

`),{leaks:r,details:n}}};Wl.idx=0;function Hl(e){$t=e}if(Bl){let e="__is_disposable_tracked__";Hl(new class{trackDisposable(t){let i=new Error("Potentially leaked disposable").stack;setTimeout(()=>{t[e]||console.log(i)},3e3)}setParent(t,i){if(t&&t!==te.None)try{t[e]=!0}catch{}}markAsDisposed(t){if(t&&t!==te.None)try{t[e]=!0}catch{}}markAsSingleton(t){}})}function lr(e){return $t?.trackDisposable(e),e}function hr(e){$t?.markAsDisposed(e)}function yi(e,t){$t?.setParent(e,t)}function $l(e,t){if($t)for(let i of e)$t.setParent(i,t)}function zs(e){return $t?.markAsSingleton(e),e}function Ft(e){if(Hn.is(e)){let t=[];for(let i of e)if(i)try{i.dispose()}catch(r){t.push(r)}if(t.length===1)throw t[0];if(t.length>1)throw new AggregateError(t,"Encountered errors while disposing of store");return Array.isArray(e)?[]:e}else if(e)return e.dispose(),e}function Fl(...e){let t=ue(()=>Ft(e));return $l(e,t),t}function ue(e){let t=lr({dispose:Nl(()=>{hr(t),e()})});return t}var Fn=class Vn{constructor(){this._toDispose=new Set,this._isDisposed=!1,lr(this)}dispose(){this._isDisposed||(hr(this),this._isDisposed=!0,this.clear())}get isDisposed(){return this._isDisposed}clear(){if(this._toDispose.size!==0)try{Ft(this._toDispose)}finally{this._toDispose.clear()}}add(t){if(!t)return t;if(t===this)throw new Error("Cannot register a disposable on itself!");return yi(t,this),this._isDisposed?Vn.DISABLE_DISPOSED_WARNING||console.warn(new Error("Trying to add a disposable to a DisposableStore that has already been disposed of. The added object will be leaked!").stack):this._toDispose.add(t),t}delete(t){if(t){if(t===this)throw new Error("Cannot dispose a disposable on itself!");this._toDispose.delete(t),t.dispose()}}deleteAndLeak(t){t&&this._toDispose.has(t)&&(this._toDispose.delete(t),yi(t,null))}};Fn.DISABLE_DISPOSED_WARNING=!1;var Gt=Fn,te=class{constructor(){this._store=new Gt,lr(this),yi(this._store,this)}dispose(){hr(this),this._store.dispose()}_register(e){if(e===this)throw new Error("Cannot register a disposable on itself!");return this._store.add(e)}};te.None=Object.freeze({dispose(){}});var Zt=class{constructor(){this._isDisposed=!1,lr(this)}get value(){return this._isDisposed?void 0:this._value}set value(e){this._isDisposed||e===this._value||(this._value?.dispose(),e&&yi(e,this),this._value=e)}clear(){this.value=void 0}dispose(){this._isDisposed=!0,hr(this),this._value?.dispose(),this._value=void 0}clearAndLeak(){let e=this._value;return this._value=void 0,e&&yi(e,null),e}},Ve=typeof window=="object"?window:globalThis,jr=class Jr{constructor(t){this.element=t,this.next=Jr.Undefined,this.prev=Jr.Undefined}};jr.Undefined=new jr(void 0);var ve=jr,As=class{constructor(){this._first=ve.Undefined,this._last=ve.Undefined,this._size=0}get size(){return this._size}isEmpty(){return this._first===ve.Undefined}clear(){let e=this._first;for(;e!==ve.Undefined;){let t=e.next;e.prev=ve.Undefined,e.next=ve.Undefined,e=t}this._first=ve.Undefined,this._last=ve.Undefined,this._size=0}unshift(e){return this._insert(e,!1)}push(e){return this._insert(e,!0)}_insert(e,t){let i=new ve(e);if(this._first===ve.Undefined)this._first=i,this._last=i;else if(t){let o=this._last;this._last=i,i.prev=o,o.next=i}else{let o=this._first;this._first=i,i.next=o,o.prev=i}this._size+=1;let r=!1;return()=>{r||(r=!0,this._remove(i))}}shift(){if(this._first!==ve.Undefined){let e=this._first.element;return this._remove(this._first),e}}pop(){if(this._last!==ve.Undefined){let e=this._last.element;return this._remove(this._last),e}}_remove(e){if(e.prev!==ve.Undefined&&e.next!==ve.Undefined){let t=e.prev;t.next=e.next,e.next.prev=t}else e.prev===ve.Undefined&&e.next===ve.Undefined?(this._first=ve.Undefined,this._last=ve.Undefined):e.next===ve.Undefined?(this._last=this._last.prev,this._last.next=ve.Undefined):e.prev===ve.Undefined&&(this._first=this._first.next,this._first.prev=ve.Undefined);this._size-=1}*[Symbol.iterator](){let e=this._first;for(;e!==ve.Undefined;)yield e.element,e=e.next}},Vl=globalThis.performance&&typeof globalThis.performance.now=="function",ql=class qn{static create(t){return new qn(t)}constructor(t){this._now=Vl&&t===!1?Date.now:globalThis.performance.now.bind(globalThis.performance),this._startTime=this._now(),this._stopTime=-1}stop(){this._stopTime=this._now()}reset(){this._startTime=this._now(),this._stopTime=-1}elapsed(){return this._stopTime!==-1?this._stopTime-this._startTime:this._now()-this._startTime}},Ul=!1,Is=!1,Kl=!1,Ge;(e=>{e.None=()=>te.None;function t(_){if(Kl){let{onDidAddListener:y}=_,P=eo.create(),k=0;_.onDidAddListener=()=>{++k===2&&(console.warn("snapshotted emitter LIKELY used public and SHOULD HAVE BEEN created with DisposableStore. snapshotted here"),P.print()),y?.()}}}function i(_,y){return u(_,()=>{},0,void 0,!0,void 0,y)}e.defer=i;function r(_){return(y,P=null,k)=>{let G=!1,I;return I=_(H=>{if(!G)return I?I.dispose():G=!0,y.call(P,H)},null,k),G&&I.dispose(),I}}e.once=r;function o(_,y,P){return h((k,G=null,I)=>_(H=>k.call(G,y(H)),null,I),P)}e.map=o;function s(_,y,P){return h((k,G=null,I)=>_(H=>{y(H),k.call(G,H)},null,I),P)}e.forEach=s;function n(_,y,P){return h((k,G=null,I)=>_(H=>y(H)&&k.call(G,H),null,I),P)}e.filter=n;function a(_){return _}e.signal=a;function l(..._){return(y,P=null,k)=>{let G=Fl(..._.map(I=>I(H=>y.call(P,H))));return c(G,k)}}e.any=l;function d(_,y,P,k){let G=P;return o(_,I=>(G=y(G,I),G),k)}e.reduce=d;function h(_,y){let P,k={onWillAddFirstListener(){P=_(G.fire,G)},onDidRemoveLastListener(){P?.dispose()}};y||t(k);let G=new N(k);return y?.add(G),G.event}function c(_,y){return y instanceof Array?y.push(_):y&&y.add(_),_}function u(_,y,P=100,k=!1,G=!1,I,H){let U,re,b,z=0,K,Y={leakWarningThreshold:I,onWillAddFirstListener(){U=_(se=>{z++,re=y(re,se),k&&!b&&(q.fire(re),re=void 0),K=()=>{let X=re;re=void 0,b=void 0,(!k||z>1)&&q.fire(X),z=0},typeof P=="number"?(clearTimeout(b),b=setTimeout(K,P)):b===void 0&&(b=0,queueMicrotask(K))})},onWillRemoveListener(){G&&z>0&&K?.()},onDidRemoveLastListener(){K=void 0,U.dispose()}};H||t(Y);let q=new N(Y);return H?.add(q),q.event}e.debounce=u;function p(_,y=0,P){return e.debounce(_,(k,G)=>k?(k.push(G),k):[G],y,void 0,!0,void 0,P)}e.accumulate=p;function v(_,y=(k,G)=>k===G,P){let k=!0,G;return n(_,I=>{let H=k||!y(I,G);return k=!1,G=I,H},P)}e.latch=v;function g(_,y,P){return[e.filter(_,y,P),e.filter(_,k=>!y(k),P)]}e.split=g;function m(_,y=!1,P=[],k){let G=P.slice(),I=_(re=>{G?G.push(re):U.fire(re)});k&&k.add(I);let H=()=>{G?.forEach(re=>U.fire(re)),G=null},U=new N({onWillAddFirstListener(){I||(I=_(re=>U.fire(re)),k&&k.add(I))},onDidAddFirstListener(){G&&(y?setTimeout(H):H())},onDidRemoveLastListener(){I&&I.dispose(),I=null}});return k&&k.add(U),U.event}e.buffer=m;function f(_,y){return(P,k,G)=>{let I=y(new w);return _(function(H){let U=I.evaluate(H);U!==S&&P.call(k,U)},void 0,G)}}e.chain=f;let S=Symbol("HaltChainable");class w{constructor(){this.steps=[]}map(y){return this.steps.push(y),this}forEach(y){return this.steps.push(P=>(y(P),P)),this}filter(y){return this.steps.push(P=>y(P)?P:S),this}reduce(y,P){let k=P;return this.steps.push(G=>(k=y(k,G),k)),this}latch(y=(P,k)=>P===k){let P=!0,k;return this.steps.push(G=>{let I=P||!y(G,k);return P=!1,k=G,I?G:S}),this}evaluate(y){for(let P of this.steps)if(y=P(y),y===S)break;return y}}function D(_,y,P=k=>k){let k=(...U)=>H.fire(P(...U)),G=()=>_.on(y,k),I=()=>_.removeListener(y,k),H=new N({onWillAddFirstListener:G,onDidRemoveLastListener:I});return H.event}e.fromNodeEventEmitter=D;function T(_,y,P=k=>k){let k=(...U)=>H.fire(P(...U)),G=()=>_.addEventListener(y,k),I=()=>_.removeEventListener(y,k),H=new N({onWillAddFirstListener:G,onDidRemoveLastListener:I});return H.event}e.fromDOMEventEmitter=T;function R(_){return new Promise(y=>r(_)(y))}e.toPromise=R;function x(_){let y=new N;return _.then(P=>{y.fire(P)},()=>{y.fire(void 0)}).finally(()=>{y.dispose()}),y.event}e.fromPromise=x;function C(_,y){return _(P=>y.fire(P))}e.forward=C;function L(_,y,P){return y(P),_(k=>y(k))}e.runAndSubscribe=L;class M{constructor(y,P){this._observable=y,this._counter=0,this._hasChanged=!1;let k={onWillAddFirstListener:()=>{y.addObserver(this)},onDidRemoveLastListener:()=>{y.removeObserver(this)}};P||t(k),this.emitter=new N(k),P&&P.add(this.emitter)}beginUpdate(y){this._counter++}handlePossibleChange(y){}handleChange(y,P){this._hasChanged=!0}endUpdate(y){this._counter--,this._counter===0&&(this._observable.reportChanges(),this._hasChanged&&(this._hasChanged=!1,this.emitter.fire(this._observable.get())))}}function O(_,y){return new M(_,y).emitter.event}e.fromObservable=O;function W(_){return(y,P,k)=>{let G=0,I=!1,H={beginUpdate(){G++},endUpdate(){G--,G===0&&(_.reportChanges(),I&&(I=!1,y.call(P)))},handlePossibleChange(){},handleChange(){I=!0}};_.addObserver(H),_.reportChanges();let U={dispose(){_.removeObserver(H)}};return k instanceof Gt?k.add(U):Array.isArray(k)&&k.push(U),U}}e.fromObservableLight=W})(Ge||={});var Zr=class Qr{constructor(t){this.listenerCount=0,this.invocationCount=0,this.elapsedOverall=0,this.durations=[],this.name=`${t}_${Qr._idPool++}`,Qr.all.add(this)}start(t){this._stopWatch=new ql,this.listenerCount=t}stop(){if(this._stopWatch){let t=this._stopWatch.elapsed();this.durations.push(t),this.elapsedOverall+=t,this.invocationCount+=1,this._stopWatch=void 0}}};Zr.all=new Set,Zr._idPool=0;var Yl=Zr,Gs=-1,Un=class Kn{constructor(t,i,r=(Kn._idPool++).toString(16).padStart(3,"0")){this._errorHandler=t,this.threshold=i,this.name=r,this._warnCountdown=0}dispose(){this._stacks?.clear()}check(t,i){let r=this.threshold;if(r<=0||i<r)return;this._stacks||(this._stacks=new Map);let o=this._stacks.get(t.value)||0;if(this._stacks.set(t.value,o+1),this._warnCountdown-=1,this._warnCountdown<=0){this._warnCountdown=r*.5;let[s,n]=this.getMostFrequentStack(),a=`[${this.name}] potential listener LEAK detected, having ${i} listeners already. MOST frequent listener (${n}):`;console.warn(a),console.warn(s);let l=new jl(a,s);this._errorHandler(l)}return()=>{let s=this._stacks.get(t.value)||0;this._stacks.set(t.value,s-1)}}getMostFrequentStack(){if(!this._stacks)return;let t,i=0;for(let[r,o]of this._stacks)(!t||i<o)&&(t=[r,o],i=o);return t}};Un._idPool=1;var Xl=Un,eo=class Yn{constructor(t){this.value=t}static create(){let t=new Error;return new Yn(t.stack??"")}print(){console.warn(this.value.split(`
`).slice(2).join(`
`))}},jl=class extends Error{constructor(e,t){super(e),this.name="ListenerLeakError",this.stack=t}},Jl=class extends Error{constructor(e,t){super(e),this.name="ListenerRefusalError",this.stack=t}},Zl=0,Fi=class{constructor(e){this.value=e,this.id=Zl++}},Ql=2,eh=(e,t)=>{if(e instanceof Fi)t(e);else for(let i=0;i<e.length;i++){let r=e[i];r&&t(r)}},Vi;if(Ul){let e=[];setInterval(()=>{e.length!==0&&(console.warn("[LEAKING LISTENERS] GC'ed these listeners that were NOT yet disposed:"),console.warn(e.join(`
`)),e.length=0)},3e3),Vi=new FinalizationRegistry(t=>{typeof t=="string"&&e.push(t)})}var N=class{constructor(e){this._size=0,this._options=e,this._leakageMon=Gs>0||this._options?.leakWarningThreshold?new Xl(e?.onListenerError??$i,this._options?.leakWarningThreshold??Gs):void 0,this._perfMon=this._options?._profName?new Yl(this._options._profName):void 0,this._deliveryQueue=this._options?.deliveryQueue}dispose(){if(!this._disposed){if(this._disposed=!0,this._deliveryQueue?.current===this&&this._deliveryQueue.reset(),this._listeners){if(Is){let e=this._listeners;queueMicrotask(()=>{eh(e,t=>t.stack?.print())})}this._listeners=void 0,this._size=0}this._options?.onDidRemoveLastListener?.(),this._leakageMon?.dispose()}}get event(){return this._event??=(e,t,i)=>{if(this._leakageMon&&this._size>this._leakageMon.threshold**2){let a=`[${this._leakageMon.name}] REFUSES to accept new listeners because it exceeded its threshold by far (${this._size} vs ${this._leakageMon.threshold})`;console.warn(a);let l=this._leakageMon.getMostFrequentStack()??["UNKNOWN stack",-1],d=new Jl(`${a}. HINT: Stack shows most frequent listener (${l[1]}-times)`,l[0]);return(this._options?.onListenerError||$i)(d),te.None}if(this._disposed)return te.None;t&&(e=e.bind(t));let r=new Fi(e),o,s;this._leakageMon&&this._size>=Math.ceil(this._leakageMon.threshold*.2)&&(r.stack=eo.create(),o=this._leakageMon.check(r.stack,this._size+1)),Is&&(r.stack=s??eo.create()),this._listeners?this._listeners instanceof Fi?(this._deliveryQueue??=new th,this._listeners=[this._listeners,r]):this._listeners.push(r):(this._options?.onWillAddFirstListener?.(this),this._listeners=r,this._options?.onDidAddFirstListener?.(this)),this._size++;let n=ue(()=>{Vi?.unregister(n),o?.(),this._removeListener(r)});if(i instanceof Gt?i.add(n):Array.isArray(i)&&i.push(n),Vi){let a=new Error().stack.split(`
`).slice(2,3).join(`
`).trim(),l=/(file:|vscode-file:\/\/vscode-app)?(\/[^:]*:\d+:\d+)/.exec(a);Vi.register(n,l?.[2]??a,n)}return n},this._event}_removeListener(e){if(this._options?.onWillRemoveListener?.(this),!this._listeners)return;if(this._size===1){this._listeners=void 0,this._options?.onDidRemoveLastListener?.(this),this._size=0;return}let t=this._listeners,i=t.indexOf(e);if(i===-1)throw console.log("disposed?",this._disposed),console.log("size?",this._size),console.log("arr?",JSON.stringify(this._listeners)),new Error("Attempted to dispose unknown listener");this._size--,t[i]=void 0;let r=this._deliveryQueue.current===this;if(this._size*Ql<=t.length){let o=0;for(let s=0;s<t.length;s++)t[s]?t[o++]=t[s]:r&&(this._deliveryQueue.end--,o<this._deliveryQueue.i&&this._deliveryQueue.i--);t.length=o}}_deliver(e,t){if(!e)return;let i=this._options?.onListenerError||$i;if(!i){e.value(t);return}try{e.value(t)}catch(r){i(r)}}_deliverQueue(e){let t=e.current._listeners;for(;e.i<e.end;)this._deliver(t[e.i++],e.value);e.reset()}fire(e){if(this._deliveryQueue?.current&&(this._deliverQueue(this._deliveryQueue),this._perfMon?.stop()),this._perfMon?.start(this._size),this._listeners)if(this._listeners instanceof Fi)this._deliver(this._listeners,e);else{let t=this._deliveryQueue;t.enqueue(this,e,this._listeners.length),this._deliverQueue(t)}this._perfMon?.stop()}hasListeners(){return this._size>0}},th=class{constructor(){this.i=-1,this.end=0}enqueue(e,t,i){this.i=0,this.end=i,this.current=e,this.value=t}reset(){this.i=this.end,this.current=void 0,this.value=void 0}},to=class{constructor(){this.mapWindowIdToZoomLevel=new Map,this._onDidChangeZoomLevel=new N,this.onDidChangeZoomLevel=this._onDidChangeZoomLevel.event,this.mapWindowIdToZoomFactor=new Map,this._onDidChangeFullscreen=new N,this.onDidChangeFullscreen=this._onDidChangeFullscreen.event,this.mapWindowIdToFullScreen=new Map}getZoomLevel(t){return this.mapWindowIdToZoomLevel.get(this.getWindowId(t))??0}setZoomLevel(t,i){if(this.getZoomLevel(i)===t)return;let r=this.getWindowId(i);this.mapWindowIdToZoomLevel.set(r,t),this._onDidChangeZoomLevel.fire(r)}getZoomFactor(t){return this.mapWindowIdToZoomFactor.get(this.getWindowId(t))??1}setZoomFactor(t,i){this.mapWindowIdToZoomFactor.set(this.getWindowId(i),t)}setFullscreen(t,i){if(this.isFullscreen(i)===t)return;let r=this.getWindowId(i);this.mapWindowIdToFullScreen.set(r,t),this._onDidChangeFullscreen.fire(r)}isFullscreen(t){return!!this.mapWindowIdToFullScreen.get(this.getWindowId(t))}getWindowId(t){return t.vscodeWindowId}};to.INSTANCE=new to;var To=to;function ih(e,t,i){typeof t=="string"&&(t=e.matchMedia(t)),t.addEventListener("change",i)}var im=To.INSTANCE.onDidChangeZoomLevel;function rh(e){return To.INSTANCE.getZoomFactor(e)}var rm=To.INSTANCE.onDidChangeFullscreen,ei=typeof navigator=="object"?navigator.userAgent:"",io=ei.indexOf("Firefox")>=0,qi=ei.indexOf("AppleWebKit")>=0,zo=ei.indexOf("Chrome")>=0,Xn=!zo&&ei.indexOf("Safari")>=0,om=ei.indexOf("Electron/")>=0,sm=ei.indexOf("Android")>=0,Ui=!1;if(typeof Ve.matchMedia=="function"){let e=Ve.matchMedia("(display-mode: standalone) or (display-mode: window-controls-overlay)"),t=Ve.matchMedia("(display-mode: fullscreen)");Ui=e.matches,ih(Ve,e,({matches:i})=>{Ui&&t.matches||(Ui=i)})}function oh(){return Ui}var Jt="en",Qi=!1,er=!1,wi=!1,sh=!1,jn=!1,Jn=!1,nh=!1,ah=!1,dh=!1,lh=!1,Ri,Ki=Jt,Ms=Jt,hh,gt,ft=globalThis,Fe;typeof ft.vscode<"u"&&typeof ft.vscode.process<"u"?Fe=ft.vscode.process:typeof process<"u"&&typeof process?.versions?.node=="string"&&(Fe=process);var Zn=typeof Fe?.versions?.electron=="string",ch=Zn&&Fe?.type==="renderer";if(typeof Fe=="object"){Qi=Fe.platform==="win32",er=Fe.platform==="darwin",wi=Fe.platform==="linux",sh=wi&&!!Fe.env.SNAP&&!!Fe.env.SNAP_REVISION,nh=Zn,dh=!!Fe.env.CI||!!Fe.env.BUILD_ARTIFACTSTAGINGDIRECTORY,Ri=Jt,Ki=Jt;let e=Fe.env.VSCODE_NLS_CONFIG;if(e)try{let t=JSON.parse(e);Ri=t.userLocale,Ms=t.osLocale,Ki=t.resolvedLanguage||Jt,hh=t.languagePack?.translationsConfigFile}catch{}jn=!0}else typeof navigator=="object"&&!ch?(gt=navigator.userAgent,Qi=gt.indexOf("Windows")>=0,er=gt.indexOf("Macintosh")>=0,ah=(gt.indexOf("Macintosh")>=0||gt.indexOf("iPad")>=0||gt.indexOf("iPhone")>=0)&&!!navigator.maxTouchPoints&&navigator.maxTouchPoints>0,wi=gt.indexOf("Linux")>=0,lh=gt?.indexOf("Mobi")>=0,Jn=!0,Ki=globalThis._VSCODE_NLS_LANGUAGE||Jt,Ri=navigator.language.toLowerCase(),Ms=Ri):console.error("Unable to resolve platform.");var Er=0;er?Er=1:Qi?Er=3:wi&&(Er=2);var Qn=Qi,dt=er,uh=wi,Pr=jn,ph=Jn&&typeof ft.importScripts=="function",nm=ph?ft.origin:void 0,lt=gt,Et=Ki,vh;(e=>{function t(){return Et}e.value=t;function i(){return Et.length===2?Et==="en":Et.length>=3?Et[0]==="e"&&Et[1]==="n"&&Et[2]==="-":!1}e.isDefaultVariant=i;function r(){return Et==="en"}e.isDefault=r})(vh||={});var gh=typeof ft.postMessage=="function"&&!ft.importScripts,mh=(()=>{if(gh){let e=[];ft.addEventListener("message",i=>{if(i.data&&i.data.vscodeScheduleAsyncWork)for(let r=0,o=e.length;r<o;r++){let s=e[r];if(s.id===i.data.vscodeScheduleAsyncWork){e.splice(r,1),s.callback();return}}});let t=0;return i=>{let r=++t;e.push({id:r,callback:i}),ft.postMessage({vscodeScheduleAsyncWork:r},"*")}}return e=>setTimeout(e)})(),fh=!!(lt&&lt.indexOf("Chrome")>=0),am=!!(lt&&lt.indexOf("Firefox")>=0),dm=!!(!fh&&lt&&lt.indexOf("Safari")>=0),lm=!!(lt&&lt.indexOf("Edg/")>=0),hm=!!(lt&&lt.indexOf("Android")>=0),Pt=typeof navigator=="object"?navigator:{},cm={clipboard:{writeText:Pr||document.queryCommandSupported&&document.queryCommandSupported("copy")||!!(Pt&&Pt.clipboard&&Pt.clipboard.writeText),readText:Pr||!!(Pt&&Pt.clipboard&&Pt.clipboard.readText)},keyboard:Pr||oh()?0:Pt.keyboard||Xn?1:2,touch:"ontouchstart"in Ve||Pt.maxTouchPoints>0,pointerEvents:Ve.PointerEvent&&("ontouchstart"in Ve||navigator.maxTouchPoints>0)},Ao=class{constructor(){this._keyCodeToStr=[],this._strToKeyCode=Object.create(null)}define(e,t){this._keyCodeToStr[e]=t,this._strToKeyCode[t.toLowerCase()]=e}keyCodeToStr(e){return this._keyCodeToStr[e]}strToKeyCode(e){return this._strToKeyCode[e.toLowerCase()]||0}},Tr=new Ao,Os=new Ao,Ls=new Ao,_h=new Array(230),ea;(e=>{function t(a){return Tr.keyCodeToStr(a)}e.toString=t;function i(a){return Tr.strToKeyCode(a)}e.fromString=i;function r(a){return Os.keyCodeToStr(a)}e.toUserSettingsUS=r;function o(a){return Ls.keyCodeToStr(a)}e.toUserSettingsGeneral=o;function s(a){return Os.strToKeyCode(a)||Ls.strToKeyCode(a)}e.fromUserSettings=s;function n(a){if(a>=98&&a<=113)return null;switch(a){case 16:return"Up";case 18:return"Down";case 15:return"Left";case 17:return"Right"}return Tr.keyCodeToStr(a)}e.toElectronAccelerator=n})(ea||={});var bh=class ta{constructor(t,i,r,o,s){this.ctrlKey=t,this.shiftKey=i,this.altKey=r,this.metaKey=o,this.keyCode=s}equals(t){return t instanceof ta&&this.ctrlKey===t.ctrlKey&&this.shiftKey===t.shiftKey&&this.altKey===t.altKey&&this.metaKey===t.metaKey&&this.keyCode===t.keyCode}getHashCode(){let t=this.ctrlKey?"1":"0",i=this.shiftKey?"1":"0",r=this.altKey?"1":"0",o=this.metaKey?"1":"0";return`K${t}${i}${r}${o}${this.keyCode}`}isModifierKey(){return this.keyCode===0||this.keyCode===5||this.keyCode===57||this.keyCode===6||this.keyCode===4}toKeybinding(){return new wh([this])}isDuplicateModifierCase(){return this.ctrlKey&&this.keyCode===5||this.shiftKey&&this.keyCode===4||this.altKey&&this.keyCode===6||this.metaKey&&this.keyCode===57}},wh=class{constructor(e){if(e.length===0)throw Al("chords");this.chords=e}getHashCode(){let e="";for(let t=0,i=this.chords.length;t<i;t++)t!==0&&(e+=";"),e+=this.chords[t].getHashCode();return e}equals(e){if(e===null||this.chords.length!==e.chords.length)return!1;for(let t=0;t<this.chords.length;t++)if(!this.chords[t].equals(e.chords[t]))return!1;return!0}};function Sh(e){if(e.charCode){let i=String.fromCharCode(e.charCode).toUpperCase();return ea.fromString(i)}let t=e.keyCode;if(t===3)return 7;if(io)switch(t){case 59:return 85;case 60:if(uh)return 97;break;case 61:return 86;case 107:return 109;case 109:return 111;case 173:return 88;case 224:if(dt)return 57;break}else if(qi&&(dt&&t===93||!dt&&t===92))return 57;return _h[t]||0}var yh=dt?256:2048,xh=512,Ch=1024,kh=dt?2048:256,ro=class{constructor(e){this._standardKeyboardEventBrand=!0;let t=e;this.browserEvent=t,this.target=t.target,this.ctrlKey=t.ctrlKey,this.shiftKey=t.shiftKey,this.altKey=t.altKey,this.metaKey=t.metaKey,this.altGraphKey=t.getModifierState?.("AltGraph"),this.keyCode=Sh(t),this.code=t.code,this.ctrlKey=this.ctrlKey||this.keyCode===5,this.altKey=this.altKey||this.keyCode===6,this.shiftKey=this.shiftKey||this.keyCode===4,this.metaKey=this.metaKey||this.keyCode===57,this._asKeybinding=this._computeKeybinding(),this._asKeyCodeChord=this._computeKeyCodeChord()}preventDefault(){this.browserEvent&&this.browserEvent.preventDefault&&this.browserEvent.preventDefault()}stopPropagation(){this.browserEvent&&this.browserEvent.stopPropagation&&this.browserEvent.stopPropagation()}toKeyCodeChord(){return this._asKeyCodeChord}equals(e){return this._asKeybinding===e}_computeKeybinding(){let e=0;this.keyCode!==5&&this.keyCode!==4&&this.keyCode!==6&&this.keyCode!==57&&(e=this.keyCode);let t=0;return this.ctrlKey&&(t|=yh),this.altKey&&(t|=xh),this.shiftKey&&(t|=Ch),this.metaKey&&(t|=kh),t|=e,t}_computeKeyCodeChord(){let e=0;return this.keyCode!==5&&this.keyCode!==4&&this.keyCode!==6&&this.keyCode!==57&&(e=this.keyCode),new bh(this.ctrlKey,this.shiftKey,this.altKey,this.metaKey,e)}},Rs=new WeakMap;function Dh(e){if(!e.parent||e.parent===e)return null;try{let t=e.location,i=e.parent.location;if(t.origin!=="null"&&i.origin!=="null"&&t.origin!==i.origin)return null}catch{return null}return e.parent}var Eh=class{static getSameOriginWindowChain(e){let t=Rs.get(e);if(!t){t=[],Rs.set(e,t);let i=e,r;do r=Dh(i),r?t.push({window:new WeakRef(i),iframeElement:i.frameElement||null}):t.push({window:new WeakRef(i),iframeElement:null}),i=r;while(i)}return t.slice(0)}static getPositionOfChildWindowRelativeToAncestorWindow(e,t){if(!t||e===t)return{top:0,left:0};let i=0,r=0,o=this.getSameOriginWindowChain(e);for(let s of o){let n=s.window.deref();if(i+=n?.scrollY??0,r+=n?.scrollX??0,n===t||!s.iframeElement)break;let a=s.iframeElement.getBoundingClientRect();i+=a.top,r+=a.left}return{top:i,left:r}}},vi=class{constructor(e,t){this.timestamp=Date.now(),this.browserEvent=t,this.leftButton=t.button===0,this.middleButton=t.button===1,this.rightButton=t.button===2,this.buttons=t.buttons,this.target=t.target,this.detail=t.detail||1,t.type==="dblclick"&&(this.detail=2),this.ctrlKey=t.ctrlKey,this.shiftKey=t.shiftKey,this.altKey=t.altKey,this.metaKey=t.metaKey,typeof t.pageX=="number"?(this.posx=t.pageX,this.posy=t.pageY):(this.posx=t.clientX+this.target.ownerDocument.body.scrollLeft+this.target.ownerDocument.documentElement.scrollLeft,this.posy=t.clientY+this.target.ownerDocument.body.scrollTop+this.target.ownerDocument.documentElement.scrollTop);let i=Eh.getPositionOfChildWindowRelativeToAncestorWindow(e,t.view);this.posx-=i.left,this.posy-=i.top}preventDefault(){this.browserEvent.preventDefault()}stopPropagation(){this.browserEvent.stopPropagation()}},Ns=class{constructor(e,t=0,i=0){this.browserEvent=e||null,this.target=e?e.target||e.targetNode||e.srcElement:null,this.deltaY=i,this.deltaX=t;let r=!1;if(zo){let o=navigator.userAgent.match(/Chrome\/(\d+)/);r=(o?parseInt(o[1]):123)<=122}if(e){let o=e,s=e,n=e.view?.devicePixelRatio||1;if(typeof o.wheelDeltaY<"u")r?this.deltaY=o.wheelDeltaY/(120*n):this.deltaY=o.wheelDeltaY/120;else if(typeof s.VERTICAL_AXIS<"u"&&s.axis===s.VERTICAL_AXIS)this.deltaY=-s.detail/3;else if(e.type==="wheel"){let a=e;a.deltaMode===a.DOM_DELTA_LINE?io&&!dt?this.deltaY=-e.deltaY/3:this.deltaY=-e.deltaY:this.deltaY=-e.deltaY/40}if(typeof o.wheelDeltaX<"u")Xn&&Qn?this.deltaX=-(o.wheelDeltaX/120):r?this.deltaX=o.wheelDeltaX/(120*n):this.deltaX=o.wheelDeltaX/120;else if(typeof s.HORIZONTAL_AXIS<"u"&&s.axis===s.HORIZONTAL_AXIS)this.deltaX=-e.detail/3;else if(e.type==="wheel"){let a=e;a.deltaMode===a.DOM_DELTA_LINE?io&&!dt?this.deltaX=-e.deltaX/3:this.deltaX=-e.deltaX:this.deltaX=-e.deltaX/40}this.deltaY===0&&this.deltaX===0&&e.wheelDelta&&(r?this.deltaY=e.wheelDelta/(120*n):this.deltaY=e.wheelDelta/120)}}preventDefault(){this.browserEvent?.preventDefault()}stopPropagation(){this.browserEvent?.stopPropagation()}},ia=Object.freeze(function(e,t){let i=setTimeout(e.bind(t),0);return{dispose(){clearTimeout(i)}}}),Ph;(e=>{function t(i){return i===e.None||i===e.Cancelled||i instanceof Th?!0:!i||typeof i!="object"?!1:typeof i.isCancellationRequested=="boolean"&&typeof i.onCancellationRequested=="function"}e.isCancellationToken=t,e.None=Object.freeze({isCancellationRequested:!1,onCancellationRequested:Ge.None}),e.Cancelled=Object.freeze({isCancellationRequested:!0,onCancellationRequested:ia})})(Ph||={});var Th=class{constructor(){this._isCancelled=!1,this._emitter=null}cancel(){this._isCancelled||(this._isCancelled=!0,this._emitter&&(this._emitter.fire(void 0),this.dispose()))}get isCancellationRequested(){return this._isCancelled}get onCancellationRequested(){return this._isCancelled?ia:(this._emitter||(this._emitter=new N),this._emitter.event)}dispose(){this._emitter&&(this._emitter.dispose(),this._emitter=null)}};var Io=class{constructor(e,t){this._isDisposed=!1,this._token=-1,typeof e=="function"&&typeof t=="number"&&this.setIfNotSet(e,t)}dispose(){this.cancel(),this._isDisposed=!0}cancel(){this._token!==-1&&(clearTimeout(this._token),this._token=-1)}cancelAndSet(e,t){if(this._isDisposed)throw new Yr("Calling 'cancelAndSet' on a disposed TimeoutTimer");this.cancel(),this._token=setTimeout(()=>{this._token=-1,e()},t)}setIfNotSet(e,t){if(this._isDisposed)throw new Yr("Calling 'setIfNotSet' on a disposed TimeoutTimer");this._token===-1&&(this._token=setTimeout(()=>{this._token=-1,e()},t))}},zh=class{constructor(){this.disposable=void 0,this.isDisposed=!1}cancel(){this.disposable?.dispose(),this.disposable=void 0}cancelAndSet(e,t,i=globalThis){if(this.isDisposed)throw new Yr("Calling 'cancelAndSet' on a disposed IntervalTimer");this.cancel();let r=i.setInterval(()=>{e()},t);this.disposable=ue(()=>{i.clearInterval(r),this.disposable=void 0})}dispose(){this.cancel(),this.isDisposed=!0}},Ah,zr;(function(){typeof globalThis.requestIdleCallback!="function"||typeof globalThis.cancelIdleCallback!="function"?zr=(e,t)=>{mh(()=>{if(i)return;let r=Date.now()+15;t(Object.freeze({didTimeout:!0,timeRemaining(){return Math.max(0,r-Date.now())}}))});let i=!1;return{dispose(){i||(i=!0)}}}:zr=(e,t,i)=>{let r=e.requestIdleCallback(t,typeof i=="number"?{timeout:i}:void 0),o=!1;return{dispose(){o||(o=!0,e.cancelIdleCallback(r))}}},Ah=e=>zr(globalThis,e)})();var Ih;(e=>{async function t(r){let o,s=await Promise.all(r.map(n=>n.then(a=>a,a=>{o||(o=a)})));if(typeof o<"u")throw o;return s}e.settled=t;function i(r){return new Promise(async(o,s)=>{try{await r(o,s)}catch(n){s(n)}})}e.withAsyncBody=i})(Ih||={});var Bs=class Xe{static fromArray(t){return new Xe(i=>{i.emitMany(t)})}static fromPromise(t){return new Xe(async i=>{i.emitMany(await t)})}static fromPromises(t){return new Xe(async i=>{await Promise.all(t.map(async r=>i.emitOne(await r)))})}static merge(t){return new Xe(async i=>{await Promise.all(t.map(async r=>{for await(let o of r)i.emitOne(o)}))})}constructor(t,i){this._state=0,this._results=[],this._error=null,this._onReturn=i,this._onStateChanged=new N,queueMicrotask(async()=>{let r={emitOne:o=>this.emitOne(o),emitMany:o=>this.emitMany(o),reject:o=>this.reject(o)};try{await Promise.resolve(t(r)),this.resolve()}catch(o){this.reject(o)}finally{r.emitOne=void 0,r.emitMany=void 0,r.reject=void 0}})}[Symbol.asyncIterator](){let t=0;return{next:async()=>{do{if(this._state===2)throw this._error;if(t<this._results.length)return{done:!1,value:this._results[t++]};if(this._state===1)return{done:!0,value:void 0};await Ge.toPromise(this._onStateChanged.event)}while(!0)},return:async()=>(this._onReturn?.(),{done:!0,value:void 0})}}static map(t,i){return new Xe(async r=>{for await(let o of t)r.emitOne(i(o))})}map(t){return Xe.map(this,t)}static filter(t,i){return new Xe(async r=>{for await(let o of t)i(o)&&r.emitOne(o)})}filter(t){return Xe.filter(this,t)}static coalesce(t){return Xe.filter(t,i=>!!i)}coalesce(){return Xe.coalesce(this)}static async toPromise(t){let i=[];for await(let r of t)i.push(r);return i}toPromise(){return Xe.toPromise(this)}emitOne(t){this._state===0&&(this._results.push(t),this._onStateChanged.fire())}emitMany(t){this._state===0&&(this._results=this._results.concat(t),this._onStateChanged.fire())}resolve(){this._state===0&&(this._state=1,this._onStateChanged.fire())}reject(t){this._state===0&&(this._state=2,this._error=t,this._onStateChanged.fire())}};Bs.EMPTY=Bs.fromArray([]);function Gh(e){return 55296<=e&&e<=56319}function Ws(e){return 56320<=e&&e<=57343}function Mh(e,t){return(e-55296<<10)+(t-56320)+65536}function Oh(e){return Go(e,0)}function Go(e,t){switch(typeof e){case"object":return e===null?mt(349,t):Array.isArray(e)?Rh(e,t):Nh(e,t);case"string":return ra(e,t);case"boolean":return Lh(e,t);case"number":return mt(e,t);case"undefined":return mt(937,t);default:return mt(617,t)}}function mt(e,t){return(t<<5)-t+e|0}function Lh(e,t){return mt(e?433:863,t)}function ra(e,t){t=mt(149417,t);for(let i=0,r=e.length;i<r;i++)t=mt(e.charCodeAt(i),t);return t}function Rh(e,t){return t=mt(104579,t),e.reduce((i,r)=>Go(r,i),t)}function Nh(e,t){return t=mt(181387,t),Object.keys(e).sort().reduce((i,r)=>(i=ra(r,i),Go(e[r],i)),t)}function Ar(e,t,i=32){let r=i-t,o=~((1<<r)-1);return(e<<t|(o&e)>>>r)>>>0}function Hs(e,t=0,i=e.byteLength,r=0){for(let o=0;o<i;o++)e[t+o]=r}function Bh(e,t,i="0"){for(;e.length<t;)e=i+e;return e}function ai(e,t=32){return e instanceof ArrayBuffer?Array.from(new Uint8Array(e)).map(i=>i.toString(16).padStart(2,"0")).join(""):Bh((e>>>0).toString(16),t/4)}var Wh=class oa{constructor(){this._h0=1732584193,this._h1=4023233417,this._h2=2562383102,this._h3=271733878,this._h4=3285377520,this._buff=new Uint8Array(67),this._buffDV=new DataView(this._buff.buffer),this._buffLen=0,this._totalLen=0,this._leftoverHighSurrogate=0,this._finished=!1}update(t){let i=t.length;if(i===0)return;let r=this._buff,o=this._buffLen,s=this._leftoverHighSurrogate,n,a;for(s!==0?(n=s,a=-1,s=0):(n=t.charCodeAt(0),a=0);;){let l=n;if(Gh(n))if(a+1<i){let d=t.charCodeAt(a+1);Ws(d)?(a++,l=Mh(n,d)):l=65533}else{s=n;break}else Ws(n)&&(l=65533);if(o=this._push(r,o,l),a++,a<i)n=t.charCodeAt(a);else break}this._buffLen=o,this._leftoverHighSurrogate=s}_push(t,i,r){return r<128?t[i++]=r:r<2048?(t[i++]=192|(r&1984)>>>6,t[i++]=128|(r&63)>>>0):r<65536?(t[i++]=224|(r&61440)>>>12,t[i++]=128|(r&4032)>>>6,t[i++]=128|(r&63)>>>0):(t[i++]=240|(r&1835008)>>>18,t[i++]=128|(r&258048)>>>12,t[i++]=128|(r&4032)>>>6,t[i++]=128|(r&63)>>>0),i>=64&&(this._step(),i-=64,this._totalLen+=64,t[0]=t[64],t[1]=t[65],t[2]=t[66]),i}digest(){return this._finished||(this._finished=!0,this._leftoverHighSurrogate&&(this._leftoverHighSurrogate=0,this._buffLen=this._push(this._buff,this._buffLen,65533)),this._totalLen+=this._buffLen,this._wrapUp()),ai(this._h0)+ai(this._h1)+ai(this._h2)+ai(this._h3)+ai(this._h4)}_wrapUp(){this._buff[this._buffLen++]=128,Hs(this._buff,this._buffLen),this._buffLen>56&&(this._step(),Hs(this._buff));let t=8*this._totalLen;this._buffDV.setUint32(56,Math.floor(t/4294967296),!1),this._buffDV.setUint32(60,t%4294967296,!1),this._step()}_step(){let t=oa._bigBlock32,i=this._buffDV;for(let c=0;c<64;c+=4)t.setUint32(c,i.getUint32(c,!1),!1);for(let c=64;c<320;c+=4)t.setUint32(c,Ar(t.getUint32(c-12,!1)^t.getUint32(c-32,!1)^t.getUint32(c-56,!1)^t.getUint32(c-64,!1),1),!1);let r=this._h0,o=this._h1,s=this._h2,n=this._h3,a=this._h4,l,d,h;for(let c=0;c<80;c++)c<20?(l=o&s|~o&n,d=1518500249):c<40?(l=o^s^n,d=1859775393):c<60?(l=o&s|o&n|s&n,d=2400959708):(l=o^s^n,d=3395469782),h=Ar(r,5)+l+a+d+t.getUint32(c*4,!1)&4294967295,a=n,n=s,s=Ar(o,30),o=r,r=h;this._h0=this._h0+r&4294967295,this._h1=this._h1+o&4294967295,this._h2=this._h2+s&4294967295,this._h3=this._h3+n&4294967295,this._h4=this._h4+a&4294967295}};Wh._bigBlock32=new DataView(new ArrayBuffer(320));var{registerWindow:um,getWindow:tt,getDocument:pm,getWindows:vm,getWindowsCount:gm,getWindowId:$s,getWindowById:mm,hasWindow:fm,onDidRegisterWindow:Hh,onWillUnregisterWindow:_m,onDidUnregisterWindow:bm}=(function(){let e=new Map,t={window:Ve,disposables:new Gt};e.set(Ve.vscodeWindowId,t);let i=new N,r=new N,o=new N;function s(n,a){return(typeof n=="number"?e.get(n):void 0)??(a?t:void 0)}return{onDidRegisterWindow:i.event,onWillUnregisterWindow:o.event,onDidUnregisterWindow:r.event,registerWindow(n){if(e.has(n.vscodeWindowId))return te.None;let a=new Gt,l={window:n,disposables:a.add(new Gt)};return e.set(n.vscodeWindowId,l),a.add(ue(()=>{e.delete(n.vscodeWindowId),r.fire(n)})),a.add(Q(n,Pe.BEFORE_UNLOAD,()=>{o.fire(n)})),i.fire(l),a},getWindows(){return e.values()},getWindowsCount(){return e.size},getWindowId(n){return n.vscodeWindowId},hasWindow(n){return e.has(n)},getWindowById:s,getWindow(n){let a=n;if(a?.ownerDocument?.defaultView)return a.ownerDocument.defaultView.window;let l=n;return l?.view?l.view.window:Ve},getDocument(n){return tt(n).document}}})(),$h=class{constructor(e,t,i,r){this._node=e,this._type=t,this._handler=i,this._options=r||!1,this._node.addEventListener(this._type,this._handler,this._options)}dispose(){this._handler&&(this._node.removeEventListener(this._type,this._handler,this._options),this._node=null,this._handler=null)}};function Q(e,t,i,r){return new $h(e,t,i,r)}function Fh(e,t){return function(i){return t(new vi(e,i))}}function Vh(e){return function(t){return e(new ro(t))}}var Fs=function(e,t,i,r){let o=i;return t==="click"||t==="mousedown"||t==="contextmenu"?o=Fh(tt(e),i):(t==="keydown"||t==="keypress"||t==="keyup")&&(o=Vh(i)),Q(e,t,o,r)},qh,tr,Uh=class extends zh{constructor(e){super(),this.defaultTarget=e&&tt(e)}cancelAndSet(e,t,i){return super.cancelAndSet(e,t,i??this.defaultTarget)}},Ir=class{constructor(e,t=0){this._runner=e,this.priority=t,this._canceled=!1}dispose(){this._canceled=!0}execute(){if(!this._canceled)try{this._runner()}catch(e){$i(e)}}static sort(e,t){return t.priority-e.priority}};(function(){let e=new Map,t=new Map,i=new Map,r=new Map,o=s=>{i.set(s,!1);let n=e.get(s)??[];for(t.set(s,n),e.set(s,[]),r.set(s,!0);n.length>0;)n.sort(Ir.sort),n.shift().execute();r.set(s,!1)};tr=(s,n,a=0)=>{let l=$s(s),d=new Ir(n,a),h=e.get(l);return h||(h=[],e.set(l,h)),h.push(d),i.get(l)||(i.set(l,!0),s.requestAnimationFrame(()=>o(l))),d},qh=(s,n,a)=>{let l=$s(s);if(r.get(l)){let d=new Ir(n,a),h=t.get(l);return h||(h=[],t.set(l,h)),h.push(d),d}else return tr(s,n,a)}})();var Vs=class Yi{constructor(t,i){this.width=t,this.height=i}with(t=this.width,i=this.height){return t!==this.width||i!==this.height?new Yi(t,i):this}static is(t){return typeof t=="object"&&typeof t.height=="number"&&typeof t.width=="number"}static lift(t){return t instanceof Yi?t:new Yi(t.width,t.height)}static equals(t,i){return t===i?!0:!t||!i?!1:t.width===i.width&&t.height===i.height}};Vs.None=new Vs(0,0);function Kh(e){let t=e.getBoundingClientRect(),i=tt(e);return{left:t.left+i.scrollX,top:t.top+i.scrollY,width:t.width,height:t.height}}var wm=new class{constructor(){this.mutationObservers=new Map}observe(e,t,i){let r=this.mutationObservers.get(e);r||(r=new Map,this.mutationObservers.set(e,r));let o=Oh(i),s=r.get(o);if(s)s.users+=1;else{let n=new N,a=new MutationObserver(d=>n.fire(d));a.observe(e,i);let l=s={users:1,observer:a,onDidMutate:n.event};t.add(ue(()=>{l.users-=1,l.users===0&&(n.dispose(),a.disconnect(),r?.delete(o),r?.size===0&&this.mutationObservers.delete(e))})),r.set(o,s)}return s.onDidMutate}},Pe={CLICK:"click",AUXCLICK:"auxclick",DBLCLICK:"dblclick",MOUSE_UP:"mouseup",MOUSE_DOWN:"mousedown",MOUSE_OVER:"mouseover",MOUSE_MOVE:"mousemove",MOUSE_OUT:"mouseout",MOUSE_ENTER:"mouseenter",MOUSE_LEAVE:"mouseleave",MOUSE_WHEEL:"wheel",POINTER_UP:"pointerup",POINTER_DOWN:"pointerdown",POINTER_MOVE:"pointermove",POINTER_LEAVE:"pointerleave",CONTEXT_MENU:"contextmenu",WHEEL:"wheel",KEY_DOWN:"keydown",KEY_PRESS:"keypress",KEY_UP:"keyup",LOAD:"load",BEFORE_UNLOAD:"beforeunload",UNLOAD:"unload",PAGE_SHOW:"pageshow",PAGE_HIDE:"pagehide",PASTE:"paste",ABORT:"abort",ERROR:"error",RESIZE:"resize",SCROLL:"scroll",FULLSCREEN_CHANGE:"fullscreenchange",WK_FULLSCREEN_CHANGE:"webkitfullscreenchange",SELECT:"select",CHANGE:"change",SUBMIT:"submit",RESET:"reset",FOCUS:"focus",FOCUS_IN:"focusin",FOCUS_OUT:"focusout",BLUR:"blur",INPUT:"input",STORAGE:"storage",DRAG_START:"dragstart",DRAG:"drag",DRAG_ENTER:"dragenter",DRAG_LEAVE:"dragleave",DRAG_OVER:"dragover",DROP:"drop",DRAG_END:"dragend",ANIMATION_START:qi?"webkitAnimationStart":"animationstart",ANIMATION_END:qi?"webkitAnimationEnd":"animationend",ANIMATION_ITERATION:qi?"webkitAnimationIteration":"animationiteration"},Yh=/([\w\-]+)?(#([\w\-]+))?((\.([\w\-]+))*)/;function sa(e,t,i,...r){let o=Yh.exec(t);if(!o)throw new Error("Bad use of emmet");let s=o[1]||"div",n;return e!=="http://www.w3.org/1999/xhtml"?n=document.createElementNS(e,s):n=document.createElement(s),o[3]&&(n.id=o[3]),o[4]&&(n.className=o[4].replace(/\./g," ").trim()),i&&Object.entries(i).forEach(([a,l])=>{typeof l>"u"||(/^on\w+$/.test(a)?n[a]=l:a==="selected"?l&&n.setAttribute(a,"true"):n.setAttribute(a,l))}),n.append(...r),n}function Xh(e,t,...i){return sa("http://www.w3.org/1999/xhtml",e,t,...i)}Xh.SVG=function(e,t,...i){return sa("http://www.w3.org/2000/svg",e,t,...i)};var jh=class{constructor(e){this.domNode=e,this._maxWidth="",this._width="",this._height="",this._top="",this._left="",this._bottom="",this._right="",this._paddingTop="",this._paddingLeft="",this._paddingBottom="",this._paddingRight="",this._fontFamily="",this._fontWeight="",this._fontSize="",this._fontStyle="",this._fontFeatureSettings="",this._fontVariationSettings="",this._textDecoration="",this._lineHeight="",this._letterSpacing="",this._className="",this._display="",this._position="",this._visibility="",this._color="",this._backgroundColor="",this._layerHint=!1,this._contain="none",this._boxShadow=""}setMaxWidth(e){let t=We(e);this._maxWidth!==t&&(this._maxWidth=t,this.domNode.style.maxWidth=this._maxWidth)}setWidth(e){let t=We(e);this._width!==t&&(this._width=t,this.domNode.style.width=this._width)}setHeight(e){let t=We(e);this._height!==t&&(this._height=t,this.domNode.style.height=this._height)}setTop(e){let t=We(e);this._top!==t&&(this._top=t,this.domNode.style.top=this._top)}setLeft(e){let t=We(e);this._left!==t&&(this._left=t,this.domNode.style.left=this._left)}setBottom(e){let t=We(e);this._bottom!==t&&(this._bottom=t,this.domNode.style.bottom=this._bottom)}setRight(e){let t=We(e);this._right!==t&&(this._right=t,this.domNode.style.right=this._right)}setPaddingTop(e){let t=We(e);this._paddingTop!==t&&(this._paddingTop=t,this.domNode.style.paddingTop=this._paddingTop)}setPaddingLeft(e){let t=We(e);this._paddingLeft!==t&&(this._paddingLeft=t,this.domNode.style.paddingLeft=this._paddingLeft)}setPaddingBottom(e){let t=We(e);this._paddingBottom!==t&&(this._paddingBottom=t,this.domNode.style.paddingBottom=this._paddingBottom)}setPaddingRight(e){let t=We(e);this._paddingRight!==t&&(this._paddingRight=t,this.domNode.style.paddingRight=this._paddingRight)}setFontFamily(e){this._fontFamily!==e&&(this._fontFamily=e,this.domNode.style.fontFamily=this._fontFamily)}setFontWeight(e){this._fontWeight!==e&&(this._fontWeight=e,this.domNode.style.fontWeight=this._fontWeight)}setFontSize(e){let t=We(e);this._fontSize!==t&&(this._fontSize=t,this.domNode.style.fontSize=this._fontSize)}setFontStyle(e){this._fontStyle!==e&&(this._fontStyle=e,this.domNode.style.fontStyle=this._fontStyle)}setFontFeatureSettings(e){this._fontFeatureSettings!==e&&(this._fontFeatureSettings=e,this.domNode.style.fontFeatureSettings=this._fontFeatureSettings)}setFontVariationSettings(e){this._fontVariationSettings!==e&&(this._fontVariationSettings=e,this.domNode.style.fontVariationSettings=this._fontVariationSettings)}setTextDecoration(e){this._textDecoration!==e&&(this._textDecoration=e,this.domNode.style.textDecoration=this._textDecoration)}setLineHeight(e){let t=We(e);this._lineHeight!==t&&(this._lineHeight=t,this.domNode.style.lineHeight=this._lineHeight)}setLetterSpacing(e){let t=We(e);this._letterSpacing!==t&&(this._letterSpacing=t,this.domNode.style.letterSpacing=this._letterSpacing)}setClassName(e){this._className!==e&&(this._className=e,this.domNode.className=this._className)}toggleClassName(e,t){this.domNode.classList.toggle(e,t),this._className=this.domNode.className}setDisplay(e){this._display!==e&&(this._display=e,this.domNode.style.display=this._display)}setPosition(e){this._position!==e&&(this._position=e,this.domNode.style.position=this._position)}setVisibility(e){this._visibility!==e&&(this._visibility=e,this.domNode.style.visibility=this._visibility)}setColor(e){this._color!==e&&(this._color=e,this.domNode.style.color=this._color)}setBackgroundColor(e){this._backgroundColor!==e&&(this._backgroundColor=e,this.domNode.style.backgroundColor=this._backgroundColor)}setLayerHinting(e){this._layerHint!==e&&(this._layerHint=e,this.domNode.style.transform=this._layerHint?"translate3d(0px, 0px, 0px)":"")}setBoxShadow(e){this._boxShadow!==e&&(this._boxShadow=e,this.domNode.style.boxShadow=e)}setContain(e){this._contain!==e&&(this._contain=e,this.domNode.style.contain=this._contain)}setAttribute(e,t){this.domNode.setAttribute(e,t)}removeAttribute(e){this.domNode.removeAttribute(e)}appendChild(e){this.domNode.appendChild(e.domNode)}removeChild(e){this.domNode.removeChild(e.domNode)}};function We(e){return typeof e=="number"?`${e}px`:e}function Si(e){return new jh(e)}var na=class{constructor(){this._hooks=new Gt,this._pointerMoveCallback=null,this._onStopCallback=null}dispose(){this.stopMonitoring(!1),this._hooks.dispose()}stopMonitoring(e,t){if(!this.isMonitoring())return;this._hooks.clear(),this._pointerMoveCallback=null;let i=this._onStopCallback;this._onStopCallback=null,e&&i&&i(t)}isMonitoring(){return!!this._pointerMoveCallback}startMonitoring(e,t,i,r,o){this.isMonitoring()&&this.stopMonitoring(!1),this._pointerMoveCallback=r,this._onStopCallback=o;let s=e;try{e.setPointerCapture(t),this._hooks.add(ue(()=>{try{e.releasePointerCapture(t)}catch{}}))}catch{s=tt(e)}this._hooks.add(Q(s,Pe.POINTER_MOVE,n=>{if(n.buttons!==i){this.stopMonitoring(!0);return}n.preventDefault(),this._pointerMoveCallback(n)})),this._hooks.add(Q(s,Pe.POINTER_UP,n=>this.stopMonitoring(!0)))}};function Jh(e,t,i){let r=null,o=null;if(typeof i.value=="function"?(r="value",o=i.value,o.length!==0&&console.warn("Memoize should only be used in functions with zero parameters")):typeof i.get=="function"&&(r="get",o=i.get),!o)throw new Error("not supported");let s=`$memoize$${t}`;i[r]=function(...n){return this.hasOwnProperty(s)||Object.defineProperty(this,s,{configurable:!1,enumerable:!1,writable:!1,value:o.apply(this,n)}),this[s]}}var at;(e=>(e.Tap="-xterm-gesturetap",e.Change="-xterm-gesturechange",e.Start="-xterm-gesturestart",e.End="-xterm-gesturesend",e.Contextmenu="-xterm-gesturecontextmenu"))(at||={});var gi=class Oe extends te{constructor(){super(),this.dispatched=!1,this.targets=new As,this.ignoreTargets=new As,this.activeTouches={},this.handle=null,this._lastSetTapCountTime=0,this._register(Ge.runAndSubscribe(Hh,({window:t,disposables:i})=>{i.add(Q(t.document,"touchstart",r=>this.onTouchStart(r),{passive:!1})),i.add(Q(t.document,"touchend",r=>this.onTouchEnd(t,r))),i.add(Q(t.document,"touchmove",r=>this.onTouchMove(r),{passive:!1}))},{window:Ve,disposables:this._store}))}static addTarget(t){if(!Oe.isTouchDevice())return te.None;Oe.INSTANCE||(Oe.INSTANCE=zs(new Oe));let i=Oe.INSTANCE.targets.push(t);return ue(i)}static ignoreTarget(t){if(!Oe.isTouchDevice())return te.None;Oe.INSTANCE||(Oe.INSTANCE=zs(new Oe));let i=Oe.INSTANCE.ignoreTargets.push(t);return ue(i)}static isTouchDevice(){return"ontouchstart"in Ve||navigator.maxTouchPoints>0}dispose(){this.handle&&(this.handle.dispose(),this.handle=null),super.dispose()}onTouchStart(t){let i=Date.now();this.handle&&(this.handle.dispose(),this.handle=null);for(let r=0,o=t.targetTouches.length;r<o;r++){let s=t.targetTouches.item(r);this.activeTouches[s.identifier]={id:s.identifier,initialTarget:s.target,initialTimeStamp:i,initialPageX:s.pageX,initialPageY:s.pageY,rollingTimestamps:[i],rollingPageX:[s.pageX],rollingPageY:[s.pageY]};let n=this.newGestureEvent(at.Start,s.target);n.pageX=s.pageX,n.pageY=s.pageY,this.dispatchEvent(n)}this.dispatched&&(t.preventDefault(),t.stopPropagation(),this.dispatched=!1)}onTouchEnd(t,i){let r=Date.now(),o=Object.keys(this.activeTouches).length;for(let s=0,n=i.changedTouches.length;s<n;s++){let a=i.changedTouches.item(s);if(!this.activeTouches.hasOwnProperty(String(a.identifier))){console.warn("move of an UNKNOWN touch",a);continue}let l=this.activeTouches[a.identifier],d=Date.now()-l.initialTimeStamp;if(d<Oe.HOLD_DELAY&&Math.abs(l.initialPageX-He(l.rollingPageX))<30&&Math.abs(l.initialPageY-He(l.rollingPageY))<30){let h=this.newGestureEvent(at.Tap,l.initialTarget);h.pageX=He(l.rollingPageX),h.pageY=He(l.rollingPageY),this.dispatchEvent(h)}else if(d>=Oe.HOLD_DELAY&&Math.abs(l.initialPageX-He(l.rollingPageX))<30&&Math.abs(l.initialPageY-He(l.rollingPageY))<30){let h=this.newGestureEvent(at.Contextmenu,l.initialTarget);h.pageX=He(l.rollingPageX),h.pageY=He(l.rollingPageY),this.dispatchEvent(h)}else if(o===1){let h=He(l.rollingPageX),c=He(l.rollingPageY),u=He(l.rollingTimestamps)-l.rollingTimestamps[0],p=h-l.rollingPageX[0],v=c-l.rollingPageY[0],g=[...this.targets].filter(m=>l.initialTarget instanceof Node&&m.contains(l.initialTarget));this.inertia(t,g,r,Math.abs(p)/u,p>0?1:-1,h,Math.abs(v)/u,v>0?1:-1,c)}this.dispatchEvent(this.newGestureEvent(at.End,l.initialTarget)),delete this.activeTouches[a.identifier]}this.dispatched&&(i.preventDefault(),i.stopPropagation(),this.dispatched=!1)}newGestureEvent(t,i){let r=document.createEvent("CustomEvent");return r.initEvent(t,!1,!0),r.initialTarget=i,r.tapCount=0,r}dispatchEvent(t){if(t.type===at.Tap){let i=new Date().getTime(),r=0;i-this._lastSetTapCountTime>Oe.CLEAR_TAP_COUNT_TIME?r=1:r=2,this._lastSetTapCountTime=i,t.tapCount=r}else(t.type===at.Change||t.type===at.Contextmenu)&&(this._lastSetTapCountTime=0);if(t.initialTarget instanceof Node){for(let r of this.ignoreTargets)if(r.contains(t.initialTarget))return;let i=[];for(let r of this.targets)if(r.contains(t.initialTarget)){let o=0,s=t.initialTarget;for(;s&&s!==r;)o++,s=s.parentElement;i.push([o,r])}i.sort((r,o)=>r[0]-o[0]);for(let[r,o]of i)o.dispatchEvent(t),this.dispatched=!0}}inertia(t,i,r,o,s,n,a,l,d){this.handle=tr(t,()=>{let h=Date.now(),c=h-r,u=0,p=0,v=!0;o+=Oe.SCROLL_FRICTION*c,a+=Oe.SCROLL_FRICTION*c,o>0&&(v=!1,u=s*o*c),a>0&&(v=!1,p=l*a*c);let g=this.newGestureEvent(at.Change);g.translationX=u,g.translationY=p,i.forEach(m=>m.dispatchEvent(g)),v||this.inertia(t,i,h,o,s,n+u,a,l,d+p)})}onTouchMove(t){let i=Date.now();for(let r=0,o=t.changedTouches.length;r<o;r++){let s=t.changedTouches.item(r);if(!this.activeTouches.hasOwnProperty(String(s.identifier))){console.warn("end of an UNKNOWN touch",s);continue}let n=this.activeTouches[s.identifier],a=this.newGestureEvent(at.Change,n.initialTarget);a.translationX=s.pageX-He(n.rollingPageX),a.translationY=s.pageY-He(n.rollingPageY),a.pageX=s.pageX,a.pageY=s.pageY,this.dispatchEvent(a),n.rollingPageX.length>3&&(n.rollingPageX.shift(),n.rollingPageY.shift(),n.rollingTimestamps.shift()),n.rollingPageX.push(s.pageX),n.rollingPageY.push(s.pageY),n.rollingTimestamps.push(i)}this.dispatched&&(t.preventDefault(),t.stopPropagation(),this.dispatched=!1)}};gi.SCROLL_FRICTION=-.005,gi.HOLD_DELAY=700,gi.CLEAR_TAP_COUNT_TIME=400,fe([Jh],gi,"isTouchDevice",1);var Zh=gi,Mo=class extends te{onclick(e,t){this._register(Q(e,Pe.CLICK,i=>t(new vi(tt(e),i))))}onmousedown(e,t){this._register(Q(e,Pe.MOUSE_DOWN,i=>t(new vi(tt(e),i))))}onmouseover(e,t){this._register(Q(e,Pe.MOUSE_OVER,i=>t(new vi(tt(e),i))))}onmouseleave(e,t){this._register(Q(e,Pe.MOUSE_LEAVE,i=>t(new vi(tt(e),i))))}onkeydown(e,t){this._register(Q(e,Pe.KEY_DOWN,i=>t(new ro(i))))}onkeyup(e,t){this._register(Q(e,Pe.KEY_UP,i=>t(new ro(i))))}oninput(e,t){this._register(Q(e,Pe.INPUT,t))}onblur(e,t){this._register(Q(e,Pe.BLUR,t))}onfocus(e,t){this._register(Q(e,Pe.FOCUS,t))}onchange(e,t){this._register(Q(e,Pe.CHANGE,t))}ignoreGesture(e){return Zh.ignoreTarget(e)}},qs=11,Qh=class extends Mo{constructor(e){super(),this._onActivate=e.onActivate,this.bgDomNode=document.createElement("div"),this.bgDomNode.className="arrow-background",this.bgDomNode.style.position="absolute",this.bgDomNode.style.width=e.bgWidth+"px",this.bgDomNode.style.height=e.bgHeight+"px",typeof e.top<"u"&&(this.bgDomNode.style.top="0px"),typeof e.left<"u"&&(this.bgDomNode.style.left="0px"),typeof e.bottom<"u"&&(this.bgDomNode.style.bottom="0px"),typeof e.right<"u"&&(this.bgDomNode.style.right="0px"),this.domNode=document.createElement("div"),this.domNode.className=e.className,this.domNode.style.position="absolute",this.domNode.style.width=qs+"px",this.domNode.style.height=qs+"px",typeof e.top<"u"&&(this.domNode.style.top=e.top+"px"),typeof e.left<"u"&&(this.domNode.style.left=e.left+"px"),typeof e.bottom<"u"&&(this.domNode.style.bottom=e.bottom+"px"),typeof e.right<"u"&&(this.domNode.style.right=e.right+"px"),this._pointerMoveMonitor=this._register(new na),this._register(Fs(this.bgDomNode,Pe.POINTER_DOWN,t=>this._arrowPointerDown(t))),this._register(Fs(this.domNode,Pe.POINTER_DOWN,t=>this._arrowPointerDown(t))),this._pointerdownRepeatTimer=this._register(new Uh),this._pointerdownScheduleRepeatTimer=this._register(new Io)}_arrowPointerDown(e){if(!e.target||!(e.target instanceof Element))return;let t=()=>{this._pointerdownRepeatTimer.cancelAndSet(()=>this._onActivate(),1e3/24,tt(e))};this._onActivate(),this._pointerdownRepeatTimer.cancel(),this._pointerdownScheduleRepeatTimer.cancelAndSet(t,200),this._pointerMoveMonitor.startMonitoring(e.target,e.pointerId,e.buttons,i=>{},()=>{this._pointerdownRepeatTimer.cancel(),this._pointerdownScheduleRepeatTimer.cancel()}),e.preventDefault()}},ec=class oo{constructor(t,i,r,o,s,n,a){this._forceIntegerValues=t,this._scrollStateBrand=void 0,this._forceIntegerValues&&(i=i|0,r=r|0,o=o|0,s=s|0,n=n|0,a=a|0),this.rawScrollLeft=o,this.rawScrollTop=a,i<0&&(i=0),o+i>r&&(o=r-i),o<0&&(o=0),s<0&&(s=0),a+s>n&&(a=n-s),a<0&&(a=0),this.width=i,this.scrollWidth=r,this.scrollLeft=o,this.height=s,this.scrollHeight=n,this.scrollTop=a}equals(t){return this.rawScrollLeft===t.rawScrollLeft&&this.rawScrollTop===t.rawScrollTop&&this.width===t.width&&this.scrollWidth===t.scrollWidth&&this.scrollLeft===t.scrollLeft&&this.height===t.height&&this.scrollHeight===t.scrollHeight&&this.scrollTop===t.scrollTop}withScrollDimensions(t,i){return new oo(this._forceIntegerValues,typeof t.width<"u"?t.width:this.width,typeof t.scrollWidth<"u"?t.scrollWidth:this.scrollWidth,i?this.rawScrollLeft:this.scrollLeft,typeof t.height<"u"?t.height:this.height,typeof t.scrollHeight<"u"?t.scrollHeight:this.scrollHeight,i?this.rawScrollTop:this.scrollTop)}withScrollPosition(t){return new oo(this._forceIntegerValues,this.width,this.scrollWidth,typeof t.scrollLeft<"u"?t.scrollLeft:this.rawScrollLeft,this.height,this.scrollHeight,typeof t.scrollTop<"u"?t.scrollTop:this.rawScrollTop)}createScrollEvent(t,i){let r=this.width!==t.width,o=this.scrollWidth!==t.scrollWidth,s=this.scrollLeft!==t.scrollLeft,n=this.height!==t.height,a=this.scrollHeight!==t.scrollHeight,l=this.scrollTop!==t.scrollTop;return{inSmoothScrolling:i,oldWidth:t.width,oldScrollWidth:t.scrollWidth,oldScrollLeft:t.scrollLeft,width:this.width,scrollWidth:this.scrollWidth,scrollLeft:this.scrollLeft,oldHeight:t.height,oldScrollHeight:t.scrollHeight,oldScrollTop:t.scrollTop,height:this.height,scrollHeight:this.scrollHeight,scrollTop:this.scrollTop,widthChanged:r,scrollWidthChanged:o,scrollLeftChanged:s,heightChanged:n,scrollHeightChanged:a,scrollTopChanged:l}}},tc=class extends te{constructor(e){super(),this._scrollableBrand=void 0,this._onScroll=this._register(new N),this.onScroll=this._onScroll.event,this._smoothScrollDuration=e.smoothScrollDuration,this._scheduleAtNextAnimationFrame=e.scheduleAtNextAnimationFrame,this._state=new ec(e.forceIntegerValues,0,0,0,0,0,0),this._smoothScrolling=null}dispose(){this._smoothScrolling&&(this._smoothScrolling.dispose(),this._smoothScrolling=null),super.dispose()}setSmoothScrollDuration(e){this._smoothScrollDuration=e}validateScrollPosition(e){return this._state.withScrollPosition(e)}getScrollDimensions(){return this._state}setScrollDimensions(e,t){let i=this._state.withScrollDimensions(e,t);this._setState(i,!!this._smoothScrolling),this._smoothScrolling?.acceptScrollDimensions(this._state)}getFutureScrollPosition(){return this._smoothScrolling?this._smoothScrolling.to:this._state}getCurrentScrollPosition(){return this._state}setScrollPositionNow(e){let t=this._state.withScrollPosition(e);this._smoothScrolling&&(this._smoothScrolling.dispose(),this._smoothScrolling=null),this._setState(t,!1)}setScrollPositionSmooth(e,t){if(this._smoothScrollDuration===0)return this.setScrollPositionNow(e);if(this._smoothScrolling){e={scrollLeft:typeof e.scrollLeft>"u"?this._smoothScrolling.to.scrollLeft:e.scrollLeft,scrollTop:typeof e.scrollTop>"u"?this._smoothScrolling.to.scrollTop:e.scrollTop};let i=this._state.withScrollPosition(e);if(this._smoothScrolling.to.scrollLeft===i.scrollLeft&&this._smoothScrolling.to.scrollTop===i.scrollTop)return;let r;t?r=new Ks(this._smoothScrolling.from,i,this._smoothScrolling.startTime,this._smoothScrolling.duration):r=this._smoothScrolling.combine(this._state,i,this._smoothScrollDuration),this._smoothScrolling.dispose(),this._smoothScrolling=r}else{let i=this._state.withScrollPosition(e);this._smoothScrolling=Ks.start(this._state,i,this._smoothScrollDuration)}this._smoothScrolling.animationFrameDisposable=this._scheduleAtNextAnimationFrame(()=>{this._smoothScrolling&&(this._smoothScrolling.animationFrameDisposable=null,this._performSmoothScrolling())})}hasPendingScrollAnimation(){return!!this._smoothScrolling}_performSmoothScrolling(){if(!this._smoothScrolling)return;let e=this._smoothScrolling.tick(),t=this._state.withScrollPosition(e);if(this._setState(t,!0),!!this._smoothScrolling){if(e.isDone){this._smoothScrolling.dispose(),this._smoothScrolling=null;return}this._smoothScrolling.animationFrameDisposable=this._scheduleAtNextAnimationFrame(()=>{this._smoothScrolling&&(this._smoothScrolling.animationFrameDisposable=null,this._performSmoothScrolling())})}}_setState(e,t){let i=this._state;i.equals(e)||(this._state=e,this._onScroll.fire(this._state.createScrollEvent(i,t)))}},Us=class{constructor(e,t,i){this.scrollLeft=e,this.scrollTop=t,this.isDone=i}};function Gr(e,t){let i=t-e;return function(r){return e+i*oc(r)}}function ic(e,t,i){return function(r){return r<i?e(r/i):t((r-i)/(1-i))}}var Ks=class so{constructor(t,i,r,o){this.from=t,this.to=i,this.duration=o,this.startTime=r,this.animationFrameDisposable=null,this._initAnimations()}_initAnimations(){this.scrollLeft=this._initAnimation(this.from.scrollLeft,this.to.scrollLeft,this.to.width),this.scrollTop=this._initAnimation(this.from.scrollTop,this.to.scrollTop,this.to.height)}_initAnimation(t,i,r){if(Math.abs(t-i)>2.5*r){let o,s;return t<i?(o=t+.75*r,s=i-.75*r):(o=t-.75*r,s=i+.75*r),ic(Gr(t,o),Gr(s,i),.33)}return Gr(t,i)}dispose(){this.animationFrameDisposable!==null&&(this.animationFrameDisposable.dispose(),this.animationFrameDisposable=null)}acceptScrollDimensions(t){this.to=t.withScrollPosition(this.to),this._initAnimations()}tick(){return this._tick(Date.now())}_tick(t){let i=(t-this.startTime)/this.duration;if(i<1){let r=this.scrollLeft(i),o=this.scrollTop(i);return new Us(r,o,!1)}return new Us(this.to.scrollLeft,this.to.scrollTop,!0)}combine(t,i,r){return so.start(t,i,r)}static start(t,i,r){r=r+10;let o=Date.now()-10;return new so(t,i,o,r)}};function rc(e){return Math.pow(e,3)}function oc(e){return 1-rc(1-e)}var sc=class extends te{constructor(e,t,i){super(),this._visibility=e,this._visibleClassName=t,this._invisibleClassName=i,this._domNode=null,this._isVisible=!1,this._isNeeded=!1,this._rawShouldBeVisible=!1,this._shouldBeVisible=!1,this._revealTimer=this._register(new Io)}setVisibility(e){this._visibility!==e&&(this._visibility=e,this._updateShouldBeVisible())}setShouldBeVisible(e){this._rawShouldBeVisible=e,this._updateShouldBeVisible()}_applyVisibilitySetting(){return this._visibility===2?!1:this._visibility===3?!0:this._rawShouldBeVisible}_updateShouldBeVisible(){let e=this._applyVisibilitySetting();this._shouldBeVisible!==e&&(this._shouldBeVisible=e,this.ensureVisibility())}setIsNeeded(e){this._isNeeded!==e&&(this._isNeeded=e,this.ensureVisibility())}setDomNode(e){this._domNode=e,this._domNode.setClassName(this._invisibleClassName),this.setShouldBeVisible(!1)}ensureVisibility(){if(!this._isNeeded){this._hide(!1);return}this._shouldBeVisible?this._reveal():this._hide(!0)}_reveal(){this._isVisible||(this._isVisible=!0,this._revealTimer.setIfNotSet(()=>{this._domNode?.setClassName(this._visibleClassName)},0))}_hide(e){this._revealTimer.cancel(),this._isVisible&&(this._isVisible=!1,this._domNode?.setClassName(this._invisibleClassName+(e?" fade":"")))}},nc=140,aa=class extends Mo{constructor(e){super(),this._lazyRender=e.lazyRender,this._host=e.host,this._scrollable=e.scrollable,this._scrollByPage=e.scrollByPage,this._scrollbarState=e.scrollbarState,this._visibilityController=this._register(new sc(e.visibility,"visible scrollbar "+e.extraScrollbarClassName,"invisible scrollbar "+e.extraScrollbarClassName)),this._visibilityController.setIsNeeded(this._scrollbarState.isNeeded()),this._pointerMoveMonitor=this._register(new na),this._shouldRender=!0,this.domNode=Si(document.createElement("div")),this.domNode.setAttribute("role","presentation"),this.domNode.setAttribute("aria-hidden","true"),this._visibilityController.setDomNode(this.domNode),this.domNode.setPosition("absolute"),this._register(Q(this.domNode.domNode,Pe.POINTER_DOWN,t=>this._domNodePointerDown(t)))}_createArrow(e){let t=this._register(new Qh(e));this.domNode.domNode.appendChild(t.bgDomNode),this.domNode.domNode.appendChild(t.domNode)}_createSlider(e,t,i,r){this.slider=Si(document.createElement("div")),this.slider.setClassName("slider"),this.slider.setPosition("absolute"),this.slider.setTop(e),this.slider.setLeft(t),typeof i=="number"&&this.slider.setWidth(i),typeof r=="number"&&this.slider.setHeight(r),this.slider.setLayerHinting(!0),this.slider.setContain("strict"),this.domNode.domNode.appendChild(this.slider.domNode),this._register(Q(this.slider.domNode,Pe.POINTER_DOWN,o=>{o.button===0&&(o.preventDefault(),this._sliderPointerDown(o))})),this.onclick(this.slider.domNode,o=>{o.leftButton&&o.stopPropagation()})}_onElementSize(e){return this._scrollbarState.setVisibleSize(e)&&(this._visibilityController.setIsNeeded(this._scrollbarState.isNeeded()),this._shouldRender=!0,this._lazyRender||this.render()),this._shouldRender}_onElementScrollSize(e){return this._scrollbarState.setScrollSize(e)&&(this._visibilityController.setIsNeeded(this._scrollbarState.isNeeded()),this._shouldRender=!0,this._lazyRender||this.render()),this._shouldRender}_onElementScrollPosition(e){return this._scrollbarState.setScrollPosition(e)&&(this._visibilityController.setIsNeeded(this._scrollbarState.isNeeded()),this._shouldRender=!0,this._lazyRender||this.render()),this._shouldRender}beginReveal(){this._visibilityController.setShouldBeVisible(!0)}beginHide(){this._visibilityController.setShouldBeVisible(!1)}render(){this._shouldRender&&(this._shouldRender=!1,this._renderDomNode(this._scrollbarState.getRectangleLargeSize(),this._scrollbarState.getRectangleSmallSize()),this._updateSlider(this._scrollbarState.getSliderSize(),this._scrollbarState.getArrowSize()+this._scrollbarState.getSliderPosition()))}_domNodePointerDown(e){e.target===this.domNode.domNode&&this._onPointerDown(e)}delegatePointerDown(e){let t=this.domNode.domNode.getClientRects()[0].top,i=t+this._scrollbarState.getSliderPosition(),r=t+this._scrollbarState.getSliderPosition()+this._scrollbarState.getSliderSize(),o=this._sliderPointerPosition(e);i<=o&&o<=r?e.button===0&&(e.preventDefault(),this._sliderPointerDown(e)):this._onPointerDown(e)}_onPointerDown(e){let t,i;if(e.target===this.domNode.domNode&&typeof e.offsetX=="number"&&typeof e.offsetY=="number")t=e.offsetX,i=e.offsetY;else{let o=Kh(this.domNode.domNode);t=e.pageX-o.left,i=e.pageY-o.top}let r=this._pointerDownRelativePosition(t,i);this._setDesiredScrollPositionNow(this._scrollByPage?this._scrollbarState.getDesiredScrollPositionFromOffsetPaged(r):this._scrollbarState.getDesiredScrollPositionFromOffset(r)),e.button===0&&(e.preventDefault(),this._sliderPointerDown(e))}_sliderPointerDown(e){if(!e.target||!(e.target instanceof Element))return;let t=this._sliderPointerPosition(e),i=this._sliderOrthogonalPointerPosition(e),r=this._scrollbarState.clone();this.slider.toggleClassName("active",!0),this._pointerMoveMonitor.startMonitoring(e.target,e.pointerId,e.buttons,o=>{let s=this._sliderOrthogonalPointerPosition(o),n=Math.abs(s-i);if(Qn&&n>nc){this._setDesiredScrollPositionNow(r.getScrollPosition());return}let a=this._sliderPointerPosition(o)-t;this._setDesiredScrollPositionNow(r.getDesiredScrollPositionFromDelta(a))},()=>{this.slider.toggleClassName("active",!1),this._host.onDragEnd()}),this._host.onDragStart()}_setDesiredScrollPositionNow(e){let t={};this.writeScrollPosition(t,e),this._scrollable.setScrollPositionNow(t)}updateScrollbarSize(e){this._updateScrollbarSize(e),this._scrollbarState.setScrollbarSize(e),this._shouldRender=!0,this._lazyRender||this.render()}isNeeded(){return this._scrollbarState.isNeeded()}},da=class no{constructor(t,i,r,o,s,n){this._scrollbarSize=Math.round(i),this._oppositeScrollbarSize=Math.round(r),this._arrowSize=Math.round(t),this._visibleSize=o,this._scrollSize=s,this._scrollPosition=n,this._computedAvailableSize=0,this._computedIsNeeded=!1,this._computedSliderSize=0,this._computedSliderRatio=0,this._computedSliderPosition=0,this._refreshComputedValues()}clone(){return new no(this._arrowSize,this._scrollbarSize,this._oppositeScrollbarSize,this._visibleSize,this._scrollSize,this._scrollPosition)}setVisibleSize(t){let i=Math.round(t);return this._visibleSize!==i?(this._visibleSize=i,this._refreshComputedValues(),!0):!1}setScrollSize(t){let i=Math.round(t);return this._scrollSize!==i?(this._scrollSize=i,this._refreshComputedValues(),!0):!1}setScrollPosition(t){let i=Math.round(t);return this._scrollPosition!==i?(this._scrollPosition=i,this._refreshComputedValues(),!0):!1}setScrollbarSize(t){this._scrollbarSize=Math.round(t)}setOppositeScrollbarSize(t){this._oppositeScrollbarSize=Math.round(t)}static _computeValues(t,i,r,o,s){let n=Math.max(0,r-t),a=Math.max(0,n-2*i),l=o>0&&o>r;if(!l)return{computedAvailableSize:Math.round(n),computedIsNeeded:l,computedSliderSize:Math.round(a),computedSliderRatio:0,computedSliderPosition:0};let d=Math.round(Math.max(20,Math.floor(r*a/o))),h=(a-d)/(o-r),c=s*h;return{computedAvailableSize:Math.round(n),computedIsNeeded:l,computedSliderSize:Math.round(d),computedSliderRatio:h,computedSliderPosition:Math.round(c)}}_refreshComputedValues(){let t=no._computeValues(this._oppositeScrollbarSize,this._arrowSize,this._visibleSize,this._scrollSize,this._scrollPosition);this._computedAvailableSize=t.computedAvailableSize,this._computedIsNeeded=t.computedIsNeeded,this._computedSliderSize=t.computedSliderSize,this._computedSliderRatio=t.computedSliderRatio,this._computedSliderPosition=t.computedSliderPosition}getArrowSize(){return this._arrowSize}getScrollPosition(){return this._scrollPosition}getRectangleLargeSize(){return this._computedAvailableSize}getRectangleSmallSize(){return this._scrollbarSize}isNeeded(){return this._computedIsNeeded}getSliderSize(){return this._computedSliderSize}getSliderPosition(){return this._computedSliderPosition}getDesiredScrollPositionFromOffset(t){if(!this._computedIsNeeded)return 0;let i=t-this._arrowSize-this._computedSliderSize/2;return Math.round(i/this._computedSliderRatio)}getDesiredScrollPositionFromOffsetPaged(t){if(!this._computedIsNeeded)return 0;let i=t-this._arrowSize,r=this._scrollPosition;return i<this._computedSliderPosition?r-=this._visibleSize:r+=this._visibleSize,r}getDesiredScrollPositionFromDelta(t){if(!this._computedIsNeeded)return 0;let i=this._computedSliderPosition+t;return Math.round(i/this._computedSliderRatio)}},ac=class extends aa{constructor(e,t,i){let r=e.getScrollDimensions(),o=e.getCurrentScrollPosition();if(super({lazyRender:t.lazyRender,host:i,scrollbarState:new da(t.horizontalHasArrows?t.arrowSize:0,t.horizontal===2?0:t.horizontalScrollbarSize,t.vertical===2?0:t.verticalScrollbarSize,r.width,r.scrollWidth,o.scrollLeft),visibility:t.horizontal,extraScrollbarClassName:"horizontal",scrollable:e,scrollByPage:t.scrollByPage}),t.horizontalHasArrows)throw new Error("horizontalHasArrows is not supported in xterm.js");this._createSlider(Math.floor((t.horizontalScrollbarSize-t.horizontalSliderSize)/2),0,void 0,t.horizontalSliderSize)}_updateSlider(e,t){this.slider.setWidth(e),this.slider.setLeft(t)}_renderDomNode(e,t){this.domNode.setWidth(e),this.domNode.setHeight(t),this.domNode.setLeft(0),this.domNode.setBottom(0)}onDidScroll(e){return this._shouldRender=this._onElementScrollSize(e.scrollWidth)||this._shouldRender,this._shouldRender=this._onElementScrollPosition(e.scrollLeft)||this._shouldRender,this._shouldRender=this._onElementSize(e.width)||this._shouldRender,this._shouldRender}_pointerDownRelativePosition(e,t){return e}_sliderPointerPosition(e){return e.pageX}_sliderOrthogonalPointerPosition(e){return e.pageY}_updateScrollbarSize(e){this.slider.setHeight(e)}writeScrollPosition(e,t){e.scrollLeft=t}updateOptions(e){this.updateScrollbarSize(e.horizontal===2?0:e.horizontalScrollbarSize),this._scrollbarState.setOppositeScrollbarSize(e.vertical===2?0:e.verticalScrollbarSize),this._visibilityController.setVisibility(e.horizontal),this._scrollByPage=e.scrollByPage}},dc=class extends aa{constructor(e,t,i){let r=e.getScrollDimensions(),o=e.getCurrentScrollPosition();if(super({lazyRender:t.lazyRender,host:i,scrollbarState:new da(t.verticalHasArrows?t.arrowSize:0,t.vertical===2?0:t.verticalScrollbarSize,0,r.height,r.scrollHeight,o.scrollTop),visibility:t.vertical,extraScrollbarClassName:"vertical",scrollable:e,scrollByPage:t.scrollByPage}),t.verticalHasArrows)throw new Error("horizontalHasArrows is not supported in xterm.js");this._createSlider(0,Math.floor((t.verticalScrollbarSize-t.verticalSliderSize)/2),t.verticalSliderSize,void 0)}_updateSlider(e,t){this.slider.setHeight(e),this.slider.setTop(t)}_renderDomNode(e,t){this.domNode.setWidth(t),this.domNode.setHeight(e),this.domNode.setRight(0),this.domNode.setTop(0)}onDidScroll(e){return this._shouldRender=this._onElementScrollSize(e.scrollHeight)||this._shouldRender,this._shouldRender=this._onElementScrollPosition(e.scrollTop)||this._shouldRender,this._shouldRender=this._onElementSize(e.height)||this._shouldRender,this._shouldRender}_pointerDownRelativePosition(e,t){return t}_sliderPointerPosition(e){return e.pageY}_sliderOrthogonalPointerPosition(e){return e.pageX}_updateScrollbarSize(e){this.slider.setWidth(e)}writeScrollPosition(e,t){e.scrollTop=t}updateOptions(e){this.updateScrollbarSize(e.vertical===2?0:e.verticalScrollbarSize),this._scrollbarState.setOppositeScrollbarSize(0),this._visibilityController.setVisibility(e.vertical),this._scrollByPage=e.scrollByPage}},lc=500,Ys=50,Xs=!0,hc=class{constructor(e,t,i){this.timestamp=e,this.deltaX=t,this.deltaY=i,this.score=0}},ao=class{constructor(){this._capacity=5,this._memory=[],this._front=-1,this._rear=-1}isPhysicalMouseWheel(){if(this._front===-1&&this._rear===-1)return!1;let t=1,i=0,r=1,o=this._rear;do{let s=o===this._front?t:Math.pow(2,-r);if(t-=s,i+=this._memory[o].score*s,o===this._front)break;o=(this._capacity+o-1)%this._capacity,r++}while(!0);return i<=.5}acceptStandardWheelEvent(t){if(zo){let i=tt(t.browserEvent),r=rh(i);this.accept(Date.now(),t.deltaX*r,t.deltaY*r)}else this.accept(Date.now(),t.deltaX,t.deltaY)}accept(t,i,r){let o=null,s=new hc(t,i,r);this._front===-1&&this._rear===-1?(this._memory[0]=s,this._front=0,this._rear=0):(o=this._memory[this._rear],this._rear=(this._rear+1)%this._capacity,this._rear===this._front&&(this._front=(this._front+1)%this._capacity),this._memory[this._rear]=s),s.score=this._computeScore(s,o)}_computeScore(t,i){if(Math.abs(t.deltaX)>0&&Math.abs(t.deltaY)>0)return 1;let r=.5;if((!this._isAlmostInt(t.deltaX)||!this._isAlmostInt(t.deltaY))&&(r+=.25),i){let o=Math.abs(t.deltaX),s=Math.abs(t.deltaY),n=Math.abs(i.deltaX),a=Math.abs(i.deltaY),l=Math.max(Math.min(o,n),1),d=Math.max(Math.min(s,a),1),h=Math.max(o,n),c=Math.max(s,a);h%l===0&&c%d===0&&(r-=.5)}return Math.min(Math.max(r,0),1)}_isAlmostInt(t){return Math.abs(Math.round(t)-t)<.01}};ao.INSTANCE=new ao;var cc=ao,uc=class extends Mo{constructor(e,t,i){super(),this._onScroll=this._register(new N),this.onScroll=this._onScroll.event,this._onWillScroll=this._register(new N),this.onWillScroll=this._onWillScroll.event,this._options=vc(t),this._scrollable=i,this._register(this._scrollable.onScroll(o=>{this._onWillScroll.fire(o),this._onDidScroll(o),this._onScroll.fire(o)}));let r={onMouseWheel:o=>this._onMouseWheel(o),onDragStart:()=>this._onDragStart(),onDragEnd:()=>this._onDragEnd()};this._verticalScrollbar=this._register(new dc(this._scrollable,this._options,r)),this._horizontalScrollbar=this._register(new ac(this._scrollable,this._options,r)),this._domNode=document.createElement("div"),this._domNode.className="xterm-scrollable-element "+this._options.className,this._domNode.setAttribute("role","presentation"),this._domNode.style.position="relative",this._domNode.appendChild(e),this._domNode.appendChild(this._horizontalScrollbar.domNode.domNode),this._domNode.appendChild(this._verticalScrollbar.domNode.domNode),this._options.useShadows?(this._leftShadowDomNode=Si(document.createElement("div")),this._leftShadowDomNode.setClassName("shadow"),this._domNode.appendChild(this._leftShadowDomNode.domNode),this._topShadowDomNode=Si(document.createElement("div")),this._topShadowDomNode.setClassName("shadow"),this._domNode.appendChild(this._topShadowDomNode.domNode),this._topLeftShadowDomNode=Si(document.createElement("div")),this._topLeftShadowDomNode.setClassName("shadow"),this._domNode.appendChild(this._topLeftShadowDomNode.domNode)):(this._leftShadowDomNode=null,this._topShadowDomNode=null,this._topLeftShadowDomNode=null),this._listenOnDomNode=this._options.listenOnDomNode||this._domNode,this._mouseWheelToDispose=[],this._setListeningToMouseWheel(this._options.handleMouseWheel),this.onmouseover(this._listenOnDomNode,o=>this._onMouseOver(o)),this.onmouseleave(this._listenOnDomNode,o=>this._onMouseLeave(o)),this._hideTimeout=this._register(new Io),this._isDragging=!1,this._mouseIsOver=!1,this._shouldRender=!0,this._revealOnScroll=!0}get options(){return this._options}dispose(){this._mouseWheelToDispose=Ft(this._mouseWheelToDispose),super.dispose()}getDomNode(){return this._domNode}getOverviewRulerLayoutInfo(){return{parent:this._domNode,insertBefore:this._verticalScrollbar.domNode.domNode}}delegateVerticalScrollbarPointerDown(e){this._verticalScrollbar.delegatePointerDown(e)}getScrollDimensions(){return this._scrollable.getScrollDimensions()}setScrollDimensions(e){this._scrollable.setScrollDimensions(e,!1)}updateClassName(e){this._options.className=e,dt&&(this._options.className+=" mac"),this._domNode.className="xterm-scrollable-element "+this._options.className}updateOptions(e){typeof e.handleMouseWheel<"u"&&(this._options.handleMouseWheel=e.handleMouseWheel,this._setListeningToMouseWheel(this._options.handleMouseWheel)),typeof e.mouseWheelScrollSensitivity<"u"&&(this._options.mouseWheelScrollSensitivity=e.mouseWheelScrollSensitivity),typeof e.fastScrollSensitivity<"u"&&(this._options.fastScrollSensitivity=e.fastScrollSensitivity),typeof e.scrollPredominantAxis<"u"&&(this._options.scrollPredominantAxis=e.scrollPredominantAxis),typeof e.horizontal<"u"&&(this._options.horizontal=e.horizontal),typeof e.vertical<"u"&&(this._options.vertical=e.vertical),typeof e.horizontalScrollbarSize<"u"&&(this._options.horizontalScrollbarSize=e.horizontalScrollbarSize),typeof e.verticalScrollbarSize<"u"&&(this._options.verticalScrollbarSize=e.verticalScrollbarSize),typeof e.scrollByPage<"u"&&(this._options.scrollByPage=e.scrollByPage),this._horizontalScrollbar.updateOptions(this._options),this._verticalScrollbar.updateOptions(this._options),this._options.lazyRender||this._render()}setRevealOnScroll(e){this._revealOnScroll=e}delegateScrollFromMouseWheelEvent(e){this._onMouseWheel(new Ns(e))}_setListeningToMouseWheel(e){if(this._mouseWheelToDispose.length>0!==e&&(this._mouseWheelToDispose=Ft(this._mouseWheelToDispose),e)){let t=i=>{this._onMouseWheel(new Ns(i))};this._mouseWheelToDispose.push(Q(this._listenOnDomNode,Pe.MOUSE_WHEEL,t,{passive:!1}))}}_onMouseWheel(e){if(e.browserEvent?.defaultPrevented)return;let t=cc.INSTANCE;Xs&&t.acceptStandardWheelEvent(e);let i=!1;if(e.deltaY||e.deltaX){let o=e.deltaY*this._options.mouseWheelScrollSensitivity,s=e.deltaX*this._options.mouseWheelScrollSensitivity;this._options.scrollPredominantAxis&&(this._options.scrollYToX&&s+o===0?s=o=0:Math.abs(o)>=Math.abs(s)?s=0:o=0),this._options.flipAxes&&([o,s]=[s,o]);let n=!dt&&e.browserEvent&&e.browserEvent.shiftKey;(this._options.scrollYToX||n)&&!s&&(s=o,o=0),e.browserEvent&&e.browserEvent.altKey&&(s=s*this._options.fastScrollSensitivity,o=o*this._options.fastScrollSensitivity);let a=this._scrollable.getFutureScrollPosition(),l={};if(o){let d=Ys*o,h=a.scrollTop-(d<0?Math.floor(d):Math.ceil(d));this._verticalScrollbar.writeScrollPosition(l,h)}if(s){let d=Ys*s,h=a.scrollLeft-(d<0?Math.floor(d):Math.ceil(d));this._horizontalScrollbar.writeScrollPosition(l,h)}l=this._scrollable.validateScrollPosition(l),(a.scrollLeft!==l.scrollLeft||a.scrollTop!==l.scrollTop)&&(Xs&&this._options.mouseWheelSmoothScroll&&t.isPhysicalMouseWheel()?this._scrollable.setScrollPositionSmooth(l):this._scrollable.setScrollPositionNow(l),i=!0)}let r=i;!r&&this._options.alwaysConsumeMouseWheel&&(r=!0),!r&&this._options.consumeMouseWheelIfScrollbarIsNeeded&&(this._verticalScrollbar.isNeeded()||this._horizontalScrollbar.isNeeded())&&(r=!0),r&&(e.preventDefault(),e.stopPropagation())}_onDidScroll(e){this._shouldRender=this._horizontalScrollbar.onDidScroll(e)||this._shouldRender,this._shouldRender=this._verticalScrollbar.onDidScroll(e)||this._shouldRender,this._options.useShadows&&(this._shouldRender=!0),this._revealOnScroll&&this._reveal(),this._options.lazyRender||this._render()}renderNow(){if(!this._options.lazyRender)throw new Error("Please use `lazyRender` together with `renderNow`!");this._render()}_render(){if(this._shouldRender&&(this._shouldRender=!1,this._horizontalScrollbar.render(),this._verticalScrollbar.render(),this._options.useShadows)){let e=this._scrollable.getCurrentScrollPosition(),t=e.scrollTop>0,i=e.scrollLeft>0,r=i?" left":"",o=t?" top":"",s=i||t?" top-left-corner":"";this._leftShadowDomNode.setClassName(`shadow${r}`),this._topShadowDomNode.setClassName(`shadow${o}`),this._topLeftShadowDomNode.setClassName(`shadow${s}${o}${r}`)}}_onDragStart(){this._isDragging=!0,this._reveal()}_onDragEnd(){this._isDragging=!1,this._hide()}_onMouseLeave(e){this._mouseIsOver=!1,this._hide()}_onMouseOver(e){this._mouseIsOver=!0,this._reveal()}_reveal(){this._verticalScrollbar.beginReveal(),this._horizontalScrollbar.beginReveal(),this._scheduleHide()}_hide(){!this._mouseIsOver&&!this._isDragging&&(this._verticalScrollbar.beginHide(),this._horizontalScrollbar.beginHide())}_scheduleHide(){!this._mouseIsOver&&!this._isDragging&&this._hideTimeout.cancelAndSet(()=>this._hide(),lc)}},pc=class extends uc{constructor(e,t,i){super(e,t,i)}setScrollPosition(e){e.reuseAnimation?this._scrollable.setScrollPositionSmooth(e,e.reuseAnimation):this._scrollable.setScrollPositionNow(e)}getScrollPosition(){return this._scrollable.getCurrentScrollPosition()}};function vc(e){let t={lazyRender:typeof e.lazyRender<"u"?e.lazyRender:!1,className:typeof e.className<"u"?e.className:"",useShadows:typeof e.useShadows<"u"?e.useShadows:!0,handleMouseWheel:typeof e.handleMouseWheel<"u"?e.handleMouseWheel:!0,flipAxes:typeof e.flipAxes<"u"?e.flipAxes:!1,consumeMouseWheelIfScrollbarIsNeeded:typeof e.consumeMouseWheelIfScrollbarIsNeeded<"u"?e.consumeMouseWheelIfScrollbarIsNeeded:!1,alwaysConsumeMouseWheel:typeof e.alwaysConsumeMouseWheel<"u"?e.alwaysConsumeMouseWheel:!1,scrollYToX:typeof e.scrollYToX<"u"?e.scrollYToX:!1,mouseWheelScrollSensitivity:typeof e.mouseWheelScrollSensitivity<"u"?e.mouseWheelScrollSensitivity:1,fastScrollSensitivity:typeof e.fastScrollSensitivity<"u"?e.fastScrollSensitivity:5,scrollPredominantAxis:typeof e.scrollPredominantAxis<"u"?e.scrollPredominantAxis:!0,mouseWheelSmoothScroll:typeof e.mouseWheelSmoothScroll<"u"?e.mouseWheelSmoothScroll:!0,arrowSize:typeof e.arrowSize<"u"?e.arrowSize:11,listenOnDomNode:typeof e.listenOnDomNode<"u"?e.listenOnDomNode:null,horizontal:typeof e.horizontal<"u"?e.horizontal:1,horizontalScrollbarSize:typeof e.horizontalScrollbarSize<"u"?e.horizontalScrollbarSize:10,horizontalSliderSize:typeof e.horizontalSliderSize<"u"?e.horizontalSliderSize:0,horizontalHasArrows:typeof e.horizontalHasArrows<"u"?e.horizontalHasArrows:!1,vertical:typeof e.vertical<"u"?e.vertical:1,verticalScrollbarSize:typeof e.verticalScrollbarSize<"u"?e.verticalScrollbarSize:10,verticalHasArrows:typeof e.verticalHasArrows<"u"?e.verticalHasArrows:!1,verticalSliderSize:typeof e.verticalSliderSize<"u"?e.verticalSliderSize:0,scrollByPage:typeof e.scrollByPage<"u"?e.scrollByPage:!1};return t.horizontalSliderSize=typeof e.horizontalSliderSize<"u"?e.horizontalSliderSize:t.horizontalScrollbarSize,t.verticalSliderSize=typeof e.verticalSliderSize<"u"?e.verticalSliderSize:t.verticalScrollbarSize,dt&&(t.className+=" mac"),t}var lo=class extends te{constructor(e,t,i,r,o,s,n,a){super(),this._bufferService=i,this._optionsService=n,this._renderService=a,this._onRequestScrollLines=this._register(new N),this.onRequestScrollLines=this._onRequestScrollLines.event,this._isSyncing=!1,this._isHandlingScroll=!1,this._suppressOnScrollHandler=!1;let l=this._register(new tc({forceIntegerValues:!1,smoothScrollDuration:this._optionsService.rawOptions.smoothScrollDuration,scheduleAtNextAnimationFrame:d=>tr(r.window,d)}));this._register(this._optionsService.onSpecificOptionChange("smoothScrollDuration",()=>{l.setSmoothScrollDuration(this._optionsService.rawOptions.smoothScrollDuration)})),this._scrollableElement=this._register(new pc(t,{vertical:1,horizontal:2,useShadows:!1,mouseWheelSmoothScroll:!0,...this._getChangeOptions()},l)),this._register(this._optionsService.onMultipleOptionChange(["scrollSensitivity","fastScrollSensitivity","overviewRuler"],()=>this._scrollableElement.updateOptions(this._getChangeOptions()))),this._register(o.onProtocolChange(d=>{this._scrollableElement.updateOptions({handleMouseWheel:!(d&16)})})),this._scrollableElement.setScrollDimensions({height:0,scrollHeight:0}),this._register(Ge.runAndSubscribe(s.onChangeColors,()=>{this._scrollableElement.getDomNode().style.backgroundColor=s.colors.background.css})),e.appendChild(this._scrollableElement.getDomNode()),this._register(ue(()=>this._scrollableElement.getDomNode().remove())),this._styleElement=r.mainDocument.createElement("style"),t.appendChild(this._styleElement),this._register(ue(()=>this._styleElement.remove())),this._register(Ge.runAndSubscribe(s.onChangeColors,()=>{this._styleElement.textContent=[".xterm .xterm-scrollable-element > .scrollbar > .slider {",`  background: ${s.colors.scrollbarSliderBackground.css};`,"}",".xterm .xterm-scrollable-element > .scrollbar > .slider:hover {",`  background: ${s.colors.scrollbarSliderHoverBackground.css};`,"}",".xterm .xterm-scrollable-element > .scrollbar > .slider.active {",`  background: ${s.colors.scrollbarSliderActiveBackground.css};`,"}"].join(`
`)})),this._register(this._bufferService.onResize(()=>this.queueSync())),this._register(this._bufferService.buffers.onBufferActivate(()=>{this._latestYDisp=void 0,this.queueSync()})),this._register(this._bufferService.onScroll(()=>this._sync())),this._register(this._scrollableElement.onScroll(d=>this._handleScroll(d)))}scrollLines(e){let t=this._scrollableElement.getScrollPosition();this._scrollableElement.setScrollPosition({reuseAnimation:!0,scrollTop:t.scrollTop+e*this._renderService.dimensions.css.cell.height})}scrollToLine(e,t){t&&(this._latestYDisp=e),this._scrollableElement.setScrollPosition({reuseAnimation:!t,scrollTop:e*this._renderService.dimensions.css.cell.height})}_getChangeOptions(){return{mouseWheelScrollSensitivity:this._optionsService.rawOptions.scrollSensitivity,fastScrollSensitivity:this._optionsService.rawOptions.fastScrollSensitivity,verticalScrollbarSize:this._optionsService.rawOptions.overviewRuler?.width||14}}queueSync(e){e!==void 0&&(this._latestYDisp=e),this._queuedAnimationFrame===void 0&&(this._queuedAnimationFrame=this._renderService.addRefreshCallback(()=>{this._queuedAnimationFrame=void 0,this._sync(this._latestYDisp)}))}_sync(e=this._bufferService.buffer.ydisp){!this._renderService||this._isSyncing||(this._isSyncing=!0,this._suppressOnScrollHandler=!0,this._scrollableElement.setScrollDimensions({height:this._renderService.dimensions.css.canvas.height,scrollHeight:this._renderService.dimensions.css.cell.height*this._bufferService.buffer.lines.length}),this._suppressOnScrollHandler=!1,e!==this._latestYDisp&&this._scrollableElement.setScrollPosition({scrollTop:e*this._renderService.dimensions.css.cell.height}),this._isSyncing=!1)}_handleScroll(e){if(!this._renderService||this._isHandlingScroll||this._suppressOnScrollHandler)return;this._isHandlingScroll=!0;let t=Math.round(e.scrollTop/this._renderService.dimensions.css.cell.height),i=t-this._bufferService.buffer.ydisp;i!==0&&(this._latestYDisp=t,this._onRequestScrollLines.fire(i)),this._isHandlingScroll=!1}};lo=fe([F(2,Ne),F(3,_t),F(4,Gn),F(5,Qt),F(6,Be),F(7,bt)],lo);var ho=class extends te{constructor(e,t,i,r,o){super(),this._screenElement=e,this._bufferService=t,this._coreBrowserService=i,this._decorationService=r,this._renderService=o,this._decorationElements=new Map,this._altBufferIsActive=!1,this._dimensionsChanged=!1,this._container=document.createElement("div"),this._container.classList.add("xterm-decoration-container"),this._screenElement.appendChild(this._container),this._register(this._renderService.onRenderedViewportChange(()=>this._doRefreshDecorations())),this._register(this._renderService.onDimensionsChange(()=>{this._dimensionsChanged=!0,this._queueRefresh()})),this._register(this._coreBrowserService.onDprChange(()=>this._queueRefresh())),this._register(this._bufferService.buffers.onBufferActivate(()=>{this._altBufferIsActive=this._bufferService.buffer===this._bufferService.buffers.alt})),this._register(this._decorationService.onDecorationRegistered(()=>this._queueRefresh())),this._register(this._decorationService.onDecorationRemoved(s=>this._removeDecoration(s))),this._register(ue(()=>{this._container.remove(),this._decorationElements.clear()}))}_queueRefresh(){this._animationFrame===void 0&&(this._animationFrame=this._renderService.addRefreshCallback(()=>{this._doRefreshDecorations(),this._animationFrame=void 0}))}_doRefreshDecorations(){for(let e of this._decorationService.decorations)this._renderDecoration(e);this._dimensionsChanged=!1}_renderDecoration(e){this._refreshStyle(e),this._dimensionsChanged&&this._refreshXPosition(e)}_createElement(e){let t=this._coreBrowserService.mainDocument.createElement("div");t.classList.add("xterm-decoration"),t.classList.toggle("xterm-decoration-top-layer",e?.options?.layer==="top"),t.style.width=`${Math.round((e.options.width||1)*this._renderService.dimensions.css.cell.width)}px`,t.style.height=`${(e.options.height||1)*this._renderService.dimensions.css.cell.height}px`,t.style.top=`${(e.marker.line-this._bufferService.buffers.active.ydisp)*this._renderService.dimensions.css.cell.height}px`,t.style.lineHeight=`${this._renderService.dimensions.css.cell.height}px`;let i=e.options.x??0;return i&&i>this._bufferService.cols&&(t.style.display="none"),this._refreshXPosition(e,t),t}_refreshStyle(e){let t=e.marker.line-this._bufferService.buffers.active.ydisp;if(t<0||t>=this._bufferService.rows)e.element&&(e.element.style.display="none",e.onRenderEmitter.fire(e.element));else{let i=this._decorationElements.get(e);i||(i=this._createElement(e),e.element=i,this._decorationElements.set(e,i),this._container.appendChild(i),e.onDispose(()=>{this._decorationElements.delete(e),i.remove()})),i.style.display=this._altBufferIsActive?"none":"block",this._altBufferIsActive||(i.style.width=`${Math.round((e.options.width||1)*this._renderService.dimensions.css.cell.width)}px`,i.style.height=`${(e.options.height||1)*this._renderService.dimensions.css.cell.height}px`,i.style.top=`${t*this._renderService.dimensions.css.cell.height}px`,i.style.lineHeight=`${this._renderService.dimensions.css.cell.height}px`),e.onRenderEmitter.fire(i)}}_refreshXPosition(e,t=e.element){if(!t)return;let i=e.options.x??0;(e.options.anchor||"left")==="right"?t.style.right=i?`${i*this._renderService.dimensions.css.cell.width}px`:"":t.style.left=i?`${i*this._renderService.dimensions.css.cell.width}px`:""}_removeDecoration(e){this._decorationElements.get(e)?.remove(),this._decorationElements.delete(e),e.dispose()}};ho=fe([F(1,Ne),F(2,_t),F(3,Ei),F(4,bt)],ho);var gc=class{constructor(){this._zones=[],this._zonePool=[],this._zonePoolIndex=0,this._linePadding={full:0,left:0,center:0,right:0}}get zones(){return this._zonePool.length=Math.min(this._zonePool.length,this._zones.length),this._zones}clear(){this._zones.length=0,this._zonePoolIndex=0}addDecoration(e){if(e.options.overviewRulerOptions){for(let t of this._zones)if(t.color===e.options.overviewRulerOptions.color&&t.position===e.options.overviewRulerOptions.position){if(this._lineIntersectsZone(t,e.marker.line))return;if(this._lineAdjacentToZone(t,e.marker.line,e.options.overviewRulerOptions.position)){this._addLineToZone(t,e.marker.line);return}}if(this._zonePoolIndex<this._zonePool.length){this._zonePool[this._zonePoolIndex].color=e.options.overviewRulerOptions.color,this._zonePool[this._zonePoolIndex].position=e.options.overviewRulerOptions.position,this._zonePool[this._zonePoolIndex].startBufferLine=e.marker.line,this._zonePool[this._zonePoolIndex].endBufferLine=e.marker.line,this._zones.push(this._zonePool[this._zonePoolIndex++]);return}this._zones.push({color:e.options.overviewRulerOptions.color,position:e.options.overviewRulerOptions.position,startBufferLine:e.marker.line,endBufferLine:e.marker.line}),this._zonePool.push(this._zones[this._zones.length-1]),this._zonePoolIndex++}}setPadding(e){this._linePadding=e}_lineIntersectsZone(e,t){return t>=e.startBufferLine&&t<=e.endBufferLine}_lineAdjacentToZone(e,t,i){return t>=e.startBufferLine-this._linePadding[i||"full"]&&t<=e.endBufferLine+this._linePadding[i||"full"]}_addLineToZone(e,t){e.startBufferLine=Math.min(e.startBufferLine,t),e.endBufferLine=Math.max(e.endBufferLine,t)}},st={full:0,left:0,center:0,right:0},Tt={full:0,left:0,center:0,right:0},di={full:0,left:0,center:0,right:0},ir=class extends te{constructor(e,t,i,r,o,s,n,a){super(),this._viewportElement=e,this._screenElement=t,this._bufferService=i,this._decorationService=r,this._renderService=o,this._optionsService=s,this._themeService=n,this._coreBrowserService=a,this._colorZoneStore=new gc,this._shouldUpdateDimensions=!0,this._shouldUpdateAnchor=!0,this._lastKnownBufferLength=0,this._canvas=this._coreBrowserService.mainDocument.createElement("canvas"),this._canvas.classList.add("xterm-decoration-overview-ruler"),this._refreshCanvasDimensions(),this._viewportElement.parentElement?.insertBefore(this._canvas,this._viewportElement),this._register(ue(()=>this._canvas?.remove()));let l=this._canvas.getContext("2d");if(l)this._ctx=l;else throw new Error("Ctx cannot be null");this._register(this._decorationService.onDecorationRegistered(()=>this._queueRefresh(void 0,!0))),this._register(this._decorationService.onDecorationRemoved(()=>this._queueRefresh(void 0,!0))),this._register(this._renderService.onRenderedViewportChange(()=>this._queueRefresh())),this._register(this._bufferService.buffers.onBufferActivate(()=>{this._canvas.style.display=this._bufferService.buffer===this._bufferService.buffers.alt?"none":"block"})),this._register(this._bufferService.onScroll(()=>{this._lastKnownBufferLength!==this._bufferService.buffers.normal.lines.length&&(this._refreshDrawHeightConstants(),this._refreshColorZonePadding())})),this._register(this._renderService.onRender(()=>{(!this._containerHeight||this._containerHeight!==this._screenElement.clientHeight)&&(this._queueRefresh(!0),this._containerHeight=this._screenElement.clientHeight)})),this._register(this._coreBrowserService.onDprChange(()=>this._queueRefresh(!0))),this._register(this._optionsService.onSpecificOptionChange("overviewRuler",()=>this._queueRefresh(!0))),this._register(this._themeService.onChangeColors(()=>this._queueRefresh())),this._queueRefresh(!0)}get _width(){return this._optionsService.options.overviewRuler?.width||0}_refreshDrawConstants(){let e=Math.floor((this._canvas.width-1)/3),t=Math.ceil((this._canvas.width-1)/3);Tt.full=this._canvas.width,Tt.left=e,Tt.center=t,Tt.right=e,this._refreshDrawHeightConstants(),di.full=1,di.left=1,di.center=1+Tt.left,di.right=1+Tt.left+Tt.center}_refreshDrawHeightConstants(){st.full=Math.round(2*this._coreBrowserService.dpr);let e=this._canvas.height/this._bufferService.buffer.lines.length,t=Math.round(Math.max(Math.min(e,12),6)*this._coreBrowserService.dpr);st.left=t,st.center=t,st.right=t}_refreshColorZonePadding(){this._colorZoneStore.setPadding({full:Math.floor(this._bufferService.buffers.active.lines.length/(this._canvas.height-1)*st.full),left:Math.floor(this._bufferService.buffers.active.lines.length/(this._canvas.height-1)*st.left),center:Math.floor(this._bufferService.buffers.active.lines.length/(this._canvas.height-1)*st.center),right:Math.floor(this._bufferService.buffers.active.lines.length/(this._canvas.height-1)*st.right)}),this._lastKnownBufferLength=this._bufferService.buffers.normal.lines.length}_refreshCanvasDimensions(){this._canvas.style.width=`${this._width}px`,this._canvas.width=Math.round(this._width*this._coreBrowserService.dpr),this._canvas.style.height=`${this._screenElement.clientHeight}px`,this._canvas.height=Math.round(this._screenElement.clientHeight*this._coreBrowserService.dpr),this._refreshDrawConstants(),this._refreshColorZonePadding()}_refreshDecorations(){this._shouldUpdateDimensions&&this._refreshCanvasDimensions(),this._ctx.clearRect(0,0,this._canvas.width,this._canvas.height),this._colorZoneStore.clear();for(let t of this._decorationService.decorations)this._colorZoneStore.addDecoration(t);this._ctx.lineWidth=1,this._renderRulerOutline();let e=this._colorZoneStore.zones;for(let t of e)t.position!=="full"&&this._renderColorZone(t);for(let t of e)t.position==="full"&&this._renderColorZone(t);this._shouldUpdateDimensions=!1,this._shouldUpdateAnchor=!1}_renderRulerOutline(){this._ctx.fillStyle=this._themeService.colors.overviewRulerBorder.css,this._ctx.fillRect(0,0,1,this._canvas.height),this._optionsService.rawOptions.overviewRuler.showTopBorder&&this._ctx.fillRect(1,0,this._canvas.width-1,1),this._optionsService.rawOptions.overviewRuler.showBottomBorder&&this._ctx.fillRect(1,this._canvas.height-1,this._canvas.width-1,this._canvas.height)}_renderColorZone(e){this._ctx.fillStyle=e.color,this._ctx.fillRect(di[e.position||"full"],Math.round((this._canvas.height-1)*(e.startBufferLine/this._bufferService.buffers.active.lines.length)-st[e.position||"full"]/2),Tt[e.position||"full"],Math.round((this._canvas.height-1)*((e.endBufferLine-e.startBufferLine)/this._bufferService.buffers.active.lines.length)+st[e.position||"full"]))}_queueRefresh(e,t){this._shouldUpdateDimensions=e||this._shouldUpdateDimensions,this._shouldUpdateAnchor=t||this._shouldUpdateAnchor,this._animationFrame===void 0&&(this._animationFrame=this._coreBrowserService.window.requestAnimationFrame(()=>{this._refreshDecorations(),this._animationFrame=void 0}))}};ir=fe([F(2,Ne),F(3,Ei),F(4,bt),F(5,Be),F(6,Qt),F(7,_t)],ir);var A;(e=>(e.NUL="\0",e.SOH="",e.STX="",e.ETX="",e.EOT="",e.ENQ="",e.ACK="",e.BEL="\x07",e.BS="\b",e.HT="	",e.LF=`
`,e.VT="\v",e.FF="\f",e.CR="\r",e.SO="",e.SI="",e.DLE="",e.DC1="",e.DC2="",e.DC3="",e.DC4="",e.NAK="",e.SYN="",e.ETB="",e.CAN="",e.EM="",e.SUB="",e.ESC="\x1B",e.FS="",e.GS="",e.RS="",e.US="",e.SP=" ",e.DEL=""))(A||={});var Xi;(e=>(e.PAD="",e.HOP="",e.BPH="",e.NBH="",e.IND="",e.NEL="",e.SSA="",e.ESA="",e.HTS="",e.HTJ="",e.VTS="",e.PLD="",e.PLU="",e.RI="",e.SS2="",e.SS3="",e.DCS="",e.PU1="",e.PU2="",e.STS="",e.CCH="",e.MW="",e.SPA="",e.EPA="",e.SOS="",e.SGCI="",e.SCI="",e.CSI="",e.ST="",e.OSC="",e.PM="",e.APC=""))(Xi||={});var la;(e=>e.ST=`${A.ESC}\\`)(la||={});var co=class{constructor(e,t,i,r,o,s){this._textarea=e,this._compositionView=t,this._bufferService=i,this._optionsService=r,this._coreService=o,this._renderService=s,this._isComposing=!1,this._isSendingComposition=!1,this._compositionPosition={start:0,end:0},this._dataAlreadySent=""}get isComposing(){return this._isComposing}compositionstart(){this._isComposing=!0,this._compositionPosition.start=this._textarea.value.length,this._compositionView.textContent="",this._dataAlreadySent="",this._compositionView.classList.add("active")}compositionupdate(e){this._compositionView.textContent=e.data,this.updateCompositionElements(),setTimeout(()=>{this._compositionPosition.end=this._textarea.value.length},0)}compositionend(){this._finalizeComposition(!0)}keydown(e){if(this._isComposing||this._isSendingComposition){if(e.keyCode===20||e.keyCode===229||e.keyCode===16||e.keyCode===17||e.keyCode===18)return!1;this._finalizeComposition(!1)}return e.keyCode===229?(this._handleAnyTextareaChanges(),!1):!0}_finalizeComposition(e){if(this._compositionView.classList.remove("active"),this._isComposing=!1,e){let t={start:this._compositionPosition.start,end:this._compositionPosition.end};this._isSendingComposition=!0,setTimeout(()=>{if(this._isSendingComposition){this._isSendingComposition=!1;let i;t.start+=this._dataAlreadySent.length,this._isComposing?i=this._textarea.value.substring(t.start,this._compositionPosition.start):i=this._textarea.value.substring(t.start),i.length>0&&this._coreService.triggerDataEvent(i,!0)}},0)}else{this._isSendingComposition=!1;let t=this._textarea.value.substring(this._compositionPosition.start,this._compositionPosition.end);this._coreService.triggerDataEvent(t,!0)}}_handleAnyTextareaChanges(){let e=this._textarea.value;setTimeout(()=>{if(!this._isComposing){let t=this._textarea.value,i=t.replace(e,"");this._dataAlreadySent=i,t.length>e.length?this._coreService.triggerDataEvent(i,!0):t.length<e.length?this._coreService.triggerDataEvent(`${A.DEL}`,!0):t.length===e.length&&t!==e&&this._coreService.triggerDataEvent(t,!0)}},0)}updateCompositionElements(e){if(this._isComposing){if(this._bufferService.buffer.isCursorInViewport){let t=Math.min(this._bufferService.buffer.x,this._bufferService.cols-1),i=this._renderService.dimensions.css.cell.height,r=this._bufferService.buffer.y*this._renderService.dimensions.css.cell.height,o=t*this._renderService.dimensions.css.cell.width;this._compositionView.style.left=o+"px",this._compositionView.style.top=r+"px",this._compositionView.style.height=i+"px",this._compositionView.style.lineHeight=i+"px",this._compositionView.style.fontFamily=this._optionsService.rawOptions.fontFamily,this._compositionView.style.fontSize=this._optionsService.rawOptions.fontSize+"px";let s=this._compositionView.getBoundingClientRect();this._textarea.style.left=o+"px",this._textarea.style.top=r+"px",this._textarea.style.width=Math.max(s.width,1)+"px",this._textarea.style.height=Math.max(s.height,1)+"px",this._textarea.style.lineHeight=s.height+"px"}e||setTimeout(()=>this.updateCompositionElements(!0),0)}}};co=fe([F(2,Ne),F(3,Be),F(4,qt),F(5,bt)],co);var Te=0,ze=0,Ae=0,me=0,js={css:"#00000000",rgba:0},ye;(e=>{function t(o,s,n,a){return a!==void 0?`#${Nt(o)}${Nt(s)}${Nt(n)}${Nt(a)}`:`#${Nt(o)}${Nt(s)}${Nt(n)}`}e.toCss=t;function i(o,s,n,a=255){return(o<<24|s<<16|n<<8|a)>>>0}e.toRgba=i;function r(o,s,n,a){return{css:e.toCss(o,s,n,a),rgba:e.toRgba(o,s,n,a)}}e.toColor=r})(ye||={});var ce;(e=>{function t(l,d){if(me=(d.rgba&255)/255,me===1)return{css:d.css,rgba:d.rgba};let h=d.rgba>>24&255,c=d.rgba>>16&255,u=d.rgba>>8&255,p=l.rgba>>24&255,v=l.rgba>>16&255,g=l.rgba>>8&255;Te=p+Math.round((h-p)*me),ze=v+Math.round((c-v)*me),Ae=g+Math.round((u-g)*me);let m=ye.toCss(Te,ze,Ae),f=ye.toRgba(Te,ze,Ae);return{css:m,rgba:f}}e.blend=t;function i(l){return(l.rgba&255)===255}e.isOpaque=i;function r(l,d,h){let c=ji.ensureContrastRatio(l.rgba,d.rgba,h);if(c)return ye.toColor(c>>24&255,c>>16&255,c>>8&255)}e.ensureContrastRatio=r;function o(l){let d=(l.rgba|255)>>>0;return[Te,ze,Ae]=ji.toChannels(d),{css:ye.toCss(Te,ze,Ae),rgba:d}}e.opaque=o;function s(l,d){return me=Math.round(d*255),[Te,ze,Ae]=ji.toChannels(l.rgba),{css:ye.toCss(Te,ze,Ae,me),rgba:ye.toRgba(Te,ze,Ae,me)}}e.opacity=s;function n(l,d){return me=l.rgba&255,s(l,me*d/255)}e.multiplyOpacity=n;function a(l){return[l.rgba>>24&255,l.rgba>>16&255,l.rgba>>8&255]}e.toColorRGB=a})(ce||={});var ge;(e=>{let t,i;try{let o=document.createElement("canvas");o.width=1,o.height=1;let s=o.getContext("2d",{willReadFrequently:!0});s&&(t=s,t.globalCompositeOperation="copy",i=t.createLinearGradient(0,0,1,1))}catch{}function r(o){if(o.match(/#[\da-f]{3,8}/i))switch(o.length){case 4:return Te=parseInt(o.slice(1,2).repeat(2),16),ze=parseInt(o.slice(2,3).repeat(2),16),Ae=parseInt(o.slice(3,4).repeat(2),16),ye.toColor(Te,ze,Ae);case 5:return Te=parseInt(o.slice(1,2).repeat(2),16),ze=parseInt(o.slice(2,3).repeat(2),16),Ae=parseInt(o.slice(3,4).repeat(2),16),me=parseInt(o.slice(4,5).repeat(2),16),ye.toColor(Te,ze,Ae,me);case 7:return{css:o,rgba:(parseInt(o.slice(1),16)<<8|255)>>>0};case 9:return{css:o,rgba:parseInt(o.slice(1),16)>>>0}}let s=o.match(/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(,\s*(0|1|\d?\.(\d+))\s*)?\)/);if(s)return Te=parseInt(s[1]),ze=parseInt(s[2]),Ae=parseInt(s[3]),me=Math.round((s[5]===void 0?1:parseFloat(s[5]))*255),ye.toColor(Te,ze,Ae,me);if(!t||!i)throw new Error("css.toColor: Unsupported css format");if(t.fillStyle=i,t.fillStyle=o,typeof t.fillStyle!="string")throw new Error("css.toColor: Unsupported css format");if(t.fillRect(0,0,1,1),[Te,ze,Ae,me]=t.getImageData(0,0,1,1).data,me!==255)throw new Error("css.toColor: Unsupported css format");return{rgba:ye.toRgba(Te,ze,Ae,me),css:o}}e.toColor=r})(ge||={});var Re;(e=>{function t(r){return i(r>>16&255,r>>8&255,r&255)}e.relativeLuminance=t;function i(r,o,s){let n=r/255,a=o/255,l=s/255,d=n<=.03928?n/12.92:Math.pow((n+.055)/1.055,2.4),h=a<=.03928?a/12.92:Math.pow((a+.055)/1.055,2.4),c=l<=.03928?l/12.92:Math.pow((l+.055)/1.055,2.4);return d*.2126+h*.7152+c*.0722}e.relativeLuminance2=i})(Re||={});var ji;(e=>{function t(n,a){if(me=(a&255)/255,me===1)return a;let l=a>>24&255,d=a>>16&255,h=a>>8&255,c=n>>24&255,u=n>>16&255,p=n>>8&255;return Te=c+Math.round((l-c)*me),ze=u+Math.round((d-u)*me),Ae=p+Math.round((h-p)*me),ye.toRgba(Te,ze,Ae)}e.blend=t;function i(n,a,l){let d=Re.relativeLuminance(n>>8),h=Re.relativeLuminance(a>>8);if(vt(d,h)<l){if(h<d){let p=r(n,a,l),v=vt(d,Re.relativeLuminance(p>>8));if(v<l){let g=o(n,a,l),m=vt(d,Re.relativeLuminance(g>>8));return v>m?p:g}return p}let c=o(n,a,l),u=vt(d,Re.relativeLuminance(c>>8));if(u<l){let p=r(n,a,l),v=vt(d,Re.relativeLuminance(p>>8));return u>v?c:p}return c}}e.ensureContrastRatio=i;function r(n,a,l){let d=n>>24&255,h=n>>16&255,c=n>>8&255,u=a>>24&255,p=a>>16&255,v=a>>8&255,g=vt(Re.relativeLuminance2(u,p,v),Re.relativeLuminance2(d,h,c));for(;g<l&&(u>0||p>0||v>0);)u-=Math.max(0,Math.ceil(u*.1)),p-=Math.max(0,Math.ceil(p*.1)),v-=Math.max(0,Math.ceil(v*.1)),g=vt(Re.relativeLuminance2(u,p,v),Re.relativeLuminance2(d,h,c));return(u<<24|p<<16|v<<8|255)>>>0}e.reduceLuminance=r;function o(n,a,l){let d=n>>24&255,h=n>>16&255,c=n>>8&255,u=a>>24&255,p=a>>16&255,v=a>>8&255,g=vt(Re.relativeLuminance2(u,p,v),Re.relativeLuminance2(d,h,c));for(;g<l&&(u<255||p<255||v<255);)u=Math.min(255,u+Math.ceil((255-u)*.1)),p=Math.min(255,p+Math.ceil((255-p)*.1)),v=Math.min(255,v+Math.ceil((255-v)*.1)),g=vt(Re.relativeLuminance2(u,p,v),Re.relativeLuminance2(d,h,c));return(u<<24|p<<16|v<<8|255)>>>0}e.increaseLuminance=o;function s(n){return[n>>24&255,n>>16&255,n>>8&255,n&255]}e.toChannels=s})(ji||={});function Nt(e){let t=e.toString(16);return t.length<2?"0"+t:t}function vt(e,t){return e<t?(t+.05)/(e+.05):(e+.05)/(t+.05)}var mc=class extends Di{constructor(e,t,i){super(),this.content=0,this.combinedData="",this.fg=e.fg,this.bg=e.bg,this.combinedData=t,this._width=i}isCombined(){return 2097152}getWidth(){return this._width}getChars(){return this.combinedData}getCode(){return 2097151}setFromCharData(e){throw new Error("not implemented")}getAsCharData(){return[this.fg,this.getChars(),this.getWidth(),this.getCode()]}},rr=class{constructor(e){this._bufferService=e,this._characterJoiners=[],this._nextCharacterJoinerId=0,this._workCell=new Je}register(e){let t={id:this._nextCharacterJoinerId++,handler:e};return this._characterJoiners.push(t),t.id}deregister(e){for(let t=0;t<this._characterJoiners.length;t++)if(this._characterJoiners[t].id===e)return this._characterJoiners.splice(t,1),!0;return!1}getJoinedCharacters(e){if(this._characterJoiners.length===0)return[];let t=this._bufferService.buffer.lines.get(e);if(!t||t.length===0)return[];let i=[],r=t.translateToString(!0),o=0,s=0,n=0,a=t.getFg(0),l=t.getBg(0);for(let d=0;d<t.getTrimmedLength();d++)if(t.loadCell(d,this._workCell),this._workCell.getWidth()!==0){if(this._workCell.fg!==a||this._workCell.bg!==l){if(d-o>1){let h=this._getJoinedRanges(r,n,s,t,o);for(let c=0;c<h.length;c++)i.push(h[c])}o=d,n=s,a=this._workCell.fg,l=this._workCell.bg}s+=this._workCell.getChars().length||It.length}if(this._bufferService.cols-o>1){let d=this._getJoinedRanges(r,n,s,t,o);for(let h=0;h<d.length;h++)i.push(d[h])}return i}_getJoinedRanges(e,t,i,r,o){let s=e.substring(t,i),n=[];try{n=this._characterJoiners[0].handler(s)}catch(a){console.error(a)}for(let a=1;a<this._characterJoiners.length;a++)try{let l=this._characterJoiners[a].handler(s);for(let d=0;d<l.length;d++)rr._mergeRanges(n,l[d])}catch(l){console.error(l)}return this._stringRangesToCellRanges(n,r,o),n}_stringRangesToCellRanges(e,t,i){let r=0,o=!1,s=0,n=e[r];if(n){for(let a=i;a<this._bufferService.cols;a++){let l=t.getWidth(a),d=t.getString(a).length||It.length;if(l!==0){if(!o&&n[0]<=s&&(n[0]=a,o=!0),n[1]<=s){if(n[1]=a,n=e[++r],!n)break;n[0]<=s?(n[0]=a,o=!0):o=!1}s+=d}}n&&(n[1]=this._bufferService.cols)}}static _mergeRanges(e,t){let i=!1;for(let r=0;r<e.length;r++){let o=e[r];if(i){if(t[1]<=o[0])return e[r-1][1]=t[1],e;if(t[1]<=o[1])return e[r-1][1]=Math.max(t[1],o[1]),e.splice(r,1),e;e.splice(r,1),r--}else{if(t[1]<=o[0])return e.splice(r,0,t),e;if(t[1]<=o[1])return o[0]=Math.min(t[0],o[0]),e;t[0]<o[1]&&(o[0]=Math.min(t[0],o[0]),i=!0);continue}}return i?e[e.length-1][1]=t[1]:e.push(t),e}};rr=fe([F(0,Ne)],rr);function fc(e){return 57508<=e&&e<=57558}function _c(e){return 9472<=e&&e<=9631}function bc(e){return fc(e)||_c(e)}function wc(){return{css:{canvas:Ni(),cell:Ni()},device:{canvas:Ni(),cell:Ni(),char:{width:0,height:0,left:0,top:0}}}}function Ni(){return{width:0,height:0}}var uo=class{constructor(e,t,i,r,o,s,n){this._document=e,this._characterJoinerService=t,this._optionsService=i,this._coreBrowserService=r,this._coreService=o,this._decorationService=s,this._themeService=n,this._workCell=new Je,this._columnSelectMode=!1,this.defaultSpacing=0}handleSelectionChanged(e,t,i){this._selectionStart=e,this._selectionEnd=t,this._columnSelectMode=i}createRow(e,t,i,r,o,s,n,a,l,d,h){let c=[],u=this._characterJoinerService.getJoinedCharacters(t),p=this._themeService.colors,v=e.getNoBgTrimmedLength();i&&v<s+1&&(v=s+1);let g,m=0,f="",S=0,w=0,D=0,T=0,R=!1,x=0,C=!1,L=0,M=0,O=[],W=d!==-1&&h!==-1;for(let _=0;_<v;_++){e.loadCell(_,this._workCell);let y=this._workCell.getWidth();if(y===0)continue;let P=!1,k=_>=M,G=_,I=this._workCell;if(u.length>0&&_===u[0][0]&&k){let ne=u.shift(),ni=this._isCellInSelection(ne[0],t);for(S=ne[0]+1;S<ne[1];S++)k&&=ni===this._isCellInSelection(S,t);k&&=!i||s<ne[0]||s>=ne[1],k?(P=!0,I=new mc(this._workCell,e.translateToString(!0,ne[0],ne[1]),ne[1]-ne[0]),G=ne[1]-1,y=I.getWidth()):M=ne[1]}let H=this._isCellInSelection(_,t),U=i&&_===s,re=W&&_>=d&&_<=h,b=!1;this._decorationService.forEachDecorationAtCell(_,t,void 0,ne=>{b=!0});let z=I.getChars()||It;if(z===" "&&(I.isUnderline()||I.isOverline())&&(z=" "),L=y*a-l.get(z,I.isBold(),I.isItalic()),!g)g=this._document.createElement("span");else if(m&&(H&&C||!H&&!C&&I.bg===w)&&(H&&C&&p.selectionForeground||I.fg===D)&&I.extended.ext===T&&re===R&&L===x&&!U&&!P&&!b&&k){I.isInvisible()?f+=It:f+=z,m++;continue}else m&&(g.textContent=f),g=this._document.createElement("span"),m=0,f="";if(w=I.bg,D=I.fg,T=I.extended.ext,R=re,x=L,C=H,P&&s>=_&&s<=G&&(s=_),!this._coreService.isCursorHidden&&U&&this._coreService.isCursorInitialized){if(O.push("xterm-cursor"),this._coreBrowserService.isFocused)n&&O.push("xterm-cursor-blink"),O.push(r==="bar"?"xterm-cursor-bar":r==="underline"?"xterm-cursor-underline":"xterm-cursor-block");else if(o)switch(o){case"outline":O.push("xterm-cursor-outline");break;case"block":O.push("xterm-cursor-block");break;case"bar":O.push("xterm-cursor-bar");break;case"underline":O.push("xterm-cursor-underline");break;default:break}}if(I.isBold()&&O.push("xterm-bold"),I.isItalic()&&O.push("xterm-italic"),I.isDim()&&O.push("xterm-dim"),I.isInvisible()?f=It:f=I.getChars()||It,I.isUnderline()&&(O.push(`xterm-underline-${I.extended.underlineStyle}`),f===" "&&(f=" "),!I.isUnderlineColorDefault()))if(I.isUnderlineColorRGB())g.style.textDecorationColor=`rgb(${Di.toColorRGB(I.getUnderlineColor()).join(",")})`;else{let ne=I.getUnderlineColor();this._optionsService.rawOptions.drawBoldTextInBrightColors&&I.isBold()&&ne<8&&(ne+=8),g.style.textDecorationColor=p.ansi[ne].css}I.isOverline()&&(O.push("xterm-overline"),f===" "&&(f=" ")),I.isStrikethrough()&&O.push("xterm-strikethrough"),re&&(g.style.textDecoration="underline");let K=I.getFgColor(),Y=I.getFgColorMode(),q=I.getBgColor(),se=I.getBgColorMode(),X=!!I.isInverse();if(X){let ne=K;K=q,q=ne;let ni=Y;Y=se,se=ni}let Z,oe,pe=!1;this._decorationService.forEachDecorationAtCell(_,t,void 0,ne=>{ne.options.layer!=="top"&&pe||(ne.backgroundColorRGB&&(se=50331648,q=ne.backgroundColorRGB.rgba>>8&16777215,Z=ne.backgroundColorRGB),ne.foregroundColorRGB&&(Y=50331648,K=ne.foregroundColorRGB.rgba>>8&16777215,oe=ne.foregroundColorRGB),pe=ne.options.layer==="top")}),!pe&&H&&(Z=this._coreBrowserService.isFocused?p.selectionBackgroundOpaque:p.selectionInactiveBackgroundOpaque,q=Z.rgba>>8&16777215,se=50331648,pe=!0,p.selectionForeground&&(Y=50331648,K=p.selectionForeground.rgba>>8&16777215,oe=p.selectionForeground)),pe&&O.push("xterm-decoration-top");let xe;switch(se){case 16777216:case 33554432:xe=p.ansi[q],O.push(`xterm-bg-${q}`);break;case 50331648:xe=ye.toColor(q>>16,q>>8&255,q&255),this._addStyle(g,`background-color:#${Js((q>>>0).toString(16),"0",6)}`);break;default:X?(xe=p.foreground,O.push("xterm-bg-257")):xe=p.background}switch(Z||I.isDim()&&(Z=ce.multiplyOpacity(xe,.5)),Y){case 16777216:case 33554432:I.isBold()&&K<8&&this._optionsService.rawOptions.drawBoldTextInBrightColors&&(K+=8),this._applyMinimumContrast(g,xe,p.ansi[K],I,Z,void 0)||O.push(`xterm-fg-${K}`);break;case 50331648:let ne=ye.toColor(K>>16&255,K>>8&255,K&255);this._applyMinimumContrast(g,xe,ne,I,Z,oe)||this._addStyle(g,`color:#${Js(K.toString(16),"0",6)}`);break;default:this._applyMinimumContrast(g,xe,p.foreground,I,Z,oe)||X&&O.push("xterm-fg-257")}O.length&&(g.className=O.join(" "),O.length=0),!U&&!P&&!b&&k?m++:g.textContent=f,L!==this.defaultSpacing&&(g.style.letterSpacing=`${L}px`),c.push(g),_=G}return g&&m&&(g.textContent=f),c}_applyMinimumContrast(e,t,i,r,o,s){if(this._optionsService.rawOptions.minimumContrastRatio===1||bc(r.getCode()))return!1;let n=this._getContrastCache(r),a;if(!o&&!s&&(a=n.getColor(t.rgba,i.rgba)),a===void 0){let l=this._optionsService.rawOptions.minimumContrastRatio/(r.isDim()?2:1);a=ce.ensureContrastRatio(o||t,s||i,l),n.setColor((o||t).rgba,(s||i).rgba,a??null)}return a?(this._addStyle(e,`color:${a.css}`),!0):!1}_getContrastCache(e){return e.isDim()?this._themeService.colors.halfContrastCache:this._themeService.colors.contrastCache}_addStyle(e,t){e.setAttribute("style",`${e.getAttribute("style")||""}${t};`)}_isCellInSelection(e,t){let i=this._selectionStart,r=this._selectionEnd;return!i||!r?!1:this._columnSelectMode?i[0]<=r[0]?e>=i[0]&&t>=i[1]&&e<r[0]&&t<=r[1]:e<i[0]&&t>=i[1]&&e>=r[0]&&t<=r[1]:t>i[1]&&t<r[1]||i[1]===r[1]&&t===i[1]&&e>=i[0]&&e<r[0]||i[1]<r[1]&&t===r[1]&&e<r[0]||i[1]<r[1]&&t===i[1]&&e>=i[0]}};uo=fe([F(1,Ln),F(2,Be),F(3,_t),F(4,qt),F(5,Ei),F(6,Qt)],uo);function Js(e,t,i){for(;e.length<i;)e=t+e;return e}var Sc=class{constructor(e,t){this._flat=new Float32Array(256),this._font="",this._fontSize=0,this._weight="normal",this._weightBold="bold",this._measureElements=[],this._container=e.createElement("div"),this._container.classList.add("xterm-width-cache-measure-container"),this._container.setAttribute("aria-hidden","true"),this._container.style.whiteSpace="pre",this._container.style.fontKerning="none";let i=e.createElement("span");i.classList.add("xterm-char-measure-element");let r=e.createElement("span");r.classList.add("xterm-char-measure-element"),r.style.fontWeight="bold";let o=e.createElement("span");o.classList.add("xterm-char-measure-element"),o.style.fontStyle="italic";let s=e.createElement("span");s.classList.add("xterm-char-measure-element"),s.style.fontWeight="bold",s.style.fontStyle="italic",this._measureElements=[i,r,o,s],this._container.appendChild(i),this._container.appendChild(r),this._container.appendChild(o),this._container.appendChild(s),t.appendChild(this._container),this.clear()}dispose(){this._container.remove(),this._measureElements.length=0,this._holey=void 0}clear(){this._flat.fill(-9999),this._holey=new Map}setFont(e,t,i,r){e===this._font&&t===this._fontSize&&i===this._weight&&r===this._weightBold||(this._font=e,this._fontSize=t,this._weight=i,this._weightBold=r,this._container.style.fontFamily=this._font,this._container.style.fontSize=`${this._fontSize}px`,this._measureElements[0].style.fontWeight=`${i}`,this._measureElements[1].style.fontWeight=`${r}`,this._measureElements[2].style.fontWeight=`${i}`,this._measureElements[3].style.fontWeight=`${r}`,this.clear())}get(e,t,i){let r=0;if(!t&&!i&&e.length===1&&(r=e.charCodeAt(0))<256){if(this._flat[r]!==-9999)return this._flat[r];let n=this._measure(e,0);return n>0&&(this._flat[r]=n),n}let o=e;t&&(o+="B"),i&&(o+="I");let s=this._holey.get(o);if(s===void 0){let n=0;t&&(n|=1),i&&(n|=2),s=this._measure(e,n),s>0&&this._holey.set(o,s)}return s}_measure(e,t){let i=this._measureElements[t];return i.textContent=e.repeat(32),i.offsetWidth/32}},yc=class{constructor(){this.clear()}clear(){this.hasSelection=!1,this.columnSelectMode=!1,this.viewportStartRow=0,this.viewportEndRow=0,this.viewportCappedStartRow=0,this.viewportCappedEndRow=0,this.startCol=0,this.endCol=0,this.selectionStart=void 0,this.selectionEnd=void 0}update(e,t,i,r=!1){if(this.selectionStart=t,this.selectionEnd=i,!t||!i||t[0]===i[0]&&t[1]===i[1]){this.clear();return}let o=e.buffers.active.ydisp,s=t[1]-o,n=i[1]-o,a=Math.max(s,0),l=Math.min(n,e.rows-1);if(a>=e.rows||l<0){this.clear();return}this.hasSelection=!0,this.columnSelectMode=r,this.viewportStartRow=s,this.viewportEndRow=n,this.viewportCappedStartRow=a,this.viewportCappedEndRow=l,this.startCol=t[0],this.endCol=i[0]}isCellSelected(e,t,i){return this.hasSelection?(i-=e.buffer.active.viewportY,this.columnSelectMode?this.startCol<=this.endCol?t>=this.startCol&&i>=this.viewportCappedStartRow&&t<this.endCol&&i<=this.viewportCappedEndRow:t<this.startCol&&i>=this.viewportCappedStartRow&&t>=this.endCol&&i<=this.viewportCappedEndRow:i>this.viewportStartRow&&i<this.viewportEndRow||this.viewportStartRow===this.viewportEndRow&&i===this.viewportStartRow&&t>=this.startCol&&t<this.endCol||this.viewportStartRow<this.viewportEndRow&&i===this.viewportEndRow&&t<this.endCol||this.viewportStartRow<this.viewportEndRow&&i===this.viewportStartRow&&t>=this.startCol):!1}};function xc(){return new yc}var Mr="xterm-dom-renderer-owner-",Ye="xterm-rows",Bi="xterm-fg-",Zs="xterm-bg-",li="xterm-focus",Wi="xterm-selection",Cc=1,po=class extends te{constructor(e,t,i,r,o,s,n,a,l,d,h,c,u,p){super(),this._terminal=e,this._document=t,this._element=i,this._screenElement=r,this._viewportElement=o,this._helperContainer=s,this._linkifier2=n,this._charSizeService=l,this._optionsService=d,this._bufferService=h,this._coreService=c,this._coreBrowserService=u,this._themeService=p,this._terminalClass=Cc++,this._rowElements=[],this._selectionRenderModel=xc(),this.onRequestRedraw=this._register(new N).event,this._rowContainer=this._document.createElement("div"),this._rowContainer.classList.add(Ye),this._rowContainer.style.lineHeight="normal",this._rowContainer.setAttribute("aria-hidden","true"),this._refreshRowElements(this._bufferService.cols,this._bufferService.rows),this._selectionContainer=this._document.createElement("div"),this._selectionContainer.classList.add(Wi),this._selectionContainer.setAttribute("aria-hidden","true"),this.dimensions=wc(),this._updateDimensions(),this._register(this._optionsService.onOptionChange(()=>this._handleOptionsChanged())),this._register(this._themeService.onChangeColors(v=>this._injectCss(v))),this._injectCss(this._themeService.colors),this._rowFactory=a.createInstance(uo,document),this._element.classList.add(Mr+this._terminalClass),this._screenElement.appendChild(this._rowContainer),this._screenElement.appendChild(this._selectionContainer),this._register(this._linkifier2.onShowLinkUnderline(v=>this._handleLinkHover(v))),this._register(this._linkifier2.onHideLinkUnderline(v=>this._handleLinkLeave(v))),this._register(ue(()=>{this._element.classList.remove(Mr+this._terminalClass),this._rowContainer.remove(),this._selectionContainer.remove(),this._widthCache.dispose(),this._themeStyleElement.remove(),this._dimensionsStyleElement.remove()})),this._widthCache=new Sc(this._document,this._helperContainer),this._widthCache.setFont(this._optionsService.rawOptions.fontFamily,this._optionsService.rawOptions.fontSize,this._optionsService.rawOptions.fontWeight,this._optionsService.rawOptions.fontWeightBold),this._setDefaultSpacing()}_updateDimensions(){let e=this._coreBrowserService.dpr;this.dimensions.device.char.width=this._charSizeService.width*e,this.dimensions.device.char.height=Math.ceil(this._charSizeService.height*e),this.dimensions.device.cell.width=this.dimensions.device.char.width+Math.round(this._optionsService.rawOptions.letterSpacing),this.dimensions.device.cell.height=Math.floor(this.dimensions.device.char.height*this._optionsService.rawOptions.lineHeight),this.dimensions.device.char.left=0,this.dimensions.device.char.top=0,this.dimensions.device.canvas.width=this.dimensions.device.cell.width*this._bufferService.cols,this.dimensions.device.canvas.height=this.dimensions.device.cell.height*this._bufferService.rows,this.dimensions.css.canvas.width=Math.round(this.dimensions.device.canvas.width/e),this.dimensions.css.canvas.height=Math.round(this.dimensions.device.canvas.height/e),this.dimensions.css.cell.width=this.dimensions.css.canvas.width/this._bufferService.cols,this.dimensions.css.cell.height=this.dimensions.css.canvas.height/this._bufferService.rows;for(let i of this._rowElements)i.style.width=`${this.dimensions.css.canvas.width}px`,i.style.height=`${this.dimensions.css.cell.height}px`,i.style.lineHeight=`${this.dimensions.css.cell.height}px`,i.style.overflow="hidden";this._dimensionsStyleElement||(this._dimensionsStyleElement=this._document.createElement("style"),this._screenElement.appendChild(this._dimensionsStyleElement));let t=`${this._terminalSelector} .${Ye} span { display: inline-block; height: 100%; vertical-align: top;}`;this._dimensionsStyleElement.textContent=t,this._selectionContainer.style.height=this._viewportElement.style.height,this._screenElement.style.width=`${this.dimensions.css.canvas.width}px`,this._screenElement.style.height=`${this.dimensions.css.canvas.height}px`}_injectCss(e){this._themeStyleElement||(this._themeStyleElement=this._document.createElement("style"),this._screenElement.appendChild(this._themeStyleElement));let t=`${this._terminalSelector} .${Ye} { pointer-events: none; color: ${e.foreground.css}; font-family: ${this._optionsService.rawOptions.fontFamily}; font-size: ${this._optionsService.rawOptions.fontSize}px; font-kerning: none; white-space: pre}`;t+=`${this._terminalSelector} .${Ye} .xterm-dim { color: ${ce.multiplyOpacity(e.foreground,.5).css};}`,t+=`${this._terminalSelector} span:not(.xterm-bold) { font-weight: ${this._optionsService.rawOptions.fontWeight};}${this._terminalSelector} span.xterm-bold { font-weight: ${this._optionsService.rawOptions.fontWeightBold};}${this._terminalSelector} span.xterm-italic { font-style: italic;}`;let i=`blink_underline_${this._terminalClass}`,r=`blink_bar_${this._terminalClass}`,o=`blink_block_${this._terminalClass}`;t+=`@keyframes ${i} { 50% {  border-bottom-style: hidden; }}`,t+=`@keyframes ${r} { 50% {  box-shadow: none; }}`,t+=`@keyframes ${o} { 0% {  background-color: ${e.cursor.css};  color: ${e.cursorAccent.css}; } 50% {  background-color: inherit;  color: ${e.cursor.css}; }}`,t+=`${this._terminalSelector} .${Ye}.${li} .xterm-cursor.xterm-cursor-blink.xterm-cursor-underline { animation: ${i} 1s step-end infinite;}${this._terminalSelector} .${Ye}.${li} .xterm-cursor.xterm-cursor-blink.xterm-cursor-bar { animation: ${r} 1s step-end infinite;}${this._terminalSelector} .${Ye}.${li} .xterm-cursor.xterm-cursor-blink.xterm-cursor-block { animation: ${o} 1s step-end infinite;}${this._terminalSelector} .${Ye} .xterm-cursor.xterm-cursor-block { background-color: ${e.cursor.css}; color: ${e.cursorAccent.css};}${this._terminalSelector} .${Ye} .xterm-cursor.xterm-cursor-block:not(.xterm-cursor-blink) { background-color: ${e.cursor.css} !important; color: ${e.cursorAccent.css} !important;}${this._terminalSelector} .${Ye} .xterm-cursor.xterm-cursor-outline { outline: 1px solid ${e.cursor.css}; outline-offset: -1px;}${this._terminalSelector} .${Ye} .xterm-cursor.xterm-cursor-bar { box-shadow: ${this._optionsService.rawOptions.cursorWidth}px 0 0 ${e.cursor.css} inset;}${this._terminalSelector} .${Ye} .xterm-cursor.xterm-cursor-underline { border-bottom: 1px ${e.cursor.css}; border-bottom-style: solid; height: calc(100% - 1px);}`,t+=`${this._terminalSelector} .${Wi} { position: absolute; top: 0; left: 0; z-index: 1; pointer-events: none;}${this._terminalSelector}.focus .${Wi} div { position: absolute; background-color: ${e.selectionBackgroundOpaque.css};}${this._terminalSelector} .${Wi} div { position: absolute; background-color: ${e.selectionInactiveBackgroundOpaque.css};}`;for(let[s,n]of e.ansi.entries())t+=`${this._terminalSelector} .${Bi}${s} { color: ${n.css}; }${this._terminalSelector} .${Bi}${s}.xterm-dim { color: ${ce.multiplyOpacity(n,.5).css}; }${this._terminalSelector} .${Zs}${s} { background-color: ${n.css}; }`;t+=`${this._terminalSelector} .${Bi}257 { color: ${ce.opaque(e.background).css}; }${this._terminalSelector} .${Bi}257.xterm-dim { color: ${ce.multiplyOpacity(ce.opaque(e.background),.5).css}; }${this._terminalSelector} .${Zs}257 { background-color: ${e.foreground.css}; }`,this._themeStyleElement.textContent=t}_setDefaultSpacing(){let e=this.dimensions.css.cell.width-this._widthCache.get("W",!1,!1);this._rowContainer.style.letterSpacing=`${e}px`,this._rowFactory.defaultSpacing=e}handleDevicePixelRatioChange(){this._updateDimensions(),this._widthCache.clear(),this._setDefaultSpacing()}_refreshRowElements(e,t){for(let i=this._rowElements.length;i<=t;i++){let r=this._document.createElement("div");this._rowContainer.appendChild(r),this._rowElements.push(r)}for(;this._rowElements.length>t;)this._rowContainer.removeChild(this._rowElements.pop())}handleResize(e,t){this._refreshRowElements(e,t),this._updateDimensions(),this.handleSelectionChanged(this._selectionRenderModel.selectionStart,this._selectionRenderModel.selectionEnd,this._selectionRenderModel.columnSelectMode)}handleCharSizeChanged(){this._updateDimensions(),this._widthCache.clear(),this._setDefaultSpacing()}handleBlur(){this._rowContainer.classList.remove(li),this.renderRows(0,this._bufferService.rows-1)}handleFocus(){this._rowContainer.classList.add(li),this.renderRows(this._bufferService.buffer.y,this._bufferService.buffer.y)}handleSelectionChanged(e,t,i){if(this._selectionContainer.replaceChildren(),this._rowFactory.handleSelectionChanged(e,t,i),this.renderRows(0,this._bufferService.rows-1),!e||!t||(this._selectionRenderModel.update(this._terminal,e,t,i),!this._selectionRenderModel.hasSelection))return;let r=this._selectionRenderModel.viewportStartRow,o=this._selectionRenderModel.viewportEndRow,s=this._selectionRenderModel.viewportCappedStartRow,n=this._selectionRenderModel.viewportCappedEndRow,a=this._document.createDocumentFragment();if(i){let l=e[0]>t[0];a.appendChild(this._createSelectionElement(s,l?t[0]:e[0],l?e[0]:t[0],n-s+1))}else{let l=r===s?e[0]:0,d=s===o?t[0]:this._bufferService.cols;a.appendChild(this._createSelectionElement(s,l,d));let h=n-s-1;if(a.appendChild(this._createSelectionElement(s+1,0,this._bufferService.cols,h)),s!==n){let c=o===n?t[0]:this._bufferService.cols;a.appendChild(this._createSelectionElement(n,0,c))}}this._selectionContainer.appendChild(a)}_createSelectionElement(e,t,i,r=1){let o=this._document.createElement("div"),s=t*this.dimensions.css.cell.width,n=this.dimensions.css.cell.width*(i-t);return s+n>this.dimensions.css.canvas.width&&(n=this.dimensions.css.canvas.width-s),o.style.height=`${r*this.dimensions.css.cell.height}px`,o.style.top=`${e*this.dimensions.css.cell.height}px`,o.style.left=`${s}px`,o.style.width=`${n}px`,o}handleCursorMove(){}_handleOptionsChanged(){this._updateDimensions(),this._injectCss(this._themeService.colors),this._widthCache.setFont(this._optionsService.rawOptions.fontFamily,this._optionsService.rawOptions.fontSize,this._optionsService.rawOptions.fontWeight,this._optionsService.rawOptions.fontWeightBold),this._setDefaultSpacing()}clear(){for(let e of this._rowElements)e.replaceChildren()}renderRows(e,t){let i=this._bufferService.buffer,r=i.ybase+i.y,o=Math.min(i.x,this._bufferService.cols-1),s=this._coreService.decPrivateModes.cursorBlink??this._optionsService.rawOptions.cursorBlink,n=this._coreService.decPrivateModes.cursorStyle??this._optionsService.rawOptions.cursorStyle,a=this._optionsService.rawOptions.cursorInactiveStyle;for(let l=e;l<=t;l++){let d=l+i.ydisp,h=this._rowElements[l],c=i.lines.get(d);if(!h||!c)break;h.replaceChildren(...this._rowFactory.createRow(c,d,d===r,n,a,o,s,this.dimensions.css.cell.width,this._widthCache,-1,-1))}}get _terminalSelector(){return`.${Mr}${this._terminalClass}`}_handleLinkHover(e){this._setCellUnderline(e.x1,e.x2,e.y1,e.y2,e.cols,!0)}_handleLinkLeave(e){this._setCellUnderline(e.x1,e.x2,e.y1,e.y2,e.cols,!1)}_setCellUnderline(e,t,i,r,o,s){i<0&&(e=0),r<0&&(t=0);let n=this._bufferService.rows-1;i=Math.max(Math.min(i,n),0),r=Math.max(Math.min(r,n),0),o=Math.min(o,this._bufferService.cols);let a=this._bufferService.buffer,l=a.ybase+a.y,d=Math.min(a.x,o-1),h=this._optionsService.rawOptions.cursorBlink,c=this._optionsService.rawOptions.cursorStyle,u=this._optionsService.rawOptions.cursorInactiveStyle;for(let p=i;p<=r;++p){let v=p+a.ydisp,g=this._rowElements[p],m=a.lines.get(v);if(!g||!m)break;g.replaceChildren(...this._rowFactory.createRow(m,v,v===l,c,u,d,h,this.dimensions.css.cell.width,this._widthCache,s?p===i?e:0:-1,s?(p===r?t:o)-1:-1))}}};po=fe([F(7,Eo),F(8,dr),F(9,Be),F(10,Ne),F(11,qt),F(12,_t),F(13,Qt)],po);var vo=class extends te{constructor(e,t,i){super(),this._optionsService=i,this.width=0,this.height=0,this._onCharSizeChange=this._register(new N),this.onCharSizeChange=this._onCharSizeChange.event;try{this._measureStrategy=this._register(new Dc(this._optionsService))}catch{this._measureStrategy=this._register(new kc(e,t,this._optionsService))}this._register(this._optionsService.onMultipleOptionChange(["fontFamily","fontSize"],()=>this.measure()))}get hasValidSize(){return this.width>0&&this.height>0}measure(){let e=this._measureStrategy.measure();(e.width!==this.width||e.height!==this.height)&&(this.width=e.width,this.height=e.height,this._onCharSizeChange.fire())}};vo=fe([F(2,Be)],vo);var ha=class extends te{constructor(){super(...arguments),this._result={width:0,height:0}}_validateAndSet(e,t){e!==void 0&&e>0&&t!==void 0&&t>0&&(this._result.width=e,this._result.height=t)}},kc=class extends ha{constructor(e,t,i){super(),this._document=e,this._parentElement=t,this._optionsService=i,this._measureElement=this._document.createElement("span"),this._measureElement.classList.add("xterm-char-measure-element"),this._measureElement.textContent="W".repeat(32),this._measureElement.setAttribute("aria-hidden","true"),this._measureElement.style.whiteSpace="pre",this._measureElement.style.fontKerning="none",this._parentElement.appendChild(this._measureElement)}measure(){return this._measureElement.style.fontFamily=this._optionsService.rawOptions.fontFamily,this._measureElement.style.fontSize=`${this._optionsService.rawOptions.fontSize}px`,this._validateAndSet(Number(this._measureElement.offsetWidth)/32,Number(this._measureElement.offsetHeight)),this._result}},Dc=class extends ha{constructor(e){super(),this._optionsService=e,this._canvas=new OffscreenCanvas(100,100),this._ctx=this._canvas.getContext("2d");let t=this._ctx.measureText("W");if(!("width"in t&&"fontBoundingBoxAscent"in t&&"fontBoundingBoxDescent"in t))throw new Error("Required font metrics not supported")}measure(){this._ctx.font=`${this._optionsService.rawOptions.fontSize}px ${this._optionsService.rawOptions.fontFamily}`;let e=this._ctx.measureText("W");return this._validateAndSet(e.width,e.fontBoundingBoxAscent+e.fontBoundingBoxDescent),this._result}},Ec=class extends te{constructor(e,t,i){super(),this._textarea=e,this._window=t,this.mainDocument=i,this._isFocused=!1,this._cachedIsFocused=void 0,this._screenDprMonitor=this._register(new Pc(this._window)),this._onDprChange=this._register(new N),this.onDprChange=this._onDprChange.event,this._onWindowChange=this._register(new N),this.onWindowChange=this._onWindowChange.event,this._register(this.onWindowChange(r=>this._screenDprMonitor.setWindow(r))),this._register(Ge.forward(this._screenDprMonitor.onDprChange,this._onDprChange)),this._register(Q(this._textarea,"focus",()=>this._isFocused=!0)),this._register(Q(this._textarea,"blur",()=>this._isFocused=!1))}get window(){return this._window}set window(e){this._window!==e&&(this._window=e,this._onWindowChange.fire(this._window))}get dpr(){return this.window.devicePixelRatio}get isFocused(){return this._cachedIsFocused===void 0&&(this._cachedIsFocused=this._isFocused&&this._textarea.ownerDocument.hasFocus(),queueMicrotask(()=>this._cachedIsFocused=void 0)),this._cachedIsFocused}},Pc=class extends te{constructor(e){super(),this._parentWindow=e,this._windowResizeListener=this._register(new Zt),this._onDprChange=this._register(new N),this.onDprChange=this._onDprChange.event,this._outerListener=()=>this._setDprAndFireIfDiffers(),this._currentDevicePixelRatio=this._parentWindow.devicePixelRatio,this._updateDpr(),this._setWindowResizeListener(),this._register(ue(()=>this.clearListener()))}setWindow(e){this._parentWindow=e,this._setWindowResizeListener(),this._setDprAndFireIfDiffers()}_setWindowResizeListener(){this._windowResizeListener.value=Q(this._parentWindow,"resize",()=>this._setDprAndFireIfDiffers())}_setDprAndFireIfDiffers(){this._parentWindow.devicePixelRatio!==this._currentDevicePixelRatio&&this._onDprChange.fire(this._parentWindow.devicePixelRatio),this._updateDpr()}_updateDpr(){this._outerListener&&(this._resolutionMediaMatchList?.removeListener(this._outerListener),this._currentDevicePixelRatio=this._parentWindow.devicePixelRatio,this._resolutionMediaMatchList=this._parentWindow.matchMedia(`screen and (resolution: ${this._parentWindow.devicePixelRatio}dppx)`),this._resolutionMediaMatchList.addListener(this._outerListener))}clearListener(){!this._resolutionMediaMatchList||!this._outerListener||(this._resolutionMediaMatchList.removeListener(this._outerListener),this._resolutionMediaMatchList=void 0,this._outerListener=void 0)}},Tc=class extends te{constructor(){super(),this.linkProviders=[],this._register(ue(()=>this.linkProviders.length=0))}registerLinkProvider(e){return this.linkProviders.push(e),{dispose:()=>{let t=this.linkProviders.indexOf(e);t!==-1&&this.linkProviders.splice(t,1)}}}};function Oo(e,t,i){let r=i.getBoundingClientRect(),o=e.getComputedStyle(i),s=parseInt(o.getPropertyValue("padding-left")),n=parseInt(o.getPropertyValue("padding-top"));return[t.clientX-r.left-s,t.clientY-r.top-n]}function zc(e,t,i,r,o,s,n,a,l){if(!s)return;let d=Oo(e,t,i);if(d)return d[0]=Math.ceil((d[0]+(l?n/2:0))/n),d[1]=Math.ceil(d[1]/a),d[0]=Math.min(Math.max(d[0],1),r+(l?1:0)),d[1]=Math.min(Math.max(d[1],1),o),d}var go=class{constructor(e,t){this._renderService=e,this._charSizeService=t}getCoords(e,t,i,r,o){return zc(window,e,t,i,r,this._charSizeService.hasValidSize,this._renderService.dimensions.css.cell.width,this._renderService.dimensions.css.cell.height,o)}getMouseReportCoords(e,t){let i=Oo(window,e,t);if(this._charSizeService.hasValidSize)return i[0]=Math.min(Math.max(i[0],0),this._renderService.dimensions.css.canvas.width-1),i[1]=Math.min(Math.max(i[1],0),this._renderService.dimensions.css.canvas.height-1),{col:Math.floor(i[0]/this._renderService.dimensions.css.cell.width),row:Math.floor(i[1]/this._renderService.dimensions.css.cell.height),x:Math.floor(i[0]),y:Math.floor(i[1])}}};go=fe([F(0,bt),F(1,dr)],go);var Ac=class{constructor(e,t){this._renderCallback=e,this._coreBrowserService=t,this._refreshCallbacks=[]}dispose(){this._animationFrame&&(this._coreBrowserService.window.cancelAnimationFrame(this._animationFrame),this._animationFrame=void 0)}addRefreshCallback(e){return this._refreshCallbacks.push(e),this._animationFrame||(this._animationFrame=this._coreBrowserService.window.requestAnimationFrame(()=>this._innerRefresh())),this._animationFrame}refresh(e,t,i){this._rowCount=i,e=e!==void 0?e:0,t=t!==void 0?t:this._rowCount-1,this._rowStart=this._rowStart!==void 0?Math.min(this._rowStart,e):e,this._rowEnd=this._rowEnd!==void 0?Math.max(this._rowEnd,t):t,!this._animationFrame&&(this._animationFrame=this._coreBrowserService.window.requestAnimationFrame(()=>this._innerRefresh()))}_innerRefresh(){if(this._animationFrame=void 0,this._rowStart===void 0||this._rowEnd===void 0||this._rowCount===void 0){this._runRefreshCallbacks();return}let e=Math.max(this._rowStart,0),t=Math.min(this._rowEnd,this._rowCount-1);this._rowStart=void 0,this._rowEnd=void 0,this._renderCallback(e,t),this._runRefreshCallbacks()}_runRefreshCallbacks(){for(let e of this._refreshCallbacks)e(0);this._refreshCallbacks=[]}},ca={};vl(ca,{getSafariVersion:()=>Gc,isChromeOS:()=>ga,isFirefox:()=>ua,isIpad:()=>Mc,isIphone:()=>Oc,isLegacyEdge:()=>Ic,isLinux:()=>Lo,isMac:()=>or,isNode:()=>cr,isSafari:()=>pa,isWindows:()=>va});var cr=typeof process<"u"&&"title"in process,Pi=cr?"node":navigator.userAgent,Ti=cr?"node":navigator.platform,ua=Pi.includes("Firefox"),Ic=Pi.includes("Edge"),pa=/^((?!chrome|android).)*safari/i.test(Pi);function Gc(){if(!pa)return 0;let e=Pi.match(/Version\/(\d+)/);return e===null||e.length<2?0:parseInt(e[1])}var or=["Macintosh","MacIntel","MacPPC","Mac68K"].includes(Ti),Mc=Ti==="iPad",Oc=Ti==="iPhone",va=["Windows","Win16","Win32","WinCE"].includes(Ti),Lo=Ti.indexOf("Linux")>=0,ga=/\bCrOS\b/.test(Pi),ma=class{constructor(){this._tasks=[],this._i=0}enqueue(e){this._tasks.push(e),this._start()}flush(){for(;this._i<this._tasks.length;)this._tasks[this._i]()||this._i++;this.clear()}clear(){this._idleCallback&&(this._cancelCallback(this._idleCallback),this._idleCallback=void 0),this._i=0,this._tasks.length=0}_start(){this._idleCallback||(this._idleCallback=this._requestCallback(this._process.bind(this)))}_process(e){this._idleCallback=void 0;let t=0,i=0,r=e.timeRemaining(),o=0;for(;this._i<this._tasks.length;){if(t=performance.now(),this._tasks[this._i]()||this._i++,t=Math.max(1,performance.now()-t),i=Math.max(t,i),o=e.timeRemaining(),i*1.5>o){r-t<-20&&console.warn(`task queue exceeded allotted deadline by ${Math.abs(Math.round(r-t))}ms`),this._start();return}r=o}this.clear()}},Lc=class extends ma{_requestCallback(e){return setTimeout(()=>e(this._createDeadline(16)))}_cancelCallback(e){clearTimeout(e)}_createDeadline(e){let t=performance.now()+e;return{timeRemaining:()=>Math.max(0,t-performance.now())}}},Rc=class extends ma{_requestCallback(e){return requestIdleCallback(e)}_cancelCallback(e){cancelIdleCallback(e)}},sr=!cr&&"requestIdleCallback"in window?Rc:Lc,Nc=class{constructor(){this._queue=new sr}set(e){this._queue.clear(),this._queue.enqueue(e)}flush(){this._queue.flush()}},mo=class extends te{constructor(e,t,i,r,o,s,n,a,l){super(),this._rowCount=e,this._optionsService=i,this._charSizeService=r,this._coreService=o,this._coreBrowserService=a,this._renderer=this._register(new Zt),this._pausedResizeTask=new Nc,this._observerDisposable=this._register(new Zt),this._isPaused=!1,this._needsFullRefresh=!1,this._isNextRenderRedrawOnly=!0,this._needsSelectionRefresh=!1,this._canvasWidth=0,this._canvasHeight=0,this._selectionState={start:void 0,end:void 0,columnSelectMode:!1},this._onDimensionsChange=this._register(new N),this.onDimensionsChange=this._onDimensionsChange.event,this._onRenderedViewportChange=this._register(new N),this.onRenderedViewportChange=this._onRenderedViewportChange.event,this._onRender=this._register(new N),this.onRender=this._onRender.event,this._onRefreshRequest=this._register(new N),this.onRefreshRequest=this._onRefreshRequest.event,this._renderDebouncer=new Ac((d,h)=>this._renderRows(d,h),this._coreBrowserService),this._register(this._renderDebouncer),this._syncOutputHandler=new Bc(this._coreBrowserService,this._coreService,()=>this._fullRefresh()),this._register(ue(()=>this._syncOutputHandler.dispose())),this._register(this._coreBrowserService.onDprChange(()=>this.handleDevicePixelRatioChange())),this._register(n.onResize(()=>this._fullRefresh())),this._register(n.buffers.onBufferActivate(()=>this._renderer.value?.clear())),this._register(this._optionsService.onOptionChange(()=>this._handleOptionsChanged())),this._register(this._charSizeService.onCharSizeChange(()=>this.handleCharSizeChanged())),this._register(s.onDecorationRegistered(()=>this._fullRefresh())),this._register(s.onDecorationRemoved(()=>this._fullRefresh())),this._register(this._optionsService.onMultipleOptionChange(["customGlyphs","drawBoldTextInBrightColors","letterSpacing","lineHeight","fontFamily","fontSize","fontWeight","fontWeightBold","minimumContrastRatio","rescaleOverlappingGlyphs"],()=>{this.clear(),this.handleResize(n.cols,n.rows),this._fullRefresh()})),this._register(this._optionsService.onMultipleOptionChange(["cursorBlink","cursorStyle"],()=>this.refreshRows(n.buffer.y,n.buffer.y,!0))),this._register(l.onChangeColors(()=>this._fullRefresh())),this._registerIntersectionObserver(this._coreBrowserService.window,t),this._register(this._coreBrowserService.onWindowChange(d=>this._registerIntersectionObserver(d,t)))}get dimensions(){return this._renderer.value.dimensions}_registerIntersectionObserver(e,t){if("IntersectionObserver"in e){let i=new e.IntersectionObserver(r=>this._handleIntersectionChange(r[r.length-1]),{threshold:0});i.observe(t),this._observerDisposable.value=ue(()=>i.disconnect())}}_handleIntersectionChange(e){this._isPaused=e.isIntersecting===void 0?e.intersectionRatio===0:!e.isIntersecting,!this._isPaused&&!this._charSizeService.hasValidSize&&this._charSizeService.measure(),!this._isPaused&&this._needsFullRefresh&&(this._pausedResizeTask.flush(),this.refreshRows(0,this._rowCount-1),this._needsFullRefresh=!1)}refreshRows(e,t,i=!1){if(this._isPaused){this._needsFullRefresh=!0;return}if(this._coreService.decPrivateModes.synchronizedOutput){this._syncOutputHandler.bufferRows(e,t);return}let r=this._syncOutputHandler.flush();r&&(e=Math.min(e,r.start),t=Math.max(t,r.end)),i||(this._isNextRenderRedrawOnly=!1),this._renderDebouncer.refresh(e,t,this._rowCount)}_renderRows(e,t){if(this._renderer.value){if(this._coreService.decPrivateModes.synchronizedOutput){this._syncOutputHandler.bufferRows(e,t);return}e=Math.min(e,this._rowCount-1),t=Math.min(t,this._rowCount-1),this._renderer.value.renderRows(e,t),this._needsSelectionRefresh&&(this._renderer.value.handleSelectionChanged(this._selectionState.start,this._selectionState.end,this._selectionState.columnSelectMode),this._needsSelectionRefresh=!1),this._isNextRenderRedrawOnly||this._onRenderedViewportChange.fire({start:e,end:t}),this._onRender.fire({start:e,end:t}),this._isNextRenderRedrawOnly=!0}}resize(e,t){this._rowCount=t,this._fireOnCanvasResize()}_handleOptionsChanged(){this._renderer.value&&(this.refreshRows(0,this._rowCount-1),this._fireOnCanvasResize())}_fireOnCanvasResize(){this._renderer.value&&(this._renderer.value.dimensions.css.canvas.width===this._canvasWidth&&this._renderer.value.dimensions.css.canvas.height===this._canvasHeight||this._onDimensionsChange.fire(this._renderer.value.dimensions))}hasRenderer(){return!!this._renderer.value}setRenderer(e){this._renderer.value=e,this._renderer.value&&(this._renderer.value.onRequestRedraw(t=>this.refreshRows(t.start,t.end,!0)),this._needsSelectionRefresh=!0,this._fullRefresh())}addRefreshCallback(e){return this._renderDebouncer.addRefreshCallback(e)}_fullRefresh(){this._isPaused?this._needsFullRefresh=!0:this.refreshRows(0,this._rowCount-1)}clearTextureAtlas(){this._renderer.value&&(this._renderer.value.clearTextureAtlas?.(),this._fullRefresh())}handleDevicePixelRatioChange(){this._charSizeService.measure(),this._renderer.value&&(this._renderer.value.handleDevicePixelRatioChange(),this.refreshRows(0,this._rowCount-1))}handleResize(e,t){this._renderer.value&&(this._isPaused?this._pausedResizeTask.set(()=>this._renderer.value?.handleResize(e,t)):this._renderer.value.handleResize(e,t),this._fullRefresh())}handleCharSizeChanged(){this._renderer.value?.handleCharSizeChanged()}handleBlur(){this._renderer.value?.handleBlur()}handleFocus(){this._renderer.value?.handleFocus()}handleSelectionChanged(e,t,i){this._selectionState.start=e,this._selectionState.end=t,this._selectionState.columnSelectMode=i,this._renderer.value?.handleSelectionChanged(e,t,i)}handleCursorMove(){this._renderer.value?.handleCursorMove()}clear(){this._renderer.value?.clear()}};mo=fe([F(2,Be),F(3,dr),F(4,qt),F(5,Ei),F(6,Ne),F(7,_t),F(8,Qt)],mo);var Bc=class{constructor(e,t,i){this._coreBrowserService=e,this._coreService=t,this._onTimeout=i,this._start=0,this._end=0,this._isBuffering=!1}bufferRows(e,t){this._isBuffering?(this._start=Math.min(this._start,e),this._end=Math.max(this._end,t)):(this._start=e,this._end=t,this._isBuffering=!0),this._timeout===void 0&&(this._timeout=this._coreBrowserService.window.setTimeout(()=>{this._timeout=void 0,this._coreService.decPrivateModes.synchronizedOutput=!1,this._onTimeout()},1e3))}flush(){if(this._timeout!==void 0&&(this._coreBrowserService.window.clearTimeout(this._timeout),this._timeout=void 0),!this._isBuffering)return;let e={start:this._start,end:this._end};return this._isBuffering=!1,e}dispose(){this._timeout!==void 0&&(this._coreBrowserService.window.clearTimeout(this._timeout),this._timeout=void 0)}};function Wc(e,t,i,r){let o=i.buffer.x,s=i.buffer.y;if(!i.buffer.hasScrollback)return Fc(o,s,e,t,i,r)+ur(s,t,i,r)+Vc(o,s,e,t,i,r);let n;if(s===t)return n=o>e?"D":"C",Ci(Math.abs(o-e),xi(n,r));n=s>t?"D":"C";let a=Math.abs(s-t),l=$c(s>t?e:o,i)+(a-1)*i.cols+1+Hc(s>t?o:e,i);return Ci(l,xi(n,r))}function Hc(e,t){return e-1}function $c(e,t){return t.cols-e}function Fc(e,t,i,r,o,s){return ur(t,r,o,s).length===0?"":Ci(_a(e,t,e,t-Vt(t,o),!1,o).length,xi("D",s))}function ur(e,t,i,r){let o=e-Vt(e,i),s=t-Vt(t,i),n=Math.abs(o-s)-qc(e,t,i);return Ci(n,xi(fa(e,t),r))}function Vc(e,t,i,r,o,s){let n;ur(t,r,o,s).length>0?n=r-Vt(r,o):n=t;let a=r,l=Uc(e,t,i,r,o,s);return Ci(_a(e,n,i,a,l==="C",o).length,xi(l,s))}function qc(e,t,i){let r=0,o=e-Vt(e,i),s=t-Vt(t,i);for(let n=0;n<Math.abs(o-s);n++){let a=fa(e,t)==="A"?-1:1;i.buffer.lines.get(o+a*n)?.isWrapped&&r++}return r}function Vt(e,t){let i=0,r=t.buffer.lines.get(e),o=r?.isWrapped;for(;o&&e>=0&&e<t.rows;)i++,r=t.buffer.lines.get(--e),o=r?.isWrapped;return i}function Uc(e,t,i,r,o,s){let n;return ur(i,r,o,s).length>0?n=r-Vt(r,o):n=t,e<i&&n<=r||e>=i&&n<r?"C":"D"}function fa(e,t){return e>t?"A":"B"}function _a(e,t,i,r,o,s){let n=e,a=t,l="";for(;(n!==i||a!==r)&&a>=0&&a<s.buffer.lines.length;)n+=o?1:-1,o&&n>s.cols-1?(l+=s.buffer.translateBufferLineToString(a,!1,e,n),n=0,e=0,a++):!o&&n<0&&(l+=s.buffer.translateBufferLineToString(a,!1,0,e+1),n=s.cols-1,e=n,a--);return l+s.buffer.translateBufferLineToString(a,!1,e,n)}function xi(e,t){let i=t?"O":"[";return A.ESC+i+e}function Ci(e,t){e=Math.floor(e);let i="";for(let r=0;r<e;r++)i+=t;return i}var Kc=class{constructor(e){this._bufferService=e,this.isSelectAllActive=!1,this.selectionStartLength=0}clearSelection(){this.selectionStart=void 0,this.selectionEnd=void 0,this.isSelectAllActive=!1,this.selectionStartLength=0}get finalSelectionStart(){return this.isSelectAllActive?[0,0]:!this.selectionEnd||!this.selectionStart?this.selectionStart:this.areSelectionValuesReversed()?this.selectionEnd:this.selectionStart}get finalSelectionEnd(){if(this.isSelectAllActive)return[this._bufferService.cols,this._bufferService.buffer.ybase+this._bufferService.rows-1];if(this.selectionStart){if(!this.selectionEnd||this.areSelectionValuesReversed()){let e=this.selectionStart[0]+this.selectionStartLength;return e>this._bufferService.cols?e%this._bufferService.cols===0?[this._bufferService.cols,this.selectionStart[1]+Math.floor(e/this._bufferService.cols)-1]:[e%this._bufferService.cols,this.selectionStart[1]+Math.floor(e/this._bufferService.cols)]:[e,this.selectionStart[1]]}if(this.selectionStartLength&&this.selectionEnd[1]===this.selectionStart[1]){let e=this.selectionStart[0]+this.selectionStartLength;return e>this._bufferService.cols?[e%this._bufferService.cols,this.selectionStart[1]+Math.floor(e/this._bufferService.cols)]:[Math.max(e,this.selectionEnd[0]),this.selectionEnd[1]]}return this.selectionEnd}}areSelectionValuesReversed(){let e=this.selectionStart,t=this.selectionEnd;return!e||!t?!1:e[1]>t[1]||e[1]===t[1]&&e[0]>t[0]}handleTrim(e){return this.selectionStart&&(this.selectionStart[1]-=e),this.selectionEnd&&(this.selectionEnd[1]-=e),this.selectionEnd&&this.selectionEnd[1]<0?(this.clearSelection(),!0):(this.selectionStart&&this.selectionStart[1]<0&&(this.selectionStart[1]=0),!1)}};function Qs(e,t){if(e.start.y>e.end.y)throw new Error(`Buffer range end (${e.end.x}, ${e.end.y}) cannot be before start (${e.start.x}, ${e.start.y})`);return t*(e.end.y-e.start.y)+(e.end.x-e.start.x+1)}var Or=50,Yc=15,Xc=50,jc=500,Jc=" ",Zc=new RegExp(Jc,"g"),fo=class extends te{constructor(e,t,i,r,o,s,n,a,l){super(),this._element=e,this._screenElement=t,this._linkifier=i,this._bufferService=r,this._coreService=o,this._mouseService=s,this._optionsService=n,this._renderService=a,this._coreBrowserService=l,this._dragScrollAmount=0,this._enabled=!0,this._workCell=new Je,this._mouseDownTimeStamp=0,this._oldHasSelection=!1,this._oldSelectionStart=void 0,this._oldSelectionEnd=void 0,this._onLinuxMouseSelection=this._register(new N),this.onLinuxMouseSelection=this._onLinuxMouseSelection.event,this._onRedrawRequest=this._register(new N),this.onRequestRedraw=this._onRedrawRequest.event,this._onSelectionChange=this._register(new N),this.onSelectionChange=this._onSelectionChange.event,this._onRequestScrollLines=this._register(new N),this.onRequestScrollLines=this._onRequestScrollLines.event,this._mouseMoveListener=d=>this._handleMouseMove(d),this._mouseUpListener=d=>this._handleMouseUp(d),this._coreService.onUserInput(()=>{this.hasSelection&&this.clearSelection()}),this._trimListener=this._bufferService.buffer.lines.onTrim(d=>this._handleTrim(d)),this._register(this._bufferService.buffers.onBufferActivate(d=>this._handleBufferActivate(d))),this.enable(),this._model=new Kc(this._bufferService),this._activeSelectionMode=0,this._register(ue(()=>{this._removeMouseDownListeners()})),this._register(this._bufferService.onResize(d=>{d.rowsChanged&&this.clearSelection()}))}reset(){this.clearSelection()}disable(){this.clearSelection(),this._enabled=!1}enable(){this._enabled=!0}get selectionStart(){return this._model.finalSelectionStart}get selectionEnd(){return this._model.finalSelectionEnd}get hasSelection(){let e=this._model.finalSelectionStart,t=this._model.finalSelectionEnd;return!e||!t?!1:e[0]!==t[0]||e[1]!==t[1]}get selectionText(){let e=this._model.finalSelectionStart,t=this._model.finalSelectionEnd;if(!e||!t)return"";let i=this._bufferService.buffer,r=[];if(this._activeSelectionMode===3){if(e[0]===t[0])return"";let o=e[0]<t[0]?e[0]:t[0],s=e[0]<t[0]?t[0]:e[0];for(let n=e[1];n<=t[1];n++){let a=i.translateBufferLineToString(n,!0,o,s);r.push(a)}}else{let o=e[1]===t[1]?t[0]:void 0;r.push(i.translateBufferLineToString(e[1],!0,e[0],o));for(let s=e[1]+1;s<=t[1]-1;s++){let n=i.lines.get(s),a=i.translateBufferLineToString(s,!0);n?.isWrapped?r[r.length-1]+=a:r.push(a)}if(e[1]!==t[1]){let s=i.lines.get(t[1]),n=i.translateBufferLineToString(t[1],!0,0,t[0]);s&&s.isWrapped?r[r.length-1]+=n:r.push(n)}}return r.map(o=>o.replace(Zc," ")).join(va?`\r
`:`
`)}clearSelection(){this._model.clearSelection(),this._removeMouseDownListeners(),this.refresh(),this._onSelectionChange.fire()}refresh(e){this._refreshAnimationFrame||(this._refreshAnimationFrame=this._coreBrowserService.window.requestAnimationFrame(()=>this._refresh())),Lo&&e&&this.selectionText.length&&this._onLinuxMouseSelection.fire(this.selectionText)}_refresh(){this._refreshAnimationFrame=void 0,this._onRedrawRequest.fire({start:this._model.finalSelectionStart,end:this._model.finalSelectionEnd,columnSelectMode:this._activeSelectionMode===3})}_isClickInSelection(e){let t=this._getMouseBufferCoords(e),i=this._model.finalSelectionStart,r=this._model.finalSelectionEnd;return!i||!r||!t?!1:this._areCoordsInSelection(t,i,r)}isCellInSelection(e,t){let i=this._model.finalSelectionStart,r=this._model.finalSelectionEnd;return!i||!r?!1:this._areCoordsInSelection([e,t],i,r)}_areCoordsInSelection(e,t,i){return e[1]>t[1]&&e[1]<i[1]||t[1]===i[1]&&e[1]===t[1]&&e[0]>=t[0]&&e[0]<i[0]||t[1]<i[1]&&e[1]===i[1]&&e[0]<i[0]||t[1]<i[1]&&e[1]===t[1]&&e[0]>=t[0]}_selectWordAtCursor(e,t){let i=this._linkifier.currentLink?.link?.range;if(i)return this._model.selectionStart=[i.start.x-1,i.start.y-1],this._model.selectionStartLength=Qs(i,this._bufferService.cols),this._model.selectionEnd=void 0,!0;let r=this._getMouseBufferCoords(e);return r?(this._selectWordAt(r,t),this._model.selectionEnd=void 0,!0):!1}selectAll(){this._model.isSelectAllActive=!0,this.refresh(),this._onSelectionChange.fire()}selectLines(e,t){this._model.clearSelection(),e=Math.max(e,0),t=Math.min(t,this._bufferService.buffer.lines.length-1),this._model.selectionStart=[0,e],this._model.selectionEnd=[this._bufferService.cols,t],this.refresh(),this._onSelectionChange.fire()}_handleTrim(e){this._model.handleTrim(e)&&this.refresh()}_getMouseBufferCoords(e){let t=this._mouseService.getCoords(e,this._screenElement,this._bufferService.cols,this._bufferService.rows,!0);if(t)return t[0]--,t[1]--,t[1]+=this._bufferService.buffer.ydisp,t}_getMouseEventScrollAmount(e){let t=Oo(this._coreBrowserService.window,e,this._screenElement)[1],i=this._renderService.dimensions.css.canvas.height;return t>=0&&t<=i?0:(t>i&&(t-=i),t=Math.min(Math.max(t,-Or),Or),t/=Or,t/Math.abs(t)+Math.round(t*(Yc-1)))}shouldForceSelection(e){return or?e.altKey&&this._optionsService.rawOptions.macOptionClickForcesSelection:e.shiftKey}handleMouseDown(e){if(this._mouseDownTimeStamp=e.timeStamp,!(e.button===2&&this.hasSelection)&&e.button===0){if(!this._enabled){if(!this.shouldForceSelection(e))return;e.stopPropagation()}e.preventDefault(),this._dragScrollAmount=0,this._enabled&&e.shiftKey?this._handleIncrementalClick(e):e.detail===1?this._handleSingleClick(e):e.detail===2?this._handleDoubleClick(e):e.detail===3&&this._handleTripleClick(e),this._addMouseDownListeners(),this.refresh(!0)}}_addMouseDownListeners(){this._screenElement.ownerDocument&&(this._screenElement.ownerDocument.addEventListener("mousemove",this._mouseMoveListener),this._screenElement.ownerDocument.addEventListener("mouseup",this._mouseUpListener)),this._dragScrollIntervalTimer=this._coreBrowserService.window.setInterval(()=>this._dragScroll(),Xc)}_removeMouseDownListeners(){this._screenElement.ownerDocument&&(this._screenElement.ownerDocument.removeEventListener("mousemove",this._mouseMoveListener),this._screenElement.ownerDocument.removeEventListener("mouseup",this._mouseUpListener)),this._coreBrowserService.window.clearInterval(this._dragScrollIntervalTimer),this._dragScrollIntervalTimer=void 0}_handleIncrementalClick(e){this._model.selectionStart&&(this._model.selectionEnd=this._getMouseBufferCoords(e))}_handleSingleClick(e){if(this._model.selectionStartLength=0,this._model.isSelectAllActive=!1,this._activeSelectionMode=this.shouldColumnSelect(e)?3:0,this._model.selectionStart=this._getMouseBufferCoords(e),!this._model.selectionStart)return;this._model.selectionEnd=void 0;let t=this._bufferService.buffer.lines.get(this._model.selectionStart[1]);t&&t.length!==this._model.selectionStart[0]&&t.hasWidth(this._model.selectionStart[0])===0&&this._model.selectionStart[0]++}_handleDoubleClick(e){this._selectWordAtCursor(e,!0)&&(this._activeSelectionMode=1)}_handleTripleClick(e){let t=this._getMouseBufferCoords(e);t&&(this._activeSelectionMode=2,this._selectLineAt(t[1]))}shouldColumnSelect(e){return e.altKey&&!(or&&this._optionsService.rawOptions.macOptionClickForcesSelection)}_handleMouseMove(e){if(e.stopImmediatePropagation(),!this._model.selectionStart)return;let t=this._model.selectionEnd?[this._model.selectionEnd[0],this._model.selectionEnd[1]]:null;if(this._model.selectionEnd=this._getMouseBufferCoords(e),!this._model.selectionEnd){this.refresh(!0);return}this._activeSelectionMode===2?this._model.selectionEnd[1]<this._model.selectionStart[1]?this._model.selectionEnd[0]=0:this._model.selectionEnd[0]=this._bufferService.cols:this._activeSelectionMode===1&&this._selectToWordAt(this._model.selectionEnd),this._dragScrollAmount=this._getMouseEventScrollAmount(e),this._activeSelectionMode!==3&&(this._dragScrollAmount>0?this._model.selectionEnd[0]=this._bufferService.cols:this._dragScrollAmount<0&&(this._model.selectionEnd[0]=0));let i=this._bufferService.buffer;if(this._model.selectionEnd[1]<i.lines.length){let r=i.lines.get(this._model.selectionEnd[1]);r&&r.hasWidth(this._model.selectionEnd[0])===0&&this._model.selectionEnd[0]<this._bufferService.cols&&this._model.selectionEnd[0]++}(!t||t[0]!==this._model.selectionEnd[0]||t[1]!==this._model.selectionEnd[1])&&this.refresh(!0)}_dragScroll(){if(!(!this._model.selectionEnd||!this._model.selectionStart)&&this._dragScrollAmount){this._onRequestScrollLines.fire({amount:this._dragScrollAmount,suppressScrollEvent:!1});let e=this._bufferService.buffer;this._dragScrollAmount>0?(this._activeSelectionMode!==3&&(this._model.selectionEnd[0]=this._bufferService.cols),this._model.selectionEnd[1]=Math.min(e.ydisp+this._bufferService.rows,e.lines.length-1)):(this._activeSelectionMode!==3&&(this._model.selectionEnd[0]=0),this._model.selectionEnd[1]=e.ydisp),this.refresh()}}_handleMouseUp(e){let t=e.timeStamp-this._mouseDownTimeStamp;if(this._removeMouseDownListeners(),this.selectionText.length<=1&&t<jc&&e.altKey&&this._optionsService.rawOptions.altClickMovesCursor){if(this._bufferService.buffer.ybase===this._bufferService.buffer.ydisp){let i=this._mouseService.getCoords(e,this._element,this._bufferService.cols,this._bufferService.rows,!1);if(i&&i[0]!==void 0&&i[1]!==void 0){let r=Wc(i[0]-1,i[1]-1,this._bufferService,this._coreService.decPrivateModes.applicationCursorKeys);this._coreService.triggerDataEvent(r,!0)}}}else this._fireEventIfSelectionChanged()}_fireEventIfSelectionChanged(){let e=this._model.finalSelectionStart,t=this._model.finalSelectionEnd,i=!!e&&!!t&&(e[0]!==t[0]||e[1]!==t[1]);if(!i){this._oldHasSelection&&this._fireOnSelectionChange(e,t,i);return}!e||!t||(!this._oldSelectionStart||!this._oldSelectionEnd||e[0]!==this._oldSelectionStart[0]||e[1]!==this._oldSelectionStart[1]||t[0]!==this._oldSelectionEnd[0]||t[1]!==this._oldSelectionEnd[1])&&this._fireOnSelectionChange(e,t,i)}_fireOnSelectionChange(e,t,i){this._oldSelectionStart=e,this._oldSelectionEnd=t,this._oldHasSelection=i,this._onSelectionChange.fire()}_handleBufferActivate(e){this.clearSelection(),this._trimListener.dispose(),this._trimListener=e.activeBuffer.lines.onTrim(t=>this._handleTrim(t))}_convertViewportColToCharacterIndex(e,t){let i=t;for(let r=0;t>=r;r++){let o=e.loadCell(r,this._workCell).getChars().length;this._workCell.getWidth()===0?i--:o>1&&t!==r&&(i+=o-1)}return i}setSelection(e,t,i){this._model.clearSelection(),this._removeMouseDownListeners(),this._model.selectionStart=[e,t],this._model.selectionStartLength=i,this.refresh(),this._fireEventIfSelectionChanged()}rightClickSelect(e){this._isClickInSelection(e)||(this._selectWordAtCursor(e,!1)&&this.refresh(!0),this._fireEventIfSelectionChanged())}_getWordAt(e,t,i=!0,r=!0){if(e[0]>=this._bufferService.cols)return;let o=this._bufferService.buffer,s=o.lines.get(e[1]);if(!s)return;let n=o.translateBufferLineToString(e[1],!1),a=this._convertViewportColToCharacterIndex(s,e[0]),l=a,d=e[0]-a,h=0,c=0,u=0,p=0;if(n.charAt(a)===" "){for(;a>0&&n.charAt(a-1)===" ";)a--;for(;l<n.length&&n.charAt(l+1)===" ";)l++}else{let m=e[0],f=e[0];s.getWidth(m)===0&&(h++,m--),s.getWidth(f)===2&&(c++,f++);let S=s.getString(f).length;for(S>1&&(p+=S-1,l+=S-1);m>0&&a>0&&!this._isCharWordSeparator(s.loadCell(m-1,this._workCell));){s.loadCell(m-1,this._workCell);let w=this._workCell.getChars().length;this._workCell.getWidth()===0?(h++,m--):w>1&&(u+=w-1,a-=w-1),a--,m--}for(;f<s.length&&l+1<n.length&&!this._isCharWordSeparator(s.loadCell(f+1,this._workCell));){s.loadCell(f+1,this._workCell);let w=this._workCell.getChars().length;this._workCell.getWidth()===2?(c++,f++):w>1&&(p+=w-1,l+=w-1),l++,f++}}l++;let v=a+d-h+u,g=Math.min(this._bufferService.cols,l-a+h+c-u-p);if(!(!t&&n.slice(a,l).trim()==="")){if(i&&v===0&&s.getCodePoint(0)!==32){let m=o.lines.get(e[1]-1);if(m&&s.isWrapped&&m.getCodePoint(this._bufferService.cols-1)!==32){let f=this._getWordAt([this._bufferService.cols-1,e[1]-1],!1,!0,!1);if(f){let S=this._bufferService.cols-f.start;v-=S,g+=S}}}if(r&&v+g===this._bufferService.cols&&s.getCodePoint(this._bufferService.cols-1)!==32){let m=o.lines.get(e[1]+1);if(m?.isWrapped&&m.getCodePoint(0)!==32){let f=this._getWordAt([0,e[1]+1],!1,!1,!0);f&&(g+=f.length)}}return{start:v,length:g}}}_selectWordAt(e,t){let i=this._getWordAt(e,t);if(i){for(;i.start<0;)i.start+=this._bufferService.cols,e[1]--;this._model.selectionStart=[i.start,e[1]],this._model.selectionStartLength=i.length}}_selectToWordAt(e){let t=this._getWordAt(e,!0);if(t){let i=e[1];for(;t.start<0;)t.start+=this._bufferService.cols,i--;if(!this._model.areSelectionValuesReversed())for(;t.start+t.length>this._bufferService.cols;)t.length-=this._bufferService.cols,i++;this._model.selectionEnd=[this._model.areSelectionValuesReversed()?t.start:t.start+t.length,i]}}_isCharWordSeparator(e){return e.getWidth()===0?!1:this._optionsService.rawOptions.wordSeparator.indexOf(e.getChars())>=0}_selectLineAt(e){let t=this._bufferService.buffer.getWrappedRangeForLine(e),i={start:{x:0,y:t.first},end:{x:this._bufferService.cols-1,y:t.last}};this._model.selectionStart=[0,t.first],this._model.selectionEnd=void 0,this._model.selectionStartLength=Qs(i,this._bufferService.cols)}};fo=fe([F(3,Ne),F(4,qt),F(5,Po),F(6,Be),F(7,bt),F(8,_t)],fo);var en=class{constructor(){this._data={}}set(e,t,i){this._data[e]||(this._data[e]={}),this._data[e][t]=i}get(e,t){return this._data[e]?this._data[e][t]:void 0}clear(){this._data={}}},tn=class{constructor(){this._color=new en,this._css=new en}setCss(e,t,i){this._css.set(e,t,i)}getCss(e,t){return this._css.get(e,t)}setColor(e,t,i){this._color.set(e,t,i)}getColor(e,t){return this._color.get(e,t)}clear(){this._color.clear(),this._css.clear()}},Ce=Object.freeze((()=>{let e=[ge.toColor("#2e3436"),ge.toColor("#cc0000"),ge.toColor("#4e9a06"),ge.toColor("#c4a000"),ge.toColor("#3465a4"),ge.toColor("#75507b"),ge.toColor("#06989a"),ge.toColor("#d3d7cf"),ge.toColor("#555753"),ge.toColor("#ef2929"),ge.toColor("#8ae234"),ge.toColor("#fce94f"),ge.toColor("#729fcf"),ge.toColor("#ad7fa8"),ge.toColor("#34e2e2"),ge.toColor("#eeeeec")],t=[0,95,135,175,215,255];for(let i=0;i<216;i++){let r=t[i/36%6|0],o=t[i/6%6|0],s=t[i%6];e.push({css:ye.toCss(r,o,s),rgba:ye.toRgba(r,o,s)})}for(let i=0;i<24;i++){let r=8+i*10;e.push({css:ye.toCss(r,r,r),rgba:ye.toRgba(r,r,r)})}return e})()),Bt=ge.toColor("#ffffff"),mi=ge.toColor("#000000"),rn=ge.toColor("#ffffff"),on=mi,hi={css:"rgba(255, 255, 255, 0.3)",rgba:4294967117},Qc=Bt,_o=class extends te{constructor(e){super(),this._optionsService=e,this._contrastCache=new tn,this._halfContrastCache=new tn,this._onChangeColors=this._register(new N),this.onChangeColors=this._onChangeColors.event,this._colors={foreground:Bt,background:mi,cursor:rn,cursorAccent:on,selectionForeground:void 0,selectionBackgroundTransparent:hi,selectionBackgroundOpaque:ce.blend(mi,hi),selectionInactiveBackgroundTransparent:hi,selectionInactiveBackgroundOpaque:ce.blend(mi,hi),scrollbarSliderBackground:ce.opacity(Bt,.2),scrollbarSliderHoverBackground:ce.opacity(Bt,.4),scrollbarSliderActiveBackground:ce.opacity(Bt,.5),overviewRulerBorder:Bt,ansi:Ce.slice(),contrastCache:this._contrastCache,halfContrastCache:this._halfContrastCache},this._updateRestoreColors(),this._setTheme(this._optionsService.rawOptions.theme),this._register(this._optionsService.onSpecificOptionChange("minimumContrastRatio",()=>this._contrastCache.clear())),this._register(this._optionsService.onSpecificOptionChange("theme",()=>this._setTheme(this._optionsService.rawOptions.theme)))}get colors(){return this._colors}_setTheme(e={}){let t=this._colors;if(t.foreground=de(e.foreground,Bt),t.background=de(e.background,mi),t.cursor=ce.blend(t.background,de(e.cursor,rn)),t.cursorAccent=ce.blend(t.background,de(e.cursorAccent,on)),t.selectionBackgroundTransparent=de(e.selectionBackground,hi),t.selectionBackgroundOpaque=ce.blend(t.background,t.selectionBackgroundTransparent),t.selectionInactiveBackgroundTransparent=de(e.selectionInactiveBackground,t.selectionBackgroundTransparent),t.selectionInactiveBackgroundOpaque=ce.blend(t.background,t.selectionInactiveBackgroundTransparent),t.selectionForeground=e.selectionForeground?de(e.selectionForeground,js):void 0,t.selectionForeground===js&&(t.selectionForeground=void 0),ce.isOpaque(t.selectionBackgroundTransparent)&&(t.selectionBackgroundTransparent=ce.opacity(t.selectionBackgroundTransparent,.3)),ce.isOpaque(t.selectionInactiveBackgroundTransparent)&&(t.selectionInactiveBackgroundTransparent=ce.opacity(t.selectionInactiveBackgroundTransparent,.3)),t.scrollbarSliderBackground=de(e.scrollbarSliderBackground,ce.opacity(t.foreground,.2)),t.scrollbarSliderHoverBackground=de(e.scrollbarSliderHoverBackground,ce.opacity(t.foreground,.4)),t.scrollbarSliderActiveBackground=de(e.scrollbarSliderActiveBackground,ce.opacity(t.foreground,.5)),t.overviewRulerBorder=de(e.overviewRulerBorder,Qc),t.ansi=Ce.slice(),t.ansi[0]=de(e.black,Ce[0]),t.ansi[1]=de(e.red,Ce[1]),t.ansi[2]=de(e.green,Ce[2]),t.ansi[3]=de(e.yellow,Ce[3]),t.ansi[4]=de(e.blue,Ce[4]),t.ansi[5]=de(e.magenta,Ce[5]),t.ansi[6]=de(e.cyan,Ce[6]),t.ansi[7]=de(e.white,Ce[7]),t.ansi[8]=de(e.brightBlack,Ce[8]),t.ansi[9]=de(e.brightRed,Ce[9]),t.ansi[10]=de(e.brightGreen,Ce[10]),t.ansi[11]=de(e.brightYellow,Ce[11]),t.ansi[12]=de(e.brightBlue,Ce[12]),t.ansi[13]=de(e.brightMagenta,Ce[13]),t.ansi[14]=de(e.brightCyan,Ce[14]),t.ansi[15]=de(e.brightWhite,Ce[15]),e.extendedAnsi){let i=Math.min(t.ansi.length-16,e.extendedAnsi.length);for(let r=0;r<i;r++)t.ansi[r+16]=de(e.extendedAnsi[r],Ce[r+16])}this._contrastCache.clear(),this._halfContrastCache.clear(),this._updateRestoreColors(),this._onChangeColors.fire(this.colors)}restoreColor(e){this._restoreColor(e),this._onChangeColors.fire(this.colors)}_restoreColor(e){if(e===void 0){for(let t=0;t<this._restoreColors.ansi.length;++t)this._colors.ansi[t]=this._restoreColors.ansi[t];return}switch(e){case 256:this._colors.foreground=this._restoreColors.foreground;break;case 257:this._colors.background=this._restoreColors.background;break;case 258:this._colors.cursor=this._restoreColors.cursor;break;default:this._colors.ansi[e]=this._restoreColors.ansi[e]}}modifyColors(e){e(this._colors),this._onChangeColors.fire(this.colors)}_updateRestoreColors(){this._restoreColors={foreground:this._colors.foreground,background:this._colors.background,cursor:this._colors.cursor,ansi:this._colors.ansi.slice()}}};_o=fe([F(0,Be)],_o);function de(e,t){if(e!==void 0)try{return ge.toColor(e)}catch{}return t}var eu=class{constructor(...e){this._entries=new Map;for(let[t,i]of e)this.set(t,i)}set(e,t){let i=this._entries.get(e);return this._entries.set(e,t),i}forEach(e){for(let[t,i]of this._entries.entries())e(t,i)}has(e){return this._entries.has(e)}get(e){return this._entries.get(e)}},tu=class{constructor(){this._services=new eu,this._services.set(Eo,this)}setService(e,t){this._services.set(e,t)}getService(e){return this._services.get(e)}createInstance(e,...t){let i=Sl(e).sort((s,n)=>s.index-n.index),r=[];for(let s of i){let n=this._services.get(s.id);if(!n)throw new Error(`[createInstance] ${e.name} depends on UNKNOWN service ${s.id._id}.`);r.push(n)}let o=i.length>0?i[0].index:t.length;if(t.length!==o)throw new Error(`[createInstance] First service dependency of ${e.name} at position ${o+1} conflicts with ${t.length} static arguments`);return new e(...t,...r)}},iu={trace:0,debug:1,info:2,warn:3,error:4,off:5},ru="xterm.js: ",bo=class extends te{constructor(e){super(),this._optionsService=e,this._logLevel=5,this._updateLogLevel(),this._register(this._optionsService.onSpecificOptionChange("logLevel",()=>this._updateLogLevel())),ou=this}get logLevel(){return this._logLevel}_updateLogLevel(){this._logLevel=iu[this._optionsService.rawOptions.logLevel]}_evalLazyOptionalParams(e){for(let t=0;t<e.length;t++)typeof e[t]=="function"&&(e[t]=e[t]())}_log(e,t,i){this._evalLazyOptionalParams(i),e.call(console,(this._optionsService.options.logger?"":ru)+t,...i)}trace(e,...t){this._logLevel<=0&&this._log(this._optionsService.options.logger?.trace.bind(this._optionsService.options.logger)??console.log,e,t)}debug(e,...t){this._logLevel<=1&&this._log(this._optionsService.options.logger?.debug.bind(this._optionsService.options.logger)??console.log,e,t)}info(e,...t){this._logLevel<=2&&this._log(this._optionsService.options.logger?.info.bind(this._optionsService.options.logger)??console.info,e,t)}warn(e,...t){this._logLevel<=3&&this._log(this._optionsService.options.logger?.warn.bind(this._optionsService.options.logger)??console.warn,e,t)}error(e,...t){this._logLevel<=4&&this._log(this._optionsService.options.logger?.error.bind(this._optionsService.options.logger)??console.error,e,t)}};bo=fe([F(0,Be)],bo);var ou,sn=class extends te{constructor(e){super(),this._maxLength=e,this.onDeleteEmitter=this._register(new N),this.onDelete=this.onDeleteEmitter.event,this.onInsertEmitter=this._register(new N),this.onInsert=this.onInsertEmitter.event,this.onTrimEmitter=this._register(new N),this.onTrim=this.onTrimEmitter.event,this._array=new Array(this._maxLength),this._startIndex=0,this._length=0}get maxLength(){return this._maxLength}set maxLength(e){if(this._maxLength===e)return;let t=new Array(e);for(let i=0;i<Math.min(e,this.length);i++)t[i]=this._array[this._getCyclicIndex(i)];this._array=t,this._maxLength=e,this._startIndex=0}get length(){return this._length}set length(e){if(e>this._length)for(let t=this._length;t<e;t++)this._array[t]=void 0;this._length=e}get(e){return this._array[this._getCyclicIndex(e)]}set(e,t){this._array[this._getCyclicIndex(e)]=t}push(e){this._array[this._getCyclicIndex(this._length)]=e,this._length===this._maxLength?(this._startIndex=++this._startIndex%this._maxLength,this.onTrimEmitter.fire(1)):this._length++}recycle(){if(this._length!==this._maxLength)throw new Error("Can only recycle when the buffer is full");return this._startIndex=++this._startIndex%this._maxLength,this.onTrimEmitter.fire(1),this._array[this._getCyclicIndex(this._length-1)]}get isFull(){return this._length===this._maxLength}pop(){return this._array[this._getCyclicIndex(this._length---1)]}splice(e,t,...i){if(t){for(let r=e;r<this._length-t;r++)this._array[this._getCyclicIndex(r)]=this._array[this._getCyclicIndex(r+t)];this._length-=t,this.onDeleteEmitter.fire({index:e,amount:t})}for(let r=this._length-1;r>=e;r--)this._array[this._getCyclicIndex(r+i.length)]=this._array[this._getCyclicIndex(r)];for(let r=0;r<i.length;r++)this._array[this._getCyclicIndex(e+r)]=i[r];if(i.length&&this.onInsertEmitter.fire({index:e,amount:i.length}),this._length+i.length>this._maxLength){let r=this._length+i.length-this._maxLength;this._startIndex+=r,this._length=this._maxLength,this.onTrimEmitter.fire(r)}else this._length+=i.length}trimStart(e){e>this._length&&(e=this._length),this._startIndex+=e,this._length-=e,this.onTrimEmitter.fire(e)}shiftElements(e,t,i){if(!(t<=0)){if(e<0||e>=this._length)throw new Error("start argument out of range");if(e+i<0)throw new Error("Cannot shift elements in list beyond index 0");if(i>0){for(let o=t-1;o>=0;o--)this.set(e+o+i,this.get(e+o));let r=e+t+i-this._length;if(r>0)for(this._length+=r;this._length>this._maxLength;)this._length--,this._startIndex++,this.onTrimEmitter.fire(1)}else for(let r=0;r<t;r++)this.set(e+r+i,this.get(e+r))}}_getCyclicIndex(e){return(this._startIndex+e)%this._maxLength}},ie=3,Se=Object.freeze(new Di),Hi=0,Lr=2,fi=class ba{constructor(t,i,r=!1){this.isWrapped=r,this._combined={},this._extendedAttrs={},this._data=new Uint32Array(t*ie);let o=i||Je.fromCharData([0,Tn,1,0]);for(let s=0;s<t;++s)this.setCell(s,o);this.length=t}get(t){let i=this._data[t*ie+0],r=i&2097151;return[this._data[t*ie+1],i&2097152?this._combined[t]:r?At(r):"",i>>22,i&2097152?this._combined[t].charCodeAt(this._combined[t].length-1):r]}set(t,i){this._data[t*ie+1]=i[0],i[1].length>1?(this._combined[t]=i[1],this._data[t*ie+0]=t|2097152|i[2]<<22):this._data[t*ie+0]=i[1].charCodeAt(0)|i[2]<<22}getWidth(t){return this._data[t*ie+0]>>22}hasWidth(t){return this._data[t*ie+0]&12582912}getFg(t){return this._data[t*ie+1]}getBg(t){return this._data[t*ie+2]}hasContent(t){return this._data[t*ie+0]&4194303}getCodePoint(t){let i=this._data[t*ie+0];return i&2097152?this._combined[t].charCodeAt(this._combined[t].length-1):i&2097151}isCombined(t){return this._data[t*ie+0]&2097152}getString(t){let i=this._data[t*ie+0];return i&2097152?this._combined[t]:i&2097151?At(i&2097151):""}isProtected(t){return this._data[t*ie+2]&536870912}loadCell(t,i){return Hi=t*ie,i.content=this._data[Hi+0],i.fg=this._data[Hi+1],i.bg=this._data[Hi+2],i.content&2097152&&(i.combinedData=this._combined[t]),i.bg&268435456&&(i.extended=this._extendedAttrs[t]),i}setCell(t,i){i.content&2097152&&(this._combined[t]=i.combinedData),i.bg&268435456&&(this._extendedAttrs[t]=i.extended),this._data[t*ie+0]=i.content,this._data[t*ie+1]=i.fg,this._data[t*ie+2]=i.bg}setCellFromCodepoint(t,i,r,o){o.bg&268435456&&(this._extendedAttrs[t]=o.extended),this._data[t*ie+0]=i|r<<22,this._data[t*ie+1]=o.fg,this._data[t*ie+2]=o.bg}addCodepointToCell(t,i,r){let o=this._data[t*ie+0];o&2097152?this._combined[t]+=At(i):o&2097151?(this._combined[t]=At(o&2097151)+At(i),o&=-2097152,o|=2097152):o=i|1<<22,r&&(o&=-12582913,o|=r<<22),this._data[t*ie+0]=o}insertCells(t,i,r){if(t%=this.length,t&&this.getWidth(t-1)===2&&this.setCellFromCodepoint(t-1,0,1,r),i<this.length-t){let o=new Je;for(let s=this.length-t-i-1;s>=0;--s)this.setCell(t+i+s,this.loadCell(t+s,o));for(let s=0;s<i;++s)this.setCell(t+s,r)}else for(let o=t;o<this.length;++o)this.setCell(o,r);this.getWidth(this.length-1)===2&&this.setCellFromCodepoint(this.length-1,0,1,r)}deleteCells(t,i,r){if(t%=this.length,i<this.length-t){let o=new Je;for(let s=0;s<this.length-t-i;++s)this.setCell(t+s,this.loadCell(t+i+s,o));for(let s=this.length-i;s<this.length;++s)this.setCell(s,r)}else for(let o=t;o<this.length;++o)this.setCell(o,r);t&&this.getWidth(t-1)===2&&this.setCellFromCodepoint(t-1,0,1,r),this.getWidth(t)===0&&!this.hasContent(t)&&this.setCellFromCodepoint(t,0,1,r)}replaceCells(t,i,r,o=!1){if(o){for(t&&this.getWidth(t-1)===2&&!this.isProtected(t-1)&&this.setCellFromCodepoint(t-1,0,1,r),i<this.length&&this.getWidth(i-1)===2&&!this.isProtected(i)&&this.setCellFromCodepoint(i,0,1,r);t<i&&t<this.length;)this.isProtected(t)||this.setCell(t,r),t++;return}for(t&&this.getWidth(t-1)===2&&this.setCellFromCodepoint(t-1,0,1,r),i<this.length&&this.getWidth(i-1)===2&&this.setCellFromCodepoint(i,0,1,r);t<i&&t<this.length;)this.setCell(t++,r)}resize(t,i){if(t===this.length)return this._data.length*4*Lr<this._data.buffer.byteLength;let r=t*ie;if(t>this.length){if(this._data.buffer.byteLength>=r*4)this._data=new Uint32Array(this._data.buffer,0,r);else{let o=new Uint32Array(r);o.set(this._data),this._data=o}for(let o=this.length;o<t;++o)this.setCell(o,i)}else{this._data=this._data.subarray(0,r);let o=Object.keys(this._combined);for(let n=0;n<o.length;n++){let a=parseInt(o[n],10);a>=t&&delete this._combined[a]}let s=Object.keys(this._extendedAttrs);for(let n=0;n<s.length;n++){let a=parseInt(s[n],10);a>=t&&delete this._extendedAttrs[a]}}return this.length=t,r*4*Lr<this._data.buffer.byteLength}cleanupMemory(){if(this._data.length*4*Lr<this._data.buffer.byteLength){let t=new Uint32Array(this._data.length);return t.set(this._data),this._data=t,1}return 0}fill(t,i=!1){if(i){for(let r=0;r<this.length;++r)this.isProtected(r)||this.setCell(r,t);return}this._combined={},this._extendedAttrs={};for(let r=0;r<this.length;++r)this.setCell(r,t)}copyFrom(t){this.length!==t.length?this._data=new Uint32Array(t._data):this._data.set(t._data),this.length=t.length,this._combined={};for(let i in t._combined)this._combined[i]=t._combined[i];this._extendedAttrs={};for(let i in t._extendedAttrs)this._extendedAttrs[i]=t._extendedAttrs[i];this.isWrapped=t.isWrapped}clone(){let t=new ba(0);t._data=new Uint32Array(this._data),t.length=this.length;for(let i in this._combined)t._combined[i]=this._combined[i];for(let i in this._extendedAttrs)t._extendedAttrs[i]=this._extendedAttrs[i];return t.isWrapped=this.isWrapped,t}getTrimmedLength(){for(let t=this.length-1;t>=0;--t)if(this._data[t*ie+0]&4194303)return t+(this._data[t*ie+0]>>22);return 0}getNoBgTrimmedLength(){for(let t=this.length-1;t>=0;--t)if(this._data[t*ie+0]&4194303||this._data[t*ie+2]&50331648)return t+(this._data[t*ie+0]>>22);return 0}copyCellsFrom(t,i,r,o,s){let n=t._data;if(s)for(let l=o-1;l>=0;l--){for(let d=0;d<ie;d++)this._data[(r+l)*ie+d]=n[(i+l)*ie+d];n[(i+l)*ie+2]&268435456&&(this._extendedAttrs[r+l]=t._extendedAttrs[i+l])}else for(let l=0;l<o;l++){for(let d=0;d<ie;d++)this._data[(r+l)*ie+d]=n[(i+l)*ie+d];n[(i+l)*ie+2]&268435456&&(this._extendedAttrs[r+l]=t._extendedAttrs[i+l])}let a=Object.keys(t._combined);for(let l=0;l<a.length;l++){let d=parseInt(a[l],10);d>=i&&(this._combined[d-i+r]=t._combined[d])}}translateToString(t,i,r,o){i=i??0,r=r??this.length,t&&(r=Math.min(r,this.getTrimmedLength())),o&&(o.length=0);let s="";for(;i<r;){let n=this._data[i*ie+0],a=n&2097151,l=n&2097152?this._combined[i]:a?At(a):It;if(s+=l,o)for(let d=0;d<l.length;++d)o.push(i);i+=n>>22||1}return o&&o.push(i),s}};function su(e,t,i,r,o,s){let n=[];for(let a=0;a<e.length-1;a++){let l=a,d=e.get(++l);if(!d.isWrapped)continue;let h=[e.get(a)];for(;l<e.length&&d.isWrapped;)h.push(d),d=e.get(++l);if(!s&&r>=a&&r<l){a+=h.length-1;continue}let c=0,u=ki(h,c,t),p=1,v=0;for(;p<h.length;){let m=ki(h,p,t),f=m-v,S=i-u,w=Math.min(f,S);h[c].copyCellsFrom(h[p],v,u,w,!1),u+=w,u===i&&(c++,u=0),v+=w,v===m&&(p++,v=0),u===0&&c!==0&&h[c-1].getWidth(i-1)===2&&(h[c].copyCellsFrom(h[c-1],i-1,u++,1,!1),h[c-1].setCell(i-1,o))}h[c].replaceCells(u,i,o);let g=0;for(let m=h.length-1;m>0&&(m>c||h[m].getTrimmedLength()===0);m--)g++;g>0&&(n.push(a+h.length-g),n.push(g)),a+=h.length-1}return n}function nu(e,t){let i=[],r=0,o=t[r],s=0;for(let n=0;n<e.length;n++)if(o===n){let a=t[++r];e.onDeleteEmitter.fire({index:n-s,amount:a}),n+=a-1,s+=a,o=t[++r]}else i.push(n);return{layout:i,countRemoved:s}}function au(e,t){let i=[];for(let r=0;r<t.length;r++)i.push(e.get(t[r]));for(let r=0;r<i.length;r++)e.set(r,i[r]);e.length=t.length}function du(e,t,i){let r=[],o=e.map((l,d)=>ki(e,d,t)).reduce((l,d)=>l+d),s=0,n=0,a=0;for(;a<o;){if(o-a<i){r.push(o-a);break}s+=i;let l=ki(e,n,t);s>l&&(s-=l,n++);let d=e[n].getWidth(s-1)===2;d&&s--;let h=d?i-1:i;r.push(h),a+=h}return r}function ki(e,t,i){if(t===e.length-1)return e[t].getTrimmedLength();let r=!e[t].hasContent(i-1)&&e[t].getWidth(i-1)===1,o=e[t+1].getWidth(0)===2;return r&&o?i-1:i}var wa=class Sa{constructor(t){this.line=t,this.isDisposed=!1,this._disposables=[],this._id=Sa._nextId++,this._onDispose=this.register(new N),this.onDispose=this._onDispose.event}get id(){return this._id}dispose(){this.isDisposed||(this.isDisposed=!0,this.line=-1,this._onDispose.fire(),Ft(this._disposables),this._disposables.length=0)}register(t){return this._disposables.push(t),t}};wa._nextId=1;var lu=wa,De={},Wt=De.B;De[0]={"`":"◆",a:"▒",b:"␉",c:"␌",d:"␍",e:"␊",f:"°",g:"±",h:"␤",i:"␋",j:"┘",k:"┐",l:"┌",m:"└",n:"┼",o:"⎺",p:"⎻",q:"─",r:"⎼",s:"⎽",t:"├",u:"┤",v:"┴",w:"┬",x:"│",y:"≤",z:"≥","{":"π","|":"≠","}":"£","~":"·"};De.A={"#":"£"};De.B=void 0;De[4]={"#":"£","@":"¾","[":"ij","\\":"½","]":"|","{":"¨","|":"f","}":"¼","~":"´"};De.C=De[5]={"[":"Ä","\\":"Ö","]":"Å","^":"Ü","`":"é","{":"ä","|":"ö","}":"å","~":"ü"};De.R={"#":"£","@":"à","[":"°","\\":"ç","]":"§","{":"é","|":"ù","}":"è","~":"¨"};De.Q={"@":"à","[":"â","\\":"ç","]":"ê","^":"î","`":"ô","{":"é","|":"ù","}":"è","~":"û"};De.K={"@":"§","[":"Ä","\\":"Ö","]":"Ü","{":"ä","|":"ö","}":"ü","~":"ß"};De.Y={"#":"£","@":"§","[":"°","\\":"ç","]":"é","`":"ù","{":"à","|":"ò","}":"è","~":"ì"};De.E=De[6]={"@":"Ä","[":"Æ","\\":"Ø","]":"Å","^":"Ü","`":"ä","{":"æ","|":"ø","}":"å","~":"ü"};De.Z={"#":"£","@":"§","[":"¡","\\":"Ñ","]":"¿","{":"°","|":"ñ","}":"ç"};De.H=De[7]={"@":"É","[":"Ä","\\":"Ö","]":"Å","^":"Ü","`":"é","{":"ä","|":"ö","}":"å","~":"ü"};De["="]={"#":"ù","@":"à","[":"é","\\":"ç","]":"ê","^":"î",_:"è","`":"ô","{":"ä","|":"ö","}":"ü","~":"û"};var nn=4294967295,an=class{constructor(e,t,i){this._hasScrollback=e,this._optionsService=t,this._bufferService=i,this.ydisp=0,this.ybase=0,this.y=0,this.x=0,this.tabs={},this.savedY=0,this.savedX=0,this.savedCurAttrData=Se.clone(),this.savedCharset=Wt,this.markers=[],this._nullCell=Je.fromCharData([0,Tn,1,0]),this._whitespaceCell=Je.fromCharData([0,It,1,32]),this._isClearing=!1,this._memoryCleanupQueue=new sr,this._memoryCleanupPosition=0,this._cols=this._bufferService.cols,this._rows=this._bufferService.rows,this.lines=new sn(this._getCorrectBufferLength(this._rows)),this.scrollTop=0,this.scrollBottom=this._rows-1,this.setupTabStops()}getNullCell(e){return e?(this._nullCell.fg=e.fg,this._nullCell.bg=e.bg,this._nullCell.extended=e.extended):(this._nullCell.fg=0,this._nullCell.bg=0,this._nullCell.extended=new Zi),this._nullCell}getWhitespaceCell(e){return e?(this._whitespaceCell.fg=e.fg,this._whitespaceCell.bg=e.bg,this._whitespaceCell.extended=e.extended):(this._whitespaceCell.fg=0,this._whitespaceCell.bg=0,this._whitespaceCell.extended=new Zi),this._whitespaceCell}getBlankLine(e,t){return new fi(this._bufferService.cols,this.getNullCell(e),t)}get hasScrollback(){return this._hasScrollback&&this.lines.maxLength>this._rows}get isCursorInViewport(){let e=this.ybase+this.y-this.ydisp;return e>=0&&e<this._rows}_getCorrectBufferLength(e){if(!this._hasScrollback)return e;let t=e+this._optionsService.rawOptions.scrollback;return t>nn?nn:t}fillViewportRows(e){if(this.lines.length===0){e===void 0&&(e=Se);let t=this._rows;for(;t--;)this.lines.push(this.getBlankLine(e))}}clear(){this.ydisp=0,this.ybase=0,this.y=0,this.x=0,this.lines=new sn(this._getCorrectBufferLength(this._rows)),this.scrollTop=0,this.scrollBottom=this._rows-1,this.setupTabStops()}resize(e,t){let i=this.getNullCell(Se),r=0,o=this._getCorrectBufferLength(t);if(o>this.lines.maxLength&&(this.lines.maxLength=o),this.lines.length>0){if(this._cols<e)for(let n=0;n<this.lines.length;n++)r+=+this.lines.get(n).resize(e,i);let s=0;if(this._rows<t)for(let n=this._rows;n<t;n++)this.lines.length<t+this.ybase&&(this._optionsService.rawOptions.windowsMode||this._optionsService.rawOptions.windowsPty.backend!==void 0||this._optionsService.rawOptions.windowsPty.buildNumber!==void 0?this.lines.push(new fi(e,i)):this.ybase>0&&this.lines.length<=this.ybase+this.y+s+1?(this.ybase--,s++,this.ydisp>0&&this.ydisp--):this.lines.push(new fi(e,i)));else for(let n=this._rows;n>t;n--)this.lines.length>t+this.ybase&&(this.lines.length>this.ybase+this.y+1?this.lines.pop():(this.ybase++,this.ydisp++));if(o<this.lines.maxLength){let n=this.lines.length-o;n>0&&(this.lines.trimStart(n),this.ybase=Math.max(this.ybase-n,0),this.ydisp=Math.max(this.ydisp-n,0),this.savedY=Math.max(this.savedY-n,0)),this.lines.maxLength=o}this.x=Math.min(this.x,e-1),this.y=Math.min(this.y,t-1),s&&(this.y+=s),this.savedX=Math.min(this.savedX,e-1),this.scrollTop=0}if(this.scrollBottom=t-1,this._isReflowEnabled&&(this._reflow(e,t),this._cols>e))for(let s=0;s<this.lines.length;s++)r+=+this.lines.get(s).resize(e,i);this._cols=e,this._rows=t,this._memoryCleanupQueue.clear(),r>.1*this.lines.length&&(this._memoryCleanupPosition=0,this._memoryCleanupQueue.enqueue(()=>this._batchedMemoryCleanup()))}_batchedMemoryCleanup(){let e=!0;this._memoryCleanupPosition>=this.lines.length&&(this._memoryCleanupPosition=0,e=!1);let t=0;for(;this._memoryCleanupPosition<this.lines.length;)if(t+=this.lines.get(this._memoryCleanupPosition++).cleanupMemory(),t>100)return!0;return e}get _isReflowEnabled(){let e=this._optionsService.rawOptions.windowsPty;return e&&e.buildNumber?this._hasScrollback&&e.backend==="conpty"&&e.buildNumber>=21376:this._hasScrollback&&!this._optionsService.rawOptions.windowsMode}_reflow(e,t){this._cols!==e&&(e>this._cols?this._reflowLarger(e,t):this._reflowSmaller(e,t))}_reflowLarger(e,t){let i=this._optionsService.rawOptions.reflowCursorLine,r=su(this.lines,this._cols,e,this.ybase+this.y,this.getNullCell(Se),i);if(r.length>0){let o=nu(this.lines,r);au(this.lines,o.layout),this._reflowLargerAdjustViewport(e,t,o.countRemoved)}}_reflowLargerAdjustViewport(e,t,i){let r=this.getNullCell(Se),o=i;for(;o-- >0;)this.ybase===0?(this.y>0&&this.y--,this.lines.length<t&&this.lines.push(new fi(e,r))):(this.ydisp===this.ybase&&this.ydisp--,this.ybase--);this.savedY=Math.max(this.savedY-i,0)}_reflowSmaller(e,t){let i=this._optionsService.rawOptions.reflowCursorLine,r=this.getNullCell(Se),o=[],s=0;for(let n=this.lines.length-1;n>=0;n--){let a=this.lines.get(n);if(!a||!a.isWrapped&&a.getTrimmedLength()<=e)continue;let l=[a];for(;a.isWrapped&&n>0;)a=this.lines.get(--n),l.unshift(a);if(!i){let w=this.ybase+this.y;if(w>=n&&w<n+l.length)continue}let d=l[l.length-1].getTrimmedLength(),h=du(l,this._cols,e),c=h.length-l.length,u;this.ybase===0&&this.y!==this.lines.length-1?u=Math.max(0,this.y-this.lines.maxLength+c):u=Math.max(0,this.lines.length-this.lines.maxLength+c);let p=[];for(let w=0;w<c;w++){let D=this.getBlankLine(Se,!0);p.push(D)}p.length>0&&(o.push({start:n+l.length+s,newLines:p}),s+=p.length),l.push(...p);let v=h.length-1,g=h[v];g===0&&(v--,g=h[v]);let m=l.length-c-1,f=d;for(;m>=0;){let w=Math.min(f,g);if(l[v]===void 0)break;if(l[v].copyCellsFrom(l[m],f-w,g-w,w,!0),g-=w,g===0&&(v--,g=h[v]),f-=w,f===0){m--;let D=Math.max(m,0);f=ki(l,D,this._cols)}}for(let w=0;w<l.length;w++)h[w]<e&&l[w].setCell(h[w],r);let S=c-u;for(;S-- >0;)this.ybase===0?this.y<t-1?(this.y++,this.lines.pop()):(this.ybase++,this.ydisp++):this.ybase<Math.min(this.lines.maxLength,this.lines.length+s)-t&&(this.ybase===this.ydisp&&this.ydisp++,this.ybase++);this.savedY=Math.min(this.savedY+c,this.ybase+t-1)}if(o.length>0){let n=[],a=[];for(let g=0;g<this.lines.length;g++)a.push(this.lines.get(g));let l=this.lines.length,d=l-1,h=0,c=o[h];this.lines.length=Math.min(this.lines.maxLength,this.lines.length+s);let u=0;for(let g=Math.min(this.lines.maxLength-1,l+s-1);g>=0;g--)if(c&&c.start>d+u){for(let m=c.newLines.length-1;m>=0;m--)this.lines.set(g--,c.newLines[m]);g++,n.push({index:d+1,amount:c.newLines.length}),u+=c.newLines.length,c=o[++h]}else this.lines.set(g,a[d--]);let p=0;for(let g=n.length-1;g>=0;g--)n[g].index+=p,this.lines.onInsertEmitter.fire(n[g]),p+=n[g].amount;let v=Math.max(0,l+s-this.lines.maxLength);v>0&&this.lines.onTrimEmitter.fire(v)}}translateBufferLineToString(e,t,i=0,r){let o=this.lines.get(e);return o?o.translateToString(t,i,r):""}getWrappedRangeForLine(e){let t=e,i=e;for(;t>0&&this.lines.get(t).isWrapped;)t--;for(;i+1<this.lines.length&&this.lines.get(i+1).isWrapped;)i++;return{first:t,last:i}}setupTabStops(e){for(e!=null?this.tabs[e]||(e=this.prevStop(e)):(this.tabs={},e=0);e<this._cols;e+=this._optionsService.rawOptions.tabStopWidth)this.tabs[e]=!0}prevStop(e){for(e==null&&(e=this.x);!this.tabs[--e]&&e>0;);return e>=this._cols?this._cols-1:e<0?0:e}nextStop(e){for(e==null&&(e=this.x);!this.tabs[++e]&&e<this._cols;);return e>=this._cols?this._cols-1:e<0?0:e}clearMarkers(e){this._isClearing=!0;for(let t=0;t<this.markers.length;t++)this.markers[t].line===e&&(this.markers[t].dispose(),this.markers.splice(t--,1));this._isClearing=!1}clearAllMarkers(){this._isClearing=!0;for(let e=0;e<this.markers.length;e++)this.markers[e].dispose();this.markers.length=0,this._isClearing=!1}addMarker(e){let t=new lu(e);return this.markers.push(t),t.register(this.lines.onTrim(i=>{t.line-=i,t.line<0&&t.dispose()})),t.register(this.lines.onInsert(i=>{t.line>=i.index&&(t.line+=i.amount)})),t.register(this.lines.onDelete(i=>{t.line>=i.index&&t.line<i.index+i.amount&&t.dispose(),t.line>i.index&&(t.line-=i.amount)})),t.register(t.onDispose(()=>this._removeMarker(t))),t}_removeMarker(e){this._isClearing||this.markers.splice(this.markers.indexOf(e),1)}},hu=class extends te{constructor(e,t){super(),this._optionsService=e,this._bufferService=t,this._onBufferActivate=this._register(new N),this.onBufferActivate=this._onBufferActivate.event,this.reset(),this._register(this._optionsService.onSpecificOptionChange("scrollback",()=>this.resize(this._bufferService.cols,this._bufferService.rows))),this._register(this._optionsService.onSpecificOptionChange("tabStopWidth",()=>this.setupTabStops()))}reset(){this._normal=new an(!0,this._optionsService,this._bufferService),this._normal.fillViewportRows(),this._alt=new an(!1,this._optionsService,this._bufferService),this._activeBuffer=this._normal,this._onBufferActivate.fire({activeBuffer:this._normal,inactiveBuffer:this._alt}),this.setupTabStops()}get alt(){return this._alt}get active(){return this._activeBuffer}get normal(){return this._normal}activateNormalBuffer(){this._activeBuffer!==this._normal&&(this._normal.x=this._alt.x,this._normal.y=this._alt.y,this._alt.clearAllMarkers(),this._alt.clear(),this._activeBuffer=this._normal,this._onBufferActivate.fire({activeBuffer:this._normal,inactiveBuffer:this._alt}))}activateAltBuffer(e){this._activeBuffer!==this._alt&&(this._alt.fillViewportRows(e),this._alt.x=this._normal.x,this._alt.y=this._normal.y,this._activeBuffer=this._alt,this._onBufferActivate.fire({activeBuffer:this._alt,inactiveBuffer:this._normal}))}resize(e,t){this._normal.resize(e,t),this._alt.resize(e,t),this.setupTabStops(e)}setupTabStops(e){this._normal.setupTabStops(e),this._alt.setupTabStops(e)}},ya=2,xa=1,wo=class extends te{constructor(e){super(),this.isUserScrolling=!1,this._onResize=this._register(new N),this.onResize=this._onResize.event,this._onScroll=this._register(new N),this.onScroll=this._onScroll.event,this.cols=Math.max(e.rawOptions.cols||0,ya),this.rows=Math.max(e.rawOptions.rows||0,xa),this.buffers=this._register(new hu(e,this)),this._register(this.buffers.onBufferActivate(t=>{this._onScroll.fire(t.activeBuffer.ydisp)}))}get buffer(){return this.buffers.active}resize(e,t){let i=this.cols!==e,r=this.rows!==t;this.cols=e,this.rows=t,this.buffers.resize(e,t),this._onResize.fire({cols:e,rows:t,colsChanged:i,rowsChanged:r})}reset(){this.buffers.reset(),this.isUserScrolling=!1}scroll(e,t=!1){let i=this.buffer,r;r=this._cachedBlankLine,(!r||r.length!==this.cols||r.getFg(0)!==e.fg||r.getBg(0)!==e.bg)&&(r=i.getBlankLine(e,t),this._cachedBlankLine=r),r.isWrapped=t;let o=i.ybase+i.scrollTop,s=i.ybase+i.scrollBottom;if(i.scrollTop===0){let n=i.lines.isFull;s===i.lines.length-1?n?i.lines.recycle().copyFrom(r):i.lines.push(r.clone()):i.lines.splice(s+1,0,r.clone()),n?this.isUserScrolling&&(i.ydisp=Math.max(i.ydisp-1,0)):(i.ybase++,this.isUserScrolling||i.ydisp++)}else{let n=s-o+1;i.lines.shiftElements(o+1,n-1,-1),i.lines.set(s,r.clone())}this.isUserScrolling||(i.ydisp=i.ybase),this._onScroll.fire(i.ydisp)}scrollLines(e,t){let i=this.buffer;if(e<0){if(i.ydisp===0)return;this.isUserScrolling=!0}else e+i.ydisp>=i.ybase&&(this.isUserScrolling=!1);let r=i.ydisp;i.ydisp=Math.max(Math.min(i.ydisp+e,i.ybase),0),r!==i.ydisp&&(t||this._onScroll.fire(i.ydisp))}};wo=fe([F(0,Be)],wo);var jt={cols:80,rows:24,cursorBlink:!1,cursorStyle:"block",cursorWidth:1,cursorInactiveStyle:"outline",customGlyphs:!0,drawBoldTextInBrightColors:!0,documentOverride:null,fastScrollModifier:"alt",fastScrollSensitivity:5,fontFamily:"monospace",fontSize:15,fontWeight:"normal",fontWeightBold:"bold",ignoreBracketedPasteMode:!1,lineHeight:1,letterSpacing:0,linkHandler:null,logLevel:"info",logger:null,scrollback:1e3,scrollOnEraseInDisplay:!1,scrollOnUserInput:!0,scrollSensitivity:1,screenReaderMode:!1,smoothScrollDuration:0,macOptionIsMeta:!1,macOptionClickForcesSelection:!1,minimumContrastRatio:1,disableStdin:!1,allowProposedApi:!1,allowTransparency:!1,tabStopWidth:8,theme:{},reflowCursorLine:!1,rescaleOverlappingGlyphs:!1,rightClickSelectsWord:or,windowOptions:{},windowsMode:!1,windowsPty:{},wordSeparator:" ()[]{}',\"`",altClickMovesCursor:!0,convertEol:!1,termName:"xterm",cancelEvents:!1,overviewRuler:{}},cu=["normal","bold","100","200","300","400","500","600","700","800","900"],uu=class extends te{constructor(e){super(),this._onOptionChange=this._register(new N),this.onOptionChange=this._onOptionChange.event;let t={...jt};for(let i in e)if(i in t)try{let r=e[i];t[i]=this._sanitizeAndValidateOption(i,r)}catch(r){console.error(r)}this.rawOptions=t,this.options={...t},this._setupOptions(),this._register(ue(()=>{this.rawOptions.linkHandler=null,this.rawOptions.documentOverride=null}))}onSpecificOptionChange(e,t){return this.onOptionChange(i=>{i===e&&t(this.rawOptions[e])})}onMultipleOptionChange(e,t){return this.onOptionChange(i=>{e.indexOf(i)!==-1&&t()})}_setupOptions(){let e=i=>{if(!(i in jt))throw new Error(`No option with key "${i}"`);return this.rawOptions[i]},t=(i,r)=>{if(!(i in jt))throw new Error(`No option with key "${i}"`);r=this._sanitizeAndValidateOption(i,r),this.rawOptions[i]!==r&&(this.rawOptions[i]=r,this._onOptionChange.fire(i))};for(let i in this.rawOptions){let r={get:e.bind(this,i),set:t.bind(this,i)};Object.defineProperty(this.options,i,r)}}_sanitizeAndValidateOption(e,t){switch(e){case"cursorStyle":if(t||(t=jt[e]),!pu(t))throw new Error(`"${t}" is not a valid value for ${e}`);break;case"wordSeparator":t||(t=jt[e]);break;case"fontWeight":case"fontWeightBold":if(typeof t=="number"&&1<=t&&t<=1e3)break;t=cu.includes(t)?t:jt[e];break;case"cursorWidth":t=Math.floor(t);case"lineHeight":case"tabStopWidth":if(t<1)throw new Error(`${e} cannot be less than 1, value: ${t}`);break;case"minimumContrastRatio":t=Math.max(1,Math.min(21,Math.round(t*10)/10));break;case"scrollback":if(t=Math.min(t,4294967295),t<0)throw new Error(`${e} cannot be less than 0, value: ${t}`);break;case"fastScrollSensitivity":case"scrollSensitivity":if(t<=0)throw new Error(`${e} cannot be less than or equal to 0, value: ${t}`);break;case"rows":case"cols":if(!t&&t!==0)throw new Error(`${e} must be numeric, value: ${t}`);break;case"windowsPty":t=t??{};break}return t}};function pu(e){return e==="block"||e==="underline"||e==="bar"}function _i(e,t=5){if(typeof e!="object")return e;let i=Array.isArray(e)?[]:{};for(let r in e)i[r]=t<=1?e[r]:e[r]&&_i(e[r],t-1);return i}var dn=Object.freeze({insertMode:!1}),ln=Object.freeze({applicationCursorKeys:!1,applicationKeypad:!1,bracketedPasteMode:!1,cursorBlink:void 0,cursorStyle:void 0,origin:!1,reverseWraparound:!1,sendFocus:!1,synchronizedOutput:!1,wraparound:!0}),So=class extends te{constructor(e,t,i){super(),this._bufferService=e,this._logService=t,this._optionsService=i,this.isCursorInitialized=!1,this.isCursorHidden=!1,this._onData=this._register(new N),this.onData=this._onData.event,this._onUserInput=this._register(new N),this.onUserInput=this._onUserInput.event,this._onBinary=this._register(new N),this.onBinary=this._onBinary.event,this._onRequestScrollToBottom=this._register(new N),this.onRequestScrollToBottom=this._onRequestScrollToBottom.event,this.modes=_i(dn),this.decPrivateModes=_i(ln)}reset(){this.modes=_i(dn),this.decPrivateModes=_i(ln)}triggerDataEvent(e,t=!1){if(this._optionsService.rawOptions.disableStdin)return;let i=this._bufferService.buffer;t&&this._optionsService.rawOptions.scrollOnUserInput&&i.ybase!==i.ydisp&&this._onRequestScrollToBottom.fire(),t&&this._onUserInput.fire(),this._logService.debug(`sending data "${e}"`),this._logService.trace("sending data (codes)",()=>e.split("").map(r=>r.charCodeAt(0))),this._onData.fire(e)}triggerBinaryEvent(e){this._optionsService.rawOptions.disableStdin||(this._logService.debug(`sending binary "${e}"`),this._logService.trace("sending binary (codes)",()=>e.split("").map(t=>t.charCodeAt(0))),this._onBinary.fire(e))}};So=fe([F(0,Ne),F(1,Mn),F(2,Be)],So);var hn={NONE:{events:0,restrict:()=>!1},X10:{events:1,restrict:e=>e.button===4||e.action!==1?!1:(e.ctrl=!1,e.alt=!1,e.shift=!1,!0)},VT200:{events:19,restrict:e=>e.action!==32},DRAG:{events:23,restrict:e=>!(e.action===32&&e.button===3)},ANY:{events:31,restrict:e=>!0}};function Rr(e,t){let i=(e.ctrl?16:0)|(e.shift?4:0)|(e.alt?8:0);return e.button===4?(i|=64,i|=e.action):(i|=e.button&3,e.button&4&&(i|=64),e.button&8&&(i|=128),e.action===32?i|=32:e.action===0&&!t&&(i|=3)),i}var Nr=String.fromCharCode,cn={DEFAULT:e=>{let t=[Rr(e,!1)+32,e.col+32,e.row+32];return t[0]>255||t[1]>255||t[2]>255?"":`\x1B[M${Nr(t[0])}${Nr(t[1])}${Nr(t[2])}`},SGR:e=>{let t=e.action===0&&e.button!==4?"m":"M";return`\x1B[<${Rr(e,!0)};${e.col};${e.row}${t}`},SGR_PIXELS:e=>{let t=e.action===0&&e.button!==4?"m":"M";return`\x1B[<${Rr(e,!0)};${e.x};${e.y}${t}`}},yo=class extends te{constructor(e,t,i){super(),this._bufferService=e,this._coreService=t,this._optionsService=i,this._protocols={},this._encodings={},this._activeProtocol="",this._activeEncoding="",this._lastEvent=null,this._wheelPartialScroll=0,this._onProtocolChange=this._register(new N),this.onProtocolChange=this._onProtocolChange.event;for(let r of Object.keys(hn))this.addProtocol(r,hn[r]);for(let r of Object.keys(cn))this.addEncoding(r,cn[r]);this.reset()}addProtocol(e,t){this._protocols[e]=t}addEncoding(e,t){this._encodings[e]=t}get activeProtocol(){return this._activeProtocol}get areMouseEventsActive(){return this._protocols[this._activeProtocol].events!==0}set activeProtocol(e){if(!this._protocols[e])throw new Error(`unknown protocol "${e}"`);this._activeProtocol=e,this._onProtocolChange.fire(this._protocols[e].events)}get activeEncoding(){return this._activeEncoding}set activeEncoding(e){if(!this._encodings[e])throw new Error(`unknown encoding "${e}"`);this._activeEncoding=e}reset(){this.activeProtocol="NONE",this.activeEncoding="DEFAULT",this._lastEvent=null,this._wheelPartialScroll=0}consumeWheelEvent(e,t,i){if(e.deltaY===0||e.shiftKey||t===void 0||i===void 0)return 0;let r=t/i,o=this._applyScrollModifier(e.deltaY,e);return e.deltaMode===WheelEvent.DOM_DELTA_PIXEL?(o/=r+0,Math.abs(e.deltaY)<50&&(o*=.3),this._wheelPartialScroll+=o,o=Math.floor(Math.abs(this._wheelPartialScroll))*(this._wheelPartialScroll>0?1:-1),this._wheelPartialScroll%=1):e.deltaMode===WheelEvent.DOM_DELTA_PAGE&&(o*=this._bufferService.rows),o}_applyScrollModifier(e,t){return t.altKey||t.ctrlKey||t.shiftKey?e*this._optionsService.rawOptions.fastScrollSensitivity*this._optionsService.rawOptions.scrollSensitivity:e*this._optionsService.rawOptions.scrollSensitivity}triggerMouseEvent(e){if(e.col<0||e.col>=this._bufferService.cols||e.row<0||e.row>=this._bufferService.rows||e.button===4&&e.action===32||e.button===3&&e.action!==32||e.button!==4&&(e.action===2||e.action===3)||(e.col++,e.row++,e.action===32&&this._lastEvent&&this._equalEvents(this._lastEvent,e,this._activeEncoding==="SGR_PIXELS"))||!this._protocols[this._activeProtocol].restrict(e))return!1;let t=this._encodings[this._activeEncoding](e);return t&&(this._activeEncoding==="DEFAULT"?this._coreService.triggerBinaryEvent(t):this._coreService.triggerDataEvent(t,!0)),this._lastEvent=e,!0}explainEvents(e){return{down:!!(e&1),up:!!(e&2),drag:!!(e&4),move:!!(e&8),wheel:!!(e&16)}}_equalEvents(e,t,i){if(i){if(e.x!==t.x||e.y!==t.y)return!1}else if(e.col!==t.col||e.row!==t.row)return!1;return!(e.button!==t.button||e.action!==t.action||e.ctrl!==t.ctrl||e.alt!==t.alt||e.shift!==t.shift)}};yo=fe([F(0,Ne),F(1,qt),F(2,Be)],yo);var Br=[[768,879],[1155,1158],[1160,1161],[1425,1469],[1471,1471],[1473,1474],[1476,1477],[1479,1479],[1536,1539],[1552,1557],[1611,1630],[1648,1648],[1750,1764],[1767,1768],[1770,1773],[1807,1807],[1809,1809],[1840,1866],[1958,1968],[2027,2035],[2305,2306],[2364,2364],[2369,2376],[2381,2381],[2385,2388],[2402,2403],[2433,2433],[2492,2492],[2497,2500],[2509,2509],[2530,2531],[2561,2562],[2620,2620],[2625,2626],[2631,2632],[2635,2637],[2672,2673],[2689,2690],[2748,2748],[2753,2757],[2759,2760],[2765,2765],[2786,2787],[2817,2817],[2876,2876],[2879,2879],[2881,2883],[2893,2893],[2902,2902],[2946,2946],[3008,3008],[3021,3021],[3134,3136],[3142,3144],[3146,3149],[3157,3158],[3260,3260],[3263,3263],[3270,3270],[3276,3277],[3298,3299],[3393,3395],[3405,3405],[3530,3530],[3538,3540],[3542,3542],[3633,3633],[3636,3642],[3655,3662],[3761,3761],[3764,3769],[3771,3772],[3784,3789],[3864,3865],[3893,3893],[3895,3895],[3897,3897],[3953,3966],[3968,3972],[3974,3975],[3984,3991],[3993,4028],[4038,4038],[4141,4144],[4146,4146],[4150,4151],[4153,4153],[4184,4185],[4448,4607],[4959,4959],[5906,5908],[5938,5940],[5970,5971],[6002,6003],[6068,6069],[6071,6077],[6086,6086],[6089,6099],[6109,6109],[6155,6157],[6313,6313],[6432,6434],[6439,6440],[6450,6450],[6457,6459],[6679,6680],[6912,6915],[6964,6964],[6966,6970],[6972,6972],[6978,6978],[7019,7027],[7616,7626],[7678,7679],[8203,8207],[8234,8238],[8288,8291],[8298,8303],[8400,8431],[12330,12335],[12441,12442],[43014,43014],[43019,43019],[43045,43046],[64286,64286],[65024,65039],[65056,65059],[65279,65279],[65529,65531]],vu=[[68097,68099],[68101,68102],[68108,68111],[68152,68154],[68159,68159],[119143,119145],[119155,119170],[119173,119179],[119210,119213],[119362,119364],[917505,917505],[917536,917631],[917760,917999]],ke;function gu(e,t){let i=0,r=t.length-1,o;if(e<t[0][0]||e>t[r][1])return!1;for(;r>=i;)if(o=i+r>>1,e>t[o][1])i=o+1;else if(e<t[o][0])r=o-1;else return!0;return!1}var mu=class{constructor(){if(this.version="6",!ke){ke=new Uint8Array(65536),ke.fill(1),ke[0]=0,ke.fill(0,1,32),ke.fill(0,127,160),ke.fill(2,4352,4448),ke[9001]=2,ke[9002]=2,ke.fill(2,11904,42192),ke[12351]=1,ke.fill(2,44032,55204),ke.fill(2,63744,64256),ke.fill(2,65040,65050),ke.fill(2,65072,65136),ke.fill(2,65280,65377),ke.fill(2,65504,65511);for(let e=0;e<Br.length;++e)ke.fill(0,Br[e][0],Br[e][1]+1)}}wcwidth(e){return e<32?0:e<127?1:e<65536?ke[e]:gu(e,vu)?0:e>=131072&&e<=196605||e>=196608&&e<=262141?2:1}charProperties(e,t){let i=this.wcwidth(e),r=i===0&&t!==0;if(r){let o=Ht.extractWidth(t);o===0?r=!1:o>i&&(i=o)}return Ht.createPropertyValue(0,i,r)}},Ht=class Ji{constructor(){this._providers=Object.create(null),this._active="",this._onChange=new N,this.onChange=this._onChange.event;let t=new mu;this.register(t),this._active=t.version,this._activeProvider=t}static extractShouldJoin(t){return(t&1)!==0}static extractWidth(t){return t>>1&3}static extractCharKind(t){return t>>3}static createPropertyValue(t,i,r=!1){return(t&16777215)<<3|(i&3)<<1|(r?1:0)}dispose(){this._onChange.dispose()}get versions(){return Object.keys(this._providers)}get activeVersion(){return this._active}set activeVersion(t){if(!this._providers[t])throw new Error(`unknown Unicode version "${t}"`);this._active=t,this._activeProvider=this._providers[t],this._onChange.fire(t)}register(t){this._providers[t.version]=t}wcwidth(t){return this._activeProvider.wcwidth(t)}getStringCellWidth(t){let i=0,r=0,o=t.length;for(let s=0;s<o;++s){let n=t.charCodeAt(s);if(55296<=n&&n<=56319){if(++s>=o)return i+this.wcwidth(n);let d=t.charCodeAt(s);56320<=d&&d<=57343?n=(n-55296)*1024+d-56320+65536:i+=this.wcwidth(d)}let a=this.charProperties(n,r),l=Ji.extractWidth(a);Ji.extractShouldJoin(a)&&(l-=Ji.extractWidth(r)),i+=l,r=a}return i}charProperties(t,i){return this._activeProvider.charProperties(t,i)}},fu=class{constructor(){this.glevel=0,this._charsets=[]}reset(){this.charset=void 0,this._charsets=[],this.glevel=0}setgLevel(e){this.glevel=e,this.charset=this._charsets[e]}setgCharset(e,t){this._charsets[e]=t,this.glevel===e&&(this.charset=t)}};function un(e){let t=e.buffer.lines.get(e.buffer.ybase+e.buffer.y-1)?.get(e.cols-1),i=e.buffer.lines.get(e.buffer.ybase+e.buffer.y);i&&t&&(i.isWrapped=t[3]!==0&&t[3]!==32)}var ci=2147483647,_u=256,Ca=class xo{constructor(t=32,i=32){if(this.maxLength=t,this.maxSubParamsLength=i,i>_u)throw new Error("maxSubParamsLength must not be greater than 256");this.params=new Int32Array(t),this.length=0,this._subParams=new Int32Array(i),this._subParamsLength=0,this._subParamsIdx=new Uint16Array(t),this._rejectDigits=!1,this._rejectSubDigits=!1,this._digitIsSub=!1}static fromArray(t){let i=new xo;if(!t.length)return i;for(let r=Array.isArray(t[0])?1:0;r<t.length;++r){let o=t[r];if(Array.isArray(o))for(let s=0;s<o.length;++s)i.addSubParam(o[s]);else i.addParam(o)}return i}clone(){let t=new xo(this.maxLength,this.maxSubParamsLength);return t.params.set(this.params),t.length=this.length,t._subParams.set(this._subParams),t._subParamsLength=this._subParamsLength,t._subParamsIdx.set(this._subParamsIdx),t._rejectDigits=this._rejectDigits,t._rejectSubDigits=this._rejectSubDigits,t._digitIsSub=this._digitIsSub,t}toArray(){let t=[];for(let i=0;i<this.length;++i){t.push(this.params[i]);let r=this._subParamsIdx[i]>>8,o=this._subParamsIdx[i]&255;o-r>0&&t.push(Array.prototype.slice.call(this._subParams,r,o))}return t}reset(){this.length=0,this._subParamsLength=0,this._rejectDigits=!1,this._rejectSubDigits=!1,this._digitIsSub=!1}addParam(t){if(this._digitIsSub=!1,this.length>=this.maxLength){this._rejectDigits=!0;return}if(t<-1)throw new Error("values lesser than -1 are not allowed");this._subParamsIdx[this.length]=this._subParamsLength<<8|this._subParamsLength,this.params[this.length++]=t>ci?ci:t}addSubParam(t){if(this._digitIsSub=!0,!!this.length){if(this._rejectDigits||this._subParamsLength>=this.maxSubParamsLength){this._rejectSubDigits=!0;return}if(t<-1)throw new Error("values lesser than -1 are not allowed");this._subParams[this._subParamsLength++]=t>ci?ci:t,this._subParamsIdx[this.length-1]++}}hasSubParams(t){return(this._subParamsIdx[t]&255)-(this._subParamsIdx[t]>>8)>0}getSubParams(t){let i=this._subParamsIdx[t]>>8,r=this._subParamsIdx[t]&255;return r-i>0?this._subParams.subarray(i,r):null}getSubParamsAll(){let t={};for(let i=0;i<this.length;++i){let r=this._subParamsIdx[i]>>8,o=this._subParamsIdx[i]&255;o-r>0&&(t[i]=this._subParams.slice(r,o))}return t}addDigit(t){let i;if(this._rejectDigits||!(i=this._digitIsSub?this._subParamsLength:this.length)||this._digitIsSub&&this._rejectSubDigits)return;let r=this._digitIsSub?this._subParams:this.params,o=r[i-1];r[i-1]=~o?Math.min(o*10+t,ci):t}},ui=[],bu=class{constructor(){this._state=0,this._active=ui,this._id=-1,this._handlers=Object.create(null),this._handlerFb=()=>{},this._stack={paused:!1,loopPosition:0,fallThrough:!1}}registerHandler(e,t){this._handlers[e]===void 0&&(this._handlers[e]=[]);let i=this._handlers[e];return i.push(t),{dispose:()=>{let r=i.indexOf(t);r!==-1&&i.splice(r,1)}}}clearHandler(e){this._handlers[e]&&delete this._handlers[e]}setHandlerFallback(e){this._handlerFb=e}dispose(){this._handlers=Object.create(null),this._handlerFb=()=>{},this._active=ui}reset(){if(this._state===2)for(let e=this._stack.paused?this._stack.loopPosition-1:this._active.length-1;e>=0;--e)this._active[e].end(!1);this._stack.paused=!1,this._active=ui,this._id=-1,this._state=0}_start(){if(this._active=this._handlers[this._id]||ui,!this._active.length)this._handlerFb(this._id,"START");else for(let e=this._active.length-1;e>=0;e--)this._active[e].start()}_put(e,t,i){if(!this._active.length)this._handlerFb(this._id,"PUT",ar(e,t,i));else for(let r=this._active.length-1;r>=0;r--)this._active[r].put(e,t,i)}start(){this.reset(),this._state=1}put(e,t,i){if(this._state!==3){if(this._state===1)for(;t<i;){let r=e[t++];if(r===59){this._state=2,this._start();break}if(r<48||57<r){this._state=3;return}this._id===-1&&(this._id=0),this._id=this._id*10+r-48}this._state===2&&i-t>0&&this._put(e,t,i)}}end(e,t=!0){if(this._state!==0){if(this._state!==3)if(this._state===1&&this._start(),!this._active.length)this._handlerFb(this._id,"END",e);else{let i=!1,r=this._active.length-1,o=!1;if(this._stack.paused&&(r=this._stack.loopPosition-1,i=t,o=this._stack.fallThrough,this._stack.paused=!1),!o&&i===!1){for(;r>=0&&(i=this._active[r].end(e),i!==!0);r--)if(i instanceof Promise)return this._stack.paused=!0,this._stack.loopPosition=r,this._stack.fallThrough=!1,i;r--}for(;r>=0;r--)if(i=this._active[r].end(!1),i instanceof Promise)return this._stack.paused=!0,this._stack.loopPosition=r,this._stack.fallThrough=!0,i}this._active=ui,this._id=-1,this._state=0}}},$e=class{constructor(e){this._handler=e,this._data="",this._hitLimit=!1}start(){this._data="",this._hitLimit=!1}put(e,t,i){this._hitLimit||(this._data+=ar(e,t,i),this._data.length>1e7&&(this._data="",this._hitLimit=!0))}end(e){let t=!1;if(this._hitLimit)t=!1;else if(e&&(t=this._handler(this._data),t instanceof Promise))return t.then(i=>(this._data="",this._hitLimit=!1,i));return this._data="",this._hitLimit=!1,t}},pi=[],wu=class{constructor(){this._handlers=Object.create(null),this._active=pi,this._ident=0,this._handlerFb=()=>{},this._stack={paused:!1,loopPosition:0,fallThrough:!1}}dispose(){this._handlers=Object.create(null),this._handlerFb=()=>{},this._active=pi}registerHandler(e,t){this._handlers[e]===void 0&&(this._handlers[e]=[]);let i=this._handlers[e];return i.push(t),{dispose:()=>{let r=i.indexOf(t);r!==-1&&i.splice(r,1)}}}clearHandler(e){this._handlers[e]&&delete this._handlers[e]}setHandlerFallback(e){this._handlerFb=e}reset(){if(this._active.length)for(let e=this._stack.paused?this._stack.loopPosition-1:this._active.length-1;e>=0;--e)this._active[e].unhook(!1);this._stack.paused=!1,this._active=pi,this._ident=0}hook(e,t){if(this.reset(),this._ident=e,this._active=this._handlers[e]||pi,!this._active.length)this._handlerFb(this._ident,"HOOK",t);else for(let i=this._active.length-1;i>=0;i--)this._active[i].hook(t)}put(e,t,i){if(!this._active.length)this._handlerFb(this._ident,"PUT",ar(e,t,i));else for(let r=this._active.length-1;r>=0;r--)this._active[r].put(e,t,i)}unhook(e,t=!0){if(!this._active.length)this._handlerFb(this._ident,"UNHOOK",e);else{let i=!1,r=this._active.length-1,o=!1;if(this._stack.paused&&(r=this._stack.loopPosition-1,i=t,o=this._stack.fallThrough,this._stack.paused=!1),!o&&i===!1){for(;r>=0&&(i=this._active[r].unhook(e),i!==!0);r--)if(i instanceof Promise)return this._stack.paused=!0,this._stack.loopPosition=r,this._stack.fallThrough=!1,i;r--}for(;r>=0;r--)if(i=this._active[r].unhook(!1),i instanceof Promise)return this._stack.paused=!0,this._stack.loopPosition=r,this._stack.fallThrough=!0,i}this._active=pi,this._ident=0}},bi=new Ca;bi.addParam(0);var pn=class{constructor(e){this._handler=e,this._data="",this._params=bi,this._hitLimit=!1}hook(e){this._params=e.length>1||e.params[0]?e.clone():bi,this._data="",this._hitLimit=!1}put(e,t,i){this._hitLimit||(this._data+=ar(e,t,i),this._data.length>1e7&&(this._data="",this._hitLimit=!0))}unhook(e){let t=!1;if(this._hitLimit)t=!1;else if(e&&(t=this._handler(this._data,this._params),t instanceof Promise))return t.then(i=>(this._params=bi,this._data="",this._hitLimit=!1,i));return this._params=bi,this._data="",this._hitLimit=!1,t}},Su=class{constructor(e){this.table=new Uint8Array(e)}setDefault(e,t){this.table.fill(e<<4|t)}add(e,t,i,r){this.table[t<<8|e]=i<<4|r}addMany(e,t,i,r){for(let o=0;o<e.length;o++)this.table[t<<8|e[o]]=i<<4|r}},je=160,yu=(function(){let e=new Su(4095),t=Array.apply(null,Array(256)).map((a,l)=>l),i=(a,l)=>t.slice(a,l),r=i(32,127),o=i(0,24);o.push(25),o.push.apply(o,i(28,32));let s=i(0,14),n;e.setDefault(1,0),e.addMany(r,0,2,0);for(n in s)e.addMany([24,26,153,154],n,3,0),e.addMany(i(128,144),n,3,0),e.addMany(i(144,152),n,3,0),e.add(156,n,0,0),e.add(27,n,11,1),e.add(157,n,4,8),e.addMany([152,158,159],n,0,7),e.add(155,n,11,3),e.add(144,n,11,9);return e.addMany(o,0,3,0),e.addMany(o,1,3,1),e.add(127,1,0,1),e.addMany(o,8,0,8),e.addMany(o,3,3,3),e.add(127,3,0,3),e.addMany(o,4,3,4),e.add(127,4,0,4),e.addMany(o,6,3,6),e.addMany(o,5,3,5),e.add(127,5,0,5),e.addMany(o,2,3,2),e.add(127,2,0,2),e.add(93,1,4,8),e.addMany(r,8,5,8),e.add(127,8,5,8),e.addMany([156,27,24,26,7],8,6,0),e.addMany(i(28,32),8,0,8),e.addMany([88,94,95],1,0,7),e.addMany(r,7,0,7),e.addMany(o,7,0,7),e.add(156,7,0,0),e.add(127,7,0,7),e.add(91,1,11,3),e.addMany(i(64,127),3,7,0),e.addMany(i(48,60),3,8,4),e.addMany([60,61,62,63],3,9,4),e.addMany(i(48,60),4,8,4),e.addMany(i(64,127),4,7,0),e.addMany([60,61,62,63],4,0,6),e.addMany(i(32,64),6,0,6),e.add(127,6,0,6),e.addMany(i(64,127),6,0,0),e.addMany(i(32,48),3,9,5),e.addMany(i(32,48),5,9,5),e.addMany(i(48,64),5,0,6),e.addMany(i(64,127),5,7,0),e.addMany(i(32,48),4,9,5),e.addMany(i(32,48),1,9,2),e.addMany(i(32,48),2,9,2),e.addMany(i(48,127),2,10,0),e.addMany(i(48,80),1,10,0),e.addMany(i(81,88),1,10,0),e.addMany([89,90,92],1,10,0),e.addMany(i(96,127),1,10,0),e.add(80,1,11,9),e.addMany(o,9,0,9),e.add(127,9,0,9),e.addMany(i(28,32),9,0,9),e.addMany(i(32,48),9,9,12),e.addMany(i(48,60),9,8,10),e.addMany([60,61,62,63],9,9,10),e.addMany(o,11,0,11),e.addMany(i(32,128),11,0,11),e.addMany(i(28,32),11,0,11),e.addMany(o,10,0,10),e.add(127,10,0,10),e.addMany(i(28,32),10,0,10),e.addMany(i(48,60),10,8,10),e.addMany([60,61,62,63],10,0,11),e.addMany(i(32,48),10,9,12),e.addMany(o,12,0,12),e.add(127,12,0,12),e.addMany(i(28,32),12,0,12),e.addMany(i(32,48),12,9,12),e.addMany(i(48,64),12,0,11),e.addMany(i(64,127),12,12,13),e.addMany(i(64,127),10,12,13),e.addMany(i(64,127),9,12,13),e.addMany(o,13,13,13),e.addMany(r,13,13,13),e.add(127,13,0,13),e.addMany([27,156,24,26],13,14,0),e.add(je,0,2,0),e.add(je,8,5,8),e.add(je,6,0,6),e.add(je,11,0,11),e.add(je,13,13,13),e})(),xu=class extends te{constructor(e=yu){super(),this._transitions=e,this._parseStack={state:0,handlers:[],handlerPos:0,transition:0,chunkPos:0},this.initialState=0,this.currentState=this.initialState,this._params=new Ca,this._params.addParam(0),this._collect=0,this.precedingJoinState=0,this._printHandlerFb=(t,i,r)=>{},this._executeHandlerFb=t=>{},this._csiHandlerFb=(t,i)=>{},this._escHandlerFb=t=>{},this._errorHandlerFb=t=>t,this._printHandler=this._printHandlerFb,this._executeHandlers=Object.create(null),this._csiHandlers=Object.create(null),this._escHandlers=Object.create(null),this._register(ue(()=>{this._csiHandlers=Object.create(null),this._executeHandlers=Object.create(null),this._escHandlers=Object.create(null)})),this._oscParser=this._register(new bu),this._dcsParser=this._register(new wu),this._errorHandler=this._errorHandlerFb,this.registerEscHandler({final:"\\"},()=>!0)}_identifier(e,t=[64,126]){let i=0;if(e.prefix){if(e.prefix.length>1)throw new Error("only one byte as prefix supported");if(i=e.prefix.charCodeAt(0),i&&60>i||i>63)throw new Error("prefix must be in range 0x3c .. 0x3f")}if(e.intermediates){if(e.intermediates.length>2)throw new Error("only two bytes as intermediates are supported");for(let o=0;o<e.intermediates.length;++o){let s=e.intermediates.charCodeAt(o);if(32>s||s>47)throw new Error("intermediate must be in range 0x20 .. 0x2f");i<<=8,i|=s}}if(e.final.length!==1)throw new Error("final must be a single byte");let r=e.final.charCodeAt(0);if(t[0]>r||r>t[1])throw new Error(`final must be in range ${t[0]} .. ${t[1]}`);return i<<=8,i|=r,i}identToString(e){let t=[];for(;e;)t.push(String.fromCharCode(e&255)),e>>=8;return t.reverse().join("")}setPrintHandler(e){this._printHandler=e}clearPrintHandler(){this._printHandler=this._printHandlerFb}registerEscHandler(e,t){let i=this._identifier(e,[48,126]);this._escHandlers[i]===void 0&&(this._escHandlers[i]=[]);let r=this._escHandlers[i];return r.push(t),{dispose:()=>{let o=r.indexOf(t);o!==-1&&r.splice(o,1)}}}clearEscHandler(e){this._escHandlers[this._identifier(e,[48,126])]&&delete this._escHandlers[this._identifier(e,[48,126])]}setEscHandlerFallback(e){this._escHandlerFb=e}setExecuteHandler(e,t){this._executeHandlers[e.charCodeAt(0)]=t}clearExecuteHandler(e){this._executeHandlers[e.charCodeAt(0)]&&delete this._executeHandlers[e.charCodeAt(0)]}setExecuteHandlerFallback(e){this._executeHandlerFb=e}registerCsiHandler(e,t){let i=this._identifier(e);this._csiHandlers[i]===void 0&&(this._csiHandlers[i]=[]);let r=this._csiHandlers[i];return r.push(t),{dispose:()=>{let o=r.indexOf(t);o!==-1&&r.splice(o,1)}}}clearCsiHandler(e){this._csiHandlers[this._identifier(e)]&&delete this._csiHandlers[this._identifier(e)]}setCsiHandlerFallback(e){this._csiHandlerFb=e}registerDcsHandler(e,t){return this._dcsParser.registerHandler(this._identifier(e),t)}clearDcsHandler(e){this._dcsParser.clearHandler(this._identifier(e))}setDcsHandlerFallback(e){this._dcsParser.setHandlerFallback(e)}registerOscHandler(e,t){return this._oscParser.registerHandler(e,t)}clearOscHandler(e){this._oscParser.clearHandler(e)}setOscHandlerFallback(e){this._oscParser.setHandlerFallback(e)}setErrorHandler(e){this._errorHandler=e}clearErrorHandler(){this._errorHandler=this._errorHandlerFb}reset(){this.currentState=this.initialState,this._oscParser.reset(),this._dcsParser.reset(),this._params.reset(),this._params.addParam(0),this._collect=0,this.precedingJoinState=0,this._parseStack.state!==0&&(this._parseStack.state=2,this._parseStack.handlers=[])}_preserveStack(e,t,i,r,o){this._parseStack.state=e,this._parseStack.handlers=t,this._parseStack.handlerPos=i,this._parseStack.transition=r,this._parseStack.chunkPos=o}parse(e,t,i){let r=0,o=0,s=0,n;if(this._parseStack.state)if(this._parseStack.state===2)this._parseStack.state=0,s=this._parseStack.chunkPos+1;else{if(i===void 0||this._parseStack.state===1)throw this._parseStack.state=1,new Error("improper continuation due to previous async handler, giving up parsing");let a=this._parseStack.handlers,l=this._parseStack.handlerPos-1;switch(this._parseStack.state){case 3:if(i===!1&&l>-1){for(;l>=0&&(n=a[l](this._params),n!==!0);l--)if(n instanceof Promise)return this._parseStack.handlerPos=l,n}this._parseStack.handlers=[];break;case 4:if(i===!1&&l>-1){for(;l>=0&&(n=a[l](),n!==!0);l--)if(n instanceof Promise)return this._parseStack.handlerPos=l,n}this._parseStack.handlers=[];break;case 6:if(r=e[this._parseStack.chunkPos],n=this._dcsParser.unhook(r!==24&&r!==26,i),n)return n;r===27&&(this._parseStack.transition|=1),this._params.reset(),this._params.addParam(0),this._collect=0;break;case 5:if(r=e[this._parseStack.chunkPos],n=this._oscParser.end(r!==24&&r!==26,i),n)return n;r===27&&(this._parseStack.transition|=1),this._params.reset(),this._params.addParam(0),this._collect=0;break}this._parseStack.state=0,s=this._parseStack.chunkPos+1,this.precedingJoinState=0,this.currentState=this._parseStack.transition&15}for(let a=s;a<t;++a){switch(r=e[a],o=this._transitions.table[this.currentState<<8|(r<160?r:je)],o>>4){case 2:for(let u=a+1;;++u){if(u>=t||(r=e[u])<32||r>126&&r<je){this._printHandler(e,a,u),a=u-1;break}if(++u>=t||(r=e[u])<32||r>126&&r<je){this._printHandler(e,a,u),a=u-1;break}if(++u>=t||(r=e[u])<32||r>126&&r<je){this._printHandler(e,a,u),a=u-1;break}if(++u>=t||(r=e[u])<32||r>126&&r<je){this._printHandler(e,a,u),a=u-1;break}}break;case 3:this._executeHandlers[r]?this._executeHandlers[r]():this._executeHandlerFb(r),this.precedingJoinState=0;break;case 0:break;case 1:if(this._errorHandler({position:a,code:r,currentState:this.currentState,collect:this._collect,params:this._params,abort:!1}).abort)return;break;case 7:let l=this._csiHandlers[this._collect<<8|r],d=l?l.length-1:-1;for(;d>=0&&(n=l[d](this._params),n!==!0);d--)if(n instanceof Promise)return this._preserveStack(3,l,d,o,a),n;d<0&&this._csiHandlerFb(this._collect<<8|r,this._params),this.precedingJoinState=0;break;case 8:do switch(r){case 59:this._params.addParam(0);break;case 58:this._params.addSubParam(-1);break;default:this._params.addDigit(r-48)}while(++a<t&&(r=e[a])>47&&r<60);a--;break;case 9:this._collect<<=8,this._collect|=r;break;case 10:let h=this._escHandlers[this._collect<<8|r],c=h?h.length-1:-1;for(;c>=0&&(n=h[c](),n!==!0);c--)if(n instanceof Promise)return this._preserveStack(4,h,c,o,a),n;c<0&&this._escHandlerFb(this._collect<<8|r),this.precedingJoinState=0;break;case 11:this._params.reset(),this._params.addParam(0),this._collect=0;break;case 12:this._dcsParser.hook(this._collect<<8|r,this._params);break;case 13:for(let u=a+1;;++u)if(u>=t||(r=e[u])===24||r===26||r===27||r>127&&r<je){this._dcsParser.put(e,a,u),a=u-1;break}break;case 14:if(n=this._dcsParser.unhook(r!==24&&r!==26),n)return this._preserveStack(6,[],0,o,a),n;r===27&&(o|=1),this._params.reset(),this._params.addParam(0),this._collect=0,this.precedingJoinState=0;break;case 4:this._oscParser.start();break;case 5:for(let u=a+1;;u++)if(u>=t||(r=e[u])<32||r>127&&r<je){this._oscParser.put(e,a,u),a=u-1;break}break;case 6:if(n=this._oscParser.end(r!==24&&r!==26),n)return this._preserveStack(5,[],0,o,a),n;r===27&&(o|=1),this._params.reset(),this._params.addParam(0),this._collect=0,this.precedingJoinState=0;break}this.currentState=o&15}}},Cu=/^([\da-f])\/([\da-f])\/([\da-f])$|^([\da-f]{2})\/([\da-f]{2})\/([\da-f]{2})$|^([\da-f]{3})\/([\da-f]{3})\/([\da-f]{3})$|^([\da-f]{4})\/([\da-f]{4})\/([\da-f]{4})$/,ku=/^[\da-f]+$/;function vn(e){if(!e)return;let t=e.toLowerCase();if(t.indexOf("rgb:")===0){t=t.slice(4);let i=Cu.exec(t);if(i){let r=i[1]?15:i[4]?255:i[7]?4095:65535;return[Math.round(parseInt(i[1]||i[4]||i[7]||i[10],16)/r*255),Math.round(parseInt(i[2]||i[5]||i[8]||i[11],16)/r*255),Math.round(parseInt(i[3]||i[6]||i[9]||i[12],16)/r*255)]}}else if(t.indexOf("#")===0&&(t=t.slice(1),ku.exec(t)&&[3,6,9,12].includes(t.length))){let i=t.length/3,r=[0,0,0];for(let o=0;o<3;++o){let s=parseInt(t.slice(i*o,i*o+i),16);r[o]=i===1?s<<4:i===2?s:i===3?s>>4:s>>8}return r}}function Wr(e,t){let i=e.toString(16),r=i.length<2?"0"+i:i;switch(t){case 4:return i[0];case 8:return r;case 12:return(r+r).slice(0,3);default:return r+r}}function Du(e,t=16){let[i,r,o]=e;return`rgb:${Wr(i,t)}/${Wr(r,t)}/${Wr(o,t)}`}var Eu={"(":0,")":1,"*":2,"+":3,"-":1,".":2},zt=131072,gn=10;function mn(e,t){if(e>24)return t.setWinLines||!1;switch(e){case 1:return!!t.restoreWin;case 2:return!!t.minimizeWin;case 3:return!!t.setWinPosition;case 4:return!!t.setWinSizePixels;case 5:return!!t.raiseWin;case 6:return!!t.lowerWin;case 7:return!!t.refreshWin;case 8:return!!t.setWinSizeChars;case 9:return!!t.maximizeWin;case 10:return!!t.fullscreenWin;case 11:return!!t.getWinState;case 13:return!!t.getWinPosition;case 14:return!!t.getWinSizePixels;case 15:return!!t.getScreenSizePixels;case 16:return!!t.getCellSizePixels;case 18:return!!t.getWinSizeChars;case 19:return!!t.getScreenSizeChars;case 20:return!!t.getIconTitle;case 21:return!!t.getWinTitle;case 22:return!!t.pushTitle;case 23:return!!t.popTitle;case 24:return!!t.setWinLines}return!1}var fn=5e3,_n=0,Pu=class extends te{constructor(e,t,i,r,o,s,n,a,l=new xu){super(),this._bufferService=e,this._charsetService=t,this._coreService=i,this._logService=r,this._optionsService=o,this._oscLinkService=s,this._coreMouseService=n,this._unicodeService=a,this._parser=l,this._parseBuffer=new Uint32Array(4096),this._stringDecoder=new bl,this._utf8Decoder=new wl,this._windowTitle="",this._iconName="",this._windowTitleStack=[],this._iconNameStack=[],this._curAttrData=Se.clone(),this._eraseAttrDataInternal=Se.clone(),this._onRequestBell=this._register(new N),this.onRequestBell=this._onRequestBell.event,this._onRequestRefreshRows=this._register(new N),this.onRequestRefreshRows=this._onRequestRefreshRows.event,this._onRequestReset=this._register(new N),this.onRequestReset=this._onRequestReset.event,this._onRequestSendFocus=this._register(new N),this.onRequestSendFocus=this._onRequestSendFocus.event,this._onRequestSyncScrollBar=this._register(new N),this.onRequestSyncScrollBar=this._onRequestSyncScrollBar.event,this._onRequestWindowsOptionsReport=this._register(new N),this.onRequestWindowsOptionsReport=this._onRequestWindowsOptionsReport.event,this._onA11yChar=this._register(new N),this.onA11yChar=this._onA11yChar.event,this._onA11yTab=this._register(new N),this.onA11yTab=this._onA11yTab.event,this._onCursorMove=this._register(new N),this.onCursorMove=this._onCursorMove.event,this._onLineFeed=this._register(new N),this.onLineFeed=this._onLineFeed.event,this._onScroll=this._register(new N),this.onScroll=this._onScroll.event,this._onTitleChange=this._register(new N),this.onTitleChange=this._onTitleChange.event,this._onColor=this._register(new N),this.onColor=this._onColor.event,this._parseStack={paused:!1,cursorStartX:0,cursorStartY:0,decodedLength:0,position:0},this._specialColors=[256,257,258],this._register(this._parser),this._dirtyRowTracker=new Co(this._bufferService),this._activeBuffer=this._bufferService.buffer,this._register(this._bufferService.buffers.onBufferActivate(d=>this._activeBuffer=d.activeBuffer)),this._parser.setCsiHandlerFallback((d,h)=>{this._logService.debug("Unknown CSI code: ",{identifier:this._parser.identToString(d),params:h.toArray()})}),this._parser.setEscHandlerFallback(d=>{this._logService.debug("Unknown ESC code: ",{identifier:this._parser.identToString(d)})}),this._parser.setExecuteHandlerFallback(d=>{this._logService.debug("Unknown EXECUTE code: ",{code:d})}),this._parser.setOscHandlerFallback((d,h,c)=>{this._logService.debug("Unknown OSC code: ",{identifier:d,action:h,data:c})}),this._parser.setDcsHandlerFallback((d,h,c)=>{h==="HOOK"&&(c=c.toArray()),this._logService.debug("Unknown DCS code: ",{identifier:this._parser.identToString(d),action:h,payload:c})}),this._parser.setPrintHandler((d,h,c)=>this.print(d,h,c)),this._parser.registerCsiHandler({final:"@"},d=>this.insertChars(d)),this._parser.registerCsiHandler({intermediates:" ",final:"@"},d=>this.scrollLeft(d)),this._parser.registerCsiHandler({final:"A"},d=>this.cursorUp(d)),this._parser.registerCsiHandler({intermediates:" ",final:"A"},d=>this.scrollRight(d)),this._parser.registerCsiHandler({final:"B"},d=>this.cursorDown(d)),this._parser.registerCsiHandler({final:"C"},d=>this.cursorForward(d)),this._parser.registerCsiHandler({final:"D"},d=>this.cursorBackward(d)),this._parser.registerCsiHandler({final:"E"},d=>this.cursorNextLine(d)),this._parser.registerCsiHandler({final:"F"},d=>this.cursorPrecedingLine(d)),this._parser.registerCsiHandler({final:"G"},d=>this.cursorCharAbsolute(d)),this._parser.registerCsiHandler({final:"H"},d=>this.cursorPosition(d)),this._parser.registerCsiHandler({final:"I"},d=>this.cursorForwardTab(d)),this._parser.registerCsiHandler({final:"J"},d=>this.eraseInDisplay(d,!1)),this._parser.registerCsiHandler({prefix:"?",final:"J"},d=>this.eraseInDisplay(d,!0)),this._parser.registerCsiHandler({final:"K"},d=>this.eraseInLine(d,!1)),this._parser.registerCsiHandler({prefix:"?",final:"K"},d=>this.eraseInLine(d,!0)),this._parser.registerCsiHandler({final:"L"},d=>this.insertLines(d)),this._parser.registerCsiHandler({final:"M"},d=>this.deleteLines(d)),this._parser.registerCsiHandler({final:"P"},d=>this.deleteChars(d)),this._parser.registerCsiHandler({final:"S"},d=>this.scrollUp(d)),this._parser.registerCsiHandler({final:"T"},d=>this.scrollDown(d)),this._parser.registerCsiHandler({final:"X"},d=>this.eraseChars(d)),this._parser.registerCsiHandler({final:"Z"},d=>this.cursorBackwardTab(d)),this._parser.registerCsiHandler({final:"`"},d=>this.charPosAbsolute(d)),this._parser.registerCsiHandler({final:"a"},d=>this.hPositionRelative(d)),this._parser.registerCsiHandler({final:"b"},d=>this.repeatPrecedingCharacter(d)),this._parser.registerCsiHandler({final:"c"},d=>this.sendDeviceAttributesPrimary(d)),this._parser.registerCsiHandler({prefix:">",final:"c"},d=>this.sendDeviceAttributesSecondary(d)),this._parser.registerCsiHandler({final:"d"},d=>this.linePosAbsolute(d)),this._parser.registerCsiHandler({final:"e"},d=>this.vPositionRelative(d)),this._parser.registerCsiHandler({final:"f"},d=>this.hVPosition(d)),this._parser.registerCsiHandler({final:"g"},d=>this.tabClear(d)),this._parser.registerCsiHandler({final:"h"},d=>this.setMode(d)),this._parser.registerCsiHandler({prefix:"?",final:"h"},d=>this.setModePrivate(d)),this._parser.registerCsiHandler({final:"l"},d=>this.resetMode(d)),this._parser.registerCsiHandler({prefix:"?",final:"l"},d=>this.resetModePrivate(d)),this._parser.registerCsiHandler({final:"m"},d=>this.charAttributes(d)),this._parser.registerCsiHandler({final:"n"},d=>this.deviceStatus(d)),this._parser.registerCsiHandler({prefix:"?",final:"n"},d=>this.deviceStatusPrivate(d)),this._parser.registerCsiHandler({intermediates:"!",final:"p"},d=>this.softReset(d)),this._parser.registerCsiHandler({intermediates:" ",final:"q"},d=>this.setCursorStyle(d)),this._parser.registerCsiHandler({final:"r"},d=>this.setScrollRegion(d)),this._parser.registerCsiHandler({final:"s"},d=>this.saveCursor(d)),this._parser.registerCsiHandler({final:"t"},d=>this.windowOptions(d)),this._parser.registerCsiHandler({final:"u"},d=>this.restoreCursor(d)),this._parser.registerCsiHandler({intermediates:"'",final:"}"},d=>this.insertColumns(d)),this._parser.registerCsiHandler({intermediates:"'",final:"~"},d=>this.deleteColumns(d)),this._parser.registerCsiHandler({intermediates:'"',final:"q"},d=>this.selectProtected(d)),this._parser.registerCsiHandler({intermediates:"$",final:"p"},d=>this.requestMode(d,!0)),this._parser.registerCsiHandler({prefix:"?",intermediates:"$",final:"p"},d=>this.requestMode(d,!1)),this._parser.setExecuteHandler(A.BEL,()=>this.bell()),this._parser.setExecuteHandler(A.LF,()=>this.lineFeed()),this._parser.setExecuteHandler(A.VT,()=>this.lineFeed()),this._parser.setExecuteHandler(A.FF,()=>this.lineFeed()),this._parser.setExecuteHandler(A.CR,()=>this.carriageReturn()),this._parser.setExecuteHandler(A.BS,()=>this.backspace()),this._parser.setExecuteHandler(A.HT,()=>this.tab()),this._parser.setExecuteHandler(A.SO,()=>this.shiftOut()),this._parser.setExecuteHandler(A.SI,()=>this.shiftIn()),this._parser.setExecuteHandler(Xi.IND,()=>this.index()),this._parser.setExecuteHandler(Xi.NEL,()=>this.nextLine()),this._parser.setExecuteHandler(Xi.HTS,()=>this.tabSet()),this._parser.registerOscHandler(0,new $e(d=>(this.setTitle(d),this.setIconName(d),!0))),this._parser.registerOscHandler(1,new $e(d=>this.setIconName(d))),this._parser.registerOscHandler(2,new $e(d=>this.setTitle(d))),this._parser.registerOscHandler(4,new $e(d=>this.setOrReportIndexedColor(d))),this._parser.registerOscHandler(8,new $e(d=>this.setHyperlink(d))),this._parser.registerOscHandler(10,new $e(d=>this.setOrReportFgColor(d))),this._parser.registerOscHandler(11,new $e(d=>this.setOrReportBgColor(d))),this._parser.registerOscHandler(12,new $e(d=>this.setOrReportCursorColor(d))),this._parser.registerOscHandler(104,new $e(d=>this.restoreIndexedColor(d))),this._parser.registerOscHandler(110,new $e(d=>this.restoreFgColor(d))),this._parser.registerOscHandler(111,new $e(d=>this.restoreBgColor(d))),this._parser.registerOscHandler(112,new $e(d=>this.restoreCursorColor(d))),this._parser.registerEscHandler({final:"7"},()=>this.saveCursor()),this._parser.registerEscHandler({final:"8"},()=>this.restoreCursor()),this._parser.registerEscHandler({final:"D"},()=>this.index()),this._parser.registerEscHandler({final:"E"},()=>this.nextLine()),this._parser.registerEscHandler({final:"H"},()=>this.tabSet()),this._parser.registerEscHandler({final:"M"},()=>this.reverseIndex()),this._parser.registerEscHandler({final:"="},()=>this.keypadApplicationMode()),this._parser.registerEscHandler({final:">"},()=>this.keypadNumericMode()),this._parser.registerEscHandler({final:"c"},()=>this.fullReset()),this._parser.registerEscHandler({final:"n"},()=>this.setgLevel(2)),this._parser.registerEscHandler({final:"o"},()=>this.setgLevel(3)),this._parser.registerEscHandler({final:"|"},()=>this.setgLevel(3)),this._parser.registerEscHandler({final:"}"},()=>this.setgLevel(2)),this._parser.registerEscHandler({final:"~"},()=>this.setgLevel(1)),this._parser.registerEscHandler({intermediates:"%",final:"@"},()=>this.selectDefaultCharset()),this._parser.registerEscHandler({intermediates:"%",final:"G"},()=>this.selectDefaultCharset());for(let d in De)this._parser.registerEscHandler({intermediates:"(",final:d},()=>this.selectCharset("("+d)),this._parser.registerEscHandler({intermediates:")",final:d},()=>this.selectCharset(")"+d)),this._parser.registerEscHandler({intermediates:"*",final:d},()=>this.selectCharset("*"+d)),this._parser.registerEscHandler({intermediates:"+",final:d},()=>this.selectCharset("+"+d)),this._parser.registerEscHandler({intermediates:"-",final:d},()=>this.selectCharset("-"+d)),this._parser.registerEscHandler({intermediates:".",final:d},()=>this.selectCharset("."+d)),this._parser.registerEscHandler({intermediates:"/",final:d},()=>this.selectCharset("/"+d));this._parser.registerEscHandler({intermediates:"#",final:"8"},()=>this.screenAlignmentPattern()),this._parser.setErrorHandler(d=>(this._logService.error("Parsing error: ",d),d)),this._parser.registerDcsHandler({intermediates:"$",final:"q"},new pn((d,h)=>this.requestStatusString(d,h)))}getAttrData(){return this._curAttrData}_preserveStack(e,t,i,r){this._parseStack.paused=!0,this._parseStack.cursorStartX=e,this._parseStack.cursorStartY=t,this._parseStack.decodedLength=i,this._parseStack.position=r}_logSlowResolvingAsync(e){this._logService.logLevel<=3&&Promise.race([e,new Promise((t,i)=>setTimeout(()=>i("#SLOW_TIMEOUT"),fn))]).catch(t=>{if(t!=="#SLOW_TIMEOUT")throw t;console.warn(`async parser handler taking longer than ${fn} ms`)})}_getCurrentLinkId(){return this._curAttrData.extended.urlId}parse(e,t){let i,r=this._activeBuffer.x,o=this._activeBuffer.y,s=0,n=this._parseStack.paused;if(n){if(i=this._parser.parse(this._parseBuffer,this._parseStack.decodedLength,t))return this._logSlowResolvingAsync(i),i;r=this._parseStack.cursorStartX,o=this._parseStack.cursorStartY,this._parseStack.paused=!1,e.length>zt&&(s=this._parseStack.position+zt)}if(this._logService.logLevel<=1&&this._logService.debug(`parsing data ${typeof e=="string"?` "${e}"`:` "${Array.prototype.map.call(e,d=>String.fromCharCode(d)).join("")}"`}`),this._logService.logLevel===0&&this._logService.trace("parsing data (codes)",typeof e=="string"?e.split("").map(d=>d.charCodeAt(0)):e),this._parseBuffer.length<e.length&&this._parseBuffer.length<zt&&(this._parseBuffer=new Uint32Array(Math.min(e.length,zt))),n||this._dirtyRowTracker.clearRange(),e.length>zt)for(let d=s;d<e.length;d+=zt){let h=d+zt<e.length?d+zt:e.length,c=typeof e=="string"?this._stringDecoder.decode(e.substring(d,h),this._parseBuffer):this._utf8Decoder.decode(e.subarray(d,h),this._parseBuffer);if(i=this._parser.parse(this._parseBuffer,c))return this._preserveStack(r,o,c,d),this._logSlowResolvingAsync(i),i}else if(!n){let d=typeof e=="string"?this._stringDecoder.decode(e,this._parseBuffer):this._utf8Decoder.decode(e,this._parseBuffer);if(i=this._parser.parse(this._parseBuffer,d))return this._preserveStack(r,o,d,0),this._logSlowResolvingAsync(i),i}(this._activeBuffer.x!==r||this._activeBuffer.y!==o)&&this._onCursorMove.fire();let a=this._dirtyRowTracker.end+(this._bufferService.buffer.ybase-this._bufferService.buffer.ydisp),l=this._dirtyRowTracker.start+(this._bufferService.buffer.ybase-this._bufferService.buffer.ydisp);l<this._bufferService.rows&&this._onRequestRefreshRows.fire({start:Math.min(l,this._bufferService.rows-1),end:Math.min(a,this._bufferService.rows-1)})}print(e,t,i){let r,o,s=this._charsetService.charset,n=this._optionsService.rawOptions.screenReaderMode,a=this._bufferService.cols,l=this._coreService.decPrivateModes.wraparound,d=this._coreService.modes.insertMode,h=this._curAttrData,c=this._activeBuffer.lines.get(this._activeBuffer.ybase+this._activeBuffer.y);this._dirtyRowTracker.markDirty(this._activeBuffer.y),this._activeBuffer.x&&i-t>0&&c.getWidth(this._activeBuffer.x-1)===2&&c.setCellFromCodepoint(this._activeBuffer.x-1,0,1,h);let u=this._parser.precedingJoinState;for(let p=t;p<i;++p){if(r=e[p],r<127&&s){let f=s[String.fromCharCode(r)];f&&(r=f.charCodeAt(0))}let v=this._unicodeService.charProperties(r,u);o=Ht.extractWidth(v);let g=Ht.extractShouldJoin(v),m=g?Ht.extractWidth(u):0;if(u=v,n&&this._onA11yChar.fire(At(r)),this._getCurrentLinkId()&&this._oscLinkService.addLineToLink(this._getCurrentLinkId(),this._activeBuffer.ybase+this._activeBuffer.y),this._activeBuffer.x+o-m>a){if(l){let f=c,S=this._activeBuffer.x-m;for(this._activeBuffer.x=m,this._activeBuffer.y++,this._activeBuffer.y===this._activeBuffer.scrollBottom+1?(this._activeBuffer.y--,this._bufferService.scroll(this._eraseAttrData(),!0)):(this._activeBuffer.y>=this._bufferService.rows&&(this._activeBuffer.y=this._bufferService.rows-1),this._activeBuffer.lines.get(this._activeBuffer.ybase+this._activeBuffer.y).isWrapped=!0),c=this._activeBuffer.lines.get(this._activeBuffer.ybase+this._activeBuffer.y),m>0&&c instanceof fi&&c.copyCellsFrom(f,S,0,m,!1);S<a;)f.setCellFromCodepoint(S++,0,1,h)}else if(this._activeBuffer.x=a-1,o===2)continue}if(g&&this._activeBuffer.x){let f=c.getWidth(this._activeBuffer.x-1)?1:2;c.addCodepointToCell(this._activeBuffer.x-f,r,o);for(let S=o-m;--S>=0;)c.setCellFromCodepoint(this._activeBuffer.x++,0,0,h);continue}if(d&&(c.insertCells(this._activeBuffer.x,o-m,this._activeBuffer.getNullCell(h)),c.getWidth(a-1)===2&&c.setCellFromCodepoint(a-1,0,1,h)),c.setCellFromCodepoint(this._activeBuffer.x++,r,o,h),o>0)for(;--o;)c.setCellFromCodepoint(this._activeBuffer.x++,0,0,h)}this._parser.precedingJoinState=u,this._activeBuffer.x<a&&i-t>0&&c.getWidth(this._activeBuffer.x)===0&&!c.hasContent(this._activeBuffer.x)&&c.setCellFromCodepoint(this._activeBuffer.x,0,1,h),this._dirtyRowTracker.markDirty(this._activeBuffer.y)}registerCsiHandler(e,t){return e.final==="t"&&!e.prefix&&!e.intermediates?this._parser.registerCsiHandler(e,i=>mn(i.params[0],this._optionsService.rawOptions.windowOptions)?t(i):!0):this._parser.registerCsiHandler(e,t)}registerDcsHandler(e,t){return this._parser.registerDcsHandler(e,new pn(t))}registerEscHandler(e,t){return this._parser.registerEscHandler(e,t)}registerOscHandler(e,t){return this._parser.registerOscHandler(e,new $e(t))}bell(){return this._onRequestBell.fire(),!0}lineFeed(){return this._dirtyRowTracker.markDirty(this._activeBuffer.y),this._optionsService.rawOptions.convertEol&&(this._activeBuffer.x=0),this._activeBuffer.y++,this._activeBuffer.y===this._activeBuffer.scrollBottom+1?(this._activeBuffer.y--,this._bufferService.scroll(this._eraseAttrData())):this._activeBuffer.y>=this._bufferService.rows?this._activeBuffer.y=this._bufferService.rows-1:this._activeBuffer.lines.get(this._activeBuffer.ybase+this._activeBuffer.y).isWrapped=!1,this._activeBuffer.x>=this._bufferService.cols&&this._activeBuffer.x--,this._dirtyRowTracker.markDirty(this._activeBuffer.y),this._onLineFeed.fire(),!0}carriageReturn(){return this._activeBuffer.x=0,!0}backspace(){if(!this._coreService.decPrivateModes.reverseWraparound)return this._restrictCursor(),this._activeBuffer.x>0&&this._activeBuffer.x--,!0;if(this._restrictCursor(this._bufferService.cols),this._activeBuffer.x>0)this._activeBuffer.x--;else if(this._activeBuffer.x===0&&this._activeBuffer.y>this._activeBuffer.scrollTop&&this._activeBuffer.y<=this._activeBuffer.scrollBottom&&this._activeBuffer.lines.get(this._activeBuffer.ybase+this._activeBuffer.y)?.isWrapped){this._activeBuffer.lines.get(this._activeBuffer.ybase+this._activeBuffer.y).isWrapped=!1,this._activeBuffer.y--,this._activeBuffer.x=this._bufferService.cols-1;let e=this._activeBuffer.lines.get(this._activeBuffer.ybase+this._activeBuffer.y);e.hasWidth(this._activeBuffer.x)&&!e.hasContent(this._activeBuffer.x)&&this._activeBuffer.x--}return this._restrictCursor(),!0}tab(){if(this._activeBuffer.x>=this._bufferService.cols)return!0;let e=this._activeBuffer.x;return this._activeBuffer.x=this._activeBuffer.nextStop(),this._optionsService.rawOptions.screenReaderMode&&this._onA11yTab.fire(this._activeBuffer.x-e),!0}shiftOut(){return this._charsetService.setgLevel(1),!0}shiftIn(){return this._charsetService.setgLevel(0),!0}_restrictCursor(e=this._bufferService.cols-1){this._activeBuffer.x=Math.min(e,Math.max(0,this._activeBuffer.x)),this._activeBuffer.y=this._coreService.decPrivateModes.origin?Math.min(this._activeBuffer.scrollBottom,Math.max(this._activeBuffer.scrollTop,this._activeBuffer.y)):Math.min(this._bufferService.rows-1,Math.max(0,this._activeBuffer.y)),this._dirtyRowTracker.markDirty(this._activeBuffer.y)}_setCursor(e,t){this._dirtyRowTracker.markDirty(this._activeBuffer.y),this._coreService.decPrivateModes.origin?(this._activeBuffer.x=e,this._activeBuffer.y=this._activeBuffer.scrollTop+t):(this._activeBuffer.x=e,this._activeBuffer.y=t),this._restrictCursor(),this._dirtyRowTracker.markDirty(this._activeBuffer.y)}_moveCursor(e,t){this._restrictCursor(),this._setCursor(this._activeBuffer.x+e,this._activeBuffer.y+t)}cursorUp(e){let t=this._activeBuffer.y-this._activeBuffer.scrollTop;return t>=0?this._moveCursor(0,-Math.min(t,e.params[0]||1)):this._moveCursor(0,-(e.params[0]||1)),!0}cursorDown(e){let t=this._activeBuffer.scrollBottom-this._activeBuffer.y;return t>=0?this._moveCursor(0,Math.min(t,e.params[0]||1)):this._moveCursor(0,e.params[0]||1),!0}cursorForward(e){return this._moveCursor(e.params[0]||1,0),!0}cursorBackward(e){return this._moveCursor(-(e.params[0]||1),0),!0}cursorNextLine(e){return this.cursorDown(e),this._activeBuffer.x=0,!0}cursorPrecedingLine(e){return this.cursorUp(e),this._activeBuffer.x=0,!0}cursorCharAbsolute(e){return this._setCursor((e.params[0]||1)-1,this._activeBuffer.y),!0}cursorPosition(e){return this._setCursor(e.length>=2?(e.params[1]||1)-1:0,(e.params[0]||1)-1),!0}charPosAbsolute(e){return this._setCursor((e.params[0]||1)-1,this._activeBuffer.y),!0}hPositionRelative(e){return this._moveCursor(e.params[0]||1,0),!0}linePosAbsolute(e){return this._setCursor(this._activeBuffer.x,(e.params[0]||1)-1),!0}vPositionRelative(e){return this._moveCursor(0,e.params[0]||1),!0}hVPosition(e){return this.cursorPosition(e),!0}tabClear(e){let t=e.params[0];return t===0?delete this._activeBuffer.tabs[this._activeBuffer.x]:t===3&&(this._activeBuffer.tabs={}),!0}cursorForwardTab(e){if(this._activeBuffer.x>=this._bufferService.cols)return!0;let t=e.params[0]||1;for(;t--;)this._activeBuffer.x=this._activeBuffer.nextStop();return!0}cursorBackwardTab(e){if(this._activeBuffer.x>=this._bufferService.cols)return!0;let t=e.params[0]||1;for(;t--;)this._activeBuffer.x=this._activeBuffer.prevStop();return!0}selectProtected(e){let t=e.params[0];return t===1&&(this._curAttrData.bg|=536870912),(t===2||t===0)&&(this._curAttrData.bg&=-536870913),!0}_eraseInBufferLine(e,t,i,r=!1,o=!1){let s=this._activeBuffer.lines.get(this._activeBuffer.ybase+e);s.replaceCells(t,i,this._activeBuffer.getNullCell(this._eraseAttrData()),o),r&&(s.isWrapped=!1)}_resetBufferLine(e,t=!1){let i=this._activeBuffer.lines.get(this._activeBuffer.ybase+e);i&&(i.fill(this._activeBuffer.getNullCell(this._eraseAttrData()),t),this._bufferService.buffer.clearMarkers(this._activeBuffer.ybase+e),i.isWrapped=!1)}eraseInDisplay(e,t=!1){this._restrictCursor(this._bufferService.cols);let i;switch(e.params[0]){case 0:for(i=this._activeBuffer.y,this._dirtyRowTracker.markDirty(i),this._eraseInBufferLine(i++,this._activeBuffer.x,this._bufferService.cols,this._activeBuffer.x===0,t);i<this._bufferService.rows;i++)this._resetBufferLine(i,t);this._dirtyRowTracker.markDirty(i);break;case 1:for(i=this._activeBuffer.y,this._dirtyRowTracker.markDirty(i),this._eraseInBufferLine(i,0,this._activeBuffer.x+1,!0,t),this._activeBuffer.x+1>=this._bufferService.cols&&(this._activeBuffer.lines.get(i+1).isWrapped=!1);i--;)this._resetBufferLine(i,t);this._dirtyRowTracker.markDirty(0);break;case 2:if(this._optionsService.rawOptions.scrollOnEraseInDisplay){for(i=this._bufferService.rows,this._dirtyRowTracker.markRangeDirty(0,i-1);i--&&!this._activeBuffer.lines.get(this._activeBuffer.ybase+i)?.getTrimmedLength(););for(;i>=0;i--)this._bufferService.scroll(this._eraseAttrData())}else{for(i=this._bufferService.rows,this._dirtyRowTracker.markDirty(i-1);i--;)this._resetBufferLine(i,t);this._dirtyRowTracker.markDirty(0)}break;case 3:let r=this._activeBuffer.lines.length-this._bufferService.rows;r>0&&(this._activeBuffer.lines.trimStart(r),this._activeBuffer.ybase=Math.max(this._activeBuffer.ybase-r,0),this._activeBuffer.ydisp=Math.max(this._activeBuffer.ydisp-r,0),this._onScroll.fire(0));break}return!0}eraseInLine(e,t=!1){switch(this._restrictCursor(this._bufferService.cols),e.params[0]){case 0:this._eraseInBufferLine(this._activeBuffer.y,this._activeBuffer.x,this._bufferService.cols,this._activeBuffer.x===0,t);break;case 1:this._eraseInBufferLine(this._activeBuffer.y,0,this._activeBuffer.x+1,!1,t);break;case 2:this._eraseInBufferLine(this._activeBuffer.y,0,this._bufferService.cols,!0,t);break}return this._dirtyRowTracker.markDirty(this._activeBuffer.y),!0}insertLines(e){this._restrictCursor();let t=e.params[0]||1;if(this._activeBuffer.y>this._activeBuffer.scrollBottom||this._activeBuffer.y<this._activeBuffer.scrollTop)return!0;let i=this._activeBuffer.ybase+this._activeBuffer.y,r=this._bufferService.rows-1-this._activeBuffer.scrollBottom,o=this._bufferService.rows-1+this._activeBuffer.ybase-r+1;for(;t--;)this._activeBuffer.lines.splice(o-1,1),this._activeBuffer.lines.splice(i,0,this._activeBuffer.getBlankLine(this._eraseAttrData()));return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.y,this._activeBuffer.scrollBottom),this._activeBuffer.x=0,!0}deleteLines(e){this._restrictCursor();let t=e.params[0]||1;if(this._activeBuffer.y>this._activeBuffer.scrollBottom||this._activeBuffer.y<this._activeBuffer.scrollTop)return!0;let i=this._activeBuffer.ybase+this._activeBuffer.y,r;for(r=this._bufferService.rows-1-this._activeBuffer.scrollBottom,r=this._bufferService.rows-1+this._activeBuffer.ybase-r;t--;)this._activeBuffer.lines.splice(i,1),this._activeBuffer.lines.splice(r,0,this._activeBuffer.getBlankLine(this._eraseAttrData()));return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.y,this._activeBuffer.scrollBottom),this._activeBuffer.x=0,!0}insertChars(e){this._restrictCursor();let t=this._activeBuffer.lines.get(this._activeBuffer.ybase+this._activeBuffer.y);return t&&(t.insertCells(this._activeBuffer.x,e.params[0]||1,this._activeBuffer.getNullCell(this._eraseAttrData())),this._dirtyRowTracker.markDirty(this._activeBuffer.y)),!0}deleteChars(e){this._restrictCursor();let t=this._activeBuffer.lines.get(this._activeBuffer.ybase+this._activeBuffer.y);return t&&(t.deleteCells(this._activeBuffer.x,e.params[0]||1,this._activeBuffer.getNullCell(this._eraseAttrData())),this._dirtyRowTracker.markDirty(this._activeBuffer.y)),!0}scrollUp(e){let t=e.params[0]||1;for(;t--;)this._activeBuffer.lines.splice(this._activeBuffer.ybase+this._activeBuffer.scrollTop,1),this._activeBuffer.lines.splice(this._activeBuffer.ybase+this._activeBuffer.scrollBottom,0,this._activeBuffer.getBlankLine(this._eraseAttrData()));return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop,this._activeBuffer.scrollBottom),!0}scrollDown(e){let t=e.params[0]||1;for(;t--;)this._activeBuffer.lines.splice(this._activeBuffer.ybase+this._activeBuffer.scrollBottom,1),this._activeBuffer.lines.splice(this._activeBuffer.ybase+this._activeBuffer.scrollTop,0,this._activeBuffer.getBlankLine(Se));return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop,this._activeBuffer.scrollBottom),!0}scrollLeft(e){if(this._activeBuffer.y>this._activeBuffer.scrollBottom||this._activeBuffer.y<this._activeBuffer.scrollTop)return!0;let t=e.params[0]||1;for(let i=this._activeBuffer.scrollTop;i<=this._activeBuffer.scrollBottom;++i){let r=this._activeBuffer.lines.get(this._activeBuffer.ybase+i);r.deleteCells(0,t,this._activeBuffer.getNullCell(this._eraseAttrData())),r.isWrapped=!1}return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop,this._activeBuffer.scrollBottom),!0}scrollRight(e){if(this._activeBuffer.y>this._activeBuffer.scrollBottom||this._activeBuffer.y<this._activeBuffer.scrollTop)return!0;let t=e.params[0]||1;for(let i=this._activeBuffer.scrollTop;i<=this._activeBuffer.scrollBottom;++i){let r=this._activeBuffer.lines.get(this._activeBuffer.ybase+i);r.insertCells(0,t,this._activeBuffer.getNullCell(this._eraseAttrData())),r.isWrapped=!1}return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop,this._activeBuffer.scrollBottom),!0}insertColumns(e){if(this._activeBuffer.y>this._activeBuffer.scrollBottom||this._activeBuffer.y<this._activeBuffer.scrollTop)return!0;let t=e.params[0]||1;for(let i=this._activeBuffer.scrollTop;i<=this._activeBuffer.scrollBottom;++i){let r=this._activeBuffer.lines.get(this._activeBuffer.ybase+i);r.insertCells(this._activeBuffer.x,t,this._activeBuffer.getNullCell(this._eraseAttrData())),r.isWrapped=!1}return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop,this._activeBuffer.scrollBottom),!0}deleteColumns(e){if(this._activeBuffer.y>this._activeBuffer.scrollBottom||this._activeBuffer.y<this._activeBuffer.scrollTop)return!0;let t=e.params[0]||1;for(let i=this._activeBuffer.scrollTop;i<=this._activeBuffer.scrollBottom;++i){let r=this._activeBuffer.lines.get(this._activeBuffer.ybase+i);r.deleteCells(this._activeBuffer.x,t,this._activeBuffer.getNullCell(this._eraseAttrData())),r.isWrapped=!1}return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop,this._activeBuffer.scrollBottom),!0}eraseChars(e){this._restrictCursor();let t=this._activeBuffer.lines.get(this._activeBuffer.ybase+this._activeBuffer.y);return t&&(t.replaceCells(this._activeBuffer.x,this._activeBuffer.x+(e.params[0]||1),this._activeBuffer.getNullCell(this._eraseAttrData())),this._dirtyRowTracker.markDirty(this._activeBuffer.y)),!0}repeatPrecedingCharacter(e){let t=this._parser.precedingJoinState;if(!t)return!0;let i=e.params[0]||1,r=Ht.extractWidth(t),o=this._activeBuffer.x-r,s=this._activeBuffer.lines.get(this._activeBuffer.ybase+this._activeBuffer.y).getString(o),n=new Uint32Array(s.length*i),a=0;for(let d=0;d<s.length;){let h=s.codePointAt(d)||0;n[a++]=h,d+=h>65535?2:1}let l=a;for(let d=1;d<i;++d)n.copyWithin(l,0,a),l+=a;return this.print(n,0,l),!0}sendDeviceAttributesPrimary(e){return e.params[0]>0||(this._is("xterm")||this._is("rxvt-unicode")||this._is("screen")?this._coreService.triggerDataEvent(A.ESC+"[?1;2c"):this._is("linux")&&this._coreService.triggerDataEvent(A.ESC+"[?6c")),!0}sendDeviceAttributesSecondary(e){return e.params[0]>0||(this._is("xterm")?this._coreService.triggerDataEvent(A.ESC+"[>0;276;0c"):this._is("rxvt-unicode")?this._coreService.triggerDataEvent(A.ESC+"[>85;95;0c"):this._is("linux")?this._coreService.triggerDataEvent(e.params[0]+"c"):this._is("screen")&&this._coreService.triggerDataEvent(A.ESC+"[>83;40003;0c")),!0}_is(e){return(this._optionsService.rawOptions.termName+"").indexOf(e)===0}setMode(e){for(let t=0;t<e.length;t++)switch(e.params[t]){case 4:this._coreService.modes.insertMode=!0;break;case 20:this._optionsService.options.convertEol=!0;break}return!0}setModePrivate(e){for(let t=0;t<e.length;t++)switch(e.params[t]){case 1:this._coreService.decPrivateModes.applicationCursorKeys=!0;break;case 2:this._charsetService.setgCharset(0,Wt),this._charsetService.setgCharset(1,Wt),this._charsetService.setgCharset(2,Wt),this._charsetService.setgCharset(3,Wt);break;case 3:this._optionsService.rawOptions.windowOptions.setWinLines&&(this._bufferService.resize(132,this._bufferService.rows),this._onRequestReset.fire());break;case 6:this._coreService.decPrivateModes.origin=!0,this._setCursor(0,0);break;case 7:this._coreService.decPrivateModes.wraparound=!0;break;case 12:this._optionsService.options.cursorBlink=!0;break;case 45:this._coreService.decPrivateModes.reverseWraparound=!0;break;case 66:this._logService.debug("Serial port requested application keypad."),this._coreService.decPrivateModes.applicationKeypad=!0,this._onRequestSyncScrollBar.fire();break;case 9:this._coreMouseService.activeProtocol="X10";break;case 1e3:this._coreMouseService.activeProtocol="VT200";break;case 1002:this._coreMouseService.activeProtocol="DRAG";break;case 1003:this._coreMouseService.activeProtocol="ANY";break;case 1004:this._coreService.decPrivateModes.sendFocus=!0,this._onRequestSendFocus.fire();break;case 1005:this._logService.debug("DECSET 1005 not supported (see #2507)");break;case 1006:this._coreMouseService.activeEncoding="SGR";break;case 1015:this._logService.debug("DECSET 1015 not supported (see #2507)");break;case 1016:this._coreMouseService.activeEncoding="SGR_PIXELS";break;case 25:this._coreService.isCursorHidden=!1;break;case 1048:this.saveCursor();break;case 1049:this.saveCursor();case 47:case 1047:this._bufferService.buffers.activateAltBuffer(this._eraseAttrData()),this._coreService.isCursorInitialized=!0,this._onRequestRefreshRows.fire(void 0),this._onRequestSyncScrollBar.fire();break;case 2004:this._coreService.decPrivateModes.bracketedPasteMode=!0;break;case 2026:this._coreService.decPrivateModes.synchronizedOutput=!0;break}return!0}resetMode(e){for(let t=0;t<e.length;t++)switch(e.params[t]){case 4:this._coreService.modes.insertMode=!1;break;case 20:this._optionsService.options.convertEol=!1;break}return!0}resetModePrivate(e){for(let t=0;t<e.length;t++)switch(e.params[t]){case 1:this._coreService.decPrivateModes.applicationCursorKeys=!1;break;case 3:this._optionsService.rawOptions.windowOptions.setWinLines&&(this._bufferService.resize(80,this._bufferService.rows),this._onRequestReset.fire());break;case 6:this._coreService.decPrivateModes.origin=!1,this._setCursor(0,0);break;case 7:this._coreService.decPrivateModes.wraparound=!1;break;case 12:this._optionsService.options.cursorBlink=!1;break;case 45:this._coreService.decPrivateModes.reverseWraparound=!1;break;case 66:this._logService.debug("Switching back to normal keypad."),this._coreService.decPrivateModes.applicationKeypad=!1,this._onRequestSyncScrollBar.fire();break;case 9:case 1e3:case 1002:case 1003:this._coreMouseService.activeProtocol="NONE";break;case 1004:this._coreService.decPrivateModes.sendFocus=!1;break;case 1005:this._logService.debug("DECRST 1005 not supported (see #2507)");break;case 1006:this._coreMouseService.activeEncoding="DEFAULT";break;case 1015:this._logService.debug("DECRST 1015 not supported (see #2507)");break;case 1016:this._coreMouseService.activeEncoding="DEFAULT";break;case 25:this._coreService.isCursorHidden=!0;break;case 1048:this.restoreCursor();break;case 1049:case 47:case 1047:this._bufferService.buffers.activateNormalBuffer(),e.params[t]===1049&&this.restoreCursor(),this._coreService.isCursorInitialized=!0,this._onRequestRefreshRows.fire(void 0),this._onRequestSyncScrollBar.fire();break;case 2004:this._coreService.decPrivateModes.bracketedPasteMode=!1;break;case 2026:this._coreService.decPrivateModes.synchronizedOutput=!1,this._onRequestRefreshRows.fire(void 0);break}return!0}requestMode(e,t){let i;(g=>(g[g.NOT_RECOGNIZED=0]="NOT_RECOGNIZED",g[g.SET=1]="SET",g[g.RESET=2]="RESET",g[g.PERMANENTLY_SET=3]="PERMANENTLY_SET",g[g.PERMANENTLY_RESET=4]="PERMANENTLY_RESET"))(i||={});let r=this._coreService.decPrivateModes,{activeProtocol:o,activeEncoding:s}=this._coreMouseService,n=this._coreService,{buffers:a,cols:l}=this._bufferService,{active:d,alt:h}=a,c=this._optionsService.rawOptions,u=(g,m)=>(n.triggerDataEvent(`${A.ESC}[${t?"":"?"}${g};${m}$y`),!0),p=g=>g?1:2,v=e.params[0];return t?v===2?u(v,4):v===4?u(v,p(n.modes.insertMode)):v===12?u(v,3):v===20?u(v,p(c.convertEol)):u(v,0):v===1?u(v,p(r.applicationCursorKeys)):v===3?u(v,c.windowOptions.setWinLines?l===80?2:l===132?1:0:0):v===6?u(v,p(r.origin)):v===7?u(v,p(r.wraparound)):v===8?u(v,3):v===9?u(v,p(o==="X10")):v===12?u(v,p(c.cursorBlink)):v===25?u(v,p(!n.isCursorHidden)):v===45?u(v,p(r.reverseWraparound)):v===66?u(v,p(r.applicationKeypad)):v===67?u(v,4):v===1e3?u(v,p(o==="VT200")):v===1002?u(v,p(o==="DRAG")):v===1003?u(v,p(o==="ANY")):v===1004?u(v,p(r.sendFocus)):v===1005?u(v,4):v===1006?u(v,p(s==="SGR")):v===1015?u(v,4):v===1016?u(v,p(s==="SGR_PIXELS")):v===1048?u(v,1):v===47||v===1047||v===1049?u(v,p(d===h)):v===2004?u(v,p(r.bracketedPasteMode)):v===2026?u(v,p(r.synchronizedOutput)):u(v,0)}_updateAttrColor(e,t,i,r,o){return t===2?(e|=50331648,e&=-16777216,e|=Di.fromColorRGB([i,r,o])):t===5&&(e&=-50331904,e|=33554432|i&255),e}_extractColor(e,t,i){let r=[0,0,-1,0,0,0],o=0,s=0;do{if(r[s+o]=e.params[t+s],e.hasSubParams(t+s)){let n=e.getSubParams(t+s),a=0;do r[1]===5&&(o=1),r[s+a+1+o]=n[a];while(++a<n.length&&a+s+1+o<r.length);break}if(r[1]===5&&s+o>=2||r[1]===2&&s+o>=5)break;r[1]&&(o=1)}while(++s+t<e.length&&s+o<r.length);for(let n=2;n<r.length;++n)r[n]===-1&&(r[n]=0);switch(r[0]){case 38:i.fg=this._updateAttrColor(i.fg,r[1],r[3],r[4],r[5]);break;case 48:i.bg=this._updateAttrColor(i.bg,r[1],r[3],r[4],r[5]);break;case 58:i.extended=i.extended.clone(),i.extended.underlineColor=this._updateAttrColor(i.extended.underlineColor,r[1],r[3],r[4],r[5])}return s}_processUnderline(e,t){t.extended=t.extended.clone(),(!~e||e>5)&&(e=1),t.extended.underlineStyle=e,t.fg|=268435456,e===0&&(t.fg&=-268435457),t.updateExtended()}_processSGR0(e){e.fg=Se.fg,e.bg=Se.bg,e.extended=e.extended.clone(),e.extended.underlineStyle=0,e.extended.underlineColor&=-67108864,e.updateExtended()}charAttributes(e){if(e.length===1&&e.params[0]===0)return this._processSGR0(this._curAttrData),!0;let t=e.length,i,r=this._curAttrData;for(let o=0;o<t;o++)i=e.params[o],i>=30&&i<=37?(r.fg&=-50331904,r.fg|=16777216|i-30):i>=40&&i<=47?(r.bg&=-50331904,r.bg|=16777216|i-40):i>=90&&i<=97?(r.fg&=-50331904,r.fg|=16777216|i-90|8):i>=100&&i<=107?(r.bg&=-50331904,r.bg|=16777216|i-100|8):i===0?this._processSGR0(r):i===1?r.fg|=134217728:i===3?r.bg|=67108864:i===4?(r.fg|=268435456,this._processUnderline(e.hasSubParams(o)?e.getSubParams(o)[0]:1,r)):i===5?r.fg|=536870912:i===7?r.fg|=67108864:i===8?r.fg|=1073741824:i===9?r.fg|=2147483648:i===2?r.bg|=134217728:i===21?this._processUnderline(2,r):i===22?(r.fg&=-134217729,r.bg&=-134217729):i===23?r.bg&=-67108865:i===24?(r.fg&=-268435457,this._processUnderline(0,r)):i===25?r.fg&=-536870913:i===27?r.fg&=-67108865:i===28?r.fg&=-1073741825:i===29?r.fg&=2147483647:i===39?(r.fg&=-67108864,r.fg|=Se.fg&16777215):i===49?(r.bg&=-67108864,r.bg|=Se.bg&16777215):i===38||i===48||i===58?o+=this._extractColor(e,o,r):i===53?r.bg|=1073741824:i===55?r.bg&=-1073741825:i===59?(r.extended=r.extended.clone(),r.extended.underlineColor=-1,r.updateExtended()):i===100?(r.fg&=-67108864,r.fg|=Se.fg&16777215,r.bg&=-67108864,r.bg|=Se.bg&16777215):this._logService.debug("Unknown SGR attribute: %d.",i);return!0}deviceStatus(e){switch(e.params[0]){case 5:this._coreService.triggerDataEvent(`${A.ESC}[0n`);break;case 6:let t=this._activeBuffer.y+1,i=this._activeBuffer.x+1;this._coreService.triggerDataEvent(`${A.ESC}[${t};${i}R`);break}return!0}deviceStatusPrivate(e){switch(e.params[0]){case 6:let t=this._activeBuffer.y+1,i=this._activeBuffer.x+1;this._coreService.triggerDataEvent(`${A.ESC}[?${t};${i}R`);break;case 15:break;case 25:break;case 26:break;case 53:break}return!0}softReset(e){return this._coreService.isCursorHidden=!1,this._onRequestSyncScrollBar.fire(),this._activeBuffer.scrollTop=0,this._activeBuffer.scrollBottom=this._bufferService.rows-1,this._curAttrData=Se.clone(),this._coreService.reset(),this._charsetService.reset(),this._activeBuffer.savedX=0,this._activeBuffer.savedY=this._activeBuffer.ybase,this._activeBuffer.savedCurAttrData.fg=this._curAttrData.fg,this._activeBuffer.savedCurAttrData.bg=this._curAttrData.bg,this._activeBuffer.savedCharset=this._charsetService.charset,this._coreService.decPrivateModes.origin=!1,!0}setCursorStyle(e){let t=e.length===0?1:e.params[0];if(t===0)this._coreService.decPrivateModes.cursorStyle=void 0,this._coreService.decPrivateModes.cursorBlink=void 0;else{switch(t){case 1:case 2:this._coreService.decPrivateModes.cursorStyle="block";break;case 3:case 4:this._coreService.decPrivateModes.cursorStyle="underline";break;case 5:case 6:this._coreService.decPrivateModes.cursorStyle="bar";break}let i=t%2===1;this._coreService.decPrivateModes.cursorBlink=i}return!0}setScrollRegion(e){let t=e.params[0]||1,i;return(e.length<2||(i=e.params[1])>this._bufferService.rows||i===0)&&(i=this._bufferService.rows),i>t&&(this._activeBuffer.scrollTop=t-1,this._activeBuffer.scrollBottom=i-1,this._setCursor(0,0)),!0}windowOptions(e){if(!mn(e.params[0],this._optionsService.rawOptions.windowOptions))return!0;let t=e.length>1?e.params[1]:0;switch(e.params[0]){case 14:t!==2&&this._onRequestWindowsOptionsReport.fire(0);break;case 16:this._onRequestWindowsOptionsReport.fire(1);break;case 18:this._bufferService&&this._coreService.triggerDataEvent(`${A.ESC}[8;${this._bufferService.rows};${this._bufferService.cols}t`);break;case 22:(t===0||t===2)&&(this._windowTitleStack.push(this._windowTitle),this._windowTitleStack.length>gn&&this._windowTitleStack.shift()),(t===0||t===1)&&(this._iconNameStack.push(this._iconName),this._iconNameStack.length>gn&&this._iconNameStack.shift());break;case 23:(t===0||t===2)&&this._windowTitleStack.length&&this.setTitle(this._windowTitleStack.pop()),(t===0||t===1)&&this._iconNameStack.length&&this.setIconName(this._iconNameStack.pop());break}return!0}saveCursor(e){return this._activeBuffer.savedX=this._activeBuffer.x,this._activeBuffer.savedY=this._activeBuffer.ybase+this._activeBuffer.y,this._activeBuffer.savedCurAttrData.fg=this._curAttrData.fg,this._activeBuffer.savedCurAttrData.bg=this._curAttrData.bg,this._activeBuffer.savedCharset=this._charsetService.charset,!0}restoreCursor(e){return this._activeBuffer.x=this._activeBuffer.savedX||0,this._activeBuffer.y=Math.max(this._activeBuffer.savedY-this._activeBuffer.ybase,0),this._curAttrData.fg=this._activeBuffer.savedCurAttrData.fg,this._curAttrData.bg=this._activeBuffer.savedCurAttrData.bg,this._charsetService.charset=this._savedCharset,this._activeBuffer.savedCharset&&(this._charsetService.charset=this._activeBuffer.savedCharset),this._restrictCursor(),!0}setTitle(e){return this._windowTitle=e,this._onTitleChange.fire(e),!0}setIconName(e){return this._iconName=e,!0}setOrReportIndexedColor(e){let t=[],i=e.split(";");for(;i.length>1;){let r=i.shift(),o=i.shift();if(/^\d+$/.exec(r)){let s=parseInt(r);if(bn(s))if(o==="?")t.push({type:0,index:s});else{let n=vn(o);n&&t.push({type:1,index:s,color:n})}}}return t.length&&this._onColor.fire(t),!0}setHyperlink(e){let t=e.indexOf(";");if(t===-1)return!0;let i=e.slice(0,t).trim(),r=e.slice(t+1);return r?this._createHyperlink(i,r):i.trim()?!1:this._finishHyperlink()}_createHyperlink(e,t){this._getCurrentLinkId()&&this._finishHyperlink();let i=e.split(":"),r,o=i.findIndex(s=>s.startsWith("id="));return o!==-1&&(r=i[o].slice(3)||void 0),this._curAttrData.extended=this._curAttrData.extended.clone(),this._curAttrData.extended.urlId=this._oscLinkService.registerLink({id:r,uri:t}),this._curAttrData.updateExtended(),!0}_finishHyperlink(){return this._curAttrData.extended=this._curAttrData.extended.clone(),this._curAttrData.extended.urlId=0,this._curAttrData.updateExtended(),!0}_setOrReportSpecialColor(e,t){let i=e.split(";");for(let r=0;r<i.length&&!(t>=this._specialColors.length);++r,++t)if(i[r]==="?")this._onColor.fire([{type:0,index:this._specialColors[t]}]);else{let o=vn(i[r]);o&&this._onColor.fire([{type:1,index:this._specialColors[t],color:o}])}return!0}setOrReportFgColor(e){return this._setOrReportSpecialColor(e,0)}setOrReportBgColor(e){return this._setOrReportSpecialColor(e,1)}setOrReportCursorColor(e){return this._setOrReportSpecialColor(e,2)}restoreIndexedColor(e){if(!e)return this._onColor.fire([{type:2}]),!0;let t=[],i=e.split(";");for(let r=0;r<i.length;++r)if(/^\d+$/.exec(i[r])){let o=parseInt(i[r]);bn(o)&&t.push({type:2,index:o})}return t.length&&this._onColor.fire(t),!0}restoreFgColor(e){return this._onColor.fire([{type:2,index:256}]),!0}restoreBgColor(e){return this._onColor.fire([{type:2,index:257}]),!0}restoreCursorColor(e){return this._onColor.fire([{type:2,index:258}]),!0}nextLine(){return this._activeBuffer.x=0,this.index(),!0}keypadApplicationMode(){return this._logService.debug("Serial port requested application keypad."),this._coreService.decPrivateModes.applicationKeypad=!0,this._onRequestSyncScrollBar.fire(),!0}keypadNumericMode(){return this._logService.debug("Switching back to normal keypad."),this._coreService.decPrivateModes.applicationKeypad=!1,this._onRequestSyncScrollBar.fire(),!0}selectDefaultCharset(){return this._charsetService.setgLevel(0),this._charsetService.setgCharset(0,Wt),!0}selectCharset(e){return e.length!==2?(this.selectDefaultCharset(),!0):(e[0]==="/"||this._charsetService.setgCharset(Eu[e[0]],De[e[1]]||Wt),!0)}index(){return this._restrictCursor(),this._activeBuffer.y++,this._activeBuffer.y===this._activeBuffer.scrollBottom+1?(this._activeBuffer.y--,this._bufferService.scroll(this._eraseAttrData())):this._activeBuffer.y>=this._bufferService.rows&&(this._activeBuffer.y=this._bufferService.rows-1),this._restrictCursor(),!0}tabSet(){return this._activeBuffer.tabs[this._activeBuffer.x]=!0,!0}reverseIndex(){if(this._restrictCursor(),this._activeBuffer.y===this._activeBuffer.scrollTop){let e=this._activeBuffer.scrollBottom-this._activeBuffer.scrollTop;this._activeBuffer.lines.shiftElements(this._activeBuffer.ybase+this._activeBuffer.y,e,1),this._activeBuffer.lines.set(this._activeBuffer.ybase+this._activeBuffer.y,this._activeBuffer.getBlankLine(this._eraseAttrData())),this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop,this._activeBuffer.scrollBottom)}else this._activeBuffer.y--,this._restrictCursor();return!0}fullReset(){return this._parser.reset(),this._onRequestReset.fire(),!0}reset(){this._curAttrData=Se.clone(),this._eraseAttrDataInternal=Se.clone()}_eraseAttrData(){return this._eraseAttrDataInternal.bg&=-67108864,this._eraseAttrDataInternal.bg|=this._curAttrData.bg&67108863,this._eraseAttrDataInternal}setgLevel(e){return this._charsetService.setgLevel(e),!0}screenAlignmentPattern(){let e=new Je;e.content=1<<22|69,e.fg=this._curAttrData.fg,e.bg=this._curAttrData.bg,this._setCursor(0,0);for(let t=0;t<this._bufferService.rows;++t){let i=this._activeBuffer.ybase+this._activeBuffer.y+t,r=this._activeBuffer.lines.get(i);r&&(r.fill(e),r.isWrapped=!1)}return this._dirtyRowTracker.markAllDirty(),this._setCursor(0,0),!0}requestStatusString(e,t){let i=n=>(this._coreService.triggerDataEvent(`${A.ESC}${n}${A.ESC}\\`),!0),r=this._bufferService.buffer,o=this._optionsService.rawOptions;return i(e==='"q'?`P1$r${this._curAttrData.isProtected()?1:0}"q`:e==='"p'?'P1$r61;1"p':e==="r"?`P1$r${r.scrollTop+1};${r.scrollBottom+1}r`:e==="m"?"P1$r0m":e===" q"?`P1$r${{block:2,underline:4,bar:6}[o.cursorStyle]-(o.cursorBlink?1:0)} q`:"P0$r")}markRangeDirty(e,t){this._dirtyRowTracker.markRangeDirty(e,t)}},Co=class{constructor(e){this._bufferService=e,this.clearRange()}clearRange(){this.start=this._bufferService.buffer.y,this.end=this._bufferService.buffer.y}markDirty(e){e<this.start?this.start=e:e>this.end&&(this.end=e)}markRangeDirty(e,t){e>t&&(_n=e,e=t,t=_n),e<this.start&&(this.start=e),t>this.end&&(this.end=t)}markAllDirty(){this.markRangeDirty(0,this._bufferService.rows-1)}};Co=fe([F(0,Ne)],Co);function bn(e){return 0<=e&&e<256}var Tu=5e7,wn=12,zu=50,Au=class extends te{constructor(e){super(),this._action=e,this._writeBuffer=[],this._callbacks=[],this._pendingData=0,this._bufferOffset=0,this._isSyncWriting=!1,this._syncCalls=0,this._didUserInput=!1,this._onWriteParsed=this._register(new N),this.onWriteParsed=this._onWriteParsed.event}handleUserInput(){this._didUserInput=!0}writeSync(e,t){if(t!==void 0&&this._syncCalls>t){this._syncCalls=0;return}if(this._pendingData+=e.length,this._writeBuffer.push(e),this._callbacks.push(void 0),this._syncCalls++,this._isSyncWriting)return;this._isSyncWriting=!0;let i;for(;i=this._writeBuffer.shift();){this._action(i);let r=this._callbacks.shift();r&&r()}this._pendingData=0,this._bufferOffset=2147483647,this._isSyncWriting=!1,this._syncCalls=0}write(e,t){if(this._pendingData>Tu)throw new Error("write data discarded, use flow control to avoid losing data");if(!this._writeBuffer.length){if(this._bufferOffset=0,this._didUserInput){this._didUserInput=!1,this._pendingData+=e.length,this._writeBuffer.push(e),this._callbacks.push(t),this._innerWrite();return}setTimeout(()=>this._innerWrite())}this._pendingData+=e.length,this._writeBuffer.push(e),this._callbacks.push(t)}_innerWrite(e=0,t=!0){let i=e||performance.now();for(;this._writeBuffer.length>this._bufferOffset;){let r=this._writeBuffer[this._bufferOffset],o=this._action(r,t);if(o){let n=a=>performance.now()-i>=wn?setTimeout(()=>this._innerWrite(0,a)):this._innerWrite(i,a);o.catch(a=>(queueMicrotask(()=>{throw a}),Promise.resolve(!1))).then(n);return}let s=this._callbacks[this._bufferOffset];if(s&&s(),this._bufferOffset++,this._pendingData-=r.length,performance.now()-i>=wn)break}this._writeBuffer.length>this._bufferOffset?(this._bufferOffset>zu&&(this._writeBuffer=this._writeBuffer.slice(this._bufferOffset),this._callbacks=this._callbacks.slice(this._bufferOffset),this._bufferOffset=0),setTimeout(()=>this._innerWrite())):(this._writeBuffer.length=0,this._callbacks.length=0,this._pendingData=0,this._bufferOffset=0),this._onWriteParsed.fire()}},ko=class{constructor(e){this._bufferService=e,this._nextId=1,this._entriesWithId=new Map,this._dataByLinkId=new Map}registerLink(e){let t=this._bufferService.buffer;if(e.id===void 0){let a=t.addMarker(t.ybase+t.y),l={data:e,id:this._nextId++,lines:[a]};return a.onDispose(()=>this._removeMarkerFromLink(l,a)),this._dataByLinkId.set(l.id,l),l.id}let i=e,r=this._getEntryIdKey(i),o=this._entriesWithId.get(r);if(o)return this.addLineToLink(o.id,t.ybase+t.y),o.id;let s=t.addMarker(t.ybase+t.y),n={id:this._nextId++,key:this._getEntryIdKey(i),data:i,lines:[s]};return s.onDispose(()=>this._removeMarkerFromLink(n,s)),this._entriesWithId.set(n.key,n),this._dataByLinkId.set(n.id,n),n.id}addLineToLink(e,t){let i=this._dataByLinkId.get(e);if(i&&i.lines.every(r=>r.line!==t)){let r=this._bufferService.buffer.addMarker(t);i.lines.push(r),r.onDispose(()=>this._removeMarkerFromLink(i,r))}}getLinkData(e){return this._dataByLinkId.get(e)?.data}_getEntryIdKey(e){return`${e.id};;${e.uri}`}_removeMarkerFromLink(e,t){let i=e.lines.indexOf(t);i!==-1&&(e.lines.splice(i,1),e.lines.length===0&&(e.data.id!==void 0&&this._entriesWithId.delete(e.key),this._dataByLinkId.delete(e.id)))}};ko=fe([F(0,Ne)],ko);var Sn=!1,Iu=class extends te{constructor(e){super(),this._windowsWrappingHeuristics=this._register(new Zt),this._onBinary=this._register(new N),this.onBinary=this._onBinary.event,this._onData=this._register(new N),this.onData=this._onData.event,this._onLineFeed=this._register(new N),this.onLineFeed=this._onLineFeed.event,this._onResize=this._register(new N),this.onResize=this._onResize.event,this._onWriteParsed=this._register(new N),this.onWriteParsed=this._onWriteParsed.event,this._onScroll=this._register(new N),this._instantiationService=new tu,this.optionsService=this._register(new uu(e)),this._instantiationService.setService(Be,this.optionsService),this._bufferService=this._register(this._instantiationService.createInstance(wo)),this._instantiationService.setService(Ne,this._bufferService),this._logService=this._register(this._instantiationService.createInstance(bo)),this._instantiationService.setService(Mn,this._logService),this.coreService=this._register(this._instantiationService.createInstance(So)),this._instantiationService.setService(qt,this.coreService),this.coreMouseService=this._register(this._instantiationService.createInstance(yo)),this._instantiationService.setService(Gn,this.coreMouseService),this.unicodeService=this._register(this._instantiationService.createInstance(Ht)),this._instantiationService.setService(Cl,this.unicodeService),this._charsetService=this._instantiationService.createInstance(fu),this._instantiationService.setService(xl,this._charsetService),this._oscLinkService=this._instantiationService.createInstance(ko),this._instantiationService.setService(On,this._oscLinkService),this._inputHandler=this._register(new Pu(this._bufferService,this._charsetService,this.coreService,this._logService,this.optionsService,this._oscLinkService,this.coreMouseService,this.unicodeService)),this._register(Ge.forward(this._inputHandler.onLineFeed,this._onLineFeed)),this._register(this._inputHandler),this._register(Ge.forward(this._bufferService.onResize,this._onResize)),this._register(Ge.forward(this.coreService.onData,this._onData)),this._register(Ge.forward(this.coreService.onBinary,this._onBinary)),this._register(this.coreService.onRequestScrollToBottom(()=>this.scrollToBottom(!0))),this._register(this.coreService.onUserInput(()=>this._writeBuffer.handleUserInput())),this._register(this.optionsService.onMultipleOptionChange(["windowsMode","windowsPty"],()=>this._handleWindowsPtyOptionChange())),this._register(this._bufferService.onScroll(()=>{this._onScroll.fire({position:this._bufferService.buffer.ydisp}),this._inputHandler.markRangeDirty(this._bufferService.buffer.scrollTop,this._bufferService.buffer.scrollBottom)})),this._writeBuffer=this._register(new Au((t,i)=>this._inputHandler.parse(t,i))),this._register(Ge.forward(this._writeBuffer.onWriteParsed,this._onWriteParsed))}get onScroll(){return this._onScrollApi||(this._onScrollApi=this._register(new N),this._onScroll.event(e=>{this._onScrollApi?.fire(e.position)})),this._onScrollApi.event}get cols(){return this._bufferService.cols}get rows(){return this._bufferService.rows}get buffers(){return this._bufferService.buffers}get options(){return this.optionsService.options}set options(e){for(let t in e)this.optionsService.options[t]=e[t]}write(e,t){this._writeBuffer.write(e,t)}writeSync(e,t){this._logService.logLevel<=3&&!Sn&&(this._logService.warn("writeSync is unreliable and will be removed soon."),Sn=!0),this._writeBuffer.writeSync(e,t)}input(e,t=!0){this.coreService.triggerDataEvent(e,t)}resize(e,t){isNaN(e)||isNaN(t)||(e=Math.max(e,ya),t=Math.max(t,xa),this._bufferService.resize(e,t))}scroll(e,t=!1){this._bufferService.scroll(e,t)}scrollLines(e,t){this._bufferService.scrollLines(e,t)}scrollPages(e){this.scrollLines(e*(this.rows-1))}scrollToTop(){this.scrollLines(-this._bufferService.buffer.ydisp)}scrollToBottom(e){this.scrollLines(this._bufferService.buffer.ybase-this._bufferService.buffer.ydisp)}scrollToLine(e){let t=e-this._bufferService.buffer.ydisp;t!==0&&this.scrollLines(t)}registerEscHandler(e,t){return this._inputHandler.registerEscHandler(e,t)}registerDcsHandler(e,t){return this._inputHandler.registerDcsHandler(e,t)}registerCsiHandler(e,t){return this._inputHandler.registerCsiHandler(e,t)}registerOscHandler(e,t){return this._inputHandler.registerOscHandler(e,t)}_setup(){this._handleWindowsPtyOptionChange()}reset(){this._inputHandler.reset(),this._bufferService.reset(),this._charsetService.reset(),this.coreService.reset(),this.coreMouseService.reset()}_handleWindowsPtyOptionChange(){let e=!1,t=this.optionsService.rawOptions.windowsPty;t&&t.buildNumber!==void 0&&t.buildNumber!==void 0?e=t.backend==="conpty"&&t.buildNumber<21376:this.optionsService.rawOptions.windowsMode&&(e=!0),e?this._enableWindowsWrappingHeuristics():this._windowsWrappingHeuristics.clear()}_enableWindowsWrappingHeuristics(){if(!this._windowsWrappingHeuristics.value){let e=[];e.push(this.onLineFeed(un.bind(null,this._bufferService))),e.push(this.registerCsiHandler({final:"H"},()=>(un(this._bufferService),!1))),this._windowsWrappingHeuristics.value=ue(()=>{for(let t of e)t.dispose()})}}},Gu={48:["0",")"],49:["1","!"],50:["2","@"],51:["3","#"],52:["4","$"],53:["5","%"],54:["6","^"],55:["7","&"],56:["8","*"],57:["9","("],186:[";",":"],187:["=","+"],188:[",","<"],189:["-","_"],190:[".",">"],191:["/","?"],192:["`","~"],219:["[","{"],220:["\\","|"],221:["]","}"],222:["'",'"']};function Mu(e,t,i,r){let o={type:0,cancel:!1,key:void 0},s=(e.shiftKey?1:0)|(e.altKey?2:0)|(e.ctrlKey?4:0)|(e.metaKey?8:0);switch(e.keyCode){case 0:e.key==="UIKeyInputUpArrow"?t?o.key=A.ESC+"OA":o.key=A.ESC+"[A":e.key==="UIKeyInputLeftArrow"?t?o.key=A.ESC+"OD":o.key=A.ESC+"[D":e.key==="UIKeyInputRightArrow"?t?o.key=A.ESC+"OC":o.key=A.ESC+"[C":e.key==="UIKeyInputDownArrow"&&(t?o.key=A.ESC+"OB":o.key=A.ESC+"[B");break;case 8:o.key=e.ctrlKey?"\b":A.DEL,e.altKey&&(o.key=A.ESC+o.key);break;case 9:if(e.shiftKey){o.key=A.ESC+"[Z";break}o.key=A.HT,o.cancel=!0;break;case 13:o.key=e.altKey?A.ESC+A.CR:A.CR,o.cancel=!0;break;case 27:o.key=A.ESC,e.altKey&&(o.key=A.ESC+A.ESC),o.cancel=!0;break;case 37:if(e.metaKey)break;s?o.key=A.ESC+"[1;"+(s+1)+"D":t?o.key=A.ESC+"OD":o.key=A.ESC+"[D";break;case 39:if(e.metaKey)break;s?o.key=A.ESC+"[1;"+(s+1)+"C":t?o.key=A.ESC+"OC":o.key=A.ESC+"[C";break;case 38:if(e.metaKey)break;s?o.key=A.ESC+"[1;"+(s+1)+"A":t?o.key=A.ESC+"OA":o.key=A.ESC+"[A";break;case 40:if(e.metaKey)break;s?o.key=A.ESC+"[1;"+(s+1)+"B":t?o.key=A.ESC+"OB":o.key=A.ESC+"[B";break;case 45:!e.shiftKey&&!e.ctrlKey&&(o.key=A.ESC+"[2~");break;case 46:s?o.key=A.ESC+"[3;"+(s+1)+"~":o.key=A.ESC+"[3~";break;case 36:s?o.key=A.ESC+"[1;"+(s+1)+"H":t?o.key=A.ESC+"OH":o.key=A.ESC+"[H";break;case 35:s?o.key=A.ESC+"[1;"+(s+1)+"F":t?o.key=A.ESC+"OF":o.key=A.ESC+"[F";break;case 33:e.shiftKey?o.type=2:e.ctrlKey?o.key=A.ESC+"[5;"+(s+1)+"~":o.key=A.ESC+"[5~";break;case 34:e.shiftKey?o.type=3:e.ctrlKey?o.key=A.ESC+"[6;"+(s+1)+"~":o.key=A.ESC+"[6~";break;case 112:s?o.key=A.ESC+"[1;"+(s+1)+"P":o.key=A.ESC+"OP";break;case 113:s?o.key=A.ESC+"[1;"+(s+1)+"Q":o.key=A.ESC+"OQ";break;case 114:s?o.key=A.ESC+"[1;"+(s+1)+"R":o.key=A.ESC+"OR";break;case 115:s?o.key=A.ESC+"[1;"+(s+1)+"S":o.key=A.ESC+"OS";break;case 116:s?o.key=A.ESC+"[15;"+(s+1)+"~":o.key=A.ESC+"[15~";break;case 117:s?o.key=A.ESC+"[17;"+(s+1)+"~":o.key=A.ESC+"[17~";break;case 118:s?o.key=A.ESC+"[18;"+(s+1)+"~":o.key=A.ESC+"[18~";break;case 119:s?o.key=A.ESC+"[19;"+(s+1)+"~":o.key=A.ESC+"[19~";break;case 120:s?o.key=A.ESC+"[20;"+(s+1)+"~":o.key=A.ESC+"[20~";break;case 121:s?o.key=A.ESC+"[21;"+(s+1)+"~":o.key=A.ESC+"[21~";break;case 122:s?o.key=A.ESC+"[23;"+(s+1)+"~":o.key=A.ESC+"[23~";break;case 123:s?o.key=A.ESC+"[24;"+(s+1)+"~":o.key=A.ESC+"[24~";break;default:if(e.ctrlKey&&!e.shiftKey&&!e.altKey&&!e.metaKey)e.keyCode>=65&&e.keyCode<=90?o.key=String.fromCharCode(e.keyCode-64):e.keyCode===32?o.key=A.NUL:e.keyCode>=51&&e.keyCode<=55?o.key=String.fromCharCode(e.keyCode-51+27):e.keyCode===56?o.key=A.DEL:e.keyCode===219?o.key=A.ESC:e.keyCode===220?o.key=A.FS:e.keyCode===221&&(o.key=A.GS);else if((!i||r)&&e.altKey&&!e.metaKey){let n=Gu[e.keyCode]?.[e.shiftKey?1:0];if(n)o.key=A.ESC+n;else if(e.keyCode>=65&&e.keyCode<=90){let a=e.ctrlKey?e.keyCode-64:e.keyCode+32,l=String.fromCharCode(a);e.shiftKey&&(l=l.toUpperCase()),o.key=A.ESC+l}else if(e.keyCode===32)o.key=A.ESC+(e.ctrlKey?A.NUL:" ");else if(e.key==="Dead"&&e.code.startsWith("Key")){let a=e.code.slice(3,4);e.shiftKey||(a=a.toLowerCase()),o.key=A.ESC+a,o.cancel=!0}}else i&&!e.altKey&&!e.ctrlKey&&!e.shiftKey&&e.metaKey?e.keyCode===65&&(o.type=1):e.key&&!e.ctrlKey&&!e.altKey&&!e.metaKey&&e.keyCode>=48&&e.key.length===1?o.key=e.key:e.key&&e.ctrlKey&&(e.key==="_"&&(o.key=A.US),e.key==="@"&&(o.key=A.NUL));break}return o}var be=0,Ou=class{constructor(e){this._getKey=e,this._array=[],this._insertedValues=[],this._flushInsertedTask=new sr,this._isFlushingInserted=!1,this._deletedIndices=[],this._flushDeletedTask=new sr,this._isFlushingDeleted=!1}clear(){this._array.length=0,this._insertedValues.length=0,this._flushInsertedTask.clear(),this._isFlushingInserted=!1,this._deletedIndices.length=0,this._flushDeletedTask.clear(),this._isFlushingDeleted=!1}insert(e){this._flushCleanupDeleted(),this._insertedValues.length===0&&this._flushInsertedTask.enqueue(()=>this._flushInserted()),this._insertedValues.push(e)}_flushInserted(){let e=this._insertedValues.sort((o,s)=>this._getKey(o)-this._getKey(s)),t=0,i=0,r=new Array(this._array.length+this._insertedValues.length);for(let o=0;o<r.length;o++)i>=this._array.length||this._getKey(e[t])<=this._getKey(this._array[i])?(r[o]=e[t],t++):r[o]=this._array[i++];this._array=r,this._insertedValues.length=0}_flushCleanupInserted(){!this._isFlushingInserted&&this._insertedValues.length>0&&this._flushInsertedTask.flush()}delete(e){if(this._flushCleanupInserted(),this._array.length===0)return!1;let t=this._getKey(e);if(t===void 0||(be=this._search(t),be===-1)||this._getKey(this._array[be])!==t)return!1;do if(this._array[be]===e)return this._deletedIndices.length===0&&this._flushDeletedTask.enqueue(()=>this._flushDeleted()),this._deletedIndices.push(be),!0;while(++be<this._array.length&&this._getKey(this._array[be])===t);return!1}_flushDeleted(){this._isFlushingDeleted=!0;let e=this._deletedIndices.sort((o,s)=>o-s),t=0,i=new Array(this._array.length-e.length),r=0;for(let o=0;o<this._array.length;o++)e[t]===o?t++:i[r++]=this._array[o];this._array=i,this._deletedIndices.length=0,this._isFlushingDeleted=!1}_flushCleanupDeleted(){!this._isFlushingDeleted&&this._deletedIndices.length>0&&this._flushDeletedTask.flush()}*getKeyIterator(e){if(this._flushCleanupInserted(),this._flushCleanupDeleted(),this._array.length!==0&&(be=this._search(e),!(be<0||be>=this._array.length)&&this._getKey(this._array[be])===e))do yield this._array[be];while(++be<this._array.length&&this._getKey(this._array[be])===e)}forEachByKey(e,t){if(this._flushCleanupInserted(),this._flushCleanupDeleted(),this._array.length!==0&&(be=this._search(e),!(be<0||be>=this._array.length)&&this._getKey(this._array[be])===e))do t(this._array[be]);while(++be<this._array.length&&this._getKey(this._array[be])===e)}values(){return this._flushCleanupInserted(),this._flushCleanupDeleted(),[...this._array].values()}_search(e){let t=0,i=this._array.length-1;for(;i>=t;){let r=t+i>>1,o=this._getKey(this._array[r]);if(o>e)i=r-1;else if(o<e)t=r+1;else{for(;r>0&&this._getKey(this._array[r-1])===e;)r--;return r}}return t}},Hr=0,yn=0,Lu=class extends te{constructor(){super(),this._decorations=new Ou(e=>e?.marker.line),this._onDecorationRegistered=this._register(new N),this.onDecorationRegistered=this._onDecorationRegistered.event,this._onDecorationRemoved=this._register(new N),this.onDecorationRemoved=this._onDecorationRemoved.event,this._register(ue(()=>this.reset()))}get decorations(){return this._decorations.values()}registerDecoration(e){if(e.marker.isDisposed)return;let t=new Ru(e);if(t){let i=t.marker.onDispose(()=>t.dispose()),r=t.onDispose(()=>{r.dispose(),t&&(this._decorations.delete(t)&&this._onDecorationRemoved.fire(t),i.dispose())});this._decorations.insert(t),this._onDecorationRegistered.fire(t)}return t}reset(){for(let e of this._decorations.values())e.dispose();this._decorations.clear()}*getDecorationsAtCell(e,t,i){let r=0,o=0;for(let s of this._decorations.getKeyIterator(t))r=s.options.x??0,o=r+(s.options.width??1),e>=r&&e<o&&(!i||(s.options.layer??"bottom")===i)&&(yield s)}forEachDecorationAtCell(e,t,i,r){this._decorations.forEachByKey(t,o=>{Hr=o.options.x??0,yn=Hr+(o.options.width??1),e>=Hr&&e<yn&&(!i||(o.options.layer??"bottom")===i)&&r(o)})}},Ru=class extends Gt{constructor(e){super(),this.options=e,this.onRenderEmitter=this.add(new N),this.onRender=this.onRenderEmitter.event,this._onDispose=this.add(new N),this.onDispose=this._onDispose.event,this._cachedBg=null,this._cachedFg=null,this.marker=e.marker,this.options.overviewRulerOptions&&!this.options.overviewRulerOptions.position&&(this.options.overviewRulerOptions.position="full")}get backgroundColorRGB(){return this._cachedBg===null&&(this.options.backgroundColor?this._cachedBg=ge.toColor(this.options.backgroundColor):this._cachedBg=void 0),this._cachedBg}get foregroundColorRGB(){return this._cachedFg===null&&(this.options.foregroundColor?this._cachedFg=ge.toColor(this.options.foregroundColor):this._cachedFg=void 0),this._cachedFg}dispose(){this._onDispose.fire(),super.dispose()}},Nu=1e3,Bu=class{constructor(e,t=Nu){this._renderCallback=e,this._debounceThresholdMS=t,this._lastRefreshMs=0,this._additionalRefreshRequested=!1}dispose(){this._refreshTimeoutID&&clearTimeout(this._refreshTimeoutID)}refresh(e,t,i){this._rowCount=i,e=e!==void 0?e:0,t=t!==void 0?t:this._rowCount-1,this._rowStart=this._rowStart!==void 0?Math.min(this._rowStart,e):e,this._rowEnd=this._rowEnd!==void 0?Math.max(this._rowEnd,t):t;let r=performance.now();if(r-this._lastRefreshMs>=this._debounceThresholdMS)this._lastRefreshMs=r,this._innerRefresh();else if(!this._additionalRefreshRequested){let o=r-this._lastRefreshMs,s=this._debounceThresholdMS-o;this._additionalRefreshRequested=!0,this._refreshTimeoutID=window.setTimeout(()=>{this._lastRefreshMs=performance.now(),this._innerRefresh(),this._additionalRefreshRequested=!1,this._refreshTimeoutID=void 0},s)}}_innerRefresh(){if(this._rowStart===void 0||this._rowEnd===void 0||this._rowCount===void 0)return;let e=Math.max(this._rowStart,0),t=Math.min(this._rowEnd,this._rowCount-1);this._rowStart=void 0,this._rowEnd=void 0,this._renderCallback(e,t)}},xn=20,Cn=!1,nr=class extends te{constructor(e,t,i,r){super(),this._terminal=e,this._coreBrowserService=i,this._renderService=r,this._rowColumns=new WeakMap,this._liveRegionLineCount=0,this._charsToConsume=[],this._charsToAnnounce="";let o=this._coreBrowserService.mainDocument;this._accessibilityContainer=o.createElement("div"),this._accessibilityContainer.classList.add("xterm-accessibility"),this._rowContainer=o.createElement("div"),this._rowContainer.setAttribute("role","list"),this._rowContainer.classList.add("xterm-accessibility-tree"),this._rowElements=[];for(let s=0;s<this._terminal.rows;s++)this._rowElements[s]=this._createAccessibilityTreeNode(),this._rowContainer.appendChild(this._rowElements[s]);if(this._topBoundaryFocusListener=s=>this._handleBoundaryFocus(s,0),this._bottomBoundaryFocusListener=s=>this._handleBoundaryFocus(s,1),this._rowElements[0].addEventListener("focus",this._topBoundaryFocusListener),this._rowElements[this._rowElements.length-1].addEventListener("focus",this._bottomBoundaryFocusListener),this._accessibilityContainer.appendChild(this._rowContainer),this._liveRegion=o.createElement("div"),this._liveRegion.classList.add("live-region"),this._liveRegion.setAttribute("aria-live","assertive"),this._accessibilityContainer.appendChild(this._liveRegion),this._liveRegionDebouncer=this._register(new Bu(this._renderRows.bind(this))),!this._terminal.element)throw new Error("Cannot enable accessibility before Terminal.open");Cn?(this._accessibilityContainer.classList.add("debug"),this._rowContainer.classList.add("debug"),this._debugRootContainer=o.createElement("div"),this._debugRootContainer.classList.add("xterm"),this._debugRootContainer.appendChild(o.createTextNode("------start a11y------")),this._debugRootContainer.appendChild(this._accessibilityContainer),this._debugRootContainer.appendChild(o.createTextNode("------end a11y------")),this._terminal.element.insertAdjacentElement("afterend",this._debugRootContainer)):this._terminal.element.insertAdjacentElement("afterbegin",this._accessibilityContainer),this._register(this._terminal.onResize(s=>this._handleResize(s.rows))),this._register(this._terminal.onRender(s=>this._refreshRows(s.start,s.end))),this._register(this._terminal.onScroll(()=>this._refreshRows())),this._register(this._terminal.onA11yChar(s=>this._handleChar(s))),this._register(this._terminal.onLineFeed(()=>this._handleChar(`
`))),this._register(this._terminal.onA11yTab(s=>this._handleTab(s))),this._register(this._terminal.onKey(s=>this._handleKey(s.key))),this._register(this._terminal.onBlur(()=>this._clearLiveRegion())),this._register(this._renderService.onDimensionsChange(()=>this._refreshRowsDimensions())),this._register(Q(o,"selectionchange",()=>this._handleSelectionChange())),this._register(this._coreBrowserService.onDprChange(()=>this._refreshRowsDimensions())),this._refreshRowsDimensions(),this._refreshRows(),this._register(ue(()=>{Cn?this._debugRootContainer.remove():this._accessibilityContainer.remove(),this._rowElements.length=0}))}_handleTab(e){for(let t=0;t<e;t++)this._handleChar(" ")}_handleChar(e){this._liveRegionLineCount<xn+1&&(this._charsToConsume.length>0?this._charsToConsume.shift()!==e&&(this._charsToAnnounce+=e):this._charsToAnnounce+=e,e===`
`&&(this._liveRegionLineCount++,this._liveRegionLineCount===xn+1&&(this._liveRegion.textContent+=Fr.get())))}_clearLiveRegion(){this._liveRegion.textContent="",this._liveRegionLineCount=0}_handleKey(e){this._clearLiveRegion(),/\p{Control}/u.test(e)||this._charsToConsume.push(e)}_refreshRows(e,t){this._liveRegionDebouncer.refresh(e,t,this._terminal.rows)}_renderRows(e,t){let i=this._terminal.buffer,r=i.lines.length.toString();for(let o=e;o<=t;o++){let s=i.lines.get(i.ydisp+o),n=[],a=s?.translateToString(!0,void 0,void 0,n)||"",l=(i.ydisp+o+1).toString(),d=this._rowElements[o];d&&(a.length===0?(d.textContent=" ",this._rowColumns.set(d,[0,1])):(d.textContent=a,this._rowColumns.set(d,n)),d.setAttribute("aria-posinset",l),d.setAttribute("aria-setsize",r),this._alignRowWidth(d))}this._announceCharacters()}_announceCharacters(){this._charsToAnnounce.length!==0&&(this._liveRegion.textContent+=this._charsToAnnounce,this._charsToAnnounce="")}_handleBoundaryFocus(e,t){let i=e.target,r=this._rowElements[t===0?1:this._rowElements.length-2],o=i.getAttribute("aria-posinset"),s=t===0?"1":`${this._terminal.buffer.lines.length}`;if(o===s||e.relatedTarget!==r)return;let n,a;if(t===0?(n=i,a=this._rowElements.pop(),this._rowContainer.removeChild(a)):(n=this._rowElements.shift(),a=i,this._rowContainer.removeChild(n)),n.removeEventListener("focus",this._topBoundaryFocusListener),a.removeEventListener("focus",this._bottomBoundaryFocusListener),t===0){let l=this._createAccessibilityTreeNode();this._rowElements.unshift(l),this._rowContainer.insertAdjacentElement("afterbegin",l)}else{let l=this._createAccessibilityTreeNode();this._rowElements.push(l),this._rowContainer.appendChild(l)}this._rowElements[0].addEventListener("focus",this._topBoundaryFocusListener),this._rowElements[this._rowElements.length-1].addEventListener("focus",this._bottomBoundaryFocusListener),this._terminal.scrollLines(t===0?-1:1),this._rowElements[t===0?1:this._rowElements.length-2].focus(),e.preventDefault(),e.stopImmediatePropagation()}_handleSelectionChange(){if(this._rowElements.length===0)return;let e=this._coreBrowserService.mainDocument.getSelection();if(!e)return;if(e.isCollapsed){this._rowContainer.contains(e.anchorNode)&&this._terminal.clearSelection();return}if(!e.anchorNode||!e.focusNode){console.error("anchorNode and/or focusNode are null");return}let t={node:e.anchorNode,offset:e.anchorOffset},i={node:e.focusNode,offset:e.focusOffset};if((t.node.compareDocumentPosition(i.node)&Node.DOCUMENT_POSITION_PRECEDING||t.node===i.node&&t.offset>i.offset)&&([t,i]=[i,t]),t.node.compareDocumentPosition(this._rowElements[0])&(Node.DOCUMENT_POSITION_CONTAINED_BY|Node.DOCUMENT_POSITION_FOLLOWING)&&(t={node:this._rowElements[0].childNodes[0],offset:0}),!this._rowContainer.contains(t.node))return;let r=this._rowElements.slice(-1)[0];if(i.node.compareDocumentPosition(r)&(Node.DOCUMENT_POSITION_CONTAINED_BY|Node.DOCUMENT_POSITION_PRECEDING)&&(i={node:r,offset:r.textContent?.length??0}),!this._rowContainer.contains(i.node))return;let o=({node:a,offset:l})=>{let d=a instanceof Text?a.parentNode:a,h=parseInt(d?.getAttribute("aria-posinset"),10)-1;if(isNaN(h))return console.warn("row is invalid. Race condition?"),null;let c=this._rowColumns.get(d);if(!c)return console.warn("columns is null. Race condition?"),null;let u=l<c.length?c[l]:c.slice(-1)[0]+1;return u>=this._terminal.cols&&(++h,u=0),{row:h,column:u}},s=o(t),n=o(i);if(!(!s||!n)){if(s.row>n.row||s.row===n.row&&s.column>=n.column)throw new Error("invalid range");this._terminal.select(s.column,s.row,(n.row-s.row)*this._terminal.cols-s.column+n.column)}}_handleResize(e){this._rowElements[this._rowElements.length-1].removeEventListener("focus",this._bottomBoundaryFocusListener);for(let t=this._rowContainer.children.length;t<this._terminal.rows;t++)this._rowElements[t]=this._createAccessibilityTreeNode(),this._rowContainer.appendChild(this._rowElements[t]);for(;this._rowElements.length>e;)this._rowContainer.removeChild(this._rowElements.pop());this._rowElements[this._rowElements.length-1].addEventListener("focus",this._bottomBoundaryFocusListener),this._refreshRowsDimensions()}_createAccessibilityTreeNode(){let e=this._coreBrowserService.mainDocument.createElement("div");return e.setAttribute("role","listitem"),e.tabIndex=-1,this._refreshRowDimensions(e),e}_refreshRowsDimensions(){if(this._renderService.dimensions.css.cell.height){Object.assign(this._accessibilityContainer.style,{width:`${this._renderService.dimensions.css.canvas.width}px`,fontSize:`${this._terminal.options.fontSize}px`}),this._rowElements.length!==this._terminal.rows&&this._handleResize(this._terminal.rows);for(let e=0;e<this._terminal.rows;e++)this._refreshRowDimensions(this._rowElements[e]),this._alignRowWidth(this._rowElements[e])}}_refreshRowDimensions(e){e.style.height=`${this._renderService.dimensions.css.cell.height}px`}_alignRowWidth(e){e.style.transform="";let t=e.getBoundingClientRect().width,i=this._rowColumns.get(e)?.slice(-1)?.[0];if(!i)return;let r=i*this._renderService.dimensions.css.cell.width;e.style.transform=`scaleX(${r/t})`}};nr=fe([F(1,Eo),F(2,_t),F(3,bt)],nr);var Do=class extends te{constructor(e,t,i,r,o){super(),this._element=e,this._mouseService=t,this._renderService=i,this._bufferService=r,this._linkProviderService=o,this._linkCacheDisposables=[],this._isMouseOut=!0,this._wasResized=!1,this._activeLine=-1,this._onShowLinkUnderline=this._register(new N),this.onShowLinkUnderline=this._onShowLinkUnderline.event,this._onHideLinkUnderline=this._register(new N),this.onHideLinkUnderline=this._onHideLinkUnderline.event,this._register(ue(()=>{Ft(this._linkCacheDisposables),this._linkCacheDisposables.length=0,this._lastMouseEvent=void 0,this._activeProviderReplies?.clear()})),this._register(this._bufferService.onResize(()=>{this._clearCurrentLink(),this._wasResized=!0})),this._register(Q(this._element,"mouseleave",()=>{this._isMouseOut=!0,this._clearCurrentLink()})),this._register(Q(this._element,"mousemove",this._handleMouseMove.bind(this))),this._register(Q(this._element,"mousedown",this._handleMouseDown.bind(this))),this._register(Q(this._element,"mouseup",this._handleMouseUp.bind(this)))}get currentLink(){return this._currentLink}_handleMouseMove(e){this._lastMouseEvent=e;let t=this._positionFromMouseEvent(e,this._element,this._mouseService);if(!t)return;this._isMouseOut=!1;let i=e.composedPath();for(let r=0;r<i.length;r++){let o=i[r];if(o.classList.contains("xterm"))break;if(o.classList.contains("xterm-hover"))return}(!this._lastBufferCell||t.x!==this._lastBufferCell.x||t.y!==this._lastBufferCell.y)&&(this._handleHover(t),this._lastBufferCell=t)}_handleHover(e){if(this._activeLine!==e.y||this._wasResized){this._clearCurrentLink(),this._askForLink(e,!1),this._wasResized=!1;return}this._currentLink&&this._linkAtPosition(this._currentLink.link,e)||(this._clearCurrentLink(),this._askForLink(e,!0))}_askForLink(e,t){(!this._activeProviderReplies||!t)&&(this._activeProviderReplies?.forEach(r=>{r?.forEach(o=>{o.link.dispose&&o.link.dispose()})}),this._activeProviderReplies=new Map,this._activeLine=e.y);let i=!1;for(let[r,o]of this._linkProviderService.linkProviders.entries())t?this._activeProviderReplies?.get(r)&&(i=this._checkLinkProviderResult(r,e,i)):o.provideLinks(e.y,s=>{if(this._isMouseOut)return;let n=s?.map(a=>({link:a}));this._activeProviderReplies?.set(r,n),i=this._checkLinkProviderResult(r,e,i),this._activeProviderReplies?.size===this._linkProviderService.linkProviders.length&&this._removeIntersectingLinks(e.y,this._activeProviderReplies)})}_removeIntersectingLinks(e,t){let i=new Set;for(let r=0;r<t.size;r++){let o=t.get(r);if(o)for(let s=0;s<o.length;s++){let n=o[s],a=n.link.range.start.y<e?0:n.link.range.start.x,l=n.link.range.end.y>e?this._bufferService.cols:n.link.range.end.x;for(let d=a;d<=l;d++){if(i.has(d)){o.splice(s--,1);break}i.add(d)}}}}_checkLinkProviderResult(e,t,i){if(!this._activeProviderReplies)return i;let r=this._activeProviderReplies.get(e),o=!1;for(let s=0;s<e;s++)(!this._activeProviderReplies.has(s)||this._activeProviderReplies.get(s))&&(o=!0);if(!o&&r){let s=r.find(n=>this._linkAtPosition(n.link,t));s&&(i=!0,this._handleNewLink(s))}if(this._activeProviderReplies.size===this._linkProviderService.linkProviders.length&&!i)for(let s=0;s<this._activeProviderReplies.size;s++){let n=this._activeProviderReplies.get(s)?.find(a=>this._linkAtPosition(a.link,t));if(n){i=!0,this._handleNewLink(n);break}}return i}_handleMouseDown(){this._mouseDownLink=this._currentLink}_handleMouseUp(e){if(!this._currentLink)return;let t=this._positionFromMouseEvent(e,this._element,this._mouseService);t&&this._mouseDownLink&&Wu(this._mouseDownLink.link,this._currentLink.link)&&this._linkAtPosition(this._currentLink.link,t)&&this._currentLink.link.activate(e,this._currentLink.link.text)}_clearCurrentLink(e,t){!this._currentLink||!this._lastMouseEvent||(!e||!t||this._currentLink.link.range.start.y>=e&&this._currentLink.link.range.end.y<=t)&&(this._linkLeave(this._element,this._currentLink.link,this._lastMouseEvent),this._currentLink=void 0,Ft(this._linkCacheDisposables),this._linkCacheDisposables.length=0)}_handleNewLink(e){if(!this._lastMouseEvent)return;let t=this._positionFromMouseEvent(this._lastMouseEvent,this._element,this._mouseService);t&&this._linkAtPosition(e.link,t)&&(this._currentLink=e,this._currentLink.state={decorations:{underline:e.link.decorations===void 0?!0:e.link.decorations.underline,pointerCursor:e.link.decorations===void 0?!0:e.link.decorations.pointerCursor},isHovered:!0},this._linkHover(this._element,e.link,this._lastMouseEvent),e.link.decorations={},Object.defineProperties(e.link.decorations,{pointerCursor:{get:()=>this._currentLink?.state?.decorations.pointerCursor,set:i=>{this._currentLink?.state&&this._currentLink.state.decorations.pointerCursor!==i&&(this._currentLink.state.decorations.pointerCursor=i,this._currentLink.state.isHovered&&this._element.classList.toggle("xterm-cursor-pointer",i))}},underline:{get:()=>this._currentLink?.state?.decorations.underline,set:i=>{this._currentLink?.state&&this._currentLink?.state?.decorations.underline!==i&&(this._currentLink.state.decorations.underline=i,this._currentLink.state.isHovered&&this._fireUnderlineEvent(e.link,i))}}}),this._linkCacheDisposables.push(this._renderService.onRenderedViewportChange(i=>{if(!this._currentLink)return;let r=i.start===0?0:i.start+1+this._bufferService.buffer.ydisp,o=this._bufferService.buffer.ydisp+1+i.end;if(this._currentLink.link.range.start.y>=r&&this._currentLink.link.range.end.y<=o&&(this._clearCurrentLink(r,o),this._lastMouseEvent)){let s=this._positionFromMouseEvent(this._lastMouseEvent,this._element,this._mouseService);s&&this._askForLink(s,!1)}})))}_linkHover(e,t,i){this._currentLink?.state&&(this._currentLink.state.isHovered=!0,this._currentLink.state.decorations.underline&&this._fireUnderlineEvent(t,!0),this._currentLink.state.decorations.pointerCursor&&e.classList.add("xterm-cursor-pointer")),t.hover&&t.hover(i,t.text)}_fireUnderlineEvent(e,t){let i=e.range,r=this._bufferService.buffer.ydisp,o=this._createLinkUnderlineEvent(i.start.x-1,i.start.y-r-1,i.end.x,i.end.y-r-1,void 0);(t?this._onShowLinkUnderline:this._onHideLinkUnderline).fire(o)}_linkLeave(e,t,i){this._currentLink?.state&&(this._currentLink.state.isHovered=!1,this._currentLink.state.decorations.underline&&this._fireUnderlineEvent(t,!1),this._currentLink.state.decorations.pointerCursor&&e.classList.remove("xterm-cursor-pointer")),t.leave&&t.leave(i,t.text)}_linkAtPosition(e,t){let i=e.range.start.y*this._bufferService.cols+e.range.start.x,r=e.range.end.y*this._bufferService.cols+e.range.end.x,o=t.y*this._bufferService.cols+t.x;return i<=o&&o<=r}_positionFromMouseEvent(e,t,i){let r=i.getCoords(e,t,this._bufferService.cols,this._bufferService.rows);if(r)return{x:r[0],y:r[1]+this._bufferService.buffer.ydisp}}_createLinkUnderlineEvent(e,t,i,r,o){return{x1:e,y1:t,x2:i,y2:r,cols:this._bufferService.cols,fg:o}}};Do=fe([F(1,Po),F(2,bt),F(3,Ne),F(4,Rn)],Do);function Wu(e,t){return e.text===t.text&&e.range.start.x===t.range.start.x&&e.range.start.y===t.range.start.y&&e.range.end.x===t.range.end.x&&e.range.end.y===t.range.end.y}var Hu=class extends Iu{constructor(e={}){super(e),this._linkifier=this._register(new Zt),this.browser=ca,this._keyDownHandled=!1,this._keyDownSeen=!1,this._keyPressHandled=!1,this._unprocessedDeadKey=!1,this._accessibilityManager=this._register(new Zt),this._onCursorMove=this._register(new N),this.onCursorMove=this._onCursorMove.event,this._onKey=this._register(new N),this.onKey=this._onKey.event,this._onRender=this._register(new N),this.onRender=this._onRender.event,this._onSelectionChange=this._register(new N),this.onSelectionChange=this._onSelectionChange.event,this._onTitleChange=this._register(new N),this.onTitleChange=this._onTitleChange.event,this._onBell=this._register(new N),this.onBell=this._onBell.event,this._onFocus=this._register(new N),this._onBlur=this._register(new N),this._onA11yCharEmitter=this._register(new N),this._onA11yTabEmitter=this._register(new N),this._onWillOpen=this._register(new N),this._setup(),this._decorationService=this._instantiationService.createInstance(Lu),this._instantiationService.setService(Ei,this._decorationService),this._linkProviderService=this._instantiationService.createInstance(Tc),this._instantiationService.setService(Rn,this._linkProviderService),this._linkProviderService.registerLinkProvider(this._instantiationService.createInstance(qr)),this._register(this._inputHandler.onRequestBell(()=>this._onBell.fire())),this._register(this._inputHandler.onRequestRefreshRows(t=>this.refresh(t?.start??0,t?.end??this.rows-1))),this._register(this._inputHandler.onRequestSendFocus(()=>this._reportFocus())),this._register(this._inputHandler.onRequestReset(()=>this.reset())),this._register(this._inputHandler.onRequestWindowsOptionsReport(t=>this._reportWindowsOptions(t))),this._register(this._inputHandler.onColor(t=>this._handleColorEvent(t))),this._register(Ge.forward(this._inputHandler.onCursorMove,this._onCursorMove)),this._register(Ge.forward(this._inputHandler.onTitleChange,this._onTitleChange)),this._register(Ge.forward(this._inputHandler.onA11yChar,this._onA11yCharEmitter)),this._register(Ge.forward(this._inputHandler.onA11yTab,this._onA11yTabEmitter)),this._register(this._bufferService.onResize(t=>this._afterResize(t.cols,t.rows))),this._register(ue(()=>{this._customKeyEventHandler=void 0,this.element?.parentNode?.removeChild(this.element)}))}get linkifier(){return this._linkifier.value}get onFocus(){return this._onFocus.event}get onBlur(){return this._onBlur.event}get onA11yChar(){return this._onA11yCharEmitter.event}get onA11yTab(){return this._onA11yTabEmitter.event}get onWillOpen(){return this._onWillOpen.event}_handleColorEvent(e){if(this._themeService)for(let t of e){let i,r="";switch(t.index){case 256:i="foreground",r="10";break;case 257:i="background",r="11";break;case 258:i="cursor",r="12";break;default:i="ansi",r="4;"+t.index}switch(t.type){case 0:let o=ce.toColorRGB(i==="ansi"?this._themeService.colors.ansi[t.index]:this._themeService.colors[i]);this.coreService.triggerDataEvent(`${A.ESC}]${r};${Du(o)}${la.ST}`);break;case 1:if(i==="ansi")this._themeService.modifyColors(s=>s.ansi[t.index]=ye.toColor(...t.color));else{let s=i;this._themeService.modifyColors(n=>n[s]=ye.toColor(...t.color))}break;case 2:this._themeService.restoreColor(t.index);break}}}_setup(){super._setup(),this._customKeyEventHandler=void 0}get buffer(){return this.buffers.active}focus(){this.textarea&&this.textarea.focus({preventScroll:!0})}_handleScreenReaderModeOptionChange(e){e?!this._accessibilityManager.value&&this._renderService&&(this._accessibilityManager.value=this._instantiationService.createInstance(nr,this)):this._accessibilityManager.clear()}_handleTextAreaFocus(e){this.coreService.decPrivateModes.sendFocus&&this.coreService.triggerDataEvent(A.ESC+"[I"),this.element.classList.add("focus"),this._showCursor(),this._onFocus.fire()}blur(){return this.textarea?.blur()}_handleTextAreaBlur(){this.textarea.value="",this.refresh(this.buffer.y,this.buffer.y),this.coreService.decPrivateModes.sendFocus&&this.coreService.triggerDataEvent(A.ESC+"[O"),this.element.classList.remove("focus"),this._onBlur.fire()}_syncTextArea(){if(!this.textarea||!this.buffer.isCursorInViewport||this._compositionHelper.isComposing||!this._renderService)return;let e=this.buffer.ybase+this.buffer.y,t=this.buffer.lines.get(e);if(!t)return;let i=Math.min(this.buffer.x,this.cols-1),r=this._renderService.dimensions.css.cell.height,o=t.getWidth(i),s=this._renderService.dimensions.css.cell.width*o,n=this.buffer.y*this._renderService.dimensions.css.cell.height,a=i*this._renderService.dimensions.css.cell.width;this.textarea.style.left=a+"px",this.textarea.style.top=n+"px",this.textarea.style.width=s+"px",this.textarea.style.height=r+"px",this.textarea.style.lineHeight=r+"px",this.textarea.style.zIndex="-5"}_initGlobal(){this._bindKeys(),this._register(Q(this.element,"copy",t=>{this.hasSelection()&&fl(t,this._selectionService)}));let e=t=>_l(t,this.textarea,this.coreService,this.optionsService);this._register(Q(this.textarea,"paste",e)),this._register(Q(this.element,"paste",e)),ua?this._register(Q(this.element,"mousedown",t=>{t.button===2&&Cs(t,this.textarea,this.screenElement,this._selectionService,this.options.rightClickSelectsWord)})):this._register(Q(this.element,"contextmenu",t=>{Cs(t,this.textarea,this.screenElement,this._selectionService,this.options.rightClickSelectsWord)})),Lo&&this._register(Q(this.element,"auxclick",t=>{t.button===1&&Pn(t,this.textarea,this.screenElement)}))}_bindKeys(){this._register(Q(this.textarea,"keyup",e=>this._keyUp(e),!0)),this._register(Q(this.textarea,"keydown",e=>this._keyDown(e),!0)),this._register(Q(this.textarea,"keypress",e=>this._keyPress(e),!0)),this._register(Q(this.textarea,"compositionstart",()=>this._compositionHelper.compositionstart())),this._register(Q(this.textarea,"compositionupdate",e=>this._compositionHelper.compositionupdate(e))),this._register(Q(this.textarea,"compositionend",()=>this._compositionHelper.compositionend())),this._register(Q(this.textarea,"input",e=>this._inputEvent(e),!0)),this._register(this.onRender(()=>this._compositionHelper.updateCompositionElements()))}open(e){if(!e)throw new Error("Terminal requires a parent element.");if(e.isConnected||this._logService.debug("Terminal.open was called on an element that was not attached to the DOM"),this.element?.ownerDocument.defaultView&&this._coreBrowserService){this.element.ownerDocument.defaultView!==this._coreBrowserService.window&&(this._coreBrowserService.window=this.element.ownerDocument.defaultView);return}this._document=e.ownerDocument,this.options.documentOverride&&this.options.documentOverride instanceof Document&&(this._document=this.optionsService.rawOptions.documentOverride),this.element=this._document.createElement("div"),this.element.dir="ltr",this.element.classList.add("terminal"),this.element.classList.add("xterm"),e.appendChild(this.element);let t=this._document.createDocumentFragment();this._viewportElement=this._document.createElement("div"),this._viewportElement.classList.add("xterm-viewport"),t.appendChild(this._viewportElement),this.screenElement=this._document.createElement("div"),this.screenElement.classList.add("xterm-screen"),this._register(Q(this.screenElement,"mousemove",o=>this.updateCursorStyle(o))),this._helperContainer=this._document.createElement("div"),this._helperContainer.classList.add("xterm-helpers"),this.screenElement.appendChild(this._helperContainer),t.appendChild(this.screenElement);let i=this.textarea=this._document.createElement("textarea");this.textarea.classList.add("xterm-helper-textarea"),this.textarea.setAttribute("aria-label",$r.get()),ga||this.textarea.setAttribute("aria-multiline","false"),this.textarea.setAttribute("autocorrect","off"),this.textarea.setAttribute("autocapitalize","off"),this.textarea.setAttribute("spellcheck","false"),this.textarea.tabIndex=0,this._register(this.optionsService.onSpecificOptionChange("disableStdin",()=>i.readOnly=this.optionsService.rawOptions.disableStdin)),this.textarea.readOnly=this.optionsService.rawOptions.disableStdin,this._coreBrowserService=this._register(this._instantiationService.createInstance(Ec,this.textarea,e.ownerDocument.defaultView??window,this._document??typeof window<"u"?window.document:null)),this._instantiationService.setService(_t,this._coreBrowserService),this._register(Q(this.textarea,"focus",o=>this._handleTextAreaFocus(o))),this._register(Q(this.textarea,"blur",()=>this._handleTextAreaBlur())),this._helperContainer.appendChild(this.textarea),this._charSizeService=this._instantiationService.createInstance(vo,this._document,this._helperContainer),this._instantiationService.setService(dr,this._charSizeService),this._themeService=this._instantiationService.createInstance(_o),this._instantiationService.setService(Qt,this._themeService),this._characterJoinerService=this._instantiationService.createInstance(rr),this._instantiationService.setService(Ln,this._characterJoinerService),this._renderService=this._register(this._instantiationService.createInstance(mo,this.rows,this.screenElement)),this._instantiationService.setService(bt,this._renderService),this._register(this._renderService.onRenderedViewportChange(o=>this._onRender.fire(o))),this.onResize(o=>this._renderService.resize(o.cols,o.rows)),this._compositionView=this._document.createElement("div"),this._compositionView.classList.add("composition-view"),this._compositionHelper=this._instantiationService.createInstance(co,this.textarea,this._compositionView),this._helperContainer.appendChild(this._compositionView),this._mouseService=this._instantiationService.createInstance(go),this._instantiationService.setService(Po,this._mouseService);let r=this._linkifier.value=this._register(this._instantiationService.createInstance(Do,this.screenElement));this.element.appendChild(t);try{this._onWillOpen.fire(this.element)}catch{}this._renderService.hasRenderer()||this._renderService.setRenderer(this._createRenderer()),this._register(this.onCursorMove(()=>{this._renderService.handleCursorMove(),this._syncTextArea()})),this._register(this.onResize(()=>this._renderService.handleResize(this.cols,this.rows))),this._register(this.onBlur(()=>this._renderService.handleBlur())),this._register(this.onFocus(()=>this._renderService.handleFocus())),this._viewport=this._register(this._instantiationService.createInstance(lo,this.element,this.screenElement)),this._register(this._viewport.onRequestScrollLines(o=>{super.scrollLines(o,!1),this.refresh(0,this.rows-1)})),this._selectionService=this._register(this._instantiationService.createInstance(fo,this.element,this.screenElement,r)),this._instantiationService.setService(Dl,this._selectionService),this._register(this._selectionService.onRequestScrollLines(o=>this.scrollLines(o.amount,o.suppressScrollEvent))),this._register(this._selectionService.onSelectionChange(()=>this._onSelectionChange.fire())),this._register(this._selectionService.onRequestRedraw(o=>this._renderService.handleSelectionChanged(o.start,o.end,o.columnSelectMode))),this._register(this._selectionService.onLinuxMouseSelection(o=>{this.textarea.value=o,this.textarea.focus(),this.textarea.select()})),this._register(Ge.any(this._onScroll.event,this._inputHandler.onScroll)(()=>{this._selectionService.refresh(),this._viewport?.queueSync()})),this._register(this._instantiationService.createInstance(ho,this.screenElement)),this._register(Q(this.element,"mousedown",o=>this._selectionService.handleMouseDown(o))),this.coreMouseService.areMouseEventsActive?(this._selectionService.disable(),this.element.classList.add("enable-mouse-events")):this._selectionService.enable(),this.options.screenReaderMode&&(this._accessibilityManager.value=this._instantiationService.createInstance(nr,this)),this._register(this.optionsService.onSpecificOptionChange("screenReaderMode",o=>this._handleScreenReaderModeOptionChange(o))),this.options.overviewRuler.width&&(this._overviewRulerRenderer=this._register(this._instantiationService.createInstance(ir,this._viewportElement,this.screenElement))),this.optionsService.onSpecificOptionChange("overviewRuler",o=>{!this._overviewRulerRenderer&&o&&this._viewportElement&&this.screenElement&&(this._overviewRulerRenderer=this._register(this._instantiationService.createInstance(ir,this._viewportElement,this.screenElement)))}),this._charSizeService.measure(),this.refresh(0,this.rows-1),this._initGlobal(),this.bindMouse()}_createRenderer(){return this._instantiationService.createInstance(po,this,this._document,this.element,this.screenElement,this._viewportElement,this._helperContainer,this.linkifier)}bindMouse(){let e=this,t=this.element;function i(s){let n=e._mouseService.getMouseReportCoords(s,e.screenElement);if(!n)return!1;let a,l;switch(s.overrideType||s.type){case"mousemove":l=32,s.buttons===void 0?(a=3,s.button!==void 0&&(a=s.button<3?s.button:3)):a=s.buttons&1?0:s.buttons&4?1:s.buttons&2?2:3;break;case"mouseup":l=0,a=s.button<3?s.button:3;break;case"mousedown":l=1,a=s.button<3?s.button:3;break;case"wheel":if(e._customWheelEventHandler&&e._customWheelEventHandler(s)===!1)return!1;let d=s.deltaY;if(d===0||e.coreMouseService.consumeWheelEvent(s,e._renderService?.dimensions?.device?.cell?.height,e._coreBrowserService?.dpr)===0)return!1;l=d<0?0:1,a=4;break;default:return!1}return l===void 0||a===void 0||a>4?!1:e.coreMouseService.triggerMouseEvent({col:n.col,row:n.row,x:n.x,y:n.y,button:a,action:l,ctrl:s.ctrlKey,alt:s.altKey,shift:s.shiftKey})}let r={mouseup:null,wheel:null,mousedrag:null,mousemove:null},o={mouseup:s=>(i(s),s.buttons||(this._document.removeEventListener("mouseup",r.mouseup),r.mousedrag&&this._document.removeEventListener("mousemove",r.mousedrag)),this.cancel(s)),wheel:s=>(i(s),this.cancel(s,!0)),mousedrag:s=>{s.buttons&&i(s)},mousemove:s=>{s.buttons||i(s)}};this._register(this.coreMouseService.onProtocolChange(s=>{s?(this.optionsService.rawOptions.logLevel==="debug"&&this._logService.debug("Binding to mouse events:",this.coreMouseService.explainEvents(s)),this.element.classList.add("enable-mouse-events"),this._selectionService.disable()):(this._logService.debug("Unbinding from mouse events."),this.element.classList.remove("enable-mouse-events"),this._selectionService.enable()),s&8?r.mousemove||(t.addEventListener("mousemove",o.mousemove),r.mousemove=o.mousemove):(t.removeEventListener("mousemove",r.mousemove),r.mousemove=null),s&16?r.wheel||(t.addEventListener("wheel",o.wheel,{passive:!1}),r.wheel=o.wheel):(t.removeEventListener("wheel",r.wheel),r.wheel=null),s&2?r.mouseup||(r.mouseup=o.mouseup):(this._document.removeEventListener("mouseup",r.mouseup),r.mouseup=null),s&4?r.mousedrag||(r.mousedrag=o.mousedrag):(this._document.removeEventListener("mousemove",r.mousedrag),r.mousedrag=null)})),this.coreMouseService.activeProtocol=this.coreMouseService.activeProtocol,this._register(Q(t,"mousedown",s=>{if(s.preventDefault(),this.focus(),!(!this.coreMouseService.areMouseEventsActive||this._selectionService.shouldForceSelection(s)))return i(s),r.mouseup&&this._document.addEventListener("mouseup",r.mouseup),r.mousedrag&&this._document.addEventListener("mousemove",r.mousedrag),this.cancel(s)})),this._register(Q(t,"wheel",s=>{if(!r.wheel){if(this._customWheelEventHandler&&this._customWheelEventHandler(s)===!1)return!1;if(!this.buffer.hasScrollback){if(s.deltaY===0)return!1;if(e.coreMouseService.consumeWheelEvent(s,e._renderService?.dimensions?.device?.cell?.height,e._coreBrowserService?.dpr)===0)return this.cancel(s,!0);let n=A.ESC+(this.coreService.decPrivateModes.applicationCursorKeys?"O":"[")+(s.deltaY<0?"A":"B");return this.coreService.triggerDataEvent(n,!0),this.cancel(s,!0)}}},{passive:!1}))}refresh(e,t){this._renderService?.refreshRows(e,t)}updateCursorStyle(e){this._selectionService?.shouldColumnSelect(e)?this.element.classList.add("column-select"):this.element.classList.remove("column-select")}_showCursor(){this.coreService.isCursorInitialized||(this.coreService.isCursorInitialized=!0,this.refresh(this.buffer.y,this.buffer.y))}scrollLines(e,t){this._viewport?this._viewport.scrollLines(e):super.scrollLines(e,t),this.refresh(0,this.rows-1)}scrollPages(e){this.scrollLines(e*(this.rows-1))}scrollToTop(){this.scrollLines(-this._bufferService.buffer.ydisp)}scrollToBottom(e){e&&this._viewport?this._viewport.scrollToLine(this.buffer.ybase,!0):this.scrollLines(this._bufferService.buffer.ybase-this._bufferService.buffer.ydisp)}scrollToLine(e){let t=e-this._bufferService.buffer.ydisp;t!==0&&this.scrollLines(t)}paste(e){En(e,this.textarea,this.coreService,this.optionsService)}attachCustomKeyEventHandler(e){this._customKeyEventHandler=e}attachCustomWheelEventHandler(e){this._customWheelEventHandler=e}registerLinkProvider(e){return this._linkProviderService.registerLinkProvider(e)}registerCharacterJoiner(e){if(!this._characterJoinerService)throw new Error("Terminal must be opened first");let t=this._characterJoinerService.register(e);return this.refresh(0,this.rows-1),t}deregisterCharacterJoiner(e){if(!this._characterJoinerService)throw new Error("Terminal must be opened first");this._characterJoinerService.deregister(e)&&this.refresh(0,this.rows-1)}get markers(){return this.buffer.markers}registerMarker(e){return this.buffer.addMarker(this.buffer.ybase+this.buffer.y+e)}registerDecoration(e){return this._decorationService.registerDecoration(e)}hasSelection(){return this._selectionService?this._selectionService.hasSelection:!1}select(e,t,i){this._selectionService.setSelection(e,t,i)}getSelection(){return this._selectionService?this._selectionService.selectionText:""}getSelectionPosition(){if(!(!this._selectionService||!this._selectionService.hasSelection))return{start:{x:this._selectionService.selectionStart[0],y:this._selectionService.selectionStart[1]},end:{x:this._selectionService.selectionEnd[0],y:this._selectionService.selectionEnd[1]}}}clearSelection(){this._selectionService?.clearSelection()}selectAll(){this._selectionService?.selectAll()}selectLines(e,t){this._selectionService?.selectLines(e,t)}_keyDown(e){if(this._keyDownHandled=!1,this._keyDownSeen=!0,this._customKeyEventHandler&&this._customKeyEventHandler(e)===!1)return!1;let t=this.browser.isMac&&this.options.macOptionIsMeta&&e.altKey;if(!t&&!this._compositionHelper.keydown(e))return this.options.scrollOnUserInput&&this.buffer.ybase!==this.buffer.ydisp&&this.scrollToBottom(!0),!1;!t&&(e.key==="Dead"||e.key==="AltGraph")&&(this._unprocessedDeadKey=!0);let i=Mu(e,this.coreService.decPrivateModes.applicationCursorKeys,this.browser.isMac,this.options.macOptionIsMeta);if(this.updateCursorStyle(e),i.type===3||i.type===2){let r=this.rows-1;return this.scrollLines(i.type===2?-r:r),this.cancel(e,!0)}if(i.type===1&&this.selectAll(),this._isThirdLevelShift(this.browser,e)||(i.cancel&&this.cancel(e,!0),!i.key)||e.key&&!e.ctrlKey&&!e.altKey&&!e.metaKey&&e.key.length===1&&e.key.charCodeAt(0)>=65&&e.key.charCodeAt(0)<=90)return!0;if(this._unprocessedDeadKey)return this._unprocessedDeadKey=!1,!0;if((i.key===A.ETX||i.key===A.CR)&&(this.textarea.value=""),this._onKey.fire({key:i.key,domEvent:e}),this._showCursor(),this.coreService.triggerDataEvent(i.key,!0),!this.optionsService.rawOptions.screenReaderMode||e.altKey||e.ctrlKey)return this.cancel(e,!0);this._keyDownHandled=!0}_isThirdLevelShift(e,t){let i=e.isMac&&!this.options.macOptionIsMeta&&t.altKey&&!t.ctrlKey&&!t.metaKey||e.isWindows&&t.altKey&&t.ctrlKey&&!t.metaKey||e.isWindows&&t.getModifierState("AltGraph");return t.type==="keypress"?i:i&&(!t.keyCode||t.keyCode>47)}_keyUp(e){this._keyDownSeen=!1,!(this._customKeyEventHandler&&this._customKeyEventHandler(e)===!1)&&($u(e)||this.focus(),this.updateCursorStyle(e),this._keyPressHandled=!1)}_keyPress(e){let t;if(this._keyPressHandled=!1,this._keyDownHandled||this._customKeyEventHandler&&this._customKeyEventHandler(e)===!1)return!1;if(this.cancel(e),e.charCode)t=e.charCode;else if(e.which===null||e.which===void 0)t=e.keyCode;else if(e.which!==0&&e.charCode!==0)t=e.which;else return!1;return!t||(e.altKey||e.ctrlKey||e.metaKey)&&!this._isThirdLevelShift(this.browser,e)?!1:(t=String.fromCharCode(t),this._onKey.fire({key:t,domEvent:e}),this._showCursor(),this.coreService.triggerDataEvent(t,!0),this._keyPressHandled=!0,this._unprocessedDeadKey=!1,!0)}_inputEvent(e){if(e.data&&e.inputType==="insertText"&&(!e.composed||!this._keyDownSeen)&&!this.optionsService.rawOptions.screenReaderMode){if(this._keyPressHandled)return!1;this._unprocessedDeadKey=!1;let t=e.data;return this.coreService.triggerDataEvent(t,!0),this.cancel(e),!0}return!1}resize(e,t){if(e===this.cols&&t===this.rows){this._charSizeService&&!this._charSizeService.hasValidSize&&this._charSizeService.measure();return}super.resize(e,t)}_afterResize(e,t){this._charSizeService?.measure()}clear(){if(!(this.buffer.ybase===0&&this.buffer.y===0)){this.buffer.clearAllMarkers(),this.buffer.lines.set(0,this.buffer.lines.get(this.buffer.ybase+this.buffer.y)),this.buffer.lines.length=1,this.buffer.ydisp=0,this.buffer.ybase=0,this.buffer.y=0;for(let e=1;e<this.rows;e++)this.buffer.lines.push(this.buffer.getBlankLine(Se));this._onScroll.fire({position:this.buffer.ydisp}),this.refresh(0,this.rows-1)}}reset(){this.options.rows=this.rows,this.options.cols=this.cols;let e=this._customKeyEventHandler;this._setup(),super.reset(),this._selectionService?.reset(),this._decorationService.reset(),this._customKeyEventHandler=e,this.refresh(0,this.rows-1)}clearTextureAtlas(){this._renderService?.clearTextureAtlas()}_reportFocus(){this.element?.classList.contains("focus")?this.coreService.triggerDataEvent(A.ESC+"[I"):this.coreService.triggerDataEvent(A.ESC+"[O")}_reportWindowsOptions(e){if(this._renderService)switch(e){case 0:let t=this._renderService.dimensions.css.canvas.width.toFixed(0),i=this._renderService.dimensions.css.canvas.height.toFixed(0);this.coreService.triggerDataEvent(`${A.ESC}[4;${i};${t}t`);break;case 1:let r=this._renderService.dimensions.css.cell.width.toFixed(0),o=this._renderService.dimensions.css.cell.height.toFixed(0);this.coreService.triggerDataEvent(`${A.ESC}[6;${o};${r}t`);break}}cancel(e,t){if(!(!this.options.cancelEvents&&!t))return e.preventDefault(),e.stopPropagation(),!1}};function $u(e){return e.keyCode===16||e.keyCode===17||e.keyCode===18}var Fu=class{constructor(){this._addons=[]}dispose(){for(let e=this._addons.length-1;e>=0;e--)this._addons[e].instance.dispose()}loadAddon(e,t){let i={instance:t,dispose:t.dispose,isDisposed:!1};this._addons.push(i),t.dispose=()=>this._wrappedAddonDispose(i),t.activate(e)}_wrappedAddonDispose(e){if(e.isDisposed)return;let t=-1;for(let i=0;i<this._addons.length;i++)if(this._addons[i]===e){t=i;break}if(t===-1)throw new Error("Could not dispose an addon that has not been loaded");e.isDisposed=!0,e.dispose.apply(e.instance),this._addons.splice(t,1)}},Vu=class{constructor(e){this._line=e}get isWrapped(){return this._line.isWrapped}get length(){return this._line.length}getCell(e,t){if(!(e<0||e>=this._line.length))return t?(this._line.loadCell(e,t),t):this._line.loadCell(e,new Je)}translateToString(e,t,i){return this._line.translateToString(e,t,i)}},kn=class{constructor(e,t){this._buffer=e,this.type=t}init(e){return this._buffer=e,this}get cursorY(){return this._buffer.y}get cursorX(){return this._buffer.x}get viewportY(){return this._buffer.ydisp}get baseY(){return this._buffer.ybase}get length(){return this._buffer.lines.length}getLine(e){let t=this._buffer.lines.get(e);if(t)return new Vu(t)}getNullCell(){return new Je}},qu=class extends te{constructor(e){super(),this._core=e,this._onBufferChange=this._register(new N),this.onBufferChange=this._onBufferChange.event,this._normal=new kn(this._core.buffers.normal,"normal"),this._alternate=new kn(this._core.buffers.alt,"alternate"),this._core.buffers.onBufferActivate(()=>this._onBufferChange.fire(this.active))}get active(){if(this._core.buffers.active===this._core.buffers.normal)return this.normal;if(this._core.buffers.active===this._core.buffers.alt)return this.alternate;throw new Error("Active buffer is neither normal nor alternate")}get normal(){return this._normal.init(this._core.buffers.normal)}get alternate(){return this._alternate.init(this._core.buffers.alt)}},Uu=class{constructor(e){this._core=e}registerCsiHandler(e,t){return this._core.registerCsiHandler(e,i=>t(i.toArray()))}addCsiHandler(e,t){return this.registerCsiHandler(e,t)}registerDcsHandler(e,t){return this._core.registerDcsHandler(e,(i,r)=>t(i,r.toArray()))}addDcsHandler(e,t){return this.registerDcsHandler(e,t)}registerEscHandler(e,t){return this._core.registerEscHandler(e,t)}addEscHandler(e,t){return this.registerEscHandler(e,t)}registerOscHandler(e,t){return this._core.registerOscHandler(e,t)}addOscHandler(e,t){return this.registerOscHandler(e,t)}},Ku=class{constructor(e){this._core=e}register(e){this._core.unicodeService.register(e)}get versions(){return this._core.unicodeService.versions}get activeVersion(){return this._core.unicodeService.activeVersion}set activeVersion(e){this._core.unicodeService.activeVersion=e}},Yu=["cols","rows"],nt=0,ka=class extends te{constructor(e){super(),this._core=this._register(new Hu(e)),this._addonManager=this._register(new Fu),this._publicOptions={...this._core.options};let t=r=>this._core.options[r],i=(r,o)=>{this._checkReadonlyOptions(r),this._core.options[r]=o};for(let r in this._core.options){let o={get:t.bind(this,r),set:i.bind(this,r)};Object.defineProperty(this._publicOptions,r,o)}}_checkReadonlyOptions(e){if(Yu.includes(e))throw new Error(`Option "${e}" can only be set in the constructor`)}_checkProposedApi(){if(!this._core.optionsService.rawOptions.allowProposedApi)throw new Error("You must set the allowProposedApi option to true to use proposed API")}get onBell(){return this._core.onBell}get onBinary(){return this._core.onBinary}get onCursorMove(){return this._core.onCursorMove}get onData(){return this._core.onData}get onKey(){return this._core.onKey}get onLineFeed(){return this._core.onLineFeed}get onRender(){return this._core.onRender}get onResize(){return this._core.onResize}get onScroll(){return this._core.onScroll}get onSelectionChange(){return this._core.onSelectionChange}get onTitleChange(){return this._core.onTitleChange}get onWriteParsed(){return this._core.onWriteParsed}get element(){return this._core.element}get parser(){return this._parser||(this._parser=new Uu(this._core)),this._parser}get unicode(){return this._checkProposedApi(),new Ku(this._core)}get textarea(){return this._core.textarea}get rows(){return this._core.rows}get cols(){return this._core.cols}get buffer(){return this._buffer||(this._buffer=this._register(new qu(this._core))),this._buffer}get markers(){return this._checkProposedApi(),this._core.markers}get modes(){let e=this._core.coreService.decPrivateModes,t="none";switch(this._core.coreMouseService.activeProtocol){case"X10":t="x10";break;case"VT200":t="vt200";break;case"DRAG":t="drag";break;case"ANY":t="any";break}return{applicationCursorKeysMode:e.applicationCursorKeys,applicationKeypadMode:e.applicationKeypad,bracketedPasteMode:e.bracketedPasteMode,insertMode:this._core.coreService.modes.insertMode,mouseTrackingMode:t,originMode:e.origin,reverseWraparoundMode:e.reverseWraparound,sendFocusMode:e.sendFocus,synchronizedOutputMode:e.synchronizedOutput,wraparoundMode:e.wraparound}}get options(){return this._publicOptions}set options(e){for(let t in e)this._publicOptions[t]=e[t]}blur(){this._core.blur()}focus(){this._core.focus()}input(e,t=!0){this._core.input(e,t)}resize(e,t){this._verifyIntegers(e,t),this._core.resize(e,t)}open(e){this._core.open(e)}attachCustomKeyEventHandler(e){this._core.attachCustomKeyEventHandler(e)}attachCustomWheelEventHandler(e){this._core.attachCustomWheelEventHandler(e)}registerLinkProvider(e){return this._core.registerLinkProvider(e)}registerCharacterJoiner(e){return this._checkProposedApi(),this._core.registerCharacterJoiner(e)}deregisterCharacterJoiner(e){this._checkProposedApi(),this._core.deregisterCharacterJoiner(e)}registerMarker(e=0){return this._verifyIntegers(e),this._core.registerMarker(e)}registerDecoration(e){return this._checkProposedApi(),this._verifyPositiveIntegers(e.x??0,e.width??0,e.height??0),this._core.registerDecoration(e)}hasSelection(){return this._core.hasSelection()}select(e,t,i){this._verifyIntegers(e,t,i),this._core.select(e,t,i)}getSelection(){return this._core.getSelection()}getSelectionPosition(){return this._core.getSelectionPosition()}clearSelection(){this._core.clearSelection()}selectAll(){this._core.selectAll()}selectLines(e,t){this._verifyIntegers(e,t),this._core.selectLines(e,t)}dispose(){super.dispose()}scrollLines(e){this._verifyIntegers(e),this._core.scrollLines(e)}scrollPages(e){this._verifyIntegers(e),this._core.scrollPages(e)}scrollToTop(){this._core.scrollToTop()}scrollToBottom(){this._core.scrollToBottom()}scrollToLine(e){this._verifyIntegers(e),this._core.scrollToLine(e)}clear(){this._core.clear()}write(e,t){this._core.write(e,t)}writeln(e,t){this._core.write(e),this._core.write(`\r
`,t)}paste(e){this._core.paste(e)}refresh(e,t){this._verifyIntegers(e,t),this._core.refresh(e,t)}reset(){this._core.reset()}clearTextureAtlas(){this._core.clearTextureAtlas()}loadAddon(e){this._addonManager.loadAddon(this,e)}static get strings(){return{get promptLabel(){return $r.get()},set promptLabel(e){$r.set(e)},get tooMuchOutput(){return Fr.get()},set tooMuchOutput(e){Fr.set(e)}}}_verifyIntegers(...e){for(nt of e)if(nt===1/0||isNaN(nt)||nt%1!==0)throw new Error("This API only accepts integers")}_verifyPositiveIntegers(...e){for(nt of e)if(nt&&(nt===1/0||isNaN(nt)||nt%1!==0||nt<0))throw new Error("This API only accepts positive integers")}};var Da=`/**
 * Copyright (c) 2014 The xterm.js authors. All rights reserved.
 * Copyright (c) 2012-2013, Christopher Jeffrey (MIT License)
 * https://github.com/chjj/term.js
 * @license MIT
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * Originally forked from (with the author's permission):
 *   Fabrice Bellard's javascript vt100 for jslinux:
 *   http://bellard.org/jslinux/
 *   Copyright (c) 2011 Fabrice Bellard
 *   The original design remains. The terminal itself
 *   has been extended to include xterm CSI codes, among
 *   other features.
 */

/**
 *  Default styles for xterm.js
 */

.xterm {
    cursor: text;
    position: relative;
    user-select: none;
    -ms-user-select: none;
    -webkit-user-select: none;
}

.xterm.focus,
.xterm:focus {
    outline: none;
}

.xterm .xterm-helpers {
    position: absolute;
    top: 0;
    /**
     * The z-index of the helpers must be higher than the canvases in order for
     * IMEs to appear on top.
     */
    z-index: 5;
}

.xterm .xterm-helper-textarea {
    padding: 0;
    border: 0;
    margin: 0;
    /* Move textarea out of the screen to the far left, so that the cursor is not visible */
    position: absolute;
    opacity: 0;
    left: -9999em;
    top: 0;
    width: 0;
    height: 0;
    z-index: -5;
    /** Prevent wrapping so the IME appears against the textarea at the correct position */
    white-space: nowrap;
    overflow: hidden;
    resize: none;
}

.xterm .composition-view {
    /* TODO: Composition position got messed up somewhere */
    background: #000;
    color: #FFF;
    display: none;
    position: absolute;
    white-space: nowrap;
    z-index: 1;
}

.xterm .composition-view.active {
    display: block;
}

.xterm .xterm-viewport {
    /* On OS X this is required in order for the scroll bar to appear fully opaque */
    background-color: #000;
    overflow-y: scroll;
    cursor: default;
    position: absolute;
    right: 0;
    left: 0;
    top: 0;
    bottom: 0;
}

.xterm .xterm-screen {
    position: relative;
}

.xterm .xterm-screen canvas {
    position: absolute;
    left: 0;
    top: 0;
}

.xterm-char-measure-element {
    display: inline-block;
    visibility: hidden;
    position: absolute;
    top: 0;
    left: -9999em;
    line-height: normal;
}

.xterm.enable-mouse-events {
    /* When mouse events are enabled (eg. tmux), revert to the standard pointer cursor */
    cursor: default;
}

.xterm.xterm-cursor-pointer,
.xterm .xterm-cursor-pointer {
    cursor: pointer;
}

.xterm.column-select.focus {
    /* Column selection mode */
    cursor: crosshair;
}

.xterm .xterm-accessibility:not(.debug),
.xterm .xterm-message {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 10;
    color: transparent;
    pointer-events: none;
}

.xterm .xterm-accessibility-tree:not(.debug) *::selection {
  color: transparent;
}

.xterm .xterm-accessibility-tree {
  font-family: monospace;
  user-select: text;
  white-space: pre;
}

.xterm .xterm-accessibility-tree > div {
  transform-origin: left;
  width: fit-content;
}

.xterm .live-region {
    position: absolute;
    left: -9999px;
    width: 1px;
    height: 1px;
    overflow: hidden;
}

.xterm-dim {
    /* Dim should not apply to background, so the opacity of the foreground color is applied
     * explicitly in the generated class and reset to 1 here */
    opacity: 1 !important;
}

.xterm-underline-1 { text-decoration: underline; }
.xterm-underline-2 { text-decoration: double underline; }
.xterm-underline-3 { text-decoration: wavy underline; }
.xterm-underline-4 { text-decoration: dotted underline; }
.xterm-underline-5 { text-decoration: dashed underline; }

.xterm-overline {
    text-decoration: overline;
}

.xterm-overline.xterm-underline-1 { text-decoration: overline underline; }
.xterm-overline.xterm-underline-2 { text-decoration: overline double underline; }
.xterm-overline.xterm-underline-3 { text-decoration: overline wavy underline; }
.xterm-overline.xterm-underline-4 { text-decoration: overline dotted underline; }
.xterm-overline.xterm-underline-5 { text-decoration: overline dashed underline; }

.xterm-strikethrough {
    text-decoration: line-through;
}

.xterm-screen .xterm-decoration-container .xterm-decoration {
	z-index: 6;
	position: absolute;
}

.xterm-screen .xterm-decoration-container .xterm-decoration.xterm-decoration-top-layer {
	z-index: 7;
}

.xterm-decoration-overview-ruler {
    z-index: 8;
    position: absolute;
    top: 0;
    right: 0;
    pointer-events: none;
}

.xterm-decoration-top {
    z-index: 2;
    position: relative;
}



/* Derived from vs/base/browser/ui/scrollbar/media/scrollbar.css */

/* xterm.js customization: Override xterm's cursor style */
.xterm .xterm-scrollable-element > .scrollbar {
    cursor: default;
}

/* Arrows */
.xterm .xterm-scrollable-element > .scrollbar > .scra {
	cursor: pointer;
	font-size: 11px !important;
}

.xterm .xterm-scrollable-element > .visible {
	opacity: 1;

	/* Background rule added for IE9 - to allow clicks on dom node */
	background:rgba(0,0,0,0);

	transition: opacity 100ms linear;
	/* In front of peek view */
	z-index: 11;
}
.xterm .xterm-scrollable-element > .invisible {
	opacity: 0;
	pointer-events: none;
}
.xterm .xterm-scrollable-element > .invisible.fade {
	transition: opacity 800ms linear;
}

/* Scrollable Content Inset Shadow */
.xterm .xterm-scrollable-element > .shadow {
	position: absolute;
	display: none;
}
.xterm .xterm-scrollable-element > .shadow.top {
	display: block;
	top: 0;
	left: 3px;
	height: 3px;
	width: 100%;
	box-shadow: var(--vscode-scrollbar-shadow, #000) 0 6px 6px -6px inset;
}
.xterm .xterm-scrollable-element > .shadow.left {
	display: block;
	top: 3px;
	left: 0;
	height: 100%;
	width: 3px;
	box-shadow: var(--vscode-scrollbar-shadow, #000) 6px 0 6px -6px inset;
}
.xterm .xterm-scrollable-element > .shadow.top-left-corner {
	display: block;
	top: 0;
	left: 0;
	height: 3px;
	width: 3px;
}
.xterm .xterm-scrollable-element > .shadow.top.left {
	box-shadow: var(--vscode-scrollbar-shadow, #000) 6px 0 6px -6px inset;
}
`;var Ea=`.dv-drop-target-container {
  position: absolute;
  z-index: 9999;
  top: 0px;
  left: 0px;
  height: 100%;
  width: 100%;
  pointer-events: none;
  overflow: hidden;
  --dv-transition-duration: 300ms;
}
.dv-drop-target-container .dv-drop-target-anchor {
  position: relative;
  border: var(--dv-drag-over-border);
  background-color: var(--dv-drag-over-background-color);
  opacity: 1;
  /* GPU optimizations */
  will-change: transform, opacity;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  contain: layout paint;
  transition: opacity var(--dv-transition-duration) ease-in, top var(--dv-transition-duration) ease-out, left var(--dv-transition-duration) ease-out, width var(--dv-transition-duration) ease-out, height var(--dv-transition-duration) ease-out;
}
.dv-drop-target {
  position: relative;
  --dv-transition-duration: 70ms;
}
.dv-drop-target > .dv-drop-target-dropzone {
  position: absolute;
  left: 0px;
  top: 0px;
  height: 100%;
  width: 100%;
  z-index: 1000;
  pointer-events: none;
}
.dv-drop-target > .dv-drop-target-dropzone > .dv-drop-target-selection {
  position: relative;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  border: var(--dv-drag-over-border);
  background-color: var(--dv-drag-over-background-color);
  transition: top var(--dv-transition-duration) ease-out, left var(--dv-transition-duration) ease-out, width var(--dv-transition-duration) ease-out, height var(--dv-transition-duration) ease-out, opacity var(--dv-transition-duration) ease-out;
  will-change: transform;
  pointer-events: none;
}
.dv-drop-target > .dv-drop-target-dropzone > .dv-drop-target-selection.dv-drop-target-top.dv-drop-target-small-vertical {
  border-top: 1px solid var(--dv-drag-over-border-color);
}
.dv-drop-target > .dv-drop-target-dropzone > .dv-drop-target-selection.dv-drop-target-bottom.dv-drop-target-small-vertical {
  border-bottom: 1px solid var(--dv-drag-over-border-color);
}
.dv-drop-target > .dv-drop-target-dropzone > .dv-drop-target-selection.dv-drop-target-left.dv-drop-target-small-horizontal {
  border-left: 1px solid var(--dv-drag-over-border-color);
}
.dv-drop-target > .dv-drop-target-dropzone > .dv-drop-target-selection.dv-drop-target-right.dv-drop-target-small-horizontal {
  border-right: 1px solid var(--dv-drag-over-border-color);
}

.dv-dnd-compass {
  z-index: 1001;
}

.dv-dnd-compass-cell {
  box-sizing: border-box;
  border-radius: 2px;
  border: 1px solid var(--dv-dnd-compass-color, #1f9cf0);
  background-color: var(--dv-dnd-compass-cell-color, rgba(31, 156, 240, 0.25));
}

.dv-dnd-compass-cell-edge {
  border-style: dashed;
  background-color: var(--dv-dnd-compass-edge-cell-color, rgba(31, 156, 240, 0.12));
}

.dv-dnd-compass-cell-active {
  background-color: var(--dv-dnd-compass-active-cell-color, rgba(31, 156, 240, 0.5));
  border-style: solid;
}

.dv-dnd-compass-edge-preview {
  z-index: 1000;
  box-sizing: border-box;
  background-color: var(--dv-drag-over-background-color);
  border: var(--dv-drag-over-border);
}
.dv-dragged {
  transform: translate3d(0px, 0px, 0px); /* forces tab to be drawn on a separate layer (see https://github.com/microsoft/vscode/issues/18733) */
}

/* Applied to the ghost tab clone during drag so it shows the same border as a focused tab */
.dv-tab-ghost-drag {
  position: relative;
}
.dv-tab-ghost-drag::after {
  position: absolute;
  content: "";
  height: 100%;
  width: 100%;
  top: 0px;
  left: 0px;
  pointer-events: none;
  outline: 1px solid var(--dv-tab-divider-color) !important;
  outline-offset: -1px;
  z-index: 5;
}

.dv-tab {
  flex-shrink: 0;
}
.dv-tab:focus-visible, .dv-tab:has(:focus-visible) {
  position: relative;
}
.dv-tab:focus-visible::after, .dv-tab:has(:focus-visible)::after {
  position: absolute;
  content: "";
  height: 100%;
  width: 100%;
  top: 0px;
  left: 0px;
  pointer-events: none;
  outline: 1px solid var(--dv-tab-divider-color) !important;
  outline-offset: -1px;
  z-index: 5;
}
.dv-tab.dv-tab-dragging .dv-default-tab-action {
  background-color: var(--dv-activegroup-visiblepanel-tab-color);
}
.dv-tab.dv-active-tab .dv-default-tab .dv-default-tab-action {
  visibility: visible;
}
.dv-tab.dv-inactive-tab .dv-default-tab .dv-default-tab-action {
  visibility: hidden;
}
.dv-tab.dv-inactive-tab .dv-default-tab:hover .dv-default-tab-action {
  visibility: visible;
}
@media (hover: none) {
  .dv-tab.dv-inactive-tab .dv-default-tab .dv-default-tab-action {
    visibility: visible;
  }
}
.dv-tab .dv-default-tab {
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.dv-tab .dv-default-tab .dv-default-tab-content {
  flex-grow: 1;
  margin-right: 4px;
}
.dv-tab .dv-default-tab .dv-default-tab-action {
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  border: none;
  background: none;
  color: inherit;
  font: inherit;
  cursor: pointer;
}
.dv-tab .dv-default-tab .dv-default-tab-action:hover {
  border-radius: 2px;
  background-color: var(--dv-icon-hover-background-color);
}
@media (pointer: coarse) {
  .dv-tab .dv-default-tab .dv-default-tab-action {
    padding: 8px;
  }
}
.dv-tabs-overflow-dropdown-default {
  height: 100%;
  box-sizing: border-box;
  color: var(--dv-activegroup-hiddenpanel-tab-color);
  margin: var(--dv-tab-margin);
  display: flex;
  align-items: center;
  flex-shrink: 0;
  padding: 0.25rem 0.5rem;
  cursor: pointer;
}
.dv-tabs-overflow-dropdown-default > span {
  padding-left: 0.25rem;
}
.dv-tabs-overflow-dropdown-default > svg {
  transform: rotate(90deg);
}
.dv-tabs-overflow-dropdown-default:hover {
  border-radius: 2px;
  background-color: var(--dv-icon-hover-background-color);
}
.dv-tabs-container {
  display: flex;
  position: relative;
  height: 100%;
  overflow: auto;
  scrollbar-width: thin;
  /**
   * Multi-row (wrapping) tabs. Inert until the \`MultiRowTabsModule\` toggles
   * \`.dv-tabs-container--wrap\` on this element (\`overflow.mode: 'wrap'\`):
   * tabs wrap onto multiple rows instead of clipping into the dropdown, and
   * the strip grows to fit (the header grows via the \`:has()\` rule in
   * tabsContainer.scss; the free header-aware content-sizing seam then shrinks
   * the content area to match). Restricted to horizontal headers in v1.
   */
}
.dv-tabs-container.dv-tabs-container--wrap:not(.dv-tabs-container-vertical) {
  flex-wrap: wrap;
  height: auto;
  overflow: visible;
  align-content: flex-start;
}
.dv-tabs-container.dv-tabs-container--wrap:not(.dv-tabs-container-vertical) .dv-tab {
  height: var(--dv-tabs-and-actions-container-height);
}
.dv-tabs-container.dv-tabs-container--wrap:not(.dv-tabs-container-vertical).dv-tabs-container--wrap-capped {
  max-height: calc(var(--dv-tabs-and-actions-container-height) * var(--dv-max-tab-rows));
  overflow: hidden;
}
.dv-tabs-container.dv-tabs-container--wrap:not(.dv-tabs-container-vertical) .dv-tab--reorder-before::after,
.dv-tabs-container.dv-tabs-container--wrap:not(.dv-tabs-container-vertical) .dv-tab--reorder-after::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  width: 2px;
  z-index: 10;
  pointer-events: none;
  background-color: var(--dv-drag-over-border-color);
}
.dv-tabs-container.dv-tabs-container--wrap:not(.dv-tabs-container-vertical) .dv-tab--reorder-before::after {
  left: 0;
}
.dv-tabs-container.dv-tabs-container--wrap:not(.dv-tabs-container-vertical) .dv-tab--reorder-after::after {
  right: 0;
}
.dv-tabs-container {
  /**
   * Multi-column (wrapping) tabs for a vertical (edge-group) header: the
   * mirror of the horizontal rule above with the axes swapped. The main axis
   * is vertical (bounded by the header height, so overflowing tabs wrap) and
   * the cross axis is horizontal (grows into additional columns). The header
   * grows in width via the \`:has()\` rule in tabsContainer.scss.
   *
   * Column flow direction under \`writing-mode: vertical-rl\` differs
   * between left and right header positions; this needs visual verification
   * in a real browser (jsdom lays out neither writing-mode nor flex-wrap).
   */
}
.dv-tabs-container.dv-tabs-container--wrap.dv-tabs-container-vertical {
  flex-wrap: wrap;
  width: auto;
  height: 100%;
  max-height: 100%;
  overflow: visible;
  align-content: flex-start;
}
.dv-tabs-container.dv-tabs-container--wrap.dv-tabs-container-vertical .dv-tab {
  width: var(--dv-tabs-and-actions-container-height);
  height: var(--dv-wrap-vertical-tab-height, auto);
}
.dv-tabs-container.dv-tabs-container--wrap.dv-tabs-container-vertical.dv-tabs-container--wrap-capped {
  max-width: calc(var(--dv-tabs-and-actions-container-height) * var(--dv-max-tab-rows));
  overflow: hidden;
}
.dv-tabs-container.dv-tabs-container--wrap.dv-tabs-container-vertical .dv-tab--reorder-before::after,
.dv-tabs-container.dv-tabs-container--wrap.dv-tabs-container-vertical .dv-tab--reorder-after::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  height: 2px;
  z-index: 10;
  pointer-events: none;
  background-color: var(--dv-drag-over-border-color);
}
.dv-tabs-container.dv-tabs-container--wrap.dv-tabs-container-vertical .dv-tab--reorder-before::after {
  top: 0;
}
.dv-tabs-container.dv-tabs-container--wrap.dv-tabs-container-vertical .dv-tab--reorder-after::after {
  bottom: 0;
}
.dv-tabs-container {
  /* GPU optimizations for smooth scrolling */
  will-change: scroll-position;
  transform: translate3d(0, 0, 0);
  /**
   * Stop scroll-chaining at the tab strip so that wheel / trackpad
   * overscroll past the strip's edges doesn't trigger the browser's
   * swipe-to-go-back-or-forward gesture (and doesn't scroll the page
   * either). \`contain\` keeps the native bounce visuals; \`none\` would
   * also disable them.
   */
  overscroll-behavior: contain;
  /**
   * Empty space between tabs (and the scrollbar lane) keeps pan-x so a
   * flick on those areas produces native momentum scroll. The tab and
   * chip elements themselves opt out (\`touch-action: none\`) so the
   * pointer drag source owns the gesture from pointerdown - a flick on
   * a tab or chip always becomes a drag, regardless of direction.
   */
  touch-action: pan-x;
}
.dv-tabs-container.dv-tabs-container-vertical {
  width: 100%;
  height: fit-content;
  max-height: 100%;
  writing-mode: vertical-rl;
  touch-action: pan-y;
}
.dv-tabs-container.dv-horizontal .dv-tab:not(:first-child)::before, .dv-tabs-container.dv-vertical .dv-tab:not(:first-child)::before {
  content: " ";
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
  pointer-events: none;
  background-color: var(--dv-tab-divider-color);
}
.dv-tabs-container.dv-horizontal .dv-tab:not(:first-child)::before {
  width: 1px;
  height: 100%;
}
.dv-tabs-container.dv-vertical .dv-tab:not(:first-child)::before {
  width: 100%;
  height: 1px;
}
.dv-tabs-container::-webkit-scrollbar {
  height: 3px;
}
.dv-tabs-container {
  /* Track */
}
.dv-tabs-container::-webkit-scrollbar-track {
  background: transparent;
}
.dv-tabs-container {
  /* Handle */
}
.dv-tabs-container::-webkit-scrollbar-thumb {
  background: var(--dv-tabs-container-scrollbar-color);
}

.dv-scrollable > .dv-tabs-container {
  overflow: hidden;
}

.dv-tab {
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  outline: none;
  padding: 0.25rem 0.5rem;
  cursor: pointer;
  position: relative;
  box-sizing: border-box;
  font-size: var(--dv-tab-font-size);
  margin: var(--dv-tab-margin);
  touch-action: none;
}
.dv-tab.dv-tab--shifting {
  will-change: transform, margin-left, margin-right, margin-top, margin-bottom;
  transition: transform var(--dv-transition-duration, 200ms) ease-out, margin-left var(--dv-transition-duration, 200ms) ease-out, margin-right var(--dv-transition-duration, 200ms) ease-out, margin-top var(--dv-transition-duration, 200ms) ease-out, margin-bottom var(--dv-transition-duration, 200ms) ease-out;
}
.dv-tab.dv-tab--dragging {
  width: 0 !important;
  min-width: 0 !important;
  padding: 0 !important;
  margin: 0 !important;
  overflow: hidden;
  opacity: 0;
  pointer-events: none;
  transition: width var(--dv-transition-duration, 200ms) ease-out, padding var(--dv-transition-duration, 200ms) ease-out, margin var(--dv-transition-duration, 200ms) ease-out, opacity var(--dv-transition-duration, 200ms) ease-out;
}
.dv-tab.dv-tab--group-collapsed {
  width: 0 !important;
  min-width: 0 !important;
  padding: 0 !important;
  margin: 0 !important;
  overflow: hidden;
  opacity: 0;
  pointer-events: none;
  transition: width var(--dv-transition-duration, 200ms) ease-out, padding var(--dv-transition-duration, 200ms) ease-out, margin var(--dv-transition-duration, 200ms) ease-out, opacity var(--dv-transition-duration, 200ms) ease-out;
}
.dv-tab.dv-tab--group-expanding {
  transition: width var(--dv-transition-duration, 200ms) ease-out, padding var(--dv-transition-duration, 200ms) ease-out, margin var(--dv-transition-duration, 200ms) ease-out, opacity var(--dv-transition-duration, 200ms) ease-out;
}

.dv-tab.dv-tab--pinned:has(.dv-tab-pin) {
  display: flex;
  align-items: center;
}
.dv-tab.dv-tab--pinned .dv-tab-pin {
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  margin-right: 4px;
  opacity: 0.7;
  pointer-events: none;
}
.dv-tab.dv-tab--pinned .dv-tab-pin .dv-svg {
  width: 11px;
  height: 11px;
}
.dv-tab.dv-tab--pinned .dv-default-tab {
  min-width: 0;
}
.dv-tab.dv-tab--pinned .dv-default-tab-action {
  display: none;
}

.dv-tab.dv-tab--pinned-compact .dv-default-tab-content {
  display: none;
}
.dv-tab.dv-tab--pinned-compact .dv-tab-pin {
  margin-right: 0;
}

.dv-tabs-container:not(.dv-tabs-container--wrap):not(.dv-tabs-container-vertical) > .dv-tab.dv-tab--pinned-sticky {
  position: sticky;
  left: var(--dv-pinned-sticky-left, 0);
  z-index: 2;
}

.dv-tabs-and-actions-container.dv-tabs-and-actions-container--pinned-row {
  flex-wrap: wrap;
  height: auto;
  min-height: var(--dv-tabs-and-actions-container-height);
  align-content: flex-start;
}
.dv-tabs-and-actions-container.dv-tabs-and-actions-container--pinned-row .dv-pinned-row {
  flex: 0 0 100%;
  order: -1;
}
.dv-tabs-and-actions-container.dv-tabs-and-actions-container--pinned-row .dv-tab.dv-tab--pinned {
  display: none;
}

.dv-pinned-row {
  display: flex;
  align-items: center;
  gap: 2px;
  box-sizing: border-box;
  width: 100%;
  min-height: var(--dv-tabs-and-actions-container-height);
  padding: 2px 4px;
  background-color: var(--dv-tabs-and-actions-container-background-color);
  border-bottom: 1px solid var(--dv-tab-divider-color);
}

.dv-pinned-tab {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  box-sizing: border-box;
  padding: 0.25rem 0.5rem;
  font-size: var(--dv-tab-font-size);
  cursor: pointer;
  user-select: none;
  background-color: var(--dv-activegroup-hiddenpanel-tab-background-color);
  color: var(--dv-activegroup-hiddenpanel-tab-color);
}
.dv-pinned-tab.dv-pinned-tab--active {
  background-color: var(--dv-activegroup-visiblepanel-tab-background-color);
  color: var(--dv-activegroup-visiblepanel-tab-color);
}
.dv-pinned-tab .dv-pinned-tab-label {
  max-width: 120px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.dv-pinned-tab .dv-pinned-tab-unpin {
  flex-shrink: 0;
  opacity: 0.6;
}
.dv-pinned-tab .dv-pinned-tab-unpin:hover {
  opacity: 1;
}
.dv-pinned-tab.dv-pinned-tab--dragging {
  opacity: 0.5;
}
.dv-pinned-tab.dv-pinned-tab--drop-before, .dv-pinned-tab.dv-pinned-tab--drop-after {
  position: relative;
}
.dv-pinned-tab.dv-pinned-tab--drop-before::after, .dv-pinned-tab.dv-pinned-tab--drop-after::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  width: 2px;
  z-index: 10;
  pointer-events: none;
  background-color: var(--dv-drag-over-border-color);
}
.dv-pinned-tab.dv-pinned-tab--drop-before::after {
  left: 0;
}
.dv-pinned-tab.dv-pinned-tab--drop-after::after {
  right: 0;
}

@media (prefers-reduced-motion: reduce) {
  .dv-tab {
    transition: none !important;
  }
  .dv-tab-group-chip {
    transition: none !important;
  }
}
.dv-tab-group-chip {
  display: inline-flex;
  align-items: center;
  align-self: center;
  padding: var(--dv-tab-group-chip-padding);
  margin: 0 8px 0 8px;
  border-radius: var(--dv-tab-group-chip-border-radius);
  font-size: var(--dv-tab-group-chip-font-size);
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
  box-sizing: border-box;
  line-height: 1;
  touch-action: none;
  background-color: var(--dv-tab-group-color);
  color: white;
}
.dv-tab-group-chip.dv-tab-group-chip--accent-off {
  background-color: transparent;
  color: inherit;
}
.dv-tab-group-chip.dv-tab-group-chip--shifting {
  will-change: margin-left, margin-top;
  transition: margin-left var(--dv-transition-duration, 200ms) ease-out, margin-top var(--dv-transition-duration, 200ms) ease-out;
}
.dv-tab-group-chip.dv-tab-group-chip--dragging {
  width: 0 !important;
  min-width: 0 !important;
  padding: 0 !important;
  margin: 0 !important;
  overflow: hidden;
  opacity: 0;
  pointer-events: none;
  transition: width var(--dv-transition-duration, 200ms) ease-out, padding var(--dv-transition-duration, 200ms) ease-out, margin var(--dv-transition-duration, 200ms) ease-out, opacity var(--dv-transition-duration, 200ms) ease-out;
}
.dv-tab-group-chip .dv-tab-group-chip-label--empty {
  display: none;
}
.dv-tab-group-chip:has(.dv-tab-group-chip-label--empty) {
  position: relative;
  width: 12px;
  height: 12px;
  padding: 0;
  border-radius: 50%;
}
.dv-tab-group-chip:has(.dv-tab-group-chip-label--empty)::before {
  content: "";
  position: absolute;
  inset: -8px;
}

.dv-tab-group-underline {
  position: absolute;
  bottom: 0;
  opacity: var(--dv-tab-group-line-opacity);
  pointer-events: none;
  z-index: 10;
}

.dv-tab-group-chip-continuation {
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  opacity: var(--dv-tab-group-line-opacity);
  pointer-events: none;
  z-index: 10;
}

.dv-groupview-header-bottom .dv-tab-group-underline {
  bottom: auto;
  top: 0;
}

.dv-tabs-container-vertical .dv-tab-group-underline {
  bottom: auto;
  left: 0;
}

.dv-tabs-container-vertical .dv-tab-group-chip {
  margin: 8px 0 8px 0;
}
.dv-tabs-container-vertical .dv-tab-group-chip.dv-tab-group-chip--dragging {
  height: 0 !important;
  min-height: 0 !important;
  width: auto !important;
  min-width: initial !important;
  transition: height var(--dv-transition-duration, 200ms) ease-out, padding var(--dv-transition-duration, 200ms) ease-out, margin var(--dv-transition-duration, 200ms) ease-out, opacity var(--dv-transition-duration, 200ms) ease-out;
}
.dv-tabs-container-vertical .dv-tab {
  padding: 0.5rem 0.25rem;
}
.dv-tabs-container-vertical .dv-tab.dv-tab--group-collapsed {
  height: 0 !important;
  min-height: 0 !important;
  width: auto !important;
  min-width: initial !important;
  transition: height var(--dv-transition-duration, 200ms) ease-out, padding var(--dv-transition-duration, 200ms) ease-out, margin var(--dv-transition-duration, 200ms) ease-out, opacity var(--dv-transition-duration, 200ms) ease-out;
}
.dv-tabs-container-vertical .dv-tab.dv-tab--group-expanding {
  transition: height var(--dv-transition-duration, 200ms) ease-out, padding var(--dv-transition-duration, 200ms) ease-out, margin var(--dv-transition-duration, 200ms) ease-out, opacity var(--dv-transition-duration, 200ms) ease-out;
}
.dv-tabs-container-vertical .dv-tab.dv-tab--dragging {
  height: 0 !important;
  min-height: 0 !important;
  width: auto !important;
  min-width: initial !important;
  transition: height var(--dv-transition-duration, 200ms) ease-out, padding var(--dv-transition-duration, 200ms) ease-out, margin var(--dv-transition-duration, 200ms) ease-out, opacity var(--dv-transition-duration, 200ms) ease-out;
}

.dv-tabs-overflow-container {
  flex-direction: column;
  height: unset;
  font-size: var(--dv-tabs-and-actions-container-font-size);
  max-height: min(50vh, 400px);
  overflow-y: auto;
  border: 1px solid var(--dv-tab-divider-color);
  background-color: var(--dv-group-view-background-color);
  /* Scrollbar styling for webkit browsers */
}
.dv-tabs-overflow-container::-webkit-scrollbar {
  width: 6px;
}
.dv-tabs-overflow-container::-webkit-scrollbar-track {
  background: transparent;
}
.dv-tabs-overflow-container::-webkit-scrollbar-thumb {
  background: var(--dv-tabs-container-scrollbar-color);
  border-radius: 3px;
}
.dv-tabs-overflow-container {
  /* Firefox scrollbar */
  scrollbar-width: thin;
}
.dv-tabs-overflow-container .dv-tab:not(:last-child) {
  border-bottom: 1px solid var(--dv-tab-divider-color);
}
.dv-tabs-overflow-container .dv-active-tab {
  background-color: var(--dv-activegroup-visiblepanel-tab-background-color);
  color: var(--dv-activegroup-visiblepanel-tab-color);
}
.dv-tabs-overflow-container .dv-inactive-tab {
  background-color: var(--dv-activegroup-hiddenpanel-tab-background-color);
  color: var(--dv-activegroup-hiddenpanel-tab-color);
}
.dv-tabs-overflow-container .dv-tabs-overflow-group-header {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  font-size: 0.8em;
  font-weight: 600;
  color: var(--dv-activegroup-hiddenpanel-tab-color);
  cursor: pointer;
  border-bottom: 1px solid var(--dv-tab-divider-color);
}
.dv-tabs-overflow-container .dv-tabs-overflow-group-header:hover {
  background-color: var(--dv-icon-hover-background-color);
}
.dv-tabs-overflow-container .dv-tabs-overflow-group-color {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
  background-color: var(--dv-tab-group-color);
}
.dv-tabs-overflow-container .dv-tabs-overflow-group-label {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.dv-tabs-overflow-container .dv-tabs-overflow-group-collapsed-badge {
  font-size: 0.75em;
  font-weight: 400;
  opacity: 0.7;
  padding: 1px 4px;
  border-radius: 3px;
  background-color: var(--dv-tab-divider-color);
}
.dv-tabs-overflow-container .dv-tabs-overflow-pinned-header {
  cursor: default;
}
.dv-tabs-overflow-container .dv-tabs-overflow-pinned-header:hover {
  background-color: transparent;
}
.dv-tabs-overflow-container .dv-tabs-overflow-pinned-header .dv-tabs-overflow-pinned-icon {
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  opacity: 0.7;
}
.dv-tabs-overflow-container .dv-tabs-overflow-pinned-header .dv-tabs-overflow-pinned-icon .dv-svg {
  width: 11px;
  height: 11px;
}
.dv-tabs-overflow-container .dv-tab.dv-tab--grouped {
  padding-left: 16px;
}

/*
 * Advanced overflow popover (AdvancedOverflowModule): the same container as the
 * free list, upgraded in place with a search input, a scrollable listbox, and a
 * keyboard-highlighted active row. Styles live in core so the module ships no
 * CSS; they are inert unless the module renders this body.
 */
.dv-tabs-overflow-container.dv-tabs-overflow-advanced {
  min-width: 220px;
}
.dv-tabs-overflow-container.dv-tabs-overflow-advanced .dv-tabs-overflow-search {
  box-sizing: border-box;
  width: 100%;
  padding: 6px 8px;
  border: none;
  border-bottom: 1px solid var(--dv-tab-divider-color);
  outline: none;
  font-size: inherit;
  font-family: inherit;
  color: var(--dv-activegroup-visiblepanel-tab-color);
  background-color: var(--dv-group-view-background-color);
}
.dv-tabs-overflow-container.dv-tabs-overflow-advanced .dv-tabs-overflow-list {
  display: flex;
  flex-direction: column;
  outline: none;
}
.dv-tabs-overflow-container.dv-tabs-overflow-advanced .dv-tab.dv-tabs-overflow-option--focused {
  outline: 1px solid var(--dv-tab-divider-color);
  outline-offset: -1px;
  background-color: var(--dv-icon-hover-background-color);
}
.dv-tabs-and-actions-container {
  display: flex;
  background-color: var(--dv-tabs-and-actions-container-background-color);
  flex-shrink: 0;
  box-sizing: border-box;
  height: var(--dv-tabs-and-actions-container-height);
  font-size: var(--dv-tabs-and-actions-container-font-size);
  /**
   * Multi-row (wrapping) tabs: when the tab list wraps onto multiple rows
   * (\`.dv-tabs-container--wrap\`, toggled by the \`MultiRowTabsModule\`), the
   * header grows to fit instead of clipping. Inert otherwise: the single-row
   * fixed height above is unchanged.
   */
}
.dv-tabs-and-actions-container:has(.dv-tabs-container--wrap) {
  height: auto;
  min-height: var(--dv-tabs-and-actions-container-height);
  align-items: flex-start;
}
.dv-tabs-and-actions-container:has(.dv-tabs-container--wrap) > .dv-pre-actions-container,
.dv-tabs-and-actions-container:has(.dv-tabs-container--wrap) > .dv-left-actions-container,
.dv-tabs-and-actions-container:has(.dv-tabs-container--wrap) > .dv-right-actions-container,
.dv-tabs-and-actions-container:has(.dv-tabs-container--wrap) > .dv-void-container {
  height: var(--dv-tabs-and-actions-container-height);
}
.dv-tabs-and-actions-container.dv-single-tab.dv-full-width-single-tab .dv-scrollable {
  flex-grow: 1;
}
.dv-tabs-and-actions-container.dv-single-tab.dv-full-width-single-tab .dv-tabs-container {
  flex-grow: 1;
}
.dv-tabs-and-actions-container.dv-single-tab.dv-full-width-single-tab .dv-tabs-container .dv-tab {
  flex-grow: 1;
  padding: 0px;
}
.dv-tabs-and-actions-container.dv-single-tab.dv-full-width-single-tab .dv-void-container {
  flex-grow: 0;
}
.dv-tabs-and-actions-container .dv-void-container {
  display: flex;
  flex-grow: 1;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  touch-action: none;
}
.dv-tabs-and-actions-container .dv-void-container.dv-draggable {
  cursor: grab;
}
.dv-tabs-and-actions-container .dv-right-actions-container {
  display: flex;
}
.dv-tabs-and-actions-container .dv-right-actions-container.dv-right-actions-container-vertical {
  flex-direction: column;
}
.dv-tabs-and-actions-container.dv-groupview-header-vertical {
  flex-direction: column;
  height: auto;
  width: var(--dv-tabs-and-actions-container-height);
}
.dv-tabs-and-actions-container.dv-groupview-header-vertical:has(.dv-tabs-container--wrap) {
  width: auto;
  min-width: var(--dv-tabs-and-actions-container-height);
}
.dv-tabs-and-actions-container.dv-groupview-header-vertical:has(.dv-tabs-container--wrap) > .dv-scrollable {
  align-self: stretch;
}
.dv-watermark {
  display: flex;
  height: 100%;
}
.dv-dockview {
  position: relative;
  background-color: var(--dv-group-view-background-color);
}
.dv-dockview .dv-watermark-container {
  position: absolute;
  top: 0px;
  left: 0px;
  height: 100%;
  width: 100%;
  z-index: 1;
}
.dv-dockview .dv-overlay-render-container {
  position: relative;
}

.dv-groupview.dv-active-group > .dv-tabs-and-actions-container .dv-tabs-container > .dv-tab.dv-active-tab {
  background-color: var(--dv-activegroup-visiblepanel-tab-background-color);
  color: var(--dv-activegroup-visiblepanel-tab-color);
}
.dv-groupview.dv-active-group > .dv-tabs-and-actions-container .dv-tabs-container > .dv-tab.dv-inactive-tab {
  background-color: var(--dv-activegroup-hiddenpanel-tab-background-color);
  color: var(--dv-activegroup-hiddenpanel-tab-color);
}
.dv-groupview.dv-inactive-group > .dv-tabs-and-actions-container .dv-tabs-container > .dv-tab.dv-active-tab {
  background-color: var(--dv-inactivegroup-visiblepanel-tab-background-color);
  color: var(--dv-inactivegroup-visiblepanel-tab-color);
}
.dv-groupview.dv-inactive-group > .dv-tabs-and-actions-container .dv-tabs-container > .dv-tab.dv-inactive-tab {
  background-color: var(--dv-inactivegroup-hiddenpanel-tab-background-color);
  color: var(--dv-inactivegroup-hiddenpanel-tab-color);
}

/**
 * when a tab is dragged we lose the above stylings because they are conditional on parent elements
 * therefore we also set some stylings for the dragging event
 **/
.dv-tab.dv-tab-dragging {
  background-color: var(--dv-activegroup-visiblepanel-tab-background-color);
  color: var(--dv-activegroup-visiblepanel-tab-color);
}

.dv-keyboard-docking-hint {
  position: absolute;
  left: 50%;
  bottom: 8px;
  transform: translateX(-50%);
  z-index: 100;
  max-width: 90%;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 12px;
  line-height: 1.4;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  pointer-events: none;
  background-color: var(--dv-context-menu-background-color, var(--dv-group-view-background-color));
  color: var(--dv-activegroup-visiblepanel-tab-color);
  border: 1px solid var(--dv-tab-divider-color);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.35);
}
.dv-groupview {
  display: flex;
  height: 100%;
  background-color: var(--dv-group-view-background-color);
  overflow: hidden;
  flex-direction: column;
}
.dv-groupview:focus {
  outline: none;
}
.dv-groupview > .dv-content-container {
  flex-grow: 1;
  min-height: 0;
  outline: none;
}
.dv-groupview.dv-groupview-header-bottom {
  flex-direction: column-reverse;
}
.dv-groupview.dv-groupview-header-left {
  flex-direction: row;
}
.dv-groupview.dv-groupview-header-right {
  flex-direction: row-reverse;
}
.dv-groupview.dv-groupview-edge.dv-edge-collapsed > .dv-content-container {
  display: none;
}
.dv-root-wrapper {
  height: 100%;
  width: 100%;
}
.dv-grid-view,
.dv-branch-node {
  height: 100%;
  width: 100%;
}
.dv-debug .dv-resize-container .dv-resize-handle-top {
  background-color: red;
}
.dv-debug .dv-resize-container .dv-resize-handle-bottom {
  background-color: green;
}
.dv-debug .dv-resize-container .dv-resize-handle-left {
  background-color: yellow;
}
.dv-debug .dv-resize-container .dv-resize-handle-right {
  background-color: blue;
}
.dv-debug .dv-resize-container .dv-resize-handle-topleft,
.dv-debug .dv-resize-container .dv-resize-handle-topright,
.dv-debug .dv-resize-container .dv-resize-handle-bottomleft,
.dv-debug .dv-resize-container .dv-resize-handle-bottomright {
  background-color: cyan;
}

.dv-floating-overlay-host {
  position: absolute;
  pointer-events: none;
}
.dv-floating-overlay-host > .dv-resize-container {
  pointer-events: auto;
}

.dv-edge-peek {
  background-color: var(--dv-group-view-background-color);
  border: 1px solid var(--dv-separator-border);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
}
.dv-edge-peek > * {
  width: 100%;
  height: 100%;
  overflow: auto;
}

.dv-auto-edge-band {
  position: absolute;
  pointer-events: none;
  z-index: var(--dv-overlay-z-index, 999);
  background-color: var(--dv-edge-dock-indicator-color);
  box-shadow: 0 0 6px var(--dv-edge-dock-indicator-color);
}

.dv-edge-drop-strip {
  position: absolute;
  z-index: var(--dv-overlay-z-index, 999);
}
.dv-edge-drop-strip--top, .dv-edge-drop-strip--bottom {
  height: var(--dv-edge-drop-strip-size, 8px);
}
.dv-edge-drop-strip--left, .dv-edge-drop-strip--right {
  width: var(--dv-edge-drop-strip-size, 8px);
}
.dv-edge-drop-strip--bottom {
  transform: translateY(-100%);
}
.dv-edge-drop-strip--right {
  transform: translateX(-100%);
}

.dv-edge-peek-header {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 0 4px 0 8px;
  box-sizing: border-box;
  background-color: var(--dv-group-view-background-color);
  border: 1px solid var(--dv-separator-border);
  border-bottom: none;
  color: var(--dv-activegroup-visiblepanel-tab-color);
  font-size: 12px;
}
.dv-edge-peek-header .dv-edge-peek-pin,
.dv-edge-peek-header .dv-edge-peek-close {
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  cursor: pointer;
  border: none;
  padding: 4px;
  color: inherit;
  background: transparent;
  outline: none;
}
.dv-edge-peek-header .dv-edge-peek-pin:hover,
.dv-edge-peek-header .dv-edge-peek-close:hover {
  border-radius: 2px;
  background-color: var(--dv-icon-hover-background-color);
}
.dv-edge-peek-header .dv-edge-peek-pin:focus-visible,
.dv-edge-peek-header .dv-edge-peek-close:focus-visible {
  border-radius: 2px;
  outline: 1px solid var(--dv-tab-divider-color);
  outline-offset: -1px;
}

.dv-edge-peek-title {
  flex: 1 1 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.dv-resize-container > .dv-grid-view {
  width: 100%;
  height: 100%;
}

.dv-resize-container-with-titlebar {
  display: flex;
  flex-direction: column;
}
.dv-resize-container-with-titlebar > .dv-floating-titlebar {
  flex: 0 0 auto;
}
.dv-resize-container-with-titlebar > .dv-grid-view {
  height: auto;
  flex: 1 1 0;
  min-height: 0;
}

.dv-floating-titlebar {
  box-sizing: border-box;
  flex-shrink: 0;
  height: var(--dv-floating-titlebar-height, 22px);
  background-color: var(--dv-floating-titlebar-background-color);
  border-bottom: var(--dv-floating-titlebar-border-bottom, none);
  user-select: none;
  touch-action: none;
}
.dv-floating-titlebar.dv-draggable {
  cursor: grab;
}

.dv-resize-container {
  --dv-overlay-z-index: var(--dv-overlay-z-index, 999);
  position: absolute;
  z-index: calc(var(--dv-overlay-z-index) - 2);
  background-color: var(--dv-group-view-background-color);
  border: var(--dv-floating-border);
  box-shadow: var(--dv-floating-box-shadow);
  /* GPU optimizations for floating group movement */
  will-change: transform, opacity;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
}
.dv-resize-container.dv-hidden {
  display: none;
}
.dv-resize-container.dv-resize-container-dragging {
  opacity: var(--dv-floating-group-dragging-opacity);
  /* Enhanced GPU acceleration during drag */
  will-change: transform, opacity;
}
.dv-resize-container .dv-resize-handle-top,
.dv-resize-container .dv-resize-handle-bottom,
.dv-resize-container .dv-resize-handle-left,
.dv-resize-container .dv-resize-handle-right,
.dv-resize-container .dv-resize-handle-topleft,
.dv-resize-container .dv-resize-handle-topright,
.dv-resize-container .dv-resize-handle-bottomleft,
.dv-resize-container .dv-resize-handle-bottomright {
  touch-action: none;
}
.dv-resize-container .dv-resize-handle-top {
  height: 4px;
  width: calc(100% - 8px);
  left: 4px;
  top: -2px;
  z-index: var(--dv-overlay-z-index);
  position: absolute;
  cursor: ns-resize;
}
.dv-resize-container .dv-resize-handle-bottom {
  height: 4px;
  width: calc(100% - 8px);
  left: 4px;
  bottom: -2px;
  z-index: var(--dv-overlay-z-index);
  position: absolute;
  cursor: ns-resize;
}
.dv-resize-container .dv-resize-handle-left {
  height: calc(100% - 8px);
  width: 4px;
  left: -2px;
  top: 4px;
  z-index: var(--dv-overlay-z-index);
  position: absolute;
  cursor: ew-resize;
}
.dv-resize-container .dv-resize-handle-right {
  height: calc(100% - 8px);
  width: 4px;
  right: -2px;
  top: 4px;
  z-index: var(--dv-overlay-z-index);
  position: absolute;
  cursor: ew-resize;
}
.dv-resize-container .dv-resize-handle-topleft {
  height: 4px;
  width: 4px;
  top: -2px;
  left: -2px;
  z-index: var(--dv-overlay-z-index);
  position: absolute;
  cursor: nw-resize;
}
.dv-resize-container .dv-resize-handle-topright {
  height: 4px;
  width: 4px;
  right: -2px;
  top: -2px;
  z-index: var(--dv-overlay-z-index);
  position: absolute;
  cursor: ne-resize;
}
.dv-resize-container .dv-resize-handle-bottomleft {
  height: 4px;
  width: 4px;
  left: -2px;
  bottom: -2px;
  z-index: var(--dv-overlay-z-index);
  position: absolute;
  cursor: sw-resize;
}
.dv-resize-container .dv-resize-handle-bottomright {
  height: 4px;
  width: 4px;
  right: -2px;
  bottom: -2px;
  z-index: var(--dv-overlay-z-index);
  position: absolute;
  cursor: se-resize;
}
@media (pointer: coarse) {
  .dv-resize-container .dv-resize-handle-top,
  .dv-resize-container .dv-resize-handle-bottom {
    height: 16px;
    width: calc(100% - 48px);
    left: 24px;
  }
  .dv-resize-container .dv-resize-handle-top {
    top: -10px;
  }
  .dv-resize-container .dv-resize-handle-bottom {
    bottom: -10px;
  }
  .dv-resize-container .dv-resize-handle-left,
  .dv-resize-container .dv-resize-handle-right {
    width: 16px;
    height: calc(100% - 48px);
    top: 24px;
  }
  .dv-resize-container .dv-resize-handle-left {
    left: -10px;
  }
  .dv-resize-container .dv-resize-handle-right {
    right: -10px;
  }
  .dv-resize-container .dv-resize-handle-topleft,
  .dv-resize-container .dv-resize-handle-topright,
  .dv-resize-container .dv-resize-handle-bottomleft,
  .dv-resize-container .dv-resize-handle-bottomright {
    height: 24px;
    width: 24px;
  }
  .dv-resize-container .dv-resize-handle-topleft {
    top: -12px;
    left: -12px;
  }
  .dv-resize-container .dv-resize-handle-topright {
    top: -12px;
    right: -12px;
  }
  .dv-resize-container .dv-resize-handle-bottomleft {
    bottom: -12px;
    left: -12px;
  }
  .dv-resize-container .dv-resize-handle-bottomright {
    bottom: -12px;
    right: -12px;
  }
}

.dv-smart-guides {
  pointer-events: none;
  z-index: calc(var(--dv-overlay-z-index, 999) + 100);
}

.dv-smart-guide {
  background-color: var(--dv-smart-guides-color, #1f9cf0);
}

.dv-smart-guide-preview {
  box-sizing: border-box;
  background-color: var(--dv-smart-guides-preview-color, rgba(31, 156, 240, 0.18));
  border: 1px solid var(--dv-smart-guides-color, #1f9cf0);
}
.dv-render-overlay {
  --dv-overlay-z-index: var(--dv-overlay-z-index, 999);
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  contain: layout paint;
  isolation: isolate;
  /* GPU optimizations */
  will-change: transform;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
}
.dv-render-overlay.dv-render-overlay-float {
  z-index: calc(var(--dv-overlay-z-index) - 1);
}

.dv-debug .dv-render-overlay {
  outline: 1px solid red;
  outline-offset: -1;
}
.dv-pane-container {
  height: 100%;
  width: 100%;
}
.dv-pane-container.dv-animated .dv-view {
  /* GPU optimizations for smooth pane animations */
  will-change: transform;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  transition: transform 0.15s ease-out;
}
.dv-pane-container .dv-view {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 0px !important;
}
.dv-pane-container .dv-view:not(:first-child)::before {
  background-color: transparent !important;
}
.dv-pane-container .dv-view:not(:first-child) .dv-pane > .dv-pane-header {
  border-top: 1px solid var(--dv-paneview-header-border-color, var(--dv-separator-border));
}
.dv-pane-container .dv-view .dv-default-header {
  background-color: var(--dv-group-view-background-color);
  color: var(--dv-activegroup-visiblepanel-tab-color);
  display: flex;
  padding: 0px 8px;
  cursor: pointer;
}
.dv-pane-container .dv-view .dv-default-header .dv-pane-header-icon {
  display: flex;
  justify-content: center;
  align-items: center;
}
.dv-pane-container .dv-view .dv-default-header > span {
  padding-left: 8px;
  flex-grow: 1;
}
.dv-pane-container:first-of-type > .dv-pane > .dv-pane-header {
  border-top: none !important;
}
.dv-pane-container .dv-pane {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
}
.dv-pane-container .dv-pane .dv-pane-header {
  box-sizing: border-box;
  user-select: none;
  position: relative;
  outline: none;
}
.dv-pane-container .dv-pane .dv-pane-header.dv-pane-draggable {
  cursor: pointer;
}
.dv-pane-container .dv-pane .dv-pane-header:focus-visible:before, .dv-pane-container .dv-pane .dv-pane-header:has(:focus-visible):before {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
  content: "";
  pointer-events: none;
  outline: 1px solid;
  outline-width: -1px;
  outline-style: solid;
  outline-offset: -1px;
  outline-color: var(--dv-paneview-active-outline-color);
}
.dv-pane-container .dv-pane .dv-pane-body {
  overflow-y: auto;
  overflow-x: hidden;
  flex-grow: 1;
  position: relative;
  outline: none;
}
.dv-pane-container .dv-pane .dv-pane-body:focus-visible:before, .dv-pane-container .dv-pane .dv-pane-body:has(:focus-visible):before {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
  content: "";
  pointer-events: none;
  outline: 1px solid;
  outline-width: -1px;
  outline-style: solid;
  outline-offset: -1px;
  outline-color: var(--dv-paneview-active-outline-color);
}
.dv-scrollable {
  position: relative;
  overflow: hidden;
}
.dv-scrollable .dv-scrollbar {
  position: absolute;
  border-radius: 2px;
  background-color: transparent;
  /* GPU optimizations */
  will-change: background-color, transform;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  transition-property: background-color;
  transition-timing-function: ease-in-out;
  transition-duration: 1s;
  transition-delay: 0s;
}
.dv-scrollable .dv-scrollbar-horizontal {
  bottom: 0px;
  left: 0px;
  height: 4px;
}
.dv-scrollable .dv-scrollbar-vertical {
  right: 0px;
  top: 0px;
  width: 4px;
}
.dv-scrollable:hover .dv-scrollbar, .dv-scrollable.dv-scrollable-resizing .dv-scrollbar, .dv-scrollable.dv-scrollable-scrolling .dv-scrollbar {
  background-color: var(--dv-scrollbar-background-color, rgba(255, 255, 255, 0.25));
}
.dv-debug .dv-split-view-container .dv-sash-container .dv-sash.dv-enabled {
  background-color: black;
}
.dv-debug .dv-split-view-container .dv-sash-container .dv-sash.dv-disabled {
  background-color: orange;
}
.dv-debug .dv-split-view-container .dv-sash-container .dv-sash.dv-maximum {
  background-color: green;
}
.dv-debug .dv-split-view-container .dv-sash-container .dv-sash.dv-minimum {
  background-color: red;
}

.dv-split-view-container {
  position: relative;
  overflow: hidden;
  height: 100%;
  width: 100%;
}
.dv-split-view-container.dv-splitview-disabled > .dv-sash-container > .dv-sash {
  pointer-events: none;
}
.dv-split-view-container.dv-animation .dv-view,
.dv-split-view-container.dv-animation .dv-sash {
  /* GPU optimizations for smooth animations */
  will-change: transform;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  transition: transform 0.15s ease-out;
}
.dv-split-view-container.dv-horizontal {
  height: 100%;
}
.dv-split-view-container.dv-horizontal > .dv-sash-container > .dv-sash {
  height: 100%;
  width: 4px;
}
.dv-split-view-container.dv-horizontal > .dv-sash-container > .dv-sash.dv-enabled {
  cursor: ew-resize;
}
.dv-split-view-container.dv-horizontal > .dv-sash-container > .dv-sash.dv-disabled {
  cursor: default;
}
.dv-split-view-container.dv-horizontal > .dv-sash-container > .dv-sash.dv-maximum {
  cursor: w-resize;
}
.dv-split-view-container.dv-horizontal > .dv-sash-container > .dv-sash.dv-minimum {
  cursor: e-resize;
}
.dv-split-view-container.dv-horizontal > .dv-view-container > .dv-view:not(:first-child)::before {
  height: 100%;
  width: 1px;
}
.dv-split-view-container.dv-vertical {
  width: 100%;
}
.dv-split-view-container.dv-vertical > .dv-sash-container > .dv-sash {
  width: 100%;
  height: 4px;
}
.dv-split-view-container.dv-vertical > .dv-sash-container > .dv-sash.dv-enabled {
  cursor: ns-resize;
}
.dv-split-view-container.dv-vertical > .dv-sash-container > .dv-sash.dv-disabled {
  cursor: default;
}
.dv-split-view-container.dv-vertical > .dv-sash-container > .dv-sash.dv-maximum {
  cursor: n-resize;
}
.dv-split-view-container.dv-vertical > .dv-sash-container > .dv-sash.dv-minimum {
  cursor: s-resize;
}
.dv-split-view-container.dv-vertical > .dv-view-container > .dv-view {
  width: 100%;
}
.dv-split-view-container.dv-vertical > .dv-view-container > .dv-view:not(:first-child)::before {
  height: 1px;
  width: 100%;
}
.dv-split-view-container .dv-sash-container {
  height: 100%;
  width: 100%;
  position: absolute;
}
.dv-split-view-container .dv-sash-container .dv-sash {
  position: absolute;
  z-index: 99;
  outline: none;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  touch-action: none;
  background-color: var(--dv-sash-color, transparent);
}
.dv-split-view-container .dv-sash-container .dv-sash:not(.disabled):active, .dv-split-view-container .dv-sash-container .dv-sash:not(.disabled):hover {
  background-color: var(--dv-active-sash-color, transparent);
  transition-property: background-color;
  transition-timing-function: ease-in-out;
  transition-duration: var(--dv-active-sash-transition-duration, 0.1s);
  transition-delay: var(--dv-active-sash-transition-delay, 0.5s);
}
@media (pointer: coarse) {
  .dv-split-view-container .dv-sash-container > .dv-sash:not(.dv-disabled)::before {
    content: "";
    position: absolute;
    background: transparent;
  }
  .dv-split-view-container.dv-horizontal > .dv-sash-container > .dv-sash:not(.dv-disabled)::before {
    top: 0;
    bottom: 0;
    left: -10px;
    right: -10px;
  }
  .dv-split-view-container.dv-vertical > .dv-sash-container > .dv-sash:not(.dv-disabled)::before {
    left: 0;
    right: 0;
    top: -10px;
    bottom: -10px;
  }
}
.dv-split-view-container .dv-view-container {
  position: relative;
  height: 100%;
  width: 100%;
}
.dv-split-view-container .dv-view-container .dv-view {
  height: 100%;
  box-sizing: border-box;
  overflow: auto;
  position: absolute;
}
.dv-split-view-container.dv-separator-border .dv-view:not(:first-child)::before {
  content: " ";
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
  pointer-events: none;
  background-color: var(--dv-separator-border);
}
.dv-svg {
  display: inline-block;
  fill: currentcolor;
  line-height: 1;
  stroke: currentcolor;
  stroke-width: 0;
}
.dockview-theme-dark {
  --dv-paneview-active-outline-color: dodgerblue;
  --dv-tabs-and-actions-container-font-size: 13px;
  --dv-tabs-and-actions-container-height: 35px;
  --dv-drag-over-background-color: rgba(83, 89, 93, 0.5);
  --dv-drag-over-border-color: transparent;
  --dv-edge-dock-indicator-color: rgba(56, 139, 253, 0.9);
  --dv-edge-drop-strip-size: 8px;
  --dv-tabs-container-scrollbar-color: #888;
  --dv-icon-hover-background-color: rgba(90, 93, 94, 0.31);
  --dv-floating-box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.4), 0 2px 8px rgba(0, 0, 0, 0.25);
  --dv-floating-border: 1px solid rgba(255, 255, 255, 0.1);
  --dv-overlay-z-index: 999;
  --dv-tab-font-size: inherit;
  --dv-border-radius: 0px;
  --dv-tab-margin: 0;
  --dv-sash-color: transparent;
  --dv-active-sash-color: transparent;
  --dv-active-sash-transition-duration: 0.1s;
  --dv-active-sash-transition-delay: 0.5s;
  --dv-spacing-padding: 0px;
  --dv-tab-border-radius: 0px;
  --dv-sash-border-radius: 0px;
  --dv-dropdown-border-radius: 0px;
  --dv-tab-close-icon-size: inherit;
  --dv-floating-group-border: none;
  --dv-drag-over-border: none;
  --dv-floating-group-dragging-opacity: 0.5;
  --dv-floating-titlebar-height: 22px;
  --dv-floating-titlebar-background-color: var(
      --dv-tabs-and-actions-container-background-color
  );
  --dv-floating-titlebar-border-bottom: var(--dv-floating-border);
  --dv-tab-group-color-grey: #5f6368;
  --dv-tab-group-color-blue: #1a73e8;
  --dv-tab-group-color-red: #d93025;
  --dv-tab-group-color-yellow: #f9ab00;
  --dv-tab-group-color-green: #188038;
  --dv-tab-group-color-pink: #d01884;
  --dv-tab-group-color-purple: #a142f4;
  --dv-tab-group-color-cyan: #007b83;
  --dv-tab-group-color-orange: #e8710a;
  --dv-tab-group-chip-padding: 4px 8px;
  --dv-tab-group-chip-border-radius: 6px;
  --dv-tab-group-chip-font-size: 11px;
  --dv-tab-group-line-height: 2px;
  --dv-tab-group-line-opacity: 0.6;
}
.dockview-theme-dark .dv-drop-target-container .dv-drop-target-anchor.dv-drop-target-anchor-container-changed {
  opacity: 0;
  transition: none;
}
.dockview-theme-dark {
  color-scheme: dark;
  --dv-group-view-background-color: #1e1e1e;
  --dv-tabs-and-actions-container-background-color: #252526;
  --dv-activegroup-visiblepanel-tab-background-color: #1e1e1e;
  --dv-activegroup-hiddenpanel-tab-background-color: #2d2d2d;
  --dv-inactivegroup-visiblepanel-tab-background-color: #1e1e1e;
  --dv-inactivegroup-hiddenpanel-tab-background-color: #2d2d2d;
  --dv-tab-divider-color: #1e1e1e;
  --dv-activegroup-visiblepanel-tab-color: white;
  --dv-activegroup-hiddenpanel-tab-color: #969696;
  --dv-inactivegroup-visiblepanel-tab-color: #8f8f8f;
  --dv-inactivegroup-hiddenpanel-tab-color: #626262;
  --dv-separator-border: rgb(68, 68, 68);
  --dv-paneview-header-border-color: rgba(204, 204, 204, 0.2);
}

.dockview-theme-light {
  --dv-paneview-active-outline-color: dodgerblue;
  --dv-tabs-and-actions-container-font-size: 13px;
  --dv-tabs-and-actions-container-height: 35px;
  --dv-drag-over-background-color: rgba(83, 89, 93, 0.5);
  --dv-drag-over-border-color: transparent;
  --dv-edge-dock-indicator-color: rgba(56, 139, 253, 0.9);
  --dv-edge-drop-strip-size: 8px;
  --dv-tabs-container-scrollbar-color: #888;
  --dv-icon-hover-background-color: rgba(90, 93, 94, 0.31);
  --dv-floating-box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.4), 0 2px 8px rgba(0, 0, 0, 0.25);
  --dv-floating-border: 1px solid rgba(255, 255, 255, 0.1);
  --dv-overlay-z-index: 999;
  --dv-tab-font-size: inherit;
  --dv-border-radius: 0px;
  --dv-tab-margin: 0;
  --dv-sash-color: transparent;
  --dv-active-sash-color: transparent;
  --dv-active-sash-transition-duration: 0.1s;
  --dv-active-sash-transition-delay: 0.5s;
  --dv-spacing-padding: 0px;
  --dv-tab-border-radius: 0px;
  --dv-sash-border-radius: 0px;
  --dv-dropdown-border-radius: 0px;
  --dv-tab-close-icon-size: inherit;
  --dv-floating-group-border: none;
  --dv-drag-over-border: none;
  --dv-floating-group-dragging-opacity: 0.5;
  --dv-floating-titlebar-height: 22px;
  --dv-floating-titlebar-background-color: var(
      --dv-tabs-and-actions-container-background-color
  );
  --dv-floating-titlebar-border-bottom: var(--dv-floating-border);
  --dv-tab-group-color-grey: #5f6368;
  --dv-tab-group-color-blue: #1a73e8;
  --dv-tab-group-color-red: #d93025;
  --dv-tab-group-color-yellow: #f9ab00;
  --dv-tab-group-color-green: #188038;
  --dv-tab-group-color-pink: #d01884;
  --dv-tab-group-color-purple: #a142f4;
  --dv-tab-group-color-cyan: #007b83;
  --dv-tab-group-color-orange: #e8710a;
  --dv-tab-group-chip-padding: 4px 8px;
  --dv-tab-group-chip-border-radius: 6px;
  --dv-tab-group-chip-font-size: 11px;
  --dv-tab-group-line-height: 2px;
  --dv-tab-group-line-opacity: 0.6;
}
.dockview-theme-light .dv-drop-target-container .dv-drop-target-anchor.dv-drop-target-anchor-container-changed {
  opacity: 0;
  transition: none;
}
.dockview-theme-light {
  color-scheme: light;
  --dv-group-view-background-color: white;
  --dv-tabs-and-actions-container-background-color: #f3f3f3;
  --dv-activegroup-visiblepanel-tab-background-color: white;
  --dv-activegroup-hiddenpanel-tab-background-color: #ececec;
  --dv-inactivegroup-visiblepanel-tab-background-color: white;
  --dv-inactivegroup-hiddenpanel-tab-background-color: #ececec;
  --dv-tab-divider-color: white;
  --dv-activegroup-visiblepanel-tab-color: rgb(51, 51, 51);
  --dv-activegroup-hiddenpanel-tab-color: rgba(51, 51, 51, 0.7);
  --dv-inactivegroup-visiblepanel-tab-color: rgba(51, 51, 51, 0.7);
  --dv-inactivegroup-hiddenpanel-tab-color: rgba(51, 51, 51, 0.35);
  --dv-separator-border: rgba(128, 128, 128, 0.35);
  --dv-paneview-header-border-color: rgb(51, 51, 51);
  --dv-scrollbar-background-color: rgba(0, 0, 0, 0.25);
  --dv-floating-box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08);
  --dv-floating-border: 1px solid rgba(0, 0, 0, 0.1);
}

.dockview-theme-vs {
  --dv-paneview-active-outline-color: dodgerblue;
  --dv-tabs-and-actions-container-font-size: 13px;
  --dv-tabs-and-actions-container-height: 35px;
  --dv-drag-over-background-color: rgba(83, 89, 93, 0.5);
  --dv-drag-over-border-color: transparent;
  --dv-edge-dock-indicator-color: rgba(56, 139, 253, 0.9);
  --dv-edge-drop-strip-size: 8px;
  --dv-tabs-container-scrollbar-color: #888;
  --dv-icon-hover-background-color: rgba(90, 93, 94, 0.31);
  --dv-floating-box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.4), 0 2px 8px rgba(0, 0, 0, 0.25);
  --dv-floating-border: 1px solid rgba(255, 255, 255, 0.1);
  --dv-overlay-z-index: 999;
  --dv-tab-font-size: inherit;
  --dv-border-radius: 0px;
  --dv-tab-margin: 0;
  --dv-sash-color: transparent;
  --dv-active-sash-color: transparent;
  --dv-active-sash-transition-duration: 0.1s;
  --dv-active-sash-transition-delay: 0.5s;
  --dv-spacing-padding: 0px;
  --dv-tab-border-radius: 0px;
  --dv-sash-border-radius: 0px;
  --dv-dropdown-border-radius: 0px;
  --dv-tab-close-icon-size: inherit;
  --dv-floating-group-border: none;
  --dv-drag-over-border: none;
  --dv-floating-group-dragging-opacity: 0.5;
  --dv-floating-titlebar-height: 22px;
  --dv-floating-titlebar-background-color: var(
      --dv-tabs-and-actions-container-background-color
  );
  --dv-floating-titlebar-border-bottom: var(--dv-floating-border);
  --dv-tab-group-color-grey: #5f6368;
  --dv-tab-group-color-blue: #1a73e8;
  --dv-tab-group-color-red: #d93025;
  --dv-tab-group-color-yellow: #f9ab00;
  --dv-tab-group-color-green: #188038;
  --dv-tab-group-color-pink: #d01884;
  --dv-tab-group-color-purple: #a142f4;
  --dv-tab-group-color-cyan: #007b83;
  --dv-tab-group-color-orange: #e8710a;
  --dv-tab-group-chip-padding: 4px 8px;
  --dv-tab-group-chip-border-radius: 6px;
  --dv-tab-group-chip-font-size: 11px;
  --dv-tab-group-line-height: 2px;
  --dv-tab-group-line-opacity: 0.6;
}
.dockview-theme-vs .dv-drop-target-container .dv-drop-target-anchor.dv-drop-target-anchor-container-changed {
  opacity: 0;
  transition: none;
}
.dockview-theme-vs {
  color-scheme: dark;
  --dv-group-view-background-color: #1e1e1e;
  --dv-tabs-and-actions-container-background-color: #252526;
  --dv-activegroup-visiblepanel-tab-background-color: #1e1e1e;
  --dv-activegroup-hiddenpanel-tab-background-color: #2d2d2d;
  --dv-inactivegroup-visiblepanel-tab-background-color: #1e1e1e;
  --dv-inactivegroup-hiddenpanel-tab-background-color: #2d2d2d;
  --dv-tab-divider-color: #1e1e1e;
  --dv-activegroup-visiblepanel-tab-color: white;
  --dv-activegroup-hiddenpanel-tab-color: #969696;
  --dv-inactivegroup-visiblepanel-tab-color: #8f8f8f;
  --dv-inactivegroup-hiddenpanel-tab-color: #626262;
  --dv-separator-border: rgb(68, 68, 68);
  --dv-paneview-header-border-color: rgba(204, 204, 204, 0.2);
  --dv-tabs-and-actions-container-background-color: #2d2d30;
  --dv-tabs-and-actions-container-height: 20px;
  --dv-tabs-and-actions-container-font-size: 11px;
  --dv-activegroup-visiblepanel-tab-background-color: #007acc;
  --dv-inactivegroup-visiblepanel-tab-background-color: #3f3f46;
  --dv-activegroup-visiblepanel-tab-color: white;
  --dv-activegroup-hiddenpanel-tab-color: white;
  --dv-inactivegroup-visiblepanel-tab-color: white;
  --dv-inactivegroup-hiddenpanel-tab-color: white;
}
.dockview-theme-vs .dv-groupview.dv-active-group > .dv-tabs-and-actions-container {
  box-sizing: content-box;
  border-bottom: 2px solid var(--dv-activegroup-visiblepanel-tab-background-color);
}
.dockview-theme-vs .dv-groupview.dv-active-group > .dv-tabs-and-actions-container .dv-tab.dv-active-tab {
  border-top: 2px solid var(--dv-activegroup-visiblepanel-tab-background-color);
}
.dockview-theme-vs .dv-groupview.dv-active-group > .dv-tabs-and-actions-container .dv-tab.dv-inactive-tab {
  border-top: 2px solid var(--dv-activegroup-hiddenpanel-tab-background-color);
}
.dockview-theme-vs .dv-groupview.dv-inactive-group > .dv-tabs-and-actions-container {
  box-sizing: content-box;
  border-bottom: 2px solid var(--dv-inactivegroup-visiblepanel-tab-background-color);
}
.dockview-theme-vs .dv-groupview.dv-inactive-group > .dv-tabs-and-actions-container .dv-tab.dv-active-tab {
  border-top: 2px solid var(--dv-inactivegroup-visiblepanel-tab-background-color);
}
.dockview-theme-vs .dv-groupview.dv-inactive-group > .dv-tabs-and-actions-container .dv-tab.dv-inactive-tab {
  border-top: 2px solid var(--dv-inactivegroup-hiddenpanel-tab-background-color);
}

.dockview-theme-abyss {
  --dv-paneview-active-outline-color: dodgerblue;
  --dv-tabs-and-actions-container-font-size: 13px;
  --dv-tabs-and-actions-container-height: 35px;
  --dv-drag-over-background-color: rgba(83, 89, 93, 0.5);
  --dv-drag-over-border-color: transparent;
  --dv-edge-dock-indicator-color: rgba(56, 139, 253, 0.9);
  --dv-edge-drop-strip-size: 8px;
  --dv-tabs-container-scrollbar-color: #888;
  --dv-icon-hover-background-color: rgba(90, 93, 94, 0.31);
  --dv-floating-box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.4), 0 2px 8px rgba(0, 0, 0, 0.25);
  --dv-floating-border: 1px solid rgba(255, 255, 255, 0.1);
  --dv-overlay-z-index: 999;
  --dv-tab-font-size: inherit;
  --dv-border-radius: 0px;
  --dv-tab-margin: 0;
  --dv-sash-color: transparent;
  --dv-active-sash-color: transparent;
  --dv-active-sash-transition-duration: 0.1s;
  --dv-active-sash-transition-delay: 0.5s;
  --dv-spacing-padding: 0px;
  --dv-tab-border-radius: 0px;
  --dv-sash-border-radius: 0px;
  --dv-dropdown-border-radius: 0px;
  --dv-tab-close-icon-size: inherit;
  --dv-floating-group-border: none;
  --dv-drag-over-border: none;
  --dv-floating-group-dragging-opacity: 0.5;
  --dv-floating-titlebar-height: 22px;
  --dv-floating-titlebar-background-color: var(
      --dv-tabs-and-actions-container-background-color
  );
  --dv-floating-titlebar-border-bottom: var(--dv-floating-border);
  --dv-tab-group-color-grey: #5f6368;
  --dv-tab-group-color-blue: #1a73e8;
  --dv-tab-group-color-red: #d93025;
  --dv-tab-group-color-yellow: #f9ab00;
  --dv-tab-group-color-green: #188038;
  --dv-tab-group-color-pink: #d01884;
  --dv-tab-group-color-purple: #a142f4;
  --dv-tab-group-color-cyan: #007b83;
  --dv-tab-group-color-orange: #e8710a;
  --dv-tab-group-chip-padding: 4px 8px;
  --dv-tab-group-chip-border-radius: 6px;
  --dv-tab-group-chip-font-size: 11px;
  --dv-tab-group-line-height: 2px;
  --dv-tab-group-line-opacity: 0.6;
}
.dockview-theme-abyss .dv-drop-target-container .dv-drop-target-anchor.dv-drop-target-anchor-container-changed {
  opacity: 0;
  transition: none;
}
.dockview-theme-abyss {
  color-scheme: dark;
  --dv-color-abyss-dark: #000c18;
  --dv-color-abyss: #10192c;
  --dv-color-abyss-light: #1c1c2a;
  --dv-color-abyss-lighter: #2b2b4a;
  --dv-color-abyss-accent: rgb(91, 30, 207);
  --dv-color-abyss-primary-text: white;
  --dv-color-abyss-secondary-text: rgb(148, 151, 169);
  --dv-group-view-background-color: var(--dv-color-abyss-dark);
  --dv-tabs-and-actions-container-background-color: var(
      --dv-color-abyss-light
  );
  --dv-activegroup-visiblepanel-tab-background-color: var(
      --dv-color-abyss-dark
  );
  --dv-activegroup-hiddenpanel-tab-background-color: var(--dv-color-abyss);
  --dv-inactivegroup-visiblepanel-tab-background-color: var(
      --dv-color-abyss-dark
  );
  --dv-inactivegroup-hiddenpanel-tab-background-color: var(--dv-color-abyss);
  --dv-tab-divider-color: var(--dv-color-abyss-lighter);
  --dv-activegroup-visiblepanel-tab-color: white;
  --dv-activegroup-hiddenpanel-tab-color: rgba(255, 255, 255, 0.5);
  --dv-inactivegroup-visiblepanel-tab-color: rgba(255, 255, 255, 0.5);
  --dv-inactivegroup-hiddenpanel-tab-color: rgba(255, 255, 255, 0.25);
  --dv-separator-border: var(--dv-color-abyss-lighter);
  --dv-paneview-header-border-color: var(--dv-color-abyss-lighter);
  --dv-paneview-active-outline-color: #596f99;
}

.dockview-theme-dracula {
  --dv-paneview-active-outline-color: dodgerblue;
  --dv-tabs-and-actions-container-font-size: 13px;
  --dv-tabs-and-actions-container-height: 35px;
  --dv-drag-over-background-color: rgba(83, 89, 93, 0.5);
  --dv-drag-over-border-color: transparent;
  --dv-edge-dock-indicator-color: rgba(56, 139, 253, 0.9);
  --dv-edge-drop-strip-size: 8px;
  --dv-tabs-container-scrollbar-color: #888;
  --dv-icon-hover-background-color: rgba(90, 93, 94, 0.31);
  --dv-floating-box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.4), 0 2px 8px rgba(0, 0, 0, 0.25);
  --dv-floating-border: 1px solid rgba(255, 255, 255, 0.1);
  --dv-overlay-z-index: 999;
  --dv-tab-font-size: inherit;
  --dv-border-radius: 0px;
  --dv-tab-margin: 0;
  --dv-sash-color: transparent;
  --dv-active-sash-color: transparent;
  --dv-active-sash-transition-duration: 0.1s;
  --dv-active-sash-transition-delay: 0.5s;
  --dv-spacing-padding: 0px;
  --dv-tab-border-radius: 0px;
  --dv-sash-border-radius: 0px;
  --dv-dropdown-border-radius: 0px;
  --dv-tab-close-icon-size: inherit;
  --dv-floating-group-border: none;
  --dv-drag-over-border: none;
  --dv-floating-group-dragging-opacity: 0.5;
  --dv-floating-titlebar-height: 22px;
  --dv-floating-titlebar-background-color: var(
      --dv-tabs-and-actions-container-background-color
  );
  --dv-floating-titlebar-border-bottom: var(--dv-floating-border);
  --dv-tab-group-color-grey: #5f6368;
  --dv-tab-group-color-blue: #1a73e8;
  --dv-tab-group-color-red: #d93025;
  --dv-tab-group-color-yellow: #f9ab00;
  --dv-tab-group-color-green: #188038;
  --dv-tab-group-color-pink: #d01884;
  --dv-tab-group-color-purple: #a142f4;
  --dv-tab-group-color-cyan: #007b83;
  --dv-tab-group-color-orange: #e8710a;
  --dv-tab-group-chip-padding: 4px 8px;
  --dv-tab-group-chip-border-radius: 6px;
  --dv-tab-group-chip-font-size: 11px;
  --dv-tab-group-line-height: 2px;
  --dv-tab-group-line-opacity: 0.6;
}
.dockview-theme-dracula .dv-drop-target-container .dv-drop-target-anchor.dv-drop-target-anchor-container-changed {
  opacity: 0;
  transition: none;
}
.dockview-theme-dracula {
  color-scheme: dark;
  --dv-group-view-background-color: #282a36;
  --dv-tabs-and-actions-container-background-color: #191a21;
  --dv-activegroup-visiblepanel-tab-background-color: #282a36;
  --dv-activegroup-hiddenpanel-tab-background-color: #21222c;
  --dv-inactivegroup-visiblepanel-tab-background-color: #282a36;
  --dv-inactivegroup-hiddenpanel-tab-background-color: #21222c;
  --dv-tab-divider-color: #191a21;
  --dv-activegroup-visiblepanel-tab-color: rgb(248, 248, 242);
  --dv-activegroup-hiddenpanel-tab-color: rgb(98, 114, 164);
  --dv-inactivegroup-visiblepanel-tab-color: rgba(248, 248, 242, 0.5);
  --dv-inactivegroup-hiddenpanel-tab-color: rgba(98, 114, 164, 0.5);
  --dv-separator-border: #bd93f9;
  --dv-paneview-header-border-color: #bd93f9;
  --dv-paneview-active-outline-color: #6272a4;
}
.dockview-theme-dracula .dv-groupview.dv-active-group > .dv-tabs-and-actions-container .dv-tabs-container > .dv-tab.dv-active-tab {
  position: relative;
}
.dockview-theme-dracula .dv-groupview.dv-active-group > .dv-tabs-and-actions-container .dv-tabs-container > .dv-tab.dv-active-tab::after {
  position: absolute;
  left: 0px;
  bottom: 0px;
  content: "";
  width: 100%;
  height: 1px;
  background-color: #94527e;
  z-index: 999;
}
.dockview-theme-dracula .dv-groupview.dv-inactive-group > .dv-tabs-and-actions-container .dv-tabs-container > .dv-tab.dv-active-tab {
  position: relative;
}
.dockview-theme-dracula .dv-groupview.dv-inactive-group > .dv-tabs-and-actions-container .dv-tabs-container > .dv-tab.dv-active-tab::after {
  position: absolute;
  left: 0px;
  bottom: 0px;
  content: "";
  width: 100%;
  height: 1px;
  background-color: #5e3d5a;
  z-index: 999;
}

.dockview-theme-nord {
  --dv-paneview-active-outline-color: dodgerblue;
  --dv-tabs-and-actions-container-font-size: 13px;
  --dv-tabs-and-actions-container-height: 35px;
  --dv-drag-over-background-color: rgba(83, 89, 93, 0.5);
  --dv-drag-over-border-color: transparent;
  --dv-edge-dock-indicator-color: rgba(56, 139, 253, 0.9);
  --dv-edge-drop-strip-size: 8px;
  --dv-tabs-container-scrollbar-color: #888;
  --dv-icon-hover-background-color: rgba(90, 93, 94, 0.31);
  --dv-floating-box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.4), 0 2px 8px rgba(0, 0, 0, 0.25);
  --dv-floating-border: 1px solid rgba(255, 255, 255, 0.1);
  --dv-overlay-z-index: 999;
  --dv-tab-font-size: inherit;
  --dv-border-radius: 0px;
  --dv-tab-margin: 0;
  --dv-sash-color: transparent;
  --dv-active-sash-color: transparent;
  --dv-active-sash-transition-duration: 0.1s;
  --dv-active-sash-transition-delay: 0.5s;
  --dv-spacing-padding: 0px;
  --dv-tab-border-radius: 0px;
  --dv-sash-border-radius: 0px;
  --dv-dropdown-border-radius: 0px;
  --dv-tab-close-icon-size: inherit;
  --dv-floating-group-border: none;
  --dv-drag-over-border: none;
  --dv-floating-group-dragging-opacity: 0.5;
  --dv-floating-titlebar-height: 22px;
  --dv-floating-titlebar-background-color: var(
      --dv-tabs-and-actions-container-background-color
  );
  --dv-floating-titlebar-border-bottom: var(--dv-floating-border);
  --dv-tab-group-color-grey: #5f6368;
  --dv-tab-group-color-blue: #1a73e8;
  --dv-tab-group-color-red: #d93025;
  --dv-tab-group-color-yellow: #f9ab00;
  --dv-tab-group-color-green: #188038;
  --dv-tab-group-color-pink: #d01884;
  --dv-tab-group-color-purple: #a142f4;
  --dv-tab-group-color-cyan: #007b83;
  --dv-tab-group-color-orange: #e8710a;
  --dv-tab-group-chip-padding: 4px 8px;
  --dv-tab-group-chip-border-radius: 6px;
  --dv-tab-group-chip-font-size: 11px;
  --dv-tab-group-line-height: 2px;
  --dv-tab-group-line-opacity: 0.6;
}
.dockview-theme-nord .dv-drop-target-container .dv-drop-target-anchor.dv-drop-target-anchor-container-changed {
  opacity: 0;
  transition: none;
}
.dockview-theme-nord {
  color-scheme: dark;
  --dv-color-nord-polar-0: #2e3440;
  --dv-color-nord-polar-1: #3b4252;
  --dv-color-nord-polar-2: #434c5e;
  --dv-color-nord-polar-3: #4c566a;
  --dv-color-nord-frost: #88c0d0;
  --dv-color-nord-frost-2: #81a1c1;
  --dv-color-nord-snow-0: #eceff4;
  --dv-color-nord-snow-1: #d8dee9;
  --dv-group-view-background-color: var(--dv-color-nord-polar-0);
  --dv-tabs-and-actions-container-background-color: var(
      --dv-color-nord-polar-1
  );
  --dv-activegroup-visiblepanel-tab-background-color: var(
      --dv-color-nord-polar-0
  );
  --dv-activegroup-hiddenpanel-tab-background-color: var(
      --dv-color-nord-polar-2
  );
  --dv-inactivegroup-visiblepanel-tab-background-color: var(
      --dv-color-nord-polar-1
  );
  --dv-inactivegroup-hiddenpanel-tab-background-color: var(
      --dv-color-nord-polar-2
  );
  --dv-activegroup-visiblepanel-tab-color: var(--dv-color-nord-snow-0);
  --dv-activegroup-hiddenpanel-tab-color: var(--dv-color-nord-snow-1);
  --dv-inactivegroup-visiblepanel-tab-color: #8a9bbf;
  --dv-inactivegroup-hiddenpanel-tab-color: #5e6f8e;
  --dv-separator-border: var(--dv-color-nord-polar-3);
  --dv-paneview-header-border-color: var(--dv-color-nord-polar-3);
  --dv-paneview-active-outline-color: var(--dv-color-nord-frost);
  --dv-active-sash-color: var(--dv-color-nord-frost);
  --dv-scrollbar-background-color: rgba(76, 86, 106, 0.5);
}
.dockview-theme-nord .dv-groupview.dv-active-group > .dv-tabs-and-actions-container .dv-tabs-container > .dv-tab.dv-active-tab {
  position: relative;
}
.dockview-theme-nord .dv-groupview.dv-active-group > .dv-tabs-and-actions-container .dv-tabs-container > .dv-tab.dv-active-tab::after {
  position: absolute;
  left: 0px;
  bottom: 0px;
  content: "";
  width: 100%;
  height: 2px;
  background-color: var(--dv-color-nord-frost);
  z-index: 999;
}
.dockview-theme-nord .dv-groupview.dv-inactive-group > .dv-tabs-and-actions-container .dv-tabs-container > .dv-tab.dv-active-tab {
  position: relative;
}
.dockview-theme-nord .dv-groupview.dv-inactive-group > .dv-tabs-and-actions-container .dv-tabs-container > .dv-tab.dv-active-tab::after {
  position: absolute;
  left: 0px;
  bottom: 0px;
  content: "";
  width: 100%;
  height: 2px;
  background-color: var(--dv-color-nord-frost-2);
  z-index: 999;
}

.dockview-theme-nord-spaced {
  --dv-paneview-active-outline-color: dodgerblue;
  --dv-tabs-and-actions-container-font-size: 13px;
  --dv-tabs-and-actions-container-height: 35px;
  --dv-drag-over-background-color: rgba(83, 89, 93, 0.5);
  --dv-drag-over-border-color: transparent;
  --dv-edge-dock-indicator-color: rgba(56, 139, 253, 0.9);
  --dv-edge-drop-strip-size: 8px;
  --dv-tabs-container-scrollbar-color: #888;
  --dv-icon-hover-background-color: rgba(90, 93, 94, 0.31);
  --dv-floating-box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.4), 0 2px 8px rgba(0, 0, 0, 0.25);
  --dv-floating-border: 1px solid rgba(255, 255, 255, 0.1);
  --dv-overlay-z-index: 999;
  --dv-tab-font-size: inherit;
  --dv-border-radius: 0px;
  --dv-tab-margin: 0;
  --dv-sash-color: transparent;
  --dv-active-sash-color: transparent;
  --dv-active-sash-transition-duration: 0.1s;
  --dv-active-sash-transition-delay: 0.5s;
  --dv-spacing-padding: 0px;
  --dv-tab-border-radius: 0px;
  --dv-sash-border-radius: 0px;
  --dv-dropdown-border-radius: 0px;
  --dv-tab-close-icon-size: inherit;
  --dv-floating-group-border: none;
  --dv-drag-over-border: none;
  --dv-floating-group-dragging-opacity: 0.5;
  --dv-floating-titlebar-height: 22px;
  --dv-floating-titlebar-background-color: var(
      --dv-tabs-and-actions-container-background-color
  );
  --dv-floating-titlebar-border-bottom: var(--dv-floating-border);
  --dv-tab-group-color-grey: #5f6368;
  --dv-tab-group-color-blue: #1a73e8;
  --dv-tab-group-color-red: #d93025;
  --dv-tab-group-color-yellow: #f9ab00;
  --dv-tab-group-color-green: #188038;
  --dv-tab-group-color-pink: #d01884;
  --dv-tab-group-color-purple: #a142f4;
  --dv-tab-group-color-cyan: #007b83;
  --dv-tab-group-color-orange: #e8710a;
  --dv-tab-group-chip-padding: 4px 8px;
  --dv-tab-group-chip-border-radius: 6px;
  --dv-tab-group-chip-font-size: 11px;
  --dv-tab-group-line-height: 2px;
  --dv-tab-group-line-opacity: 0.6;
  --dv-spacing-padding: 10px;
  --dv-tab-font-size: 12px;
  --dv-border-radius: 12px;
  --dv-tab-margin-block: 0.5rem;
  --dv-tab-margin-inline: 0.25rem;
  --dv-tab-margin: var(--dv-tab-margin-block) var(--dv-tab-margin-inline);
  --dv-tabs-and-actions-container-height: 44px;
  --dv-tab-border-radius: 8px;
  --dv-sash-border-radius: 4px;
  --dv-dropdown-border-radius: 8px;
  --dv-tab-close-icon-size: 8px;
  --dv-floating-group-border: 2px solid var(--dv-group-view-background-color);
  --dv-floating-titlebar-background-color: var(
      --dv-group-view-background-color
  );
  --dv-floating-titlebar-border-bottom: none;
  box-sizing: border-box;
  padding: var(--dv-spacing-padding);
  background-color: var(--dv-group-view-background-color);
}
.dockview-theme-nord-spaced .dv-dockview {
  padding: 0;
}
.dockview-theme-nord-spaced .dv-resize-container:has(> .dv-groupview) {
  border-radius: 8px;
}
.dockview-theme-nord-spaced .dv-sash {
  border-radius: var(--dv-sash-border-radius);
}
.dockview-theme-nord-spaced .dv-drop-target-anchor {
  border-radius: calc(var(--dv-border-radius) / 4);
}
.dockview-theme-nord-spaced .dv-drop-target-anchor.dv-drop-target-content {
  border-radius: var(--dv-border-radius);
}
.dockview-theme-nord-spaced .dv-resize-container {
  border-radius: var(--dv-border-radius) !important;
  border: none;
}
.dockview-theme-nord-spaced .dv-resize-container .dv-groupview {
  border: var(--dv-floating-group-border);
}
.dockview-theme-nord-spaced .dv-resize-container > .dv-grid-view {
  box-sizing: border-box;
  padding: var(--dv-spacing-padding);
}
.dockview-theme-nord-spaced .dv-resize-container-with-titlebar > .dv-grid-view {
  padding-top: 0;
}
.dockview-theme-nord-spaced .dv-resize-container-with-titlebar > .dv-floating-titlebar {
  border-top-left-radius: var(--dv-border-radius);
  border-top-right-radius: var(--dv-border-radius);
}
.dockview-theme-nord-spaced .dv-tabs-overflow-container,
.dockview-theme-nord-spaced .dv-tabs-overflow-dropdown-default {
  border-radius: var(--dv-dropdown-border-radius);
  height: unset !important;
}
.dockview-theme-nord-spaced .dv-render-overlay {
  border-bottom-left-radius: var(--dv-border-radius);
  border-bottom-right-radius: var(--dv-border-radius);
}
.dockview-theme-nord-spaced .dv-tab {
  border-radius: var(--dv-tab-border-radius);
}
.dockview-theme-nord-spaced .dv-tab .dv-svg {
  height: var(--dv-tab-close-icon-size);
  width: var(--dv-tab-close-icon-size);
}
.dockview-theme-nord-spaced .dv-tabs-container--wrap:not(.dv-tabs-container-vertical) .dv-tab {
  height: calc(var(--dv-tabs-and-actions-container-height) - 2 * var(--dv-tab-margin-block));
}
.dockview-theme-nord-spaced .dv-tabs-container-vertical .dv-tab {
  margin: var(--dv-tab-margin-inline) var(--dv-tab-margin-block);
}
.dockview-theme-nord-spaced .dv-tabs-container--wrap.dv-tabs-container-vertical .dv-tab {
  width: calc(var(--dv-tabs-and-actions-container-height) - 2 * var(--dv-tab-margin-block));
}
.dockview-theme-nord-spaced .dv-groupview {
  border-radius: var(--dv-border-radius);
}
.dockview-theme-nord-spaced .dv-groupview .dv-tabs-and-actions-container {
  padding: 0px calc(var(--dv-border-radius) / 2);
  border-top-left-radius: var(--dv-border-radius);
  border-top-right-radius: var(--dv-border-radius);
}
.dockview-theme-nord-spaced .dv-groupview .dv-tabs-and-actions-container.dv-groupview-header-vertical {
  padding: calc(var(--dv-border-radius) / 2) 0;
}
.dockview-theme-nord-spaced .dv-groupview .dv-content-container {
  background-color: var(--dv-tabs-and-actions-container-background-color);
  border-bottom-left-radius: var(--dv-border-radius);
  border-bottom-right-radius: var(--dv-border-radius);
}
.dockview-theme-nord-spaced .dv-groupview.dv-groupview-header-bottom > .dv-tabs-and-actions-container {
  border-radius: 0 0 var(--dv-border-radius) var(--dv-border-radius);
}
.dockview-theme-nord-spaced .dv-groupview.dv-groupview-header-bottom > .dv-content-container {
  border-radius: var(--dv-border-radius) var(--dv-border-radius) 0 0;
}
.dockview-theme-nord-spaced .dv-groupview.dv-groupview-header-left > .dv-tabs-and-actions-container {
  border-radius: var(--dv-border-radius) 0 0 var(--dv-border-radius);
}
.dockview-theme-nord-spaced .dv-groupview.dv-groupview-header-left > .dv-content-container {
  border-radius: 0 var(--dv-border-radius) var(--dv-border-radius) 0;
}
.dockview-theme-nord-spaced .dv-groupview.dv-groupview-header-right > .dv-tabs-and-actions-container {
  border-radius: 0 var(--dv-border-radius) var(--dv-border-radius) 0;
}
.dockview-theme-nord-spaced .dv-groupview.dv-groupview-header-right > .dv-content-container {
  border-radius: var(--dv-border-radius) 0 0 var(--dv-border-radius);
}
.dockview-theme-nord-spaced .dv-groupview.dv-edge-tool-window .dv-edge-peek-header {
  border-top-left-radius: var(--dv-border-radius);
  border-top-right-radius: var(--dv-border-radius);
}
.dockview-theme-nord-spaced .dv-groupview.dv-edge-tool-window .dv-content-container {
  border-radius: 0;
}
.dockview-theme-nord-spaced .dv-groupview.dv-edge-tool-window .dv-tabs-and-actions-container {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-left-radius: var(--dv-border-radius);
  border-bottom-right-radius: var(--dv-border-radius);
}
.dockview-theme-nord-spaced .dv-edge-peek {
  border-bottom-left-radius: var(--dv-border-radius);
  border-bottom-right-radius: var(--dv-border-radius);
}
.dockview-theme-nord-spaced .dv-edge-peek-clip {
  border-bottom-left-radius: var(--dv-border-radius);
  border-bottom-right-radius: var(--dv-border-radius);
}
.dockview-theme-nord-spaced .dv-edge-peek-header {
  border-top-left-radius: var(--dv-border-radius);
  border-top-right-radius: var(--dv-border-radius);
}
.dockview-theme-nord-spaced {
  color-scheme: dark;
  --dv-color-nord-polar-0: #2e3440;
  --dv-color-nord-polar-1: #3b4252;
  --dv-color-nord-polar-2: #434c5e;
  --dv-color-nord-polar-3: #4c566a;
  --dv-color-nord-frost: #88c0d0;
  --dv-color-nord-frost-2: #81a1c1;
  --dv-color-nord-snow-0: #eceff4;
  --dv-color-nord-snow-1: #d8dee9;
  --dv-group-view-background-color: var(--dv-color-nord-polar-0);
  --dv-tabs-and-actions-container-background-color: var(
      --dv-color-nord-polar-1
  );
  --dv-activegroup-visiblepanel-tab-background-color: var(
      --dv-color-nord-polar-2
  );
  --dv-activegroup-hiddenpanel-tab-background-color: var(
      --dv-color-nord-polar-1
  );
  --dv-inactivegroup-visiblepanel-tab-background-color: var(
      --dv-color-nord-polar-2
  );
  --dv-inactivegroup-hiddenpanel-tab-background-color: var(
      --dv-color-nord-polar-1
  );
  --dv-activegroup-visiblepanel-tab-color: var(--dv-color-nord-snow-0);
  --dv-activegroup-hiddenpanel-tab-color: var(--dv-color-nord-snow-1);
  --dv-inactivegroup-visiblepanel-tab-color: #8a9bbf;
  --dv-inactivegroup-hiddenpanel-tab-color: #5e6f8e;
  --dv-separator-border: transparent;
  --dv-paneview-header-border-color: var(--dv-color-nord-polar-3);
  --dv-paneview-active-outline-color: var(--dv-color-nord-frost);
  --dv-active-sash-color: var(--dv-color-nord-frost);
  --dv-scrollbar-background-color: rgba(76, 86, 106, 0.5);
  --dv-floating-group-border: 2px solid var(--dv-color-nord-polar-0);
}

.dockview-theme-catppuccin-mocha {
  --dv-paneview-active-outline-color: dodgerblue;
  --dv-tabs-and-actions-container-font-size: 13px;
  --dv-tabs-and-actions-container-height: 35px;
  --dv-drag-over-background-color: rgba(83, 89, 93, 0.5);
  --dv-drag-over-border-color: transparent;
  --dv-edge-dock-indicator-color: rgba(56, 139, 253, 0.9);
  --dv-edge-drop-strip-size: 8px;
  --dv-tabs-container-scrollbar-color: #888;
  --dv-icon-hover-background-color: rgba(90, 93, 94, 0.31);
  --dv-floating-box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.4), 0 2px 8px rgba(0, 0, 0, 0.25);
  --dv-floating-border: 1px solid rgba(255, 255, 255, 0.1);
  --dv-overlay-z-index: 999;
  --dv-tab-font-size: inherit;
  --dv-border-radius: 0px;
  --dv-tab-margin: 0;
  --dv-sash-color: transparent;
  --dv-active-sash-color: transparent;
  --dv-active-sash-transition-duration: 0.1s;
  --dv-active-sash-transition-delay: 0.5s;
  --dv-spacing-padding: 0px;
  --dv-tab-border-radius: 0px;
  --dv-sash-border-radius: 0px;
  --dv-dropdown-border-radius: 0px;
  --dv-tab-close-icon-size: inherit;
  --dv-floating-group-border: none;
  --dv-drag-over-border: none;
  --dv-floating-group-dragging-opacity: 0.5;
  --dv-floating-titlebar-height: 22px;
  --dv-floating-titlebar-background-color: var(
      --dv-tabs-and-actions-container-background-color
  );
  --dv-floating-titlebar-border-bottom: var(--dv-floating-border);
  --dv-tab-group-color-grey: #5f6368;
  --dv-tab-group-color-blue: #1a73e8;
  --dv-tab-group-color-red: #d93025;
  --dv-tab-group-color-yellow: #f9ab00;
  --dv-tab-group-color-green: #188038;
  --dv-tab-group-color-pink: #d01884;
  --dv-tab-group-color-purple: #a142f4;
  --dv-tab-group-color-cyan: #007b83;
  --dv-tab-group-color-orange: #e8710a;
  --dv-tab-group-chip-padding: 4px 8px;
  --dv-tab-group-chip-border-radius: 6px;
  --dv-tab-group-chip-font-size: 11px;
  --dv-tab-group-line-height: 2px;
  --dv-tab-group-line-opacity: 0.6;
}
.dockview-theme-catppuccin-mocha .dv-drop-target-container .dv-drop-target-anchor.dv-drop-target-anchor-container-changed {
  opacity: 0;
  transition: none;
}
.dockview-theme-catppuccin-mocha {
  color-scheme: dark;
  --dv-color-mocha-crust: #11111b;
  --dv-color-mocha-mantle: #181825;
  --dv-color-mocha-base: #1e1e2e;
  --dv-color-mocha-surface0: #313244;
  --dv-color-mocha-surface1: #45475a;
  --dv-color-mocha-text: #cdd6f4;
  --dv-color-mocha-subtext1: #bac2de;
  --dv-color-mocha-subtext0: #a6adc8;
  --dv-color-mocha-mauve: #cba6f7;
  --dv-color-mocha-lavender: #b4befe;
  --dv-group-view-background-color: var(--dv-color-mocha-base);
  --dv-tabs-and-actions-container-background-color: var(
      --dv-color-mocha-mantle
  );
  --dv-activegroup-visiblepanel-tab-background-color: var(
      --dv-color-mocha-base
  );
  --dv-activegroup-hiddenpanel-tab-background-color: var(
      --dv-color-mocha-surface0
  );
  --dv-inactivegroup-visiblepanel-tab-background-color: var(
      --dv-color-mocha-mantle
  );
  --dv-inactivegroup-hiddenpanel-tab-background-color: var(
      --dv-color-mocha-crust
  );
  --dv-activegroup-visiblepanel-tab-color: var(--dv-color-mocha-text);
  --dv-activegroup-hiddenpanel-tab-color: var(--dv-color-mocha-subtext1);
  --dv-inactivegroup-visiblepanel-tab-color: var(--dv-color-mocha-subtext0);
  --dv-inactivegroup-hiddenpanel-tab-color: rgba(166, 173, 200, 0.5);
  --dv-separator-border: var(--dv-color-mocha-surface1);
  --dv-paneview-header-border-color: var(--dv-color-mocha-surface1);
  --dv-paneview-active-outline-color: var(--dv-color-mocha-mauve);
  --dv-active-sash-color: var(--dv-color-mocha-mauve);
  --dv-scrollbar-background-color: rgba(49, 50, 68, 0.8);
}
.dockview-theme-catppuccin-mocha .dv-groupview.dv-active-group > .dv-tabs-and-actions-container .dv-tabs-container > .dv-tab.dv-active-tab {
  position: relative;
}
.dockview-theme-catppuccin-mocha .dv-groupview.dv-active-group > .dv-tabs-and-actions-container .dv-tabs-container > .dv-tab.dv-active-tab::after {
  position: absolute;
  left: 0px;
  bottom: 0px;
  content: "";
  width: 100%;
  height: 2px;
  background-color: var(--dv-color-mocha-mauve);
  z-index: 999;
}
.dockview-theme-catppuccin-mocha .dv-groupview.dv-inactive-group > .dv-tabs-and-actions-container .dv-tabs-container > .dv-tab.dv-active-tab {
  position: relative;
}
.dockview-theme-catppuccin-mocha .dv-groupview.dv-inactive-group > .dv-tabs-and-actions-container .dv-tabs-container > .dv-tab.dv-active-tab::after {
  position: absolute;
  left: 0px;
  bottom: 0px;
  content: "";
  width: 100%;
  height: 2px;
  background-color: rgba(180, 190, 254, 0.4);
  z-index: 999;
}

.dockview-theme-catppuccin-mocha-spaced {
  --dv-paneview-active-outline-color: dodgerblue;
  --dv-tabs-and-actions-container-font-size: 13px;
  --dv-tabs-and-actions-container-height: 35px;
  --dv-drag-over-background-color: rgba(83, 89, 93, 0.5);
  --dv-drag-over-border-color: transparent;
  --dv-edge-dock-indicator-color: rgba(56, 139, 253, 0.9);
  --dv-edge-drop-strip-size: 8px;
  --dv-tabs-container-scrollbar-color: #888;
  --dv-icon-hover-background-color: rgba(90, 93, 94, 0.31);
  --dv-floating-box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.4), 0 2px 8px rgba(0, 0, 0, 0.25);
  --dv-floating-border: 1px solid rgba(255, 255, 255, 0.1);
  --dv-overlay-z-index: 999;
  --dv-tab-font-size: inherit;
  --dv-border-radius: 0px;
  --dv-tab-margin: 0;
  --dv-sash-color: transparent;
  --dv-active-sash-color: transparent;
  --dv-active-sash-transition-duration: 0.1s;
  --dv-active-sash-transition-delay: 0.5s;
  --dv-spacing-padding: 0px;
  --dv-tab-border-radius: 0px;
  --dv-sash-border-radius: 0px;
  --dv-dropdown-border-radius: 0px;
  --dv-tab-close-icon-size: inherit;
  --dv-floating-group-border: none;
  --dv-drag-over-border: none;
  --dv-floating-group-dragging-opacity: 0.5;
  --dv-floating-titlebar-height: 22px;
  --dv-floating-titlebar-background-color: var(
      --dv-tabs-and-actions-container-background-color
  );
  --dv-floating-titlebar-border-bottom: var(--dv-floating-border);
  --dv-tab-group-color-grey: #5f6368;
  --dv-tab-group-color-blue: #1a73e8;
  --dv-tab-group-color-red: #d93025;
  --dv-tab-group-color-yellow: #f9ab00;
  --dv-tab-group-color-green: #188038;
  --dv-tab-group-color-pink: #d01884;
  --dv-tab-group-color-purple: #a142f4;
  --dv-tab-group-color-cyan: #007b83;
  --dv-tab-group-color-orange: #e8710a;
  --dv-tab-group-chip-padding: 4px 8px;
  --dv-tab-group-chip-border-radius: 6px;
  --dv-tab-group-chip-font-size: 11px;
  --dv-tab-group-line-height: 2px;
  --dv-tab-group-line-opacity: 0.6;
  --dv-spacing-padding: 10px;
  --dv-tab-font-size: 12px;
  --dv-border-radius: 12px;
  --dv-tab-margin-block: 0.5rem;
  --dv-tab-margin-inline: 0.25rem;
  --dv-tab-margin: var(--dv-tab-margin-block) var(--dv-tab-margin-inline);
  --dv-tabs-and-actions-container-height: 44px;
  --dv-tab-border-radius: 8px;
  --dv-sash-border-radius: 4px;
  --dv-dropdown-border-radius: 8px;
  --dv-tab-close-icon-size: 8px;
  --dv-floating-group-border: 2px solid var(--dv-group-view-background-color);
  --dv-floating-titlebar-background-color: var(
      --dv-group-view-background-color
  );
  --dv-floating-titlebar-border-bottom: none;
  box-sizing: border-box;
  padding: var(--dv-spacing-padding);
  background-color: var(--dv-group-view-background-color);
}
.dockview-theme-catppuccin-mocha-spaced .dv-dockview {
  padding: 0;
}
.dockview-theme-catppuccin-mocha-spaced .dv-resize-container:has(> .dv-groupview) {
  border-radius: 8px;
}
.dockview-theme-catppuccin-mocha-spaced .dv-sash {
  border-radius: var(--dv-sash-border-radius);
}
.dockview-theme-catppuccin-mocha-spaced .dv-drop-target-anchor {
  border-radius: calc(var(--dv-border-radius) / 4);
}
.dockview-theme-catppuccin-mocha-spaced .dv-drop-target-anchor.dv-drop-target-content {
  border-radius: var(--dv-border-radius);
}
.dockview-theme-catppuccin-mocha-spaced .dv-resize-container {
  border-radius: var(--dv-border-radius) !important;
  border: none;
}
.dockview-theme-catppuccin-mocha-spaced .dv-resize-container .dv-groupview {
  border: var(--dv-floating-group-border);
}
.dockview-theme-catppuccin-mocha-spaced .dv-resize-container > .dv-grid-view {
  box-sizing: border-box;
  padding: var(--dv-spacing-padding);
}
.dockview-theme-catppuccin-mocha-spaced .dv-resize-container-with-titlebar > .dv-grid-view {
  padding-top: 0;
}
.dockview-theme-catppuccin-mocha-spaced .dv-resize-container-with-titlebar > .dv-floating-titlebar {
  border-top-left-radius: var(--dv-border-radius);
  border-top-right-radius: var(--dv-border-radius);
}
.dockview-theme-catppuccin-mocha-spaced .dv-tabs-overflow-container,
.dockview-theme-catppuccin-mocha-spaced .dv-tabs-overflow-dropdown-default {
  border-radius: var(--dv-dropdown-border-radius);
  height: unset !important;
}
.dockview-theme-catppuccin-mocha-spaced .dv-render-overlay {
  border-bottom-left-radius: var(--dv-border-radius);
  border-bottom-right-radius: var(--dv-border-radius);
}
.dockview-theme-catppuccin-mocha-spaced .dv-tab {
  border-radius: var(--dv-tab-border-radius);
}
.dockview-theme-catppuccin-mocha-spaced .dv-tab .dv-svg {
  height: var(--dv-tab-close-icon-size);
  width: var(--dv-tab-close-icon-size);
}
.dockview-theme-catppuccin-mocha-spaced .dv-tabs-container--wrap:not(.dv-tabs-container-vertical) .dv-tab {
  height: calc(var(--dv-tabs-and-actions-container-height) - 2 * var(--dv-tab-margin-block));
}
.dockview-theme-catppuccin-mocha-spaced .dv-tabs-container-vertical .dv-tab {
  margin: var(--dv-tab-margin-inline) var(--dv-tab-margin-block);
}
.dockview-theme-catppuccin-mocha-spaced .dv-tabs-container--wrap.dv-tabs-container-vertical .dv-tab {
  width: calc(var(--dv-tabs-and-actions-container-height) - 2 * var(--dv-tab-margin-block));
}
.dockview-theme-catppuccin-mocha-spaced .dv-groupview {
  border-radius: var(--dv-border-radius);
}
.dockview-theme-catppuccin-mocha-spaced .dv-groupview .dv-tabs-and-actions-container {
  padding: 0px calc(var(--dv-border-radius) / 2);
  border-top-left-radius: var(--dv-border-radius);
  border-top-right-radius: var(--dv-border-radius);
}
.dockview-theme-catppuccin-mocha-spaced .dv-groupview .dv-tabs-and-actions-container.dv-groupview-header-vertical {
  padding: calc(var(--dv-border-radius) / 2) 0;
}
.dockview-theme-catppuccin-mocha-spaced .dv-groupview .dv-content-container {
  background-color: var(--dv-tabs-and-actions-container-background-color);
  border-bottom-left-radius: var(--dv-border-radius);
  border-bottom-right-radius: var(--dv-border-radius);
}
.dockview-theme-catppuccin-mocha-spaced .dv-groupview.dv-groupview-header-bottom > .dv-tabs-and-actions-container {
  border-radius: 0 0 var(--dv-border-radius) var(--dv-border-radius);
}
.dockview-theme-catppuccin-mocha-spaced .dv-groupview.dv-groupview-header-bottom > .dv-content-container {
  border-radius: var(--dv-border-radius) var(--dv-border-radius) 0 0;
}
.dockview-theme-catppuccin-mocha-spaced .dv-groupview.dv-groupview-header-left > .dv-tabs-and-actions-container {
  border-radius: var(--dv-border-radius) 0 0 var(--dv-border-radius);
}
.dockview-theme-catppuccin-mocha-spaced .dv-groupview.dv-groupview-header-left > .dv-content-container {
  border-radius: 0 var(--dv-border-radius) var(--dv-border-radius) 0;
}
.dockview-theme-catppuccin-mocha-spaced .dv-groupview.dv-groupview-header-right > .dv-tabs-and-actions-container {
  border-radius: 0 var(--dv-border-radius) var(--dv-border-radius) 0;
}
.dockview-theme-catppuccin-mocha-spaced .dv-groupview.dv-groupview-header-right > .dv-content-container {
  border-radius: var(--dv-border-radius) 0 0 var(--dv-border-radius);
}
.dockview-theme-catppuccin-mocha-spaced .dv-groupview.dv-edge-tool-window .dv-edge-peek-header {
  border-top-left-radius: var(--dv-border-radius);
  border-top-right-radius: var(--dv-border-radius);
}
.dockview-theme-catppuccin-mocha-spaced .dv-groupview.dv-edge-tool-window .dv-content-container {
  border-radius: 0;
}
.dockview-theme-catppuccin-mocha-spaced .dv-groupview.dv-edge-tool-window .dv-tabs-and-actions-container {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-left-radius: var(--dv-border-radius);
  border-bottom-right-radius: var(--dv-border-radius);
}
.dockview-theme-catppuccin-mocha-spaced .dv-edge-peek {
  border-bottom-left-radius: var(--dv-border-radius);
  border-bottom-right-radius: var(--dv-border-radius);
}
.dockview-theme-catppuccin-mocha-spaced .dv-edge-peek-clip {
  border-bottom-left-radius: var(--dv-border-radius);
  border-bottom-right-radius: var(--dv-border-radius);
}
.dockview-theme-catppuccin-mocha-spaced .dv-edge-peek-header {
  border-top-left-radius: var(--dv-border-radius);
  border-top-right-radius: var(--dv-border-radius);
}
.dockview-theme-catppuccin-mocha-spaced {
  color-scheme: dark;
  --dv-color-mocha-crust: #11111b;
  --dv-color-mocha-mantle: #181825;
  --dv-color-mocha-base: #1e1e2e;
  --dv-color-mocha-surface0: #313244;
  --dv-color-mocha-surface1: #45475a;
  --dv-color-mocha-text: #cdd6f4;
  --dv-color-mocha-subtext1: #bac2de;
  --dv-color-mocha-subtext0: #a6adc8;
  --dv-color-mocha-mauve: #cba6f7;
  --dv-color-mocha-lavender: #b4befe;
  --dv-group-view-background-color: var(--dv-color-mocha-crust);
  --dv-tabs-and-actions-container-background-color: var(
      --dv-color-mocha-mantle
  );
  --dv-activegroup-visiblepanel-tab-background-color: var(
      --dv-color-mocha-surface0
  );
  --dv-activegroup-hiddenpanel-tab-background-color: var(
      --dv-color-mocha-mantle
  );
  --dv-inactivegroup-visiblepanel-tab-background-color: var(
      --dv-color-mocha-surface0
  );
  --dv-inactivegroup-hiddenpanel-tab-background-color: var(
      --dv-color-mocha-mantle
  );
  --dv-activegroup-visiblepanel-tab-color: var(--dv-color-mocha-text);
  --dv-activegroup-hiddenpanel-tab-color: var(--dv-color-mocha-subtext1);
  --dv-inactivegroup-visiblepanel-tab-color: var(--dv-color-mocha-subtext0);
  --dv-inactivegroup-hiddenpanel-tab-color: rgba(166, 173, 200, 0.5);
  --dv-separator-border: transparent;
  --dv-paneview-header-border-color: var(--dv-color-mocha-surface1);
  --dv-paneview-active-outline-color: var(--dv-color-mocha-mauve);
  --dv-active-sash-color: var(--dv-color-mocha-mauve);
  --dv-scrollbar-background-color: rgba(49, 50, 68, 0.8);
  --dv-floating-group-border: 2px solid var(--dv-color-mocha-crust);
}

.dockview-theme-monokai {
  --dv-paneview-active-outline-color: dodgerblue;
  --dv-tabs-and-actions-container-font-size: 13px;
  --dv-tabs-and-actions-container-height: 35px;
  --dv-drag-over-background-color: rgba(83, 89, 93, 0.5);
  --dv-drag-over-border-color: transparent;
  --dv-edge-dock-indicator-color: rgba(56, 139, 253, 0.9);
  --dv-edge-drop-strip-size: 8px;
  --dv-tabs-container-scrollbar-color: #888;
  --dv-icon-hover-background-color: rgba(90, 93, 94, 0.31);
  --dv-floating-box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.4), 0 2px 8px rgba(0, 0, 0, 0.25);
  --dv-floating-border: 1px solid rgba(255, 255, 255, 0.1);
  --dv-overlay-z-index: 999;
  --dv-tab-font-size: inherit;
  --dv-border-radius: 0px;
  --dv-tab-margin: 0;
  --dv-sash-color: transparent;
  --dv-active-sash-color: transparent;
  --dv-active-sash-transition-duration: 0.1s;
  --dv-active-sash-transition-delay: 0.5s;
  --dv-spacing-padding: 0px;
  --dv-tab-border-radius: 0px;
  --dv-sash-border-radius: 0px;
  --dv-dropdown-border-radius: 0px;
  --dv-tab-close-icon-size: inherit;
  --dv-floating-group-border: none;
  --dv-drag-over-border: none;
  --dv-floating-group-dragging-opacity: 0.5;
  --dv-floating-titlebar-height: 22px;
  --dv-floating-titlebar-background-color: var(
      --dv-tabs-and-actions-container-background-color
  );
  --dv-floating-titlebar-border-bottom: var(--dv-floating-border);
  --dv-tab-group-color-grey: #5f6368;
  --dv-tab-group-color-blue: #1a73e8;
  --dv-tab-group-color-red: #d93025;
  --dv-tab-group-color-yellow: #f9ab00;
  --dv-tab-group-color-green: #188038;
  --dv-tab-group-color-pink: #d01884;
  --dv-tab-group-color-purple: #a142f4;
  --dv-tab-group-color-cyan: #007b83;
  --dv-tab-group-color-orange: #e8710a;
  --dv-tab-group-chip-padding: 4px 8px;
  --dv-tab-group-chip-border-radius: 6px;
  --dv-tab-group-chip-font-size: 11px;
  --dv-tab-group-line-height: 2px;
  --dv-tab-group-line-opacity: 0.6;
}
.dockview-theme-monokai .dv-drop-target-container .dv-drop-target-anchor.dv-drop-target-anchor-container-changed {
  opacity: 0;
  transition: none;
}
.dockview-theme-monokai {
  color-scheme: dark;
  --dv-color-monokai-bg: #272822;
  --dv-color-monokai-bg-light: #3e3d32;
  --dv-color-monokai-comment: #75715e;
  --dv-color-monokai-fg: #f8f8f2;
  --dv-color-monokai-green: #a6e22e;
  --dv-group-view-background-color: var(--dv-color-monokai-bg);
  --dv-tabs-and-actions-container-background-color: var(
      --dv-color-monokai-bg-light
  );
  --dv-activegroup-visiblepanel-tab-background-color: var(
      --dv-color-monokai-bg
  );
  --dv-activegroup-hiddenpanel-tab-background-color: #2d2c25;
  --dv-inactivegroup-visiblepanel-tab-background-color: var(
      --dv-color-monokai-bg
  );
  --dv-inactivegroup-hiddenpanel-tab-background-color: #2d2c25;
  --dv-activegroup-visiblepanel-tab-color: var(--dv-color-monokai-fg);
  --dv-activegroup-hiddenpanel-tab-color: var(--dv-color-monokai-comment);
  --dv-inactivegroup-visiblepanel-tab-color: rgba(248, 248, 242, 0.5);
  --dv-inactivegroup-hiddenpanel-tab-color: rgba(117, 113, 94, 0.5);
  --dv-separator-border: var(--dv-color-monokai-bg-light);
  --dv-paneview-header-border-color: var(--dv-color-monokai-bg-light);
  --dv-paneview-active-outline-color: var(--dv-color-monokai-green);
  --dv-active-sash-color: var(--dv-color-monokai-green);
  --dv-scrollbar-background-color: rgba(117, 113, 94, 0.5);
}
.dockview-theme-monokai .dv-groupview.dv-active-group > .dv-tabs-and-actions-container .dv-tabs-container > .dv-tab.dv-active-tab {
  position: relative;
}
.dockview-theme-monokai .dv-groupview.dv-active-group > .dv-tabs-and-actions-container .dv-tabs-container > .dv-tab.dv-active-tab::after {
  position: absolute;
  left: 0px;
  bottom: 0px;
  content: "";
  width: 100%;
  height: 2px;
  background-color: var(--dv-color-monokai-green);
  z-index: 999;
}
.dockview-theme-monokai .dv-groupview.dv-inactive-group > .dv-tabs-and-actions-container .dv-tabs-container > .dv-tab.dv-active-tab {
  position: relative;
}
.dockview-theme-monokai .dv-groupview.dv-inactive-group > .dv-tabs-and-actions-container .dv-tabs-container > .dv-tab.dv-active-tab::after {
  position: absolute;
  left: 0px;
  bottom: 0px;
  content: "";
  width: 100%;
  height: 2px;
  background-color: rgba(166, 226, 46, 0.35);
  z-index: 999;
}

.dockview-theme-solarized-light {
  --dv-paneview-active-outline-color: dodgerblue;
  --dv-tabs-and-actions-container-font-size: 13px;
  --dv-tabs-and-actions-container-height: 35px;
  --dv-drag-over-background-color: rgba(83, 89, 93, 0.5);
  --dv-drag-over-border-color: transparent;
  --dv-edge-dock-indicator-color: rgba(56, 139, 253, 0.9);
  --dv-edge-drop-strip-size: 8px;
  --dv-tabs-container-scrollbar-color: #888;
  --dv-icon-hover-background-color: rgba(90, 93, 94, 0.31);
  --dv-floating-box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.4), 0 2px 8px rgba(0, 0, 0, 0.25);
  --dv-floating-border: 1px solid rgba(255, 255, 255, 0.1);
  --dv-overlay-z-index: 999;
  --dv-tab-font-size: inherit;
  --dv-border-radius: 0px;
  --dv-tab-margin: 0;
  --dv-sash-color: transparent;
  --dv-active-sash-color: transparent;
  --dv-active-sash-transition-duration: 0.1s;
  --dv-active-sash-transition-delay: 0.5s;
  --dv-spacing-padding: 0px;
  --dv-tab-border-radius: 0px;
  --dv-sash-border-radius: 0px;
  --dv-dropdown-border-radius: 0px;
  --dv-tab-close-icon-size: inherit;
  --dv-floating-group-border: none;
  --dv-drag-over-border: none;
  --dv-floating-group-dragging-opacity: 0.5;
  --dv-floating-titlebar-height: 22px;
  --dv-floating-titlebar-background-color: var(
      --dv-tabs-and-actions-container-background-color
  );
  --dv-floating-titlebar-border-bottom: var(--dv-floating-border);
  --dv-tab-group-color-grey: #5f6368;
  --dv-tab-group-color-blue: #1a73e8;
  --dv-tab-group-color-red: #d93025;
  --dv-tab-group-color-yellow: #f9ab00;
  --dv-tab-group-color-green: #188038;
  --dv-tab-group-color-pink: #d01884;
  --dv-tab-group-color-purple: #a142f4;
  --dv-tab-group-color-cyan: #007b83;
  --dv-tab-group-color-orange: #e8710a;
  --dv-tab-group-chip-padding: 4px 8px;
  --dv-tab-group-chip-border-radius: 6px;
  --dv-tab-group-chip-font-size: 11px;
  --dv-tab-group-line-height: 2px;
  --dv-tab-group-line-opacity: 0.6;
}
.dockview-theme-solarized-light .dv-drop-target-container .dv-drop-target-anchor.dv-drop-target-anchor-container-changed {
  opacity: 0;
  transition: none;
}
.dockview-theme-solarized-light {
  color-scheme: light;
  --dv-color-sol-base3: #fdf6e3;
  --dv-color-sol-base2: #eee8d5;
  --dv-color-sol-base1: #93a1a1;
  --dv-color-sol-base00: #657b83;
  --dv-color-sol-base01: #586e75;
  --dv-color-sol-blue: #268bd2;
  --dv-group-view-background-color: var(--dv-color-sol-base3);
  --dv-tabs-and-actions-container-background-color: var(--dv-color-sol-base2);
  --dv-activegroup-visiblepanel-tab-background-color: var(
      --dv-color-sol-base3
  );
  --dv-activegroup-hiddenpanel-tab-background-color: #e8e2d0;
  --dv-inactivegroup-visiblepanel-tab-background-color: var(
      --dv-color-sol-base3
  );
  --dv-inactivegroup-hiddenpanel-tab-background-color: #e8e2d0;
  --dv-activegroup-visiblepanel-tab-color: var(--dv-color-sol-base01);
  --dv-activegroup-hiddenpanel-tab-color: var(--dv-color-sol-base00);
  --dv-inactivegroup-visiblepanel-tab-color: var(--dv-color-sol-base1);
  --dv-inactivegroup-hiddenpanel-tab-color: rgba(147, 161, 161, 0.6);
  --dv-separator-border: var(--dv-color-sol-base2);
  --dv-paneview-header-border-color: var(--dv-color-sol-base2);
  --dv-paneview-active-outline-color: var(--dv-color-sol-blue);
  --dv-active-sash-color: var(--dv-color-sol-blue);
  --dv-scrollbar-background-color: rgba(101, 123, 131, 0.25);
  --dv-drag-over-background-color: rgba(38, 139, 210, 0.15);
  --dv-floating-box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08);
  --dv-floating-border: 1px solid rgba(0, 0, 0, 0.1);
}

.dockview-theme-solarized-light-spaced {
  --dv-paneview-active-outline-color: dodgerblue;
  --dv-tabs-and-actions-container-font-size: 13px;
  --dv-tabs-and-actions-container-height: 35px;
  --dv-drag-over-background-color: rgba(83, 89, 93, 0.5);
  --dv-drag-over-border-color: transparent;
  --dv-edge-dock-indicator-color: rgba(56, 139, 253, 0.9);
  --dv-edge-drop-strip-size: 8px;
  --dv-tabs-container-scrollbar-color: #888;
  --dv-icon-hover-background-color: rgba(90, 93, 94, 0.31);
  --dv-floating-box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.4), 0 2px 8px rgba(0, 0, 0, 0.25);
  --dv-floating-border: 1px solid rgba(255, 255, 255, 0.1);
  --dv-overlay-z-index: 999;
  --dv-tab-font-size: inherit;
  --dv-border-radius: 0px;
  --dv-tab-margin: 0;
  --dv-sash-color: transparent;
  --dv-active-sash-color: transparent;
  --dv-active-sash-transition-duration: 0.1s;
  --dv-active-sash-transition-delay: 0.5s;
  --dv-spacing-padding: 0px;
  --dv-tab-border-radius: 0px;
  --dv-sash-border-radius: 0px;
  --dv-dropdown-border-radius: 0px;
  --dv-tab-close-icon-size: inherit;
  --dv-floating-group-border: none;
  --dv-drag-over-border: none;
  --dv-floating-group-dragging-opacity: 0.5;
  --dv-floating-titlebar-height: 22px;
  --dv-floating-titlebar-background-color: var(
      --dv-tabs-and-actions-container-background-color
  );
  --dv-floating-titlebar-border-bottom: var(--dv-floating-border);
  --dv-tab-group-color-grey: #5f6368;
  --dv-tab-group-color-blue: #1a73e8;
  --dv-tab-group-color-red: #d93025;
  --dv-tab-group-color-yellow: #f9ab00;
  --dv-tab-group-color-green: #188038;
  --dv-tab-group-color-pink: #d01884;
  --dv-tab-group-color-purple: #a142f4;
  --dv-tab-group-color-cyan: #007b83;
  --dv-tab-group-color-orange: #e8710a;
  --dv-tab-group-chip-padding: 4px 8px;
  --dv-tab-group-chip-border-radius: 6px;
  --dv-tab-group-chip-font-size: 11px;
  --dv-tab-group-line-height: 2px;
  --dv-tab-group-line-opacity: 0.6;
  --dv-spacing-padding: 10px;
  --dv-tab-font-size: 12px;
  --dv-border-radius: 12px;
  --dv-tab-margin-block: 0.5rem;
  --dv-tab-margin-inline: 0.25rem;
  --dv-tab-margin: var(--dv-tab-margin-block) var(--dv-tab-margin-inline);
  --dv-tabs-and-actions-container-height: 44px;
  --dv-tab-border-radius: 8px;
  --dv-sash-border-radius: 4px;
  --dv-dropdown-border-radius: 8px;
  --dv-tab-close-icon-size: 8px;
  --dv-floating-group-border: 2px solid var(--dv-group-view-background-color);
  --dv-floating-titlebar-background-color: var(
      --dv-group-view-background-color
  );
  --dv-floating-titlebar-border-bottom: none;
  box-sizing: border-box;
  padding: var(--dv-spacing-padding);
  background-color: var(--dv-group-view-background-color);
}
.dockview-theme-solarized-light-spaced .dv-dockview {
  padding: 0;
}
.dockview-theme-solarized-light-spaced .dv-resize-container:has(> .dv-groupview) {
  border-radius: 8px;
}
.dockview-theme-solarized-light-spaced .dv-sash {
  border-radius: var(--dv-sash-border-radius);
}
.dockview-theme-solarized-light-spaced .dv-drop-target-anchor {
  border-radius: calc(var(--dv-border-radius) / 4);
}
.dockview-theme-solarized-light-spaced .dv-drop-target-anchor.dv-drop-target-content {
  border-radius: var(--dv-border-radius);
}
.dockview-theme-solarized-light-spaced .dv-resize-container {
  border-radius: var(--dv-border-radius) !important;
  border: none;
}
.dockview-theme-solarized-light-spaced .dv-resize-container .dv-groupview {
  border: var(--dv-floating-group-border);
}
.dockview-theme-solarized-light-spaced .dv-resize-container > .dv-grid-view {
  box-sizing: border-box;
  padding: var(--dv-spacing-padding);
}
.dockview-theme-solarized-light-spaced .dv-resize-container-with-titlebar > .dv-grid-view {
  padding-top: 0;
}
.dockview-theme-solarized-light-spaced .dv-resize-container-with-titlebar > .dv-floating-titlebar {
  border-top-left-radius: var(--dv-border-radius);
  border-top-right-radius: var(--dv-border-radius);
}
.dockview-theme-solarized-light-spaced .dv-tabs-overflow-container,
.dockview-theme-solarized-light-spaced .dv-tabs-overflow-dropdown-default {
  border-radius: var(--dv-dropdown-border-radius);
  height: unset !important;
}
.dockview-theme-solarized-light-spaced .dv-render-overlay {
  border-bottom-left-radius: var(--dv-border-radius);
  border-bottom-right-radius: var(--dv-border-radius);
}
.dockview-theme-solarized-light-spaced .dv-tab {
  border-radius: var(--dv-tab-border-radius);
}
.dockview-theme-solarized-light-spaced .dv-tab .dv-svg {
  height: var(--dv-tab-close-icon-size);
  width: var(--dv-tab-close-icon-size);
}
.dockview-theme-solarized-light-spaced .dv-tabs-container--wrap:not(.dv-tabs-container-vertical) .dv-tab {
  height: calc(var(--dv-tabs-and-actions-container-height) - 2 * var(--dv-tab-margin-block));
}
.dockview-theme-solarized-light-spaced .dv-tabs-container-vertical .dv-tab {
  margin: var(--dv-tab-margin-inline) var(--dv-tab-margin-block);
}
.dockview-theme-solarized-light-spaced .dv-tabs-container--wrap.dv-tabs-container-vertical .dv-tab {
  width: calc(var(--dv-tabs-and-actions-container-height) - 2 * var(--dv-tab-margin-block));
}
.dockview-theme-solarized-light-spaced .dv-groupview {
  border-radius: var(--dv-border-radius);
}
.dockview-theme-solarized-light-spaced .dv-groupview .dv-tabs-and-actions-container {
  padding: 0px calc(var(--dv-border-radius) / 2);
  border-top-left-radius: var(--dv-border-radius);
  border-top-right-radius: var(--dv-border-radius);
}
.dockview-theme-solarized-light-spaced .dv-groupview .dv-tabs-and-actions-container.dv-groupview-header-vertical {
  padding: calc(var(--dv-border-radius) / 2) 0;
}
.dockview-theme-solarized-light-spaced .dv-groupview .dv-content-container {
  background-color: var(--dv-tabs-and-actions-container-background-color);
  border-bottom-left-radius: var(--dv-border-radius);
  border-bottom-right-radius: var(--dv-border-radius);
}
.dockview-theme-solarized-light-spaced .dv-groupview.dv-groupview-header-bottom > .dv-tabs-and-actions-container {
  border-radius: 0 0 var(--dv-border-radius) var(--dv-border-radius);
}
.dockview-theme-solarized-light-spaced .dv-groupview.dv-groupview-header-bottom > .dv-content-container {
  border-radius: var(--dv-border-radius) var(--dv-border-radius) 0 0;
}
.dockview-theme-solarized-light-spaced .dv-groupview.dv-groupview-header-left > .dv-tabs-and-actions-container {
  border-radius: var(--dv-border-radius) 0 0 var(--dv-border-radius);
}
.dockview-theme-solarized-light-spaced .dv-groupview.dv-groupview-header-left > .dv-content-container {
  border-radius: 0 var(--dv-border-radius) var(--dv-border-radius) 0;
}
.dockview-theme-solarized-light-spaced .dv-groupview.dv-groupview-header-right > .dv-tabs-and-actions-container {
  border-radius: 0 var(--dv-border-radius) var(--dv-border-radius) 0;
}
.dockview-theme-solarized-light-spaced .dv-groupview.dv-groupview-header-right > .dv-content-container {
  border-radius: var(--dv-border-radius) 0 0 var(--dv-border-radius);
}
.dockview-theme-solarized-light-spaced .dv-groupview.dv-edge-tool-window .dv-edge-peek-header {
  border-top-left-radius: var(--dv-border-radius);
  border-top-right-radius: var(--dv-border-radius);
}
.dockview-theme-solarized-light-spaced .dv-groupview.dv-edge-tool-window .dv-content-container {
  border-radius: 0;
}
.dockview-theme-solarized-light-spaced .dv-groupview.dv-edge-tool-window .dv-tabs-and-actions-container {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-left-radius: var(--dv-border-radius);
  border-bottom-right-radius: var(--dv-border-radius);
}
.dockview-theme-solarized-light-spaced .dv-edge-peek {
  border-bottom-left-radius: var(--dv-border-radius);
  border-bottom-right-radius: var(--dv-border-radius);
}
.dockview-theme-solarized-light-spaced .dv-edge-peek-clip {
  border-bottom-left-radius: var(--dv-border-radius);
  border-bottom-right-radius: var(--dv-border-radius);
}
.dockview-theme-solarized-light-spaced .dv-edge-peek-header {
  border-top-left-radius: var(--dv-border-radius);
  border-top-right-radius: var(--dv-border-radius);
}
.dockview-theme-solarized-light-spaced {
  color-scheme: light;
  --dv-color-sol-base3: #fdf6e3;
  --dv-color-sol-base2: #eee8d5;
  --dv-color-sol-base1: #93a1a1;
  --dv-color-sol-base00: #657b83;
  --dv-color-sol-base01: #586e75;
  --dv-color-sol-blue: #268bd2;
  --dv-drag-over-background-color: rgba(38, 139, 210, 0.1);
  --dv-group-view-background-color: var(--dv-color-sol-base2);
  --dv-tabs-and-actions-container-background-color: var(--dv-color-sol-base3);
  --dv-activegroup-visiblepanel-tab-background-color: #e8e2d0;
  --dv-activegroup-hiddenpanel-tab-background-color: var(
      --dv-color-sol-base3
  );
  --dv-inactivegroup-visiblepanel-tab-background-color: #e8e2d0;
  --dv-inactivegroup-hiddenpanel-tab-background-color: var(
      --dv-color-sol-base3
  );
  --dv-activegroup-visiblepanel-tab-color: var(--dv-color-sol-base01);
  --dv-activegroup-hiddenpanel-tab-color: var(--dv-color-sol-base00);
  --dv-inactivegroup-visiblepanel-tab-color: var(--dv-color-sol-base1);
  --dv-inactivegroup-hiddenpanel-tab-color: rgba(147, 161, 161, 0.6);
  --dv-separator-border: transparent;
  --dv-paneview-header-border-color: var(--dv-color-sol-base2);
  --dv-paneview-active-outline-color: var(--dv-color-sol-blue);
  --dv-active-sash-color: var(--dv-color-sol-blue);
  --dv-floating-box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08);
  --dv-floating-border: 1px solid rgba(0, 0, 0, 0.1);
  --dv-scrollbar-background-color: rgba(101, 123, 131, 0.25);
  --dv-floating-group-border: 2px solid rgba(238, 232, 213, 0.5);
}

.dockview-theme-github-dark {
  --dv-paneview-active-outline-color: dodgerblue;
  --dv-tabs-and-actions-container-font-size: 13px;
  --dv-tabs-and-actions-container-height: 35px;
  --dv-drag-over-background-color: rgba(83, 89, 93, 0.5);
  --dv-drag-over-border-color: transparent;
  --dv-edge-dock-indicator-color: rgba(56, 139, 253, 0.9);
  --dv-edge-drop-strip-size: 8px;
  --dv-tabs-container-scrollbar-color: #888;
  --dv-icon-hover-background-color: rgba(90, 93, 94, 0.31);
  --dv-floating-box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.4), 0 2px 8px rgba(0, 0, 0, 0.25);
  --dv-floating-border: 1px solid rgba(255, 255, 255, 0.1);
  --dv-overlay-z-index: 999;
  --dv-tab-font-size: inherit;
  --dv-border-radius: 0px;
  --dv-tab-margin: 0;
  --dv-sash-color: transparent;
  --dv-active-sash-color: transparent;
  --dv-active-sash-transition-duration: 0.1s;
  --dv-active-sash-transition-delay: 0.5s;
  --dv-spacing-padding: 0px;
  --dv-tab-border-radius: 0px;
  --dv-sash-border-radius: 0px;
  --dv-dropdown-border-radius: 0px;
  --dv-tab-close-icon-size: inherit;
  --dv-floating-group-border: none;
  --dv-drag-over-border: none;
  --dv-floating-group-dragging-opacity: 0.5;
  --dv-floating-titlebar-height: 22px;
  --dv-floating-titlebar-background-color: var(
      --dv-tabs-and-actions-container-background-color
  );
  --dv-floating-titlebar-border-bottom: var(--dv-floating-border);
  --dv-tab-group-color-grey: #5f6368;
  --dv-tab-group-color-blue: #1a73e8;
  --dv-tab-group-color-red: #d93025;
  --dv-tab-group-color-yellow: #f9ab00;
  --dv-tab-group-color-green: #188038;
  --dv-tab-group-color-pink: #d01884;
  --dv-tab-group-color-purple: #a142f4;
  --dv-tab-group-color-cyan: #007b83;
  --dv-tab-group-color-orange: #e8710a;
  --dv-tab-group-chip-padding: 4px 8px;
  --dv-tab-group-chip-border-radius: 6px;
  --dv-tab-group-chip-font-size: 11px;
  --dv-tab-group-line-height: 2px;
  --dv-tab-group-line-opacity: 0.6;
}
.dockview-theme-github-dark .dv-drop-target-container .dv-drop-target-anchor.dv-drop-target-anchor-container-changed {
  opacity: 0;
  transition: none;
}
.dockview-theme-github-dark {
  color-scheme: dark;
  --dv-color-gh-canvas-default: #0d1117;
  --dv-color-gh-canvas-subtle: #161b22;
  --dv-color-gh-canvas-inset: #010409;
  --dv-color-gh-border: #30363d;
  --dv-color-gh-border-muted: #21262d;
  --dv-color-gh-fg-default: #e6edf3;
  --dv-color-gh-fg-muted: #8b949e;
  --dv-color-gh-fg-subtle: #6e7681;
  --dv-color-gh-accent: #58a6ff;
  --dv-group-view-background-color: var(--dv-color-gh-canvas-default);
  --dv-tabs-and-actions-container-background-color: var(
      --dv-color-gh-canvas-subtle
  );
  --dv-activegroup-visiblepanel-tab-background-color: var(
      --dv-color-gh-canvas-default
  );
  --dv-activegroup-hiddenpanel-tab-background-color: var(
      --dv-color-gh-canvas-subtle
  );
  --dv-inactivegroup-visiblepanel-tab-background-color: var(
      --dv-color-gh-canvas-default
  );
  --dv-inactivegroup-hiddenpanel-tab-background-color: var(
      --dv-color-gh-canvas-subtle
  );
  --dv-activegroup-visiblepanel-tab-color: var(--dv-color-gh-fg-default);
  --dv-activegroup-hiddenpanel-tab-color: var(--dv-color-gh-fg-muted);
  --dv-inactivegroup-visiblepanel-tab-color: var(--dv-color-gh-fg-subtle);
  --dv-inactivegroup-hiddenpanel-tab-color: rgba(110, 118, 129, 0.5);
  --dv-separator-border: var(--dv-color-gh-border);
  --dv-paneview-header-border-color: var(--dv-color-gh-border);
  --dv-paneview-active-outline-color: var(--dv-color-gh-accent);
  --dv-active-sash-color: var(--dv-color-gh-accent);
  --dv-scrollbar-background-color: rgba(48, 54, 61, 0.7);
  --dv-drag-over-background-color: rgba(88, 166, 255, 0.15);
}

.dockview-theme-github-dark-spaced {
  --dv-paneview-active-outline-color: dodgerblue;
  --dv-tabs-and-actions-container-font-size: 13px;
  --dv-tabs-and-actions-container-height: 35px;
  --dv-drag-over-background-color: rgba(83, 89, 93, 0.5);
  --dv-drag-over-border-color: transparent;
  --dv-edge-dock-indicator-color: rgba(56, 139, 253, 0.9);
  --dv-edge-drop-strip-size: 8px;
  --dv-tabs-container-scrollbar-color: #888;
  --dv-icon-hover-background-color: rgba(90, 93, 94, 0.31);
  --dv-floating-box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.4), 0 2px 8px rgba(0, 0, 0, 0.25);
  --dv-floating-border: 1px solid rgba(255, 255, 255, 0.1);
  --dv-overlay-z-index: 999;
  --dv-tab-font-size: inherit;
  --dv-border-radius: 0px;
  --dv-tab-margin: 0;
  --dv-sash-color: transparent;
  --dv-active-sash-color: transparent;
  --dv-active-sash-transition-duration: 0.1s;
  --dv-active-sash-transition-delay: 0.5s;
  --dv-spacing-padding: 0px;
  --dv-tab-border-radius: 0px;
  --dv-sash-border-radius: 0px;
  --dv-dropdown-border-radius: 0px;
  --dv-tab-close-icon-size: inherit;
  --dv-floating-group-border: none;
  --dv-drag-over-border: none;
  --dv-floating-group-dragging-opacity: 0.5;
  --dv-floating-titlebar-height: 22px;
  --dv-floating-titlebar-background-color: var(
      --dv-tabs-and-actions-container-background-color
  );
  --dv-floating-titlebar-border-bottom: var(--dv-floating-border);
  --dv-tab-group-color-grey: #5f6368;
  --dv-tab-group-color-blue: #1a73e8;
  --dv-tab-group-color-red: #d93025;
  --dv-tab-group-color-yellow: #f9ab00;
  --dv-tab-group-color-green: #188038;
  --dv-tab-group-color-pink: #d01884;
  --dv-tab-group-color-purple: #a142f4;
  --dv-tab-group-color-cyan: #007b83;
  --dv-tab-group-color-orange: #e8710a;
  --dv-tab-group-chip-padding: 4px 8px;
  --dv-tab-group-chip-border-radius: 6px;
  --dv-tab-group-chip-font-size: 11px;
  --dv-tab-group-line-height: 2px;
  --dv-tab-group-line-opacity: 0.6;
  --dv-spacing-padding: 10px;
  --dv-tab-font-size: 12px;
  --dv-border-radius: 12px;
  --dv-tab-margin-block: 0.5rem;
  --dv-tab-margin-inline: 0.25rem;
  --dv-tab-margin: var(--dv-tab-margin-block) var(--dv-tab-margin-inline);
  --dv-tabs-and-actions-container-height: 44px;
  --dv-tab-border-radius: 8px;
  --dv-sash-border-radius: 4px;
  --dv-dropdown-border-radius: 8px;
  --dv-tab-close-icon-size: 8px;
  --dv-floating-group-border: 2px solid var(--dv-group-view-background-color);
  --dv-floating-titlebar-background-color: var(
      --dv-group-view-background-color
  );
  --dv-floating-titlebar-border-bottom: none;
  box-sizing: border-box;
  padding: var(--dv-spacing-padding);
  background-color: var(--dv-group-view-background-color);
}
.dockview-theme-github-dark-spaced .dv-dockview {
  padding: 0;
}
.dockview-theme-github-dark-spaced .dv-resize-container:has(> .dv-groupview) {
  border-radius: 8px;
}
.dockview-theme-github-dark-spaced .dv-sash {
  border-radius: var(--dv-sash-border-radius);
}
.dockview-theme-github-dark-spaced .dv-drop-target-anchor {
  border-radius: calc(var(--dv-border-radius) / 4);
}
.dockview-theme-github-dark-spaced .dv-drop-target-anchor.dv-drop-target-content {
  border-radius: var(--dv-border-radius);
}
.dockview-theme-github-dark-spaced .dv-resize-container {
  border-radius: var(--dv-border-radius) !important;
  border: none;
}
.dockview-theme-github-dark-spaced .dv-resize-container .dv-groupview {
  border: var(--dv-floating-group-border);
}
.dockview-theme-github-dark-spaced .dv-resize-container > .dv-grid-view {
  box-sizing: border-box;
  padding: var(--dv-spacing-padding);
}
.dockview-theme-github-dark-spaced .dv-resize-container-with-titlebar > .dv-grid-view {
  padding-top: 0;
}
.dockview-theme-github-dark-spaced .dv-resize-container-with-titlebar > .dv-floating-titlebar {
  border-top-left-radius: var(--dv-border-radius);
  border-top-right-radius: var(--dv-border-radius);
}
.dockview-theme-github-dark-spaced .dv-tabs-overflow-container,
.dockview-theme-github-dark-spaced .dv-tabs-overflow-dropdown-default {
  border-radius: var(--dv-dropdown-border-radius);
  height: unset !important;
}
.dockview-theme-github-dark-spaced .dv-render-overlay {
  border-bottom-left-radius: var(--dv-border-radius);
  border-bottom-right-radius: var(--dv-border-radius);
}
.dockview-theme-github-dark-spaced .dv-tab {
  border-radius: var(--dv-tab-border-radius);
}
.dockview-theme-github-dark-spaced .dv-tab .dv-svg {
  height: var(--dv-tab-close-icon-size);
  width: var(--dv-tab-close-icon-size);
}
.dockview-theme-github-dark-spaced .dv-tabs-container--wrap:not(.dv-tabs-container-vertical) .dv-tab {
  height: calc(var(--dv-tabs-and-actions-container-height) - 2 * var(--dv-tab-margin-block));
}
.dockview-theme-github-dark-spaced .dv-tabs-container-vertical .dv-tab {
  margin: var(--dv-tab-margin-inline) var(--dv-tab-margin-block);
}
.dockview-theme-github-dark-spaced .dv-tabs-container--wrap.dv-tabs-container-vertical .dv-tab {
  width: calc(var(--dv-tabs-and-actions-container-height) - 2 * var(--dv-tab-margin-block));
}
.dockview-theme-github-dark-spaced .dv-groupview {
  border-radius: var(--dv-border-radius);
}
.dockview-theme-github-dark-spaced .dv-groupview .dv-tabs-and-actions-container {
  padding: 0px calc(var(--dv-border-radius) / 2);
  border-top-left-radius: var(--dv-border-radius);
  border-top-right-radius: var(--dv-border-radius);
}
.dockview-theme-github-dark-spaced .dv-groupview .dv-tabs-and-actions-container.dv-groupview-header-vertical {
  padding: calc(var(--dv-border-radius) / 2) 0;
}
.dockview-theme-github-dark-spaced .dv-groupview .dv-content-container {
  background-color: var(--dv-tabs-and-actions-container-background-color);
  border-bottom-left-radius: var(--dv-border-radius);
  border-bottom-right-radius: var(--dv-border-radius);
}
.dockview-theme-github-dark-spaced .dv-groupview.dv-groupview-header-bottom > .dv-tabs-and-actions-container {
  border-radius: 0 0 var(--dv-border-radius) var(--dv-border-radius);
}
.dockview-theme-github-dark-spaced .dv-groupview.dv-groupview-header-bottom > .dv-content-container {
  border-radius: var(--dv-border-radius) var(--dv-border-radius) 0 0;
}
.dockview-theme-github-dark-spaced .dv-groupview.dv-groupview-header-left > .dv-tabs-and-actions-container {
  border-radius: var(--dv-border-radius) 0 0 var(--dv-border-radius);
}
.dockview-theme-github-dark-spaced .dv-groupview.dv-groupview-header-left > .dv-content-container {
  border-radius: 0 var(--dv-border-radius) var(--dv-border-radius) 0;
}
.dockview-theme-github-dark-spaced .dv-groupview.dv-groupview-header-right > .dv-tabs-and-actions-container {
  border-radius: 0 var(--dv-border-radius) var(--dv-border-radius) 0;
}
.dockview-theme-github-dark-spaced .dv-groupview.dv-groupview-header-right > .dv-content-container {
  border-radius: var(--dv-border-radius) 0 0 var(--dv-border-radius);
}
.dockview-theme-github-dark-spaced .dv-groupview.dv-edge-tool-window .dv-edge-peek-header {
  border-top-left-radius: var(--dv-border-radius);
  border-top-right-radius: var(--dv-border-radius);
}
.dockview-theme-github-dark-spaced .dv-groupview.dv-edge-tool-window .dv-content-container {
  border-radius: 0;
}
.dockview-theme-github-dark-spaced .dv-groupview.dv-edge-tool-window .dv-tabs-and-actions-container {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-left-radius: var(--dv-border-radius);
  border-bottom-right-radius: var(--dv-border-radius);
}
.dockview-theme-github-dark-spaced .dv-edge-peek {
  border-bottom-left-radius: var(--dv-border-radius);
  border-bottom-right-radius: var(--dv-border-radius);
}
.dockview-theme-github-dark-spaced .dv-edge-peek-clip {
  border-bottom-left-radius: var(--dv-border-radius);
  border-bottom-right-radius: var(--dv-border-radius);
}
.dockview-theme-github-dark-spaced .dv-edge-peek-header {
  border-top-left-radius: var(--dv-border-radius);
  border-top-right-radius: var(--dv-border-radius);
}
.dockview-theme-github-dark-spaced {
  color-scheme: dark;
  --dv-color-gh-canvas-default: #0d1117;
  --dv-color-gh-canvas-subtle: #161b22;
  --dv-color-gh-canvas-inset: #010409;
  --dv-color-gh-border: #30363d;
  --dv-color-gh-border-muted: #21262d;
  --dv-color-gh-fg-default: #e6edf3;
  --dv-color-gh-fg-muted: #8b949e;
  --dv-color-gh-fg-subtle: #6e7681;
  --dv-color-gh-accent: #58a6ff;
  --dv-drag-over-background-color: rgba(88, 166, 255, 0.1);
  --dv-group-view-background-color: var(--dv-color-gh-canvas-inset);
  --dv-tabs-and-actions-container-background-color: var(
      --dv-color-gh-canvas-subtle
  );
  --dv-activegroup-visiblepanel-tab-background-color: var(
      --dv-color-gh-border
  );
  --dv-activegroup-hiddenpanel-tab-background-color: var(
      --dv-color-gh-canvas-subtle
  );
  --dv-inactivegroup-visiblepanel-tab-background-color: var(
      --dv-color-gh-border
  );
  --dv-inactivegroup-hiddenpanel-tab-background-color: var(
      --dv-color-gh-canvas-subtle
  );
  --dv-activegroup-visiblepanel-tab-color: var(--dv-color-gh-fg-default);
  --dv-activegroup-hiddenpanel-tab-color: var(--dv-color-gh-fg-muted);
  --dv-inactivegroup-visiblepanel-tab-color: var(--dv-color-gh-fg-subtle);
  --dv-inactivegroup-hiddenpanel-tab-color: rgba(110, 118, 129, 0.5);
  --dv-separator-border: transparent;
  --dv-paneview-header-border-color: var(--dv-color-gh-border);
  --dv-paneview-active-outline-color: var(--dv-color-gh-accent);
  --dv-active-sash-color: var(--dv-color-gh-accent);
  --dv-scrollbar-background-color: rgba(48, 54, 61, 0.7);
  --dv-floating-group-border: 2px solid var(--dv-color-gh-canvas-inset);
}

.dockview-theme-github-light {
  --dv-paneview-active-outline-color: dodgerblue;
  --dv-tabs-and-actions-container-font-size: 13px;
  --dv-tabs-and-actions-container-height: 35px;
  --dv-drag-over-background-color: rgba(83, 89, 93, 0.5);
  --dv-drag-over-border-color: transparent;
  --dv-edge-dock-indicator-color: rgba(56, 139, 253, 0.9);
  --dv-edge-drop-strip-size: 8px;
  --dv-tabs-container-scrollbar-color: #888;
  --dv-icon-hover-background-color: rgba(90, 93, 94, 0.31);
  --dv-floating-box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.4), 0 2px 8px rgba(0, 0, 0, 0.25);
  --dv-floating-border: 1px solid rgba(255, 255, 255, 0.1);
  --dv-overlay-z-index: 999;
  --dv-tab-font-size: inherit;
  --dv-border-radius: 0px;
  --dv-tab-margin: 0;
  --dv-sash-color: transparent;
  --dv-active-sash-color: transparent;
  --dv-active-sash-transition-duration: 0.1s;
  --dv-active-sash-transition-delay: 0.5s;
  --dv-spacing-padding: 0px;
  --dv-tab-border-radius: 0px;
  --dv-sash-border-radius: 0px;
  --dv-dropdown-border-radius: 0px;
  --dv-tab-close-icon-size: inherit;
  --dv-floating-group-border: none;
  --dv-drag-over-border: none;
  --dv-floating-group-dragging-opacity: 0.5;
  --dv-floating-titlebar-height: 22px;
  --dv-floating-titlebar-background-color: var(
      --dv-tabs-and-actions-container-background-color
  );
  --dv-floating-titlebar-border-bottom: var(--dv-floating-border);
  --dv-tab-group-color-grey: #5f6368;
  --dv-tab-group-color-blue: #1a73e8;
  --dv-tab-group-color-red: #d93025;
  --dv-tab-group-color-yellow: #f9ab00;
  --dv-tab-group-color-green: #188038;
  --dv-tab-group-color-pink: #d01884;
  --dv-tab-group-color-purple: #a142f4;
  --dv-tab-group-color-cyan: #007b83;
  --dv-tab-group-color-orange: #e8710a;
  --dv-tab-group-chip-padding: 4px 8px;
  --dv-tab-group-chip-border-radius: 6px;
  --dv-tab-group-chip-font-size: 11px;
  --dv-tab-group-line-height: 2px;
  --dv-tab-group-line-opacity: 0.6;
}
.dockview-theme-github-light .dv-drop-target-container .dv-drop-target-anchor.dv-drop-target-anchor-container-changed {
  opacity: 0;
  transition: none;
}
.dockview-theme-github-light {
  color-scheme: light;
  --dv-color-gh-light-canvas-default: #ffffff;
  --dv-color-gh-light-canvas-subtle: #f6f8fa;
  --dv-color-gh-light-canvas-inset: #f0f6ff;
  --dv-color-gh-light-border: #d0d7de;
  --dv-color-gh-light-fg-default: #1f2328;
  --dv-color-gh-light-fg-muted: #656d76;
  --dv-color-gh-light-fg-subtle: #6e7781;
  --dv-color-gh-light-accent: #0969da;
  --dv-group-view-background-color: var(--dv-color-gh-light-canvas-default);
  --dv-tabs-and-actions-container-background-color: var(
      --dv-color-gh-light-canvas-subtle
  );
  --dv-activegroup-visiblepanel-tab-background-color: var(
      --dv-color-gh-light-canvas-default
  );
  --dv-activegroup-hiddenpanel-tab-background-color: var(
      --dv-color-gh-light-canvas-subtle
  );
  --dv-inactivegroup-visiblepanel-tab-background-color: var(
      --dv-color-gh-light-canvas-default
  );
  --dv-inactivegroup-hiddenpanel-tab-background-color: var(
      --dv-color-gh-light-canvas-subtle
  );
  --dv-activegroup-visiblepanel-tab-color: var(
      --dv-color-gh-light-fg-default
  );
  --dv-activegroup-hiddenpanel-tab-color: var(--dv-color-gh-light-fg-muted);
  --dv-inactivegroup-visiblepanel-tab-color: var(
      --dv-color-gh-light-fg-subtle
  );
  --dv-inactivegroup-hiddenpanel-tab-color: rgba(110, 118, 129, 0.4);
  --dv-separator-border: var(--dv-color-gh-light-border);
  --dv-paneview-header-border-color: var(--dv-color-gh-light-border);
  --dv-paneview-active-outline-color: var(--dv-color-gh-light-accent);
  --dv-active-sash-color: var(--dv-color-gh-light-accent);
  --dv-scrollbar-background-color: rgba(208, 215, 222, 0.5);
  --dv-drag-over-background-color: rgba(9, 105, 218, 0.1);
  --dv-floating-box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08);
  --dv-floating-border: 1px solid rgba(0, 0, 0, 0.1);
}

.dockview-theme-github-light-spaced {
  --dv-paneview-active-outline-color: dodgerblue;
  --dv-tabs-and-actions-container-font-size: 13px;
  --dv-tabs-and-actions-container-height: 35px;
  --dv-drag-over-background-color: rgba(83, 89, 93, 0.5);
  --dv-drag-over-border-color: transparent;
  --dv-edge-dock-indicator-color: rgba(56, 139, 253, 0.9);
  --dv-edge-drop-strip-size: 8px;
  --dv-tabs-container-scrollbar-color: #888;
  --dv-icon-hover-background-color: rgba(90, 93, 94, 0.31);
  --dv-floating-box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.4), 0 2px 8px rgba(0, 0, 0, 0.25);
  --dv-floating-border: 1px solid rgba(255, 255, 255, 0.1);
  --dv-overlay-z-index: 999;
  --dv-tab-font-size: inherit;
  --dv-border-radius: 0px;
  --dv-tab-margin: 0;
  --dv-sash-color: transparent;
  --dv-active-sash-color: transparent;
  --dv-active-sash-transition-duration: 0.1s;
  --dv-active-sash-transition-delay: 0.5s;
  --dv-spacing-padding: 0px;
  --dv-tab-border-radius: 0px;
  --dv-sash-border-radius: 0px;
  --dv-dropdown-border-radius: 0px;
  --dv-tab-close-icon-size: inherit;
  --dv-floating-group-border: none;
  --dv-drag-over-border: none;
  --dv-floating-group-dragging-opacity: 0.5;
  --dv-floating-titlebar-height: 22px;
  --dv-floating-titlebar-background-color: var(
      --dv-tabs-and-actions-container-background-color
  );
  --dv-floating-titlebar-border-bottom: var(--dv-floating-border);
  --dv-tab-group-color-grey: #5f6368;
  --dv-tab-group-color-blue: #1a73e8;
  --dv-tab-group-color-red: #d93025;
  --dv-tab-group-color-yellow: #f9ab00;
  --dv-tab-group-color-green: #188038;
  --dv-tab-group-color-pink: #d01884;
  --dv-tab-group-color-purple: #a142f4;
  --dv-tab-group-color-cyan: #007b83;
  --dv-tab-group-color-orange: #e8710a;
  --dv-tab-group-chip-padding: 4px 8px;
  --dv-tab-group-chip-border-radius: 6px;
  --dv-tab-group-chip-font-size: 11px;
  --dv-tab-group-line-height: 2px;
  --dv-tab-group-line-opacity: 0.6;
  --dv-spacing-padding: 10px;
  --dv-tab-font-size: 12px;
  --dv-border-radius: 12px;
  --dv-tab-margin-block: 0.5rem;
  --dv-tab-margin-inline: 0.25rem;
  --dv-tab-margin: var(--dv-tab-margin-block) var(--dv-tab-margin-inline);
  --dv-tabs-and-actions-container-height: 44px;
  --dv-tab-border-radius: 8px;
  --dv-sash-border-radius: 4px;
  --dv-dropdown-border-radius: 8px;
  --dv-tab-close-icon-size: 8px;
  --dv-floating-group-border: 2px solid var(--dv-group-view-background-color);
  --dv-floating-titlebar-background-color: var(
      --dv-group-view-background-color
  );
  --dv-floating-titlebar-border-bottom: none;
  box-sizing: border-box;
  padding: var(--dv-spacing-padding);
  background-color: var(--dv-group-view-background-color);
}
.dockview-theme-github-light-spaced .dv-dockview {
  padding: 0;
}
.dockview-theme-github-light-spaced .dv-resize-container:has(> .dv-groupview) {
  border-radius: 8px;
}
.dockview-theme-github-light-spaced .dv-sash {
  border-radius: var(--dv-sash-border-radius);
}
.dockview-theme-github-light-spaced .dv-drop-target-anchor {
  border-radius: calc(var(--dv-border-radius) / 4);
}
.dockview-theme-github-light-spaced .dv-drop-target-anchor.dv-drop-target-content {
  border-radius: var(--dv-border-radius);
}
.dockview-theme-github-light-spaced .dv-resize-container {
  border-radius: var(--dv-border-radius) !important;
  border: none;
}
.dockview-theme-github-light-spaced .dv-resize-container .dv-groupview {
  border: var(--dv-floating-group-border);
}
.dockview-theme-github-light-spaced .dv-resize-container > .dv-grid-view {
  box-sizing: border-box;
  padding: var(--dv-spacing-padding);
}
.dockview-theme-github-light-spaced .dv-resize-container-with-titlebar > .dv-grid-view {
  padding-top: 0;
}
.dockview-theme-github-light-spaced .dv-resize-container-with-titlebar > .dv-floating-titlebar {
  border-top-left-radius: var(--dv-border-radius);
  border-top-right-radius: var(--dv-border-radius);
}
.dockview-theme-github-light-spaced .dv-tabs-overflow-container,
.dockview-theme-github-light-spaced .dv-tabs-overflow-dropdown-default {
  border-radius: var(--dv-dropdown-border-radius);
  height: unset !important;
}
.dockview-theme-github-light-spaced .dv-render-overlay {
  border-bottom-left-radius: var(--dv-border-radius);
  border-bottom-right-radius: var(--dv-border-radius);
}
.dockview-theme-github-light-spaced .dv-tab {
  border-radius: var(--dv-tab-border-radius);
}
.dockview-theme-github-light-spaced .dv-tab .dv-svg {
  height: var(--dv-tab-close-icon-size);
  width: var(--dv-tab-close-icon-size);
}
.dockview-theme-github-light-spaced .dv-tabs-container--wrap:not(.dv-tabs-container-vertical) .dv-tab {
  height: calc(var(--dv-tabs-and-actions-container-height) - 2 * var(--dv-tab-margin-block));
}
.dockview-theme-github-light-spaced .dv-tabs-container-vertical .dv-tab {
  margin: var(--dv-tab-margin-inline) var(--dv-tab-margin-block);
}
.dockview-theme-github-light-spaced .dv-tabs-container--wrap.dv-tabs-container-vertical .dv-tab {
  width: calc(var(--dv-tabs-and-actions-container-height) - 2 * var(--dv-tab-margin-block));
}
.dockview-theme-github-light-spaced .dv-groupview {
  border-radius: var(--dv-border-radius);
}
.dockview-theme-github-light-spaced .dv-groupview .dv-tabs-and-actions-container {
  padding: 0px calc(var(--dv-border-radius) / 2);
  border-top-left-radius: var(--dv-border-radius);
  border-top-right-radius: var(--dv-border-radius);
}
.dockview-theme-github-light-spaced .dv-groupview .dv-tabs-and-actions-container.dv-groupview-header-vertical {
  padding: calc(var(--dv-border-radius) / 2) 0;
}
.dockview-theme-github-light-spaced .dv-groupview .dv-content-container {
  background-color: var(--dv-tabs-and-actions-container-background-color);
  border-bottom-left-radius: var(--dv-border-radius);
  border-bottom-right-radius: var(--dv-border-radius);
}
.dockview-theme-github-light-spaced .dv-groupview.dv-groupview-header-bottom > .dv-tabs-and-actions-container {
  border-radius: 0 0 var(--dv-border-radius) var(--dv-border-radius);
}
.dockview-theme-github-light-spaced .dv-groupview.dv-groupview-header-bottom > .dv-content-container {
  border-radius: var(--dv-border-radius) var(--dv-border-radius) 0 0;
}
.dockview-theme-github-light-spaced .dv-groupview.dv-groupview-header-left > .dv-tabs-and-actions-container {
  border-radius: var(--dv-border-radius) 0 0 var(--dv-border-radius);
}
.dockview-theme-github-light-spaced .dv-groupview.dv-groupview-header-left > .dv-content-container {
  border-radius: 0 var(--dv-border-radius) var(--dv-border-radius) 0;
}
.dockview-theme-github-light-spaced .dv-groupview.dv-groupview-header-right > .dv-tabs-and-actions-container {
  border-radius: 0 var(--dv-border-radius) var(--dv-border-radius) 0;
}
.dockview-theme-github-light-spaced .dv-groupview.dv-groupview-header-right > .dv-content-container {
  border-radius: var(--dv-border-radius) 0 0 var(--dv-border-radius);
}
.dockview-theme-github-light-spaced .dv-groupview.dv-edge-tool-window .dv-edge-peek-header {
  border-top-left-radius: var(--dv-border-radius);
  border-top-right-radius: var(--dv-border-radius);
}
.dockview-theme-github-light-spaced .dv-groupview.dv-edge-tool-window .dv-content-container {
  border-radius: 0;
}
.dockview-theme-github-light-spaced .dv-groupview.dv-edge-tool-window .dv-tabs-and-actions-container {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-left-radius: var(--dv-border-radius);
  border-bottom-right-radius: var(--dv-border-radius);
}
.dockview-theme-github-light-spaced .dv-edge-peek {
  border-bottom-left-radius: var(--dv-border-radius);
  border-bottom-right-radius: var(--dv-border-radius);
}
.dockview-theme-github-light-spaced .dv-edge-peek-clip {
  border-bottom-left-radius: var(--dv-border-radius);
  border-bottom-right-radius: var(--dv-border-radius);
}
.dockview-theme-github-light-spaced .dv-edge-peek-header {
  border-top-left-radius: var(--dv-border-radius);
  border-top-right-radius: var(--dv-border-radius);
}
.dockview-theme-github-light-spaced {
  color-scheme: light;
  --dv-color-gh-light-canvas-default: #ffffff;
  --dv-color-gh-light-canvas-subtle: #f6f8fa;
  --dv-color-gh-light-border: #d0d7de;
  --dv-color-gh-light-fg-default: #1f2328;
  --dv-color-gh-light-fg-muted: #656d76;
  --dv-color-gh-light-fg-subtle: #6e7781;
  --dv-color-gh-light-accent: #0969da;
  --dv-drag-over-background-color: rgba(9, 105, 218, 0.08);
  --dv-group-view-background-color: var(--dv-color-gh-light-canvas-subtle);
  --dv-tabs-and-actions-container-background-color: var(
      --dv-color-gh-light-canvas-default
  );
  --dv-activegroup-visiblepanel-tab-background-color: var(
      --dv-color-gh-light-border
  );
  --dv-activegroup-hiddenpanel-tab-background-color: var(
      --dv-color-gh-light-canvas-default
  );
  --dv-inactivegroup-visiblepanel-tab-background-color: var(
      --dv-color-gh-light-border
  );
  --dv-inactivegroup-hiddenpanel-tab-background-color: var(
      --dv-color-gh-light-canvas-default
  );
  --dv-activegroup-visiblepanel-tab-color: var(
      --dv-color-gh-light-fg-default
  );
  --dv-activegroup-hiddenpanel-tab-color: var(--dv-color-gh-light-fg-muted);
  --dv-inactivegroup-visiblepanel-tab-color: var(
      --dv-color-gh-light-fg-subtle
  );
  --dv-inactivegroup-hiddenpanel-tab-color: rgba(110, 118, 129, 0.4);
  --dv-separator-border: transparent;
  --dv-paneview-header-border-color: var(--dv-color-gh-light-border);
  --dv-paneview-active-outline-color: var(--dv-color-gh-light-accent);
  --dv-active-sash-color: var(--dv-color-gh-light-accent);
  --dv-floating-box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08);
  --dv-floating-border: 1px solid rgba(0, 0, 0, 0.1);
  --dv-scrollbar-background-color: rgba(208, 215, 222, 0.5);
  --dv-floating-group-border: 2px solid rgba(208, 215, 222, 0.5);
}

.dockview-theme-abyss-spaced {
  --dv-paneview-active-outline-color: dodgerblue;
  --dv-tabs-and-actions-container-font-size: 13px;
  --dv-tabs-and-actions-container-height: 35px;
  --dv-drag-over-background-color: rgba(83, 89, 93, 0.5);
  --dv-drag-over-border-color: transparent;
  --dv-edge-dock-indicator-color: rgba(56, 139, 253, 0.9);
  --dv-edge-drop-strip-size: 8px;
  --dv-tabs-container-scrollbar-color: #888;
  --dv-icon-hover-background-color: rgba(90, 93, 94, 0.31);
  --dv-floating-box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.4), 0 2px 8px rgba(0, 0, 0, 0.25);
  --dv-floating-border: 1px solid rgba(255, 255, 255, 0.1);
  --dv-overlay-z-index: 999;
  --dv-tab-font-size: inherit;
  --dv-border-radius: 0px;
  --dv-tab-margin: 0;
  --dv-sash-color: transparent;
  --dv-active-sash-color: transparent;
  --dv-active-sash-transition-duration: 0.1s;
  --dv-active-sash-transition-delay: 0.5s;
  --dv-spacing-padding: 0px;
  --dv-tab-border-radius: 0px;
  --dv-sash-border-radius: 0px;
  --dv-dropdown-border-radius: 0px;
  --dv-tab-close-icon-size: inherit;
  --dv-floating-group-border: none;
  --dv-drag-over-border: none;
  --dv-floating-group-dragging-opacity: 0.5;
  --dv-floating-titlebar-height: 22px;
  --dv-floating-titlebar-background-color: var(
      --dv-tabs-and-actions-container-background-color
  );
  --dv-floating-titlebar-border-bottom: var(--dv-floating-border);
  --dv-tab-group-color-grey: #5f6368;
  --dv-tab-group-color-blue: #1a73e8;
  --dv-tab-group-color-red: #d93025;
  --dv-tab-group-color-yellow: #f9ab00;
  --dv-tab-group-color-green: #188038;
  --dv-tab-group-color-pink: #d01884;
  --dv-tab-group-color-purple: #a142f4;
  --dv-tab-group-color-cyan: #007b83;
  --dv-tab-group-color-orange: #e8710a;
  --dv-tab-group-chip-padding: 4px 8px;
  --dv-tab-group-chip-border-radius: 6px;
  --dv-tab-group-chip-font-size: 11px;
  --dv-tab-group-line-height: 2px;
  --dv-tab-group-line-opacity: 0.6;
  --dv-spacing-padding: 10px;
  --dv-tab-font-size: 12px;
  --dv-border-radius: 12px;
  --dv-tab-margin-block: 0.5rem;
  --dv-tab-margin-inline: 0.25rem;
  --dv-tab-margin: var(--dv-tab-margin-block) var(--dv-tab-margin-inline);
  --dv-tabs-and-actions-container-height: 44px;
  --dv-tab-border-radius: 8px;
  --dv-sash-border-radius: 4px;
  --dv-dropdown-border-radius: 8px;
  --dv-tab-close-icon-size: 8px;
  --dv-floating-group-border: 2px solid var(--dv-group-view-background-color);
  --dv-floating-titlebar-background-color: var(
      --dv-group-view-background-color
  );
  --dv-floating-titlebar-border-bottom: none;
  box-sizing: border-box;
  padding: var(--dv-spacing-padding);
  background-color: var(--dv-group-view-background-color);
}
.dockview-theme-abyss-spaced .dv-dockview {
  padding: 0;
}
.dockview-theme-abyss-spaced .dv-resize-container:has(> .dv-groupview) {
  border-radius: 8px;
}
.dockview-theme-abyss-spaced .dv-sash {
  border-radius: var(--dv-sash-border-radius);
}
.dockview-theme-abyss-spaced .dv-drop-target-anchor {
  border-radius: calc(var(--dv-border-radius) / 4);
}
.dockview-theme-abyss-spaced .dv-drop-target-anchor.dv-drop-target-content {
  border-radius: var(--dv-border-radius);
}
.dockview-theme-abyss-spaced .dv-resize-container {
  border-radius: var(--dv-border-radius) !important;
  border: none;
}
.dockview-theme-abyss-spaced .dv-resize-container .dv-groupview {
  border: var(--dv-floating-group-border);
}
.dockview-theme-abyss-spaced .dv-resize-container > .dv-grid-view {
  box-sizing: border-box;
  padding: var(--dv-spacing-padding);
}
.dockview-theme-abyss-spaced .dv-resize-container-with-titlebar > .dv-grid-view {
  padding-top: 0;
}
.dockview-theme-abyss-spaced .dv-resize-container-with-titlebar > .dv-floating-titlebar {
  border-top-left-radius: var(--dv-border-radius);
  border-top-right-radius: var(--dv-border-radius);
}
.dockview-theme-abyss-spaced .dv-tabs-overflow-container,
.dockview-theme-abyss-spaced .dv-tabs-overflow-dropdown-default {
  border-radius: var(--dv-dropdown-border-radius);
  height: unset !important;
}
.dockview-theme-abyss-spaced .dv-render-overlay {
  border-bottom-left-radius: var(--dv-border-radius);
  border-bottom-right-radius: var(--dv-border-radius);
}
.dockview-theme-abyss-spaced .dv-tab {
  border-radius: var(--dv-tab-border-radius);
}
.dockview-theme-abyss-spaced .dv-tab .dv-svg {
  height: var(--dv-tab-close-icon-size);
  width: var(--dv-tab-close-icon-size);
}
.dockview-theme-abyss-spaced .dv-tabs-container--wrap:not(.dv-tabs-container-vertical) .dv-tab {
  height: calc(var(--dv-tabs-and-actions-container-height) - 2 * var(--dv-tab-margin-block));
}
.dockview-theme-abyss-spaced .dv-tabs-container-vertical .dv-tab {
  margin: var(--dv-tab-margin-inline) var(--dv-tab-margin-block);
}
.dockview-theme-abyss-spaced .dv-tabs-container--wrap.dv-tabs-container-vertical .dv-tab {
  width: calc(var(--dv-tabs-and-actions-container-height) - 2 * var(--dv-tab-margin-block));
}
.dockview-theme-abyss-spaced .dv-groupview {
  border-radius: var(--dv-border-radius);
}
.dockview-theme-abyss-spaced .dv-groupview .dv-tabs-and-actions-container {
  padding: 0px calc(var(--dv-border-radius) / 2);
  border-top-left-radius: var(--dv-border-radius);
  border-top-right-radius: var(--dv-border-radius);
}
.dockview-theme-abyss-spaced .dv-groupview .dv-tabs-and-actions-container.dv-groupview-header-vertical {
  padding: calc(var(--dv-border-radius) / 2) 0;
}
.dockview-theme-abyss-spaced .dv-groupview .dv-content-container {
  background-color: var(--dv-tabs-and-actions-container-background-color);
  border-bottom-left-radius: var(--dv-border-radius);
  border-bottom-right-radius: var(--dv-border-radius);
}
.dockview-theme-abyss-spaced .dv-groupview.dv-groupview-header-bottom > .dv-tabs-and-actions-container {
  border-radius: 0 0 var(--dv-border-radius) var(--dv-border-radius);
}
.dockview-theme-abyss-spaced .dv-groupview.dv-groupview-header-bottom > .dv-content-container {
  border-radius: var(--dv-border-radius) var(--dv-border-radius) 0 0;
}
.dockview-theme-abyss-spaced .dv-groupview.dv-groupview-header-left > .dv-tabs-and-actions-container {
  border-radius: var(--dv-border-radius) 0 0 var(--dv-border-radius);
}
.dockview-theme-abyss-spaced .dv-groupview.dv-groupview-header-left > .dv-content-container {
  border-radius: 0 var(--dv-border-radius) var(--dv-border-radius) 0;
}
.dockview-theme-abyss-spaced .dv-groupview.dv-groupview-header-right > .dv-tabs-and-actions-container {
  border-radius: 0 var(--dv-border-radius) var(--dv-border-radius) 0;
}
.dockview-theme-abyss-spaced .dv-groupview.dv-groupview-header-right > .dv-content-container {
  border-radius: var(--dv-border-radius) 0 0 var(--dv-border-radius);
}
.dockview-theme-abyss-spaced .dv-groupview.dv-edge-tool-window .dv-edge-peek-header {
  border-top-left-radius: var(--dv-border-radius);
  border-top-right-radius: var(--dv-border-radius);
}
.dockview-theme-abyss-spaced .dv-groupview.dv-edge-tool-window .dv-content-container {
  border-radius: 0;
}
.dockview-theme-abyss-spaced .dv-groupview.dv-edge-tool-window .dv-tabs-and-actions-container {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-left-radius: var(--dv-border-radius);
  border-bottom-right-radius: var(--dv-border-radius);
}
.dockview-theme-abyss-spaced .dv-edge-peek {
  border-bottom-left-radius: var(--dv-border-radius);
  border-bottom-right-radius: var(--dv-border-radius);
}
.dockview-theme-abyss-spaced .dv-edge-peek-clip {
  border-bottom-left-radius: var(--dv-border-radius);
  border-bottom-right-radius: var(--dv-border-radius);
}
.dockview-theme-abyss-spaced .dv-edge-peek-header {
  border-top-left-radius: var(--dv-border-radius);
  border-top-right-radius: var(--dv-border-radius);
}
.dockview-theme-abyss-spaced {
  color-scheme: dark;
  --dv-color-abyss-dark: rgb(11, 6, 17);
  --dv-color-abyss: #16121f;
  --dv-color-abyss-light: #201d2b;
  --dv-color-abyss-lighter: #2a2837;
  --dv-color-abyss-accent: rgb(91, 30, 207);
  --dv-color-abyss-primary-text: white;
  --dv-color-abyss-secondary-text: rgb(148, 151, 169);
  --dv-drag-over-background-color: '';
  --dv-group-view-background-color: var(--dv-color-abyss-dark);
  --dv-tabs-and-actions-container-background-color: var(--dv-color-abyss);
  --dv-activegroup-visiblepanel-tab-background-color: var(
      --dv-color-abyss-lighter
  );
  --dv-activegroup-hiddenpanel-tab-background-color: var(
      --dv-color-abyss-light
  );
  --dv-inactivegroup-visiblepanel-tab-background-color: var(
      --dv-color-abyss-lighter
  );
  --dv-inactivegroup-hiddenpanel-tab-background-color: var(
      --dv-color-abyss-light
  );
  --dv-tab-divider-color: transparent;
  --dv-activegroup-visiblepanel-tab-color: var(--dv-color-abyss-primary-text);
  --dv-activegroup-hiddenpanel-tab-color: var(
      --dv-color-abyss-secondary-text
  );
  --dv-inactivegroup-visiblepanel-tab-color: var(
      --dv-color-abyss-primary-text
  );
  --dv-inactivegroup-hiddenpanel-tab-color: var(
      --dv-color-abyss-secondary-text
  );
  --dv-separator-border: transparent;
  --dv-paneview-header-border-color: rgb(51, 51, 51);
  --dv-active-sash-color: var(--dv-color-abyss-accent);
  --dv-floating-group-border: 2px solid var(--dv-color-abyss-dark);
}

.dockview-theme-light-spaced {
  --dv-paneview-active-outline-color: dodgerblue;
  --dv-tabs-and-actions-container-font-size: 13px;
  --dv-tabs-and-actions-container-height: 35px;
  --dv-drag-over-background-color: rgba(83, 89, 93, 0.5);
  --dv-drag-over-border-color: transparent;
  --dv-edge-dock-indicator-color: rgba(56, 139, 253, 0.9);
  --dv-edge-drop-strip-size: 8px;
  --dv-tabs-container-scrollbar-color: #888;
  --dv-icon-hover-background-color: rgba(90, 93, 94, 0.31);
  --dv-floating-box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.4), 0 2px 8px rgba(0, 0, 0, 0.25);
  --dv-floating-border: 1px solid rgba(255, 255, 255, 0.1);
  --dv-overlay-z-index: 999;
  --dv-tab-font-size: inherit;
  --dv-border-radius: 0px;
  --dv-tab-margin: 0;
  --dv-sash-color: transparent;
  --dv-active-sash-color: transparent;
  --dv-active-sash-transition-duration: 0.1s;
  --dv-active-sash-transition-delay: 0.5s;
  --dv-spacing-padding: 0px;
  --dv-tab-border-radius: 0px;
  --dv-sash-border-radius: 0px;
  --dv-dropdown-border-radius: 0px;
  --dv-tab-close-icon-size: inherit;
  --dv-floating-group-border: none;
  --dv-drag-over-border: none;
  --dv-floating-group-dragging-opacity: 0.5;
  --dv-floating-titlebar-height: 22px;
  --dv-floating-titlebar-background-color: var(
      --dv-tabs-and-actions-container-background-color
  );
  --dv-floating-titlebar-border-bottom: var(--dv-floating-border);
  --dv-tab-group-color-grey: #5f6368;
  --dv-tab-group-color-blue: #1a73e8;
  --dv-tab-group-color-red: #d93025;
  --dv-tab-group-color-yellow: #f9ab00;
  --dv-tab-group-color-green: #188038;
  --dv-tab-group-color-pink: #d01884;
  --dv-tab-group-color-purple: #a142f4;
  --dv-tab-group-color-cyan: #007b83;
  --dv-tab-group-color-orange: #e8710a;
  --dv-tab-group-chip-padding: 4px 8px;
  --dv-tab-group-chip-border-radius: 6px;
  --dv-tab-group-chip-font-size: 11px;
  --dv-tab-group-line-height: 2px;
  --dv-tab-group-line-opacity: 0.6;
  --dv-spacing-padding: 10px;
  --dv-tab-font-size: 12px;
  --dv-border-radius: 12px;
  --dv-tab-margin-block: 0.5rem;
  --dv-tab-margin-inline: 0.25rem;
  --dv-tab-margin: var(--dv-tab-margin-block) var(--dv-tab-margin-inline);
  --dv-tabs-and-actions-container-height: 44px;
  --dv-tab-border-radius: 8px;
  --dv-sash-border-radius: 4px;
  --dv-dropdown-border-radius: 8px;
  --dv-tab-close-icon-size: 8px;
  --dv-floating-group-border: 2px solid var(--dv-group-view-background-color);
  --dv-floating-titlebar-background-color: var(
      --dv-group-view-background-color
  );
  --dv-floating-titlebar-border-bottom: none;
  box-sizing: border-box;
  padding: var(--dv-spacing-padding);
  background-color: var(--dv-group-view-background-color);
}
.dockview-theme-light-spaced .dv-dockview {
  padding: 0;
}
.dockview-theme-light-spaced .dv-resize-container:has(> .dv-groupview) {
  border-radius: 8px;
}
.dockview-theme-light-spaced .dv-sash {
  border-radius: var(--dv-sash-border-radius);
}
.dockview-theme-light-spaced .dv-drop-target-anchor {
  border-radius: calc(var(--dv-border-radius) / 4);
}
.dockview-theme-light-spaced .dv-drop-target-anchor.dv-drop-target-content {
  border-radius: var(--dv-border-radius);
}
.dockview-theme-light-spaced .dv-resize-container {
  border-radius: var(--dv-border-radius) !important;
  border: none;
}
.dockview-theme-light-spaced .dv-resize-container .dv-groupview {
  border: var(--dv-floating-group-border);
}
.dockview-theme-light-spaced .dv-resize-container > .dv-grid-view {
  box-sizing: border-box;
  padding: var(--dv-spacing-padding);
}
.dockview-theme-light-spaced .dv-resize-container-with-titlebar > .dv-grid-view {
  padding-top: 0;
}
.dockview-theme-light-spaced .dv-resize-container-with-titlebar > .dv-floating-titlebar {
  border-top-left-radius: var(--dv-border-radius);
  border-top-right-radius: var(--dv-border-radius);
}
.dockview-theme-light-spaced .dv-tabs-overflow-container,
.dockview-theme-light-spaced .dv-tabs-overflow-dropdown-default {
  border-radius: var(--dv-dropdown-border-radius);
  height: unset !important;
}
.dockview-theme-light-spaced .dv-render-overlay {
  border-bottom-left-radius: var(--dv-border-radius);
  border-bottom-right-radius: var(--dv-border-radius);
}
.dockview-theme-light-spaced .dv-tab {
  border-radius: var(--dv-tab-border-radius);
}
.dockview-theme-light-spaced .dv-tab .dv-svg {
  height: var(--dv-tab-close-icon-size);
  width: var(--dv-tab-close-icon-size);
}
.dockview-theme-light-spaced .dv-tabs-container--wrap:not(.dv-tabs-container-vertical) .dv-tab {
  height: calc(var(--dv-tabs-and-actions-container-height) - 2 * var(--dv-tab-margin-block));
}
.dockview-theme-light-spaced .dv-tabs-container-vertical .dv-tab {
  margin: var(--dv-tab-margin-inline) var(--dv-tab-margin-block);
}
.dockview-theme-light-spaced .dv-tabs-container--wrap.dv-tabs-container-vertical .dv-tab {
  width: calc(var(--dv-tabs-and-actions-container-height) - 2 * var(--dv-tab-margin-block));
}
.dockview-theme-light-spaced .dv-groupview {
  border-radius: var(--dv-border-radius);
}
.dockview-theme-light-spaced .dv-groupview .dv-tabs-and-actions-container {
  padding: 0px calc(var(--dv-border-radius) / 2);
  border-top-left-radius: var(--dv-border-radius);
  border-top-right-radius: var(--dv-border-radius);
}
.dockview-theme-light-spaced .dv-groupview .dv-tabs-and-actions-container.dv-groupview-header-vertical {
  padding: calc(var(--dv-border-radius) / 2) 0;
}
.dockview-theme-light-spaced .dv-groupview .dv-content-container {
  background-color: var(--dv-tabs-and-actions-container-background-color);
  border-bottom-left-radius: var(--dv-border-radius);
  border-bottom-right-radius: var(--dv-border-radius);
}
.dockview-theme-light-spaced .dv-groupview.dv-groupview-header-bottom > .dv-tabs-and-actions-container {
  border-radius: 0 0 var(--dv-border-radius) var(--dv-border-radius);
}
.dockview-theme-light-spaced .dv-groupview.dv-groupview-header-bottom > .dv-content-container {
  border-radius: var(--dv-border-radius) var(--dv-border-radius) 0 0;
}
.dockview-theme-light-spaced .dv-groupview.dv-groupview-header-left > .dv-tabs-and-actions-container {
  border-radius: var(--dv-border-radius) 0 0 var(--dv-border-radius);
}
.dockview-theme-light-spaced .dv-groupview.dv-groupview-header-left > .dv-content-container {
  border-radius: 0 var(--dv-border-radius) var(--dv-border-radius) 0;
}
.dockview-theme-light-spaced .dv-groupview.dv-groupview-header-right > .dv-tabs-and-actions-container {
  border-radius: 0 var(--dv-border-radius) var(--dv-border-radius) 0;
}
.dockview-theme-light-spaced .dv-groupview.dv-groupview-header-right > .dv-content-container {
  border-radius: var(--dv-border-radius) 0 0 var(--dv-border-radius);
}
.dockview-theme-light-spaced .dv-groupview.dv-edge-tool-window .dv-edge-peek-header {
  border-top-left-radius: var(--dv-border-radius);
  border-top-right-radius: var(--dv-border-radius);
}
.dockview-theme-light-spaced .dv-groupview.dv-edge-tool-window .dv-content-container {
  border-radius: 0;
}
.dockview-theme-light-spaced .dv-groupview.dv-edge-tool-window .dv-tabs-and-actions-container {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-left-radius: var(--dv-border-radius);
  border-bottom-right-radius: var(--dv-border-radius);
}
.dockview-theme-light-spaced .dv-edge-peek {
  border-bottom-left-radius: var(--dv-border-radius);
  border-bottom-right-radius: var(--dv-border-radius);
}
.dockview-theme-light-spaced .dv-edge-peek-clip {
  border-bottom-left-radius: var(--dv-border-radius);
  border-bottom-right-radius: var(--dv-border-radius);
}
.dockview-theme-light-spaced .dv-edge-peek-header {
  border-top-left-radius: var(--dv-border-radius);
  border-top-right-radius: var(--dv-border-radius);
}
.dockview-theme-light-spaced {
  color-scheme: light;
  --dv-drag-over-background-color: '';
  --dv-group-view-background-color: #f6f5f9;
  --dv-tabs-and-actions-container-background-color: white;
  --dv-activegroup-visiblepanel-tab-background-color: #ededf0;
  --dv-activegroup-hiddenpanel-tab-background-color: #f9f9fa;
  --dv-inactivegroup-visiblepanel-tab-background-color: #ededf0;
  --dv-inactivegroup-hiddenpanel-tab-background-color: #f9f9fa;
  --dv-tab-divider-color: transparent;
  --dv-activegroup-visiblepanel-tab-color: rgb(104, 107, 130);
  --dv-activegroup-hiddenpanel-tab-color: rgb(148, 151, 169);
  --dv-inactivegroup-visiblepanel-tab-color: rgb(104, 107, 130);
  --dv-inactivegroup-hiddenpanel-tab-color: rgb(148, 151, 169);
  --dv-separator-border: transparent;
  --dv-paneview-header-border-color: rgb(51, 51, 51);
  --dv-active-sash-color: rgb(91, 30, 207);
  --dv-floating-box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08);
  --dv-floating-border: 1px solid rgba(0, 0, 0, 0.1);
  --dv-scrollbar-background-color: rgba(0, 0, 0, 0.25);
  --dv-floating-group-border: 2px solid rgba(255, 255, 255, 0.1);
}

.dockview-spaced {
  --dv-spacing-padding: 10px;
  --dv-tab-font-size: 12px;
  --dv-border-radius: 12px;
  --dv-tab-margin-block: 0.5rem;
  --dv-tab-margin-inline: 0.25rem;
  --dv-tab-margin: var(--dv-tab-margin-block) var(--dv-tab-margin-inline);
  --dv-tabs-and-actions-container-height: 44px;
  --dv-tab-border-radius: 8px;
  --dv-sash-border-radius: 4px;
  --dv-dropdown-border-radius: 8px;
  --dv-tab-close-icon-size: 8px;
  --dv-floating-group-border: 2px solid var(--dv-group-view-background-color);
  --dv-floating-titlebar-background-color: var(
      --dv-group-view-background-color
  );
  --dv-floating-titlebar-border-bottom: none;
  box-sizing: border-box;
  padding: var(--dv-spacing-padding);
  background-color: var(--dv-group-view-background-color);
}
.dockview-spaced .dv-dockview {
  padding: 0;
}
.dockview-spaced .dv-resize-container:has(> .dv-groupview) {
  border-radius: 8px;
}
.dockview-spaced .dv-sash {
  border-radius: var(--dv-sash-border-radius);
}
.dockview-spaced .dv-drop-target-anchor {
  border-radius: calc(var(--dv-border-radius) / 4);
}
.dockview-spaced .dv-drop-target-anchor.dv-drop-target-content {
  border-radius: var(--dv-border-radius);
}
.dockview-spaced .dv-resize-container {
  border-radius: var(--dv-border-radius) !important;
  border: none;
}
.dockview-spaced .dv-resize-container .dv-groupview {
  border: var(--dv-floating-group-border);
}
.dockview-spaced .dv-resize-container > .dv-grid-view {
  box-sizing: border-box;
  padding: var(--dv-spacing-padding);
}
.dockview-spaced .dv-resize-container-with-titlebar > .dv-grid-view {
  padding-top: 0;
}
.dockview-spaced .dv-resize-container-with-titlebar > .dv-floating-titlebar {
  border-top-left-radius: var(--dv-border-radius);
  border-top-right-radius: var(--dv-border-radius);
}
.dockview-spaced .dv-tabs-overflow-container,
.dockview-spaced .dv-tabs-overflow-dropdown-default {
  border-radius: var(--dv-dropdown-border-radius);
  height: unset !important;
}
.dockview-spaced .dv-render-overlay {
  border-bottom-left-radius: var(--dv-border-radius);
  border-bottom-right-radius: var(--dv-border-radius);
}
.dockview-spaced .dv-tab {
  border-radius: var(--dv-tab-border-radius);
}
.dockview-spaced .dv-tab .dv-svg {
  height: var(--dv-tab-close-icon-size);
  width: var(--dv-tab-close-icon-size);
}
.dockview-spaced .dv-tabs-container--wrap:not(.dv-tabs-container-vertical) .dv-tab {
  height: calc(var(--dv-tabs-and-actions-container-height) - 2 * var(--dv-tab-margin-block));
}
.dockview-spaced .dv-tabs-container-vertical .dv-tab {
  margin: var(--dv-tab-margin-inline) var(--dv-tab-margin-block);
}
.dockview-spaced .dv-tabs-container--wrap.dv-tabs-container-vertical .dv-tab {
  width: calc(var(--dv-tabs-and-actions-container-height) - 2 * var(--dv-tab-margin-block));
}
.dockview-spaced .dv-groupview {
  border-radius: var(--dv-border-radius);
}
.dockview-spaced .dv-groupview .dv-tabs-and-actions-container {
  padding: 0px calc(var(--dv-border-radius) / 2);
  border-top-left-radius: var(--dv-border-radius);
  border-top-right-radius: var(--dv-border-radius);
}
.dockview-spaced .dv-groupview .dv-tabs-and-actions-container.dv-groupview-header-vertical {
  padding: calc(var(--dv-border-radius) / 2) 0;
}
.dockview-spaced .dv-groupview .dv-content-container {
  background-color: var(--dv-tabs-and-actions-container-background-color);
  border-bottom-left-radius: var(--dv-border-radius);
  border-bottom-right-radius: var(--dv-border-radius);
}
.dockview-spaced .dv-groupview.dv-groupview-header-bottom > .dv-tabs-and-actions-container {
  border-radius: 0 0 var(--dv-border-radius) var(--dv-border-radius);
}
.dockview-spaced .dv-groupview.dv-groupview-header-bottom > .dv-content-container {
  border-radius: var(--dv-border-radius) var(--dv-border-radius) 0 0;
}
.dockview-spaced .dv-groupview.dv-groupview-header-left > .dv-tabs-and-actions-container {
  border-radius: var(--dv-border-radius) 0 0 var(--dv-border-radius);
}
.dockview-spaced .dv-groupview.dv-groupview-header-left > .dv-content-container {
  border-radius: 0 var(--dv-border-radius) var(--dv-border-radius) 0;
}
.dockview-spaced .dv-groupview.dv-groupview-header-right > .dv-tabs-and-actions-container {
  border-radius: 0 var(--dv-border-radius) var(--dv-border-radius) 0;
}
.dockview-spaced .dv-groupview.dv-groupview-header-right > .dv-content-container {
  border-radius: var(--dv-border-radius) 0 0 var(--dv-border-radius);
}
.dockview-spaced .dv-groupview.dv-edge-tool-window .dv-edge-peek-header {
  border-top-left-radius: var(--dv-border-radius);
  border-top-right-radius: var(--dv-border-radius);
}
.dockview-spaced .dv-groupview.dv-edge-tool-window .dv-content-container {
  border-radius: 0;
}
.dockview-spaced .dv-groupview.dv-edge-tool-window .dv-tabs-and-actions-container {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-left-radius: var(--dv-border-radius);
  border-bottom-right-radius: var(--dv-border-radius);
}
.dockview-spaced .dv-edge-peek {
  border-bottom-left-radius: var(--dv-border-radius);
  border-bottom-right-radius: var(--dv-border-radius);
}
.dockview-spaced .dv-edge-peek-clip {
  border-bottom-left-radius: var(--dv-border-radius);
  border-bottom-right-radius: var(--dv-border-radius);
}
.dockview-spaced .dv-edge-peek-header {
  border-top-left-radius: var(--dv-border-radius);
  border-top-right-radius: var(--dv-border-radius);
}

.dv-context-menu {
  min-width: 160px;
  overflow: hidden;
  background: var(--dv-context-menu-background-color, var(--dv-activegroup-hiddenpanel-tab-background-color));
  color: var(--dv-context-menu-color, var(--dv-activegroup-hiddenpanel-tab-color));
  border: 1px solid var(--dv-tab-divider-color);
  border-radius: var(--dv-border-radius);
  box-shadow: var(--dv-floating-box-shadow);
  padding: 4px 0;
}

.dv-context-menu-item {
  height: 25px;
  padding: 0 12px;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: var(--dv-tabs-and-actions-container-font-size);
  white-space: nowrap;
  user-select: none;
}
.dv-context-menu-item:hover {
  background: var(--dv-icon-hover-background-color);
}
.dv-context-menu-item.dv-context-menu-item--disabled {
  opacity: 0.4;
  cursor: default;
  pointer-events: none;
}

.dv-context-menu-separator {
  height: 1px;
  background: var(--dv-tab-divider-color);
  margin: 4px 0;
}

.dv-context-menu-rename {
  padding: 8px 12px 4px;
}

.dv-context-menu-rename-input {
  width: 100%;
  box-sizing: border-box;
  padding: 8px 10px;
  border: 1px solid var(--dv-tab-divider-color);
  border-radius: var(--dv-border-radius);
  background: inherit;
  color: var(--dv-activegroup-visiblepanel-tab-color);
  font-size: var(--dv-tabs-and-actions-container-font-size);
  outline: none;
}
.dv-context-menu-rename-input:focus {
  border-color: var(--dv-activegroup-visiblepanel-tab-color);
}
.dv-context-menu-rename-input::placeholder {
  color: var(--dv-activegroup-hiddenpanel-tab-color);
}

.dv-context-menu-color-picker {
  display: flex;
  flex-direction: row;
  gap: 6px;
  padding: 8px 12px;
  align-items: center;
}

.dv-context-menu-color-swatch {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid transparent;
  flex-shrink: 0;
  background-color: var(--dv-tab-group-color);
}
.dv-context-menu-color-swatch:hover {
  opacity: 0.85;
}
.dv-context-menu-color-swatch.dv-context-menu-color-swatch--selected {
  outline: 2px solid var(--dv-tab-divider-color);
  outline-offset: 2px;
}

.dv-tab-group-indicator-none .dv-groupview-header-bottom .dv-tab-group-underline {
  top: auto;
  bottom: 0;
}

.dv-groupview.dv-groupview-header-bottom.dv-active-group > .dv-tabs-and-actions-container .dv-tabs-container > .dv-tab.dv-active-tab::after, .dv-groupview.dv-groupview-header-bottom.dv-inactive-group > .dv-tabs-and-actions-container .dv-tabs-container > .dv-tab.dv-active-tab::after {
  top: 0px;
  bottom: auto;
}`;var ti="quick-launch",Ju={"panel.label":"快速启动","page.title":"快速启动","page.add":"新增快捷方式","page.loading":"正在读取快捷方式…","empty.title":"还没有快捷方式","empty.hint":"添加快捷方式后，可以一键打开文件夹、启动程序，或在右侧终端区分栏运行命令。","card.run":"执行「{name}」","card.edit":"编辑","card.delete":"删除","card.editNamed":"编辑「{name}」","card.deleteNamed":"删除「{name}」","type.open":"打开路径","type.command":"运行命令","store.corrupt":"快捷方式数据文件已损坏，暂时不能保存。请修复或删除数据文件后重新打开页面。","error.load":"读取快捷方式失败","error.save":"保存失败","error.retry":"重试","error.network":"无法连接主机，请确认 DSH 正在运行后重试。","error.auth":"登录状态已失效，请刷新页面重新登录。","error.unknown":"操作没有完成，请稍后重试。","form.createTitle":"新增快捷方式","form.editTitle":"编辑快捷方式","form.type":"类型","form.name":"名称","form.namePlaceholder":"例如：项目目录","form.path":"路径","form.pathPlaceholder":"例如：D:\\MyCode\\project 或 C:\\Program Files\\App\\App.exe","form.pickDirectory":"选择文件夹","form.pickFile":"选择程序","form.picking":"选择中…","form.pickFileTitle":"选择要打开的程序或文件","form.pathHint":"文件夹、程序（exe）或其它文件都可以，点「选择程序」可以浏览 exe。","form.command":"命令","form.commandPlaceholder":"例如：npm run dev","form.cwd":"工作目录","form.cwdPlaceholder":"留空则在用户主目录运行","form.autoClose":"正常结束后自动关闭终端","form.note":"备注","form.notePlaceholder":"可选","form.save":"保存","form.saving":"保存中…","form.cancel":"取消","form.invalidName":"请填写名称。","form.invalidPath":"请填写路径。","form.invalidCommand":"请填写命令。","form.nameTooLong":"名称太长。","form.pathAbsolute":"路径必须是完整路径。","form.pathMissing":"这个路径不存在。","form.commandTooLong":"命令太长。","form.cwdAbsolute":"工作目录必须是完整路径。","form.cwdMissing":"工作目录不存在。","error.pathMissing":"路径不存在。","error.cwdMissing":"工作目录不存在。","error.openFailed":"系统没能打开这个路径。","error.shellUnavailable":"找不到可用的 PowerShell。","error.pickBusy":"已经有一个选择窗口打开了，请先完成它。","error.pickFailed":"没能打开选择窗口，请直接填写完整路径。","error.terminalGone":"终端已经关闭。","error.terminalLimitShort":"同时打开的终端数量已达上限。","confirm.title":"删除快捷方式","confirm.body":"确定删除「{name}」吗？删除后无法恢复。","confirm.confirm":"删除","confirm.cancel":"取消","confirm.deleting":"删除中…","workspace.emptyTitle":"还没有终端","workspace.emptyHint":"点下面的「新建终端」，或点击左侧的命令快捷方式运行命令。","workspace.new":"新建终端","workspace.groupLimit":"最多同时显示 {count} 个终端分组。","dock.close":"关闭终端","dock.closeNamed":"关闭终端「{title}」","dock.running":"运行中","dock.exited":"已退出","dock.exitCode":"已退出，代码 {code}","dock.blank":"空白终端","toast.opened":"已打开「{name}」","toast.openFailed":"打开「{name}」失败：{message}","toast.terminalLimit":"最多同时打开 {count} 个终端，请先关闭不用的终端。","toast.createFailed":"启动终端失败：{message}","toast.closeFailed":"关闭终端失败：{message}","toast.deleteFailed":"删除失败：{message}"},Zu={"panel.label":"Quick launch","page.title":"Quick launch","page.add":"New shortcut","page.loading":"Loading shortcuts…","empty.title":"No shortcuts yet","empty.hint":"Add a shortcut to open a folder, start an app, or run a command in the split terminal area on the right.","card.run":"Run “{name}”","card.edit":"Edit","card.delete":"Delete","card.editNamed":"Edit “{name}”","card.deleteNamed":"Delete “{name}”","type.open":"Open path","type.command":"Run command","store.corrupt":"The shortcut data file is damaged, so saving is disabled. Repair or delete the data file, then reload the page.","error.load":"Could not load shortcuts","error.save":"Could not save","error.retry":"Retry","error.network":"Cannot reach the host. Make sure DSH is running, then try again.","error.auth":"Your sign-in has expired. Reload the page and sign in again.","error.unknown":"The operation did not complete. Try again later.","form.createTitle":"New shortcut","form.editTitle":"Edit shortcut","form.type":"Type","form.name":"Name","form.namePlaceholder":"For example: project folder","form.path":"Path","form.pathPlaceholder":"For example: D:\\MyCode\\project or C:\\Program Files\\App\\App.exe","form.pickDirectory":"Choose folder","form.pickFile":"Choose app","form.picking":"Choosing…","form.pickFileTitle":"Select a program or file","form.pathHint":"A folder, a program (exe), or any other file works. Use “Choose app” to browse for an exe.","form.command":"Command","form.commandPlaceholder":"For example: npm run dev","form.cwd":"Working directory","form.cwdPlaceholder":"Leave empty to run in the home directory","form.autoClose":"Close the terminal after it exits successfully","form.note":"Note","form.notePlaceholder":"Optional","form.save":"Save","form.saving":"Saving…","form.cancel":"Cancel","form.invalidName":"Enter a name.","form.invalidPath":"Enter a path.","form.invalidCommand":"Enter a command.","form.nameTooLong":"The name is too long.","form.pathAbsolute":"Enter a full path.","form.pathMissing":"This path does not exist.","form.commandTooLong":"The command is too long.","form.cwdAbsolute":"Enter a full path for the working directory.","form.cwdMissing":"The working directory does not exist.","error.pathMissing":"The path does not exist.","error.cwdMissing":"The working directory does not exist.","error.openFailed":"The system could not open this path.","error.shellUnavailable":"No usable PowerShell was found.","error.pickBusy":"A chooser window is already open. Finish it first.","error.pickFailed":"Could not open the chooser. Type the full path instead.","error.terminalGone":"The terminal is already closed.","error.terminalLimitShort":"The terminal limit is reached.","confirm.title":"Delete shortcut","confirm.body":"Delete “{name}”? This cannot be undone.","confirm.confirm":"Delete","confirm.cancel":"Cancel","confirm.deleting":"Deleting…","workspace.emptyTitle":"No terminals yet","workspace.emptyHint":"Use the button below, or click a command shortcut on the left.","workspace.new":"New terminal","workspace.groupLimit":"At most {count} terminal groups can be shown at a time.","dock.close":"Close terminal","dock.closeNamed":"Close terminal “{title}”","dock.running":"Running","dock.exited":"Exited","dock.exitCode":"Exited with code {code}","dock.blank":"Blank terminal","toast.opened":"Opened “{name}”","toast.openFailed":"Could not open “{name}”: {message}","toast.terminalLimit":"At most {count} terminals at a time. Close one you no longer use.","toast.createFailed":"Could not start the terminal: {message}","toast.closeFailed":"Could not close the terminal: {message}","toast.deleteFailed":"Could not delete: {message}"},Ro={zh:Ju,en:Zu};function Pa(e){let t=e.createElement;function i({size:d=16,strokeWidth:h=1.6,children:c,...u}){return t("svg",{viewBox:"0 0 24 24",width:d,height:d,fill:"none",stroke:"currentColor",strokeWidth:h,strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",focusable:"false",...u},c)}function r(d){return t(i,d,t("path",{d:"M13 2 5 13h6l-1 9 8-11h-6l1-9Z"}))}function o(d){return t(i,d,t("path",{d:"M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z"}))}function s(d){return t(i,d,t("rect",{x:3,y:4,width:18,height:16,rx:2}),t("path",{d:"M3 8h18M7 6h.01M10 6h.01"}))}function n(d){return t(i,d,t("rect",{x:3,y:5,width:18,height:14,rx:2}),t("path",{d:"M7 9l3 3-3 3M13 15h4"}))}function a(d){return t(i,d,t("path",{d:"M4 20h4L19 9a2.1 2.1 0 0 0-4-4L4 16v4Z"}),t("path",{d:"M14 6l4 4"}))}function l(d){return t(i,d,t("path",{d:"M4 7h16M9 7V5h6v2M6 7l1 13h10l1-13M10 11v6M14 11v6"}))}return{Lightning:r,Folder:o,AppWindow:s,TerminalIcon:n,Pencil:a,Trash:l}}var wt="quick-launch/api",Qu="quick-launch/stream",qe=class extends Error{constructor(t,i,r){super(i||t),this.name="ApiError",this.code=t,this.fieldErrors=Array.isArray(r)?r:[]}};function Ta(e){return new URL(e,document.baseURI)}async function St(e,t,i){let r;try{r=await fetch(Ta(t),{method:e,credentials:"same-origin",cache:"no-store",headers:i===void 0?void 0:{"content-type":"application/json"},body:i===void 0?void 0:JSON.stringify(i)})}catch{throw new qe("network","")}let o;try{o=await r.json()}catch{o=void 0}if(o!=null&&o.ok===!0)return o.value;if(o!=null&&o.ok===!1&&o.error){let s=o.error;throw new qe(s.code||"request-failed",s.message||"",s.fieldErrors)}throw new qe(r.ok?"bad-response":`http-${r.status}`,`HTTP ${r.status}`)}function za(){return St("GET",`${wt}/list`)}function No(e){return St("PUT",`${wt}/list`,{version:1,shortcuts:e})}function Aa(e){return St("POST",`${wt}/open`,{path:e})}async function Ia(e){let t=await St("POST",`${wt}/pick-file`,{title:e});return t&&typeof t.path=="string"&&t.path!==""?t.path:null}function Ga(){return St("GET",`${wt}/terminals`)}function Ma(e){return St("POST",`${wt}/terminals`,e)}function Oa(e,t){return St("POST",`${wt}/terminals/input`,{id:e,data:t})}function La(e,t,i){return St("POST",`${wt}/terminals/resize`,{id:e,cols:t,rows:i})}function Ra(e){return St("POST",`${wt}/terminals/close`,{id:e})}function Na(){return Ta(Qu).href}var Ut=12,tp='"Maple Mono NF CN", "Cascadia Code", Consolas, monospace',ip=13,rp=120,op=400,sp=3;function Ba(e){if(!(typeof e!="string"||e===""))try{let t=atob(e),i=new Uint8Array(t.length);for(let r=0;r<t.length;r+=1)i[r]=t.charCodeAt(r);return i}catch{return}}function np(e){return new Promise(t=>{setTimeout(t,e)})}function Wa({Terminal:e,FitAddon:t}){let i=new Map,r=new Set,o,s=null,n=0,a=!1,l={terminals:[]};function d(){if(!a){l={terminals:[...i.values()].map(b=>({id:b.id,title:b.title,status:b.status,exitCode:b.exitCode}))};for(let b of r)b()}}function h(b){let z=getComputedStyle(document.body),K=getComputedStyle(b),Y=oe=>z.getPropertyValue(oe).trim(),q=(oe,pe)=>{let xe=oe.trim();return xe===""||xe.startsWith("var(")?pe:xe},se=q(Y("--dsw-alias-bg-base"),K.backgroundColor||"#000000"),X=q(Y("--dsw-alias-label-primary"),K.color||"#ffffff"),Z=q(Y("--dsw-alias-interactive-bg-active"),"rgba(128, 128, 128, 0.35)");return{background:se,foreground:X,cursor:X,cursorAccent:se,selectionBackground:Z}}function c(b){!b.term||!b.pane.isConnected||(b.term.options.theme=h(b.pane))}async function u(b){let z=b.term?b.term.getSelection():"";if(z)try{await navigator.clipboard.writeText(z)}catch{}}async function p(b){if(b.term)try{let z=await navigator.clipboard.readText();z&&b.term.paste(z)}catch{}}function v(b,z){if(z.type!=="keydown")return!1;let K=z.ctrlKey||z.metaKey,Y=K&&z.shiftKey&&z.code==="KeyC"||K&&z.code==="Insert",q=K&&z.shiftKey&&z.code==="KeyV"||z.shiftKey&&z.code==="Insert";return!Y&&!q?!1:(z.preventDefault(),z.stopPropagation(),Y?u(b):p(b),!0)}function g(b,z){b.status==="running"&&(b.inputChain=b.inputChain.then(async()=>{try{await Oa(b.id,z)}catch{}}))}function m(b){b.resizeTimer||(b.resizeTimer=setTimeout(()=>{b.resizeTimer=0,!(a||b.removed||b.status!=="running")&&(!b.cols||!b.rows||La(b.id,b.cols,b.rows).catch(()=>{}))},rp))}function f(b,z,K){if(b.term){K&&b.term.reset(),b.term.write(z);return}K&&(b.pending=[]),b.pending.push(z)}function S(b){if(b.term||b.removed||a||!b.pane.isConnected||b.pane.clientWidth===0||b.pane.clientHeight===0)return;let z=new e({fontFamily:tp,fontSize:ip,cursorBlink:!0,minimumContrastRatio:4.5,scrollback:2e3}),K=new t;if(z.loadAddon(K),z.open(b.pane),z.textarea?.setAttribute("aria-label",b.title),b.term=z,b.fitAddon=K,b.dataSub=z.onData(Y=>g(b,Y)),b.resizeSub=z.onResize(({cols:Y,rows:q})=>{b.cols=Y,b.rows=q,m(b)}),b.keyHandler=Y=>v(b,Y),b.pane.addEventListener("keydown",b.keyHandler,!0),c(b),b.pending.length>0){let Y=b.pending;b.pending=[];for(let q of Y)z.write(q)}}function w(b){if(!(!b.fitAddon||!b.pane.isConnected))try{b.fitAddon.fit()}catch{}}function D(b){let z=i.get(b);!z||a||(S(z),w(z))}function T(b){let z=i.get(b);!z||a||(S(z),z.term?.focus())}function R(b){let z=i.get(b);z&&w(z)}function x(b){let z=i.get(b);z&&(z.removed=!0,z.resizeTimer&&(clearTimeout(z.resizeTimer),z.resizeTimer=0),z.paneObserver?.disconnect(),z.keyHandler&&z.pane.removeEventListener("keydown",z.keyHandler,!0),z.dataSub?.dispose(),z.resizeSub?.dispose(),z.term?.dispose(),z.term=void 0,z.pending=[],z.pane.remove(),i.delete(b),d())}function C(b){if(a)return;let z=i.get(b.id);if(z)return b.status==="exited"&&z.status!=="exited"&&(z.status="exited",z.exitCode=typeof b.exitCode=="number"?b.exitCode:null,d()),z;let K=document.createElement("div");K.className="ql-term-pane",K.dataset.terminalId=b.id;let Y={id:b.id,title:typeof b.title=="string"&&b.title?b.title:b.id,status:b.status==="exited"?"exited":"running",exitCode:typeof b.exitCode=="number"?b.exitCode:null,createdAt:typeof b.createdAt=="number"?b.createdAt:Date.now(),pane:K,paneObserver:void 0,term:void 0,fitAddon:void 0,dataSub:void 0,resizeSub:void 0,keyHandler:void 0,inputChain:Promise.resolve(),resizeTimer:0,cols:0,rows:0,pending:[],removed:!1};return typeof ResizeObserver<"u"&&(Y.paneObserver=new ResizeObserver(()=>{a||Y.removed||(S(Y),w(Y))}),Y.paneObserver.observe(K)),i.set(Y.id,Y),d(),Y}async function L(){let b=await Ga(),z=Array.isArray(b?.terminals)?b.terminals:[];if(a)return z;let K=new Set(z.map(q=>q.id));for(let q of[...i.keys()])K.has(q)||x(q);let Y=[...z].sort((q,se)=>(q.createdAt??0)-(se.createdAt??0));for(let q of Y)C(q);return d(),Y}async function M(b){if(i.size>=Ut)throw new qe("terminal-limit","");let z=await Ma({cols:80,rows:24,...b});return a||C(z),z}async function O(b){try{await Ra(b)}catch(z){if(!(z instanceof qe)||z.code!=="terminal-not-found")throw z}x(b)}function W(b){if(b===null||typeof b!="object")return;let z=b.type,K=typeof b.id=="string"?b.id:"";if(z==="init"){let q=Array.isArray(b.terminals)?b.terminals:[],se=new Set(q.map(X=>X.id));for(let X of[...i.keys()])se.has(X)||x(X);for(let X of q)C(X);d();return}if(z==="created"){b.terminal!==null&&typeof b.terminal=="object"&&C(b.terminal);return}let Y=i.get(K);if(Y){if(z==="snapshot"){let q=Ba(b.data);q&&f(Y,q,!0);return}if(z==="output"){let q=Ba(b.data);q&&f(Y,q,!1);return}if(z==="status"){Y.status=b.status==="exited"?"exited":"running",Y.exitCode=typeof b.exitCode=="number"?b.exitCode:null,d();return}z==="closed"&&x(K)}}async function _(b){let z=await fetch(Na(),{signal:b.signal,credentials:"same-origin",cache:"no-store"});if(!z.ok||!z.body)throw new Error(`HTTP ${z.status}`);let K=z.body.getReader(),Y=new TextDecoder,q="";for(;;){let se=await K.read();if(se.done)break;q+=Y.decode(se.value,{stream:!0});let X=q.indexOf(`
`);for(;X!==-1;){let Z=q.slice(0,X).trim();if(q=q.slice(X+1),Z)try{W(JSON.parse(Z))}catch{}X=q.indexOf(`
`)}}if(q.trim())try{W(JSON.parse(q.trim()))}catch{}}async function y(){if(a||s)return;n+=1;let b=new AbortController;s=b;try{await _(b)}catch{}s===b&&(s=null),!(a||b.signal.aborted)&&n<sp&&(await np(op),a||await y())}function P(){a||s||(n=0,y())}function k(b){let z=i.get(b);return z?z.pane:document.createElement("div")}function G(b){return l.terminals.find(z=>z.id===b)}function I(b){return r.add(b),()=>{r.delete(b)}}function H(){return l}function U(){return i.size}typeof MutationObserver<"u"&&(o=new MutationObserver(()=>{for(let b of i.values())c(b)}),o.observe(document.body,{attributes:!0,attributeFilter:["class","style","data-ds-dark-theme"]}));function re(){if(!a){a=!0,o?.disconnect(),o=void 0,s?.abort(),s=null;for(let b of i.values())b.removed=!0,b.resizeTimer&&clearTimeout(b.resizeTimer),b.paneObserver?.disconnect(),b.keyHandler&&b.pane.removeEventListener("keydown",b.keyHandler,!0),b.dataSub?.dispose(),b.resizeSub?.dispose(),b.term?.dispose(),b.term=void 0,b.pane.remove();i.clear(),r.clear(),l={terminals:[]}}}return{add:C,close:O,count:U,create:M,dispose:re,fit:R,focus:T,getSnapshot:H,getTerminal:G,load:L,mount:D,openStream:P,paneFor:k,subscribe:I}}var Ha=`
.ql-page {
  --ql-inset: 16px;
  --ql-side-width: 280px;
  position: relative;
  display: flex;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  min-height: 0;
  color: var(--dsw-alias-label-primary);
  background: var(--dsw-alias-bg-base);
  font-size: 14px;
  line-height: 1.6;
  overflow: hidden;
  container-type: inline-size;
}

.ql-page :focus-visible {
  outline: 2px solid var(--dsw-focus-ring-color, var(--dsw-alias-state-business-primary));
  outline-offset: 2px;
}

.ql-side {
  display: flex;
  flex: none;
  flex-direction: column;
  box-sizing: border-box;
  width: var(--ql-side-width);
  min-height: 0;
  border-right: .5px solid var(--dsw-alias-border-l3);
  background: var(--dsw-alias-bg-base);
}

@container (width <= 760px) {
  .ql-page {
    --ql-side-width: 220px;
  }
}

.ql-side-head {
  display: flex;
  flex: none;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 18px 14px 10px;
}

.ql-title {
  margin: 0;
  overflow: hidden;
  font-size: 18px;
  font-weight: 500;
  line-height: 26px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ql-side-head .ql-button {
  flex: none;
}

.ql-side-body {
  flex: 1;
  min-height: 0;
  padding: 0 10px 16px;
  overflow: auto;
  scrollbar-gutter: stable;
}

.ql-workspace {
  position: relative;
  flex: 1;
  min-width: 0;
  min-height: 0;
  background: var(--dsw-alias-bg-base);
}

.ql-workspace-host {
  position: absolute;
  inset: 0;
  box-sizing: border-box;
}

.ql-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.ql-card {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  box-sizing: border-box;
  min-width: 0;
  padding: 8px;
  border-radius: var(--dsw-radius-md);
  transition: background-color .12s;
}

@media (hover: hover) {
  .ql-card:hover {
    background: var(--dsw-alias-interactive-bg-hover);
  }
}

.ql-card-open {
  position: absolute;
  inset: 0;
  z-index: 1;
  padding: 0;
  border: 0;
  border-radius: inherit;
  background: none;
  cursor: pointer;
}

.ql-card-open:focus-visible {
  outline-offset: -2px;
}

.ql-card-icon {
  display: inline-flex;
  flex: none;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: var(--dsw-radius-sm);
  color: var(--dsw-alias-label-secondary);
  pointer-events: none;
}

.ql-card-main {
  position: relative;
  z-index: 2;
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 1px;
  min-width: 0;
  pointer-events: none;
}

.ql-card-name {
  overflow: hidden;
  color: var(--dsw-alias-label-primary);
  font-size: 13px;
  font-weight: 500;
  line-height: 19px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ql-card-target {
  overflow: hidden;
  color: var(--dsw-alias-label-tertiary);
  font-size: 11.5px;
  line-height: 17px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ql-card-actions {
  position: relative;
  z-index: 3;
  display: flex;
  flex: none;
  align-items: center;
  gap: 2px;
  opacity: 0;
  pointer-events: none;
  transition: opacity .12s;
}

@media (hover: hover) {
  .ql-card:hover .ql-card-actions,
  .ql-card:focus-within .ql-card-actions {
    opacity: 1;
    pointer-events: auto;
  }
}

@media (hover: none) {
  .ql-card-actions {
    opacity: 1;
    pointer-events: auto;
  }
}

.ql-icon-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  padding: 0;
  border: 0;
  border-radius: var(--dsw-radius-sm);
  background: none;
  color: var(--dsw-alias-label-tertiary);
  cursor: pointer;
}

.ql-icon-button:hover:not(:disabled) {
  background: var(--dsw-alias-interactive-bg-active);
  color: var(--dsw-alias-label-primary);
}

.ql-icon-button-danger:hover:not(:disabled) {
  background: var(--dsw-alias-interactive-bg-hover-danger);
  color: var(--dsw-alias-state-error-primary);
}

.ql-icon-button:disabled {
  opacity: .4;
  cursor: default;
}

.ql-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  box-sizing: border-box;
  height: 30px;
  padding: 0 12px;
  border: .5px solid var(--dsw-alias-border-l3);
  border-radius: var(--dsw-radius-md);
  background: none;
  color: var(--dsw-alias-label-primary);
  font: inherit;
  font-size: 13px;
  line-height: 20px;
  white-space: nowrap;
  cursor: pointer;
}

.ql-button:hover:not(:disabled) {
  background: var(--dsw-alias-interactive-bg-hover);
}

.ql-button:disabled {
  opacity: .5;
  cursor: default;
}

.ql-button-primary {
  border-color: transparent;
  background: var(--dsw-alias-button-primary-fill);
  color: var(--dsw-alias-label-primary-foreground);
}

.ql-button-primary:hover:not(:disabled) {
  background: var(--dsw-alias-button-primary-hover);
}

.ql-button-danger {
  border-color: transparent;
  background: var(--dsw-alias-state-error-primary);
  color: var(--dsw-alias-label-primary-foreground);
}

.ql-button-small {
  height: 26px;
  padding: 0 9px;
  font-size: 12px;
}

.ql-error {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  box-sizing: border-box;
  margin: 0 0 10px;
  padding: 8px 10px;
  border-radius: var(--dsw-radius-md);
  background: var(--dsw-alias-interactive-bg-hover-danger, var(--dsw-alias-interactive-bg-hover));
  color: var(--dsw-alias-state-error-primary);
  font-size: 12px;
  line-height: 18px;
  overflow-wrap: anywhere;
}

.ql-error-text {
  flex: 1;
  min-width: 0;
  padding-top: 2px;
}

.ql-error .ql-button {
  flex: none;
  margin-left: auto;
}

.ql-loading {
  padding: 32px 0;
  color: var(--dsw-alias-label-tertiary);
  font-size: 12.5px;
  text-align: center;
}

.ql-empty {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  padding: 20px 8px;
  color: var(--dsw-alias-label-tertiary);
}

.ql-empty-icon {
  color: var(--dsw-alias-label-caption);
}

.ql-empty-title {
  margin: 0;
  color: var(--dsw-alias-label-secondary);
  font-size: 13px;
  font-weight: 500;
  line-height: 20px;
}

.ql-empty-hint {
  margin: 0;
  font-size: 12px;
  line-height: 18px;
}

.ql-empty-action {
  margin-top: 4px;
}

.ql-toast {
  position: absolute;
  top: 14px;
  right: var(--ql-inset);
  z-index: 1400;
  display: flex;
  align-items: flex-start;
  gap: 8px;
  box-sizing: border-box;
  max-width: min(420px, calc(100% - 2 * var(--ql-inset)));
  padding: 8px 12px;
  border-radius: var(--dsw-radius-md);
  background: var(--dsw-alias-toast-bg);
  color: var(--dsw-alias-toast-label);
  box-shadow: var(--dsw-elevation-prominent);
  font-size: 13px;
  line-height: 20px;
  overflow-wrap: anywhere;
  animation: ql-toast-in .14s ease-out;
}

.ql-toast-dot {
  flex: none;
  width: 6px;
  height: 6px;
  margin-top: 6px;
  border-radius: 50%;
  background: var(--dsw-alias-state-success-primary);
}

.ql-toast[data-tone="error"] .ql-toast-dot {
  background: var(--dsw-alias-state-error-primary);
}

@keyframes ql-toast-in {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

.ql-overlay {
  position: fixed;
  inset: 0;
  z-index: 1600;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 24px;
  background: var(--dsw-alias-bg-mask-1);
}

.ql-modal {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: min(520px, 100%);
  max-height: calc(100dvh - 48px);
  overflow: hidden;
  border: .5px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-xl);
  background: var(--dsw-alias-bg-layer-1);
  color: var(--dsw-alias-label-primary);
  box-shadow: var(--dsw-elevation-prominent);
}

.ql-modal-small {
  width: min(420px, 100%);
}

.ql-modal-head {
  flex: none;
  padding: 18px 20px 6px;
}

.ql-modal-title {
  margin: 0;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
}

.ql-modal-body {
  display: flex;
  flex-direction: column;
  gap: 14px;
  min-height: 0;
  padding: 8px 20px 4px;
  overflow-y: auto;
}

.ql-modal-foot {
  display: flex;
  flex: none;
  justify-content: flex-end;
  gap: 8px;
  padding: 18px 20px 20px;
}

.ql-dialog-text {
  margin: 0;
  color: var(--dsw-alias-label-secondary);
  font-size: 13px;
  line-height: 20px;
  overflow-wrap: anywhere;
}

.ql-fieldset {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 0;
  padding: 0;
  border: 0;
}

.ql-label,
.ql-legend {
  padding: 0;
  color: var(--dsw-alias-label-secondary);
  font-size: 13px;
  line-height: 20px;
}

.ql-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.ql-field-hint {
  color: var(--dsw-alias-label-tertiary);
  font-size: 12px;
  line-height: 18px;
}

.ql-field-row {
  display: flex;
  align-items: stretch;
  gap: 8px;
}

.ql-field-row .ql-input {
  flex: 1 1 auto;
  min-width: 0;
}

/* 字段行的按钮由 align-items: stretch 撑到与输入框同高。 */
.ql-field-row .ql-button {
  height: auto;
}

.ql-input,
.ql-textarea {
  box-sizing: border-box;
  width: 100%;
  border: .5px solid var(--dsw-alias-border-l4);
  border-radius: var(--dsw-radius-md);
  background: var(--dsw-alias-bg-layer-3);
  color: var(--dsw-alias-label-primary);
  font: inherit;
  font-size: 13px;
  outline: none;
  transition: border-color .15s, box-shadow .15s;
}

.ql-input {
  height: 36px;
  padding: 0 12px;
}

.ql-textarea {
  min-height: 84px;
  padding: 8px 12px;
  line-height: 20px;
  resize: vertical;
}

.ql-input::placeholder,
.ql-textarea::placeholder {
  color: var(--dsw-alias-label-caption);
}

/* 输入框的焦点态只用边框表示，不再叠加页面级焦点轮廓。 */
.ql-input:focus-visible,
.ql-textarea:focus-visible {
  outline: none;
}

.ql-input:focus,
.ql-textarea:focus {
  border-color: var(--dsw-alias-state-business-primary);
  box-shadow: inset 0 0 0 .5px var(--dsw-alias-state-business-primary);
}

.ql-input[aria-invalid="true"],
.ql-textarea[aria-invalid="true"] {
  border-color: var(--dsw-alias-state-error-primary);
  box-shadow: none;
}

.ql-input:disabled,
.ql-textarea:disabled {
  opacity: .55;
}

.ql-field-error {
  margin: 0;
  color: var(--dsw-alias-state-error-primary);
  font-size: 12px;
  line-height: 18px;
}

.ql-radio-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 20px;
}

.ql-radio,
.ql-check {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  color: var(--dsw-alias-label-primary);
  font-size: 13px;
  line-height: 20px;
  cursor: pointer;
}

.ql-radio input,
.ql-check input {
  width: 15px;
  height: 15px;
  margin: 0;
  accent-color: var(--dsw-alias-brand-primary);
  flex: none;
}

/* dockview 主题：所有可见颜色映射到 DSH 主题变量，明暗自动跟随。 */
.ql-term-theme {
  --dv-background-color: var(--dsw-alias-bg-base);
  --dv-group-view-background-color: var(--dsw-alias-bg-base);
  --dv-tabs-and-actions-container-background-color: var(--dsw-alias-bg-layer-1);
  --dv-activegroup-visiblepanel-tab-background-color: var(--dsw-alias-bg-base);
  --dv-activegroup-hiddenpanel-tab-background-color: var(--dsw-alias-bg-layer-1);
  --dv-inactivegroup-visiblepanel-tab-background-color: var(--dsw-alias-bg-layer-1);
  --dv-inactivegroup-hiddenpanel-tab-background-color: var(--dsw-alias-bg-layer-1);
  --dv-activegroup-visiblepanel-tab-color: var(--dsw-alias-label-primary);
  --dv-activegroup-hiddenpanel-tab-color: var(--dsw-alias-label-secondary);
  --dv-inactivegroup-visiblepanel-tab-color: var(--dsw-alias-label-secondary);
  --dv-inactivegroup-hiddenpanel-tab-color: var(--dsw-alias-label-tertiary);
  --dv-tab-divider-color: var(--dsw-alias-border-l1);
  --dv-separator-border: var(--dsw-alias-border-l3);
  --dv-paneview-header-border-color: var(--dsw-alias-border-l2);
  --dv-paneview-active-outline-color: var(--dsw-alias-state-business-primary);
  --dv-drag-over-background-color: var(--dsw-alias-interactive-bg-active);
  --dv-drag-over-border-color: var(--dsw-alias-state-business-primary);
  --dv-edge-dock-indicator-color: var(--dsw-alias-state-business-primary);
  --dv-tabs-container-scrollbar-color: var(--dsw-alias-border-l3);
  --dv-icon-hover-background-color: var(--dsw-alias-interactive-bg-hover);
  --dv-active-sash-color: var(--dsw-alias-state-business-primary);
  --dv-sash-color: transparent;
  --dv-tabs-and-actions-container-font-size: 12px;
  --dv-tabs-and-actions-container-height: 31px;
  --dv-edge-drop-strip-size: 10px;
  --dv-tab-font-size: inherit;
  --dv-tab-margin: 0;
  --dv-tab-border-radius: 0;
  --dv-border-radius: 0;
  --dv-sash-border-radius: 0;
  --dv-dropdown-border-radius: var(--dsw-radius-sm);
  --dv-spacing-padding: 0;
  --dv-sash-color: transparent;
  --dv-active-sash-transition-duration: .1s;
  --dv-active-sash-transition-delay: .5s;
  --dv-floating-group-border: none;
  --dv-floating-border: none;
  --dv-drag-over-border: none;
  --dv-overlay-z-index: 1500;
  --dv-tab-close-icon-size: 12px;
  color-scheme: inherit;
}

.ql-term-theme .dv-dockview {
  --dv-tab-margin: 0;
}

.ql-term-theme .dv-tabs-and-actions-container {
  padding: 0 4px;
}

.ql-term-theme .dv-right-actions-container,
.ql-term-theme .dv-left-actions-container {
  align-items: center;
}

.ql-term-theme .dv-tabs-and-actions-container .dv-tabs-container {
  gap: 2px;
}

.ql-term-theme .dv-tab {
  padding: 0;
  border-radius: var(--dsw-radius-sm) var(--dsw-radius-sm) 0 0;
}

.ql-term-theme .dv-tab:has(> .ql-tab) {
  padding: 0;
}

.ql-tab {
  display: flex;
  box-sizing: border-box;
  align-items: center;
  gap: 6px;
  max-width: 200px;
  height: 100%;
  padding: 0 8px;
  color: inherit;
  font-size: 12px;
  line-height: 18px;
  cursor: pointer;
}

.ql-tab-dot {
  flex: none;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--dsw-alias-state-success-primary);
}

.ql-tab-dot[data-status="exited"] {
  background: var(--dsw-alias-state-idle-primary);
}

.ql-tab-dot[data-status="failed"] {
  background: var(--dsw-alias-state-error-primary);
}

.ql-tab-title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ql-tab-close {
  display: inline-flex;
  flex: none;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  padding: 0;
  border: 0;
  border-radius: var(--dsw-radius-xs);
  background: none;
  color: inherit;
  opacity: .65;
  cursor: pointer;
}

.ql-tab-close:hover {
  background: var(--dsw-alias-interactive-bg-active);
  color: var(--dsw-alias-label-primary);
  opacity: 1;
}

.ql-group-add {
  display: inline-flex;
  flex: none;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  margin: 0 2px;
  padding: 0;
  border: 0;
  border-radius: var(--dsw-radius-sm);
  background: none;
  color: var(--dsw-alias-label-secondary);
  cursor: pointer;
}

.ql-group-add:hover {
  background: var(--dsw-alias-interactive-bg-hover);
  color: var(--dsw-alias-label-primary);
}

.ql-term-pane {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: var(--dsw-alias-bg-base);
  color: var(--dsw-alias-label-primary);
}

.ql-term-pane .xterm {
  width: 100%;
  height: 100%;
}

.ql-term-pane .xterm-viewport {
  background-color: transparent;
}

.ql-term-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 24px;
  color: var(--dsw-alias-label-tertiary);
  text-align: center;
}

.ql-term-empty-title {
  margin: 0;
  color: var(--dsw-alias-label-secondary);
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
}

.ql-term-empty-hint {
  max-width: 40ch;
  margin: 0;
  font-size: 12.5px;
  line-height: 19px;
}

.ql-term-empty-action {
  margin-top: 6px;
}

@media (prefers-reduced-motion: reduce) {
  .ql-card,
  .ql-card-actions,
  .ql-input,
  .ql-textarea {
    transition: none;
  }

  .ql-toast {
    animation: none;
  }
}
`;var ud,ap=class{constructor(){}},Qe=class extends ap{constructor(e,t,i,r){super(),this.viewId=e,this.groupId=t,this.panelId=i,this.tabGroupId=r}};var oi=class pd{constructor(){}static getInstance(){return pd.INSTANCE}hasData(t){return t&&t===this.proto}clearData(t){this.hasData(t)&&(this.proto=void 0,this.data=void 0)}getData(t){if(this.hasData(t))return this.data}setData(t,i){i&&(this.data=t,this.proto=i)}};ud=oi;oi.INSTANCE=new ud;function he(){let e=oi.getInstance();if(e.hasData(Qe.prototype))return e.getData(Qe.prototype)[0]}var ee;(function(e){e.NONE={dispose:()=>{}};function t(i){return{dispose:()=>{i()}}}e.from=t})(ee||(ee={}));var V=class{get isDisposed(){return this._isDisposed}constructor(...e){this._isDisposed=!1,this._disposables=new Set(e)}addDisposables(...e){e.forEach(t=>this._disposables.add(t))}removeDisposable(e){this._disposables.delete(e)}dispose(){this._isDisposed||(this._isDisposed=!0,this._disposables.forEach(e=>e.dispose()),this._disposables.clear())}},Ee=class{constructor(){this._disposable=ee.NONE}get value(){return this._disposable===ee.NONE?void 0:this._disposable}set value(e){this._disposable&&this._disposable.dispose(),this._disposable=e}dispose(){this._disposable&&(this._disposable.dispose(),this._disposable=ee.NONE)}},Ke;(function(e){e.map=(t,i)=>r=>t(o=>r(i(o))),e.any=(...t)=>i=>{let r=t.map(o=>o(i));return{dispose:()=>{r.forEach(o=>{o.dispose()})}}}})(Ke||(Ke={}));var ss=class{constructor(){this._defaultPrevented=!1}get defaultPrevented(){return this._defaultPrevented}preventDefault(){this._defaultPrevented=!0}},dp=class{constructor(){this._isAccepted=!1}get isAccepted(){return this._isAccepted}accept(){this._isAccepted=!0}},lp=class{constructor(){this.events=new Map}get size(){return this.events.size}add(e,t){this.events.set(e,t)}delete(e){this.events.delete(e)}clear(){this.events.clear()}},$a=class vd{static create(){var t;return new vd((t=new Error("listener stacktrace").stack)!==null&&t!==void 0?t:"")}constructor(t){this.value=t}print(){console.warn("dockview: stacktrace",this.value)}},hp=class{constructor(e,t){this.callback=e,this.stacktrace=t}},E=class rt{static setLeakageMonitorEnabled(t){t!==rt.ENABLE_TRACKING&&rt.MEMORY_LEAK_WATCHER.clear(),rt.ENABLE_TRACKING=t}get value(){return this._last}constructor(t){this.options=t,this._listeners=[],this._disposed=!1}get event(){return this._event||(this._event=t=>{var i;!((i=this.options)===null||i===void 0)&&i.replay&&this._last!==void 0&&t(this._last);let r=new hp(t,rt.ENABLE_TRACKING?$a.create():void 0);return this._listeners.push(r),{dispose:()=>{let o=this._listeners.indexOf(r);o>-1?this._listeners.splice(o,1):rt.ENABLE_TRACKING}}},rt.ENABLE_TRACKING&&rt.MEMORY_LEAK_WATCHER.add(this._event,$a.create())),this._event}fire(t){var i;if(this._pauseTokens!==void 0&&this._pauseTokens.size>0)return;!((i=this.options)===null||i===void 0)&&i.replay&&(this._last=t);let r=this._listeners,o=r.length;if(o!==0){if(o===1){r[0].callback(t);return}for(let s of r.slice())s.callback(t)}}pause(){var t;let i={};return(t=this._pauseTokens)!==null&&t!==void 0||(this._pauseTokens=new Set),this._pauseTokens.add(i),ee.from(()=>{var r;return(r=this._pauseTokens)===null||r===void 0?void 0:r.delete(i)})}dispose(){this._disposed||(this._disposed=!0,this._listeners.length>0&&(rt.ENABLE_TRACKING?queueMicrotask(()=>{for(let i of this._listeners){var t;console.warn("dockview: stacktrace",(t=i.stacktrace)===null||t===void 0?void 0:t.print())}this._listeners=[]}):this._listeners=[]),rt.ENABLE_TRACKING&&this._event&&rt.MEMORY_LEAK_WATCHER.delete(this._event))}};E.ENABLE_TRACKING=!1;E.MEMORY_LEAK_WATCHER=new lp;function $(e,t,i,r){return e.addEventListener(t,i,r),{dispose:()=>{e.removeEventListener(t,i,r)}}}var Fa=class{constructor(){this._onFired=new E,this._currentFireCount=0,this._pending=new Set,this._queued=!1,this.onEvent=e=>{let t=this._currentFireCount;return this._onFired.event(i=>{this._currentFireCount>t&&e(i)})}}fire(e){this._currentFireCount++,this._pending.add(e),!this._queued&&(this._queued=!0,queueMicrotask(()=>{this._queued=!1;let t=this._pending;this._pending=new Set,this._onFired.fire(t)}))}dispose(){this._onFired.dispose()}},cp=class extends V{constructor(e){super(),this._onDidChange=new E,this.onDidChange=this._onDidChange.event,this._value=null,this.addDisposables(this._onDidChange,Xt(e,t=>{let i=t.target.scrollWidth>t.target.clientWidth,r=t.target.scrollHeight>t.target.clientHeight;this._value={hasScrollX:i,hasScrollY:r},this._onDidChange.fire(this._value)}))}};function Xt(e,t){let i=new Set,r=new ResizeObserver(o=>{let s=!1,n;n=requestAnimationFrame(()=>{s=!0,n!==void 0&&i.delete(n);let a=o[0];t(a)}),s||i.add(n)});return r.observe(e),{dispose:()=>{r.unobserve(e),r.disconnect();for(let o of i)cancelAnimationFrame(o);i.clear()}}}var Ct=(e,...t)=>{for(let i of t)e.classList.contains(i)&&e.classList.remove(i)},kt=(e,...t)=>{for(let i of t)e.classList.contains(i)||e.classList.add(i)},B=(e,t,i)=>{let r=e.classList.contains(t);i&&!r&&e.classList.add(t),!i&&r&&e.classList.remove(t)};function Yo(e,t){for(;e;){if(e===t)return!0;e=e.parentNode}return!1}function gd(e){return new up(e)}var up=class extends V{constructor(e){super(),this._onDidFocus=new E,this.onDidFocus=this._onDidFocus.event,this._onDidBlur=new E,this.onDidBlur=this._onDidBlur.event,this.addDisposables(this._onDidFocus,this._onDidBlur);let t=Yo(Jo(e),e),i=!1,r=()=>{i=!1,t||(t=!0,this._onDidFocus.fire())},o=()=>{t&&(i=!0,globalThis.setTimeout(()=>{i&&(i=!1,t=!1,this._onDidBlur.fire())},0))};this._refreshStateHandler=()=>{Yo(Jo(e),e)!==t&&(t?o():r())},this.addDisposables($(e,"focus",r,!0)),this.addDisposables($(e,"blur",o,!0))}refreshState(){this._refreshStateHandler()}},md="dv-quasiPreventDefault";function fd(e){e[md]=!0}function Va(e){return e[md]}function Xo(e,t){var i,r;let o=(i=(r=e.composedPath)===null||r===void 0?void 0:r.call(e))!==null&&i!==void 0?i:[];if(o.length>0)return t.some(n=>o.includes(n));let s=e.target;return s instanceof Node&&t.some(n=>n.contains(s))}function pp(e){let t=[],i=e.getRootNode();for(;si(i);)t.push(i),i=i.host.getRootNode();return t}function vp(e,t){let i=t?.getRootNode(),r=e,o=r.getRootNode();for(;o!==i&&si(o);)r=o.host,o=r.getRootNode();return r}function qa(e,t,i={}){let r=Array.from(t),{nonce:o}=i,s=typeof o=="function"?o(e):o;for(let n of r){if(n.href){let d=e.createElement("link");d.href=n.href,d.type=n.type,d.rel="stylesheet",s&&d.setAttribute("nonce",s),e.head.appendChild(d);continue}let a=[];try{n.cssRules&&(a=Array.from(n.cssRules).map(d=>d.cssText))}catch(d){console.warn("dockview: failed to access stylesheet rules due to security restrictions",d)}let l=e.createDocumentFragment();for(let d of a){let h=e.createElement("style");s&&h.setAttribute("nonce",s),h.appendChild(e.createTextNode(d)),l.appendChild(h)}e.head.appendChild(l)}}function jo(e){let{left:t,top:i,width:r,height:o}=e.getBoundingClientRect();return{left:t+window.scrollX,top:i+window.scrollY,width:r,height:o}}function Sr(e){let t=e;for(;t?.parentNode;){if(t.parentNode===document)return!0;t.parentNode instanceof DocumentFragment?t=t.parentNode.host:t=t.parentNode}return!1}function si(e){return!!e&&e.nodeType===Node.DOCUMENT_FRAGMENT_NODE&&"host"in e&&!!e.host}function yr(e){var t;let i=e.getRootNode();return i!==e&&typeof i.elementsFromPoint=="function"?i:(t=e.ownerDocument)!==null&&t!==void 0?t:document}function gp(e,t){e.dataset.testid=t}function mp(e,t){let i=[];function r(o){if(o.nodeType===Node.ELEMENT_NODE){e.includes(o.tagName)&&i.push(o),o.shadowRoot&&r(o.shadowRoot);for(let s of o.children)r(s)}}return r(t instanceof Document?t.documentElement:t),i}function Gi(e=document){let t=mp(["IFRAME","WEBVIEW"],e),i=new WeakMap;for(let r of t)i.set(r,r.style.pointerEvents),r.style.pointerEvents="none";return{release:()=>{for(let o of t){var r;o.style.pointerEvents=(r=i.get(o))!==null&&r!==void 0?r:"auto"}t.splice(0,t.length)}}}function _d(e=document){let t=e instanceof Document?e:e.ownerDocument,i=t?.documentElement;if(!t||!i)return{release:()=>{}};let r=["user-select","-webkit-user-select"],o=r.map(n=>[n,i.style.getPropertyValue(n)]);for(let n of r)i.style.setProperty(n,"none");let s=n=>n.preventDefault();return t.addEventListener("selectstart",s),{release:()=>{t.removeEventListener("selectstart",s);for(let[n,a]of o)a?i.style.setProperty(n,a):i.style.removeProperty(n)}}}function fp(e){function t(o){let s=[];for(let n=0;n<o.classList.length;n++)s.push(o.classList.item(n));return s}let i,r=e;for(;r!==null&&(i=t(r).find(o=>o.startsWith("dockview-theme-")),typeof i!="string");){if(r.parentElement===null){let o=r.getRootNode();r=si(o)?o.host:null;continue}r=r.parentElement}return i}var bd=class{constructor(e){this.element=e,this._classNames=[]}setClassNames(e){for(let t of this._classNames)B(this.element,t,!1);this._classNames=e.split(" ").filter(t=>t.trim().length>0);for(let t of this._classNames)B(this.element,t,!0)}},wd=100;function Bo(e,t){let i=jo(e),r=jo(t);return!(i.left<r.left||i.left+i.width>r.left+r.width||i.top<r.top||i.top+i.height>r.top+r.height)}function _p(e){let t=new E,i=e.screenX,r=e.screenY,o,s=0,n=!1,a=()=>{if(n||e.closed)return;let d=e.screenX,h=e.screenY;(d!==i||h!==r)&&(clearTimeout(o),o=setTimeout(()=>{t.fire()},wd),i=d,r=h),s=requestAnimationFrame(a)};a();let l=t.dispose.bind(t);return t.dispose=()=>{n||(n=!0,cancelAnimationFrame(s),clearTimeout(o)),l()},t}function bp(e,t){let i;return new V($(e,"resize",()=>{clearTimeout(i),i=setTimeout(()=>{t()},wd)}),ee.from(()=>clearTimeout(i)))}function wp(e,t,i){var r;let o=(r=i?.buffer)!==null&&r!==void 0?r:10,s=e.getBoundingClientRect(),n=t.getBoundingClientRect(),a=0,l=0,d=s.left-n.left,h=s.top-n.top,c=s.bottom-n.bottom,u=s.right-n.right;d<o?a=o-d:u>o&&(a=-o-u),h<o?l=o-h:c>o&&(l=-c-o),(a!==0||l!==0)&&(e.style.transform=`translate(${a}px, ${l}px)`)}function Sd(e){let t=e;for(;t&&(t.style.zIndex==="auto"||t.style.zIndex==="");)t=t.parentElement;return t}function Jo(e){var t;let i=e.getRootNode(),r=i.nodeType===Node.DOCUMENT_NODE?i:e.ownerDocument;return r&&typeof r.hasFocus=="function"&&!r.hasFocus()?null:(t=i.activeElement)!==null&&t!==void 0?t:null}function yd(e){var t;let i=e.getRootNode();return si(i)?i:((t=e.ownerDocument)!==null&&t!==void 0?t:document).body}function Ua(e,t,i,r,o,s,n){try{var a=e[s](n),l=a.value}catch(d){i(d);return}a.done?t(l):Promise.resolve(l).then(r,o)}function xd(e){return function(){var t=this,i=arguments;return new Promise(function(r,o){var s=e.apply(t,i);function n(l){Ua(s,r,o,n,a,"next",l)}function a(l){Ua(s,r,o,n,a,"throw",l)}n(void 0)})}}function Sp(e){let t=Cd(e);if(t)throw t}var yp=new Set(["javascript:","data:","blob:","vbscript:","file:"]),xp=250;function Cd(e,t=globalThis.location){let i;try{i=new URL(e,t.href)}catch{return new Error(`dockview: invalid popout URL: ${e}`)}if(yp.has(i.protocol))return new Error(`dockview: popout URL must not use the "${i.protocol}" protocol, which would run in the opener's context; got: ${e}`);if(!(i.protocol===t.protocol&&i.host===t.host))return new Error(`dockview: popout URL must be same-origin with the page (${t.protocol}//${t.host}); got: ${e}`)}var Cp=class extends V{get window(){var e,t;return(e=(t=this._window)===null||t===void 0?void 0:t.value)!==null&&e!==void 0?e:null}get failure(){return this._failure}constructor(e,t,i){super(),this.target=e,this.className=t,this.options=i,this._onWillClose=new E,this.onWillClose=this._onWillClose.event,this._onDidClose=new E,this.onDidClose=this._onDidClose.event,this._window=null,this.addDisposables(this._onWillClose,this._onDidClose)}dispose(){this.close(),super.dispose()}dimensions(){if(!this._window)return null;let e=this._window.value.screenX;return{top:this._window.value.screenY,left:e,width:this._window.value.innerWidth,height:this._window.value.innerHeight}}close(){var e,t;let i=this._window;i&&(this._window=null,this._onWillClose.fire(),(e=(t=this.options).onWillClose)===null||e===void 0||e.call(t,{id:this.target,window:i.value}),i.disposable.dispose(),this._onDidClose.fire())}open(){var e=this;return xd(function*(){var t,i;if(e._window)throw new Error("instance of popout window is already open");let r=`${e.options.url}`;Sp(r);let o=Object.entries({top:e.options.top,left:e.options.left,width:e.options.width,height:e.options.height}).map(([l,d])=>`${l}=${d}`).join(","),s=window.open(r,e.target,o);if(!s)return e._failure={reason:"blocked"},null;let n=new V;e._window={value:s,disposable:n},n.addDisposables(ee.from(()=>{s.close()}),e.watchForClose(s),$(globalThis.window,"beforeunload",()=>{e.close()}));let a=e.createPopoutWindowContainer();return e.className&&a.classList.add(e.className),(t=(i=e.options).onDidOpen)===null||t===void 0||t.call(i,{id:e.target,window:s}),new Promise(l=>{let d=h=>{e._failure={reason:"unscriptable",error:h instanceof Error?h:new Error(String(h))},e.close(),l(null)};try{s.addEventListener("unload",()=>{})}catch(h){d(h);return}n.addDisposables(e.onWillClose(()=>{var h;(h=e._failure)!==null&&h!==void 0||(e._failure={reason:"closed"}),l(null)})),s.addEventListener("load",()=>{try{var h,c,u;let g=s.document;g.title=document.title,g.body.appendChild(a),qa(g,[...Array.from(globalThis.document.styleSheets),...(h=globalThis.document.adoptedStyleSheets)!==null&&h!==void 0?h:[]],{nonce:e.options.nonce});let m=[];for(let f=(c=(u=e.options).styleRoot)===null||c===void 0?void 0:c.call(u);si(f);f=f.host.getRootNode()){var p,v;m.push(...Array.from((p=f.styleSheets)!==null&&p!==void 0?p:[]),...(v=f.adoptedStyleSheets)!==null&&v!==void 0?v:[])}m.length>0&&qa(g,m,{nonce:e.options.nonce}),$(s,"beforeunload",()=>{e.close()}),l(a)}catch(g){d(g)}})})})()}watchForClose(e){if(typeof e.closed!="boolean")return ee.NONE;let t=setInterval(()=>{e.closed&&this.close()},xp);return ee.from(()=>{clearInterval(t)})}createPopoutWindowContainer(){let e=document.createElement("div");return e.classList.add("dv-popout-window"),e.id="dv-popout-window",e.style.position="absolute",e.style.width="100%",e.style.height="100%",e.style.top="0px",e.style.left="0px",e}};function xt(e){if(e.length===0)throw new Error("Invalid tail call");return[e.slice(0,e.length-1),e[e.length-1]]}function Ka(e,t){if(e.length!==t.length)return!1;for(let i=0;i<e.length;i++)if(e[i]!==t[i])return!1;return!0}function Wo(e,t){let i=e.indexOf(t);i>-1&&(e.splice(i,1),e.unshift(t))}function pr(e,t){let i=e.indexOf(t);i>-1&&(e.splice(i,1),e.push(t))}function kp(e,t){for(let i=0;i<e.length;i++){let r=e[i];if(t(r))return i}return-1}function kd(e,t){let i=e.indexOf(t);return i>-1?(e.splice(i,1),!0):!1}var le=(e,t,i)=>t>i?t:Math.min(i,Math.max(e,t)),ns=()=>{let e=1;return{next:()=>(e++).toString()}},it=(e,t)=>{let i=[];if(typeof t!="number"&&(t=e,e=0),e<=t)for(let r=e;r<t;r++)i.push(r);else for(let r=e;r>t;r--)i.push(r);return i},Dp=class{set size(e){this._size=e}setContainerGeometry(e,t){this._appliedStyles[e]!==t&&(this._appliedStyles[e]=t,this.container.style[e]=t)}get size(){return this._size}get cachedVisibleSize(){return this._cachedVisibleSize}get visible(){return this._cachedVisibleSize===void 0}get minimumSize(){return this.visible?this.view.minimumSize:0}get viewMinimumSize(){return this.view.minimumSize}get maximumSize(){return this.visible?this.view.maximumSize:0}get viewMaximumSize(){return this.view.maximumSize}get priority(){return this.view.priority}get snap(){return!!this.view.snap}set enabled(e){this.container.style.pointerEvents=e?"":"none"}constructor(e,t,i,r){this.container=e,this.view=t,this.disposable=r,this._cachedVisibleSize=void 0,this._appliedStyles={},typeof i=="number"?(this._size=i,this._cachedVisibleSize=void 0,e.classList.add("visible")):(this._size=0,this._cachedVisibleSize=i.cachedVisibleSize)}setVisible(e,t){if(e!==this.visible){if(e){var i;let r=(i=this._cachedVisibleSize)!==null&&i!==void 0?i:0;this._cachedVisibleSize=void 0,this.size=le(r,this.viewMinimumSize,this.viewMaximumSize)}else this._cachedVisibleSize=typeof t=="number"?t:this.size,this.size=0;this.container.classList.toggle("visible",e),this.view.setVisible&&this.view.setVisible(e)}}scale(e){if(this._cachedVisibleSize!==void 0){this._cachedVisibleSize=Math.round(this._cachedVisibleSize*e);return}this.size=le(Math.round(this.size*e),this.minimumSize,this.maximumSize)}dispose(){return this.disposable.dispose(),this.view}};function Ya(e,t,i){e.appliedLeft!==t&&(e.appliedLeft=t,e.container.style.left=t),e.appliedTop!==i&&(e.appliedTop=i,e.container.style.top=i)}var Le;(function(e){e.Distribute={type:"distribute"};function t(r){return{type:"split",index:r}}e.Split=t;function i(r){return{type:"invisible",cachedVisibleSize:r}}e.Invisible=i})(Le||(Le={}));var xr=class{get contentSize(){return this._contentSize}get size(){return this._size}set size(e){this._size=e}get orthogonalSize(){return this._orthogonalSize}set orthogonalSize(e){this._orthogonalSize=e}get length(){return this.viewItems.length}get proportions(){return this._proportions?[...this._proportions]:void 0}get proportionalLayout(){return this._proportionalLayout}set proportionalLayout(e){this._proportionalLayout!==e&&(this._proportionalLayout=e,e?this.saveProportions():this._proportions=void 0)}get orientation(){return this._orientation}set orientation(e){if(this._orientation===e)return;this._orientation=e;let t=this.size;this.size=this.orthogonalSize,this.orthogonalSize=t,this.rescaleViews(this.size),Ct(this.element,"dv-horizontal","dv-vertical"),this.element.classList.add(this.orientation=="HORIZONTAL"?"dv-horizontal":"dv-vertical")}get minimumSize(){return this.viewItems.reduce((e,t)=>e+t.minimumSize,0)}get maximumSize(){return this.length===0?Number.POSITIVE_INFINITY:this.viewItems.reduce((e,t)=>e+t.maximumSize,0)}get startSnappingEnabled(){return this._startSnappingEnabled}set startSnappingEnabled(e){this._startSnappingEnabled!==e&&(this._startSnappingEnabled=e,this.updateSashEnablement())}get endSnappingEnabled(){return this._endSnappingEnabled}set endSnappingEnabled(e){this._endSnappingEnabled!==e&&(this._endSnappingEnabled=e,this.updateSashEnablement())}get disabled(){return this._disabled}set disabled(e){this._disabled=e,B(this.element,"dv-splitview-disabled",e)}get margin(){return this._margin}get marginShare(){let e=0;for(let t of this.viewItems)t.visible&&e++;return this.marginShareFor(e)}set margin(e){this._margin=e,B(this.element,"dv-splitview-has-margin",e!==0)}constructor(e,t){var i,r;this.container=e,this.viewItems=[],this.sashes=[],this._size=0,this._orthogonalSize=0,this._contentSize=0,this._proportions=void 0,this._startSnappingEnabled=!0,this._endSnappingEnabled=!0,this._disabled=!1,this._margin=0,this._onDidSashEnd=new E,this.onDidSashEnd=this._onDidSashEnd.event,this._onDidAddView=new E,this.onDidAddView=this._onDidAddView.event,this._onDidRemoveView=new E,this.onDidRemoveView=this._onDidRemoveView.event,this.resize=(o,s,n=this.viewItems.map(p=>p.size),a,l,d=Number.NEGATIVE_INFINITY,h=Number.POSITIVE_INFINITY,c,u)=>{if(o<0||o>this.viewItems.length)return 0;let p=it(o,-1),v=it(o+1,this.viewItems.length);if(l)for(let M of l)Wo(p,M),Wo(v,M);if(a)for(let M of a)pr(p,M),pr(v,M);let g=p.reduce((M,O)=>M+this.viewItems[O].minimumSize-n[O],0),m=p.reduce((M,O)=>M+this.viewItems[O].maximumSize-n[O],0),f=v.length===0?Number.POSITIVE_INFINITY:v.reduce((M,O)=>M+n[O]-this.viewItems[O].minimumSize,0),S=v.length===0?Number.NEGATIVE_INFINITY:v.reduce((M,O)=>M+n[O]-this.viewItems[O].maximumSize,0),w=Math.max(g,S),D=Math.min(f,m),T=!1;if(c){let M=this.viewItems[c.index],O=s>=c.limitDelta;T=O!==M.visible,M.setVisible(O,c.size)}if(!T&&u){let M=this.viewItems[u.index],O=s<u.limitDelta;T=O!==M.visible,M.setVisible(O,u.size)}if(T)return this.resize(o,s,n,a,l,d,h);let R=le(s,w,D),x=0,C=R;for(let M of p){let O=this.viewItems[M],W=n[M],_=le(W+C,O.minimumSize,O.maximumSize),y=_-W;x+=y,C-=y,O.size=_}let L=x;for(let M of v){let O=this.viewItems[M],W=n[M],_=le(W-L,O.minimumSize,O.maximumSize),y=_-W;L+=y,O.size=_}return s},this._orientation=(i=t.orientation)!==null&&i!==void 0?i:"VERTICAL",this.element=this.createContainer(),this.margin=(r=t.margin)!==null&&r!==void 0?r:0,this._proportionalLayout=t.proportionalLayout===void 0?!0:!!t.proportionalLayout,this.viewContainer=this.createViewContainer(),this.sashContainer=this.createSashContainer(),this.element.appendChild(this.sashContainer),this.element.appendChild(this.viewContainer),this.container.appendChild(this.element),this.style(t.styles),t.descriptor&&(this._size=t.descriptor.size,t.descriptor.views.forEach((o,s)=>{let n=o.visible===void 0||o.visible?o.size:{type:"invisible",cachedVisibleSize:o.size},a=o.view;this.addView(a,n,s,!0)}),this._contentSize=this.viewItems.reduce((o,s)=>o+s.size,0),this.saveProportions())}style(e){e?.separatorBorder==="transparent"?(Ct(this.element,"dv-separator-border"),this.element.style.removeProperty("--dv-separator-border")):(kt(this.element,"dv-separator-border"),e?.separatorBorder&&this.element.style.setProperty("--dv-separator-border",e.separatorBorder))}isViewVisible(e){if(e<0||e>=this.viewItems.length)throw new Error("Index out of bounds");return this.viewItems[e].visible}setViewVisible(e,t){if(e<0||e>=this.viewItems.length)throw new Error("Index out of bounds");let i=this.viewItems[e];i.setVisible(t,i.size),this.distributeEmptySpace(e),this.layoutViews(),this.saveProportions()}getViewSize(e){return e<0||e>=this.viewItems.length?-1:this.viewItems[e].size}resizeView(e,t){if(e<0||e>=this.viewItems.length)return;let i=it(this.viewItems.length).filter(n=>n!==e),r=[...i.filter(n=>this.viewItems[n].priority==="low"),e],o=i.filter(n=>this.viewItems[n].priority==="high"),s=this.viewItems[e];t=Math.round(t),t=le(t,s.minimumSize,Math.min(s.maximumSize,this._size)),s.size=t,this.relayout(r,o)}getViews(){return this.viewItems.map(e=>e.view)}onDidChange(e,t){let i=this.viewItems.indexOf(e);if(i<0||i>=this.viewItems.length)return;t=typeof t=="number"?t:e.size,t=le(t,e.minimumSize,e.maximumSize),e.size=t;let r=it(this.viewItems.length).filter(n=>n!==i),o=[...r.filter(n=>this.viewItems[n].priority==="low"),i],s=r.filter(n=>this.viewItems[n].priority==="high");this.relayout([...o,i],s)}addView(e,t=Le.Distribute,i=this.viewItems.length,r){let o=document.createElement("div");o.className="dv-view",o.appendChild(e.element);let s;if(typeof t=="number")s=t;else if(t.type==="split"){let l=this.viewItems[t.index];if(l){let d=Math.floor(l.size/2);s=l.size-d,l.size=d}else s=this.getViewSize(t.index)/2}else t.type==="invisible"?s={cachedVisibleSize:t.cachedVisibleSize}:s=e.minimumSize;let n=e.onDidChange(l=>this.onDidChange(a,l.size)),a=new Dp(o,e,s,{dispose:()=>{n.dispose(),o.remove()}});if(i===this.viewItems.length?this.viewContainer.appendChild(o):this.viewContainer.insertBefore(o,this.viewContainer.children.item(i)),this.viewItems.splice(i,0,a),this.viewItems.length>1){let l=document.createElement("div");l.className="dv-sash";let d=c=>{var u;for(let k of this.viewItems)k.enabled=!1;let p=(u=l.ownerDocument)!==null&&u!==void 0?u:document,v=Gi(p),g=this._orientation==="HORIZONTAL"?c.clientX:c.clientY,m=kp(this.sashes,k=>k.container===l),f=this.viewItems.map(k=>k.size),S,w,D=it(m,-1),T=it(m+1,this.viewItems.length),R=D.reduce((k,G)=>k+(this.viewItems[G].minimumSize-f[G]),0),x=D.reduce((k,G)=>k+(this.viewItems[G].viewMaximumSize-f[G]),0),C=T.length===0?Number.POSITIVE_INFINITY:T.reduce((k,G)=>k+(f[G]-this.viewItems[G].minimumSize),0),L=T.length===0?Number.NEGATIVE_INFINITY:T.reduce((k,G)=>k+(f[G]-this.viewItems[G].viewMaximumSize),0),M=Math.max(R,L),O=Math.min(C,x),W=this.findFirstSnapIndex(D),_=this.findFirstSnapIndex(T);if(typeof W=="number"){let k=this.viewItems[W],G=Math.floor(k.viewMinimumSize/2);S={index:W,limitDelta:k.visible?M-G:M+G,size:k.size}}if(typeof _=="number"){let k=this.viewItems[_],G=Math.floor(k.viewMinimumSize/2);w={index:_,limitDelta:k.visible?O+G:O-G,size:k.size}}let y=k=>{let G=(this._orientation==="HORIZONTAL"?k.clientX:k.clientY)-g;this.resize(m,G,f,void 0,void 0,M,O,S,w),this.distributeEmptySpace(),this.layoutViews()},P=()=>{for(let k of this.viewItems)k.enabled=!0;v.release(),this.saveProportions(),p.removeEventListener("pointermove",y),p.removeEventListener("pointerup",P),p.removeEventListener("pointercancel",P),p.removeEventListener("contextmenu",P),this._onDidSashEnd.fire(void 0)};p.addEventListener("pointermove",y),p.addEventListener("pointerup",P),p.addEventListener("pointercancel",P),p.addEventListener("contextmenu",P)};l.addEventListener("pointerdown",d);let h={container:l,disposable:()=>{l.removeEventListener("pointerdown",d),l.remove()}};this.sashContainer.appendChild(l),this.sashes.push(h)}r||this.relayout([i]),!r&&typeof t!="number"&&t.type==="distribute"&&this.distributeViewSizes(),this._onDidAddView.fire(e)}distributeViewSizes(){let e=[],t=0;for(let n of this.viewItems)n.maximumSize-n.minimumSize>0&&(e.push(n),t+=n.size);let i=Math.floor(t/e.length);for(let n of e)n.size=le(i,n.minimumSize,n.maximumSize);let r=it(this.viewItems.length),o=r.filter(n=>this.viewItems[n].priority==="low"),s=r.filter(n=>this.viewItems[n].priority==="high");this.relayout(o,s)}removeView(e,t,i=!1){let r=this.viewItems.splice(e,1)[0];if(r.dispose(),this.viewItems.length>=1){let o=Math.max(e-1,0);this.sashes.splice(o,1)[0].disposable()}return i||this.relayout(),t?.type==="distribute"&&this.distributeViewSizes(),this._onDidRemoveView.fire(r.view),r.view}getViewCachedVisibleSize(e){if(e<0||e>=this.viewItems.length)throw new Error("Index out of bounds");return this.viewItems[e].cachedVisibleSize}moveView(e,t){let i=this.getViewCachedVisibleSize(e),r=i===void 0?this.getViewSize(e):Le.Invisible(i),o=this.removeView(e,void 0,!0);this.addView(o,r,t)}layout(e,t){let i=Math.max(this.size,this._contentSize);if(this.size=e,this.orthogonalSize=t,this._proportions||this.saveProportions(),this.proportions){let r=0;for(let o=0;o<this.viewItems.length;o++){let s=this.viewItems[o],n=this.proportions[o];typeof n=="number"?r+=n:e-=s.size}for(let o=0;o<this.viewItems.length;o++){let s=this.viewItems[o],n=this.proportions[o];typeof n=="number"&&r>0&&(s.size=le(Math.round(n*e/r),s.minimumSize,s.maximumSize))}}else{let r=it(this.viewItems.length),o=r.filter(n=>this.viewItems[n].priority==="low"),s=r.filter(n=>this.viewItems[n].priority==="high");this.resize(this.viewItems.length-1,e-i,void 0,o,s)}this.distributeEmptySpace(),this.layoutViews()}relayout(e,t){let i=this.viewItems.reduce((r,o)=>r+o.size,0);this.resize(this.viewItems.length-1,this._size-i,void 0,e,t),this.distributeEmptySpace(),this.layoutViews(),this.saveProportions()}distributeEmptySpace(e){let t=0;for(let s of this.viewItems)t+=s.size;let i=this.size-t;if(i===0)return;let r=it(this.viewItems.length-1,-1),o=!1;for(let s of this.viewItems)if(s.priority==="low"||s.priority==="high"){o=!0;break}if(o){let s=r.filter(a=>this.viewItems[a].priority==="low"),n=r.filter(a=>this.viewItems[a].priority==="high");for(let a of n)Wo(r,a);for(let a of s)pr(r,a)}typeof e=="number"&&pr(r,e);for(let s=0;i!==0&&s<r.length;s++){let n=this.viewItems[r[s]],a=le(n.size+i,n.minimumSize,n.maximumSize),l=a-n.size;i-=l,n.size=a}}rescaleViews(e){let t=0;for(let o of this.viewItems)t+=o.size;if(e<=0||t<=0)return;let i=e/t,r=0;for(let o of this.viewItems)o.scale(i),r+=o.size;this._contentSize=r}saveProportions(){if(!this.proportionalLayout)return;let e=0;for(let t of this.viewItems)e+=t.size;e>0&&(this._proportions=this.viewItems.map(t=>t.visible?t.size/e:void 0))}layoutViews(){let e=0,t=0;for(let l of this.viewItems)e+=l.size,l.visible&&t++;if(this._contentSize=e,this.updateSashEnablement(),this.viewItems.length===0)return;let i=Math.max(0,t-1),r=this.marginShareFor(t),o=0,s=[],n=4,a=0;this.viewItems.forEach((l,d)=>{o+=this.viewItems[d].size,s.push(o),a+=l.visible?1:0;let h=l.visible?l.size-r:0,c=Math.max(0,a-1),u=d===0||c===0?0:s[d-1]+c/i*r;if(d<this.viewItems.length-1){let p=l.visible?u+h-n/2+this.margin/2:u,v=this.sashes[d];this._orientation==="HORIZONTAL"&&Ya(v,`${p}px`,"0px"),this._orientation==="VERTICAL"&&Ya(v,"0px",`${p}px`)}this._orientation==="HORIZONTAL"&&(l.setContainerGeometry("width",`${h}px`),l.setContainerGeometry("left",`${u}px`),l.setContainerGeometry("top",""),l.setContainerGeometry("height","")),this._orientation==="VERTICAL"&&(l.setContainerGeometry("height",`${h}px`),l.setContainerGeometry("top",`${u}px`),l.setContainerGeometry("width",""),l.setContainerGeometry("left","")),l.view.layout(h,this._orthogonalSize)})}marginShareFor(e){let t=Math.max(0,e-1);return this._margin*t/Math.max(1,e)}findFirstSnapIndex(e){for(let t of e){let i=this.viewItems[t];if(i.visible&&i.snap)return t}for(let t of e){let i=this.viewItems[t];if(i.visible&&i.maximumSize-i.minimumSize>0)return;if(!i.visible&&i.snap)return t}}updateSashEnablement(){if(this.sashes.length===0)return;let e=!1,t=this.viewItems.map(a=>e=a.size-a.minimumSize>0||e);e=!1;let i=this.viewItems.map(a=>e=a.maximumSize-a.size>0||e),r=[...this.viewItems].reverse();e=!1;let o=r.map(a=>e=a.size-a.minimumSize>0||e).reverse();e=!1;let s=r.map(a=>e=a.maximumSize-a.size>0||e).reverse(),n=0;for(let a=0;a<this.sashes.length;a++){let l=this.sashes[a],d=this.viewItems[a];n+=d.size;let h=!(t[a]&&s[a+1]),c=!(i[a]&&o[a+1]);if(h&&c){let u=it(a,-1),p=it(a+1,this.viewItems.length),v=this.findFirstSnapIndex(u),g=this.findFirstSnapIndex(p),m=typeof v=="number"&&!this.viewItems[v].visible,f=typeof g=="number"&&!this.viewItems[g].visible;m&&o[a]&&(n>0||this.startSnappingEnabled)?this.updateSash(l,1):f&&t[a]&&(n<this._contentSize||this.endSnappingEnabled)?this.updateSash(l,0):this.updateSash(l,2)}else h&&!c?this.updateSash(l,1):!h&&c?this.updateSash(l,0):this.updateSash(l,3)}}updateSash(e,t){B(e.container,"dv-disabled",t===2),B(e.container,"dv-enabled",t===3),B(e.container,"dv-maximum",t===0),B(e.container,"dv-minimum",t===1)}createViewContainer(){let e=document.createElement("div");return e.className="dv-view-container",e}createSashContainer(){let e=document.createElement("div");return e.className="dv-sash-container",e}createContainer(){let e=document.createElement("div");return e.className=`dv-split-view-container ${this._orientation==="HORIZONTAL"?"dv-horizontal":"dv-vertical"}`,e}dispose(){this._onDidSashEnd.dispose(),this._onDidAddView.dispose(),this._onDidRemoveView.dispose();for(let e=0;e<this.element.children.length;e++)if(this.element.children.item(e)===this.element){this.element.remove();break}for(let e of this.viewItems)e.dispose();this.element.remove()}},G_=Object.keys({orientation:void 0,descriptor:void 0,proportionalLayout:void 0,styles:void 0,margin:void 0,disableAutoResizing:void 0,className:void 0});var Me=class{get minimumWidth(){return this.view.minimumWidth}get maximumWidth(){return this.view.maximumWidth}get minimumHeight(){return this.view.minimumHeight}get maximumHeight(){return this.view.maximumHeight}get priority(){return this.view.priority}get snap(){return this.view.snap}get minimumSize(){return this.orientation==="HORIZONTAL"?this.minimumHeight:this.minimumWidth}get maximumSize(){return this.orientation==="HORIZONTAL"?this.maximumHeight:this.maximumWidth}get minimumOrthogonalSize(){return this.orientation==="HORIZONTAL"?this.minimumWidth:this.minimumHeight}get maximumOrthogonalSize(){return this.orientation==="HORIZONTAL"?this.maximumWidth:this.maximumHeight}get orthogonalSize(){return this._orthogonalSize}get size(){return this._size}get element(){return this.view.element}get width(){return this.orientation==="HORIZONTAL"?this.orthogonalSize:this.size}get height(){return this.orientation==="HORIZONTAL"?this.size:this.orthogonalSize}constructor(e,t,i,r=0){this.view=e,this.orientation=t,this._onDidChange=new E,this.onDidChange=this._onDidChange.event,this._orthogonalSize=i,this._size=r,this._disposable=this.view.onDidChange(o=>{o?this._onDidChange.fire({size:this.orientation==="VERTICAL"?o.width:o.height,orthogonalSize:this.orientation==="VERTICAL"?o.height:o.width}):this._onDidChange.fire({})})}setVisible(e){this.view.setVisible&&this.view.setVisible(e)}layout(e,t){this._size=e,this._orthogonalSize=t,this.view.layout(this.width,this.height)}dispose(){this._onDidChange.dispose(),this._disposable.dispose()}},we=class _r extends V{get width(){return this.orientation==="HORIZONTAL"?this.size:this.orthogonalSize}get height(){return this.orientation==="HORIZONTAL"?this.orthogonalSize:this.size}get minimumSize(){if(this._cachedMinimumSize===void 0){let t=0;for(let i=0;i<this.children.length;i++)this.splitview.isViewVisible(i)&&(t=Math.max(t,this.children[i].minimumOrthogonalSize));this._cachedMinimumSize=t}return this._cachedMinimumSize}get maximumSize(){if(this._cachedMaximumSize===void 0){let t=Number.POSITIVE_INFINITY;for(let i=0;i<this.children.length;i++)this.splitview.isViewVisible(i)&&(t=Math.min(t,this.children[i].maximumOrthogonalSize));this._cachedMaximumSize=t}return this._cachedMaximumSize}get minimumOrthogonalSize(){return this.splitview.minimumSize}get maximumOrthogonalSize(){return this.splitview.maximumSize}get orthogonalSize(){return this._orthogonalSize}get size(){return this._size}get minimumWidth(){return this.orientation==="HORIZONTAL"?this.minimumOrthogonalSize:this.minimumSize}get minimumHeight(){return this.orientation==="HORIZONTAL"?this.minimumSize:this.minimumOrthogonalSize}get maximumWidth(){return this.orientation==="HORIZONTAL"?this.maximumOrthogonalSize:this.maximumSize}get maximumHeight(){return this.orientation==="HORIZONTAL"?this.maximumSize:this.maximumOrthogonalSize}get priority(){var t;return(t=this._cachedPriority)!==null&&t!==void 0||(this._cachedPriority=this.computePriority()),this._cachedPriority}computePriority(){if(this.children.length===0)return"normal";let t=!1,i=!1;for(let o of this.children){var r;let s=(r=o.priority)!==null&&r!==void 0?r:"normal";s==="high"?t=!0:s==="low"&&(i=!0)}return t?"high":i?"low":"normal"}invalidateCachedSizes(){this._cachedMinimumSize=void 0,this._cachedMaximumSize=void 0,this._cachedPriority=void 0,this._onDidInvalidateSizes.fire()}get disabled(){return this.splitview.disabled}set disabled(t){this.splitview.disabled=t}get margin(){return this.splitview.margin}set margin(t){this.splitview.margin=t,this.children.forEach(i=>{i instanceof _r&&(i.margin=t)})}get proportionalLayout(){return this.splitview.proportionalLayout}set proportionalLayout(t){this.splitview.proportionalLayout=t,this.children.forEach(i=>{i instanceof _r&&(i.proportionalLayout=t)})}constructor(t,i,r,o,s,n,a,l){if(super(),this.orientation=t,this.styles=r,this._childrenDisposable=ee.NONE,this.children=[],this._onDidChange=new E,this.onDidChange=this._onDidChange.event,this._onDidVisibilityChange=new E,this.onDidVisibilityChange=this._onDidVisibilityChange.event,this._onDidInvalidateSizes=new E,this.onDidInvalidateSizes=this._onDidInvalidateSizes.event,this._orthogonalSize=s,this._size=o,this.element=document.createElement("div"),this.element.className="dv-branch-node",l){let d={views:l.map(h=>{var c;return{view:h.node,size:h.node.size,visible:(c=h.visible)!==null&&c!==void 0?c:!0}}),size:this.orthogonalSize};this.children=l.map(h=>h.node),this.splitview=new xr(this.element,{orientation:this.orientation,descriptor:d,proportionalLayout:i,styles:r,margin:a})}else this.splitview=new xr(this.element,{orientation:this.orientation,proportionalLayout:i,styles:r,margin:a}),this.splitview.layout(this.size,this.orthogonalSize);this.disabled=n,this.addDisposables(this._onDidChange,this._onDidVisibilityChange,this._onDidInvalidateSizes,this.splitview.onDidSashEnd(()=>{this._onDidChange.fire({})})),this.setupChildrenEvents()}setVisible(t){}isChildVisible(t){if(t<0||t>=this.children.length)throw new Error("Invalid index");return this.splitview.isViewVisible(t)}setChildVisible(t,i){if(t<0||t>=this.children.length)throw new Error("Invalid index");if(this.splitview.isViewVisible(t)===i)return;let r=this.splitview.contentSize===0;this.splitview.setViewVisible(t,i),this.invalidateCachedSizes();let o=this.splitview.contentSize===0;(i&&r||!i&&o)&&this._onDidVisibilityChange.fire({visible:i})}moveChild(t,i){if(t===i)return;if(t<0||t>=this.children.length)throw new Error("Invalid from index");t<i&&i--,this.splitview.moveView(t,i);let r=this._removeChild(t);this._addChild(r,i)}getChildSize(t){if(t<0||t>=this.children.length)throw new Error("Invalid index");return this.splitview.getViewSize(t)}resizeChild(t,i){if(t<0||t>=this.children.length)throw new Error("Invalid index");this.splitview.resizeView(t,i)}layout(t,i){this._size=i,this._orthogonalSize=t,this.splitview.layout(i,t)}addChild(t,i,r,o){if(r<0||r>this.children.length)throw new Error("Invalid index");this.splitview.addView(t,i,r,o),this._addChild(t,r)}getChildCachedVisibleSize(t){if(t<0||t>=this.children.length)throw new Error("Invalid index");return this.splitview.getViewCachedVisibleSize(t)}removeChild(t,i){if(t<0||t>=this.children.length)throw new Error("Invalid index");return this.splitview.removeView(t,i),this._removeChild(t)}_addChild(t,i){this.children.splice(i,0,t),this.setupChildrenEvents()}_removeChild(t){let[i]=this.children.splice(t,1);return this.setupChildrenEvents(),i}setupChildrenEvents(){this.invalidateCachedSizes(),this._childrenDisposable.dispose(),this._childrenDisposable=new V(Ke.any(...this.children.map(t=>t.onDidChange))(t=>{this.invalidateCachedSizes(),this._onDidChange.fire({size:t.orthogonalSize})}),...this.children.map((t,i)=>t instanceof _r?new V(t.onDidVisibilityChange(({visible:r})=>{this.setChildVisible(i,r)}),t.onDidInvalidateSizes(()=>{this.invalidateCachedSizes()})):ee.NONE))}dispose(){this._childrenDisposable.dispose(),this.splitview.dispose(),this.children.forEach(t=>t.dispose()),super.dispose()}};function Zo(e,t){if(e instanceof Me)return e;if(e instanceof we)return Zo(e.children[t?e.children.length-1:0],t);throw new Error("invalid node")}function as(e,t,i,r=1){let o=e.getChildCachedVisibleSize(t);return o===void 0?i:Le.Invisible(Math.round(o*r))}function Dd(e,t,i){if(e instanceof we){let r=new we(e.orientation,e.proportionalLayout,e.styles,t,i,e.disabled,e.margin);for(let o=e.children.length-1;o>=0;o--){let s=e.children[o],n=s instanceof we?s.orthogonalSize:s.size;r.addChild(Dd(s,s.size,s.orthogonalSize),as(e,o,n),0,!0)}return r}else return new Me(e.view,e.orientation,i)}function Qo(e,t,i){if(e instanceof we){let r=new we(ht(e.orientation),e.proportionalLayout,e.styles,t,i,e.disabled,e.margin),o=0,s=e.size===0?1:t/e.size;for(let n=e.children.length-1;n>=0;n--){let a=e.children[n],l=a instanceof we?a.orthogonalSize:a.size,d=e.size===0?0:Math.round(t*l/e.size);o+=d,n===0&&(d+=t-o),r.addChild(Qo(a,i,d),as(e,n,d,s),0,!0)}return r}else return new Me(e.view,ht(e.orientation),i)}function Ep(e){let t=e.parentElement;if(!t)throw new Error("Invalid grid element");let i=t.firstElementChild,r=0;for(;i!==e&&i!==t.lastElementChild&&i;)i=i.nextElementSibling,r++;return r}function _e(e){let t=e.parentElement;if(!t)throw new Error("Invalid grid element");if(/\bdv-grid-view\b/.test(t.className))return[];let i=Ep(t),r=t.parentElement.parentElement.parentElement;return[..._e(r),i]}function Mt(e,t,i){if(Ed(e,t)===es(i)){let[r,o]=xt(t),s=o;return(i==="right"||i==="bottom")&&(s+=1),[...r,s]}else{let r=i==="right"||i==="bottom"?1:0;return[...t,r]}}function es(e){return e==="top"||e==="bottom"?"VERTICAL":"HORIZONTAL"}function Ed(e,t){return t.length%2===0?ht(e):e}var ht=e=>e==="HORIZONTAL"?"VERTICAL":"HORIZONTAL";function Pd(e){return!!e.children}var ts=(e,t)=>{let i=t==="VERTICAL"?e.box.width:e.box.height;if(!Pd(e))return typeof e.cachedVisibleSize=="number"?{type:"leaf",data:e.view.toJSON(),size:e.cachedVisibleSize,visible:!1}:{type:"leaf",data:e.view.toJSON(),size:i};let r=e.children.map(o=>ts(o,ht(t)));return typeof e.cachedVisibleSize=="number"?{type:"branch",data:r,size:e.cachedVisibleSize,visible:!1}:{type:"branch",data:r,size:i}},Td=class{get length(){return this._root?this._root.children.length:0}get orientation(){return this.root.orientation}set orientation(e){if(this.root.orientation===e)return;let{size:t,orthogonalSize:i}=this.root;this.root=Qo(this.root,i,t),this.root.layout(t,i)}get width(){return this.root.width}get height(){return this.root.height}get minimumWidth(){return this.root.minimumWidth}get minimumHeight(){return this.root.minimumHeight}get maximumWidth(){return this.root.maximumWidth}get maximumHeight(){return this.root.maximumHeight}get locked(){return this._locked}set locked(e){this._locked=e;let t=[this.root];for(;t.length>0;){let i=t.pop();i instanceof we&&(i.disabled=e,t.push(...i.children))}}get margin(){return this._margin}set margin(e){this._margin=e,this.root.margin=e}maximizedView(){var e;return(e=this._maximizedNode)===null||e===void 0?void 0:e.leaf.view}hasMaximizedView(){return this._maximizedNode!==void 0}maximizeView(e){var t;let i=_e(e.element),[r,o]=this.getNode(i);if(!(o instanceof Me)||((t=this._maximizedNode)===null||t===void 0?void 0:t.leaf)===o)return;this.hasMaximizedView()&&this.exitMaximizedView(),ts(this.getView(),this.orientation);let s=[];function n(a,l){for(let d=0;d<a.children.length;d++){let h=a.children[d];h instanceof Me?h!==l&&(a.isChildVisible(d)?a.setChildVisible(d,!1):s.push(h)):n(h,l)}}n(this.root,o),this._maximizedNode={leaf:o,hiddenOnMaximize:s},this._onDidMaximizedNodeChange.fire({view:o.view,isMaximized:!0})}exitMaximizedView(){if(!this._maximizedNode)return;let e=this._maximizedNode.hiddenOnMaximize;function t(r){for(let o=r.children.length-1;o>=0;o--){let s=r.children[o];s instanceof Me?e.includes(s)||r.setChildVisible(o,!0):t(s)}}t(this.root);let i=this._maximizedNode.leaf;this._maximizedNode=void 0,this._onDidMaximizedNodeChange.fire({view:i.view,isMaximized:!1})}serialize(){let e=this.maximizedView(),t;e&&(t=_e(e.element));let i=this._onDidMaximizedNodeChange.pause();try{this.hasMaximizedView()&&this.exitMaximizedView();let r={root:ts(this.getView(),this.orientation),width:this.width,height:this.height,orientation:this.orientation};return t&&(r.maximizedNode={location:t}),e&&this.maximizeView(e),r}finally{i.dispose()}}dispose(){this.disposable.dispose(),this._onDidChange.dispose(),this._onDidMaximizedNodeChange.dispose(),this._onDidViewVisibilityChange.dispose(),this.root.dispose(),this._maximizedNode=void 0,this.element.remove()}clear(){let e=this.root.orientation;this.root=new we(e,this.proportionalLayout,this.styles,this.root.size,this.root.orthogonalSize,this.locked,this.margin)}deserialize(e,t){let i=e.orientation,r=i==="VERTICAL"?e.height:e.width;if(this._deserialize(e.root,i,t,r),this.layout(e.width,e.height),e.maximizedNode){let o=e.maximizedNode.location,[s,n]=this.getNode(o);if(!(n instanceof Me))return;this.maximizeView(n.view)}}_deserialize(e,t,i,r){this.root=this._deserializeNode(e,t,i,r)}_deserializeNode(e,t,i,r){let o;if(e.type==="branch"){let n=e.data.map(a=>({node:this._deserializeNode(a,ht(t),i,e.size),visible:a.visible}));o=new we(t,this.proportionalLayout,this.styles,e.size,r,this.locked,this.margin,n)}else{let n=i.fromJSON(e);if(typeof e.visible=="boolean"){var s;(s=n.setVisible)===null||s===void 0||s.call(n,e.visible)}o=new Me(n,t,r,e.size)}return o}get root(){return this._root}set root(e){let t=this._root;t&&(t.dispose(),this._maximizedNode=void 0,t.element.remove()),this._root=e,this.element.appendChild(this._root.element),this.disposable.value=this._root.onDidChange(i=>{this._onDidChange.fire(i)})}normalize(){if(!this._root||this._root.children.length!==1)return;let e=this.root,t=e.children[0];if(t instanceof Me)return;e.element.remove();let i=e.removeChild(0);e.dispose(),i.dispose(),this._root=Dd(t,t.size,t.orthogonalSize),this.element.appendChild(this._root.element),this.disposable.value=this._root.onDidChange(r=>{this._onDidChange.fire(r)})}insertOrthogonalSplitviewAtRoot(){if(!this._root)return;let e=this.root;if(e.element.remove(),this._root=new we(ht(e.orientation),this.proportionalLayout,this.styles,this.root.orthogonalSize,this.root.size,this.locked,this.margin),e.children.length!==0)if(e.children.length===1){let t=e.children[0];e.removeChild(0).dispose(),e.dispose(),this._root.addChild(Qo(t,t.orthogonalSize,t.size),Le.Distribute,0)}else this._root.addChild(e,Le.Distribute,0);this.element.appendChild(this._root.element),this.disposable.value=this._root.onDidChange(t=>{this._onDidChange.fire(t)})}next(e){return this.progmaticSelect(e)}previous(e){return this.progmaticSelect(e,!0)}getView(e){let t=e?this.getNode(e)[1]:this.root;return this._getViews(t,this.orientation)}_getViews(e,t,i){let r={height:e.height,width:e.width};if(e instanceof Me)return{box:r,view:e.view,cachedVisibleSize:i};let o=[];for(let s=0;s<e.children.length;s++){let n=e.children[s],a=e.getChildCachedVisibleSize(s);o.push(this._getViews(n,ht(t),a))}return{box:r,children:o,cachedVisibleSize:i}}progmaticSelect(e,t=!1){let[i,r]=this.getNode(e);if(!(r instanceof Me))throw new TypeError("invalid location");for(let o=i.length-1;o>-1;o--){let s=i[o],n=e[o]||0;if(t?n-1>-1:n+1<s.children.length)return Zo(s.children[t?n-1:n+1],t)}return Zo(this.root,t)}get proportionalLayout(){return this.root.proportionalLayout}set proportionalLayout(e){this.root.proportionalLayout=e}constructor(e,t,i,r,o){this.styles=t,this._locked=!1,this._margin=0,this._maximizedNode=void 0,this.disposable=new Ee,this._onDidChange=new E,this.onDidChange=this._onDidChange.event,this._onDidViewVisibilityChange=new E,this.onDidViewVisibilityChange=this._onDidViewVisibilityChange.event,this._onDidMaximizedNodeChange=new E,this.onDidMaximizedNodeChange=this._onDidMaximizedNodeChange.event,this.element=document.createElement("div"),this.element.className="dv-grid-view",this._locked=r??!1,this._margin=o??0,this.root=new we(i,e,t,0,0,this.locked,this.margin)}isViewVisible(e){let[t,i]=xt(e),[,r]=this.getNode(t);if(!(r instanceof we))throw new TypeError("Invalid from location");return r.isChildVisible(i)}setViewVisible(e,t){this.hasMaximizedView()&&this.exitMaximizedView();let[i,r]=xt(e),[,o]=this.getNode(i);if(!(o instanceof we))throw new TypeError("Invalid from location");this._onDidViewVisibilityChange.fire(),o.setChildVisible(r,t)}moveView(e,t,i){this.hasMaximizedView()&&this.exitMaximizedView();let[,r]=this.getNode(e);if(!(r instanceof we))throw new TypeError("Invalid location");r.moveChild(t,i)}addView(e,t,i){this.hasMaximizedView()&&this.exitMaximizedView();let[r,o]=xt(i),[s,n]=this.getNode(r);if(n instanceof we){let a=new Me(e,ht(n.orientation),n.orthogonalSize);n.addChild(a,t,o)}else{let[a,...l]=[...s].reverse(),[d,...h]=[...r].reverse(),c=0,u=a.getChildCachedVisibleSize(d);typeof u=="number"&&(c=Le.Invisible(u)),a.removeChild(d).dispose();let p=new we(n.orientation,this.proportionalLayout,this.styles,n.size,n.orthogonalSize,this.locked,this.margin);a.addChild(p,n.size,d);let v=new Me(n.view,a.orientation,n.size);p.addChild(v,c,0),typeof t!="number"&&t.type==="split"&&(t={type:"split",index:0});let g=new Me(e,a.orientation,n.size);p.addChild(g,t,o)}}remove(e,t){let i=_e(e.element);return this.removeView(i,t)}removeView(e,t){this.hasMaximizedView()&&this.exitMaximizedView();let[i,r]=xt(e),[o,s]=this.getNode(i);if(!(s instanceof we))throw new TypeError("Invalid location");let n=s.children[r];if(!(n instanceof Me))throw new TypeError("Invalid location");if(s.removeChild(r,t),n.dispose(),s.children.length!==1)return n.view;let a=s.children[0];if(o.length===0)return a instanceof Me||(s.removeChild(0,t),this.root=a),n.view;let[l,...d]=[...o].reverse(),[h,...c]=[...i].reverse(),u=s.isChildVisible(0);s.removeChild(0,t);let p=l.children.map((v,g)=>l.getChildSize(g));if(l.removeChild(h,t).dispose(),a instanceof we){let v=a.children.map(g=>g instanceof we?g.orthogonalSize:g.size);p.splice(h,1,...v);for(let g=0;g<a.children.length;g++){let m=a.children[g],f=as(a,g,v[g]);l.addChild(m,!u&&typeof f=="number"?Le.Invisible(f):f,h+g)}for(;a.children.length>0;)a.removeChild(0)}else{let v=new Me(a.view,ht(a.orientation),a.size),g=u?a.orthogonalSize:Le.Invisible(a.orthogonalSize);l.addChild(v,g,h)}a.dispose();for(let v=0;v<p.length;v++)l.resizeChild(v,p[v]);return n.view}layout(e,t){let[i,r]=this.root.orientation==="HORIZONTAL"?[t,e]:[e,t];this.root.layout(i,r)}getNode(e,t=this.root,i=[]){if(e.length===0)return[i,t];if(!(t instanceof we))throw new TypeError("Invalid location");let[r,...o]=e;if(r<0||r>=t.children.length)throw new Error("Invalid location");let s=t.children[r];return i.push(t),this.getNode(o,s,i)}},M_=Object.keys({disableAutoResizing:void 0,proportionalLayout:void 0,orientation:void 0,hideBorders:void 0,className:void 0}),Pp=class extends V{get element(){return this._element}get disableResizing(){return this._disableResizing}set disableResizing(e){this._disableResizing=e}constructor(e,t=!1){super(),this._lastWidth=-1,this._lastHeight=-1,this._disableResizing=t,this._element=e,this.addDisposables(Xt(this._element,i=>{if(this.isDisposed||this.disableResizing||!this._element.offsetParent||!Sr(this._element))return;let r=Math.round(i.contentRect.width),o=Math.round(i.contentRect.height);r===this._lastWidth&&o===this._lastHeight||(this._lastWidth=r,this._lastHeight=o,this.layout(r,o))}))}layoutFromElement(){if(this.disableResizing||!this._element.offsetParent||!Sr(this._element))return;let e=Math.round(this._element.clientWidth),t=Math.round(this._element.clientHeight);e===0||t===0||this.layout(e,t)}},Tp=ns();function Xa(e){switch(e){case"left":return"left";case"right":return"right";case"above":return"top";case"below":return"bottom";default:return"center"}}var zp=class extends Pp{get id(){return this._id}get size(){return this._groups.size}get groups(){return Array.from(this._groups.values()).map(e=>e.value)}get width(){return this.gridview.width}get height(){return this.gridview.height}get minimumHeight(){return this.gridview.minimumHeight}get maximumHeight(){return this.gridview.maximumHeight}get minimumWidth(){return this.gridview.minimumWidth}get maximumWidth(){return this.gridview.maximumWidth}get activeGroup(){return this._activeGroup}get locked(){return this.gridview.locked}set locked(e){this.gridview.locked=e}constructor(e,t){var i;super(document.createElement("div"),t.disableAutoResizing),this._id=Tp.next(),this._groups=new Map,this._onDidRemove=new E,this.onDidRemove=this._onDidRemove.event,this._onDidAdd=new E,this.onDidAdd=this._onDidAdd.event,this._onDidMaximizedChange=new E,this.onDidMaximizedChange=this._onDidMaximizedChange.event,this._onDidActiveChange=new E,this.onDidActiveChange=this._onDidActiveChange.event,this._bufferOnDidLayoutChange=new Fa,this.onDidLayoutChange=Ke.map(this._bufferOnDidLayoutChange.onEvent,r=>({reasons:r})),this._onDidViewVisibilityChangeMicroTaskQueue=new Fa,this.onDidViewVisibilityChangeMicroTaskQueue=this._onDidViewVisibilityChangeMicroTaskQueue.onEvent,this.element.style.height="100%",this.element.style.width="100%",this._classNames=new bd(this.element),this._classNames.setClassNames((i=t.className)!==null&&i!==void 0?i:""),e.appendChild(this.element),this.gridview=new Td(!!t.proportionalLayout,t.styles,t.orientation,t.locked,t.margin),this.gridview.locked=!!t.locked,this.element.appendChild(this.gridview.element),this.layout(0,0,!0),this.addDisposables(this.gridview.onDidMaximizedNodeChange(r=>{this._onDidMaximizedChange.fire({panel:r.view,isMaximized:r.isMaximized})}),this.gridview.onDidViewVisibilityChange(()=>this._onDidViewVisibilityChangeMicroTaskQueue.fire()),this.onDidViewVisibilityChangeMicroTaskQueue(()=>{this.forceRelayout()}),ee.from(()=>{this.element.remove()}),this.gridview.onDidChange(()=>{this._bufferOnDidLayoutChange.fire("geometry")}),Ke.any(this.onDidAdd,this.onDidRemove)(()=>{this._bufferOnDidLayoutChange.fire("structure")}),this.onDidActiveChange(()=>{this._bufferOnDidLayoutChange.fire("activePanel")}),this.onDidMaximizedChange(()=>{this._bufferOnDidLayoutChange.fire("geometry")}),this._onDidMaximizedChange,this._onDidViewVisibilityChangeMicroTaskQueue,this._bufferOnDidLayoutChange)}setVisible(e,t){this.gridview.setViewVisible(_e(e.element),t),this._bufferOnDidLayoutChange.fire("geometry")}isVisible(e){return this.gridview.isViewVisible(_e(e.element))}updateOptions(e){if("proportionalLayout"in e){var t;this.gridview.proportionalLayout=(t=e.proportionalLayout)!==null&&t!==void 0?t:!0}if(e.orientation&&(this.gridview.orientation=e.orientation),"styles"in e,"disableAutoResizing"in e){var i;this.disableResizing=(i=e.disableAutoResizing)!==null&&i!==void 0?i:!1}if("locked"in e){var r;this.locked=(r=e.locked)!==null&&r!==void 0?r:!1}if("margin"in e){var o;this.gridview.margin=(o=e.margin)!==null&&o!==void 0?o:0}if("className"in e){var s;this._classNames.setClassNames((s=e.className)!==null&&s!==void 0?s:"")}}maximizeGroup(e){this.gridview.maximizeView(e),this.doSetGroupActive(e)}isMaximizedGroup(e){return this.gridview.maximizedView()===e}exitMaximizedGroup(){this.gridview.exitMaximizedView()}hasMaximizedGroup(){return this.gridview.hasMaximizedView()}doAddGroup(e,t=[0],i,r=this.gridview){r.addView(e,i??Le.Distribute,t),this._onDidAdd.fire(e)}doRemoveGroup(e,t){if(!this._groups.has(e.id))throw new Error("invalid operation");let i=this._groups.get(e.id),r=this.gridview.remove(e,Le.Distribute);if(i&&!t?.skipDispose&&(i.disposable.dispose(),i.value.dispose(),this._groups.delete(e.id),this._onDidRemove.fire(e)),!t?.skipActive&&this._activeGroup===e){let o=Array.from(this._groups.values());this.doSetGroupActive(o.length>0?o[0].value:void 0)}return r}getPanel(e){var t;return(t=this._groups.get(e))===null||t===void 0?void 0:t.value}doSetGroupActive(e){this._activeGroup!==e&&(this._activeGroup&&this._activeGroup.setActive(!1),e&&e.setActive(!0),this._activeGroup=e,this._onDidActiveChange.fire(e))}removeGroup(e){this.doRemoveGroup(e)}activateNext(e){var t,i;if((t=e)!==null&&t!==void 0||(e={}),!e.group){if(!this.activeGroup)return;e.group=this.activeGroup}let r=_e(e.group.element),o=(i=this.gridview.next(r))===null||i===void 0?void 0:i.view;this.doSetGroupActive(o)}activatePrevious(e){var t,i;if((t=e)!==null&&t!==void 0||(e={}),!e.group){if(!this.activeGroup)return;e.group=this.activeGroup}let r=_e(e.group.element),o=(i=this.gridview.previous(r))===null||i===void 0?void 0:i.view;this.doSetGroupActive(o)}forceRelayout(){this.layout(this.width,this.height,!0)}layout(e,t,i){(i||e!==this.width||t!==this.height)&&(this.gridview.element.style.height=`${t}px`,this.gridview.element.style.width=`${e}px`,this.gridview.layout(e,t))}dispose(){this._onDidActiveChange.dispose(),this._onDidAdd.dispose(),this._onDidRemove.dispose();for(let e of this.groups)e.dispose();this.gridview.dispose(),super.dispose()}};function Mi(e){"@babel/helpers - typeof";return Mi=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Mi(e)}function Ap(e,t){if(Mi(e)!="object"||!e)return e;var i=e[Symbol.toPrimitive];if(i!==void 0){var r=i.call(e,t||"default");if(Mi(r)!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function Ip(e){var t=Ap(e,"string");return Mi(t)=="symbol"?t:t+""}function Gp(e,t,i){return(t=Ip(t))in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}function ja(e,t){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable})),i.push.apply(i,r)}return i}function j(e){for(var t=1;t<arguments.length;t++){var i=arguments[t]!=null?arguments[t]:{};t%2?ja(Object(i),!0).forEach(function(r){Gp(e,r,i[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):ja(Object(i)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(i,r))})}return e}function Mp(e,t){return e==="center"?`Tab into ${t}`:`Split ${e} of ${t}`}function Op(e,t){return e==="center"?`docked into ${t}`:`split ${e} of ${t}`}var Cr={panelOpened:e=>`${e} opened`,panelClosed:e=>`${e} closed`,groupMaximized:e=>`${e} maximized`,groupRestored:e=>`${e} restored`,groupFloated:e=>`${e} floated`,groupDocked:e=>`${e} docked`,groupPoppedOut:e=>`${e} opened in a new window`,closeTab:e=>`Close ${e}`,closeTabPlain:()=>"Close",movePickTarget:(e,t,i,r)=>`Moving ${e}. Target ${t}, ${i} of ${r}. Enter to choose where, Escape to cancel.`,movePickEdge:(e,t)=>`${Mp(e,t)}. Arrows to change, Enter to confirm, Escape to go back.`,moveCommitted:(e,t,i)=>`${e} ${Op(i,t)}.`,moveCancelled:()=>"Move cancelled.",moveNotAllowed:()=>"That move is not allowed.",moveFloated:e=>`${e} floated.`};function zd(e){return e?j(j({},Cr),e):Cr}var ds=class{get id(){return this.component.id}get width(){return this.component.width}get height(){return this.component.height}get minimumHeight(){return this.component.minimumHeight}get maximumHeight(){return this.component.maximumHeight}get minimumWidth(){return this.component.minimumWidth}get maximumWidth(){return this.component.maximumWidth}get size(){return this.component.size}get tabGroupColors(){return this.component.tabGroupColorPalette.entries()}get totalPanels(){return this.component.totalPanels}get onDidActiveGroupChange(){return this.component.onDidActiveGroupChange}get onDidAddGroup(){return this.component.onDidAddGroup}get onDidRemoveGroup(){return this.component.onDidRemoveGroup}get onDidActivePanelChange(){return this.component.onDidActivePanelChange}get onDidPanelPinnedChange(){return this.component.onDidPanelPinnedChange}get onDidAddPanel(){return this.component.onDidAddPanel}get onDidRemovePanel(){return this.component.onDidRemovePanel}get onDidMovePanel(){return this.component.onDidMovePanel}get onDidLayoutFromJSON(){return this.component.onDidLayoutFromJSON}get onDidLayoutChange(){return this.component.onDidLayoutChange}get onDidDrop(){return this.component.onDidDrop}get onWillDrop(){return this.component.onWillDrop}get onWillMutateLayout(){return this.component.onWillMutateLayout}get onDidMutateLayout(){return this.component.onDidMutateLayout}get onWillShowOverlay(){return this.component.onWillShowOverlay}get onWillDragGroup(){return this.component.onWillDragGroup}get onWillDragPanel(){return this.component.onWillDragPanel}get onUnhandledDragOver(){return this.component.onUnhandledDragOver}get dndCapabilities(){return this.component.dndCapabilities}get onDidPopoutGroupSizeChange(){return this.component.onDidPopoutGroupSizeChange}get onDidPopoutGroupPositionChange(){return this.component.onDidPopoutGroupPositionChange}get onDidAddPopoutGroup(){return this.component.onDidAddPopoutGroup}get onDidRemovePopoutGroup(){return this.component.onDidRemovePopoutGroup}get onDidOpenPopoutWindowFail(){return this.component.onDidOpenPopoutWindowFail}get onWillClosePopoutWindow(){return this.component.onWillClosePopoutWindow}getPopouts(){return this.component.getPopouts()}get onDidCreateTabGroup(){return this.component.onDidCreateTabGroup}get onDidDestroyTabGroup(){return this.component.onDidDestroyTabGroup}get onDidAddPanelToTabGroup(){return this.component.onDidAddPanelToTabGroup}get onDidRemovePanelFromTabGroup(){return this.component.onDidRemovePanelFromTabGroup}get onDidTabGroupChange(){return this.component.onDidTabGroupChange}get onDidTabGroupCollapsedChange(){return this.component.onDidTabGroupCollapsedChange}get panels(){return this.component.panels}get groups(){return this.component.groups}adjacentGroupInDirection(e,t){return this.component.adjacentGroupInDirection(e,t)}get activePanel(){return this.component.activePanel}get activeGroup(){return this.component.activeGroup}get messages(){return zd(this.component.options.messages)}constructor(e){this.component=e}focus(){this.component.focus()}getPanel(e){return this.component.getGroupPanel(e)}layout(e,t,i=!1){this.component.layout(e,t,i)}addPanel(e){return this.component.withOrigin("api",()=>this.component.addPanel(e))}removePanel(e,t){this.component.withOrigin("api",()=>this.component.removePanel(e,t))}addGroup(e){return this.component.withOrigin("api",()=>this.component.addGroup(e))}serializeGroup(e){return this.component.serializeGroup(e)}addGroupFromJSON(e,t){return this.component.withOrigin("api",()=>this.component.addGroupFromJSON(e,t))}addPanelFromJSON(e,t){return this.component.withOrigin("api",()=>this.component.addPanelFromJSON(e,t))}closeAllGroups(){return this.component.withOrigin("api",()=>this.component.closeAllGroups())}removeGroup(e){this.component.withOrigin("api",()=>this.component.removeGroup(e))}getGroup(e){return this.component.getPanel(e)}addFloatingGroup(e,t){return this.component.withOrigin("api",()=>this.component.addFloatingGroup(e,t))}fromJSON(e,t){this.component.withOrigin("api",()=>this.component.fromJSON(e,t))}toJSON(){return this.component.toJSON()}clear(){this.component.withOrigin("api",()=>this.component.clear())}undo(){this.component.undo()}redo(){this.component.redo()}get canUndo(){return this.component.canUndo}get canRedo(){return this.component.canRedo}clearHistory(){this.component.clearHistory()}get onDidChangeHistory(){return this.component.onDidChangeHistory}get smartGuidesEnabled(){return this.component.smartGuidesEnabled}setSmartGuidesEnabled(e){this.component.setSmartGuidesEnabled(e)}updateSmartGuidesOptions(e){this.component.updateSmartGuidesOptions(e)}get onDidSnapFloat(){return this.component.onDidSnapFloat}get onDidSnapTogether(){return this.component.onDidSnapTogether}get popoutRestorationPromise(){return this.component.popoutRestorationPromise}activateNext(e){this.component.activateNext(e)}activatePrevious(e){this.component.activatePrevious(e)}moveToNext(e){this.activateNext(e)}moveToPrevious(e){this.activatePrevious(e)}maximizeGroup(e){this.component.withOrigin("api",()=>this.component.maximizeGroup(e.group))}hasMaximizedGroup(){return this.component.hasMaximizedGroup()}exitMaximizedGroup(){this.component.withOrigin("api",()=>this.component.exitMaximizedGroup())}get onDidMaximizedGroupChange(){return this.component.onDidMaximizedGroupChange}addPopoutGroup(e,t){return this.component.withOrigin("api",()=>this.component.addPopoutGroup(e,t))}addEdgeGroup(e,t){return this.component.addEdgeGroup(e,t)}revealEdgeGroupWithData(e,t,i){this.component.revealEdgeGroupWithData(e,t,i)}getEdgeGroup(e){return this.component.getEdgeGroup(e)}setEdgeGroupVisible(e,t){this.component.setEdgeGroupVisible(e,t)}isEdgeGroupVisible(e){return this.component.isEdgeGroupVisible(e)}removeEdgeGroup(e){this.component.removeEdgeGroup(e)}pinEdgeGroup(e){this.component.pinEdgeGroup(e)}autoHideEdgeGroup(e){this.component.autoHideEdgeGroup(e)}peekEdgeGroup(e,t){this.component.peekEdgeGroup(e,t)}updateOptions(e){this.component.updateOptions(e)}_getGroupModel(e){let t=this.component.getPanel(e);if(!t)throw new Error(`dockview: group '${e}' not found`);return t.model}createTabGroup(e){let t=this._getGroupModel(e.groupId);return this.component.withOrigin("api",()=>t.createTabGroup({label:e.label,color:e.color,componentParams:e.componentParams}))}dissolveTabGroup(e){let t=this._getGroupModel(e.groupId);this.component.withOrigin("api",()=>t.dissolveTabGroup(e.tabGroupId))}addPanelToTabGroup(e){let t=this._getGroupModel(e.groupId);this.component.withOrigin("api",()=>t.addPanelToTabGroup(e.tabGroupId,e.panelId,e.index))}removePanelFromTabGroup(e){let t=this._getGroupModel(e.groupId);this.component.withOrigin("api",()=>t.removePanelFromTabGroup(e.panelId))}getTabGroups(e){return this._getGroupModel(e.groupId).getTabGroups()}getTabGroupForPanel(e){return this._getGroupModel(e.groupId).getTabGroupForPanel(e.panelId)}moveTabGroup(e){this._getGroupModel(e.groupId).moveTabGroup(e.tabGroupId,e.index)}dispose(){this.component.dispose()}},Ad=class extends V{constructor(e,t){super(),this.element=e,this.callbacks=t,this.target=null,this.registerListeners()}onDragEnter(e){this.target=e.target,this.callbacks.onDragEnter(e)}onDragOver(e){e.preventDefault(),this.callbacks.onDragOver&&this.callbacks.onDragOver(e)}onDragLeave(e){this.target===e.target&&(this.target=null,this.callbacks.onDragLeave(e))}onDragEnd(e){this.target=null,this.callbacks.onDragEnd(e)}onDrop(e){this.callbacks.onDrop(e)}registerListeners(){this.addDisposables($(this.element,"dragenter",e=>{this.onDragEnter(e)},!0)),this.addDisposables($(this.element,"dragover",e=>{this.onDragOver(e)},!0)),this.addDisposables($(this.element,"dragleave",e=>{this.onDragLeave(e)})),this.addDisposables($(this.element,"dragend",e=>{this.onDragEnd(e)})),this.addDisposables($(this.element,"drop",e=>{this.onDrop(e)}))}},Lp={value:50,type:"percentage"},Rp=100,Np=100;function is(){let e=document.createElement("div");e.className="dv-drop-target-dropzone";let t=document.createElement("div");return t.className="dv-drop-target-selection",e.appendChild(t),{dropzone:e,selection:t}}function Id(e,t,i,r){var o,s,n;let a=(o=r?.smallWidthBoundary)!==null&&o!==void 0?o:Rp,l=(s=r?.smallHeightBoundary)!==null&&s!==void 0?s:Np,d=t<a,h=i<l,c=e==="left",u=e==="right",p=e==="top",v=e==="bottom",g=!d&&u,m=!d&&c,f=!h&&p,S=!h&&v,w=1,D=(n=r?.size)!==null&&n!==void 0?n:Lp;return D.type==="percentage"?w=le(D.value,0,100)/100:((g||m)&&(w=le(D.value,0,t)/t),(f||S)&&(w=le(D.value,0,i)/i)),{isSmallX:d,isSmallY:h,isLeft:c,isRight:u,isTop:p,isBottom:v,rightClass:g,leftClass:m,topClass:f,bottomClass:S,size:w}}function Gd(e,t,i,r,o){let s=Id(t,i,r,o),{rightClass:n,leftClass:a,topClass:l,bottomClass:d,size:h}=s,c={top:"0px",left:"0px",width:"100%",height:"100%"};n?(c.left=`${100*(1-h)}%`,c.width=`${100*h}%`):a?c.width=`${100*h}%`:l?c.height=`${100*h}%`:d&&(c.top=`${100*(1-h)}%`,c.height=`${100*h}%`),s.isSmallX&&s.isLeft&&(c.width="4px"),s.isSmallX&&s.isRight&&(c.left=`${i-4}px`,c.width="4px"),s.isSmallY&&s.isTop&&(c.height="4px"),s.isSmallY&&s.isBottom&&(c.top=`${r-4}px`,c.height="4px"),e.style.top=c.top,e.style.left=c.left,e.style.width=c.width,e.style.height=c.height,e.style.visibility="visible",(!e.style.transform||e.style.transform==="")&&(e.style.transform="translate3d(0, 0, 0)");let u=s.isSmallX&&(s.isLeft||s.isRight)||s.isSmallY&&(s.isTop||s.isBottom);B(e,"dv-drop-target-small-vertical",s.isSmallY),B(e,"dv-drop-target-small-horizontal",s.isSmallX),B(e,"dv-drop-target-selection-line",u),B(e,"dv-drop-target-left",s.isLeft),B(e,"dv-drop-target-right",s.isRight),B(e,"dv-drop-target-top",s.isTop),B(e,"dv-drop-target-bottom",s.isBottom),B(e,"dv-drop-target-center",t==="center")}function Bp(e,t){let i=`${Math.round(t.top)}px`,r=`${Math.round(t.left)}px`,o=`${Math.round(t.width)}px`,s=`${Math.round(t.height)}px`;return e.style.top!==i||e.style.left!==r||e.style.width!==o||e.style.height!==s}function Wp(e,t){e.style.top=`${Math.round(t.top)}px`,e.style.left=`${Math.round(t.left)}px`,e.style.width=`${Math.round(t.width)}px`,e.style.height=`${Math.round(t.height)}px`,e.style.visibility="visible",(!e.style.transform||e.style.transform==="")&&(e.style.transform="translate3d(0, 0, 0)")}function Md(e){let t=Id(e.quadrant,e.width,e.height,e.overlayModel),{rightClass:i,leftClass:r,topClass:o,bottomClass:s,size:n}=t,a=e.outlineElement.getBoundingClientRect(),l=e.targetModel.getElements(void 0,e.outlineElement),d=l.root,h=l.overlay,c=d.getBoundingClientRect(),u=a.top-c.top,p=a.left-c.left,v={top:u,left:p,width:e.width,height:e.height};return i?(v.left=p+e.width*(1-n),v.width=e.width*n):r?v.width=e.width*n:o?v.height=e.height*n:s&&(v.top=u+e.height*(1-n),v.height=e.height*n),t.isSmallX&&t.isLeft&&(v.width=4),t.isSmallX&&t.isRight&&(v.left=p+e.width-4,v.width=4),t.isSmallY&&t.isTop&&(v.height=4),t.isSmallY&&t.isBottom&&(v.top=u+e.height-4,v.height=4),Bp(h,v)?(Wp(h,v),h.className=`dv-drop-target-anchor${e.className?` ${e.className}`:""}`,B(h,"dv-drop-target-left",t.isLeft),B(h,"dv-drop-target-right",t.isRight),B(h,"dv-drop-target-top",t.isTop),B(h,"dv-drop-target-bottom",t.isBottom),B(h,"dv-drop-target-anchor-line",t.isSmallX&&(t.isLeft||t.isRight)||t.isSmallY&&(t.isTop||t.isBottom)),B(h,"dv-drop-target-center",e.quadrant==="center"),l.changed&&(B(h,"dv-drop-target-anchor-container-changed",!0),setTimeout(()=>{B(h,"dv-drop-target-anchor-container-changed",!1)},10)),{boundsChanged:!0,targetChanged:l.changed}):{boundsChanged:!1,targetChanged:l.changed}}var Od=class extends ss{get nativeEvent(){return this.options.nativeEvent}get position(){return this.options.position}get edge(){return!!this.options.edge}get edgeGroup(){return!!this.options.edgeGroup}constructor(e){super(),this.options=e}};function Ja(e){switch(e){case"above":return"top";case"below":return"bottom";case"left":return"left";case"right":return"right";case"within":return"center";default:throw new Error(`invalid direction '${e}'`)}}function Hp(e){switch(e){case"top":return"above";case"bottom":return"below";case"left":return"left";case"right":return"right";case"center":return"within";default:throw new Error(`invalid position '${e}'`)}}var $p={value:20,type:"percentage"},ls=class zi extends V{get disabled(){return this._disabled}set disabled(t){this._disabled=t}get state(){return this._state}constructor(t,i){super(),this.element=t,this.options=i,this._edge=!1,this._edgeGroup=!1,this._onDrop=new E,this.onDrop=this._onDrop.event,this._onWillShowOverlay=new E,this.onWillShowOverlay=this._onWillShowOverlay.event,this._disabled=!1,this._acceptedTargetZonesSet=new Set(this.options.acceptedTargetZones),this.dnd=new Ad(this.element,{onDragEnter:()=>{var r,o;(r=(o=this.options).getOverrideTarget)===null||r===void 0||(r=r.call(o))===null||r===void 0||r.getElements()},onDragOver:r=>{var o,s,n,a,l,d,h;if(this._disabled){this.clearOwnOverlay();return}zi.ACTUAL_TARGET=this;let c=(o=(s=this.options).getOverrideTarget)===null||o===void 0?void 0:o.call(s);if(this._acceptedTargetZonesSet.size===0){this.clearOwnOverlay();return}let u=(n=(a=(l=this.options).getOverlayOutline)===null||a===void 0?void 0:a.call(l))!==null&&n!==void 0?n:this.element,p=u.offsetWidth,v=u.offsetHeight;if(p===0||v===0)return;let g=u.getBoundingClientRect(),m=((d=r.clientX)!==null&&d!==void 0?d:0)-g.left,f=((h=r.clientY)!==null&&h!==void 0?h:0)-g.top,S=this.resolvePosition(m,f,p,v,r);if(this.isAlreadyUsed(r)){this.removeDropTarget();return}if(S===null){this.clearOwnOverlay();return}let w=S.position;if(!this.options.canDisplayOverlay(r,w)){this.clearOwnOverlay();return}let D=new Od({nativeEvent:r,position:w,edge:S.edge,edgeGroup:S.edgeGroup});if(this._onWillShowOverlay.fire(D),D.defaultPrevented){this.clearOwnOverlay();return}if(this.markAsUsed(r),S.edge){this.clearOwnOverlay(),this._state=w,this._edge=!0,this._edgeGroup=S.edgeGroup;return}if(this._edge=!1,this._edgeGroup=!1,!c){if(!this.targetElement){let T=is();this.targetElement=T.dropzone,this.overlayElement=T.selection,this._state="center",u.classList.add("dv-drop-target"),u.append(this.targetElement)}}this.toggleClasses(w,p,v),this._state=w},onDragLeave:()=>{var r,o;let s=(r=(o=this.options).getOverrideTarget)===null||r===void 0?void 0:r.call(o);if(s){var n;this._state=void 0,this._edge=!1,this._edgeGroup=!1,(n=s.scheduleClear)===null||n===void 0||n.call(s);return}this.removeDropTarget()},onDragEnd:r=>{var o,s;let n=(o=(s=this.options).getOverrideTarget)===null||o===void 0?void 0:o.call(s);n&&zi.ACTUAL_TARGET===this&&this._state&&(r.stopPropagation(),this._onDrop.fire({position:this._state,nativeEvent:r,edge:this._edge,edgeGroup:this._edgeGroup})),this.removeDropTarget(),n?.clear()},onDrop:r=>{var o,s;r.preventDefault();let n=this._state,a=this._edge,l=this._edgeGroup;this.removeDropTarget(),(o=(s=this.options).getOverrideTarget)===null||o===void 0||(o=o.call(s))===null||o===void 0||o.clear(),n&&(r.stopPropagation(),this._onDrop.fire({position:n,nativeEvent:r,edge:a,edgeGroup:l}))}}),this.addDisposables(this._onDrop,this._onWillShowOverlay,this.dnd)}setTargetZones(t){this._acceptedTargetZonesSet=new Set(t)}setOverlayModel(t){this.options.overlayModel=t}dispose(){this.removeDropTarget(),super.dispose()}markAsUsed(t){t[zi.USED_EVENT_ID]=!0}isAlreadyUsed(t){let i=t[zi.USED_EVENT_ID];return typeof i=="boolean"&&i}toggleClasses(t,i,r){var o,s;let n=(o=(s=this.options).getOverrideTarget)===null||o===void 0?void 0:o.call(s);if(n){var a,l,d;Md({outlineElement:(a=(l=(d=this.options).getOverlayOutline)===null||l===void 0?void 0:l.call(d))!==null&&a!==void 0?a:this.element,targetModel:n,quadrant:t,width:i,height:r,overlayModel:this.options.overlayModel,className:this.options.className});return}this.overlayElement&&Gd(this.overlayElement,t,i,r,this.options.overlayModel)}resolvePosition(t,i,r,o,s){var n,a;let l=(n=(a=this.options).getPositionResolver)===null||n===void 0?void 0:n.call(a);if(l){let h=l.resolve({x:t,y:i,width:r,height:o,zones:this._acceptedTargetZonesSet,event:s});return h?{position:h.position,edge:!!h.edge,edgeGroup:!!h.edgeGroup}:null}let d=this.calculateQuadrant(this._acceptedTargetZonesSet,t,i,r,o);return d?{position:d,edge:!1,edgeGroup:!1}:null}calculateQuadrant(t,i,r,o,s){var n,a;let l=(n=(a=this.options.overlayModel)===null||a===void 0?void 0:a.activationSize)!==null&&n!==void 0?n:$p;return l.type==="percentage"?Ld(t,i,r,o,s,l.value):hs(t,i,r,o,s,l.value)}clearOwnOverlay(){let t=this._state!==void 0;if(this.removeDropTarget(),t){var i,r;(i=(r=this.options).getOverrideTarget)===null||i===void 0||(i=i.call(r))===null||i===void 0||i.clear()}}removeDropTarget(){if(this._state=void 0,this._edge=!1,this._edgeGroup=!1,this.targetElement){var t;(t=this.targetElement.parentElement)===null||t===void 0||t.classList.remove("dv-drop-target"),this.targetElement.remove(),this.targetElement=void 0,this.overlayElement=void 0}}showOverlay(t){var i,r,o,s,n;let a=(i=(r=this.options).getOverrideTarget)===null||i===void 0?void 0:i.call(r),l=(o=(s=(n=this.options).getOverlayOutline)===null||s===void 0?void 0:s.call(n))!==null&&o!==void 0?o:this.element,d=l.offsetWidth,h=l.offsetHeight;if(!a&&!this.targetElement){let c=is();this.targetElement=c.dropzone,this.overlayElement=c.selection,l.classList.add("dv-drop-target"),l.append(this.targetElement)}this.toggleClasses(t,d,h),this._state=t}clearOverlay(){var t,i;this.removeDropTarget(),(t=(i=this.options).getOverrideTarget)===null||t===void 0||(t=t.call(i))===null||t===void 0||t.clear(),this._state=void 0}};ls.USED_EVENT_ID="__dockview_droptarget_event_is_used__";function Ld(e,t,i,r,o,s){let n=100*t/r,a=100*i/o;return e.has("left")&&n<s?"left":e.has("right")&&n>100-s?"right":e.has("top")&&a<s?"top":e.has("bottom")&&a>100-s?"bottom":e.has("center")?"center":null}function hs(e,t,i,r,o,s){let n=a=>typeof s=="number"?s:s[a];return e.has("left")&&t<n("left")?"left":e.has("right")&&t>r-n("right")?"right":e.has("top")&&i<n("top")?"top":e.has("bottom")&&i>o-n("bottom")?"bottom":e.has("center")?"center":null}function Fp(e,t,i){var r,o,s;kt(t,"dv-dragged"),t.style.top="-9999px",t.style.position="absolute",(i?.owner?yd(i.owner):((r=i?.ownerDocument)!==null&&r!==void 0?r:document).body).appendChild(t),e.setDragImage(t,(o=i?.x)!==null&&o!==void 0?o:0,(s=i?.y)!==null&&s!==void 0?s:0),setTimeout(()=>{Ct(t,"dv-dragged"),t.remove()},0)}var kr=class Ai extends V{static getInstance(){var t;return(t=Ai._instance)!==null&&t!==void 0||(Ai._instance=new Ai),Ai._instance}constructor(){super(),this._targets=new Set,this._targetByElement=new Map,this._onDragStart=new E,this.onDragStart=this._onDragStart.event,this._onDragMove=new E,this.onDragMove=this._onDragMove.event,this._onDragEnd=new E,this.onDragEnd=this._onDragEnd.event,this.addDisposables(this._onDragStart,this._onDragMove,this._onDragEnd)}get active(){return this._active}registerTarget(t){return this._targets.add(t),this._targetByElement.set(t.element,t),{dispose:()=>{this._targets.delete(t),this._targetByElement.get(t.element)===t&&this._targetByElement.delete(t.element),this._currentTarget===t&&(this._currentTarget=void 0)}}}beginDrag(t){var i,r,o,s;this._active&&this.cancel();let{pointerEvent:n,source:a}=t,l=t.getData();this._active={pointerId:n.pointerId,startX:n.clientX,startY:n.clientY,source:a},this._lastPointerEvent=n,this._onDragMoveCallback=t.onDragMove,this._onDragEndCallback=t.onDragEnd,this._dataDisposable=l,this._ghost=t.ghost,this._iframeShield=Gi((i=a.ownerDocument)!==null&&i!==void 0?i:document),this._selectionShield=_d((r=a.ownerDocument)!==null&&r!==void 0?r:document);let d={clientX:n.clientX,clientY:n.clientY,pointerEvent:n};this._onDragStart.fire(d);let h=(o=(s=a.ownerDocument)===null||s===void 0?void 0:s.defaultView)!==null&&o!==void 0?o:globalThis.window;this._moveListener=$(h,"pointermove",c=>{var u;c.pointerId===((u=this._active)===null||u===void 0?void 0:u.pointerId)&&this._handleMove(c)}),this._upListener=$(h,"pointerup",c=>{var u;c.pointerId===((u=this._active)===null||u===void 0?void 0:u.pointerId)&&this._handleEnd(c,!0)}),this._cancelListener=$(h,"pointercancel",c=>{var u;c.pointerId===((u=this._active)===null||u===void 0?void 0:u.pointerId)&&this._handleEnd(c,!1)})}cancel(){var t,i;if(!this._active)return;let r=this._onDragEndCallback,o=this._lastPointerEvent;if((t=this._currentTarget)===null||t===void 0||t.handleDragLeave(),this._teardown(),(i=this._dataDisposable)===null||i===void 0||i.dispose(),this._dataDisposable=void 0,o){let s={clientX:o.clientX,clientY:o.clientY,pointerEvent:o};r?.(s,!1),this._onDragEnd.fire(s)}}_findTargetUnder(t,i){let r=(this._active?yr(this._active.source):document).elementsFromPoint(t,i);for(let s of r){let n=s;for(;n;){var o;let a=this._targetByElement.get(n);if(a&&!(!((o=a.isHitTestTransparent)===null||o===void 0)&&o.call(a)))return a;n=n.parentElement}}}_handleMove(t){var i,r;this._lastPointerEvent=t,(i=this._ghost)===null||i===void 0||i.update(t.clientX,t.clientY);let o={clientX:t.clientX,clientY:t.clientY,pointerEvent:t},s=this._findTargetUnder(t.clientX,t.clientY);if(s!==this._currentTarget){var n;(n=this._currentTarget)===null||n===void 0||n.handleDragLeave(),this._currentTarget=s}s&&s.handleDragOver(o),(r=this._onDragMoveCallback)===null||r===void 0||r.call(this,o),this._onDragMove.fire(o)}_handleEnd(t,i){let r={clientX:t.clientX,clientY:t.clientY,pointerEvent:t};try{if(i&&this._currentTarget)this._currentTarget.handleDrop(r);else{var o;(o=this._currentTarget)===null||o===void 0||o.handleDragLeave()}}finally{let s=this._onDragEndCallback,n=this._dataDisposable;this._teardown(),this._dataDisposable=void 0,setTimeout(()=>n?.dispose(),0),s?.(r,i),this._onDragEnd.fire(r)}}_teardown(){var t,i,r,o,s,n;this._currentTarget=void 0,this._active=void 0,this._lastPointerEvent=void 0,this._onDragMoveCallback=void 0,this._onDragEndCallback=void 0,(t=this._ghost)===null||t===void 0||t.dispose(),this._ghost=void 0,(i=this._iframeShield)===null||i===void 0||i.release(),this._iframeShield=void 0,(r=this._selectionShield)===null||r===void 0||r.release(),this._selectionShield=void 0,(o=this._moveListener)===null||o===void 0||o.dispose(),(s=this._upListener)===null||s===void 0||s.dispose(),(n=this._cancelListener)===null||n===void 0||n.dispose(),this._moveListener=void 0,this._upListener=void 0,this._cancelListener=void 0}},Vp={value:20,type:"percentage"},qp=class extends V{get disabled(){return this._disabled}set disabled(e){this._disabled=e,e&&this._removeOverlay()}get state(){return this._state}constructor(e,t){super(),this.element=e,this.options=t,this._edge=!1,this._edgeGroup=!1,this._onDrop=new E,this.onDrop=this._onDrop.event,this._onWillShowOverlay=new E,this.onWillShowOverlay=this._onWillShowOverlay.event,this._disabled=!1,this._acceptedTargetZonesSet=new Set(t.acceptedTargetZones);let i={element:this.element,handleDragOver:r=>this._onDragOver(r),handleDragLeave:()=>this._onDragLeave(),handleDrop:r=>this._onDropEvent(r),isHitTestTransparent:t.isHitTestTransparent};this.addDisposables(this._onDrop,this._onWillShowOverlay,kr.getInstance().registerTarget(i))}clearOverlay(){this._clearOwnOverlay()}setTargetZones(e){this._acceptedTargetZonesSet=new Set(e)}setOverlayModel(e){this.options.overlayModel=e}dispose(){this._removeOverlay(),super.dispose()}_onDragOver(e){var t,i,r,o,s;if(this._disabled){this._clearOwnOverlay();return}let n=(t=(i=this.options).getOverrideTarget)===null||t===void 0?void 0:t.call(i);if(this._acceptedTargetZonesSet.size===0){this._clearOwnOverlay();return}let a=(r=(o=(s=this.options).getOverlayOutline)===null||o===void 0?void 0:o.call(s))!==null&&r!==void 0?r:this.element,l=a.offsetWidth,d=a.offsetHeight;if(l===0||d===0)return;let h=a.getBoundingClientRect(),c=e.clientX-h.left,u=e.clientY-h.top,p=this._resolvePosition(c,u,l,d,e.pointerEvent);if(p===null){this._clearOwnOverlay();return}let v=p.position;if(!this.options.canDisplayOverlay(e.pointerEvent,v)){this._clearOwnOverlay();return}let g=new Od({nativeEvent:e.pointerEvent,position:v,edge:p.edge,edgeGroup:p.edgeGroup});if(this._onWillShowOverlay.fire(g),g.defaultPrevented){this._clearOwnOverlay();return}if(p.edge){this._clearOwnOverlay(),this._state=v,this._edge=!0,this._edgeGroup=p.edgeGroup;return}if(this._edge=!1,this._edgeGroup=!1,n){Md({outlineElement:a,targetModel:n,quadrant:v,width:l,height:d,overlayModel:this.options.overlayModel,className:this.options.className}),this._state=v;return}if(!this._targetElement){let m=is();this._targetElement=m.dropzone,this._overlayElement=m.selection,this._state="center",this.element.classList.add("dv-drop-target"),this.element.append(this._targetElement)}this._overlayElement&&Gd(this._overlayElement,v,l,d,this.options.overlayModel),this._state=v}_onDragLeave(){var e,t;let i=(e=(t=this.options).getOverrideTarget)===null||e===void 0?void 0:e.call(t);if(i){this._state=void 0,i.clear();return}this._removeOverlay()}_onDropEvent(e){var t,i;let r=this._state,o=this._edge,s=this._edgeGroup,n=(t=(i=this.options).getOverrideTarget)===null||t===void 0?void 0:t.call(i);this._removeOverlay(),n?.clear(),r&&this._onDrop.fire({position:r,nativeEvent:e.pointerEvent,edge:o,edgeGroup:s})}_resolvePosition(e,t,i,r,o){var s,n;let a=(s=(n=this.options).getPositionResolver)===null||s===void 0?void 0:s.call(n);if(a){let d=a.resolve({x:e,y:t,width:i,height:r,zones:this._acceptedTargetZonesSet,event:o});return d?{position:d.position,edge:!!d.edge,edgeGroup:!!d.edgeGroup}:null}let l=this._calculateQuadrant(e,t,i,r);return l?{position:l,edge:!1,edgeGroup:!1}:null}_calculateQuadrant(e,t,i,r){var o,s;let n=(o=(s=this.options.overlayModel)===null||s===void 0?void 0:s.activationSize)!==null&&o!==void 0?o:Vp;return n.type==="percentage"?Ld(this._acceptedTargetZonesSet,e,t,i,r,n.value):hs(this._acceptedTargetZonesSet,e,t,i,r,n.value)}_clearOwnOverlay(){let e=this._state!==void 0;if(this._removeOverlay(),e){var t,i;(t=(i=this.options).getOverrideTarget)===null||t===void 0||(t=t.call(i))===null||t===void 0||t.clear()}}_removeOverlay(){if(this._edge=!1,this._edgeGroup=!1,this._targetElement){var e;this._state=void 0,(e=this._targetElement.parentElement)===null||e===void 0||e.classList.remove("dv-drop-target"),this._targetElement.remove(),this._targetElement=void 0,this._overlayElement=void 0}else this._state=void 0}},Up=5,Kp=250,Yp=8,Xp=class extends V{constructor(e,t){var i;super(),this.element=e,this.options=t,this._disabled=!1,this._armed=!1,this._startX=0,this._startY=0,this._touchOnly=(i=t.touchOnly)!==null&&i!==void 0?i:!0,this.addDisposables($(this.element,"pointerdown",r=>{this._onPointerDown(r)}))}setDisabled(e){this._disabled=e,e&&this._cancelPending()}setTouchOnly(e){this._touchOnly!==e&&(this._touchOnly=e,e&&this._cancelPending())}_shouldHandle(e){var t,i;return!(this._disabled||this._touchOnly&&e.pointerType!=="touch"&&e.pointerType!=="pen"||e.pointerType==="mouse"&&e.button!==0||!((t=(i=this.options).isCancelled)===null||t===void 0)&&t.call(i,e))}_onPointerDown(e){var t,i,r,o,s,n;if(!this._shouldHandle(e))return;this._cancelPending(),this._selectionShield=_d((t=this.element.ownerDocument)!==null&&t!==void 0?t:document),this._pendingPointerId=e.pointerId,this._startX=e.clientX,this._startY=e.clientY,this._startEvent=e;let a=e.pointerType==="touch"||e.pointerType==="pen",l=this.options.touchInitiationDelay,d=(i=typeof l=="function"?l():l)!==null&&i!==void 0?i:Kp;this._armed=!a||d<=0,a&&d>0&&Number.isFinite(d)&&(this._armTimer=setTimeout(()=>{this._armTimer=void 0,this._armed=!0},d));let h=(r=this.options.threshold)!==null&&r!==void 0?r:Up,c=this.options.pressTolerance,u=(o=typeof c=="function"?c():c)!==null&&o!==void 0?o:Yp,p=(s=(n=this.element.ownerDocument)===null||n===void 0?void 0:n.defaultView)!==null&&s!==void 0?s:globalThis.window;this._pendingMoveListener=$(p,"pointermove",v=>{if(v.pointerId!==this._pendingPointerId)return;let g=v.clientX-this._startX,m=v.clientY-this._startY,f=Math.hypot(g,m);if(this._armed){f>=h&&this._beginDrag(v);return}f>u&&this._beginDrag(v)}),this._pendingUpListener=$(p,"pointerup",v=>{v.pointerId===this._pendingPointerId&&this._cancelPending()}),this._pendingCancelListener=$(p,"pointercancel",v=>{v.pointerId===this._pendingPointerId&&this._cancelPending()})}cancelPending(){this._cancelPending()}_cancelPending(){var e,t,i,r;(e=this._selectionShield)===null||e===void 0||e.release(),this._selectionShield=void 0,this._pendingPointerId=void 0,this._armTimer!==void 0&&(clearTimeout(this._armTimer),this._armTimer=void 0),this._armed=!1,(t=this._pendingMoveListener)===null||t===void 0||t.dispose(),(i=this._pendingUpListener)===null||i===void 0||i.dispose(),(r=this._pendingCancelListener)===null||r===void 0||r.dispose(),this._pendingMoveListener=void 0,this._pendingUpListener=void 0,this._pendingCancelListener=void 0,this._startEvent=void 0}_beginDrag(e){var t,i,r,o,s;let n=(t=this._startEvent)!==null&&t!==void 0?t:e;this._cancelPending();let a=n.defaultPrevented;if((i=(r=this.options).onDragStart)===null||i===void 0||i.call(r,n),n.defaultPrevented&&!a)return;let l=(o=(s=this.options).createGhost)===null||o===void 0?void 0:o.call(s,n);kr.getInstance().beginDrag({pointerEvent:e,source:this.element,getData:()=>this.options.getData(n),ghost:l,onDragMove:this.options.onDragMove,onDragEnd:this.options.onDragEnd})}dispose(){this._cancelPending(),super.dispose()}},jp=class{constructor(e){var t,i,r,o;this._disposed=!1,this.element=e.element,this.offsetX=(t=e.offsetX)!==null&&t!==void 0?t:0,this.offsetY=(i=e.offsetY)!==null&&i!==void 0?i:0;let s=e.owner?yd(e.owner):document.body,n;si(s)&&typeof this.element.showPopover=="function"&&(n=this.element.ownerDocument.createElement("div"),n.popover="manual",Object.assign(n.style,{inset:"auto",margin:"0",padding:"0",border:"0",background:"transparent",color:"inherit",overflow:"visible"}),n.appendChild(this.element),this.element.style.pointerEvents="none",this.element.style.transform="none"),this.container=(r=n)!==null&&r!==void 0?r:this.element;let a=this.container.style;a.position="fixed",a.left="0px",a.top="0px",a.pointerEvents="none",a.zIndex="99999",a.opacity=String((o=e.opacity)!==null&&o!==void 0?o:.8),a.willChange="transform",a.transform=`translate3d(${e.initialX-this.offsetX}px, ${e.initialY-this.offsetY}px, 0)`,s.appendChild(this.container),n?.showPopover()}update(e,t){this._disposed||(this.container.style.transform=`translate3d(${e-this.offsetX}px, ${t-this.offsetY}px, 0)`)}dispose(){this._disposed||(this._disposed=!0,this.element.remove(),this.container!==this.element&&this.container.remove())}},Jp=class extends V{constructor(e,t){super(),this.el=e,this.opts=t,this._dataDisposable=new Ee,this._pointerEventsDisposable=new Ee,this._disabled=!!t.disabled,this.addDisposables(this._dataDisposable,this._pointerEventsDisposable,$(this.el,"dragstart",i=>{var r,o,s,n,a,l,d;if(i.defaultPrevented||this._disabled||!((r=(o=this.opts).isCancelled)===null||r===void 0)&&r.call(o,i)){i.preventDefault();return}if((s=(n=this.opts).onDragStart)===null||s===void 0||s.call(n,i),i.defaultPrevented)return;let h=Gi((a=this.el.ownerDocument)!==null&&a!==void 0?a:document);this._pointerEventsDisposable.value={dispose:()=>h.release()},this.el.classList.add("dv-dragged"),setTimeout(()=>this.el.classList.remove("dv-dragged"),0),this._dataDisposable.value=this.opts.getData(i);let c=(l=(d=this.opts).createGhost)===null||l===void 0?void 0:l.call(d,i);if(c&&i.dataTransfer){var u,p,v;if(Fp(i.dataTransfer,c.element,{x:(u=c.offsetX)!==null&&u!==void 0?u:0,y:(p=c.offsetY)!==null&&p!==void 0?p:0,ownerDocument:(v=this.el.ownerDocument)!==null&&v!==void 0?v:void 0,owner:this.el}),c.dispose){let g=c.dispose;setTimeout(()=>g(),0)}}i.dataTransfer&&(i.dataTransfer.effectAllowed="move",i.dataTransfer.items.length===0&&i.dataTransfer.setData("text/plain",""))}),$(this.el,"dragend",i=>{var r,o;this._pointerEventsDisposable.dispose(),setTimeout(()=>this._dataDisposable.dispose(),0),(r=(o=this.opts).onDragEnd)===null||r===void 0||r.call(o,i)}))}setDisabled(e){this._disabled=e}setTouchOnly(e){}cancelPending(){}},Zp=class{constructor(){this.kind="html5"}createDropTarget(e,t){return new ls(e,t)}createDragSource(e,t){return new Jp(e,t)}},Qp=class{constructor(){this.kind="pointer"}createDropTarget(e,t){return new qp(e,t)}createDragSource(e,t){let i=t.createGhost?o=>{let s=t.createGhost(o);if(!s)return;let n=new jp({element:s.element,initialX:o.clientX,initialY:o.clientY,offsetX:s.offsetX,offsetY:s.offsetY,owner:e});if(s.dispose){let a=n.dispose.bind(n),l=s.dispose;n.dispose=()=>{a(),l()}}return n}:void 0,r=new Xp(e,{getData:t.getData,isCancelled:t.isCancelled,onDragStart:t.onDragStart,onDragEnd:t.onDragEnd?o=>t.onDragEnd(o.pointerEvent):void 0,createGhost:i,touchOnly:t.touchOnly,touchInitiationDelay:t.touchInitiationDelay,pressTolerance:t.pressTolerance,threshold:t.threshold});return t.disabled&&r.setDisabled(!0),r}},Lt=new Zp,ct=new Qp,O_=Object.keys({disableAutoResizing:void 0,disableDnd:void 0,className:void 0});var Rd=class extends ss{constructor(){super()}},ev=class extends V{get isFocused(){return this._isFocused}get isActive(){return this._isActive}get isVisible(){return this._isVisible}get width(){return this._width}get height(){return this._height}constructor(e,t){super(),this.id=e,this.component=t,this._isFocused=!1,this._isActive=!1,this._isVisible=!0,this._width=0,this._height=0,this._parameters={},this.panelUpdatesDisposable=new Ee,this._onDidDimensionChange=new E,this.onDidDimensionsChange=this._onDidDimensionChange.event,this._onDidChangeFocus=new E,this.onDidFocusChange=this._onDidChangeFocus.event,this._onWillFocus=new E,this.onWillFocus=this._onWillFocus.event,this._onDidVisibilityChange=new E,this.onDidVisibilityChange=this._onDidVisibilityChange.event,this._onWillVisibilityChange=new E,this.onWillVisibilityChange=this._onWillVisibilityChange.event,this._onDidActiveChange=new E,this.onDidActiveChange=this._onDidActiveChange.event,this._onActiveChange=new E,this.onActiveChange=this._onActiveChange.event,this._onDidParametersChange=new E,this.onDidParametersChange=this._onDidParametersChange.event,this.addDisposables(this.onDidFocusChange(i=>{this._isFocused=i.isFocused}),this.onDidActiveChange(i=>{this._isActive=i.isActive}),this.onDidVisibilityChange(i=>{this._isVisible=i.isVisible}),this.onDidDimensionsChange(i=>{this._width=i.width,this._height=i.height}),this.panelUpdatesDisposable,this._onDidDimensionChange,this._onDidChangeFocus,this._onDidVisibilityChange,this._onDidActiveChange,this._onWillFocus,this._onActiveChange,this._onWillFocus,this._onWillVisibilityChange,this._onDidParametersChange)}getParameters(){return this._parameters}initialize(e){this.panelUpdatesDisposable.value=this._onDidParametersChange.event(t=>{this._parameters=t,e.update({params:t})})}setVisible(e){this._onWillVisibilityChange.fire({isVisible:e})}setActive(){this._onActiveChange.fire()}updateParameters(e){this._onDidParametersChange.fire(e)}};var tv=class extends V{get element(){return this._element}get width(){return this._width}get height(){return this._height}get params(){var e;return(e=this._params)===null||e===void 0?void 0:e.params}constructor(e,t,i){super(),this.id=e,this.component=t,this.api=i,this._height=0,this._width=0,this._element=document.createElement("div"),this._element.tabIndex=-1,this._element.style.outline="none",this._element.style.height="100%",this._element.style.width="100%",this._element.style.overflow="hidden";let r=gd(this._element);this.addDisposables(this.api,r.onDidFocus(()=>{this.api._onDidChangeFocus.fire({isFocused:!0})}),r.onDidBlur(()=>{this.api._onDidChangeFocus.fire({isFocused:!1})}),r)}focus(){let e=new Rd;this.api._onWillFocus.fire(e),!e.defaultPrevented&&this._element.focus()}layout(e,t){this._width=e,this._height=t,this.api._onDidDimensionChange.fire({width:e,height:t}),this.part&&this._params&&this.part.update({params:this._params.params})}init(e){this._params=e,this.part=this.getComponent()}update(e){var t,i;this._params=j(j({},this._params),{},{params:j(j({},(t=this._params)===null||t===void 0?void 0:t.params),e.params)});for(let r of Object.keys(e.params))e.params[r]===void 0&&delete this._params.params[r];(i=this.part)===null||i===void 0||i.update({params:this._params.params})}toJSON(){var e,t;let i=(e=(t=this._params)===null||t===void 0?void 0:t.params)!==null&&e!==void 0?e:{};return{id:this.id,component:this.component,params:Object.keys(i).length>0?i:void 0}}dispose(){var e;this.api.dispose(),(e=this.part)===null||e===void 0||e.dispose(),super.dispose()}};var iv=0,rv=()=>`dv-tabpanel-${iv++}`,ov=class extends V{get element(){return this._element}get dimensions(){return this._dimensions}constructor(e,t){var i,r,o,s,n,a,l;super(),this.accessor=e,this.group=t,this.disposable=new Ee,this._onDidFocus=new E,this.onDidFocus=this._onDidFocus.event,this._onDidBlur=new E,this.onDidBlur=this._onDidBlur.event,this._onDidDimensionsChange=new E,this.onDidDimensionsChange=this._onDidDimensionsChange.event,this._element=document.createElement("div"),this._element.className="dv-content-container",this._element.tabIndex=-1,this._element.id=rv(),this._element.setAttribute("role","tabpanel"),this.addDisposables(this._onDidFocus,this._onDidBlur,this._onDidDimensionsChange);let d=()=>{var c;return(c=t.dropTargetContainer)===null||c===void 0?void 0:c.model},h=(c,u)=>this.group.canDisplayContentOverlay(c,u);this.dropTarget=new ls(this.element,{getOverlayOutline:()=>{var c;return((c=e.options.theme)===null||c===void 0?void 0:c.dndPanelOverlay)==="group"?this.element.parentElement:null},className:"dv-drop-target-content",acceptedTargetZones:["top","bottom","left","right","center"],canDisplayOverlay:h,getOverrideTarget:d,overlayModel:(i=(r=this.accessor).resolveDropOverlayModel)===null||i===void 0?void 0:i.call(r,"content"),getPositionResolver:()=>{var c;return(c=e.getDropPositionResolver)===null||c===void 0?void 0:c.call(e)}}),this.pointerDropTarget=ct.createDropTarget(this.element,{acceptedTargetZones:["top","bottom","left","right","center"],canDisplayOverlay:h,getOverlayOutline:()=>{var c;return((c=e.options.theme)===null||c===void 0?void 0:c.dndPanelOverlay)==="group"?this.element.parentElement:null},className:"dv-drop-target-content",getOverrideTarget:d,overlayModel:(o=(s=this.accessor).resolveDropOverlayModel)===null||o===void 0?void 0:o.call(s,"content"),getPositionResolver:()=>{var c;return(c=e.getDropPositionResolver)===null||c===void 0?void 0:c.call(e)}}),this.addDisposables(this.dropTarget,this.pointerDropTarget,(n=(a=(l=this.accessor).onDidOptionsChange)===null||a===void 0?void 0:a.call(l,()=>{var c,u,p;let v=(c=(u=(p=this.accessor).resolveDropOverlayModel)===null||u===void 0?void 0:u.call(p,"content"))!==null&&c!==void 0?c:{};this.dropTarget.setOverlayModel(v),this.pointerDropTarget.setOverlayModel(v)}))!==null&&n!==void 0?n:ee.NONE)}show(){this.element.style.display=""}hide(){this.element.style.display="none"}setLabelledBy(e){e?this._element.setAttribute("aria-labelledby",e):this._element.removeAttribute("aria-labelledby")}renderPanel(e,t){var i;let r=((i=t?.asActive)!==null&&i!==void 0?i:!0)||this.group.isPanelActive(e);if(r||this.panel===e){var o;if(((o=this.panel)===null||o===void 0?void 0:o.view.content.element.parentElement)===this._element){var s,n;this.panel.view.content.element.remove(),(s=(n=this.panel.view.content).onHide)===null||s===void 0||s.call(n)}this.panel=e}let a;switch(e.api.renderer){case"onlyWhenVisible":if(this.group.renderContainer.detatch(e),r){var l,d;this._element.appendChild(e.view.content.element),(l=(d=e.view.content).onShow)===null||l===void 0||l.call(d)}a=this._element;break;case"always":e.view.content.element.parentElement===this._element&&e.view.content.element.remove(),a=this.group.renderContainer.attach({panel:e,referenceContainer:this});break;default:throw new Error(`dockview: invalid renderer type '${e.api.renderer}'`)}if(r){let h=gd(a);this.focusTracker=h;let c=new V;c.addDisposables(h,h.onDidFocus(()=>this._onDidFocus.fire()),h.onDidBlur(()=>this._onDidBlur.fire())),this.disposable.value=c}}openPanel(e){this.panel!==e&&this.renderPanel(e)}layout(e,t){var i;((i=this._dimensions)===null||i===void 0?void 0:i.width)===e&&this._dimensions.height===t||(this._dimensions={width:e,height:t},this._onDidDimensionsChange.fire(this._dimensions))}closePanel(){if(this.panel&&this.panel.api.renderer==="onlyWhenVisible"){var e,t;this.panel.view.content.element.remove(),(e=(t=this.panel.view.content).onHide)===null||e===void 0||e.call(t)}this.panel=void 0}dispose(){this.disposable.dispose(),super.dispose()}refreshFocusState(){var e;!((e=this.focusTracker)===null||e===void 0)&&e.refreshState&&this.focusTracker.refreshState()}},cs=e=>{let t=document.createElementNS("http://www.w3.org/2000/svg","svg");t.setAttributeNS(null,"height",e.height),t.setAttributeNS(null,"width",e.width),t.setAttributeNS(null,"viewBox",e.viewbox),t.setAttributeNS(null,"aria-hidden","false"),t.setAttributeNS(null,"focusable","false"),t.classList.add("dv-svg");let i=document.createElementNS("http://www.w3.org/2000/svg","path");return i.setAttributeNS(null,"d",e.path),t.appendChild(i),t},sv=()=>cs({width:"11",height:"11",viewbox:"0 0 28 28",path:"M2.1 27.3L0 25.2L11.55 13.65L0 2.1L2.1 0L13.65 11.55L25.2 0L27.3 2.1L15.75 13.65L27.3 25.2L25.2 27.3L13.65 15.75L2.1 27.3Z"}),Nd=()=>cs({width:"11",height:"11",viewbox:"0 0 24 24",path:"M16 9V4h1c.55 0 1-.45 1-1s-.45-1-1-1H6c-.55 0-1 .45-1 1s.45 1 1 1h1v5c0 1.66-1.34 3-3 3v2h5.97v7l1 1 1-1v-7H19v-2c-1.66 0-3-1.34-3-3z"});var nv=()=>cs({width:"11",height:"11",viewbox:"0 0 15 25",path:"M2.15 24.1L0 21.95L9.9 12.05L0 2.15L2.15 0L14.2 12.05L2.15 24.1Z"}),av=500,dv=8,us=class extends V{constructor(e,t){super(),this.element=e,this.options=t,this._startX=0,this._startY=0,this.addDisposables($(this.element,"pointerdown",i=>{this._onPointerDown(i)}))}_onPointerDown(e){var t,i,r,o,s;if((!((t=this.options.touchOnly)!==null&&t!==void 0)||t)&&e.pointerType!=="touch"&&e.pointerType!=="pen")return;this._cancelPending(),this._pointerId=e.pointerId,this._startX=e.clientX,this._startY=e.clientY;let n=(i=this.options.delay)!==null&&i!==void 0?i:av,a=(r=this.options.tolerance)!==null&&r!==void 0?r:dv,l=(o=(s=this.element.ownerDocument)===null||s===void 0?void 0:s.defaultView)!==null&&o!==void 0?o:globalThis.window;this._timer=setTimeout(()=>{this._timer=void 0,this._cancelPending(),this._installContextMenuGuard(l),this._installClickGuard(l),this.options.onLongPress(e)},n),this._moveListener=$(l,"pointermove",d=>{if(d.pointerId!==this._pointerId)return;let h=d.clientX-this._startX,c=d.clientY-this._startY;Math.hypot(h,c)>a&&this._cancelPending()}),this._upListener=$(l,"pointerup",d=>{d.pointerId===this._pointerId&&this._cancelPending()}),this._cancelListener=$(l,"pointercancel",d=>{d.pointerId===this._pointerId&&this._cancelPending()})}_installContextMenuGuard(e){let t,i=setTimeout(()=>t?.dispose(),500);t=$(e,"contextmenu",r=>{r.preventDefault(),clearTimeout(i),t?.dispose()},{capture:!0})}_installClickGuard(e){let t,i=setTimeout(()=>t?.dispose(),500);t=$(e,"click",r=>{Xo(r,[this.element])&&(r.preventDefault(),r.stopPropagation()),clearTimeout(i),t?.dispose()},{capture:!0})}_cancelPending(){var e,t,i;this._timer!==void 0&&(clearTimeout(this._timer),this._timer=void 0),this._pointerId=void 0,(e=this._moveListener)===null||e===void 0||e.dispose(),(t=this._upListener)===null||t===void 0||t.dispose(),(i=this._cancelListener)===null||i===void 0||i.dispose(),this._moveListener=void 0,this._upListener=void 0,this._cancelListener=void 0}dispose(){this._cancelPending(),super.dispose()}};function et(e){if(e.disableDnd)return{html5:!1,pointer:!1,pointerHandlesMouse:!1};switch(e.dndStrategy){case"pointer":return{html5:!1,pointer:!0,pointerHandlesMouse:!0};case"html5":return{html5:!0,pointer:!1,pointerHandlesMouse:!1};default:return lv()?{html5:!1,pointer:!0,pointerHandlesMouse:!0}:{html5:!0,pointer:!0,pointerHandlesMouse:!1}}}function lv(){if(globalThis.window===void 0||!globalThis.matchMedia)return!1;let e=globalThis.matchMedia("(pointer: coarse)").matches,t=globalThis.matchMedia("(pointer: fine)").matches;return e&&!t}var hv=0,cv=()=>`dv-tab-${hv++}`,uv=class extends V{get element(){return this._element}constructor(e,t,i){var r,o,s,n,a,l,d,h;super(),this.panel=e,this.accessor=t,this.group=i,this.content=void 0,this.panelTransfer=oi.getInstance(),this._direction="horizontal",this._pinIndicator=void 0,this._onPointDown=new E,this.onPointerDown=this._onPointDown.event,this._onTabClick=new E,this.onTabClick=this._onTabClick.event,this._onDropped=new E,this.onDrop=this._onDropped.event,this._onDragStart=new E,this.onDragStart=this._onDragStart.event,this._onDragEnd=new E,this.onDragEnd=this._onDragEnd.event;let c=et(this.accessor.options);this._element=document.createElement("div"),this._element.className="dv-tab",this._element.tabIndex=-1,this._element.draggable=c.html5,this._element.id=cv(),this._element.setAttribute("role","tab"),this._element.setAttribute("aria-selected","false"),this._element.setAttribute("aria-label",(r=this.panel.title)!==null&&r!==void 0?r:this.panel.id),this._element.dataset.tabPanelId=this.panel.id;let u=(o=this.group)===null||o===void 0||(o=o.model)===null||o===void 0?void 0:o.contentContainerId;u&&this._element.setAttribute("aria-controls",u),B(this.element,"dv-inactive-tab",!0),this._updatePinnedClasses();let p=(g,m)=>{if(this.group.locked)return!1;let f=he();if(this.accessor.id===f?.viewId){var S;return!(((S=this.accessor.options.theme)===null||S===void 0?void 0:S.tabAnimation)==="smooth"||f.tabGroupId&&f.groupId===this.group.id&&this.group.model.getTabGroupForPanel(this.panel.id))}return this.group.model.canDisplayOverlay(g,m,"tab")};this.dropTarget=Lt.createDropTarget(this._element,{acceptedTargetZones:["left","right"],overlayModel:this._buildOverlayModel(),canDisplayOverlay:p,getOverrideTarget:()=>{var g;return(g=i.model.dropTargetContainer)===null||g===void 0?void 0:g.model}}),this.pointerDropTarget=ct.createDropTarget(this._element,{acceptedTargetZones:["left","right"],overlayModel:this._buildOverlayModel(),canDisplayOverlay:p,getOverrideTarget:()=>{var g;return(g=i.model.dropTargetContainer)===null||g===void 0?void 0:g.model}});let v={getData:()=>(this.panelTransfer.setData([new Qe(this.accessor.id,this.group.id,this.panel.id)],Qe.prototype),{dispose:()=>{this.panelTransfer.clearData(Qe.prototype)}}),createGhost:()=>({element:this._buildGhostElement(),offsetX:30,offsetY:-10}),onDragStart:g=>{var m;this._onDragStart.fire(g),!g.defaultPrevented&&!(g instanceof PointerEvent)&&((m=this.accessor.options.theme)===null||m===void 0?void 0:m.tabAnimation)==="smooth"&&requestAnimationFrame(()=>{B(this.element,"dv-tab--dragging",!0)})},onDragEnd:g=>{this._onDragEnd.fire(g)}};this.html5DragSource=Lt.createDragSource(this._element,j(j({},v),{},{disabled:!c.html5})),this.pointerDragSource=ct.createDragSource(this._element,j(j({},v),{},{disabled:!c.pointer,touchOnly:!c.pointerHandlesMouse,isCancelled:()=>!et(this.accessor.options).pointer})),this.onWillShowOverlay=Ke.any(this.dropTarget.onWillShowOverlay,this.pointerDropTarget.onWillShowOverlay),this.addDisposables(this._onPointDown,this._onTabClick,this._onDropped,this._onDragStart,this._onDragEnd,this.accessor.onDidOptionsChange(()=>{let g=this._buildOverlayModel();this.dropTarget.setOverlayModel(g),this.pointerDropTarget.setOverlayModel(g),this._updatePinnedClasses()}),(s=(n=this.panel.api)===null||n===void 0||(a=n.onDidChangePinned)===null||a===void 0?void 0:a.call(n,()=>{this._updatePinnedClasses()}))!==null&&s!==void 0?s:{dispose:()=>{}},(l=(d=this.panel.api)===null||d===void 0||(h=d.onDidTitleChange)===null||h===void 0?void 0:h.call(d,g=>{var m;this._element.setAttribute("aria-label",(m=g.title)!==null&&m!==void 0?m:this.panel.id)}))!==null&&l!==void 0?l:{dispose:()=>{}},$(this._element,"dragend",()=>{B(this.element,"dv-tab--dragging",!1)}),this.html5DragSource,$(this._element,"pointerdown",g=>{this._onPointDown.fire(g)}),$(this._element,"click",g=>{this._onTabClick.fire(g)}),$(this._element,"contextmenu",g=>{var m;(m=this.accessor.contextMenuService)===null||m===void 0||m.show(this.panel,this.group,g)}),new us(this._element,{onLongPress:g=>{var m;this.pointerDragSource.cancelPending(),(m=this.accessor.contextMenuService)===null||m===void 0||m.show(this.panel,this.group,g)}}),this.dropTarget.onDrop(g=>{this._onDropped.fire(g)}),this.pointerDropTarget.onDrop(g=>{this._onDropped.fire(g)}),this.dropTarget,this.pointerDropTarget,this.pointerDragSource)}_updatePinnedClasses(){var e,t,i,r;let o=(e=(t=this.panel.api)===null||t===void 0?void 0:t.isPinned)!==null&&e!==void 0?e:!1,s=o&&((i=this.accessor.options.pinnedTabs)===null||i===void 0?void 0:i.compact)===!0;B(this.element,"dv-tab--pinned",o),B(this.element,"dv-tab--pinned-compact",s);let n=o&&!(!((r=this.panel.api)===null||r===void 0)&&r.tabComponent);if(n&&!this._pinIndicator){let a=document.createElement("div");a.className="dv-tab-pin",a.appendChild(Nd()),this._element.insertBefore(a,this._element.firstChild),this._pinIndicator=a}else!n&&this._pinIndicator&&(this._pinIndicator.remove(),this._pinIndicator=void 0)}setActive(e){B(this.element,"dv-active-tab",e),B(this.element,"dv-inactive-tab",!e),this._element.setAttribute("aria-selected",e?"true":"false"),this._element.tabIndex=e?0:-1}setContent(e){this.content&&this.content.element.remove(),this.content=e,this._element.appendChild(this.content.element)}_buildOverlayModel(){var e,t,i;let r=(e=(t=this.accessor).resolveDropOverlayModel)===null||e===void 0?void 0:e.call(t,"tab",this.group);if(r)return r;let o=((i=this.accessor.options.theme)===null||i===void 0?void 0:i.dndTabIndicator)==="line"?Number.POSITIVE_INFINITY:0;return{activationSize:{value:50,type:"percentage"},smallWidthBoundary:o,smallHeightBoundary:o}}setDirection(e){this._direction=e;let t=e==="vertical"?["top","bottom"]:["left","right"];this.dropTarget.setTargetZones(t),this.pointerDropTarget.setTargetZones(t)}updateDragAndDropState(){let e=et(this.accessor.options);this._element.draggable=e.html5,this.html5DragSource.setDisabled(!e.html5),this.pointerDragSource.setDisabled(!e.pointer),this.pointerDragSource.setTouchOnly(!e.pointerHandlesMouse)}_buildGhostElement(){let e=getComputedStyle(this.element),t=this.element.cloneNode(!0),i=this._direction==="vertical",r=new Set(["writing-mode","inline-size","block-size","min-inline-size","min-block-size","max-inline-size","max-block-size","margin-inline","margin-inline-start","margin-inline-end","margin-block","margin-block-start","margin-block-end","padding-inline","padding-inline-start","padding-inline-end","padding-block","padding-block-start","padding-block-end"]);return Array.from(e).forEach(o=>{i&&r.has(o)||t.style.setProperty(o,e.getPropertyValue(o),e.getPropertyPriority(o))}),i&&(t.style.setProperty("writing-mode","horizontal-tb"),t.style.setProperty("width",e.height),t.style.setProperty("height",e.width)),t.style.position="absolute",t.classList.add("dv-tab-ghost-drag"),t}},Oi=class{get kind(){return this.options.kind}get nativeEvent(){return this.event.nativeEvent}get position(){return this.event.position}get edge(){return this.event.edge}get edgeGroup(){return this.event.edgeGroup}get defaultPrevented(){return this.event.defaultPrevented}get panel(){return this.options.panel}get api(){return this.options.api}get group(){return this.options.group}preventDefault(){this.event.preventDefault()}getData(){return this.options.getData()}constructor(e,t){this.event=e,this.options=t}};var Bd=class extends V{get group(){return this.groupAccessor()}constructor(e){var t,i;super(),this.panelTransfer=oi.getInstance(),this._onDragStart=new E,this.onDragStart=this._onDragStart.event,this._element=e.element,this.accessor=e.accessor;let r=e.group;this.groupAccessor=typeof r=="function"?r:()=>r,this.isFloatingMoveHandle=(t=e.isFloatingMoveHandle)!==null&&t!==void 0?t:(()=>!0);let o=et(this.accessor.options);this._element.draggable=o.html5,B(this._element,"dv-draggable",o.html5||o.pointer),this.addDisposables(this._onDragStart);let s=()=>{let u=document.createElement("div"),p=globalThis.getComputedStyle(this._element),v=p.getPropertyValue("--dv-activegroup-visiblepanel-tab-background-color"),g=p.getPropertyValue("--dv-activegroup-visiblepanel-tab-color");return u.style.backgroundColor=v,u.style.color=g,u.style.padding="2px 8px",u.style.height="24px",u.style.fontSize="11px",u.style.lineHeight="20px",u.style.borderRadius="12px",u.style.whiteSpace="nowrap",u.style.boxSizing="border-box",u.style.display="inline-block",u.textContent=`Multiple Panels (${this.group.size})`,u},a={getData:()=>(this.panelTransfer.setData([new Qe(this.accessor.id,this.group.id,null)],Qe.prototype),{dispose:()=>{this.panelTransfer.clearData(Qe.prototype)}}),createGhost:()=>{var u,p;let v=(u=(p=this.accessor).buildGroupDragGhost)===null||u===void 0?void 0:u.call(p,this.group);return v||{element:s(),offsetX:30,offsetY:-10}},onDragStart:u=>{this._onDragStart.fire(u)}};this.html5DragSource=Lt.createDragSource(this._element,j(j({},a),{},{disabled:!o.html5,isCancelled:u=>!!(this.group.api.location.type==="floating"&&this.isFloatingMoveHandle()&&!u.shiftKey||this.group.api.location.type==="edge"&&this.group.size===0)}));let l=()=>{var u;return((u=this.group)===null||u===void 0||(u=u.api)===null||u===void 0||(u=u.location)===null||u===void 0?void 0:u.type)==="floating"&&this.isFloatingMoveHandle()};this.pointerDragSource=ct.createDragSource(this._element,j(j({},a),{},{disabled:!o.pointer,touchOnly:!o.pointerHandlesMouse,touchInitiationDelay:()=>l()?500:250,pressTolerance:()=>l()?1/0:8,isCancelled:()=>!et(this.accessor.options).pointer||this.group.api.location.type==="edge"&&this.group.size===0,onDragStart:u=>{var p;let v=u.defaultPrevented;this._onDragStart.fire(u),!(u.defaultPrevented&&!v)&&((p=this.getFloatingOverlay())===null||p===void 0||p.cancelPendingDrag())}}));let d=new Ee,h=()=>{let u=this.getFloatingOverlay();d.value=u?u.onDidStartMoving(()=>{this.pointerDragSource.cancelPending()}):ee.NONE};h(),this.addDisposables(d);let c=(i=this.group)===null||i===void 0||(i=i.api)===null||i===void 0?void 0:i.onDidLocationChange;c&&this.addDisposables(c(h)),this.addDisposables(this.html5DragSource,this.pointerDragSource)}updateDragAndDropState(){let e=et(this.accessor.options);this._element.draggable=e.html5,B(this._element,"dv-draggable",e.html5||e.pointer),this.html5DragSource.setDisabled(!e.html5),this.pointerDragSource.setDisabled(!e.pointer),this.pointerDragSource.setTouchOnly(!e.pointerHandlesMouse)}getFloatingOverlay(){var e;if(this.group)return(e=this.accessor.floatingGroups)===null||e===void 0||(e=e.find(t=>t.group===this.group))===null||e===void 0?void 0:e.overlay}},pv=class extends V{get element(){return this._element}constructor(e,t){var i,r,o,s,n,a,l;super(),this.accessor=e,this.group=t,this._onDrop=new E,this.onDrop=this._onDrop.event,this._onDragStart=new E,this.onDragStart=this._onDragStart.event,this._element=document.createElement("div"),this._element.className="dv-void-container",this.addDisposables(this._onDrop,this._onDragStart,$(this._element,"pointerdown",()=>{this.accessor.doSetGroupActive(this.group)}),$(this._element,"pointerdown",h=>{h.shiftKey&&fd(h)},!0)),this.dragSource=new Bd({element:this._element,accessor:this.accessor,group:this.group,isFloatingMoveHandle:()=>!this._element.closest(".dv-resize-container-with-titlebar")});let d=(h,c)=>{if(this.group.api.locked)return!1;let u=he();return this.accessor.id===u?.viewId?!0:t.model.canDisplayOverlay(h,c,"header_space")};this.dropTarget=Lt.createDropTarget(this._element,{acceptedTargetZones:["center"],canDisplayOverlay:d,getOverrideTarget:()=>{var h;return(h=t.model.dropTargetContainer)===null||h===void 0?void 0:h.model},overlayModel:(i=(r=this.accessor).resolveDropOverlayModel)===null||i===void 0?void 0:i.call(r,"header_space",this.group)}),this.pointerDropTarget=ct.createDropTarget(this._element,{acceptedTargetZones:["center"],canDisplayOverlay:d,getOverrideTarget:()=>{var h;return(h=t.model.dropTargetContainer)===null||h===void 0?void 0:h.model},overlayModel:(o=(s=this.accessor).resolveDropOverlayModel)===null||o===void 0?void 0:o.call(s,"header_space",this.group)}),this.onWillShowOverlay=Ke.any(this.dropTarget.onWillShowOverlay,this.pointerDropTarget.onWillShowOverlay),this.addDisposables(this.dragSource,this.dragSource.onDragStart(h=>{this._onDragStart.fire(h)}),this.dropTarget.onDrop(h=>{this._onDrop.fire(h)}),this.pointerDropTarget.onDrop(h=>{this._onDrop.fire(h)}),this.dropTarget,this.pointerDropTarget,(n=(a=(l=this.accessor).onDidOptionsChange)===null||a===void 0?void 0:a.call(l,()=>{var h,c,u;let p=(h=(c=(u=this.accessor).resolveDropOverlayModel)===null||c===void 0?void 0:c.call(u,"header_space",this.group))!==null&&h!==void 0?h:{};this.dropTarget.setOverlayModel(p),this.pointerDropTarget.setOverlayModel(p)}))!==null&&n!==void 0?n:ee.NONE)}updateDragAndDropState(){this.dragSource.updateDragAndDropState()}},Wd=class Hd extends V{get element(){return this._element}get orientation(){return this._orientation}set orientation(t){this._orientation!==t&&(this._scrollOffset=0,this._orientation=t,Ct(this._scrollbar,"dv-scrollbar-vertical","dv-scrollbar-horizontal"),t==="vertical"?kt(this._scrollbar,"dv-scrollbar-vertical"):kt(this._scrollbar,"dv-scrollbar-horizontal"))}constructor(t){super(),this.scrollableElement=t,this._scrollOffset=0,this._orientation="horizontal",this._element=document.createElement("div"),this._element.className="dv-scrollable",this._scrollbar=document.createElement("div"),this._scrollbar.className="dv-scrollbar dv-scrollbar-horizontal",this.element.appendChild(t),this.element.appendChild(this._scrollbar),this.addDisposables($(this.element,"wheel",i=>{this._scrollOffset+=i.deltaY*Hd.MouseWheelSpeed,this.scheduleStyleUpdate()}),$(this._scrollbar,"pointerdown",i=>{var r;i.preventDefault();let o=(r=this._scrollbar.ownerDocument)!==null&&r!==void 0?r:document;B(this.element,"dv-scrollable-scrolling",!0);let s=this._orientation==="horizontal"?i.clientX:i.clientY,n=this._scrollOffset,a=d=>{let h=this._orientation==="horizontal"?d.clientX-s:d.clientY-s,c=(this._orientation==="horizontal"?this.element.clientWidth:this.element.clientHeight)/(this._orientation==="horizontal"?this.scrollableElement.scrollWidth:this.scrollableElement.scrollHeight);this._scrollOffset=n+h/c,this.scheduleStyleUpdate()},l=()=>{B(this.element,"dv-scrollable-scrolling",!1),o.removeEventListener("pointermove",a),o.removeEventListener("pointerup",l),o.removeEventListener("pointercancel",l)};o.addEventListener("pointermove",a),o.addEventListener("pointerup",l),o.addEventListener("pointercancel",l)}),$(this.element,"scroll",()=>{this.scheduleStyleUpdate()}),$(this.scrollableElement,"scroll",()=>{this._scrollOffset=this._orientation==="horizontal"?this.scrollableElement.scrollLeft:this.scrollableElement.scrollTop,this.scheduleStyleUpdate()}),Xt(this.element,()=>{B(this.element,"dv-scrollable-resizing",!0),this._animationTimer&&clearTimeout(this._animationTimer),this._animationTimer=setTimeout(()=>{clearTimeout(this._animationTimer),B(this.element,"dv-scrollable-resizing",!1)},500),this.scheduleStyleUpdate()}),ee.from(()=>{this._pendingStyleFrame!==void 0&&(cancelAnimationFrame(this._pendingStyleFrame),this._pendingStyleFrame=void 0),this._animationTimer!==void 0&&(clearTimeout(this._animationTimer),this._animationTimer=void 0)}))}scheduleStyleUpdate(){this._pendingStyleFrame===void 0&&(this._pendingStyleFrame=requestAnimationFrame(()=>{this._pendingStyleFrame=void 0,this.calculateScrollbarStyles()}))}calculateScrollbarStyles(){let t=this._orientation==="horizontal"?this.element.clientWidth:this.element.clientHeight,i=this._orientation==="horizontal"?this.scrollableElement.scrollWidth:this.scrollableElement.scrollHeight;if(i>t){let r=t*(t/i);this._orientation==="horizontal"?(this._scrollbar.style.width=`${r}px`,this._scrollbar.style.height=""):(this._scrollbar.style.height=`${r}px`,this._scrollbar.style.width=""),this._scrollOffset=le(this._scrollOffset,0,i-t),this._orientation==="horizontal"?this.scrollableElement.scrollLeft=this._scrollOffset:this.scrollableElement.scrollTop=this._scrollOffset;let o=this._scrollOffset/(i-t);this._orientation==="horizontal"?(this._scrollbar.style.left=`${(t-r)*o}px`,this._scrollbar.style.top=""):(this._scrollbar.style.top=`${(t-r)*o}px`,this._scrollbar.style.left="")}else this._orientation==="horizontal"?(this._scrollbar.style.width="0px",this._scrollbar.style.left="0px"):(this._scrollbar.style.height="0px",this._scrollbar.style.top="0px"),this._scrollOffset=0}};Wd.MouseWheelSpeed=1;var $d="dv-tabs-container--wrap";function Fd(e,t){return typeof e=="boolean"?e:!!e?.[t]}function rs(e){return typeof e=="boolean"?e:e?Object.values(e).some(Boolean):!1}var Vd=class extends dp{constructor(e,t,i,r,o){super(),this.nativeEvent=e,this.target=t,this.position=i,this.getData=r,this.group=o}},L_=Object.keys({disableAutoResizing:void 0,proportionalLayout:void 0,hideBorders:void 0,singleTabMode:void 0,disableFloatingGroups:void 0,floatingGroupBounds:void 0,transformFloatingGroupDrag:void 0,smartGuides:void 0,floatingGroupDragHandle:void 0,popoutUrl:void 0,nonce:void 0,defaultRenderer:void 0,defaultHeaderPosition:void 0,debug:void 0,locked:void 0,disableDnd:void 0,dndStrategy:void 0,className:void 0,noPanelsOverlay:void 0,closeEmptyGroups:void 0,groupIdGenerator:void 0,dndEdges:void 0,dropPositionResolver:void 0,dndCompass:void 0,dropSizing:void 0,theme:void 0,disableTabsOverflowList:void 0,overflow:void 0,scrollbars:void 0,getTabContextMenuItems:void 0,getTabGroupChipContextMenuItems:void 0,createTabGroupChipComponent:void 0,createGroupDragGhostComponent:void 0,dropOverlayModel:void 0,announcements:void 0,getAnnouncement:void 0,announcer:void 0,messages:void 0,keyboardNavigation:void 0,layoutHistory:void 0,autoHideEdgeGroups:void 0,dockToEdgeGroups:void 0,edgeGroupPeek:void 0,tabGroupColors:void 0,tabGroupAccent:void 0,pinnedTabs:void 0});function vv(e){return!!e.referencePanel}function gv(e){return!!e.referenceGroup}function Ho(e){return!!e.referencePanel}function $o(e){return!!e.referenceGroup}var ps=[{id:"grey",value:"var(--dv-tab-group-color-grey)",label:"Grey"},{id:"blue",value:"var(--dv-tab-group-color-blue)",label:"Blue"},{id:"red",value:"var(--dv-tab-group-color-red)",label:"Red"},{id:"yellow",value:"var(--dv-tab-group-color-yellow)",label:"Yellow"},{id:"green",value:"var(--dv-tab-group-color-green)",label:"Green"},{id:"pink",value:"var(--dv-tab-group-color-pink)",label:"Pink"},{id:"purple",value:"var(--dv-tab-group-color-purple)",label:"Purple"},{id:"cyan",value:"var(--dv-tab-group-color-cyan)",label:"Cyan"},{id:"orange",value:"var(--dv-tab-group-color-orange)",label:"Orange"}],qd=class{constructor(e,t=!0){this._entries=e.slice(),this._byId=new Map(e.map(i=>[i.id,i])),this._enabled=t}get enabled(){return this._enabled}set enabled(e){this._enabled=e}setEntries(e){this._entries=e.slice(),this._byId=new Map(e.map(t=>[t.id,t]))}entries(){return this._entries}has(e){return this._byId.has(e)}get(e){return this._byId.get(e)}defaultId(){var e;return(e=this._entries[0])===null||e===void 0?void 0:e.id}resolveValue(e){if(!this._enabled||!e)return;let t=this._byId.get(e);return t?t.value:e}},Fo;function Ud(){var e;return(e=Fo)!==null&&e!==void 0||(Fo=new qd(ps,!0)),Fo}function vs(e,t,i){let r=(i??Ud()).resolveValue(t);r===void 0?e.style.removeProperty("--dv-tab-group-color"):e.style.setProperty("--dv-tab-group-color",r)}function gs(e,t){return(t??Ud()).resolveValue(e)}var Za=class extends V{get element(){return this._element}constructor(e){super(),this._palette=e,this._onClick=new E,this.onClick=this._onClick.event,this._onContextMenu=new E,this.onContextMenu=this._onContextMenu.event,this._element=document.createElement("div"),this._element.className="dv-tab-group-chip",this._element.tabIndex=0,this._label=document.createElement("span"),this._label.className="dv-tab-group-chip-label",this._element.appendChild(this._label),this.addDisposables(this._onClick,this._onContextMenu,new us(this._element,{onLongPress:t=>{this._onContextMenu.fire(t)}}),$(this._element,"click",t=>{this._onClick.fire(t)}),$(this._element,"contextmenu",t=>{this._onContextMenu.fire(t)}))}init(e){this._tabGroup=e.tabGroup,this.updateColor(e.tabGroup.color),this.updateLabel(e.tabGroup.label),this.updateCollapsed(e.tabGroup.collapsed),this.addDisposables(e.tabGroup.onDidChange(()=>{this._tabGroup&&(this.updateColor(this._tabGroup.color),this.updateLabel(this._tabGroup.label))}),e.tabGroup.onDidCollapseChange(t=>{this.updateCollapsed(t)}),this._onClick.event(()=>{var t;(t=this._tabGroup)===null||t===void 0||t.toggle()}))}update(e){this._tabGroup=e.tabGroup,this.updateColor(e.tabGroup.color),this.updateLabel(e.tabGroup.label),this.updateCollapsed(e.tabGroup.collapsed)}updateColor(e){var t;vs(this._element,e,this._palette),B(this._element,"dv-tab-group-chip--accent-off",((t=this._palette)===null||t===void 0?void 0:t.enabled)===!1)}updateLabel(e){this._label.textContent=e,B(this._label,"dv-tab-group-chip-label--empty",!e)}updateCollapsed(e){B(this._element,"dv-tab-group-chip--collapsed",e)}},mv="dv-tab-group-chip-continuation",Qa=8,Kd=class{get underlines(){return this._underlines}constructor(e){this._ctx=e,this._underlines=new Map,this._continuationMarkers=new Map,this._rafId=null}positionUnderlines(){requestAnimationFrame(()=>{this._positionUnderlinesSync()})}trackUnderlines(){this._rafId!==null&&cancelAnimationFrame(this._rafId);let e=performance.now(),t=250,i=()=>{this._positionUnderlinesSync(),performance.now()-e<t?this._rafId=requestAnimationFrame(i):this._rafId=null};this._rafId=requestAnimationFrame(i)}syncUnderlineElements(e){for(let t of e)if(!this._underlines.has(t)){let i=document.createElement("div");i.className="dv-tab-group-underline",this._ctx.tabsList.appendChild(i),this._underlines.set(t,i)}for(let[t,i]of this._underlines)e.has(t)||(i.remove(),this._underlines.delete(t),this._clearContinuationMarkers(t))}getUnderline(e){return this._underlines.get(e)}dispose(){this._rafId!==null&&(cancelAnimationFrame(this._rafId),this._rafId=null);for(let[,e]of this._underlines)e.remove();this._underlines.clear(),this._clearContinuationMarkers()}_syncContinuationMarkers(e,t){let i=this._continuationMarkers.get(e);for(i||(i=[],this._continuationMarkers.set(e,i));i.length<t;){let r=document.createElement("div");r.className=mv,this._ctx.tabsList.appendChild(r),i.push(r)}for(;i.length>t;){let r=i.pop();r?.remove()}return i}_clearContinuationMarkers(e){if(e===void 0){for(let[,i]of this._continuationMarkers)for(let r of i)r.remove();this._continuationMarkers.clear();return}let t=this._continuationMarkers.get(e);if(t){for(let i of t)i.remove();this._continuationMarkers.delete(e)}}_positionUnderlinesSync(){let e=this._ctx.tabsList.getBoundingClientRect(),t=this._ctx.getTabGroups(),i=this._ctx.getDirection()==="vertical",r=this._ctx.tabsList.classList.contains($d);r||this._clearContinuationMarkers();let o=i?e.width:e.height,s=this._ctx.getActivePanelId(),n=this._ctx.getTabMap();for(let a of t){let l=this._underlines.get(a.id);if(!l)continue;let d=a.panelIds;if(d.length===0){l.style.display="none";continue}if(l.style.display="",r){this._positionWrappedUnderline(l,a,e,n,i);continue}let h=this._ctx.getChipElement(a.id),c;if(h){let f=h.getBoundingClientRect(),S=getComputedStyle(h),w=i?Number.parseFloat(S.marginTop)||0:Number.parseFloat(S.marginLeft)||0;c=i?f.top-e.top-w:f.left-e.left-w}else{let f=d[0],S=n.get(f);if(S){let w=S.value.element.getBoundingClientRect();c=i?w.top-e.top:w.left-e.left}else c=0}let u=d[d.length-1],p=n.get(u);if(!p){i?(l.style.top=`${c}px`,l.style.height="0px",l.style.left="",l.style.width=""):(l.style.left=`${c}px`,l.style.width="0px",l.style.top="",l.style.height="");continue}let v=p.value.element.getBoundingClientRect(),g=i?v.bottom-e.top:v.right-e.left,m=g-c;if((a.collapsed||a.panelIds.some(f=>{let S=n.get(f);return S?.value.element.classList.contains("dv-tab--group-expanding")}))&&h){let f=h.getBoundingClientRect(),S=i?f.top+f.height/2-e.top:f.left+f.width/2-e.left,w=0,D=0;for(let R of a.panelIds){let x=n.get(R);if(!x)continue;let C=x.value.element;i?(w+=C.getBoundingClientRect().height,D+=C.scrollHeight):(w+=C.getBoundingClientRect().width,D+=C.scrollWidth)}let T=D>0?Math.min(1,w/D):0;c=S+(c-S)*T,g=S+(g-S)*T,m=Math.max(0,g-c)}i?(l.style.top=`${c}px`,l.style.height=`${Math.max(0,m)}px`,l.style.left="",l.style.width="",l.style.bottom=""):(l.style.left=`${c}px`,l.style.width=`${Math.max(0,m)}px`,l.style.top="",l.style.height="",l.style.bottom=""),this.applyShape(l,a,c,m,o,s,e,i)}}_positionWrappedUnderline(e,t,i,r,o){let n=gs(t.color,this._ctx.getColorPalette());if(n===void 0){e.style.display="none",this._clearContinuationMarkers(t.id);return}let{runs:a,firstRun:l}=this._computeWrappedRuns(t,i,r,o);if(a.length===0){e.style.display="none",this._clearContinuationMarkers(t.id);return}this._positionContinuationMarkers(t.id,a,l,n,o);let d=Math.min(...a.map(w=>w.left)),h=Math.max(...a.map(w=>w.right)),c=Math.min(...a.map(w=>w.top)),u=Math.max(...a.map(w=>w.bottom)),p=o?Math.max(0,h-d):i.width,v=o?i.height:Math.max(0,u-c);e.style.left=o?`${d}px`:"0px",e.style.top=o?"0px":`${c}px`,e.style.bottom="auto",e.style.width=`${p}px`,e.style.height=`${v}px`,e.style.backgroundColor="";let{svg:g,path:m}=this.ensureSvgPath(e);g.setAttribute("width",String(p)),g.setAttribute("height",String(v)),m.setAttribute("stroke",n),m.setAttribute("stroke-width",String(2));let f=this._ctx.getHeaderPosition(),S=o?f==="right":f==="bottom";m.setAttribute("d",this._wrappedPathData(a,o,S,d,c,2))}_computeWrappedRuns(e,t,i,r){let o=[],s;for(let a of e.panelIds){var n;let l=i.get(a);if(!l)continue;let d=l.value.element.getBoundingClientRect();if(d.width===0&&d.height===0)continue;let h=d.top-t.top,c=d.bottom-t.top,u=d.left-t.left,p=d.right-t.left,v=r?u:h,g=o.find(m=>Math.abs((r?m.left:m.top)-v)<=2);g?(g.top=Math.min(g.top,h),g.bottom=Math.max(g.bottom,c),g.left=Math.min(g.left,u),g.right=Math.max(g.right,p)):(g={top:h,bottom:c,left:u,right:p},o.push(g)),(n=s)!==null&&n!==void 0||(s=g)}return{runs:o,firstRun:s}}_wrappedPathData(e,t,i,r,o,s){let n="";for(let a of e)if(t){let l=i?a.right-r-s/2:a.left-r+s/2;n+=`M ${l},${a.top} L ${l},${a.bottom} `}else{let l=i?a.top-o+s/2:a.bottom-o-s/2;n+=`M ${a.left},${l} L ${a.right},${l} `}return n.trim()}_positionContinuationMarkers(e,t,i,r,o){let s=t.filter(a=>a!==i),n=this._syncContinuationMarkers(e,s.length);s.forEach((a,l)=>{let d=n[l];if(d.style.backgroundColor=r,o){let h=(a.left+a.right)/2;d.style.left=`${h-Qa/2}px`,d.style.top=`${a.top}px`}else{let h=(a.top+a.bottom)/2;d.style.left=`${a.left}px`,d.style.top=`${h-Qa/2}px`}})}ensureSvgPath(e){let t=e.firstElementChild;if(t?.tagName==="svg")return{svg:t,path:t.firstElementChild};e.replaceChildren();let i=document.createElementNS("http://www.w3.org/2000/svg","svg");i.style.display="block";let r=document.createElementNS("http://www.w3.org/2000/svg","path");return r.setAttribute("fill","none"),i.appendChild(r),e.appendChild(i),{svg:i,path:r}}},fv=class extends Kd{_applyStraightLine(e,t,i,r,o,s,n){let a=n?o:r,l=n?r:o;e.setAttribute("width",String(a)),e.setAttribute("height",String(l)),i.style.width=`${a}px`,i.style.height=`${l}px`,t.setAttribute("d",n?`M ${s},0 L ${s},${r}`:`M 0,${s} L ${r},${s}`)}applyShape(e,t,i,r,o,s,n,a){let d=o,h=r,c=gs(t.color,this._ctx.getColorPalette());if(h<=0||d<=0||c===void 0){e.style.display="none";return}e.style.display="";let u;s&&t.panelIds.includes(s)&&(u=this._ctx.getTabMap().get(s));let{svg:p,path:v}=this.ensureSvgPath(e);v.setAttribute("stroke",c),v.setAttribute("stroke-width",String(2));let g=2,m=this._ctx.getHeaderPosition(),f=!a&&m==="bottom",S=a&&m==="right",w,D;if(a?(w=S?d-g:g,D=S?g:d-g):(w=f?g:d-g,D=f?d-g:g),!u){this._applyStraightLine(p,v,e,h,d,w,a);return}let T=u.value.element.getBoundingClientRect(),R,x;if(a?(R=Math.max(0,T.top-n.top-i),x=Math.min(h,T.bottom-n.top-i)):(R=Math.max(0,T.left-n.left-i),x=Math.min(h,T.right-n.left-i)),x<=R){this._applyStraightLine(p,v,e,h,d,w,a);return}let C=6,L=D>w?1:-1;if(a){let M=d,O=h;p.setAttribute("width",String(M)),p.setAttribute("height",String(O)),e.style.width=`${M}px`,e.style.height=`${O}px`;let W=[`M ${w},0`,`L ${w},${R-C}`,`Q ${w},${R} ${w+L*C},${R}`,`L ${D-L*C},${R}`,`Q ${D},${R} ${D},${R+C}`,`L ${D},${x-C}`,`Q ${D},${x} ${D-L*C},${x}`,`L ${w+L*C},${x}`,`Q ${w},${x} ${w},${x+C}`,`L ${w},${O}`].join(" ");v.setAttribute("d",W)}else{let M=h,O=d;p.setAttribute("width",String(M)),p.setAttribute("height",String(O)),e.style.width=`${M}px`,e.style.height=`${O}px`;let W=[`M 0,${w}`,`L ${R-C},${w}`,`Q ${R},${w} ${R},${w+L*C}`,`L ${R},${D-L*C}`,`Q ${R},${D} ${R+C},${D}`,`L ${x-C},${D}`,`Q ${x},${D} ${x},${D-L*C}`,`L ${x},${w+L*C}`,`Q ${x},${w} ${x+C},${w}`,`L ${M},${w}`].join(" ");v.setAttribute("d",W)}}},_v=class extends Kd{applyShape(e,t,i,r,o,s,n,a){let d=gs(t.color,this._ctx.getColorPalette());if(r<=0||d===void 0){e.style.display="none";return}e.style.display="",e.firstElementChild&&e.replaceChildren(),e.style.backgroundColor=d,a?(e.style.width="2px",e.style.height=`${r}px`):(e.style.width=`${r}px`,e.style.height="2px")}},bv=new Map,wv=class{get chipRenderers(){return this._chipRenderers}get groupUnderlines(){var e,t;return(e=(t=this._indicator)===null||t===void 0?void 0:t.underlines)!==null&&e!==void 0?e:bv}get skipNextCollapseAnimation(){return this._skipNextCollapseAnimation}set skipNextCollapseAnimation(e){this._skipNextCollapseAnimation=e}constructor(e,t){this._ctx=e,this._callbacks=t,this._chipRenderers=new Map,this._indicator=null,this._skipNextCollapseAnimation=!1,this._pendingTransitionCleanups=new Map}update(){let e=this._ctx.group.model.getTabGroups(),t=new Set;for(let r of e)t.add(r.id),this._ensureChipForGroup(r),this._positionChipForGroup(r);for(let[r,o]of this._chipRenderers)if(!t.has(r)){var i;o.chip.element.remove(),o.chip.dispose(),(i=o.dragSourcesDisposable)===null||i===void 0||i.dispose(),o.disposable.dispose(),this._chipRenderers.delete(r)}this._updateTabGroupClasses()}refreshAccents(){for(let i of this._ctx.group.model.getTabGroups()){var e,t;let r=this._chipRenderers.get(i.id);r==null||(t=(e=r.chip).update)===null||t===void 0||t.call(e,{tabGroup:i})}this._updateTabGroupClasses()}positionAllChips(){if(this._chipRenderers.size!==0)for(let e of this._ctx.group.model.getTabGroups())this._positionChipForGroup(e)}updateDirection(){let e=this._ctx.getDirection()==="vertical";for(let[,t]of this._chipRenderers){let i=e?["top"]:["left"];t.dropTarget.setTargetZones(i),t.pointerDropTarget.setTargetZones(i)}}clearChipDropOverlays(){for(let[,i]of this._chipRenderers){var e,t;(e=i.dropTarget)===null||e===void 0||e.clearOverlay(),(t=i.pointerDropTarget)===null||t===void 0||t.clearOverlay()}}snapshotChipSizes(){let e=this._ctx.getDirection()==="vertical",t=new Map;for(let[i,r]of this._chipRenderers){let o=r.chip.element.getBoundingClientRect();t.set(i,e?o.height:o.width)}return t}positionUnderlines(){var e;(e=this._indicator)===null||e===void 0||e.positionUnderlines()}trackUnderlines(){var e;(e=this._indicator)===null||e===void 0||e.trackUnderlines()}setGroupDragImage(e,t,i){if(!e.dataTransfer)return;let r=this._ctx.getDirection()==="vertical",o=this._ctx.tabsList.cloneNode(!0);r?(o.classList.remove("dv-tabs-container-vertical","dv-vertical"),o.classList.add("dv-horizontal"),o.style.writingMode="horizontal-tb",o.style.height=`${this._ctx.tabsList.offsetWidth}px`):o.style.height=`${this._ctx.tabsList.offsetHeight}px`,o.style.width="auto",o.style.overflow="visible",o.style.pointerEvents="none";let s=Array.from(o.children),n=Array.from(this._ctx.tabsList.children);for(let p=s.length-1;p>=0;p--)n[p]!==i&&s[p].remove();let a=document.createElement("div");a.className="dv-groupview dv-active-group",a.style.position="fixed",a.style.top="-10000px",a.style.left="0px",a.style.height="auto",a.style.width="auto",a.style.pointerEvents="none";let l=document.createElement("div");l.className="dv-tabs-and-actions-container",l.style.height="auto",l.style.width="auto",a.appendChild(l),l.appendChild(o),this._ctx.accessor.element.appendChild(a);let d=o.querySelector(".dv-tab-group-chip"),h=i.getBoundingClientRect(),c=e.clientX-h.left,u=e.clientY-h.top;if(d){let p=d.getBoundingClientRect(),v=a.getBoundingClientRect(),g=p.left-v.left+c,m=p.top-v.top+u;e.dataTransfer.setDragImage(a,g,m)}else e.dataTransfer.setDragImage(a,c,u);requestAnimationFrame(()=>{a.remove()})}cleanupTransition(e){var t;(t=this._pendingTransitionCleanups.get(e))===null||t===void 0||t(),this._pendingTransitionCleanups.delete(e)}updateDragAndDropState(){let e=et(this._ctx.accessor.options);for(let o of this._chipRenderers.values()){var t,i,r;o.chip.element.draggable=e.html5,(t=o.html5DragSource)===null||t===void 0||t.setDisabled(!e.html5),(i=o.pointerDragSource)===null||i===void 0||i.setDisabled(!e.pointer),(r=o.pointerDragSource)===null||r===void 0||r.setTouchOnly(!e.pointerHandlesMouse)}}disposeChipDrag(e){var t;let i=this._chipRenderers.get(e);i&&((t=i.dragSourcesDisposable)===null||t===void 0||t.dispose(),i.html5DragSource=void 0,i.pointerDragSource=void 0,i.dragSourcesDisposable=void 0)}_buildChipGhostElement(e){let t=getComputedStyle(e),i=e.cloneNode(!0);return Array.from(t).forEach(r=>{i.style.setProperty(r,t.getPropertyValue(r),t.getPropertyPriority(r))}),i.style.position="absolute",i}disposeAll(){var e;(e=this._indicator)===null||e===void 0||e.dispose(),this._indicator=null;for(let[,i]of this._pendingTransitionCleanups)i();this._pendingTransitionCleanups.clear();for(let[,i]of this._chipRenderers){var t;i.chip.element.remove(),i.chip.dispose(),(t=i.dragSourcesDisposable)===null||t===void 0||t.dispose(),i.disposable.dispose()}this._chipRenderers.clear()}_ensureIndicator(){var e,t,i;let r=((e=(t=this._ctx.accessor.options.theme)===null||t===void 0?void 0:t.tabGroupIndicator)!==null&&e!==void 0?e:"wrap")==="none"?_v:fv;this._indicator&&!(this._indicator instanceof r)&&(this._indicator.dispose(),this._indicator=null),(i=this._indicator)!==null&&i!==void 0||(this._indicator=new r({tabsList:this._ctx.tabsList,getTabGroups:()=>this._ctx.group.model.getTabGroups(),getActivePanelId:()=>{var o;return(o=this._ctx.group.activePanel)===null||o===void 0?void 0:o.id},getTabMap:()=>this._ctx.getTabMap(),getChipElement:o=>{var s;return(s=this._chipRenderers.get(o))===null||s===void 0?void 0:s.chip.element},getDirection:()=>this._ctx.getDirection(),getHeaderPosition:()=>this._ctx.group.model.headerPosition,getColorPalette:()=>this._ctx.accessor.tabGroupColorPalette}))}_createChipDragSources(e,t){let i=et(this._ctx.accessor.options);e.element.draggable=i.html5;let r=oi.getInstance(),o=()=>(r.setData([new Qe(this._ctx.accessor.id,this._ctx.group.id,null,t.id)],Qe.prototype),{dispose:()=>{r.clearData(Qe.prototype)}}),s=Lt.createDragSource(e.element,{getData:o,disabled:!i.html5,isCancelled:()=>!et(this._ctx.accessor.options).html5,onDragStart:l=>{"dataTransfer"in l&&l.dataTransfer&&this.setGroupDragImage(l,t,e.element),this._callbacks.onChipDragStart(t,e,l)},onDragEnd:l=>{var d,h;(d=(h=this._callbacks).onChipDragEnd)===null||d===void 0||d.call(h,t,e,l)}}),n=()=>{r.clearData(Qe.prototype)};e.element.addEventListener("dragend",n,{once:!0});let a=ct.createDragSource(e.element,{getData:o,disabled:!i.pointer,touchOnly:!i.pointerHandlesMouse,isCancelled:()=>!et(this._ctx.accessor.options).pointer,createGhost:()=>({element:this._buildChipGhostElement(e.element),offsetX:8,offsetY:8}),onDragStart:l=>{this._callbacks.onChipDragStart(t,e,l)}});return{html5DragSource:s,pointerDragSource:a,disposable:{dispose:()=>{s.dispose(),a.dispose(),e.element.removeEventListener("dragend",n)}}}}_ensureChipForGroup(e){let t=this._chipRenderers.get(e.id);if(t){if(!t.html5DragSource){let u=this._createChipDragSources(t.chip,e);t.html5DragSource=u.html5DragSource,t.pointerDragSource=u.pointerDragSource,t.dragSourcesDisposable=u.disposable}return}let i=this._ctx.accessor.options.createTabGroupChipComponent,r=i?i(e):new Za(this._ctx.accessor.tabGroupColorPalette);r.init({tabGroup:e,api:this._ctx.accessor.api});let o=this._createChipDragSources(r,e),s=[e.onDidChange(()=>{var u;(u=r.update)===null||u===void 0||u.call(r,{tabGroup:e}),this._updateTabGroupClasses()}),e.onDidPanelChange(()=>{this._positionChipForGroup(e),this._updateTabGroupClasses()}),e.onDidCollapseChange(()=>{this._updateTabGroupClasses()})],n=u=>{var p;(p=this._chipRenderers.get(e.id))===null||p===void 0||(p=p.pointerDragSource)===null||p===void 0||p.cancelPending(),this._callbacks.onChipContextMenu(e,u)};r instanceof Za?s.push(r.onContextMenu(n)):s.push(new us(r.element,{onLongPress:n}),$(r.element,"contextmenu",n));let a={acceptedTargetZones:this._ctx.getDirection()==="vertical"?["top"]:["left"],overlayModel:{activationSize:{value:100,type:"percentage"}},canDisplayOverlay:(u,p)=>{if(this._ctx.group.locked||this._ctx.accessor.options.disableDnd)return!1;let v=he();if(this._ctx.accessor.id===v?.viewId){var g;return!(((g=this._ctx.accessor.options.theme)===null||g===void 0?void 0:g.tabAnimation)==="smooth"&&!v.tabGroupId)}return this._ctx.group.model.canDisplayOverlay(u,p,"tab")}},l=Lt.createDropTarget(r.element,a),d=ct.createDropTarget(r.element,a),h=u=>{this._callbacks.onChipDrop(e,u)};s.push(l,l.onDrop(h),d,d.onDrop(h));let c=new V(...s);this._chipRenderers.set(e.id,{chip:r,html5DragSource:o.html5DragSource,pointerDragSource:o.pointerDragSource,dragSourcesDisposable:o.disposable,disposable:c,dropTarget:l,pointerDropTarget:d}),e.collapsed&&(this._skipNextCollapseAnimation=!0)}_positionChipForGroup(e){let t=this._chipRenderers.get(e.id);if(!t)return;let i=t.chip.element,r=e.panelIds;if(r.length===0){i.remove();return}let o=r[0],s=this._ctx.getTabMap().get(o);if(!s){i.remove();return}let n=s.value.element;i.nextSibling!==n&&this._ctx.tabsList.insertBefore(i,n)}_updateTabGroupClasses(){let e=this._ctx.group.model.getTabGroups(),t=this._ctx.getTabs(),i=this._ctx.getTabMap(),r=!1,o=new Map;for(let a of e)for(let l of a.panelIds)o.set(l,a);for(let a of t){let l=a.value,d=l.panel.id,h=o.get(d),c=!!h;if(B(l.element,"dv-tab--grouped",c),h){let u=h.panelIds,p=u[0]===d,v=u[u.length-1]===d;B(l.element,"dv-tab--group-first",p),B(l.element,"dv-tab--group-last",v),vs(l.element,h.color,this._ctx.accessor.tabGroupColorPalette);let g=l.element.classList.contains("dv-tab--group-collapsed");if(!h.collapsed&&g){var s;r=!0,l.element.classList.remove("dv-tab--group-collapsed"),l.element.classList.add("dv-tab--group-expanding"),(s=this._pendingTransitionCleanups.get(d))===null||s===void 0||s();let m=()=>{l.element.classList.remove("dv-tab--group-expanding"),l.element.style.removeProperty("width"),l.element.removeEventListener("transitionend",m),clearTimeout(f),this._pendingTransitionCleanups.delete(d)},f=setTimeout(m,300);this._pendingTransitionCleanups.set(d,m),l.element.addEventListener("transitionend",m)}}else B(l.element,"dv-tab--group-first",!1),B(l.element,"dv-tab--group-last",!1),l.element.classList.remove("dv-tab--group-collapsed","dv-tab--group-expanding"),l.element.style.removeProperty("width"),l.element.style.removeProperty("--dv-tab-group-color")}let n=new Set;for(let a of e)if(n.add(a.id),a.collapsed&&a.panelIds.some(l=>{let d=i.get(l);return d&&!d.value.element.classList.contains("dv-tab--group-collapsed")}))if(this._skipNextCollapseAnimation){let l=[];for(let d of a.panelIds){let h=i.get(d);h&&(h.value.element.style.transition="none",h.value.element.classList.add("dv-tab--group-collapsed"),l.push(h.value.element))}if(l.length>0){l[0].offsetHeight;for(let d of l)d.style.removeProperty("transition")}}else{r=!0;let l=this._ctx.getDirection()==="vertical";for(let d of a.panelIds){let h=i.get(d);if(h&&!h.value.element.classList.contains("dv-tab--group-collapsed")){let c=h.value.element.getBoundingClientRect();l?h.value.element.style.height=`${c.height}px`:h.value.element.style.width=`${c.width}px`,h.value.element.offsetHeight,h.value.element.classList.add("dv-tab--group-collapsed")}}}this._skipNextCollapseAnimation=!1,this._ensureIndicator(),this._indicator&&(this._indicator.syncUnderlineElements(n),r?this._indicator.trackUnderlines():this._indicator.positionUnderlines())}};function Ii(e,t){return t==="vertical"?e.height:e.width}function br(e,t){return t==="vertical"?e.top:e.left}function Yd(e,t){return t==="vertical"?e.clientY:e.clientX}var Sv=class extends V{get _tabs(){return this.host.tabItems}get _tabMap(){return this.host.tabMap}get _tabsList(){return this.host.tabsList}get _direction(){return this.host.direction}get group(){return this.host.groupPanel}get accessor(){return this.host.component}get _tabGroupManager(){return this.host.tabGroupManager}get _wrapMode(){return this._tabsList.classList.contains($d)}get animState(){return this._animState}set animState(e){this._animState=e}get pendingCollapse(){return this._pendingCollapse}set pendingCollapse(e){this._pendingCollapse=e}set voidContainerElement(e){this._voidContainer=e}constructor(e){super(),this.host=e,this._animState=null,this._pendingMarginCleanups=new Map,this._pendingCollapse=!1,this._flipTransitionCleanup=null,this._voidContainer=null,this._extendedDropZone=null,this._pointerInsideTabsList=!1,this._wrapIndicatorEl=null,this.addDisposables({dispose:()=>{var t;(t=this._flipTransitionCleanup)===null||t===void 0||t.call(this)}})}setExtendedDropZone(e){this._extendedDropZone=e}setExternalInsertionIndex(e){this._animState&&e!==this._animState.currentInsertionIndex&&(this._animState.currentInsertionIndex=e,this.applyDragOverTransforms())}clearExternalAnimState(){this._animState&&(this.resetTabTransforms(),this._animState.sourceIndex===-1?this._animState=null:this._animState.currentInsertionIndex=null)}snapshotTabPositions(){let e=new Map;for(let t of this._tabs)e.set(t.value.panel.id,t.value.element.getBoundingClientRect());return e}_mainAxisSize(e){return Ii(e,this._direction)}_mainAxisStart(e){return br(e,this._direction)}_mainAxisCoord(e,t){return Yd({clientX:e,clientY:t},this._direction)}get _gapMarginProperty(){return this._direction==="vertical"?"margin-top":"margin-left"}getAverageTabSize(){if(this._tabs.length===0)return 0;let e=0;for(let t of this._tabs)e+=this._mainAxisSize(t.value.element.getBoundingClientRect());return e/this._tabs.length}handlePointerDragMove(e,t){let i=yr(this._tabsList).elementFromPoint(e,t);if(!(i&&(this._tabsList.contains(i)||this._extendedDropZone&&this._extendedDropZone.contains(i)))){this._pointerInsideTabsList&&(this._pointerInsideTabsList=!1,this.processDragLeave(i));return}this._pointerInsideTabsList=!0,this.processDragOver(e,t)}handlePointerDragEnd(e){if(e&&this._animState&&this._animState.sourceIndex!==-1&&this._animState.currentInsertionIndex!==null&&this.isPointInsideTabsList(e.clientX,e.clientY)){let t=this._animState.sourceTabGroupId;if(t){let i=this._animState.currentInsertionIndex;this._animState=null,this.commitGroupMove(t,i)}else this.commitPointerReorder(e.pointerEvent)}this._pointerInsideTabsList=!1,this.resetDragAnimation()}isPointInsideTabsList(e,t){let i=yr(this._tabsList).elementFromPoint(e,t);return!!i&&this._tabsList.contains(i)}resolveTabDrop(e){var t,i;let r=e.currentInsertionIndex;if(r===null)return null;let{sourceIndex:o,targetTabGroupId:s}=e,n=r-(o!==-1&&o<r?1:0);return n===o&&s===((t=(i=this.group.model.getTabGroupForPanel(e.sourceTabId))===null||i===void 0?void 0:i.id)!==null&&t!==void 0?t:null)?null:{index:n,targetTabGroupId:s}}commitPointerReorder(e){let t=this._animState;if(t?.currentInsertionIndex==null)return;let i=this.resolveTabDrop(t);this._animState=null,this.clearWrapDropIndicator(),this.uncollapseSourceTab(t.sourceTabId),i&&this.host.fireDrop(j({event:e},i))}processDragOver(e,t){if(this.accessor.options.disableDnd||(this._dropStaleAnimState(),!this._animState&&!this._initAnimStateForExternalDrag()))return!1;if(this._animState.sourceIndex!==-1){var i;(i=this.group.model.dropTargetContainer)===null||i===void 0||(i=i.model)===null||i===void 0||i.clear()}return this.handleDragOver({clientX:e,clientY:t}),!0}_dropStaleAnimState(){if(!this._animState)return;let e=he();e?.tabGroupId&&e.groupId!==this.group.id&&this._animState.sourceTabGroupId!==e.tabGroupId&&(this._animState=null)}_initAnimStateForExternalDrag(){var e;let t=he();if(((e=this.accessor.options.theme)===null||e===void 0?void 0:e.tabAnimation)==="default"&&!t?.tabGroupId||!t||!(t.panelId||t.tabGroupId)||t.groupId===this.group.id)return!1;let i=this.getAverageTabSize();return this._animState=t.tabGroupId?this._makeGroupDragAnimState(t,i):this._makeTabDragAnimState(t,i),!0}_makeGroupDragAnimState(e,t){var i;let r=this.accessor.getPanel(e.groupId),o=r?.model.getTabGroups().find(n=>n.id===e.tabGroupId),s=t*((i=o?.panelIds.length)!==null&&i!==void 0?i:1)+t;return{sourceTabId:"",sourceIndex:-1,tabPositions:this.snapshotTabPositions(),chipSizes:this._tabGroupManager.snapshotChipSizes(),currentInsertionIndex:null,targetTabGroupId:null,sourceTabGroupId:e.tabGroupId,sourceGroupPanelIds:o?new Set(o.panelIds):new Set,sourceChipSize:t,cursorOffsetFromDragStart:s/2,sourceGapSize:s,containerStart:this._mainAxisStart(this._tabsList.getBoundingClientRect())}}_makeTabDragAnimState(e,t){return{sourceTabId:e.panelId,sourceIndex:-1,tabPositions:this.snapshotTabPositions(),chipSizes:this._tabGroupManager.snapshotChipSizes(),currentInsertionIndex:null,targetTabGroupId:null,sourceTabGroupId:null,sourceGroupPanelIds:null,sourceChipSize:0,cursorOffsetFromDragStart:t/2,sourceGapSize:t,containerStart:this._mainAxisStart(this._tabsList.getBoundingClientRect())}}processDragLeave(e){var t;if(this._animState&&!(e&&this._tabsList.contains(e))){if(e&&(!((t=this._extendedDropZone)===null||t===void 0)&&t.contains(e))){this.resetTabTransforms(),this._animState.currentInsertionIndex=null;return}this._voidContainer&&e&&(e===this._voidContainer||this._voidContainer.contains(e))||(this.resetTabTransforms(),this._animState.sourceIndex===-1?(this.clearHeaderAnchorOverlay(),this._animState=null):this._animState.currentInsertionIndex=null)}}clearHeaderAnchorOverlay(){var e;let t=this.group.model.dropTargetContainer,i=t?.renderedOutline;i&&![this._tabsList,this._voidContainer,this._extendedDropZone].some(r=>r?.contains(i))||t==null||(e=t.model)===null||e===void 0||e.clear()}handleDragOver(e){var t,i;if(!this._animState)return;if(this._wrapMode&&!this._animState.sourceTabGroupId){var r;this.handleWrappedDragOver(e.clientX,(r=e.clientY)!==null&&r!==void 0?r:0);return}let o=this._mainAxisCoord(e.clientX,(t=e.clientY)!==null&&t!==void 0?t:0),s=this._buildFirstPanelToGroupMap(),n=this._computeDragOverInsertionIndex(o,s),a=null;if(n!==null&&this._tabGroupManager.chipRenderers.size>0){let l=this._resolveInsertionAgainstTabGroups(o,n,s);n=l.insertionIndex,a=l.targetTabGroupId}n===this._animState.currentInsertionIndex&&a===this._animState.targetTabGroupId||(this._animState.currentInsertionIndex=n,this._animState.targetTabGroupId=a,((i=this.accessor.options.theme)===null||i===void 0?void 0:i.tabAnimation)==="smooth"&&this.applyDragOverTransforms())}_buildFirstPanelToGroupMap(){let e=new Map;if(this._tabGroupManager.chipRenderers.size===0)return e;for(let t of this.group.model.getTabGroups())t.id!==this._animState.sourceTabGroupId&&t.panelIds.length>0&&e.set(t.panelIds[0],t.id);return e}_computeDragOverInsertionIndex(e,t){let i=this._animState,r=i.sourceGroupPanelIds,o=e-i.cursorOffsetFromDragStart-i.containerStart,s=0,n=null;for(let h=0;h<this._tabs.length;h++){let c=this._tabs[h].value;if(c.panel.id===i.sourceTabId||r?.has(c.panel.id))continue;let u=t.get(c.panel.id);if(u){var a;let g=(a=i.chipSizes.get(u))!==null&&a!==void 0?a:0;if(s+g>o){var l;(l=n)!==null&&l!==void 0||(n=h);break}s+=g}let p=i.tabPositions.get(c.panel.id),v=this._mainAxisSize(p??c.element.getBoundingClientRect());if(s+v/2<=o)s+=v,n=h+1;else{var d;(d=n)!==null&&d!==void 0||(n=h);break}}return n}_accumulatedSizeUpTo(e,t){let i=this._animState,r=i.sourceGroupPanelIds,o=0;for(let n=0;n<this._tabs.length;n++){let a=this._tabs[n].value;if(a.panel.id===i.sourceTabId||r?.has(a.panel.id))continue;if(n>=e)break;let l=t.get(a.panel.id);if(l){var s;o+=(s=i.chipSizes.get(l))!==null&&s!==void 0?s:0}let d=i.tabPositions.get(a.panel.id);o+=this._mainAxisSize(d??a.element.getBoundingClientRect())}return o}_resolveInsertionAgainstTabGroups(e,t,i){var r;let o=!!this._animState.sourceTabGroupId,s=this._accumulatedSizeUpTo(t,i);for(let a of this.group.model.getTabGroups()){let l=this._evaluateTabGroupForInsertion(a,e,t,s,o);if(l){var n;return l.targetTabGroupId?l:(n=this._keepSourceGroupAtOwnSlot(e,l.insertionIndex,s))!==null&&n!==void 0?n:l}}return(r=this._keepSourceGroupAtOwnSlot(e,t,s))!==null&&r!==void 0?r:{insertionIndex:t,targetTabGroupId:null}}_keepSourceGroupAtOwnSlot(e,t,i){let r=this._animState,o=r.sourceIndex;if(r.sourceGroupPanelIds||o===-1||t!==o&&t!==o+1)return null;let s=this.group.model.getTabGroups().find(a=>a.panelIds.includes(r.sourceTabId));if(!s)return null;if(s.panelIds[0]===r.sourceTabId){var n;let a=(n=r.chipSizes.get(s.id))!==null&&n!==void 0?n:0;if(e<r.containerStart+i+a)return null}return{insertionIndex:t,targetTabGroupId:s.id}}_evaluateTabGroupForInsertion(e,t,i,r,o){let s=this._resolveGroupRange(e);if(!s)return null;let{firstIdx:n,lastIdx:a}=s,l=i>=n&&i<=a,d=!l&&i===n-1;return!l&&!d?null:o?this._resolveGroupDragTarget(i,n,a,l):this._resolveTabDragTarget(e,t,i,r,n,d)}_resolveGroupRange(e){let t=this._animState,i=t.sourceGroupPanelIds,r=e.panelIds.filter(n=>n!==t.sourceTabId&&!i?.has(n));if(r.length===0)return null;let o=this._tabs.findIndex(n=>n.value.panel.id===r[0]),s=this._tabs.findIndex(n=>n.value.panel.id===r[r.length-1]);return o===-1||s===-1?null:{firstIdx:o,lastIdx:s}}_resolveGroupDragTarget(e,t,i,r){return r?{insertionIndex:e<(t+i+1)/2?t:i+1,targetTabGroupId:null}:{insertionIndex:e,targetTabGroupId:null}}_resolveTabDragTarget(e,t,i,r,o,s){var n;let a=this._animState,l=(n=a.chipSizes.get(e.id))!==null&&n!==void 0?n:0;if(s)return this._onlySourceBetween(i,o)?t>=(e.collapsed?a.containerStart+r+l/2:a.containerStart+r+l)?{insertionIndex:o,targetTabGroupId:e.id}:{insertionIndex:i,targetTabGroupId:null}:null;let d=a.containerStart+r+l;return i===o?{insertionIndex:i,targetTabGroupId:t>=d?e.id:null}:{insertionIndex:i,targetTabGroupId:e.id}}_onlySourceBetween(e,t){let i=this._animState;for(let o=e;o<t;o++){var r;let s=this._tabs[o].value.panel.id;if(s!==i.sourceTabId&&!(!((r=i.sourceGroupPanelIds)===null||r===void 0)&&r.has(s)))return!1}return!0}handleWrappedDragOver(e,t){if(!this._animState)return;let i=this.computeWrappedInsertionIndex(e,t);i===this._animState.currentInsertionIndex&&this._animState.targetTabGroupId===null||(this._animState.currentInsertionIndex=i,this._animState.targetTabGroupId=null,this.updateWrapDropIndicator(i))}computeWrappedInsertionIndex(e,t){var i;let r=this._direction==="vertical",o=this._wrappedDragEntries();if(o.length===0)return this._tabs.length;let s=r?e:t,n=r?t:e,a=p=>r?p.left:p.top,l=p=>r?p.right:p.bottom,d=p=>r?p.top:p.left,h=p=>r?p.height:p.width,c=this._bucketWrappedLines(o,a,l),u=[...((i=c.find(p=>s>=p.start&&s<=p.end))!==null&&i!==void 0?i:this._nearestWrappedLine(c,s)).items].sort((p,v)=>d(p.rect)-d(v.rect));for(let p of u)if(n<d(p.rect)+h(p.rect)/2)return p.index;return u[u.length-1].index+1}_wrappedDragEntries(){var e,t;let i=(e=this._animState)===null||e===void 0?void 0:e.sourceTabId,r=(t=this._animState)===null||t===void 0?void 0:t.sourceGroupPanelIds,o=[];for(let s=0;s<this._tabs.length;s++){let n=this._tabs[s].value;n.panel.id!==i&&(r?.has(n.panel.id)||o.push({index:s,rect:n.element.getBoundingClientRect()}))}return o}_bucketWrappedLines(e,t,i){let r=[];for(let o of e){let s=t(o.rect),n=r.find(a=>Math.abs(a.start-s)<=2);n?(n.items.push(o),n.end=Math.max(n.end,i(o.rect))):r.push({start:s,end:i(o.rect),items:[o]})}return r.sort((o,s)=>o.start-s.start),r}_nearestWrappedLine(e,t){let i=r=>t<r.start?r.start-t:t-r.end;return e.reduce((r,o)=>i(o)<i(r)?o:r,e[0])}updateWrapDropIndicator(e){var t;this.clearWrapDropIndicator();let i=this._tabs.length;if(i===0)return;let r=(t=this._animState)===null||t===void 0?void 0:t.sourceTabId;if(e<i){let o=this._tabs[e].value.element;if(this._tabs[e].value.panel.id===r)return;o.classList.add("dv-tab--reorder-before"),this._wrapIndicatorEl=o}else{let o=this._tabs[i-1].value.element;o.classList.add("dv-tab--reorder-after"),this._wrapIndicatorEl=o}}clearWrapDropIndicator(){var e;(e=this._wrapIndicatorEl)===null||e===void 0||e.classList.remove("dv-tab--reorder-before","dv-tab--reorder-after"),this._wrapIndicatorEl=null}_removeClassInstantlyBatch(e,t){let i=[];for(let r of e)r.classList.contains(t)&&(r.style.transition="none",B(r,t,!1),i.push(r));if(i.length>0){i[0].getBoundingClientRect();for(let r of i)r.style.removeProperty("transition")}}uncollapseSourceTab(e){let t=this._tabMap.get(e);t&&this._removeClassInstantlyBatch([t.value.element],"dv-tab--dragging")}applyDragOverTransforms(e=!1){var t;if(this._wrapMode)return;if(((t=this._animState)===null||t===void 0?void 0:t.currentInsertionIndex)==null){this.resetTabTransforms();return}if(this._pendingCollapse)return;let i=this._animState.currentInsertionIndex,r=this._computeGapSize(),o=this._computeChipToShift(i);this._applyGapMargins(i,r,o,e)}_computeGapSize(){let e=this._animState;if(e.sourceTabGroupId&&e.sourceGroupPanelIds)return e.sourceGapSize;let t=e.tabPositions.get(e.sourceTabId);return t?this._mainAxisSize(t):this.getAverageTabSize()}_computeChipToShift(e){if(this._tabGroupManager.chipRenderers.size===0)return null;for(let t of this.group.model.getTabGroups()){let i=this._chipToShiftForGroup(t,e);if(i!==void 0)return i}return null}_chipToShiftForGroup(e,t){let i=this._animState;if(e.id===i.sourceTabGroupId||e.panelIds.includes(i.sourceTabId))return;let r=e.panelIds.filter(s=>{var n;return s!==i.sourceTabId&&!(!((n=i.sourceGroupPanelIds)===null||n===void 0)&&n.has(s))});if(r.length===0)return;let o=this._tabs.findIndex(s=>s.value.panel.id===r[0]);if((!i.targetTabGroupId||i.targetTabGroupId===e.id&&e.collapsed)&&!(o<t)){if(this._onlySourceBetween(t,o)){let s=this._tabGroupManager.chipRenderers.get(e.id);if(s)return s.chip.element}return null}}_applyGapMargins(e,t,i,r){let o=this._animState,s=o.sourceGroupPanelIds,n=!1;for(let[a,l]of this._tabGroupManager.chipRenderers)a!==o.sourceTabGroupId&&this._clearMargin(l.chip.element,r);i&&(this._setMargin(i,`${t}px`,r),n=!0);for(let a=0;a<this._tabs.length;a++){let l=this._tabs[a].value;l.panel.id!==o.sourceTabId&&(s?.has(l.panel.id)||(!n&&a>=e?(this._setMargin(l.element,`${t}px`,r),n=!0):this._clearMargin(l.element,r)))}this._tabGroupManager.trackUnderlines()}_shiftingClass(e){return e.classList.contains("dv-tab-group-chip")?"dv-tab-group-chip--shifting":"dv-tab--shifting"}_setMargin(e,t,i){let r=this._gapMarginProperty;i?(e.style.transition="none",e.style.setProperty(r,t),e.getBoundingClientRect(),e.style.removeProperty("transition")):e.style.setProperty(r,t),B(e,this._shiftingClass(e),!0)}_clearMargin(e,t){let i=this._shiftingClass(e),r=this._gapMarginProperty,o=this._pendingMarginCleanups.get(e);if(o&&o(),t||!e.style.getPropertyValue(r))e.style.removeProperty(r),B(e,i,!1);else{e.style.setProperty(r,"0px"),B(e,i,!0);let s=()=>{e.style.removeProperty(r),B(e,i,!1),e.removeEventListener("transitionend",s),clearTimeout(n),this._pendingMarginCleanups.delete(e)},n=setTimeout(s,300);this._pendingMarginCleanups.set(e,s),e.addEventListener("transitionend",s)}}resetTabTransforms(){this.clearWrapDropIndicator();for(let[,e]of this._pendingMarginCleanups)e();this._pendingMarginCleanups.clear();for(let e of this._tabs)e.value.element.style.removeProperty("margin-left"),e.value.element.style.removeProperty("margin-right"),e.value.element.style.removeProperty("margin-top"),e.value.element.style.removeProperty("margin-bottom"),e.value.element.style.removeProperty("transform"),B(e.value.element,"dv-tab--shifting",!1);for(let[,e]of this._tabGroupManager.chipRenderers)e.chip.element.style.removeProperty("margin-left"),e.chip.element.style.removeProperty("margin-top"),B(e.chip.element,"dv-tab-group-chip--shifting",!1);this._tabGroupManager.positionUnderlines()}commitGroupMove(e,t){let i=he();if(this._tabGroupManager.disposeChipDrag(e),this._tabGroupManager.clearChipDropOverlays(),this.group.model.getTabGroups().some(s=>s.id===e)){var r;if(((r=this.accessor.options.theme)===null||r===void 0?void 0:r.tabAnimation)==="smooth"){this._clearGroupDragClasses(e);let s=this.snapshotTabPositions();this.resetTabTransforms(),this.group.model.moveTabGroup(e,t),this.runFlipAnimation(s,"",!1)}else this._tabGroupManager.skipNextCollapseAnimation=!0,this.group.model.moveTabGroup(e,t)}else if(i){var o;this.resetTabTransforms(),this.accessor.moveGroupOrPanel({from:{groupId:i.groupId,tabGroupId:(o=i.tabGroupId)!==null&&o!==void 0?o:e},to:{group:this.group,position:"center",index:t}})}}_clearGroupDragClasses(e){let t=this._tabGroupManager.chipRenderers.get(e);t&&this._removeClassInstantlyBatch([t.chip.element],"dv-tab-group-chip--dragging"),this._removeClassInstantlyBatch(this._tabs.map(r=>r.value.element),"dv-tab--dragging");let i=this._tabGroupManager.groupUnderlines.get(e);i&&i.style.removeProperty("display"),this._tabGroupManager.skipNextCollapseAnimation=!0}resetDragAnimation(){if(this._pendingCollapse=!1,this._animState){this.resetTabTransforms(),this._animState.sourceTabGroupId?this._clearGroupDragClasses(this._animState.sourceTabGroupId):this._removeClassInstantlyBatch(this._tabs.map(e=>e.value.element),"dv-tab--dragging"),this._animState=null;for(let[,e]of this._tabGroupManager.groupUnderlines)e.style.removeProperty("display")}}runFlipAnimation(e,t,i=!1,r){if(this._wrapMode)return;let o=!1;for(let s=0;s<this._tabs.length;s++)this._applyFlipTransform(this._tabs[s],s,t,i,e,r)&&(o=!0);o&&this._scheduleFlipReset()}_applyFlipTransform(e,t,i,r,o,s){let n=this._direction==="vertical",a=e.value.panel.id;if(a===i){if(!r)return!1;let c=e.value.element.getBoundingClientRect();return e.value.element.style.transform=n?`translateY(${c.height}px)`:`translateX(${c.width}px)`,B(e.value.element,"dv-tab--shifting",!0),!0}if(s!==void 0&&(t<s.from||t>s.to))return!1;let l=o.get(a);if(!l)return!1;let d=e.value.element.getBoundingClientRect(),h=n?l.top-d.top:l.left-d.left;return Math.abs(h)<1?!1:(e.value.element.style.transform=n?`translateY(${h}px)`:`translateX(${h}px)`,B(e.value.element,"dv-tab--shifting",!0),!0)}_scheduleFlipReset(){requestAnimationFrame(()=>{var e;for(let r of this._tabs)r.value.element.style.transform&&(r.value.element.style.transform="");this._tabGroupManager.trackUnderlines(),(e=this._flipTransitionCleanup)===null||e===void 0||e.call(this);let t=r=>{if(r.propertyName==="transform"){i();for(let o of this._tabs)B(o.value.element,"dv-tab--shifting",!1);this._tabGroupManager.positionUnderlines()}},i=()=>{this._tabsList.removeEventListener("transitionend",t),this._flipTransitionCleanup=null};this._flipTransitionCleanup=i,this._tabsList.addEventListener("transitionend",t)})}},yv=class extends V{get _animState(){return this._reorder.animState}set _animState(e){this._reorder.animState=e}get _pendingCollapse(){return this._reorder.pendingCollapse}set _pendingCollapse(e){this._reorder.pendingCollapse=e}get tabItems(){return this._tabs}get tabMap(){return this._tabMap}get tabsList(){return this._tabsList}get groupPanel(){return this.group}get component(){return this.accessor}get tabGroupManager(){return this._tabGroupManager}fireDrop(e){this._onDrop.fire(e)}setOverflowExclude(e){this._overflowExclude=e,this.refreshOverflow()}setForcedOverflow(e){this._forcedOverflow=e,this.refreshOverflow()}refreshOverflow(){this._showTabsOverflowControl&&this.toggleDropdown({reset:!1}),this._applyPinnedSticky()}setPinnedSticky(e){this._pinnedSticky!==e&&(this._pinnedSticky=e,this._applyPinnedSticky())}_applyPinnedSticky(){let e=this._pinnedSticky?this._tabs.filter(i=>this._overflowExclude(i.value.panel.id)):[];if(e.length===0&&!this._hasPinnedStickyStyling)return;for(let i of this._tabs){let r=i.value.element;r.classList.contains("dv-tab--pinned-sticky")&&(r.classList.remove("dv-tab--pinned-sticky"),r.style.removeProperty("--dv-pinned-sticky-left"))}if(e.length===0){this._hasPinnedStickyStyling=!1;return}let t=e.map(i=>i.value.element.offsetLeft);e.forEach((i,r)=>{let o=i.value.element;o.classList.add("dv-tab--pinned-sticky"),o.style.setProperty("--dv-pinned-sticky-left",`${t[r]}px`)}),this._hasPinnedStickyStyling=!0}get showTabsOverflowControl(){return this._showTabsOverflowControl}set showTabsOverflowControl(e){if(this._showTabsOverflowControl!=e)if(this._showTabsOverflowControl=e,e){let t=new cp(this._tabsList);this._observerDisposable.value=new V(t,t.onDidChange(i=>{let r=i.hasScrollX||i.hasScrollY;this.toggleDropdown({reset:!r}),this._applyPinnedSticky(),this._tabGroupManager.groupUnderlines.size>0&&this._tabGroupManager.positionUnderlines()}),$(this._tabsList,"scroll",()=>{this.toggleDropdown({reset:!1}),this._applyPinnedSticky(),this._tabGroupManager.groupUnderlines.size>0&&this._tabGroupManager.positionUnderlines()}))}else this._observerDisposable.value=ee.NONE}get element(){return this._element}get tabsListElement(){return this._tabsList}set voidContainer(e){var t;(t=this._voidContainerListeners)===null||t===void 0||t.dispose(),this._voidContainerListeners=null,this._reorder.voidContainerElement=e,e&&(this._voidContainerListeners=new V($(e,"dragover",i=>{this._animState&&i.preventDefault()}),$(e,"drop",i=>{var r;!((r=this._animState)===null||r===void 0)&&r.sourceTabGroupId&&this._animState.currentInsertionIndex!==null&&(i.preventDefault(),i.stopPropagation(),this.handleVoidDrop())})))}handleVoidDrop(){var e,t;if(!(!((e=this._animState)===null||e===void 0)&&e.sourceTabGroupId))return!1;let i=this._animState.sourceTabGroupId,r=(t=this._animState.currentInsertionIndex)!==null&&t!==void 0?t:this._tabs.length;return this._animState=null,this._commitGroupMove(i,r),!0}get panels(){return this._tabs.map(e=>e.value.panel.id)}get size(){return this._tabs.length}get tabs(){return this._tabs.map(e=>e.value)}get direction(){return this._direction}set direction(e){if(this._direction!==e){this._direction=e,this._tabsList.setAttribute("aria-orientation",e==="vertical"?"vertical":"horizontal"),this._scrollbar&&(this._scrollbar.orientation=e),Ct(this._tabsList,"dv-horizontal","dv-vertical"),e==="vertical"?kt(this._tabsList,"dv-tabs-container-vertical","dv-vertical"):(Ct(this._tabsList,"dv-tabs-container-vertical"),kt(this._tabsList,"dv-horizontal"));for(let t of this._tabs)t.value.setDirection(e);this._tabGroupManager.updateDirection()}}constructor(e,t,i){super(),this.group=e,this.accessor=t,this._observerDisposable=new Ee,this._pointerActivation=new Ee,this._scrollbar=null,this._tabs=[],this._overflowRefreshPending=!1,this._tabMap=new Map,this.selectedIndex=-1,this._showTabsOverflowControl=!1,this._overflowExclude=()=>!1,this._forcedOverflow=()=>!1,this._pinnedSticky=!1,this._hasPinnedStickyStyling=!1,this._direction="horizontal",this._voidContainerListeners=null,this._onTabDragStart=new E,this.onTabDragStart=this._onTabDragStart.event,this._onDrop=new E,this.onDrop=this._onDrop.event,this._onWillShowOverlay=new E,this.onWillShowOverlay=this._onWillShowOverlay.event,this._onOverflowTabsChange=new E,this.onOverflowTabsChange=this._onOverflowTabsChange.event,this._tabsList=document.createElement("div"),this._tabsList.className="dv-tabs-container",this._tabsList.setAttribute("role","tablist"),this._tabsList.setAttribute("aria-orientation",this._direction==="vertical"?"vertical":"horizontal"),this.showTabsOverflowControl=i.showTabsOverflowControl,t.options.scrollbars==="native"?this._element=this._tabsList:(this._scrollbar=new Wd(this._tabsList),this._scrollbar.orientation=this.direction,this._element=this._scrollbar.element,this.addDisposables(this._scrollbar)),this._tabGroupManager=new wv({group:this.group,accessor:this.accessor,tabsList:this._tabsList,getTabs:()=>this._tabs,getTabMap:()=>this._tabMap,getDirection:()=>this._direction},{onChipContextMenu:(o,s)=>{var n;(n=this.accessor.contextMenuService)===null||n===void 0||n.showForChip(o,this.group,s)},onChipDragStart:(o,s,n)=>{this._handleChipDragStart(o,s,n)},onChipDragEnd:()=>{this._reorder.resetDragAnimation()},onChipDrop:(o,s)=>{this._handleChipDrop(o,s)}}),this._reorder=new Sv(this);let r=ct.createDropTarget(this._tabsList,{acceptedTargetZones:["center"],canDisplayOverlay:()=>!1,isHitTestTransparent:()=>{let o=he();return o?.viewId!==this.accessor.id||o.groupId!==this.group.id?!0:o.panelId===null&&!o.tabGroupId}});this.addDisposables(r,this._onOverflowTabsChange,this._observerDisposable,this._pointerActivation,this._onWillShowOverlay,this._onDrop,this._onTabDragStart,this._reorder,kr.getInstance().onDragEnd(o=>{this._reorder.handlePointerDragEnd(o)}),kr.getInstance().onDragMove(o=>{this._reorder.handlePointerDragMove(o.clientX,o.clientY)}),$(this.element,"pointerdown",o=>{o.defaultPrevented||o.button===0&&this.accessor.doSetGroupActive(this.group)}),$(this._tabsList,"wheel",o=>{let s=this._direction==="vertical",n=s?o.deltaY||o.deltaX:o.deltaX||o.deltaY;if(n===0)return;let a=s?this._tabsList.scrollHeight-this._tabsList.clientHeight:this._tabsList.scrollWidth-this._tabsList.clientWidth;if(a<=0)return;let l=s?this._tabsList.scrollTop:this._tabsList.scrollLeft;n<0&&l<=0||n>0&&l>=a||(o.preventDefault(),o.stopPropagation(),s?this._tabsList.scrollTop=l+n:this._tabsList.scrollLeft=l+n)},{passive:!1}),$(this._tabsList,"keydown",o=>{this._onKeyDown(o)}),$(this._tabsList,"dragover",o=>{this._reorder.processDragOver(o.clientX,o.clientY)&&o.preventDefault()},!0),$(this._tabsList,"dragleave",o=>{this._reorder.processDragLeave(o.relatedTarget)},!0),$(this._tabsList,"dragend",()=>{this._reorder.resetDragAnimation()}),$(this._tabsList,"drop",o=>{var s,n,a;if(((s=this._animState)===null||s===void 0?void 0:s.currentInsertionIndex)==null||((n=this.accessor.options.theme)===null||n===void 0?void 0:n.tabAnimation)!=="smooth"&&!this._animState.sourceTabGroupId)return;o.stopPropagation(),o.preventDefault(),(a=this.group.model.dropTargetContainer)===null||a===void 0||(a=a.model)===null||a===void 0||a.clear();let l=this._animState;if(this._animState=null,this._pendingCollapse=!1,l.sourceTabGroupId){this._commitGroupMove(l.sourceTabGroupId,l.currentInsertionIndex);return}let d=this._reorder.resolveTabDrop(l);if(this._reorder.uncollapseSourceTab(l.sourceTabId),!d){this.resetTabTransforms();return}let h=l.sourceIndex,c=this.snapshotTabPositions();this.resetTabTransforms(),this._onDrop.fire(j({event:o},d)),this.runFlipAnimation(c,l.sourceTabId,h===-1,{from:Math.min(h,d.index),to:Math.max(h,d.index)})},!0),ee.from(()=>{var o;(o=this._voidContainerListeners)===null||o===void 0||o.dispose(),this._reorder.resetDragAnimation(),this._tabGroupManager.disposeAll();for(let{value:s,disposable:n}of this._tabs)n.dispose(),s.dispose();this._tabs=[],this._tabMap.clear()}))}indexOf(e){return this._tabs.findIndex(t=>t.value.panel.id===e)}getTabId(e){var t;return(t=this._tabMap.get(e))===null||t===void 0?void 0:t.value.element.id}getPanelForTab(e){for(let{value:t}of this._tabs)if(t.element===e||t.element.contains(e))return t.panel}isActive(e){return this.selectedIndex>-1&&this._tabs[this.selectedIndex].value===e}_onKeyDown(e){let t=this._tabs.findIndex(n=>n.value.element===e.target);if(t===-1)return;let i=this._direction==="vertical",r=i?"ArrowDown":"ArrowRight",o=i?"ArrowUp":"ArrowLeft",s=this._tabs.length-1;switch(e.key){case r:e.preventDefault(),this._focusTab(Math.min(t+1,s));break;case o:e.preventDefault(),this._focusTab(Math.max(t-1,0));break;case"Home":e.preventDefault(),this._focusTab(0);break;case"End":e.preventDefault(),this._focusTab(s);break;case"Enter":case" ":e.preventDefault(),this.accessor.withOrigin("user",()=>this._tabs[t].value.panel.api.setActive());break;case"Delete":case"Backspace":e.preventDefault(),this._closeTab(t);break}}_closeTab(e){var t,i,r,o,s;let n=(t=this._tabs[e])===null||t===void 0?void 0:t.value;if(!n)return;let a=(i=(r=(o=this._tabs[e+1])===null||o===void 0?void 0:o.value)!==null&&r!==void 0?r:(s=this._tabs[e-1])===null||s===void 0?void 0:s.value)===null||i===void 0?void 0:i.panel.id;if(n.panel.api.close(),a!==void 0){let l=this._tabs.findIndex(d=>d.value.panel.id===a);l>-1&&this._focusTab(l)}}_focusTab(e){for(let t=0;t<this._tabs.length;t++)this._tabs[t].value.element.tabIndex=t===e?0:-1;this._tabs[e].value.element.focus()}focusActiveTab(){var e;if(this._tabs.length===0)return;let t=(e=this.group.activePanel)===null||e===void 0?void 0:e.id,i=t?this._tabs.findIndex(r=>r.value.panel.id===t):-1;this._focusTab(i>-1?i:0)}setActivePanel(e){let t=this._direction==="vertical";for(let i of this._tabs){let r=e.id===i.value.panel.id;i.value.setActive(r),r&&this._scrollTabIntoView(i.value.element,t)}this._tabGroupManager.groupUnderlines.size>0&&this._tabGroupManager.positionUnderlines()}_scrollTabIntoView(e,t){let i=e.parentElement;if(!i)return;let r=t?e.offsetTop:e.offsetLeft,o=t?e.offsetHeight:e.offsetWidth,s=t?i.scrollTop:i.scrollLeft,n=t?i.clientHeight:i.clientWidth;(r<s||r+o>s+n)&&(t?i.scrollTop=r:i.scrollLeft=r)}_activateOnPointerDown(e){if(!et(this.accessor.options).html5){this.group.model.openPanel(e);return}let t=requestAnimationFrame(()=>{this._tabMap.has(e.id)&&this.group.model.openPanel(e)});this._pointerActivation.value={dispose:()=>cancelAnimationFrame(t)}}openPanel(e,t=this._tabs.length){if(this._tabMap.has(e.id))return;let i=new uv(e,this.accessor,this.group);i.setContent(e.view.tab),this._direction!=="horizontal"&&i.setDirection(this._direction);let r={value:i,disposable:new V(i.onDragStart(o=>{var s;let n=o.defaultPrevented;if(this._onTabDragStart.fire({nativeEvent:o,panel:e}),!(o.defaultPrevented&&!n)&&((s=this.accessor.options.theme)===null||s===void 0?void 0:s.tabAnimation)==="smooth"){let a=Ii(i.element.getBoundingClientRect(),this._direction),l=this._tabs.findIndex(d=>d.value===i);this._animState={sourceTabId:e.id,sourceIndex:l,tabPositions:this.snapshotTabPositions(),chipSizes:this._tabGroupManager.snapshotChipSizes(),currentInsertionIndex:null,targetTabGroupId:null,sourceTabGroupId:null,sourceGroupPanelIds:null,sourceChipSize:0,cursorOffsetFromDragStart:a/2,sourceGapSize:a,containerStart:br(this._tabsList.getBoundingClientRect(),this._direction)},this._pendingCollapse=!0,requestAnimationFrame(()=>{var d,h;this._pendingCollapse=!1,this._animState&&(this._tabsList.classList.contains("dv-tabs-container--wrap")||(i.element.style.transition="none",B(i.element,"dv-tab--dragging",!0),i.element.offsetHeight),(h=(d=this._animState).currentInsertionIndex)!==null&&h!==void 0||(d.currentInsertionIndex=l),this.applyDragOverTransforms(!0),i.element.style.removeProperty("transition"))})}}),i.onTabClick(o=>{o.defaultPrevented||this.group.api.location.type==="edge"&&(this.group.activePanel===e?this.group.api.isCollapsed()?this.group.api.expand():this.group.api.collapse():(this.group.model.openPanel(e),this.group.api.isCollapsed()&&this.group.api.expand()))}),i.onPointerDown(o=>{if(o.defaultPrevented)return;let s=!this.accessor.options.disableFloatingGroups,n=this.group.api.location.type==="floating"&&this.size===1;if(s&&!n&&o.shiftKey){o.preventDefault();let a=this.accessor.getGroupPanel(i.panel.id),{top:l,left:d}=i.element.getBoundingClientRect(),{top:h,left:c}=this.accessor.element.getBoundingClientRect();this.accessor.addFloatingGroup(a,{x:d-c,y:l-h,inDragMode:!0});return}o.button===0&&this.group.api.location.type!=="edge"&&this.group.activePanel!==e&&this._activateOnPointerDown(e)}),i.onDrop(o=>{let s=this._animState;this._animState=null,this._pendingCollapse=!1;let n=this._tabs.findIndex(c=>c.value===i);if(s){var a;let c=o.position==="right"?n+1:n;if(s.sourceTabGroupId){var l;this._commitGroupMove(s.sourceTabGroupId,(l=s.currentInsertionIndex)!==null&&l!==void 0?l:c);return}this._reorder.uncollapseSourceTab(s.sourceTabId);let u=this.snapshotTabPositions();this.resetTabTransforms(),this._onDrop.fire({event:o.nativeEvent,index:c,targetTabGroupId:s.targetTabGroupId}),((a=this.accessor.options.theme)===null||a===void 0?void 0:a.tabAnimation)==="smooth"&&this.runFlipAnimation(u,s.sourceTabId,s.sourceIndex===-1,s.sourceIndex===-1?void 0:{from:Math.min(s.sourceIndex,c),to:Math.max(s.sourceIndex,c)})}else{var d,h;let c=this._direction==="vertical"?"bottom":"right",u=o.position===c?n+1:n,p=he(),v=p?this._tabs.findIndex(f=>f.value.panel.id===p.panelId):-1,g=u-(v!==-1&&v<u?1:0),m=(d=(h=this.group.model.getTabGroupForPanel(i.panel.id))===null||h===void 0?void 0:h.id)!==null&&d!==void 0?d:null;this._onDrop.fire({event:o.nativeEvent,index:g,targetTabGroupId:m})}}),i.onWillShowOverlay(o=>{this._onWillShowOverlay.fire(new Oi(o,{kind:"tab",panel:this.group.activePanel,api:this.accessor.api,group:this.group,getData:he}))}))};this.addTab(r,t),this._scheduleOverflowRefresh(),this._tabGroupManager.positionAllChips(),this._animState&&(this._animState.tabPositions=this.snapshotTabPositions(),this._animState.chipSizes=this._tabGroupManager.snapshotChipSizes(),this.applyDragOverTransforms())}delete(e){var t;let i=this.indexOf(e);if(i===-1)return;((t=this._animState)===null||t===void 0?void 0:t.sourceTabId)===e&&(this.resetTabTransforms(),this._animState=null),this._tabGroupManager.cleanupTransition(e);let{value:r,disposable:o}=this._tabs.splice(i,1)[0];this._tabMap.delete(e),o.dispose(),r.dispose(),r.element.remove(),this._scheduleOverflowRefresh(),this._animState&&(this._animState.tabPositions=this.snapshotTabPositions(),this._animState.chipSizes=this._tabGroupManager.snapshotChipSizes(),this.applyDragOverTransforms())}addTab(e,t=this._tabs.length){if(t<0||t>this._tabs.length)throw new Error("invalid location");let i=t<this._tabs.length?this._tabs[t].value.element:null;this._tabsList.insertBefore(e.value.element,i),this._tabs=[...this._tabs.slice(0,t),e,...this._tabs.slice(t)],this._tabMap.set(e.value.panel.id,e),this.selectedIndex<0&&(this.selectedIndex=t)}_scheduleOverflowRefresh(){this._overflowRefreshPending||!this._showTabsOverflowControl||(this._overflowRefreshPending=!0,queueMicrotask(()=>{if(this._overflowRefreshPending=!1,this.isDisposed||!this._showTabsOverflowControl)return;let e=this._tabsList,t=e.scrollWidth>e.clientWidth||e.scrollHeight>e.clientHeight;this.toggleDropdown({reset:!t})}))}toggleDropdown(e){let t=this._tabs.some(n=>!this._overflowExclude(n.value.panel.id)&&this._forcedOverflow(n.value.panel.id));if(e.reset&&!t){this._onOverflowTabsChange.fire({tabs:[],tabGroups:[],pinnedTabs:[],reset:!0});return}let i=this._tabs.filter(n=>!this._overflowExclude(n.value.panel.id)&&(this._forcedOverflow(n.value.panel.id)||!e.reset&&!Bo(n.value.element,this._tabsList))).map(n=>n.value.panel.id),r=e.reset?[]:this._tabs.filter(n=>this._overflowExclude(n.value.panel.id)&&n.value.element.getBoundingClientRect().width>0&&!Bo(n.value.element,this._tabsList)).map(n=>n.value.panel.id),o=new Set(i),s=[];for(let n of this.group.model.getTabGroups()){let a=this._tabGroupManager.chipRenderers.get(n.id),l=a&&!Bo(a.chip.element,this._tabsList),d=n.panelIds.length>0&&n.panelIds.every(h=>o.has(h));if((l||d)&&(s.push(n.id),n.collapsed))for(let h of n.panelIds)o.has(h)||(o.add(h),i.push(h))}this._onOverflowTabsChange.fire({tabs:i,tabGroups:s,pinnedTabs:r,reset:!1})}updateDragAndDropState(){for(let e of this._tabs)e.value.updateDragAndDropState();this._tabGroupManager.updateDragAndDropState()}updateTabGroups(){this._tabGroupManager.update()}refreshTabGroupAccent(){this._tabGroupManager.refreshAccents()}_handleChipDragStart(e,t,i){var r;let o=e.panelIds[0],s=o?this._tabs.findIndex(d=>d.value.panel.id===o):-1,n=t.element.getBoundingClientRect(),a=Ii(n,this._direction);for(let d of e.panelIds){let h=this._tabMap.get(d);h&&(a+=Ii(h.value.element.getBoundingClientRect(),this._direction))}if(this._animState={sourceTabId:"",sourceIndex:s,tabPositions:this.snapshotTabPositions(),chipSizes:this._tabGroupManager.snapshotChipSizes(),currentInsertionIndex:null,targetTabGroupId:null,sourceTabGroupId:e.id,sourceGroupPanelIds:new Set(e.panelIds),sourceChipSize:Ii(n,this._direction),cursorOffsetFromDragStart:Yd(i,this._direction)-br(n,this._direction),sourceGapSize:a,containerStart:br(this._tabsList.getBoundingClientRect(),this._direction)},((r=this.accessor.options.theme)===null||r===void 0?void 0:r.tabAnimation)!=="smooth")return;let l=new Set(e.panelIds);this._pendingCollapse=!0,requestAnimationFrame(()=>{var d,h;if(this._pendingCollapse=!1,!this._animState)return;for(let p of this._tabs)l.has(p.value.panel.id)&&(p.value.element.style.transition="none",B(p.value.element,"dv-tab--dragging",!0));let c=this._tabGroupManager.chipRenderers.get(e.id);c&&(c.chip.element.style.transition="none",B(c.chip.element,"dv-tab-group-chip--dragging",!0)),this._tabsList.offsetHeight;let u=this._tabGroupManager.groupUnderlines.get(e.id);u&&(u.style.display="none"),(h=(d=this._animState).currentInsertionIndex)!==null&&h!==void 0||(d.currentInsertionIndex=s),this.applyDragOverTransforms(!0);for(let p of this._tabs)l.has(p.value.panel.id)&&p.value.element.style.removeProperty("transition");c&&c.chip.element.style.removeProperty("transition")})}_handleChipDrop(e,t){let i=e.panelIds[0];if(!i)return;let r=this._tabs.findIndex(l=>l.value.panel.id===i);if(r===-1)return;let o=he();if(o?.tabGroupId){var s;let l=this._animState;this._animState=null,this._pendingCollapse=!1,this._commitGroupMove(o.tabGroupId,(s=l?.currentInsertionIndex)!==null&&s!==void 0?s:r);return}let n=o?.groupId===this.group.id&&o?.panelId?this._tabs.findIndex(l=>l.value.panel.id===o.panelId):-1,a=r-(n!==-1&&n<r?1:0);this._onDrop.fire({event:t.nativeEvent,index:a,targetTabGroupId:null})}setExtendedDropZone(e){this._reorder.setExtendedDropZone(e)}setExternalInsertionIndex(e){this._reorder.setExternalInsertionIndex(e)}clearExternalAnimState(){this._reorder.clearExternalAnimState()}snapshotTabPositions(){return this._reorder.snapshotTabPositions()}handleDragOver(e){this._reorder.handleDragOver(e)}applyDragOverTransforms(e=!1){this._reorder.applyDragOverTransforms(e)}resetTabTransforms(){this._reorder.resetTabTransforms()}_commitGroupMove(e,t){this._reorder.commitGroupMove(e,t)}runFlipAnimation(e,t,i=!1,r){this._reorder.runFlipAnimation(e,t,i,r)}};function xv(){let e=document.createElement("div");e.className="dv-tabs-overflow-dropdown-default";let t=document.createElement("span");t.textContent="";let i=nv();return e.appendChild(i),e.appendChild(t),{element:e,update:r=>{t.textContent=`${r.tabs}`}}}var Cv=class extends V{get onTabDragStart(){return this.tabs.onTabDragStart}get panels(){return this.tabs.panels}get size(){return this.tabs.size}get hidden(){return this._hidden}set hidden(e){this._hidden=e,this.element.style.display=e?"none":""}get direction(){return this._direction}set direction(e){this._direction=e,e==="vertical"?(kt(this._element,"dv-groupview-header-vertical"),kt(this.rightActionsContainer,"dv-right-actions-container-vertical"),this.tabs.direction=e):(Ct(this._element,"dv-groupview-header-vertical"),Ct(this.rightActionsContainer,"dv-right-actions-container-vertical"),this.tabs.direction=e)}get element(){return this._element}get tabsListElement(){return this.tabs.tabsListElement}constructor(e,t){super(),this.accessor=e,this.group=t,this._hidden=!1,this._direction="horizontal",this._dropIndexResolver=(i,r)=>r,this._pinnedRow=void 0,this.dropdownPart=null,this._overflowTabs=[],this._overflowTabGroups=[],this._overflowPinnedTabs=[],this._dropdownDisposable=new Ee,this._onDrop=new E,this.onDrop=this._onDrop.event,this._onGroupDragStart=new E,this.onGroupDragStart=this._onGroupDragStart.event,this._onWillShowOverlay=new E,this.onWillShowOverlay=this._onWillShowOverlay.event,this._element=document.createElement("div"),this._element.className="dv-tabs-and-actions-container",B(this._element,"dv-full-width-single-tab",this.accessor.options.singleTabMode==="fullwidth"),this.rightActionsContainer=document.createElement("div"),this.rightActionsContainer.className="dv-right-actions-container",this.leftActionsContainer=document.createElement("div"),this.leftActionsContainer.className="dv-left-actions-container",this.preActionsContainer=document.createElement("div"),this.preActionsContainer.className="dv-pre-actions-container",this.tabs=new yv(t,e,{showTabsOverflowControl:!e.options.disableTabsOverflowList}),this.voidContainer=new pv(this.accessor,this.group),this.tabs.voidContainer=this.voidContainer.element,this._element.appendChild(this.preActionsContainer),this._element.appendChild(this.tabs.element),this._element.appendChild(this.leftActionsContainer),this._element.appendChild(this.voidContainer.element),this._element.appendChild(this.rightActionsContainer),this.tabs.setExtendedDropZone(this._element),this.addDisposables(this.tabs.onDrop(i=>this._onDrop.fire(i)),this.tabs.onWillShowOverlay(i=>this._onWillShowOverlay.fire(i)),e.onDidOptionsChange(()=>{this.tabs.showTabsOverflowControl=!e.options.disableTabsOverflowList}),this.tabs.onOverflowTabsChange(i=>{this.toggleDropdown(i)}),this.tabs,this._onWillShowOverlay,this._onDrop,this._onGroupDragStart,this.voidContainer,this.voidContainer.onDragStart(i=>{this._onGroupDragStart.fire({nativeEvent:i,group:this.group})}),this.voidContainer.onDrop(i=>{this.tabs.handleVoidDrop()||this._onDrop.fire({event:i.nativeEvent,index:this.tabs.size})}),this.voidContainer.onWillShowOverlay(i=>{this._onWillShowOverlay.fire(new Oi(i,{kind:"header_space",panel:this.group.activePanel,api:this.accessor.api,group:this.group,getData:he}))}),$(this.leftActionsContainer,"dragleave",i=>{let r=i.relatedTarget;!this.leftActionsContainer.contains(r)&&!this._element.contains(r)&&this.tabs.clearExternalAnimState()}),$(this.voidContainer.element,"dragleave",i=>{let r=i.relatedTarget;this.voidContainer.element.contains(r)||(this._element.contains(r)?this.tabs.setExternalInsertionIndex(null):this.tabs.clearExternalAnimState())}),$(this.voidContainer.element,"pointerdown",i=>{if(!i.defaultPrevented&&!this.accessor.options.disableFloatingGroups&&i.shiftKey&&this.group.api.location.type!=="floating"&&this.group.api.location.type!=="edge"){i.preventDefault();let{top:r,left:o}=this.element.getBoundingClientRect(),{top:s,left:n}=this.accessor.element.getBoundingClientRect();this.accessor.addFloatingGroup(this.group,{x:o-n+20,y:r-s+20,inDragMode:!0})}}))}show(){this.hidden||(this.element.style.display="")}hide(){this._element.style.display="none"}setRightActionsElement(e){this.rightActions!==e&&(this.rightActions&&(this.rightActions.remove(),this.rightActions=void 0),e&&(this.rightActionsContainer.appendChild(e),this.rightActions=e))}setLeftActionsElement(e){this.leftActions!==e&&(this.leftActions&&(this.leftActions.remove(),this.leftActions=void 0),e&&(this.leftActionsContainer.appendChild(e),this.leftActions=e))}setPrefixActionsElement(e){this.preActions!==e&&(this.preActions&&(this.preActions.remove(),this.preActions=void 0),e&&(this.preActionsContainer.appendChild(e),this.preActions=e))}isActive(e){return this.tabs.isActive(e)}indexOf(e){return this.tabs.indexOf(e)}getTabId(e){return this.tabs.getTabId(e)}getPanelForTab(e){return this.tabs.getPanelForTab(e)}setActive(e){}delete(e){this.tabs.delete(e),this.updateClassnames()}setActivePanel(e){this.tabs.setActivePanel(e)}focusActiveTab(){this.tabs.focusActiveTab()}openPanel(e,t=this.tabs.size){this.tabs.openPanel(e,t),this.updateClassnames()}closePanel(e){this.delete(e.id)}setOverflowExclude(e){this.tabs.setOverflowExclude(e)}setForcedOverflow(e){this.tabs.setForcedOverflow(e)}setPinnedSticky(e){this.tabs.setPinnedSticky(e)}refreshOverflow(){this.tabs.refreshOverflow()}setPinnedRow(e){this._pinnedRow!==e&&(this._pinnedRow&&this._pinnedRow.remove(),this._pinnedRow=e,e&&(e.classList.add("dv-pinned-row"),this._element.insertBefore(e,this._element.firstChild)),B(this._element,"dv-tabs-and-actions-container--pinned-row",!!e))}setDropIndexResolver(e){this._dropIndexResolver=e}resolveDropIndex(e,t){return this._dropIndexResolver(e,t)}updateClassnames(){B(this._element,"dv-single-tab",this.size===1)}toggleDropdown(e){let t=e.reset?[]:e.tabs,i=e.reset?[]:e.tabGroups,r=e.reset?[]:e.pinnedTabs;this._overflowTabs=t,this._overflowTabGroups=i,this._overflowPinnedTabs=r;let o=this._overflowTabs.length+this._overflowPinnedTabs.length;if(o>0&&this.dropdownPart){this.dropdownPart.update({tabs:o});return}if(o===0){this._dropdownDisposable.dispose();return}let s=document.createElement("div");s.className="dv-tabs-overflow-dropdown-root";let n=xv();n.update({tabs:o}),this.dropdownPart=n,s.appendChild(n.element),this.rightActionsContainer.prepend(s),this._dropdownDisposable.value=new V(ee.from(()=>{var a,l;s.remove(),(a=this.dropdownPart)===null||a===void 0||(l=a.dispose)===null||l===void 0||l.call(a),this.dropdownPart=null}),$(s,"pointerdown",a=>{a.preventDefault()},{capture:!0}),$(s,"click",a=>{let l=Sd(s),d={x:a.clientX,y:a.clientY,zIndex:l?.style.zIndex?`calc(${l.style.zIndex} * 2)`:void 0},{context:h,rowRenderers:c}=this.createOverflowRenderContext(s,d),u=this.accessor.advancedOverflowService;try{u?u.renderOverflow({group:this.group,overflowTabs:[...this._overflowTabs],overflowTabGroups:[...this._overflowTabGroups],pinnedOverflowTabs:[...this._overflowPinnedTabs],context:h}):h.open(this.renderFreeOverflowList(h))}catch(p){throw c.dispose(),p}}))}createOverflowRenderContext(e,t){let i=new Set(this._overflowTabGroups),r=this.group.model.getTabGroups(),o=new Map,s=new Map;for(let d of r)if(s.set(d.id,d),i.has(d.id))for(let h of d.panelIds)o.set(h,d);let n=()=>this.accessor.getPopupServiceForGroup(this.group),a=new V,l=d=>{let h=document.createElement("div");h.className="dv-tabs-overflow-group-header";let c=document.createElement("span");c.className="dv-tabs-overflow-group-color",vs(c,d.color,this.accessor.tabGroupColorPalette),h.appendChild(c);let u=document.createElement("span");if(u.className="dv-tabs-overflow-group-label",u.textContent=d.label||d.id,h.appendChild(u),d.collapsed){let p=document.createElement("span");p.className="dv-tabs-overflow-group-collapsed-badge",p.textContent=`${d.panelIds.length}`,h.appendChild(p)}return h.addEventListener("click",()=>{n().close(),d.collapsed&&d.expand();let p=d.panelIds[0];if(p){let v=this.group.panels.find(g=>g.id===p);this.accessor.withOrigin("user",()=>v?.api.setActive())}}),h};return{context:{overflowGroupIdForPanel:d=>{var h;return(h=o.get(d))===null||h===void 0?void 0:h.id},buildGroupHeader:d=>{let h=s.get(d);if(!(!h||!i.has(h.id)))return l(h)},buildPinnedHeader:()=>{let d=document.createElement("div");d.className="dv-tabs-overflow-group-header dv-tabs-overflow-pinned-header";let h=Nd();h.classList.add("dv-tabs-overflow-pinned-icon"),d.appendChild(h);let c=document.createElement("span");return c.className="dv-tabs-overflow-group-label",c.textContent="Pinned",d.appendChild(c),d},buildRow:d=>{let h=this.group.panels.find(w=>w.id===d);if(!h)return;let c=this.tabs.tabs.find(w=>w.panel.id===d),u=o.get(d),p=h.view.createTabRenderer("headerOverflow"),v=!1,g=ee.from(()=>{if(!v){var w;v=!0,(w=p.dispose)===null||w===void 0||w.call(p)}});a.isDisposed?g.dispose():a.addDisposables(g);let m=p.element,f=document.createElement("div");B(f,"dv-tab",!0),B(f,"dv-active-tab",h.api.isActive),B(f,"dv-inactive-tab",!h.api.isActive),u&&B(f,"dv-tab--grouped",!0);let S=()=>{u?.collapsed&&u.expand(),c?.element.scrollIntoView({block:"nearest",inline:"nearest"}),this.accessor.withOrigin("user",()=>h.api.setActive())};return f.addEventListener("click",w=>{n().close(),!w.defaultPrevented&&S()}),f.appendChild(m),{element:f,panel:h,activate:()=>{n().close(),S()},dispose:()=>{a.removeDisposable(g),g.dispose()}}},open:d=>{n().openPopover(d,t,{onClose:()=>a.dispose()})},close:()=>n().close(),focusTrigger:()=>{e.tabIndex=-1,e.focus()}},rowRenderers:a}}renderFreeOverflowList(e){let t=document.createElement("div");t.style.overflow="auto",t.className="dv-tabs-overflow-container";let i=this._overflowPinnedTabs.map(o=>e.buildRow(o)).filter(o=>o!=null);if(i.length>0){t.appendChild(e.buildPinnedHeader());for(let o of i)t.appendChild(o.element)}let r=new Set;for(let o of this.tabs.tabs.filter(s=>this._overflowTabs.includes(s.panel.id))){let s=e.overflowGroupIdForPanel(o.panel.id);if(s&&!r.has(s)){r.add(s);let a=e.buildGroupHeader(s);a&&t.appendChild(a)}let n=e.buildRow(o.panel.id);n&&t.appendChild(n.element)}return t}updateDragAndDropState(){this.tabs.updateDragAndDropState(),this.voidContainer.updateDragAndDropState()}updateTabGroups(){this.tabs.updateTabGroups()}refreshTabGroupAccent(){this.tabs.refreshTabGroupAccent()}},kv=class extends V{get label(){return this._label}get color(){return this._color}get componentParams(){return this._componentParams}setLabel(e){this.isDisposed||this._label===e||(this._label=e,this._onDidChange.fire())}setColor(e){if(this.isDisposed)return;let t=e===""?void 0:e;this._color!==t&&(this._color=t,this._onDidChange.fire())}setComponentParams(e){this.isDisposed||(this._componentParams=e,this._onDidChange.fire())}get collapsed(){return this._collapsed}get panelIds(){return this._panelIds}get size(){return this._panelIds.length}get isEmpty(){return this._panelIds.length===0}constructor(e,t){var i,r;super(),this.id=e,this._collapsed=!1,this._panelIds=[],this._onDidChange=new E,this.onDidChange=this._onDidChange.event,this._onDidPanelChange=new E,this.onDidPanelChange=this._onDidPanelChange.event,this._onDidCollapseChange=new E,this.onDidCollapseChange=this._onDidCollapseChange.event,this._onDidDestroy=new E,this.onDidDestroy=this._onDidDestroy.event,this._label=(i=t?.label)!==null&&i!==void 0?i:"",this._color=t?.color===""?void 0:t?.color,this._collapsed=(r=t?.collapsed)!==null&&r!==void 0?r:!1,this._componentParams=t?.componentParams,this.addDisposables(this._onDidChange,this._onDidPanelChange,this._onDidCollapseChange,this._onDidDestroy)}addPanel(e,t){if(this.isDisposed||this._panelIds.includes(e))return;let i=t===void 0?this._panelIds.length:Math.max(0,Math.min(t,this._panelIds.length));this._panelIds.splice(i,0,e),this._onDidPanelChange.fire({panelId:e,type:"add"})}removePanel(e){if(this.isDisposed)return!1;let t=this._panelIds.indexOf(e);return t===-1?!1:(this._panelIds.splice(t,1),this._onDidPanelChange.fire({panelId:e,type:"remove"}),!0)}indexOfPanel(e){return this._panelIds.indexOf(e)}containsPanel(e){return this._panelIds.includes(e)}collapse(){this.isDisposed||this._collapsed||(this._collapsed=!0,this._onDidCollapseChange.fire(!0))}expand(){this.isDisposed||!this._collapsed||(this._collapsed=!1,this._onDidCollapseChange.fire(!1))}toggle(){this._collapsed?this.expand():this.collapse()}toJSON(){let e={id:this.id,collapsed:this._collapsed,panelIds:[...this._panelIds]};return this._label&&(e.label=this._label),this._color!==void 0&&(e.color=this._color),this._componentParams!==void 0&&(e.componentParams=this._componentParams),e}dispose(){this._onDidDestroy.fire(),super.dispose()}},ms=class extends ss{get nativeEvent(){return this.options.nativeEvent}get position(){return this.options.position}get panel(){return this.options.panel}get index(){return this.options.index}get group(){return this.options.group}get api(){return this.options.api}constructor(e){super(),this.options=e}getData(){return this.options.getData()}},Xd=class extends ms{get kind(){return this._kind}get edgeGroup(){return this._edgeGroup}constructor(e){super(e),this._kind=e.kind,this._edgeGroup=!!e.edgeGroup}},Dv=class extends V{get tabGroups(){return this._tabGroups}get element(){throw new Error("dockview: not supported")}get activePanel(){return this._activePanel}get contentContainerId(){return this.contentContainer.element.id}get contentDropTarget(){return this.contentContainer.dropTarget}get locked(){return this._locked}set locked(e){this._locked=e,B(this.container,"dv-locked-groupview",e==="no-drop-target"||e)}get isActive(){return this._isGroupActive}get panels(){return this._panels}get size(){return this._panels.length}get isEmpty(){return this._panels.length===0}get hasWatermark(){return!!(this.watermark&&this.container.contains(this.watermark.element))}get header(){return this.tabsContainer}get tabsListElement(){return this.tabsContainer.tabsListElement}getPanelForTab(e){return this.tabsContainer.getPanelForTab(e)}get isContentFocused(){let e=this.contentContainer.element,t=Jo(e);return t?Yo(t,e):!1}get headerPosition(){var e;return(e=this._headerPosition)!==null&&e!==void 0?e:"top"}set headerPosition(e){this._headerPosition=e,this.invalidateHeaderSize(),Ct(this.container,"dv-groupview-header-top","dv-groupview-header-bottom","dv-groupview-header-left","dv-groupview-header-right"),kt(this.container,`dv-groupview-header-${e}`);let t=e==="top"||e==="bottom"?"horizontal":"vertical",i=this._headerDirection;if(this._headerDirection=t,this.tabsContainer.direction=t,this.header.direction=t,this.panels.length>0&&this.layoutContent(),this.updateHeaderActions(),i!==void 0&&i!==t){var r;(r=this.groupPanel)===null||r===void 0||r.api._onDidHeaderDirectionChange.fire({direction:t,position:e})}}get location(){return this._location}set location(e){this._location=e,B(this.container,"dv-groupview-floating",!1),B(this.container,"dv-groupview-popout",!1),B(this.container,"dv-groupview-edge",!1);let t=i=>{this.contentContainer.dropTarget.setTargetZones(i),this.contentContainer.pointerDropTarget.setTargetZones(i)};switch(e.type){case"grid":t(["top","bottom","left","right","center"]);break;case"floating":t(["top","bottom","left","right","center"]),B(this.container,"dv-groupview-floating",!0);break;case"popout":t(["top","bottom","left","right","center"]),B(this.container,"dv-groupview-popout",!0);break;case"edge":t(["center"]),B(this.container,"dv-groupview-edge",!0);break}this.groupPanel.api._onDidLocationChange.fire({location:this.location})}constructor(e,t,i,r,o){var s,n;super(),this.container=e,this.accessor=t,this.id=i,this.options=r,this.groupPanel=o,this._isGroupActive=!1,this._locked=!1,this._location={type:"grid"},this.mostRecentlyUsed=[],this._overwriteRenderContainer=null,this._overwriteDropTargetContainer=null,this._onDidChange=new E,this.onDidChange=this._onDidChange.event,this._width=0,this._height=0,this._panels=[],this._panelDisposables=new Map,this._tabGroupDisposables=new Map,this._pendingMicrotaskDisposables=new Set,this._onMove=new E,this.onMove=this._onMove.event,this._onDidDrop=new E,this.onDidDrop=this._onDidDrop.event,this._onWillDrop=new E,this.onWillDrop=this._onWillDrop.event,this._onWillShowOverlay=new E,this.onWillShowOverlay=this._onWillShowOverlay.event,this._onTabDragStart=new E,this.onTabDragStart=this._onTabDragStart.event,this._onGroupDragStart=new E,this.onGroupDragStart=this._onGroupDragStart.event,this._onDidAddPanel=new E,this.onDidAddPanel=this._onDidAddPanel.event,this._onDidPanelTitleChange=new E,this.onDidPanelTitleChange=this._onDidPanelTitleChange.event,this._onDidPanelParametersChange=new E,this.onDidPanelParametersChange=this._onDidPanelParametersChange.event,this._onDidRemovePanel=new E,this.onDidRemovePanel=this._onDidRemovePanel.event,this._onDidActivePanelChange=new E,this.onDidActivePanelChange=this._onDidActivePanelChange.event,this._onUnhandledDragOver=new E,this.onUnhandledDragOver=this._onUnhandledDragOver.event,this._tabGroups=[],this._tabGroupMap=new Map,this._panelToTabGroup=new Map,this._tabGroupIdCounter=0,this._pendingTabGroupUpdate=!1,this._onDidCreateTabGroup=new E,this.onDidCreateTabGroup=this._onDidCreateTabGroup.event,this._onDidDestroyTabGroup=new E,this.onDidDestroyTabGroup=this._onDidDestroyTabGroup.event,this._onDidAddPanelToTabGroup=new E,this.onDidAddPanelToTabGroup=this._onDidAddPanelToTabGroup.event,this._onDidRemovePanelFromTabGroup=new E,this.onDidRemovePanelFromTabGroup=this._onDidRemovePanelFromTabGroup.event,this._onDidTabGroupChange=new E,this.onDidTabGroupChange=this._onDidTabGroupChange.event,this._onDidTabGroupCollapsedChange=new E,this.onDidTabGroupCollapsedChange=this._onDidTabGroupCollapsedChange.event,B(this.container,"dv-groupview",!0),this.container.setAttribute("role","region"),this._api=new ds(this.accessor),this.tabsContainer=new Cv(this.accessor,this.groupPanel),this.contentContainer=new ov(this.accessor,this),e.append(this.tabsContainer.element,this.contentContainer.element),this.header.hidden=!!r.hideHeader,this.locked=(s=r.locked)!==null&&s!==void 0?s:!1,this.headerPosition=(n=r.headerPosition)!==null&&n!==void 0?n:t.defaultHeaderPosition,this.addDisposables(Xt(this.tabsContainer.element,()=>{if(this.isDisposed)return;let a=this.measureHeaderSize();a!==this._cachedHeaderSize&&(this._cachedHeaderSize=a,this.layout(this._width,this._height))}),this._onDidPanelTitleChange.event(()=>this.updateAccessibleLabel()),this._onTabDragStart,this._onGroupDragStart,this._onWillShowOverlay,this.tabsContainer.onTabDragStart(a=>{this._onTabDragStart.fire(a)}),this.tabsContainer.onGroupDragStart(a=>{this._onGroupDragStart.fire(a)}),this.tabsContainer.onDrop(a=>{var l;let d=he(),h=(l=d?.panelId)!==null&&l!==void 0?l:null,c=h?this.tabsContainer.resolveDropIndex(h,a.index):a.index;if(this.handleDropEvent("header",a.event,"center",c),h&&a.targetTabGroupId){let u=this._tabGroupMap.get(a.targetTabGroupId),p;if(u){let v=this._panels.findIndex(g=>g.id===h);if(v!==-1){p=0;for(let g of u.panelIds)this._panels.findIndex(m=>m.id===g)<v&&p++}}this.addPanelToTabGroup(a.targetTabGroupId,h,p)}else h&&a.targetTabGroupId===null&&this.removePanelFromTabGroup(h)}),this.contentContainer.onDidFocus(()=>{this.accessor.doSetGroupActive(this.groupPanel)}),this.contentContainer.onDidBlur(()=>{}),this.contentContainer.dropTarget.onDrop(a=>{this.handleDropEvent("content",a.nativeEvent,a.position,void 0,a.edge,a.edgeGroup)}),this.contentContainer.pointerDropTarget.onDrop(a=>{this.handleDropEvent("content",a.nativeEvent,a.position,void 0,a.edge,a.edgeGroup)}),this.tabsContainer.onWillShowOverlay(a=>{this._onWillShowOverlay.fire(a)}),this.contentContainer.dropTarget.onWillShowOverlay(a=>{this._onWillShowOverlay.fire(new Oi(a,{kind:"content",panel:this.activePanel,api:this._api,group:this.groupPanel,getData:he}))}),this.contentContainer.pointerDropTarget.onWillShowOverlay(a=>{this._onWillShowOverlay.fire(new Oi(a,{kind:"content",panel:this.activePanel,api:this._api,group:this.groupPanel,getData:he}))}),this._onMove,this._onDidChange,this._onDidDrop,this._onWillDrop,this._onDidAddPanel,this._onDidRemovePanel,this._onDidActivePanelChange,this._onUnhandledDragOver,this._onDidPanelTitleChange,this._onDidPanelParametersChange,this._onDidCreateTabGroup,this._onDidDestroyTabGroup,this._onDidAddPanelToTabGroup,this._onDidRemovePanelFromTabGroup,this._onDidTabGroupChange,this._onDidTabGroupCollapsedChange,this._onDidCreateTabGroup.event(()=>{this._scheduleTabGroupUpdate()}),this._onDidDestroyTabGroup.event(()=>{this._scheduleTabGroupUpdate()}),this._onDidAddPanelToTabGroup.event(()=>{this._scheduleTabGroupUpdate()}),this._onDidRemovePanelFromTabGroup.event(()=>{this._scheduleTabGroupUpdate()}),this._onDidTabGroupChange.event(()=>{this._scheduleTabGroupUpdate()}),this._onDidTabGroupCollapsedChange.event(()=>{this._scheduleTabGroupUpdate()}))}_scheduleTabGroupUpdate(){this._pendingTabGroupUpdate||(this._pendingTabGroupUpdate=!0,queueMicrotask(()=>{this._pendingTabGroupUpdate=!1,this.isDisposed||this.tabsContainer.updateTabGroups()}))}_bracketTabGroupMutation(e){return this.accessor.mutation?this.accessor.mutation("tab-group",e):e()}createTabGroup(e){return this._bracketTabGroupMutation(()=>this._doCreateTabGroup(e))}_doCreateTabGroup(e){var t;let i=(t=e?.id)!==null&&t!==void 0?t:`tg-${this.id}-${this._tabGroupIdCounter++}`,r=new kv(i,{label:e?.label,color:e?.color,collapsed:e?.collapsed,componentParams:e?.componentParams});return this._tabGroups.push(r),this._tabGroupMap.set(i,r),this._tabGroupDisposables.set(i,new V(r.onDidChange(()=>{this._onDidTabGroupChange.fire({tabGroup:r})}),r.onDidCollapseChange(o=>{o?this._handleGroupCollapse(r):this._handleGroupExpand(r),this._onDidTabGroupCollapsedChange.fire({tabGroup:r})}),r.onDidDestroy(()=>{this._removeTabGroupInternal(r)}))),this._onDidCreateTabGroup.fire({tabGroup:r}),r}dissolveTabGroup(e){let t=this._tabGroupMap.get(e);t&&this._bracketTabGroupMutation(()=>{let i=[...t.panelIds];for(let r of i)t.removePanel(r),this._panelToTabGroup.delete(r),this._onDidRemovePanelFromTabGroup.fire({tabGroup:t,panelId:r});t.dispose()})}addPanelToTabGroup(e,t,i){let r=this._tabGroupMap.get(e);if(!r||!this._panels.some(s=>s.id===t))return;let o=this.getTabGroupForPanel(t);o?.id!==e&&this._bracketTabGroupMutation(()=>{o&&this.removePanelFromTabGroup(t),r.addPanel(t,i),this._panelToTabGroup.set(t,r),this._enforceContiguity(r,t),this._onDidAddPanelToTabGroup.fire({tabGroup:r,panelId:t})})}movePanelWithinGroup(e,t,i){let r=this._tabGroupMap.get(e);r?.containsPanel(t)&&(r.removePanel(t),r.addPanel(t,i),this._enforceContiguity(r,t),this.tabsContainer.updateTabGroups())}movePanelBetweenGroups(e,t,i){let r=this._findTabGroupForPanel(e),o=this._tabGroupMap.get(t);o&&(r&&(r.removePanel(e),this._panelToTabGroup.delete(e),this._moveOutOfGroupSpan(r,e),this._onDidRemovePanelFromTabGroup.fire({tabGroup:r,panelId:e}),r.isEmpty&&r.dispose()),o.addPanel(e,i),this._panelToTabGroup.set(e,o),this._enforceContiguity(o,e),this._onDidAddPanelToTabGroup.fire({tabGroup:o,panelId:e}))}moveTabGroup(e,t){let i=this._tabGroupMap.get(e);if(!i||i.panelIds.length===0)return;let r=new Set(i.panelIds),o=i.panelIds.map(l=>this._panels.find(d=>d.id===l)).filter(l=>l!==void 0);if(o.length===0)return;let s=0;for(let l=0;l<Math.min(t,this._panels.length);l++)r.has(this._panels[l].id)&&s++;for(let l of o){let d=this._panels.indexOf(l);d!==-1&&this._panels.splice(d,1)}let n=t-s,a=Math.max(0,Math.min(n,this._panels.length));this._panels.splice(a,0,...o);for(let l of this._panels)this.tabsContainer.delete(l.id);for(let l=0;l<this._panels.length;l++)this.tabsContainer.openPanel(this._panels[l],l);this._syncActiveTab(),this.tabsContainer.updateTabGroups()}_enforceContiguity(e,t){let i=this._panels.find(a=>a.id===t);if(!i)return;let r=e.indexOfPanel(t),o=this._computeGlobalIndex(e,r),s=this._panels.indexOf(i);if(s===o)return;this._panels.splice(s,1);let n=o>s?o-1:o;this._panels.splice(n,0,i),this._reinsertTab(i,n)}_reinsertTab(e,t){this.tabsContainer.delete(e.id),this.tabsContainer.openPanel(e,t),e===this._activePanel&&this._syncActiveTab()}_syncActiveTab(){this._activePanel&&(this.tabsContainer.setActivePanel(this._activePanel),this.contentContainer.setLabelledBy(this.tabsContainer.getTabId(this._activePanel.id)))}_computeGlobalIndex(e,t){let i=e.panelIds;if(i.length<=1){let r=this._panels.find(o=>o.id===i[0]);return r?this._panels.indexOf(r):this._panels.length}for(let r=0;r<i.length;r++){if(r===t)continue;let o=this._panels.find(s=>s.id===i[r]);if(o){let s=this._panels.indexOf(o);return Math.max(0,s+(t-r))}}return this._panels.length}removePanelFromTabGroup(e){let t=this._findTabGroupForPanel(e);t&&this._bracketTabGroupMutation(()=>{t.removePanel(e),this._panelToTabGroup.delete(e),this._moveOutOfGroupSpan(t,e),this._onDidRemovePanelFromTabGroup.fire({tabGroup:t,panelId:e}),t.isEmpty&&t.dispose()})}_moveOutOfGroupSpan(e,t){let i=this._panels.findIndex(a=>a.id===t);if(i===-1||e.isEmpty)return;let r=e.panelIds,o=this._panels.findIndex(a=>a.id===r[0]),s=this._panels.findIndex(a=>a.id===r[r.length-1]);if(o===-1||s===-1||i<o||i>s)return;let[n]=this._panels.splice(i,1);this._panels.splice(s,0,n),this._reinsertTab(n,s)}getTabGroups(){return this._tabGroups}updateTabGroups(){this.tabsContainer.updateTabGroups()}refreshTabGroupAccent(){this.tabsContainer.refreshTabGroupAccent()}refreshWatermark(){if(this.watermark){var e,t;this.watermark.element.remove(),(e=(t=this.watermark).dispose)===null||e===void 0||e.call(t),this.watermark=void 0}this.updateContainer()}getTabGroupForPanel(e){return this._findTabGroupForPanel(e)}_findTabGroupForPanel(e){return this._panelToTabGroup.get(e)}_removeTabGroupInternal(e){let t=this._tabGroups.indexOf(e);if(t!==-1){this._tabGroups.splice(t,1),this._tabGroupMap.delete(e.id);for(let r of e.panelIds)this._panelToTabGroup.delete(r);this._onDidDestroyTabGroup.fire({tabGroup:e});let i=this._tabGroupDisposables.get(e.id);this._tabGroupDisposables.delete(e.id),i&&(this._pendingMicrotaskDisposables.add(i),queueMicrotask(()=>{this._pendingMicrotaskDisposables.delete(i),i.dispose()}))}}_handleGroupCollapse(e){if(!this._activePanel||!e.containsPanel(this._activePanel.id))return;let t=this._panels.indexOf(this._activePanel);for(let i=t+1;i<this._panels.length;i++){let r=this._panels[i],o=this._findTabGroupForPanel(r.id);if(!o?.collapsed){this.doSetActivePanel(r),this.updateContainer();return}}for(let i=t-1;i>=0;i--){let r=this._panels[i],o=this._findTabGroupForPanel(r.id);if(!o?.collapsed){this.doSetActivePanel(r),this.updateContainer();return}}this.contentContainer.closePanel(),this.doSetActivePanel(void 0),this.updateContainer()}_handleGroupExpand(e){if(this._activePanel)return;let t=e.panelIds[0];if(t){let i=this._panels.find(r=>r.id===t);i&&(this.doSetActivePanel(i),this.updateContainer())}}restoreTabGroups(e){for(let t of e){let i=/-(\d+)$/.exec(t.id);if(i){let r=Number.parseInt(i[1],10)+1;r>this._tabGroupIdCounter&&(this._tabGroupIdCounter=r)}}for(let t of e){let i=this.createTabGroup({id:t.id,label:t.label,color:t.color,componentParams:t.componentParams}),r=this._tabGroupMap.get(i.id);for(let o of t.panelIds)this._panels.some(s=>s.id===o)&&(i.addPanel(o),this._panelToTabGroup.set(o,r),this._enforceContiguity(r,o));t.collapsed&&i.collapse(),i.isEmpty&&i.dispose()}}focusContent(){this.contentContainer.element.focus()}focusActiveTab(){this.tabsContainer.focusActiveTab()}set renderContainer(e){this.panels.forEach(t=>{this.renderContainer.detatch(t)}),this._overwriteRenderContainer=e,this.panels.forEach(t=>{this.rerender(t)}),this.panels.length>0&&this.layoutContent()}get renderContainer(){var e;return(e=this._overwriteRenderContainer)!==null&&e!==void 0?e:this.accessor.overlayRenderContainer}set dropTargetContainer(e){this._overwriteDropTargetContainer=e}get dropTargetContainer(){var e;return this._location.type==="floating"&&this.accessor.rootDropTargetContainer.disabled?this.accessor.floatingDropTargetContainer:(e=this._overwriteDropTargetContainer)!==null&&e!==void 0?e:this.accessor.rootDropTargetContainer}initialize(){this.options.panels&&this.options.panels.forEach(e=>{this.doAddPanel(e)}),this.options.activePanel&&this.openPanel(this.options.activePanel),this.setActive(this.isActive,!0),this.updateContainer(),this.updateHeaderActions()}updateHeaderActions(){var e;(e=this.accessor.headerActionsService)===null||e===void 0||e.refresh(this.groupPanel)}attachHeaderAction(e,t){switch(e){case"left":this.tabsContainer.setLeftActionsElement(t);break;case"right":this.tabsContainer.setRightActionsElement(t);break;case"prefix":this.tabsContainer.setPrefixActionsElement(t);break}}rerender(e){this.contentContainer.renderPanel(e,{asActive:!1})}indexOf(e){return this.tabsContainer.indexOf(e.id)}toJSON(){var e;let t={views:this.tabsContainer.panels,activeView:(e=this._activePanel)===null||e===void 0?void 0:e.id,id:this.id};return this.locked!==!1&&(t.locked=this.locked),this.header.hidden&&(t.hideHeader=!0),this.headerPosition!=="top"&&(t.headerPosition=this.headerPosition),this._tabGroups.length>0&&(t.tabGroups=this._tabGroups.map(i=>i.toJSON())),t}moveToNext(e){var t,i,r;(t=e)!==null&&t!==void 0||(e={}),(r=(i=e).panel)!==null&&r!==void 0||(i.panel=this.activePanel);let o=e.panel?this.panels.indexOf(e.panel):-1,s;if(o<this.panels.length-1)s=o+1;else{if(e.suppressRoll)return;s=0}this.openPanel(this.panels[s])}moveToPrevious(e){var t,i,r;if((t=e)!==null&&t!==void 0||(e={}),(r=(i=e).panel)!==null&&r!==void 0||(i.panel=this.activePanel),!e.panel)return;let o=this.panels.indexOf(e.panel),s;if(o>0)s=o-1;else{if(e.suppressRoll)return;s=this.panels.length-1}this.openPanel(this.panels[s])}containsPanel(e){return this.panels.includes(e)}init(e){}update(e){}focus(){var e;(e=this._activePanel)===null||e===void 0||e.focus()}openPanel(e,t={}){typeof t.index!="number"||t.index>this.panels.length?t.index=this.panels.length:t.index<0&&(t.index=0);let i=!!t.skipSetActive;if(e.updateParentGroup(this.groupPanel,{skipSetActive:t.skipSetActive}),this.doAddPanel(e,t.index,{skipSetActive:i}),this.invalidateHeaderSize(),this._activePanel===e){this.contentContainer.openPanel(e);return}i||this.doSetActivePanel(e),t.skipSetGroupActive||this.accessor.doSetGroupActive(this.groupPanel),t.skipSetActive?e.runEvents():this.updateContainer()}removePanel(e,t){let i=typeof e=="string"?e:e.id,r=this._panels.find(o=>o.id===i);if(!r)throw new Error("invalid operation");return this._removePanel(r,t)}closeAllPanels(){if(this.panels.length>0){let e=[...this.panels];for(let t of e)this.doClose(t)}else this.accessor.removeGroup(this.groupPanel)}closePanel(e){this.doClose(e)}doClose(e){let t=this.panels.length===1&&this.accessor.isLastGridGroup(this.groupPanel);this.accessor.removePanel(e,t&&this.accessor.options.noPanelsOverlay==="emptyGroup"?{removeEmptyGroup:!1}:void 0)}isPanelActive(e){return this._activePanel===e}updateActions(e){this.tabsContainer.setRightActionsElement(e)}setActive(e,t=!1){if(!this.isDisposed&&!(!t&&this.isActive===e)){if(this._isGroupActive=e,B(this.container,"dv-active-group",e),B(this.container,"dv-inactive-group",!e),this.tabsContainer.setActive(this.isActive),!this._activePanel&&this.panels.length>0){let i=this._panels.find(r=>{let o=this._findTabGroupForPanel(r.id);return!o?.collapsed});i&&this.doSetActivePanel(i)}this.updateContainer()}}layout(e,t){this._width=e,this._height=t,this.layoutContent()}layoutContent(){var e;let{width:t,height:i}=this.contentDimensions();this.contentContainer.layout(t,i),!((e=this._activePanel)===null||e===void 0)&&e.layout&&this._activePanel.layout(t,i)}relayout(){this.invalidateHeaderSize(),this.layout(this._width,this._height)}measureHeaderSize(){let e=this.tabsContainer.element;return this.headerPosition==="top"||this.headerPosition==="bottom"?e.offsetHeight:e.offsetWidth}invalidateHeaderSize(){this._cachedHeaderSize=void 0}contentDimensions(){var e;let t=this.headerPosition==="top"||this.headerPosition==="bottom",i=(e=this._cachedHeaderSize)!==null&&e!==void 0?e:this._cachedHeaderSize=this.measureHeaderSize();return{width:t?this._width:Math.max(0,this._width-i),height:t?Math.max(0,this._height-i):this._height}}_removePanel(e,t){let i=this._activePanel===e;if(this.doRemovePanel(e),this.invalidateHeaderSize(),i&&this.panels.length>0){let r=this.mostRecentlyUsed[0];this.openPanel(r,{skipSetActive:t?.skipSetActive,skipSetGroupActive:t?.skipSetActiveGroup})}return t?.skipSetActive||this.updateContainer(),e}doRemovePanel(e){let t=this.panels.indexOf(e);if(this._activePanel===e&&this.contentContainer.closePanel(),this.tabsContainer.delete(e.id),this._panels.splice(t,1),this.mostRecentlyUsed.includes(e)){let r=this.mostRecentlyUsed.indexOf(e);this.mostRecentlyUsed.splice(r,1)}let i=this._panelDisposables.get(e.id);i&&(i.dispose(),this._panelDisposables.delete(e.id)),this.removePanelFromTabGroup(e.id),this._activePanel===e&&this._panels.length===0&&this.doSetActivePanel(void 0),this._onDidRemovePanel.fire({panel:e})}doAddPanel(e,t=this.panels.length,i){let r=this._panels.indexOf(e)>-1;this.tabsContainer.show(),this.contentContainer.show(),this.tabsContainer.openPanel(e,t),i?.skipSetActive?e.api.renderer==="always"&&this.contentContainer.renderPanel(e,{asActive:!1}):this.contentContainer.openPanel(e),!r&&(this.updateMru(e),this.panels.splice(t,0,e),this._panelDisposables.set(e.id,new V(e.api.onDidTitleChange(o=>this._onDidPanelTitleChange.fire(o)),e.api.onDidParametersChange(o=>this._onDidPanelParametersChange.fire(o)))),this._onDidAddPanel.fire({panel:e}))}doSetActivePanel(e){if(this._activePanel!==e){if(this._activePanel=e,e){var t,i,r;this._syncActiveTab(),this.contentContainer.openPanel(e),this.layoutContent(),this.updateMru(e),this.contentContainer.refreshFocusState(),this._onDidActivePanelChange.fire({panel:e,origin:(t=(i=(r=this.accessor).currentOrigin)===null||i===void 0?void 0:i.call(r))!==null&&t!==void 0?t:"user"})}this.updateAccessibleLabel()}}updateAccessibleLabel(){var e;let t=(e=this._activePanel)===null||e===void 0?void 0:e.title;t?this.container.setAttribute("aria-label",t):this.container.removeAttribute("aria-label")}updateMru(e){this.mostRecentlyUsed.includes(e)&&this.mostRecentlyUsed.splice(this.mostRecentlyUsed.indexOf(e),1),this.mostRecentlyUsed=[e,...this.mostRecentlyUsed]}updateContainer(){this.panels.forEach(r=>r.runEvents());let e=this.isEmpty||!this._activePanel;if(e&&!this.watermark){let r=this.accessor.createWatermarkComponent();r.init({containerApi:this._api,group:this.groupPanel}),this.watermark=r,$(this.watermark.element,"pointerdown",()=>{this.isActive||this.accessor.doSetGroupActive(this.groupPanel)}),this.contentContainer.element.appendChild(this.watermark.element)}if(!e&&this.watermark){var t,i;this.watermark.element.remove(),(t=(i=this.watermark).dispose)===null||t===void 0||t.call(i),this.watermark=void 0}}canDisplayOverlay(e,t,i){let r=new Vd(e,i,t,he,this.accessor.getPanel(this.id));return this._onUnhandledDragOver.fire(r),r.isAccepted}canDisplayContentOverlay(e,t){if(this.locked==="no-drop-target"||this.locked&&t==="center")return!1;let i=he();return!i&&e.shiftKey&&this.location.type!=="floating"?!1:i?.viewId===this.accessor.id?!0:this.canDisplayOverlay(e,t,"content")}handleDropEvent(e,t,i,r,o,s){if(this.locked==="no-drop-target")return;if(e==="content"&&o){this.accessor.dockToLayoutEdge(t,i,s);return}function n(){switch(e){case"header":return typeof r=="number"?"tab":"header_space";case"content":return"content"}}let a=typeof r=="number"?this.panels[r]:void 0,l=new Xd({nativeEvent:t,position:i,panel:a,index:r,getData:()=>he(),kind:n(),group:this.groupPanel,api:this._api});if(this._onWillDrop.fire(l),l.defaultPrevented)return;let d=he();if(d?.viewId===this.accessor.id){if(e==="content"&&d.groupId===this.id&&(i==="center"||d.panelId===null&&!d.tabGroupId)||e==="header"&&d.groupId===this.id&&d.panelId===null&&!d.tabGroupId)return;if(d.panelId===null){let{groupId:u}=d;this._onMove.fire({target:i,groupId:u,index:r,tabGroupId:d.tabGroupId});return}if(this.tabsContainer.indexOf(d.panelId)!==-1&&this.tabsContainer.size===1&&this.accessor.options.closeEmptyGroups!==!1)return;let{groupId:h,panelId:c}=d;if(this.id===h&&!i&&this.tabsContainer.indexOf(c)===r)return;this._onMove.fire({target:i,groupId:d.groupId,itemId:d.panelId,index:r})}else this._onDidDrop.fire(new ms({nativeEvent:t,position:i,panel:a,index:r,getData:()=>he(),group:this.groupPanel,api:this._api}))}updateDragAndDropState(){this.tabsContainer.updateDragAndDropState()}dispose(){var e,t,i;super.dispose(),(e=this.watermark)===null||e===void 0||e.element.remove(),(t=this.watermark)===null||t===void 0||(i=t.dispose)===null||i===void 0||i.call(t),this.watermark=void 0;for(let r of[...this._tabGroups])r.dispose();for(let r of this._tabGroupDisposables.values())r.dispose();this._tabGroupDisposables.clear();for(let r of this._pendingMicrotaskDisposables)r.dispose();this._pendingMicrotaskDisposables.clear();for(let r of this.panels)r.dispose();this.tabsContainer.dispose(),this.contentContainer.dispose()}},fs=class extends ev{constructor(e,t,i){super(e,t),this._onDidConstraintsChangeInternal=new E,this.onDidConstraintsChangeInternal=this._onDidConstraintsChangeInternal.event,this._onDidConstraintsChange=new E,this.onDidConstraintsChange=this._onDidConstraintsChange.event,this._onDidSizeChange=new E,this.onDidSizeChange=this._onDidSizeChange.event,this.addDisposables(this._onDidConstraintsChangeInternal,this._onDidConstraintsChange,this._onDidSizeChange),i&&this.initialize(i)}setConstraints(e){this._onDidConstraintsChangeInternal.fire(e)}setSize(e){this._onDidSizeChange.fire(e)}},Ev=class extends tv{get priority(){return this._priority}get snap(){return this._snap}get minimumWidth(){return this.__minimumWidth()}get minimumHeight(){return this.__minimumHeight()}get maximumHeight(){return this.__maximumHeight()}get maximumWidth(){return this.__maximumWidth()}__minimumWidth(){let e=typeof this._minimumWidth=="function"?this._minimumWidth():this._minimumWidth;return e!==this._evaluatedMinimumWidth&&(this._evaluatedMinimumWidth=e,this.updateConstraints()),e}__maximumWidth(){let e=typeof this._maximumWidth=="function"?this._maximumWidth():this._maximumWidth;return e!==this._evaluatedMaximumWidth&&(this._evaluatedMaximumWidth=e,this.updateConstraints()),e}__minimumHeight(){let e=typeof this._minimumHeight=="function"?this._minimumHeight():this._minimumHeight;return e!==this._evaluatedMinimumHeight&&(this._evaluatedMinimumHeight=e,this.updateConstraints()),e}__maximumHeight(){let e=typeof this._maximumHeight=="function"?this._maximumHeight():this._maximumHeight;return e!==this._evaluatedMaximumHeight&&(this._evaluatedMaximumHeight=e,this.updateConstraints()),e}get isActive(){return this.api.isActive}get isVisible(){return this.api.isVisible}constructor(e,t,i,r){super(e,t,r??new fs(e,t)),this._evaluatedMinimumWidth=0,this._evaluatedMaximumWidth=Number.MAX_SAFE_INTEGER,this._evaluatedMinimumHeight=0,this._evaluatedMaximumHeight=Number.MAX_SAFE_INTEGER,this._minimumWidth=0,this._minimumHeight=0,this._maximumWidth=Number.MAX_SAFE_INTEGER,this._maximumHeight=Number.MAX_SAFE_INTEGER,this._snap=!1,this._onDidChange=new E,this.onDidChange=this._onDidChange.event,typeof i?.minimumWidth=="number"&&(this._minimumWidth=i.minimumWidth),typeof i?.maximumWidth=="number"&&(this._maximumWidth=i.maximumWidth),typeof i?.minimumHeight=="number"&&(this._minimumHeight=i.minimumHeight),typeof i?.maximumHeight=="number"&&(this._maximumHeight=i.maximumHeight),this.api.initialize(this),this.addDisposables(this.api.onWillVisibilityChange(o=>{let{isVisible:s}=o,{accessor:n}=this._params;n.setVisible(this,s)}),this.api.onActiveChange(()=>{let{accessor:o}=this._params;o.doSetGroupActive(this)}),this.api.onDidConstraintsChangeInternal(o=>this.applyConstraints(o)),this.api.onDidSizeChange(o=>{this._onDidChange.fire({height:o.height,width:o.width})}),this._onDidChange)}setVisible(e){this.api._onDidVisibilityChange.fire({isVisible:e})}setActive(e){this.api._onDidActiveChange.fire({isActive:e})}init(e){e.maximumHeight&&(this._maximumHeight=e.maximumHeight),e.minimumHeight&&(this._minimumHeight=e.minimumHeight),e.maximumWidth&&(this._maximumWidth=e.maximumWidth),e.minimumWidth&&(this._minimumWidth=e.minimumWidth),this._priority=e.priority,this._snap=!!e.snap,super.init(e),typeof e.isVisible=="boolean"&&this.setVisible(e.isVisible)}applyConstraints(e){(typeof e.minimumWidth=="number"||typeof e.minimumWidth=="function")&&(this._minimumWidth=e.minimumWidth),(typeof e.minimumHeight=="number"||typeof e.minimumHeight=="function")&&(this._minimumHeight=e.minimumHeight),(typeof e.maximumWidth=="number"||typeof e.maximumWidth=="function")&&(this._maximumWidth=e.maximumWidth),(typeof e.maximumHeight=="number"||typeof e.maximumHeight=="function")&&(this._maximumHeight=e.maximumHeight),this.notifyConstraintsChanged()}notifyConstraintsChanged(){this._onDidChange.fire(void 0)}updateConstraints(){this.api._onDidConstraintsChange.fire({minimumWidth:this._evaluatedMinimumWidth,maximumWidth:this._evaluatedMaximumWidth,minimumHeight:this._evaluatedMinimumHeight,maximumHeight:this._evaluatedMaximumHeight})}toJSON(){let e=super.toJSON(),t=r=>r===Number.MAX_SAFE_INTEGER?void 0:r,i=r=>r<=0?void 0:r;return j(j({},e),{},{minimumHeight:i(this.minimumHeight),maximumHeight:t(this.maximumHeight),minimumWidth:i(this.minimumWidth),maximumWidth:t(this.maximumWidth),snap:this.snap,priority:this.priority})}},yt="dockview: DockviewGroupPanelApiImpl not initialized",Pv=class extends fs{get location(){if(!this._group)throw new Error(yt);return this._group.model.location}get boundingBox(){if(!this._group||this._group.model.location.type==="popout")return;let e=this.accessor.element.getBoundingClientRect(),t=this._group.element.getBoundingClientRect();return{left:t.left-e.left,top:t.top-e.top,width:t.width,height:t.height}}get locked(){if(!this._group)throw new Error(yt);return this._group.locked}set locked(e){if(!this._group)throw new Error(yt);this._group.locked=e}constructor(e,t){super(e,"__dockviewgroup__"),this.accessor=t,this._isApplyingSize=!1,this._onDidLocationChange=new E,this.onDidLocationChange=this._onDidLocationChange.event,this._onDidActivePanelChange=new E,this.onDidActivePanelChange=this._onDidActivePanelChange.event,this._onDidCollapsedChange=new E,this.onDidCollapsedChange=this._onDidCollapsedChange.event,this._onDidPeekChange=new E,this.onDidPeekChange=this._onDidPeekChange.event,this._onDidHeaderDirectionChange=new E,this.onDidHeaderDirectionChange=this._onDidHeaderDirectionChange.event,this.addDisposables(this._onDidLocationChange,this._onDidActivePanelChange,this._onDidCollapsedChange,this._onDidPeekChange,this._onDidHeaderDirectionChange,this._onDidVisibilityChange.event(i=>{if(i.isVisible&&this._pendingSize){let r=this._pendingSize;this._pendingSize=void 0,super.setSize(r)}}),this.onDidDimensionsChange(i=>{var r,o;let s=i.width!==((r=this._reportedSize)===null||r===void 0?void 0:r.width)||i.height!==((o=this._reportedSize)===null||o===void 0?void 0:o.height);this._reportedSize={width:i.width,height:i.height},s&&this.isVisible&&!this._isApplyingSize&&(this._pendingSize=void 0)}))}setSize(e){(typeof e.width=="number"||typeof e.height=="number")&&(this._pendingSize=j({},e));let t=this._isApplyingSize;this._isApplyingSize=!0;try{super.setSize(e)}finally{this._isApplyingSize=t}}close(){if(this._group)return this.accessor.removeGroup(this._group)}getWindow(){return this.location.type==="popout"?this.location.getWindow():globalThis.window}setHeaderPosition(e){if(!this._group)throw new Error(yt);this._group.model.headerPosition=e}getHeaderPosition(){if(!this._group)throw new Error(yt);return this._group.model.headerPosition}moveTo(e){if(!this._group)throw new Error(yt);this.accessor.withOrigin("api",()=>{var t,i,r,o;let s=(t=e.group)!==null&&t!==void 0?t:this.accessor.addGroup({direction:Hp((i=e.position)!==null&&i!==void 0?i:"right"),skipSetActive:(r=e.skipSetActive)!==null&&r!==void 0?r:!1});this.accessor.moveGroupOrPanel({from:{groupId:this._group.id},to:{group:s,position:e.group&&(o=e.position)!==null&&o!==void 0?o:"center",index:e.index},skipSetActive:e.skipSetActive})})}maximize(){if(!this._group)throw new Error(yt);this.location.type==="grid"&&this.accessor.maximizeGroup(this._group)}isMaximized(){if(!this._group)throw new Error(yt);return this.accessor.isMaximizedGroup(this._group)}exitMaximized(){if(!this._group)throw new Error(yt);this.isMaximized()&&this.accessor.exitMaximizedGroup()}collapse(){this._group&&this.accessor.setEdgeGroupCollapsed(this._group,!0)}expand(){this._group&&this.accessor.setEdgeGroupCollapsed(this._group,!1)}isCollapsed(){return this._group?this.accessor.isEdgeGroupCollapsed(this._group):!1}isPeeking(){return this._group?this.accessor.isEdgeGroupPeeking(this._group):!1}setAutoHide(e){this._group&&this.accessor.setEdgeGroupAutoHide(this._group,e)}isAutoHide(){return this._group?this.accessor.isEdgeGroupAutoHide(this._group):!1}initialize(e){this._group=e}},Tv=100,zv=100,vr=class extends Ev{get minimumWidth(){var e;if(typeof this._explicitConstraints.minimumWidth=="number")return this._explicitConstraints.minimumWidth;let t=(e=this.activePanel)===null||e===void 0?void 0:e.minimumWidth;return typeof t=="number"?t:super.__minimumWidth()}get minimumHeight(){var e;if(typeof this._explicitConstraints.minimumHeight=="number")return this._explicitConstraints.minimumHeight;let t=(e=this.activePanel)===null||e===void 0?void 0:e.minimumHeight;return typeof t=="number"?t:super.__minimumHeight()}get maximumWidth(){var e;if(typeof this._explicitConstraints.maximumWidth=="number")return this._explicitConstraints.maximumWidth;let t=(e=this.activePanel)===null||e===void 0?void 0:e.maximumWidth;return typeof t=="number"?t:super.__maximumWidth()}get maximumHeight(){var e;if(typeof this._explicitConstraints.maximumHeight=="number")return this._explicitConstraints.maximumHeight;let t=(e=this.activePanel)===null||e===void 0?void 0:e.maximumHeight;return typeof t=="number"?t:super.__maximumHeight()}get panels(){return this._model.panels}get activePanel(){return this._model.activePanel}get size(){return this._model.size}get model(){return this._model}get locked(){return this._model.locked}set locked(e){this._model.locked=e}get header(){return this._model.header}constructor(e,t,i){var r,o,s,n,a,l;super(t,"groupview_default",{minimumHeight:(r=(o=i.constraints)===null||o===void 0?void 0:o.minimumHeight)!==null&&r!==void 0?r:zv,minimumWidth:(s=(n=i.constraints)===null||n===void 0?void 0:n.minimumWidth)!==null&&s!==void 0?s:Tv,maximumHeight:(a=i.constraints)===null||a===void 0?void 0:a.maximumHeight,maximumWidth:(l=i.constraints)===null||l===void 0?void 0:l.maximumWidth},new Pv(t,e)),this._explicitConstraints={},this.api.initialize(this),this._model=new Dv(this.element,e,t,i,this),this._lastConstraints=this.currentConstraints(),this.addDisposables(this.model.onDidActivePanelChange(d=>{this.api._onDidActivePanelChange.fire(d),this.notifyIfConstraintsChanged()}),this.model.onDidRemovePanel(()=>{this.notifyIfConstraintsChanged()}))}applyConstraints(e){e.minimumWidth!==void 0&&(this._explicitConstraints.minimumWidth=typeof e.minimumWidth=="function"?e.minimumWidth():e.minimumWidth),e.minimumHeight!==void 0&&(this._explicitConstraints.minimumHeight=typeof e.minimumHeight=="function"?e.minimumHeight():e.minimumHeight),e.maximumWidth!==void 0&&(this._explicitConstraints.maximumWidth=typeof e.maximumWidth=="function"?e.maximumWidth():e.maximumWidth),e.maximumHeight!==void 0&&(this._explicitConstraints.maximumHeight=typeof e.maximumHeight=="function"?e.maximumHeight():e.maximumHeight),super.applyConstraints(e),this._lastConstraints=this.currentConstraints()}currentConstraints(){return{minimumWidth:this.minimumWidth,maximumWidth:this.maximumWidth,minimumHeight:this.minimumHeight,maximumHeight:this.maximumHeight}}notifyIfConstraintsChanged(){let e=this._lastConstraints,t=this.currentConstraints();e.minimumWidth===t.minimumWidth&&e.maximumWidth===t.maximumWidth&&e.minimumHeight===t.minimumHeight&&e.maximumHeight===t.maximumHeight||(this._lastConstraints=t,this.notifyConstraintsChanged())}focus(){this.api.isActive||this.api.setActive(),super.focus()}initialize(){this._model.initialize()}setActive(e){super.setActive(e),this.model.setActive(e)}layout(e,t){super.layout(e,t),this.model.layout(e,t)}relayout(){this.model.relayout()}getComponent(){return this._model}toJSON(){return this.model.toJSON()}};var Av={name:"abyss",className:"dockview-theme-abyss",colorScheme:"dark",tabGroupIndicator:"none"};var Iv=class extends fs{get location(){return this.group.api.location}get title(){return this.panel.title}get isPinned(){return this.panel.isPinned}get isGroupActive(){return this.group.isActive}get renderer(){return this.panel.renderer}set group(e){if(this._group!==e){let t=this._group.isActive;this._group=e,this._onDidGroupChange.fire({}),this.setupGroupEventListeners(),t!==this.isGroupActive&&this._onDidActiveGroupChange.fire({isActive:this.isGroupActive}),this.fireLocationChange()}}get group(){return this._group}get tabComponent(){return this._tabComponent}constructor(e,t,i,r,o){super(e.id,r),this.panel=e,this.accessor=i,this._onDidTitleChange=new E,this.onDidTitleChange=this._onDidTitleChange.event,this._onDidChangePinned=new E,this.onDidChangePinned=this._onDidChangePinned.event,this._onDidActiveGroupChange=new E,this.onDidActiveGroupChange=this._onDidActiveGroupChange.event,this._onDidGroupChange=new E,this.onDidGroupChange=this._onDidGroupChange.event,this._onDidRendererChange=new E,this.onDidRendererChange=this._onDidRendererChange.event,this._onDidLocationChange=new E,this.onDidLocationChange=this._onDidLocationChange.event,this.groupEventsDisposable=new Ee,this._tabComponent=o,this.initialize(e),this._group=t,this.setupGroupEventListeners(),this.addDisposables(this.groupEventsDisposable,this._onDidRendererChange,this._onDidTitleChange,this._onDidChangePinned,this._onDidGroupChange,this._onDidActiveGroupChange,this._onDidLocationChange)}getWindow(){return this.group.api.getWindow()}setActive(){this.accessor.withOrigin("api",()=>super.setActive())}moveTo(e){this.accessor.withOrigin("api",()=>{var t,i;return this.accessor.moveGroupOrPanel({from:{groupId:this._group.id,panelId:this.panel.id},to:{group:(t=e.group)!==null&&t!==void 0?t:this._group,position:e.group&&(i=e.position)!==null&&i!==void 0?i:"center",index:e.index},skipSetActive:e.skipSetActive})})}setTitle(e){this.panel.setTitle(e)}setPinned(e){this.accessor.setPanelPinned(this.panel,e)}setRenderer(e){this.panel.setRenderer(e)}close(){this.group.model.closePanel(this.panel)}maximize(){this.group.api.maximize()}isMaximized(){return this.group.api.isMaximized()}exitMaximized(){this.group.api.exitMaximized()}fireLocationChange(){this.accessor.deferLocationChange(this,()=>{this.isDisposed||this._onDidLocationChange.fire({location:this.location})})}setupGroupEventListeners(){let e=this.isGroupActive;this.groupEventsDisposable.value=new V(this.group.api.onDidVisibilityChange(t=>{let i=!t.isVisible&&this.isVisible,r=t.isVisible&&!this.isVisible,o=this.group.model.isPanelActive(this.panel);(i||r&&o)&&this._onDidVisibilityChange.fire(t)}),this.group.api.onDidLocationChange(()=>{this.group===this.panel.group&&this.fireLocationChange()}),this.group.api.onDidActiveChange(()=>{this.group===this.panel.group&&e!==this.isGroupActive&&(e=this.isGroupActive,this._onDidActiveGroupChange.fire({isActive:this.isGroupActive}))}))}},ri=class extends V{get params(){return this._params}get title(){return this._title}get isPinned(){return this._pinned}get group(){return this._group}get renderer(){var e;return(e=this._renderer)!==null&&e!==void 0?e:this.accessor.renderer}get minimumWidth(){return this._minimumWidth}get minimumHeight(){return this._minimumHeight}get maximumWidth(){return this._maximumWidth}get maximumHeight(){return this._maximumHeight}constructor(e,t,i,r,o,s,n,a){super(),this.id=e,this.accessor=r,this.containerApi=o,this.view=n,this._pinned=!1,this._renderer=a.renderer,this._group=s,this._minimumWidth=a.minimumWidth,this._minimumHeight=a.minimumHeight,this._maximumWidth=a.maximumWidth,this._maximumHeight=a.maximumHeight,this.api=new Iv(this,this._group,r,t,i),this.addDisposables(this.api.onActiveChange(()=>{r.setActivePanel(this)}),this.api.onDidSizeChange(l=>{this.group.api.setSize(l)}),this.api.onDidRendererChange(()=>{this.group.model.rerender(this)}))}init(e){this._params=e.params,this.view.init(j(j({},e),{},{api:this.api,containerApi:this.containerApi})),this.setTitle(e.title)}focus(){let e=new Rd;this.api._onWillFocus.fire(e),!e.defaultPrevented&&(this.api.isActive||this.api.setActive())}toJSON(){return{id:this.id,contentComponent:this.view.contentComponent,tabComponent:this.view.tabComponent,params:Object.keys(this._params||{}).length>0?this._params:void 0,title:this.title,renderer:this._renderer,minimumHeight:this._minimumHeight,maximumHeight:this._maximumHeight,minimumWidth:this._minimumWidth,maximumWidth:this._maximumWidth,pinned:this._pinned?!0:void 0}}setTitle(e){e!==this.title&&(this._title=e,this.view.setTitle(e),this.api._onDidTitleChange.fire({title:e}))}setPinned(e){this._pinned!==e&&(this._pinned=e,this.api._onDidChangePinned.fire({isPinned:e}))}setRenderer(e){e!==this.renderer&&(this._renderer=e,this.api._onDidRendererChange.fire({renderer:e}))}update(e){this._params=j(j({},this._params),e.params);for(let t of Object.keys(e.params))e.params[t]===void 0&&delete this._params[t];this.view.update({params:this._params})}updateFromStateModel(e){var t,i,r,o,s;this._maximumHeight=e.maximumHeight,this._minimumHeight=e.minimumHeight,this._maximumWidth=e.maximumWidth,this._minimumWidth=e.minimumWidth,this._params=(t=e.params)!==null&&t!==void 0?t:{},this.view.update({params:this._params}),this.setTitle((i=e.title)!==null&&i!==void 0?i:this.id),this.setRenderer((r=e.renderer)!==null&&r!==void 0?r:this.accessor.renderer),this.setPinned(((o=e.pinned)!==null&&o!==void 0?o:!1)&&!!(!((s=this.accessor.options.pinnedTabs)===null||s===void 0)&&s.enabled))}updateParentGroup(e,t){this._group=e,this.api.group=this._group;let i=this._group.model.isPanelActive(this),r=this.group.api.isActive&&i;t?.skipSetActive||this.api.isActive!==r&&this.api._onDidActiveChange.fire({isActive:this.group.api.isActive&&i}),this.api.isVisible!==i&&this.api._onDidVisibilityChange.fire({isVisible:i})}runEvents(){let e=this._group.model.isPanelActive(this),t=this.group.api.isActive&&e;this.api.isActive!==t&&this.api._onDidActiveChange.fire({isActive:this.group.api.isActive&&e}),this.api.isVisible!==e&&this.api._onDidVisibilityChange.fire({isVisible:e})}layout(e,t){this.api._onDidDimensionChange.fire({width:e,height:t}),this.view.layout(e,t)}dispose(){this.api.dispose(),this.view.dispose()}},ed=class extends V{get element(){return this._element}constructor(){super(),this._messages=Cr,this._element=document.createElement("div"),this._element.className="dv-default-tab",this._content=document.createElement("div"),this._content.className="dv-default-tab-content",this.action=document.createElement("div"),this.action.className="dv-default-tab-action",this.action.setAttribute("role","button"),this.action.setAttribute("tabindex","-1");let e=sv();e.setAttribute("aria-hidden","true"),this.action.appendChild(e),this._element.appendChild(this._content),this._element.appendChild(this.action),this.render()}init(e){var t;this._title=e.title,this._messages=(t=e.containerApi.messages)!==null&&t!==void 0?t:Cr,this.addDisposables(e.api.onDidTitleChange(i=>{this._title=i.title,this.render()}),$(this.action,"pointerdown",i=>{i.preventDefault()}),$(this.action,"click",i=>{i.defaultPrevented||(i.preventDefault(),e.api.close())})),this.render()}render(){if(this._content.textContent!==this._title){var e;this._content.textContent=(e=this._title)!==null&&e!==void 0?e:""}this.action.setAttribute("aria-label",this._title?this._messages.closeTab(this._title):this._messages.closeTabPlain())}},jd=class{get content(){return this._content}get tab(){return this._tab}constructor(e,t,i,r){this.accessor=e,this.id=t,this.contentComponent=i,this.tabComponent=r,this._content=this.createContentComponent(this.id,i),this._tab=this.createTabComponent(this.id,r)}createTabRenderer(e){let t=this.createTabComponent(this.id,this.tabComponent);if(this._params&&t.init(j(j({},this._params),{},{tabLocation:e})),this._updateEvent){var i;(i=t.update)===null||i===void 0||i.call(t,this._updateEvent)}return t}init(e){this._params=e,this.content.init(e),this.tab.init(j(j({},e),{},{tabLocation:"header"}))}setTitle(e){this._params&&(this._params.title=e)}layout(e,t){var i,r;(i=(r=this.content).layout)===null||i===void 0||i.call(r,e,t)}update(e){var t,i,r,o;this._updateEvent=e,(t=(i=this.content).update)===null||t===void 0||t.call(i,e),(r=(o=this.tab).update)===null||r===void 0||r.call(o,e)}dispose(){var e,t,i,r;(e=(t=this.content).dispose)===null||e===void 0||e.call(t),(i=(r=this.tab).dispose)===null||i===void 0||i.call(r)}createContentComponent(e,t){return this.accessor.options.createComponent({id:e,name:t})}createTabComponent(e,t){let i=t??this.accessor.options.defaultTabComponent;if(i){if(this.accessor.options.createTabComponent){let r=this.accessor.options.createTabComponent({id:e,name:i});return r||new ed}console.warn(`dockview: tabComponent '${t}' was not found. falling back to the default tab.`)}return new ed}},Gv=class{constructor(e){this.accessor=e}fromJSON(e,t){var i,r,o;let s=e.id,n=e.params,a=e.title,l=e.view,d=l?l.content.id:(i=e.contentComponent)!==null&&i!==void 0?i:"unknown",h=l?(r=l.tab)===null||r===void 0?void 0:r.id:e.tabComponent,c=new jd(this.accessor,s,d,h),u=new ri(s,d,h,this.accessor,new ds(this.accessor),t,c,{renderer:e.renderer,minimumWidth:e.minimumWidth,minimumHeight:e.minimumHeight,maximumWidth:e.maximumWidth,maximumHeight:e.maximumHeight});return u.init({title:a??s,params:n??{}}),e.pinned&&(!((o=this.accessor.options.pinnedTabs)===null||o===void 0)&&o.enabled)&&u.setPinned(!0),u}},Mv=class extends V{get element(){return this._element}constructor(){super(),this._element=document.createElement("div"),this._element.className="dv-watermark"}init(e){}},Ov=class{constructor(){this._orderedList=[]}push(e){this._orderedList=[...this._orderedList.filter(t=>t!==e),e],this.update()}destroy(e){this._orderedList=this._orderedList.filter(t=>t!==e),this.update()}update(){for(let e=0;e<this._orderedList.length;e++)this._orderedList[e].setAttribute("aria-level",`${e}`),this._orderedList[e].style.zIndex=`calc(var(--dv-overlay-z-index, 999) + ${e*2})`}},gr=new Ov;function Vo(e){return e.width>0&&e.height>0}var _s=class Yt extends V{set minimumInViewportWidth(t){this.options.minimumInViewportWidth=t}set minimumInViewportHeight(t){this.options.minimumInViewportHeight=t}get element(){return this._element}get isVisible(){return this._isVisible}get headerHeight(){var t,i;return(t=(i=this.options.header)===null||i===void 0?void 0:i.offsetHeight)!==null&&t!==void 0?t:0}constructor(t){super(),this.options=t,this._element=document.createElement("div"),this._onDidChange=new E,this.onDidChange=this._onDidChange.event,this._onDidChangeEnd=new E,this.onDidChangeEnd=this._onDidChangeEnd.event,this._onDidStartMoving=new E,this.onDidStartMoving=this._onDidStartMoving.event,this._dragMove=new Ee,this._dragCancelled=!1,this.addDisposables(this._onDidChange,this._onDidChangeEnd,this._onDidStartMoving,this._dragMove),this._element.className="dv-resize-container",this._element.setAttribute("role","dialog"),this._element.setAttribute("aria-modal","false"),this._isVisible=!0,this.setupResize("top"),this.setupResize("bottom"),this.setupResize("left"),this.setupResize("right"),this.setupResize("topleft"),this.setupResize("topright"),this.setupResize("bottomleft"),this.setupResize("bottomright"),this.options.header&&(B(this._element,"dv-resize-container-with-titlebar",!0),this._element.appendChild(this.options.header)),this._element.appendChild(this.options.content),this.options.container.appendChild(this._element),this.setBounds(j(j(j(j({height:this.options.height,width:this.options.width},"top"in this.options&&{top:this.options.top}),"bottom"in this.options&&{bottom:this.options.bottom}),"left"in this.options&&{left:this.options.left}),"right"in this.options&&{right:this.options.right})),gr.push(this._element)}setVisible(t){t!==this.isVisible&&(this._isVisible=t,B(this.element,"dv-hidden",!this.isVisible))}bringToFront(){gr.push(this._element)}setBounds(t={}){typeof t.height=="number"&&(this._element.style.height=`${t.height}px`),typeof t.width=="number"&&(this._element.style.width=`${t.width}px`),"top"in t&&typeof t.top=="number"&&(this._element.style.top=`${t.top}px`,this._element.style.bottom="auto",this.verticalAlignment="top"),"bottom"in t&&typeof t.bottom=="number"&&(this._element.style.bottom=`${t.bottom}px`,this._element.style.top="auto",this.verticalAlignment="bottom"),"left"in t&&typeof t.left=="number"&&(this._element.style.left=`${t.left}px`,this._element.style.right="auto",this.horiziontalAlignment="left"),"right"in t&&typeof t.right=="number"&&(this._element.style.right=`${t.right}px`,this._element.style.left="auto",this.horiziontalAlignment="right");let i=this.options.container.getBoundingClientRect(),r=this._element.getBoundingClientRect();if(!Vo(i)||!Vo(r)){this._onDidChange.fire();return}let o=Math.max(0,this.getMinimumWidth(r.width)),s=Math.max(0,this.getMinimumHeight(r.height));if(this.verticalAlignment==="top"){let n=le(r.top-i.top,-s,Math.max(0,i.height-r.height+s));this._element.style.top=`${n}px`,this._element.style.bottom="auto"}if(this.verticalAlignment==="bottom"){let n=le(i.bottom-r.bottom,-s,Math.max(0,i.height-r.height+s));this._element.style.bottom=`${n}px`,this._element.style.top="auto"}if(this.horiziontalAlignment==="left"){let n=le(r.left-i.left,-o,Math.max(0,i.width-r.width+o));this._element.style.left=`${n}px`,this._element.style.right="auto"}if(this.horiziontalAlignment==="right"){let n=le(i.right-r.right,-o,Math.max(0,i.width-r.width+o));this._element.style.right=`${n}px`,this._element.style.left="auto"}this._onDidChange.fire()}toJSON(){let t=this.options.container.getBoundingClientRect(),i=this._element.getBoundingClientRect(),r={};return this.verticalAlignment==="top"?r.top=Number.parseFloat(this._element.style.top):this.verticalAlignment==="bottom"?r.bottom=Number.parseFloat(this._element.style.bottom):r.top=i.top-t.top,this.horiziontalAlignment==="left"?r.left=Number.parseFloat(this._element.style.left):this.horiziontalAlignment==="right"?r.right=Number.parseFloat(this._element.style.right):r.left=i.left-t.left,Vo(i)?(r.width=i.width,r.height=i.height):(r.width=Number.parseFloat(this._element.style.width)||0,r.height=Number.parseFloat(this._element.style.height)||0),r}cancelPendingDrag(){this._dragMove.value&&(this._dragCancelled=!0,B(this._element,"dv-resize-container-dragging",!1),this._dragMove.value=ee.NONE)}setupDrag(t,i){let r=(o,s)=>{var n,a,l;let d=null,h=!1;this._dragCancelled=!1;let c=this.options.transformDragPosition?(n=(a=(l=this.options).getSiblingBoxes)===null||a===void 0?void 0:a.call(l))!==null&&n!==void 0?n:[]:[],u=Gi();if(o&&typeof s=="number"&&typeof o.setPointerCapture=="function")try{o.setPointerCapture(s)}catch{}let p=()=>{B(this._element,"dv-resize-container-dragging",!1),this._dragMove.value=ee.NONE,this._onDidChangeEnd.fire()};this._dragMove.value=new V({dispose:()=>{if(u.release(),o&&typeof s=="number"&&typeof o.releasePointerCapture=="function")try{o.releasePointerCapture(s)}catch{}}},$(globalThis.window,"pointermove",v=>{var g;if(this._dragCancelled)return;let m=this.options.container.getBoundingClientRect(),f=v.clientX-m.left,S=v.clientY-m.top;B(this._element,"dv-resize-container-dragging",!0);let w=this._element.getBoundingClientRect();(g=d)!==null&&g!==void 0||(d={x:v.clientX-w.left,y:v.clientY-w.top});let D=Math.max(0,this.getMinimumWidth(w.width)),T=Math.max(0,this.getMinimumHeight(w.height)),R=S-d.y,x=f-d.x;if(this.options.transformDragPosition){let P=this.options.transformDragPosition({proposed:{top:R,left:x,width:w.width,height:w.height},container:{width:m.width,height:m.height},others:c,modifiers:{altKey:v.altKey,ctrlKey:v.ctrlKey,metaKey:v.metaKey,shiftKey:v.shiftKey}});P&&(R=P.top,x=P.left)}let C=Math.max(0,m.height-w.height+T),L=Math.max(0,m.width-w.width+D),M=le(R,-T,C),O=le(m.height-w.height-R,-T,C),W=le(x,-D,L),_=le(m.width-w.width-x,-D,L),y={};M<=O?y.top=M:y.bottom=O,W<=_?y.left=W:y.right=_,this.setBounds(y),h||(h=!0,this._onDidStartMoving.fire())}),$(globalThis.window,"pointerup",p),$(globalThis.window,"pointercancel",p))};this.addDisposables($(t,"pointerdown",o=>{if(o.defaultPrevented){o.preventDefault();return}Va(o)||r(t,o.pointerId)}),$(this.options.content,"pointerdown",o=>{o.defaultPrevented||Va(o)||o.shiftKey&&r(this.options.content,o.pointerId)}),$(this.options.content,"pointerdown",()=>{gr.push(this._element)},!0)),i?.inDragMode&&r()}setupResize(t){let i=document.createElement("div");i.className=`dv-resize-handle-${t}`,this._element.appendChild(i);let r=new Ee;this.addDisposables(r,$(i,"pointerdown",o=>{o.preventDefault();let s=null,n=Gi(),a=o.pointerId;if(typeof i.setPointerCapture=="function")try{i.setPointerCapture(a)}catch{}let l=()=>{r.dispose(),this._onDidChangeEnd.fire()};r.value=new V($(globalThis.window,"pointermove",d=>{var h;let c=this.options.container.getBoundingClientRect(),u=this._element.getBoundingClientRect(),p=d.clientY-c.top,v=d.clientX-c.left;(h=s)!==null&&h!==void 0||(s={originalY:p,originalHeight:u.height,originalX:v,originalWidth:u.width});let g,m,f,S,w,D,T=()=>{let M=s.originalY+s.originalHeight>c.height?Math.max(0,c.height-Yt.MINIMUM_HEIGHT):Math.max(0,s.originalY+s.originalHeight-Yt.MINIMUM_HEIGHT);g=le(p,0,M),f=s.originalY+s.originalHeight-g,m=c.height-g-f},R=()=>{g=s.originalY-s.originalHeight;let M=g<0&&typeof this.options.minimumInViewportHeight=="number"?-g+this.options.minimumInViewportHeight:Yt.MINIMUM_HEIGHT,O=c.height-Math.max(0,g);f=le(p-g,M,O),m=c.height-g-f},x=()=>{let M=s.originalX+s.originalWidth>c.width?Math.max(0,c.width-Yt.MINIMUM_WIDTH):Math.max(0,s.originalX+s.originalWidth-Yt.MINIMUM_WIDTH);S=le(v,0,M),D=s.originalX+s.originalWidth-S,w=c.width-S-D},C=()=>{S=s.originalX-s.originalWidth;let M=S<0&&typeof this.options.minimumInViewportWidth=="number"?-S+this.options.minimumInViewportWidth:Yt.MINIMUM_WIDTH,O=c.width-Math.max(0,S);D=le(v-S,M,O),w=c.width-S-D};switch(t){case"top":T();break;case"bottom":R();break;case"left":x();break;case"right":C();break;case"topleft":T(),x();break;case"topright":T(),C();break;case"bottomleft":R(),x();break;case"bottomright":R(),C();break}let L={};g<=m?L.top=g:L.bottom=m,S<=w?L.left=S:L.right=w,L.height=f,L.width=D,this.setBounds(L)}),{dispose:()=>{if(n.release(),typeof i.releasePointerCapture=="function")try{i.releasePointerCapture(a)}catch{}}},$(globalThis.window,"pointerup",l),$(globalThis.window,"pointercancel",l))}))}getMinimumWidth(t){return typeof this.options.minimumInViewportWidth=="number"?t-this.options.minimumInViewportWidth:0}getMinimumHeight(t){return typeof this.options.minimumInViewportHeight=="number"?t-this.options.minimumInViewportHeight:0}dispose(){gr.destroy(this._element),this._element.remove(),super.dispose()}};_s.MINIMUM_HEIGHT=20;_s.MINIMUM_WIDTH=20;var Lv=class extends V{get element(){return this._element}get group(){return this._group}setGroup(e){this._group=e}constructor(e,t){super(),this.accessor=e,this._onDragStart=new E,this.onDragStart=this._onDragStart.event,this._group=t,this._element=document.createElement("div"),this._element.className="dv-floating-titlebar",this.addDisposables(this._onDragStart,$(this._element,"pointerdown",()=>{this.accessor.doSetGroupActive(this._group)}),$(this._element,"pointerdown",i=>{i.shiftKey&&fd(i)},!0)),this.dragSource=new Bd({element:this._element,accessor:this.accessor,group:()=>this._group}),this.addDisposables(this.dragSource,this.dragSource.onDragStart(i=>{this._onDragStart.fire(i)}))}updateDragAndDropState(){this.dragSource.updateDragAndDropState()}};function ut(e){return{moduleName:e.name,options:e.options,services:{[e.serviceKey]:e.create},init:e.init?(t,i)=>e.init(t,i[e.serviceKey]):void 0,dependsOn:e.dependsOn}}var Rv=new Set(["AdvancedOverflow","AutoEdgeGroup","AutoHideEdgeGroup","DndCompass","KeyboardDocking","KeyboardNavigation","LayoutHistory","License","MultiRowTabs","PinnedTabs","SmartGuides"]),td=new Set;function Jd(e,t){let i=t===void 0?[]:[].concat(t),r=i.map(n=>`\`${n}\``).join(", "),o=i.length>1?"require":"requires",s=i.length?`${r} ${o} the "${e}" module`:`The "${e}" module is required`;return Rv.has(e)?`dockview: ${s}, which ships in dockview-enterprise.

  npm install dockview-enterprise
  import 'dockview-enterprise'; // self-registers every enterprise module
`:`dockview: ${s}, but it is not registered.`}function Zd(e,t){let i=`${e}|${(t===void 0?[]:[].concat(t)).join("|")}`;td.has(i)||(td.add(i),console.error(Jd(e,t)))}function Ue(e,t,i){if(e!==void 0)return e;Zd(t,i)}var Nv=class{constructor(){this._modules=new Map,this._services={},this._initDisposables=[]}get services(){return this._services}register(e){if(!this._modules.has(e.moduleName)){if(e.dependsOn)for(let t of e.dependsOn)this.register(t);this._modules.set(e.moduleName,e)}}initialize(e){for(let t of this._modules.values())if(t.services)for(let[i,r]of Object.entries(t.services))this._services[i]=r(e)}postConstruct(e){for(let t of this._modules.values())t.init&&this._initDisposables.push(t.init(e,this._services))}has(e){return this._modules.has(e)}dispose(){for(let e of this._initDisposables)e.dispose();this._initDisposables.length=0;for(let e of Object.values(this._services))e!==void 0&&typeof e.dispose=="function"&&e.dispose()}},Bv=[];function Wv(){return[...Bv]}var Hv=[{optionKey:"smartGuides",reason:"smartGuides",moduleName:"SmartGuides",when:e=>!!e.smartGuides&&e.smartGuides.enabled!==!1},{optionKey:"layoutHistory",reason:"layoutHistory.enabled: true",moduleName:"LayoutHistory",when:e=>{var t;return((t=e.layoutHistory)===null||t===void 0?void 0:t.enabled)===!0}},{optionKey:"pinnedTabs",reason:"pinnedTabs.enabled: true",moduleName:"PinnedTabs",when:e=>{var t;return((t=e.pinnedTabs)===null||t===void 0?void 0:t.enabled)===!0}},{optionKey:"overflow",reason:"overflow.mode: 'wrap'",moduleName:"MultiRowTabs",when:e=>{var t;return((t=e.overflow)===null||t===void 0?void 0:t.mode)==="wrap"}},{optionKey:"overflow",reason:"overflow.maxRows",moduleName:"MultiRowTabs",when:e=>{var t;return((t=e.overflow)===null||t===void 0?void 0:t.maxRows)!=null}},{optionKey:"overflow",reason:"overflow.search",moduleName:"AdvancedOverflow",when:e=>{var t;return!!(!((t=e.overflow)===null||t===void 0)&&t.search)}},{optionKey:"overflow",reason:"overflow.mru",moduleName:"AdvancedOverflow",when:e=>{var t;return!!(!((t=e.overflow)===null||t===void 0)&&t.mru)}},{optionKey:"autoHideEdgeGroups",reason:"autoHideEdgeGroups",moduleName:"AutoHideEdgeGroup",when:e=>rs(e.autoHideEdgeGroups)},{optionKey:"dockToEdgeGroups",reason:"dockToEdgeGroups",moduleName:"AutoEdgeGroup",when:e=>rs(e.dockToEdgeGroups)},{optionKey:"dndCompass",reason:"dndCompass",moduleName:"DndCompass",when:e=>!!e.dndCompass},{optionKey:"keyboardNavigation",reason:"keyboardNavigation",moduleName:"KeyboardNavigation",when:e=>!!e.keyboardNavigation}];function $v(e,t){let i=new Map;for(let r of Hv){if(!r.when(e)||t(r.moduleName))continue;let o=i.get(r.moduleName);o?o.push(r.reason):i.set(r.moduleName,[r.reason])}for(let[r,o]of i)Zd(r,o)}var Ot={left:100,top:100,width:300,height:300},Fv=class extends V{get group(){return this._group}setTitleBar(e){this._titleBar=e}setAnchorGroup(e){var t;this._group=e,(t=this._titleBar)===null||t===void 0||t.setGroup(e),this._onDidChangeAnchorGroup.fire(e)}constructor(e,t,i){super(),this.overlay=t,this.gridview=i,this._onDidChangeAnchorGroup=new E,this.onDidChangeAnchorGroup=this._onDidChangeAnchorGroup.event,this._group=e,this.addDisposables(this._onDidChangeAnchorGroup,t,{dispose:()=>this.gridview.dispose()})}position(e){this.overlay.setBounds(e)}},Vv=class{get floatingGroups(){return this._floatingGroups}constructor(e){this._floatingGroups=[],this._host=e}add(e,t,i){let r=new Fv(e,t,i),o=new V((()=>{let l=-1,d=-1;return Xt(i.element,h=>{let c=Math.round(h.contentRect.width),u=Math.round(h.contentRect.height);c===l&&u===d||(l=c,d=u,i.layout(c,u))})})()),s=l=>{var d;let h=(d=l.activePanel)===null||d===void 0?void 0:d.title;h?t.element.setAttribute("aria-label",h):t.element.removeAttribute("aria-label")},n=new Ee,a=l=>{s(l),n.value=new V(l.api.onDidActiveChange(d=>{d.isActive&&t.bringToFront()}),l.api.onDidActivePanelChange(()=>s(l)),l.onDidChange(d=>{t.setBounds({height:typeof d?.height=="number"?d.height+t.headerHeight:d?.height,width:d?.width})}))};return a(e),r.addDisposables(n,r.onDidChangeAnchorGroup(l=>a(l)),t.onDidChange(()=>{i.layout(i.width,i.height)}),t.onDidChangeEnd(()=>{this._host.fireLayoutChange("geometry")}),{dispose:()=>{o.dispose(),kd(this._floatingGroups,r),e.model.location={type:"grid"}}}),this._floatingGroups.push(r),r}findByGroup(e){return this._floatingGroups.find(t=>t.group===e||t.gridview.element.contains(e.element))}serialize(){return this._floatingGroups.map(e=>{let t=e.gridview.serialize(),i=e.overlay.toJSON(),r=t.root;return r.type==="branch"&&r.data.length===1&&r.data[0].type==="leaf"?{data:r.data[0].data,position:i}:{grid:t,position:i}})}constrainBounds(){for(let e of this._floatingGroups)e.overlay.setBounds()}updateBounds(e){if("floatingGroupBounds"in e)for(let r of this._floatingGroups){switch(e.floatingGroupBounds){case"boundedWithinViewport":r.overlay.minimumInViewportHeight=void 0,r.overlay.minimumInViewportWidth=void 0;break;case void 0:r.overlay.minimumInViewportHeight=100,r.overlay.minimumInViewportWidth=100;break;default:var t,i;r.overlay.minimumInViewportHeight=(t=e.floatingGroupBounds)===null||t===void 0?void 0:t.minimumHeightWithinViewport,r.overlay.minimumInViewportWidth=(i=e.floatingGroupBounds)===null||i===void 0?void 0:i.minimumWidthWithinViewport}r.overlay.setBounds()}}disposeAll(){for(let e of[...this._floatingGroups])e.dispose()}dispose(){this.disposeAll()}},qv=ut({name:"FloatingGroup",serviceKey:"floatingGroupService",create:e=>new Vv(e)}),Uv=class{constructor(e){this._entries=[],this._restorationCleanups=new Set,this._restorationPromise=Promise.resolve(),this._onDidRemove=new E,this.onDidRemove=this._onDidRemove.event,this._host=e}get entries(){return this._entries}get restorationPromise(){return this._restorationPromise}add(e){this._entries.push(e)}remove(e){kd(this._entries,e)&&!this._host.isDisposed&&this._onDidRemove.fire(e)}findByGroup(e){return this._entries.find(t=>t.popoutGroup===e||t.gridview.element.contains(e.element))}findReferenceGroupId(e){var t;return(t=this._entries.find(i=>i.popoutGroup===e))===null||t===void 0?void 0:t.referenceGroup}observeGridviewSize(e,t,i){var r;let o=(r=e.window)===null||r===void 0?void 0:r.ResizeObserver;if(!o)return;let s=-1,n=-1,a=()=>{let d=e.window;if(this._host.isDisposed||!d||d.closed)return;let h=Math.round(t.element.clientWidth),c=Math.round(t.element.clientHeight);h===s&&c===n||(s=h,n=c,h>0&&c>0&&t.layout(h,c),i.updateAllPositions())},l=new o(()=>{var d;let h=(d=e.window)===null||d===void 0?void 0:d.requestAnimationFrame;h?h.call(e.window,a):a()});return l.observe(t.element),{dispose:()=>l.disconnect()}}scheduleRestoration(e,t,i){return new Promise(r=>{let o=()=>{this._restorationCleanups.delete(o),clearTimeout(s),i?.(),r()},s=setTimeout(()=>{if(this._restorationCleanups.delete(o),this._host.isDisposed){r();return}Promise.resolve(t()).then(()=>r(),()=>r())},e);this._restorationCleanups.add(o)})}finishRestoration(e){this._restorationPromise=Promise.all(e).then(()=>{})}cancelPendingRestorations(){for(let e of[...this._restorationCleanups])e();this._restorationCleanups.clear()}serialize(){return this._entries.map(e=>{let t=e.gridview.serialize(),i=t.root,r=e.popoutGroup.api.location.type==="popout"?e.popoutGroup.api.location.popoutUrl:void 0,o={gridReferenceGroup:e.referenceGroup,position:e.window.dimensions(),url:r};return i.type==="branch"&&i.data.length===1&&i.data[0].type==="leaf"?j(j({},o),{},{data:i.data[0].data}):j(j({},o),{},{grid:t})})}disposeAll(){for(let e of[...this._entries])e.disposable.dispose()}dispose(){this.cancelPendingRestorations(),this.disposeAll(),this._onDidRemove.dispose()}},Kv=ut({name:"PopoutWindow",serviceKey:"popoutWindowService",create:e=>new Uv(e)}),Yv=class{constructor(e){this._watermark=null,this._host=e}update(){if(this._host.hasVisibleGridGroup()){this._unmount();return}if(this._watermark)return;this._watermark=this._host.createWatermarkComponent(),this._watermark.init({containerApi:this._host.api});let e=document.createElement("div");e.className="dv-watermark-container",gp(e,"watermark-component"),e.appendChild(this._watermark.element),this._host.mountElement.appendChild(e)}refresh(){this._unmount(),this.update()}_unmount(){var e,t;this._watermark&&(this._watermark.element.parentElement.remove(),(e=(t=this._watermark).dispose)===null||e===void 0||e.call(t),this._watermark=null)}dispose(){this._unmount()}},Xv=ut({name:"Watermark",serviceKey:"watermarkService",create:e=>new Yv(e),init:(e,t)=>(t.update(),new V(Ke.any(e.onDidAdd,e.onDidRemove)(()=>{t.update()}),e.onDidViewVisibilityChangeMicroTaskQueue(()=>{t.update()})))}),jv=class{constructor(){this._edgeGroups=new Map,this._edgeGroupDisposables=new Map,this._autoHide=new WeakMap,this._autoReveal=new WeakMap}add(e,t,i){this._edgeGroups.set(e,t),this._edgeGroupDisposables.set(e,i)}remove(e){var t;(t=this._edgeGroupDisposables.get(e))===null||t===void 0||t.dispose(),this._edgeGroupDisposables.delete(e),this._edgeGroups.delete(e)}get(e){return this._edgeGroups.get(e)}has(e){return this._edgeGroups.has(e)}hasAny(){return this._edgeGroups.size>0}entries(){return this._edgeGroups.entries()}includes(e){for(let t of this._edgeGroups.values())if(t===e)return!0;return!1}findPositionOf(e){for(let[t,i]of this._edgeGroups)if(i===e)return t}setAutoHide(e,t){t===void 0?this._autoHide.delete(e):this._autoHide.set(e,t)}isAutoHide(e){return this._autoHide.get(e)}setAutoReveal(e,t){this._autoReveal.set(e,t)}isAutoReveal(e){var t;return(t=this._autoReveal.get(e))!==null&&t!==void 0?t:!1}disposeAll(){for(let e of this._edgeGroupDisposables.values())e.dispose();this._edgeGroupDisposables.clear(),this._edgeGroups.clear()}dispose(){this.disposeAll()}},Jv=ut({name:"EdgeGroup",serviceKey:"edgeGroupService",create:()=>new jv}),Zv=["left","right","top","bottom"],Qd=10,bs=32,Qv={activationSize:{type:"pixels",value:Qd},size:{type:"pixels",value:20}},eg={activationSize:{type:"pixels",value:bs},size:{type:"pixels",value:20}};function el(e){return typeof e.dndEdges=="object"&&e.dndEdges!==null}function tl(e,t){return!el(e)&&t&&rs(e.dockToEdgeGroups)}function id(e,t){return el(e)?e.dndEdges:tl(e,t)?eg:Qv}function tg(e,t){if(!tl(e,t))return;let i=r=>Fd(e.dockToEdgeGroups,r)?bs:Qd;return{left:i("left"),right:i("right"),top:i("top"),bottom:i("bottom")}}function ig(e){return{resolve:({x:t,y:i,width:r,height:o,zones:s})=>{let n=hs(s,t,i,r,o,e);return n?{position:n,edge:!1}:null}}}var rg=".dv-tabs-and-actions-container";function og(e,t){var i,r;let o=e.type.startsWith("drag")?e.target:(i=(r=yr(t)).elementFromPoint)===null||i===void 0?void 0:i.call(r,e.clientX,e.clientY);return o instanceof Element&&o.closest(rg)!==null}var sg=class{constructor(e){this._widenedEdges=new Set,this._host=e;let t=(o,s)=>{if(this._widenedEdges.has(s)&&og(o,e.element))return!1;let n=he();return n?n.viewId!==e.id?!1:s==="center"?e.isGridEmpty():!0:s==="center"&&!e.isGridEmpty()?!1:e.dispatchUnhandledDragOver(o,s)},i=id(e.options,!1),r=()=>{var o;return(o=e.options.dropPositionResolver)!==null&&o!==void 0?o:this._edgeBandResolver};this._html5Target=Lt.createDropTarget(e.element,{className:"dv-drop-target-edge",canDisplayOverlay:t,acceptedTargetZones:["top","bottom","left","right","center"],overlayModel:i,getOverrideTarget:()=>e.rootDropTargetOverrideTarget(),getPositionResolver:r}),this._pointerTarget=ct.createDropTarget(e.element,{className:"dv-drop-target-edge",canDisplayOverlay:t,acceptedTargetZones:["top","bottom","left","right","center"],overlayModel:i,getOverrideTarget:()=>e.rootDropTargetOverrideTarget(),getPositionResolver:r}),this.onWillShowOverlay=Ke.any(this._html5Target.onWillShowOverlay,this._pointerTarget.onWillShowOverlay),this.onDrop=Ke.any(this._html5Target.onDrop,this._pointerTarget.onDrop),this.setOptions(e.options)}setOptions(e){if("dndEdges"in e){let t=typeof e.dndEdges=="boolean"&&e.dndEdges===!1;this._html5Target.disabled=t,this._pointerTarget.disabled=t}if("dndEdges"in e||"dockToEdgeGroups"in e){let t={dndEdges:"dndEdges"in e?e.dndEdges:this._host.options.dndEdges,dockToEdgeGroups:"dockToEdgeGroups"in e?e.dockToEdgeGroups:this._host.options.dockToEdgeGroups},i=id(t,this._host.hasEdgeDragReveal);this._html5Target.setOverlayModel(i),this._pointerTarget.setOverlayModel(i);let r=tg(t,this._host.hasEdgeDragReveal);this._edgeBandResolver=r?ig(r):void 0,this._widenedEdges=new Set(Zv.filter(o=>r?.[o]===bs))}}dispose(){this._html5Target.dispose(),this._pointerTarget.dispose()}},ng=ut({name:"RootDropTarget",serviceKey:"rootDropTargetService",create:e=>new sg(e),init:(e,t)=>(t.setOptions(e.options),ee.NONE)}),ag={left:"createLeftHeaderActionComponent",right:"createRightHeaderActionComponent",prefix:"createPrefixHeaderActionComponent"},dg=class{constructor(e){this._perGroup=new Map,this._host=e}refresh(e){if(!e?.model)return;let t=this._ensureState(e);this._refreshSlot("left",e,t.left),this._refreshSlot("right",e,t.right),this._refreshSlot("prefix",e,t.prefix)}refreshAll(){for(let e of this._host.groups)this.refresh(e)}disposeGroup(e){let t=this._perGroup.get(e);t&&(t.left.dispose(),t.right.dispose(),t.prefix.dispose(),this._perGroup.delete(e))}dispose(){for(let e of[...this._perGroup.keys()])this.disposeGroup(e)}_ensureState(e){let t=this._perGroup.get(e);return t||(t={left:new Ee,right:new Ee,prefix:new Ee},this._perGroup.set(e,t)),t}_refreshSlot(e,t,i){let r=this._host.options[ag[e]];if(r){let o=r(t);i.value=o,o.init({containerApi:this._host.api,api:t.api,group:t}),t.model.attachHeaderAction(e,o.element)}else i.dispose(),t.model.attachHeaderAction(e,void 0)}},lg=ut({name:"HeaderActions",serviceKey:"headerActionsService",create:e=>new dg(e),init:(e,t)=>new V(e.onDidRemoveGroup(i=>{t.disposeGroup(i)}))}),rd=e=>e==="load"||e==="clear";function mr(e,t){let i=e.createElement("div");return i.className=t==="assertive"?"dv-live-region-assertive":"dv-live-region",i.setAttribute("role",t==="assertive"?"alert":"status"),i.setAttribute("aria-live",t),i.setAttribute("aria-atomic","true"),Object.assign(i.style,{position:"absolute",width:"1px",height:"1px",margin:"-1px",padding:"0",overflow:"hidden",clip:"rect(0 0 0 0)",clipPath:"inset(50%)",whiteSpace:"nowrap",border:"0"}),i}var hg=class extends V{constructor(e){var t;super(),this._regions=new Map,this._suppressDepth=0,this._locationSubs=new Map,this._host=e;let i=e.element.ownerDocument;this._mainWindow=(t=i.defaultView)!==null&&t!==void 0?t:window;let r={polite:mr(i,"polite"),assertive:mr(i,"assertive")};e.element.appendChild(r.polite),e.element.appendChild(r.assertive),this._regions.set(this._mainWindow,r),this._syncPopoutRegions(),this.addDisposables({dispose:()=>this._disposeRegions()},e.onDidChangePopouts(()=>this._syncPopoutRegions()),e.onDidAddPanel(o=>this._announce(o,"open")),e.onDidRemovePanel(o=>this._announce(o,"close")),e.onWillMutateLayout(o=>{rd(o.kind)&&this._suppressDepth++}),e.onDidMutateLayout(o=>{rd(o.kind)&&(this._suppressDepth=Math.max(0,this._suppressDepth-1))}),e.onDidMaximizedGroupChange(o=>{let s=o.group.activePanel;s&&this._announce(s,o.isMaximized?"maximize":"restore")}),e.onDidAddGroup(o=>this._trackLocation(o)),e.onDidRemoveGroup(o=>{var s;(s=this._locationSubs.get(o.id))===null||s===void 0||s.dispose(),this._locationSubs.delete(o.id)}),{dispose:()=>{this._locationSubs.forEach(o=>o.dispose()),this._locationSubs.clear()}})}_syncPopoutRegions(){let e=this._host.element.ownerDocument,t=new Set([this._mainWindow]);for(let r of this._host.getPopoutWindows()){var i;if(r.document===e||(t.add(r),this._regions.has(r)))continue;let o=r.document,s=(i=o.body)!==null&&i!==void 0?i:o.documentElement,n={polite:mr(o,"polite"),assertive:mr(o,"assertive")};s.appendChild(n.polite),s.appendChild(n.assertive),this._regions.set(r,n)}for(let[r,o]of this._regions)t.has(r)||(o.polite.remove(),o.assertive.remove(),this._regions.delete(r))}_disposeRegions(){for(let e of this._regions.values())e.polite.remove(),e.assertive.remove();this._regions.clear()}_focusedRegions(){for(let[e,t]of this._regions)if(e!==this._mainWindow)try{if(e.document.hasFocus())return t}catch{}return this._regions.get(this._mainWindow)}_trackLocation(e){let t=e.api.location.type,i=e.api.onDidLocationChange(r=>{let o=r.location.type;if(o===t)return;t=o;let s=e.activePanel;if(!s)return;let n;switch(o){case"floating":n="float";break;case"popout":n="popout";break;default:n="dock";break}this._announce(s,n)});this._locationSubs.set(e.id,i)}announce(e,t="polite"){if(this._host.options.announcements===!1||this._suppressDepth>0||!e)return;let i=this._host.options.announcer;if(i){i({message:e,politeness:t});return}let r=this._focusedRegions(),o=t==="assertive"?r.assertive:r.polite;o.textContent="",o.textContent=e}_announce(e,t){var i,r;let o=(i=(r=this._host.options).getAnnouncement)===null||i===void 0?void 0:i.call(r,{kind:t,panel:e});o===null||o===""||this.announce(o??this._defaultMessage(e,t))}_defaultMessage(e,t){var i;let r=zd(this._host.options.messages),o=(i=e.title)!==null&&i!==void 0?i:e.id;switch(t){case"open":return r.panelOpened(o);case"close":return r.panelClosed(o);case"maximize":return r.groupMaximized(o);case"restore":return r.groupRestored(o);case"float":return r.groupFloated(o);case"dock":return r.groupDocked(o);case"popout":return r.groupPoppedOut(o)}}},cg=ut({name:"LiveRegion",serviceKey:"liveRegionService",create:e=>new hg(e)}),ug=30,pg=-10,vg=class{constructor(e){this.host=e}dispatchWillDragPanel(e){this.host.fireWillDragPanel(e)}dispatchWillDragGroup(e){this.host.fireWillDragGroup(e)}dispatchWillDrop(e){this.host.fireWillDrop(e)}dispatchWillShowOverlay(e){this.host.fireWillShowOverlay(e)}buildGroupDragGhost(e){let t=this.host.options.createGroupDragGhostComponent;if(!t)return;let i=t(e);return i.init({group:e,api:this.host.api}),{element:i.element,offsetX:ug,offsetY:pg,dispose:i.dispose?()=>{var r;return(r=i.dispose)===null||r===void 0?void 0:r.call(i)}:void 0}}resolveOverlayModel(e,t){var i,r;return(i=(r=this.host.options).dropOverlayModel)===null||i===void 0?void 0:i.call(r,{location:e,group:t})}showPreviewOverlay(e,t){let i=e.model.contentDropTarget;return i.showOverlay(t),ee.from(()=>i.clearOverlay())}dispose(){}},gg=ut({name:"AdvancedDnD",serviceKey:"advancedDnDService",create:e=>new vg(e)}),mg=class{constructor(e){this._host=e}attachToGroup(e){return new V(e.model.onDidCreateTabGroup(t=>{this._host.fireDidCreateTabGroup(t)}),e.model.onDidDestroyTabGroup(t=>{this._host.fireDidDestroyTabGroup(t)}),e.model.onDidAddPanelToTabGroup(t=>{this._host.fireDidAddPanelToTabGroup(t)}),e.model.onDidRemovePanelFromTabGroup(t=>{this._host.fireDidRemovePanelFromTabGroup(t)}),e.model.onDidTabGroupChange(t=>{this._host.fireDidTabGroupChange(t)}),e.model.onDidTabGroupCollapsedChange(t=>{this._host.fireDidTabGroupCollapsedChange(t)}))}dispose(){}},fg=ut({name:"TabGroupChips",serviceKey:"tabGroupChipsService",create:e=>new mg(e),init:(e,t)=>{let i=new Map;return new V(e.onDidAddGroup(r=>{i.set(r,t.attachToGroup(r))}),e.onDidRemoveGroup(r=>{var o;(o=i.get(r))===null||o===void 0||o.dispose(),i.delete(r)}),{dispose:()=>{for(let r of i.values())r.dispose();i.clear()}})}});function od(e,t){var i,r;if(!((i=t.api)===null||i===void 0||(r=i.isPeeking)===null||r===void 0)&&r.call(i))return"calc(var(--dv-overlay-z-index, 999) + 100)";if(!(e instanceof HTMLElement))return;let o=Sd(e);return o?.style.zIndex?`calc(${o.style.zIndex} * 2)`:void 0}var _g=0,bg=()=>`dv-ctx-menu-item-${_g++}`;function sd(e){return typeof e=="object"}function Ze(e,t,i,r){let o=document.createElement("div");return o.className="dv-context-menu-item",o.setAttribute("role","menuitem"),r&&(o.classList.add("dv-context-menu-item--disabled"),o.setAttribute("aria-disabled","true")),o.textContent=e,r||o.addEventListener("click",()=>{i(),t()}),o}function nd(){let e=document.createElement("div");return e.className="dv-context-menu-separator",e.setAttribute("role","separator"),e}function wg(){if(globalThis.window===void 0||!globalThis.matchMedia)return!1;let e=globalThis.matchMedia("(pointer: coarse)").matches,t=globalThis.matchMedia("(pointer: fine)").matches;return e&&!t}function Sg(e){let t=document.createElement("div");t.className="dv-context-menu-rename";let i=document.createElement("input");return i.className="dv-context-menu-rename-input",i.type="text",i.placeholder="Name This Group",i.value=e.label,i.addEventListener("input",()=>{e.setLabel(i.value)}),i.addEventListener("keydown",r=>{r.key!=="Escape"&&r.key!=="Enter"&&r.stopPropagation()}),i.addEventListener("click",r=>{r.stopPropagation()}),t.appendChild(i),wg()||requestAnimationFrame(()=>{i.focus(),i.select()}),t}function yg(e,t){let i=document.createElement("div");if(i.className="dv-context-menu-color-picker",!t.enabled)return i;for(let r of t.entries()){let o=document.createElement("div");o.className="dv-context-menu-color-swatch",o.style.setProperty("--dv-tab-group-color",r.value),r.label&&(o.title=r.label),e.color===r.id&&o.classList.add("dv-context-menu-color-swatch--selected"),o.addEventListener("click",()=>{e.setColor(r.id)}),i.appendChild(o)}return i}var xg=class{constructor(e){this.accessor=e}buildMaximizeItem(e,t){let i=e.api.isMaximized();return Ze(i?"Restore":"Maximize",t,i?()=>e.api.exitMaximized():()=>e.api.maximize(),!i&&e.api.location.type!=="grid")}buildCollapseItem(e,t){return Ze(e.collapsed?"Expand":"Collapse",t,()=>e.toggle())}_shouldInjectPin(){let e=this.accessor.options.pinnedTabs;return!!this.accessor.pinnedTabsService&&!!e?.enabled&&e.contextMenuItem!==!1}_resolveTabItems(e,t,i){var r,o,s;let n=(r=(o=(s=this.accessor.options).getTabContextMenuItems)===null||o===void 0?void 0:o.call(s,{panel:e,group:t,api:this.accessor.api,event:i}))!==null&&r!==void 0?r:[];return this._shouldInjectPin()?["pin",...n]:n}appendComponentItem(e,t,i,r,o,s){var n,a;let l=(n=(a=this.accessor.options).createContextMenuItemComponent)===null||n===void 0?void 0:n.call(a,{id:bg(),component:t.component});l&&(s.addDisposables(l),l.init(j(j({},i),{},{group:r,api:this.accessor.api,close:o,componentProps:t.componentProps})),e.appendChild(l.element))}buildBuiltInTabItem(e,t,i,r){switch(e){case"separator":return nd();case"close":return Ze("Close",r,()=>t.api.close());case"closeOthers":return Ze("Close Others",r,()=>{i.panels.filter(o=>o!==t).forEach(o=>o.api.close())});case"closeAll":return Ze("Close All",r,()=>{[...i.panels].forEach(o=>o.api.close())});case"closeLeft":{let o=i.panels.indexOf(t);return Ze("Close to the Left",r,()=>{i.panels.filter((s,n)=>n<o).forEach(s=>s.api.close())},o<=0)}case"closeRight":{let o=i.panels.indexOf(t);return Ze("Close to the Right",r,()=>{i.panels.filter((s,n)=>n>o).forEach(s=>s.api.close())},o===-1||o>=i.panels.length-1)}case"maximize":return this.buildMaximizeItem(t,r);case"float":return Ze("Float",r,()=>this.accessor.api.addFloatingGroup(t),t.api.location.type==="floating");case"popout":return Ze("Open in New Window",r,()=>{this.accessor.api.addPopoutGroup(t)},t.api.location.type==="popout");case"pin":return Ze(t.api.isPinned?"Unpin tab":"Pin tab",r,()=>t.api.setPinned(!t.api.isPinned));default:return}}appendConfigItem(e,t,i,r,o,s){t.element?e.appendChild(t.element):t.component?this.appendComponentItem(e,t,i,r,o,s):t.label&&e.appendChild(Ze(t.label,o,()=>{var n;return(n=t.action)===null||n===void 0?void 0:n.call(t)},t.disabled))}show(e,t,i){let r=this._resolveTabItems(e,t,i);if(r.length===0)return;i.preventDefault();let o=this.accessor.getPopupServiceForGroup(t),s=()=>o.close(),n=new V,a=document.createElement("div");a.className="dv-context-menu",a.setAttribute("role","menu");try{for(let l of r){if(sd(l)){this.appendConfigItem(a,l,{panel:e},t,s,n);continue}let d=this.buildBuiltInTabItem(l,e,t,s);d&&a.appendChild(d)}}catch(l){throw n.dispose(),l}o.openPopover(a,{x:i.clientX,y:i.clientY,zIndex:od(i.target,t)},{onClose:()=>n.dispose()})}showForChip(e,t,i){if(!this.accessor.options.getTabGroupChipContextMenuItems)return;let r=this.accessor.options.getTabGroupChipContextMenuItems({tabGroup:e,group:t,api:this.accessor.api,event:i});if(r.length===0)return;i.preventDefault();let o=this.accessor.getPopupServiceForGroup(t),s=()=>o.close(),n=new V,a=document.createElement("div");a.className="dv-context-menu",a.setAttribute("role","menu");try{for(let l of r)l==="separator"?a.appendChild(nd()):l==="rename"?a.appendChild(Sg(e)):l==="colorPicker"?a.appendChild(yg(e,this.accessor.tabGroupColorPalette)):l==="collapse"?a.appendChild(this.buildCollapseItem(e,s)):l==="close"?a.appendChild(Ze("Close All",s,()=>{t.panels.filter(d=>e.containsPanel(d.id)).forEach(d=>d.api.close())})):sd(l)&&this.appendConfigItem(a,l,{tabGroup:e},t,s,n)}catch(l){throw n.dispose(),l}o.openPopover(a,{x:i.clientX,y:i.clientY,zIndex:od(i.target,t)},{onClose:()=>n.dispose()})}},Cg=ut({name:"ContextMenu",serviceKey:"contextMenuService",create:e=>new xg(e)}),kg=[qv,Kv,Xv,Jv,ng,lg,cg,gg,fg,Cg],Dg=class{constructor(){this.cache=new WeakMap,this.currentFrameId=0,this.rafId=null}getPosition(e){let t=this.cache.get(e);if(t?.frameId===this.currentFrameId)return t.rect;this.scheduleFrameUpdate();let i=jo(e);return this.cache.set(e,{rect:i,frameId:this.currentFrameId}),i}invalidate(){this.currentFrameId++}scheduleFrameUpdate(){this.rafId||(this.rafId=requestAnimationFrame(()=>{this.currentFrameId++,this.rafId=null}))}},ad=-1;function qo(e){let t=e.group.api;return t.location.type==="edge"&&t.isCollapsed()}function Eg(){let e=document.createElement("div");return e.tabIndex=-1,e}function ii(e,t,i){let r=`${i}px`;e[t]!==r&&(e[t]=r)}var Kt=new WeakMap,dd=class extends V{constructor(e,t){super(),this.element=e,this.accessor=t,this.map={},this._disposed=!1,this._generation=0,this.positionCache=new Dg,this.addDisposables(ee.from(()=>{for(let i of Object.values(this.map))Kt.get(i.panel)===this&&Kt.delete(i.panel),i.disposable.dispose(),i.destroy.dispose(),this.cancelPendingUpdate(i);this._disposed=!0}))}updateAllPositions(){if(!this._disposed){this.positionCache.invalidate();for(let e of Object.values(this.map))e.panel.api.isVisible&&e.resize&&e.resize()}}repositionPanelOverlay(e,t=!1,i){var r;if(this._disposed)return;let o=this.map[e];o&&(o.forceVisible=t,o.clip=i,this.positionCache.invalidate(),(r=o.resize)===null||r===void 0||r.call(o))}cancelPendingUpdate(e){e.pendingUpdate!==void 0&&(cancelAnimationFrame(e.pendingUpdate),e.pendingUpdate=void 0)}detatch(e){if(this.map[e.api.id]){let t=this.map[e.api.id];return t.disposable.dispose(),t.destroy.dispose(),this.cancelPendingUpdate(t),delete this.map[e.api.id],Kt.get(t.panel)===this&&Kt.delete(t.panel),!0}return!1}attach(e){var t,i,r;let{panel:o,referenceContainer:s}=e,n=Kt.get(o);if(n&&n!==this&&n.detatch(o),this._disposed?Kt.delete(o):Kt.set(o,this),!this.map[o.api.id]){let f=Eg();f.className="dv-render-overlay",f.style.visibility="hidden",this.map[o.api.id]={panel:o,disposable:ee.NONE,destroy:ee.NONE,element:f,retainPreviousGeometry:!1,positioned:!1,generation:++this._generation}}let a=this.map[o.api.id];if(a.referenceContainer!==s){a.generation=++this._generation,this.cancelPendingUpdate(a),a.referenceContainer=s;let f=qo(o);a.retainPreviousGeometry=a.positioned&&!f,f&&!a.forceVisible&&(a.element.style.visibility="hidden",a.element.style.pointerEvents="none")}let l=a.generation,d=a.element,h=o.view.content.element,c=f=>{if(!f||f.width<=0||f.height<=0)return;let S=this.map[o.api.id];!S||S.forceVisible||S.positioned&&o.api.isVisible||(ii(d.style,"width",f.width),ii(d.style,"height",f.height))};c(s.dimensions),h.parentElement!==d&&d.appendChild(h),d.parentElement!==this.element&&this.element.appendChild(d);let u=()=>{let f=o.api.id,S=this.map[f];if(S?.generation!==l||S.pendingUpdate!==void 0)return;S.pendingUpdate=ad;let w=requestAnimationFrame(()=>{var D;let T=this.map[f];if(T&&(T.pendingUpdate=void 0),this.isDisposed||T?.generation!==l)return;let R=(D=T.forceVisible)!==null&&D!==void 0?D:!1,x=T.clip,C=qo(o),L=!R&&(!o.api.isVisible||C),M=this.positionCache.getPosition(s.element),O=this.positionCache.getPosition(this.element),W=M.left-O.left,_=M.top-O.top,y=M.width,P=M.height;if(y===0||P===0){if(C&&!R){T.retainPreviousGeometry=!1,d.style.visibility="hidden",d.style.pointerEvents="none",d.style.clipPath="",d.style.zIndex="";return}if(T.retainPreviousGeometry){L&&(d.style.visibility="hidden",d.style.pointerEvents="none");return}}if(T.retainPreviousGeometry=!1,T.positioned=!0,ii(d.style,"left",W),ii(d.style,"top",_),ii(d.style,"width",y),ii(d.style,"height",P),L?(d.style.visibility="hidden",d.style.pointerEvents="none"):(d.style.visibility="",d.style.pointerEvents=""),R?d.style.zIndex="1000":o.api.location.type!=="floating"&&(d.style.zIndex=""),x){var k,G;let I=this.element.ownerDocument.defaultView,H=(k=I?.scrollX)!==null&&k!==void 0?k:0,U=(G=I?.scrollY)!==null&&G!==void 0?G:0,re=x.top+U,b=x.left+H,z=Math.max(0,re-M.top),K=Math.max(0,b-M.left),Y=Math.max(0,M.left+y-(x.right+H)),q=Math.max(0,M.top+P-(x.bottom+U));d.style.clipPath=`inset(${z}px ${Y}px ${q}px ${K}px)`}else d.style.clipPath="";B(d,"dv-render-overlay-float",o.group.api.location.type==="floating")});S.pendingUpdate===ad&&(S.pendingUpdate=w)},p=()=>{var f;let S=!(!((f=this.map[o.api.id])===null||f===void 0)&&f.forceVisible)&&qo(o);if(o.api.isVisible&&!S){var w;this.positionCache.invalidate(),u(),!((w=this.map[o.api.id])===null||w===void 0)&&w.retainPreviousGeometry&&(d.style.visibility=""),d.style.pointerEvents=""}else d.style.visibility="hidden",d.style.pointerEvents="none"},v=new Ee,g=()=>{o.api.location.type==="floating"?queueMicrotask(()=>{if(m.isDisposed)return;let f=this.accessor.getFloatingWindowForGroup(o.api.group);if(!f)return;let S=f.overlay.element,w=()=>{let T=Number(S.getAttribute("aria-level"));d.style.zIndex=`calc(var(--dv-overlay-z-index, 999) + ${T*2+1})`},D=new MutationObserver(()=>{w()});v.value=ee.from(()=>D.disconnect()),D.observe(S,{attributeFilter:["aria-level"],attributes:!0}),w()}):d.style.zIndex=""},m=new V(v,new Ad(d,{onDragEnd:f=>{s.dropTarget.dnd.onDragEnd(f)},onDragEnter:f=>{s.dropTarget.dnd.onDragEnter(f)},onDragLeave:f=>{s.dropTarget.dnd.onDragLeave(f)},onDrop:f=>{s.dropTarget.dnd.onDrop(f)},onDragOver:f=>{s.dropTarget.dnd.onDragOver(f)}}),o.api.onDidVisibilityChange(()=>{p()}),o.api.onDidDimensionsChange(()=>{o.api.isVisible&&u()}),(t=(i=(r=o.group.api).onDidCollapsedChange)===null||i===void 0?void 0:i.call(r,()=>{this.positionCache.invalidate(),u()}))!==null&&t!==void 0?t:ee.NONE,s.onDidDimensionsChange(f=>{c(f)}),o.api.onDidLocationChange(()=>{g()}));return this.map[o.api.id].destroy=ee.from(()=>{h.parentElement===d&&h.remove(),d.remove()}),g(),queueMicrotask(()=>{this.isDisposed||p()}),this.map[o.api.id].disposable.dispose(),this.map[o.api.id].disposable=m,this.map[o.api.id].resize=u,d}},Pg=class extends V{constructor(e){super(),this.accessor=e,this.init()}init(){let e=new Set,t=new Set;this.addDisposables(this.accessor.onDidAddPanel(i=>{if(e.has(i.api.id))throw new Error(`dockview: Invalid event sequence. [onDidAddPanel] called for panel ${i.api.id} but panel already exists`);e.add(i.api.id)}),this.accessor.onDidRemovePanel(i=>{if(e.has(i.api.id))e.delete(i.api.id);else throw new Error(`dockview: Invalid event sequence. [onDidRemovePanel] called for panel ${i.api.id} but panel does not exists`)}),this.accessor.onDidAddGroup(i=>{if(t.has(i.api.id))throw new Error(`dockview: Invalid event sequence. [onDidAddGroup] called for group ${i.api.id} but group already exists`);t.add(i.api.id)}),this.accessor.onDidRemoveGroup(i=>{if(t.has(i.api.id))t.delete(i.api.id);else throw new Error(`dockview: Invalid event sequence. [onDidRemoveGroup] called for group ${i.api.id} but group does not exists`)}))}};function Tg(e){if(!e.matchMedia)return!1;let t=e.matchMedia("(pointer: coarse)").matches,i=e.matchMedia("(pointer: fine)").matches;return t&&!i}function zg(e){var t,i,r,o,s,n,a;let l=(t=e.window)!==null&&t!==void 0?t:window,d=(i=e.capture)!==null&&i!==void 0?i:!1,h=(r=e.escape)!==null&&r!==void 0?r:!0,c=(o=e.keys)!==null&&o!==void 0?o:[],u=(s=e.outsidePointerDown)!==null&&s!==void 0?s:!0,p=(n=e.pointerDownGraceMs)!==null&&n!==void 0?n:0,v=(a=e.now)!==null&&a!==void 0?a:Date.now,g=v(),m=new V,f=S=>{var w,D;return e.isInside?e.isInside(S):Xo(S,(w=(D=e.elements)===null||D===void 0?void 0:D.call(e))!==null&&w!==void 0?w:[])};if((h||c.length>0)&&m.addDisposables($(l,"keydown",S=>{(h&&S.key==="Escape"||c.includes(S.key))&&e.onDismiss()},d)),(u||e.onInsidePointerDown)&&m.addDisposables($(l,"pointerdown",S=>{if(f(S)){var w;(w=e.onInsidePointerDown)===null||w===void 0||w.call(e,S);return}!u||v()-g<p||e.onDismiss()},d)),e.resize&&m.addDisposables($(l,"resize",()=>{Tg(l)||e.onDismiss()})),e.focusOut){let S=()=>{var x,C,L;return(x=(C=e.anchor)===null||C===void 0?void 0:C.call(e))!==null&&x!==void 0?x:(L=e.elements)===null||L===void 0?void 0:L.call(e)[0]},w=new WeakSet,D=x=>{var C,L;if(w.has(x))return;w.add(x);let M=x.target;M instanceof Element&&((e.isFocusInside?e.isFocusInside(vp(M,S())):Xo(x,(C=(L=e.elements)===null||L===void 0?void 0:L.call(e))!==null&&C!==void 0?C:[]))||e.onDismiss())},T=new Map,R=()=>{var x,C,L;let M=new Set,O=(x=e.anchor)===null||x===void 0?void 0:x.call(e),W=[...(C=(L=e.elements)===null||L===void 0?void 0:L.call(e))!==null&&C!==void 0?C:[],...O?[O]:[]];for(let _ of W)for(let y of pp(_))M.add(y);for(let[_,y]of T)M.has(_)||(y.dispose(),T.delete(_));for(let _ of M)T.has(_)||T.set(_,$(_,"focusin",D,d))};m.addDisposables($(l,"focusin",x=>{R(),D(x)},d),{dispose:()=>{for(let[,x]of T)x.dispose();T.clear()}}),R()}return m}var ld=class extends V{constructor(e,t=globalThis.window){super(),this._active=null,this._activeDisposable=new Ee,this._root=e,this._window=t,this._element=t.document.createElement("div"),this._element.className="dv-popover-anchor",this._element.style.position="relative",this._root.prepend(this._element),this.addDisposables(ee.from(()=>{this.close()}),this._activeDisposable)}updateRoot(e){e.prepend(this._element),this._root=e}openPopover(e,t,i){var r;this.close();let o=this._window.document.createElement("div");o.style.position="absolute",o.style.zIndex=(r=t.zIndex)!==null&&r!==void 0?r:"var(--dv-overlay-z-index)",o.appendChild(e);let s=this._element.getBoundingClientRect(),n=s.left,a=s.top;o.style.top=`${t.y-a}px`,o.style.left=`${t.x-n}px`,this._element.appendChild(o),this._active=o;let l=200;this._activeDisposable.value=new V(zg({window:this._window,onDismiss:()=>this.close(),elements:()=>this._active?[this._active]:[],keys:["Enter"],pointerDownGraceMs:l,resize:!0}),i?.onClose?ee.from(i.onClose):ee.NONE),this._window.requestAnimationFrame(()=>{wp(o,this._root)})}close(){this._active&&(this._active.remove(),this._activeDisposable.dispose(),this._active=null)}},Uo=class extends V{get renderedOutline(){return this._model?this._outline:void 0}get disabled(){return this._disabled}set disabled(e){this.disabled!==e&&(this._disabled=e,e&&this._clearNow())}_cancelPendingClear(){this._pendingClear!==void 0&&(clearTimeout(this._pendingClear),this._pendingClear=void 0)}_clearNow(){this._cancelPendingClear(),this._model&&this._model.root.remove(),this._model=void 0}get model(){if(!this.disabled)return{clear:()=>{this._clearNow()},scheduleClear:()=>{this._pendingClear!==void 0||!this._model||(this._pendingClear=setTimeout(()=>{this._pendingClear=void 0,this._clearNow()},0))},exists:()=>!!this._model,getElements:(e,t)=>{this._cancelPendingClear();let i=this._outline!==t;if(this._outline=t,this._model)return this._model.changed=i,this._model;let r=this.createContainer(),o=this.createAnchor();if(this._model={root:r,overlay:o,changed:i},r.appendChild(o),this.element.appendChild(r),e?.target instanceof HTMLElement){let s=e.target.getBoundingClientRect(),n=this.element.getBoundingClientRect();o.style.left=`${s.left-n.left}px`,o.style.top=`${s.top-n.top}px`}return this._model}}}constructor(e,t){super(),this.element=e,this._disabled=!1,this._disabled=t.disabled,this.addDisposables(ee.from(()=>{var i;(i=this.model)===null||i===void 0||i.clear()}))}createContainer(){let e=document.createElement("div");return e.className="dv-drop-target-container",e}createAnchor(){let e=document.createElement("div");return e.className="dv-drop-target-anchor",e.style.visibility="hidden",e}},Ko=["left","right","top","bottom"];function wr(e){return e==="left"||e==="right"}var Ag={marginShare:0,size:Number.POSITIVE_INFINITY},Ig=class{get _effectiveBaseCollapsed(){var e;return(e=this._measuredTabSize)!==null&&e!==void 0?e:this._baseCollapsedSize}get minimumSize(){return this._isCollapsed?this.collapsedSize:this._baseMinimumSize!==void 0?this._baseMinimumSize+this._axis.marginShare:this._effectiveBaseCollapsed+50+this._axis.marginShare}get maximumSize(){return this._isCollapsed?this.collapsedSize:this._expandedMaximumSize}get element(){return this._group.element}get isCollapsed(){return this._isCollapsed}get lastExpandedSize(){return this._lastExpandedSize}get lastExpandedContentSize(){return this._lastExpandedSize-this._axis.marginShare}get collapsedSize(){return this._effectiveBaseCollapsed+this._axis.marginShare}get configuredMinimumSize(){return this._baseMinimumSize}get configuredMaximumSize(){return this._expandedMaximumSize}get configuredCollapsedSize(){return this._baseCollapsedSize}constructor(e,t,i,r=Ag){var o,s,n;this._onDidChange=new E,this.onDidChange=this._onDidChange.event,this.snap=!1,this.priority="low",this._isCollapsed=!1,this._isVisible=!0,this._tabSizeDisposables=new V,this._group=t,this._orientation=i,t.element.classList.add("dv-edge-group"),t.element.dataset.testid=`dv-edge-group-${e.id}`,this._baseCollapsedSize=(o=e.collapsedSize)!==null&&o!==void 0?o:35,this._baseMinimumSize=e.minimumSize,this._axis=r,this._expandedMaximumSize=(s=e.maximumSize)!==null&&s!==void 0?s:Number.POSITIVE_INFINITY,this._lastExpandedSize=(n=e.initialSize)!==null&&n!==void 0?n:200,e.collapsed&&(this._isCollapsed=!0,t.element.classList.add("dv-edge-collapsed")),this._observeTabStrip()}_observeTabStrip(){let e=this._group.element.querySelector(".dv-tabs-and-actions-container");e&&this._tabSizeDisposables.addDisposables(Xt(e,()=>{let{headerPosition:t}=this._group;(t==="left"||t==="right")==(this._orientation==="horizontal")&&this._applyMeasuredTabSize(this._orientation==="vertical"?e.offsetHeight:e.offsetWidth)}))}_applyMeasuredTabSize(e){e<=0||e===this._measuredTabSize||(this._measuredTabSize=e,this._isCollapsed&&this._onDidChange.fire({size:this.collapsedSize}))}layout(e,t){!this._isCollapsed&&this._isVisible&&this._axis.size>0&&(this._lastExpandedSize=e+this._axis.marginShare),this._orientation==="horizontal"?this._group.layout(e,t):this._group.layout(t,e)}setCollapsed(e){this._isCollapsed!==e&&(this._isCollapsed=e,this._group.element.classList.toggle("dv-edge-collapsed",e))}setVisible(e){this._isVisible=e}restoreExpandedSize(e){this._lastExpandedSize=e}updateSizing(e,t){this._baseCollapsedSize=e,this._baseMinimumSize=t}dispose(){this._tabSizeDisposables.dispose(),this._onDidChange.dispose()}},Gg=class{get element(){return this._dockviewElement}constructor(e,t){this._dockviewElement=e,this._layoutDockview=t,this.priority="high",this.minimumSize=100,this.maximumSize=Number.POSITIVE_INFINITY,this._onDidChange=new E,this.onDidChange=this._onDidChange.event}layout(e,t){this._layoutDockview(t,e)}setVisible(e){}dispose(){this._onDidChange.dispose()}},Mg=class{get element(){return this._element}constructor(e,t=0){this._onDidChange=new E,this.onDidChange=this._onDidChange.event,this.minimumSize=100,this.maximumSize=Number.POSITIVE_INFINITY,this.priority="high",this._element=document.createElement("div"),this._element.className="dv-shell-middle-column",this._element.style.height="100%",this._element.style.width="100%",this._splitview=new xr(this._element,{orientation:"VERTICAL",proportionalLayout:!1,margin:t}),this._centerIndex=0,this._splitview.addView(e,{type:"distribute"},0)}addTopView(e,t){this._splitview.addView(e,t,0),this._topIndex=0,this._centerIndex+=1,this._bottomIndex!==void 0&&(this._bottomIndex+=1)}addBottomView(e,t){let i=this._splitview.length;this._splitview.addView(e,t,i),this._bottomIndex=i}removeView(e){let t=e==="top"?this._topIndex:this._bottomIndex;t!==void 0&&(this._splitview.removeView(t),e==="top"?(this._topIndex=void 0,this._centerIndex-=1,this._bottomIndex!==void 0&&(this._bottomIndex-=1)):this._bottomIndex=void 0)}layout(e,t){this._splitview.layout(t,e)}setVisible(e){}setViewVisible(e,t){let i=e==="top"?this._topIndex:this._bottomIndex;i!==void 0&&this._splitview.setViewVisible(i,t)}isViewVisible(e){let t=e==="top"?this._topIndex:this._bottomIndex;return t!==void 0?this._splitview.isViewVisible(t):!1}getViewSize(e){let t=e==="top"?this._topIndex:this._bottomIndex;return t!==void 0?this._splitview.getViewSize(t):0}getViewCachedVisibleSize(e){let t=e==="top"?this._topIndex:this._bottomIndex;if(t!==void 0)return this._splitview.getViewCachedVisibleSize(t)}resizeView(e,t){let i=e==="top"?this._topIndex:this._bottomIndex;i!==void 0&&this._splitview.resizeView(i,t)}get axis(){return this._splitview}updateMargin(e){this._splitview.margin=e}get disabled(){return this._splitview.disabled}set disabled(e){this._splitview.disabled=e}dispose(){this._onDidChange.dispose(),this._splitview.dispose()}},Og=class{constructor(e,t,i,r=0,o=35){this._disposables=new V,this._viewConfigs=new Map,this._pendingSizes=new Map,this._currentWidth=0,this._currentHeight=0,this._gap=r,this._defaultCollapsedSize=o,this._shellElement=document.createElement("div"),this._shellElement.className="dv-shell",this._shellElement.style.height="100%",this._shellElement.style.width="100%",this._shellElement.style.position="relative",e.appendChild(this._shellElement);let s=new Gg(t,i);this._middleColumn=new Mg(s,r),this._outerSplitview=new xr(this._shellElement,{orientation:"HORIZONTAL",proportionalLayout:!1,margin:r}),this._middleIndex=0,this._outerSplitview.addView(this._middleColumn,{type:"distribute"},0),this._disposables.addDisposables(Xt(this._shellElement,n=>{if(!this._shellElement.offsetParent||!Sr(this._shellElement))return;let a=Math.round(n.contentRect.width),l=Math.round(n.contentRect.height);a===this._currentWidth&&l===this._currentHeight||this.layout(a,l)}),this._outerSplitview,this._middleColumn,s)}get element(){return this._shellElement}get locked(){return this._outerSplitview.disabled}set locked(e){this._outerSplitview.disabled=e,this._middleColumn.disabled=e}addEdgeView(e,t,i){var r;if(this.hasEdgeGroup(e))throw new Error(`dockview: edge group already registered at position '${e}'`);this._viewConfigs.set(e,t);let o=new Ig(j(j({},t),{},{collapsedSize:(r=t.collapsedSize)!==null&&r!==void 0?r:this._defaultCollapsedSize}),i,wr(e)?"horizontal":"vertical",this._axisFor(e)),s=o.isCollapsed?o.collapsedSize:o.lastExpandedSize;switch(e){case"left":this._outerSplitview.addView(o,s,0),this._leftIndex=0,this._middleIndex+=1,this._rightIndex!==void 0&&(this._rightIndex+=1),this._leftView=o;break;case"right":{let n=this._outerSplitview.length;this._outerSplitview.addView(o,s,n),this._rightIndex=n,this._rightView=o}break;case"top":this._middleColumn.addTopView(o,s),this._topView=o;break;case"bottom":this._middleColumn.addBottomView(o,s),this._bottomView=o;break}return this._disposables.addDisposables(o),!o.isCollapsed&&!this._canResize(e)&&this._pendingSizes.set(e,s),this._relayout(),o}layoutFromElement(){if(!this._shellElement.offsetParent||!Sr(this._shellElement))return;let e=Math.round(this._shellElement.clientWidth),t=Math.round(this._shellElement.clientHeight);e===0||t===0||this.layout(e,t)}layout(e,t){this._currentWidth=e,this._currentHeight=t,this._outerSplitview.layout(e,t),this._flushPendingSizes()}updateTheme(e,t){this._gap=e,this._defaultCollapsedSize=t,this._outerSplitview.margin=e,this._middleColumn.updateMargin(e),this._applyThemeSizing(),this._relayout()}_hasSiblingOn(e){return wr(e)?this._leftView!==void 0&&this._rightView!==void 0:this._topView!==void 0&&this._bottomView!==void 0}_axisFor(e){return wr(e)?this._outerSplitview:this._middleColumn.axis}_applyThemeSizing(){for(let t of Ko){let i=this._getView(t),r=this._viewConfigs.get(t);if(i&&r){var e;i.updateSizing((e=r.collapsedSize)!==null&&e!==void 0?e:this._defaultCollapsedSize,r.minimumSize)}}}_relayout(){this._currentWidth>0&&this._currentHeight>0&&this.layout(this._currentWidth,this._currentHeight)}_slotSize(e){switch(e){case"left":return this._leftIndex===void 0?0:this._outerSplitview.getViewSize(this._leftIndex);case"right":return this._rightIndex===void 0?0:this._outerSplitview.getViewSize(this._rightIndex);case"top":case"bottom":return this._middleColumn.getViewSize(e)}}removeEdgeView(e){let t=this._getView(e);if(t){switch(e){case"left":this._outerSplitview.removeView(this._leftIndex),this._leftIndex=void 0,this._leftView=void 0,this._middleIndex-=1,this._rightIndex!==void 0&&(this._rightIndex-=1);break;case"right":this._outerSplitview.removeView(this._rightIndex),this._rightIndex=void 0,this._rightView=void 0;break;case"top":this._middleColumn.removeView("top"),this._topView=void 0;break;case"bottom":this._middleColumn.removeView("bottom"),this._bottomView=void 0;break}this._disposables.removeDisposable(t),t.dispose(),this._viewConfigs.delete(e),this._pendingSizes.delete(e),this._relayout()}}hasEdgeGroup(e){switch(e){case"top":return this._topView!==void 0;case"bottom":return this._bottomView!==void 0;case"left":return this._leftView!==void 0;case"right":return this._rightView!==void 0}}setEdgeGroupVisible(e,t){let i=this._getView(e)!==void 0&&t!==this.isEdgeGroupVisible(e);switch(e){case"left":this._leftIndex!==void 0&&this._outerSplitview.setViewVisible(this._leftIndex,t);break;case"right":this._rightIndex!==void 0&&this._outerSplitview.setViewVisible(this._rightIndex,t);break;case"top":case"bottom":this._middleColumn.setViewVisible(e,t);break}i&&this._gap>0&&this._hasSiblingOn(e)&&this._relayout(),t&&this._flushPendingSizes()}isEdgeGroupVisible(e){switch(e){case"left":return this._leftIndex!==void 0?this._outerSplitview.isViewVisible(this._leftIndex):!1;case"right":return this._rightIndex!==void 0?this._outerSplitview.isViewVisible(this._rightIndex):!1;case"top":case"bottom":return this._middleColumn.isViewVisible(e)}}setEdgeGroupCollapsed(e,t){let i=this._getView(e);i&&(i.setCollapsed(t),t?(this._pendingSizes.delete(e),this._resizeView(e,i.collapsedSize)):this.resizeEdgeGroup(e,i.lastExpandedSize))}resizeEdgeGroup(e,t){let i=this._getView(e);if(!i||!Number.isFinite(t))return;let r=Math.round(t);if(!(r<=0)){if(i.restoreExpandedSize(r),i.isCollapsed){this._pendingSizes.delete(e);return}this._canResize(e)?(this._pendingSizes.delete(e),this._resizeView(e,r)):this._pendingSizes.set(e,r)}}_canResize(e){return this.isEdgeGroupVisible(e)&&this._axisFor(e).size>0}_resizeView(e,t){switch(e){case"left":this._leftIndex!==void 0&&this._outerSplitview.resizeView(this._leftIndex,t);break;case"right":this._rightIndex!==void 0&&this._outerSplitview.resizeView(this._rightIndex,t);break;case"top":case"bottom":this._middleColumn.resizeView(e,t);break}}_flushPendingSizes(){if(this._pendingSizes.size!==0)for(let[e,t]of this._pendingSizes){let i=this._getView(e);!i||i.isCollapsed||!this._canResize(e)||(this._pendingSizes.delete(e),this._resizeView(e,t))}}isEdgeGroupCollapsed(e){var t,i;return(t=(i=this._getView(e))===null||i===void 0?void 0:i.isCollapsed)!==null&&t!==void 0?t:!1}getEdgeGroupExpandedSize(e){var t,i;return(t=(i=this._getView(e))===null||i===void 0?void 0:i.lastExpandedContentSize)!==null&&t!==void 0?t:0}_getView(e){switch(e){case"top":return this._topView;case"bottom":return this._bottomView;case"left":return this._leftView;case"right":return this._rightView}}toJSON(){let e={};for(let t of Ko){let i=this._getView(t);if(!i)continue;let r=this.isEdgeGroupVisible(t);e[t]={size:this._expandedSize(i,t,r),visible:r,collapsed:i.isCollapsed||void 0,minimumSize:i.configuredMinimumSize,maximumSize:Number.isFinite(i.configuredMaximumSize)?i.configuredMaximumSize:void 0,collapsedSize:i.configuredCollapsedSize}}return e}_expandedSize(e,t,i){if(e.isCollapsed)return e.lastExpandedSize;let r=this._pendingSizes.get(t);if(r!==void 0)return r;if(!i){var o;return(o=this._cachedVisibleSize(t))!==null&&o!==void 0?o:e.lastExpandedSize}return this._slotSize(t)}_cachedVisibleSize(e){switch(e){case"left":return this._leftIndex===void 0?void 0:this._outerSplitview.getViewCachedVisibleSize(this._leftIndex);case"right":return this._rightIndex===void 0?void 0:this._outerSplitview.getViewCachedVisibleSize(this._rightIndex);case"top":case"bottom":return this._middleColumn.getViewCachedVisibleSize(e)}}fromJSON(e){for(let i of Ko){var t;let r=e[i],o=this._getView(i);!r||!o||(o.restoreExpandedSize(r.size),o.setCollapsed((t=r.collapsed)!==null&&t!==void 0?t:!1),r.collapsed?(this._pendingSizes.delete(i),this._resizeView(i,o.collapsedSize)):this.resizeEdgeGroup(i,r.size),this.setEdgeGroupVisible(i,!!r.visible))}}dispose(){this._disposables.dispose(),this._shellElement.remove()}};function hd(e){e.error?console.error("dockview: failed to create popout.",e.error):e.reason==="blocked"?console.error("dockview: failed to create popout. perhaps you need to allow pop-ups for this website"):console.error(`dockview: failed to create popout (${e.reason}).`)}function Lg(e){var t;return new qd((t=e.tabGroupColors)!==null&&t!==void 0?t:ps,e.tabGroupAccent!=="off")}function fr(e){let t=e.from.activePanel;[...e.from.panels].map(i=>{let r=e.from.model.removePanel(i);return e.from.model.renderContainer.detatch(i),r}).forEach(i=>{e.to.model.openPanel(i,{skipSetActive:t!==i,skipSetGroupActive:!0})})}var os=()=>({dispose:()=>{}}),Rg=os,cd=100,Ng=class extends zp{fireDidCreateTabGroup(e){this._onDidCreateTabGroup.fire(e)}fireDidDestroyTabGroup(e){this._onDidDestroyTabGroup.fire(e)}fireDidAddPanelToTabGroup(e){this._onDidAddPanelToTabGroup.fire(e)}fireDidRemovePanelFromTabGroup(e){this._onDidRemovePanelFromTabGroup.fire(e)}fireDidTabGroupChange(e){this._onDidTabGroupChange.fire(e)}fireDidTabGroupCollapsedChange(e){this._onDidTabGroupCollapsedChange.fire(e)}get orientation(){return this.gridview.orientation}get totalPanels(){return this.panels.length}get panels(){return this.groups.flatMap(e=>e.panels)}get dndCapabilities(){return et(this.options)}get options(){return this._options}get tabGroupColorPalette(){return this._tabGroupColorPalette}get activePanel(){let e=this.activeGroup;if(e)return e.activePanel}get renderer(){var e;return(e=this.options.defaultRenderer)!==null&&e!==void 0?e:"onlyWhenVisible"}get defaultHeaderPosition(){var e;return(e=this.options.defaultHeaderPosition)!==null&&e!==void 0?e:"top"}get api(){return this._api}get floatingGroups(){var e,t;return(e=(t=this._moduleRegistry)===null||t===void 0||(t=t.services.floatingGroupService)===null||t===void 0?void 0:t.floatingGroups)!==null&&e!==void 0?e:[]}getFloatingWindowForGroup(e){var t;return(t=this._floatingGroupService)===null||t===void 0?void 0:t.findByGroup(e)}_gatherFloatingGroupBoxes(e){return this.getFloatingGroupSnapshots(e).map(t=>t.box)}getFloatingContainer(){var e;return(e=this._floatingOverlayHost)!==null&&e!==void 0?e:this.gridview.element}getFloatingGroupSnapshots(e){let t=this.getFloatingContainer().getBoundingClientRect();return this.floatingGroups.filter(i=>i.group!==e).map(i=>{let r=i.overlay.element.getBoundingClientRect();return{group:i.group,box:{left:r.left-t.left,top:r.top-t.top,width:r.width,height:r.height}}})}mergeFloatInto(e,t,i){e===t||!this.getPanel(t.id)||this.moveGroupOrPanel({from:{groupId:e.id},to:{group:t,position:i}})}getGridSplitterRects(){let e=this.getFloatingContainer().getBoundingClientRect(),t=[];return this.gridview.element.querySelectorAll(".dv-sash").forEach(i=>{let r=i.getBoundingClientRect();t.push({left:r.left-e.left,top:r.top-e.top,width:r.width,height:r.height})}),t}get _smartGuidesService(){return this._moduleRegistry.services.smartGuidesService}get smartGuidesEnabled(){var e,t;return(e=(t=this._smartGuidesService)===null||t===void 0?void 0:t.enabled)!==null&&e!==void 0?e:!1}setSmartGuidesEnabled(e){var t;(t=Ue(this._smartGuidesService,"SmartGuides","api.setSmartGuidesEnabled"))===null||t===void 0||t.setEnabled(e)}updateSmartGuidesOptions(e){var t;(t=Ue(this._smartGuidesService,"SmartGuides","api.updateSmartGuidesOptions"))===null||t===void 0||t.updateOptions(e)}get onDidSnapFloat(){var e,t;return(e=(t=this._smartGuidesService)===null||t===void 0?void 0:t.onDidSnapFloat)!==null&&e!==void 0?e:os}get onDidSnapTogether(){var e,t;return(e=(t=this._smartGuidesService)===null||t===void 0?void 0:t.onDidSnapTogether)!==null&&e!==void 0?e:os}_buildFloatingDragTransform(e,t){let i=this.options.transformFloatingGroupDrag,r=!t;if(!(!i&&!(r&&this._smartGuidesService)))return o=>{var s,n;let a=i?.({group:e,proposed:o.proposed,container:o.container,others:o.others,modifiers:o.modifiers}),l=a?j(j({},o.proposed),a):o.proposed,d=r?(s=this._smartGuidesService)===null||s===void 0?void 0:s.transformFloatingGroupDrag({group:e,proposed:l,container:o.container,others:o.others,modifiers:o.modifiers}):void 0;return(n=d??a)!==null&&n!==void 0?n:void 0}}get _floatingGroupService(){return this._moduleRegistry.services.floatingGroupService}get _popoutWindowService(){return this._moduleRegistry.services.popoutWindowService}get _watermarkService(){return this._moduleRegistry.services.watermarkService}get _edgeGroupService(){return this._moduleRegistry.services.edgeGroupService}get _rootDropTargetService(){return this._moduleRegistry.services.rootDropTargetService}get _advancedDnDService(){return this._moduleRegistry.services.advancedDnDService}get _dndCompassService(){return this._moduleRegistry.services.dndCompassService}canDropOnGroup(e,t,i){return e.model.canDisplayContentOverlay(i,t)}getDropOverlayElement(e){var t,i;let r=e.element.querySelector(".dv-content-container");if(r)return((t=this.options.theme)===null||t===void 0?void 0:t.dndPanelOverlay)==="group"&&(i=r.parentElement)!==null&&i!==void 0?i:r}getTabsListElement(e){return e.model.header.hidden?void 0:e.model.tabsListElement}relayoutGroup(e){e.relayout()}setForcedOverflow(e,t){e.model.header.setForcedOverflow(t)}getLayoutElement(){return this.gridview.element}getDropPositionResolver(){var e;if(this.options.dropPositionResolver)return this.options.dropPositionResolver;let t=(e=this._dndCompassService)===null||e===void 0?void 0:e.resolver,i=this._moduleRegistry.services.autoEdgeGroupService;return t&&i?{resolve:r=>{var o;return(o=i.resolveEdge(r))!==null&&o!==void 0?o:t.resolve(r)}}:t??i?.resolver}wireEdgeDropTarget(e){return[e.onWillShowOverlay(t=>{this.gridview.length>0&&t.position==="center"||this._onWillShowOverlay.fire(new Oi(t,{kind:"edge",panel:void 0,api:this._api,group:void 0,getData:he}))}),e.onDrop(t=>this.dockToLayoutEdge(t.nativeEvent,t.position,t.edgeGroup))]}createEdgeDropTarget(e,t){let i={acceptedTargetZones:[t],canDisplayOverlay:()=>{var s;return((s=he())===null||s===void 0?void 0:s.viewId)===this.id},getPositionResolver:()=>({resolve:()=>({position:t,edge:!0,edgeGroup:!0})})},r=[Lt.createDropTarget(e,i),ct.createDropTarget(e,i)],o=new V(...r);for(let s of r)o.addDisposables(...this.wireEdgeDropTarget(s));return o}dockToLayoutEdge(e,t,i=!1){let r=new Xd({nativeEvent:e,position:t,panel:void 0,api:this._api,group:void 0,getData:he,kind:"edge",edgeGroup:i});if(this._onWillDrop.fire(r),r.defaultPrevented)return;let o=he();if(o){var s;this.moveGroupOrPanel({from:{groupId:o.groupId,panelId:(s=o.panelId)!==null&&s!==void 0?s:void 0},to:{group:this.orthogonalize(t),position:"center"}})}else this._onDidDrop.fire(new ms({nativeEvent:e,position:t,panel:void 0,api:this._api,group:void 0,getData:he}))}get headerActionsService(){return this._moduleRegistry.services.headerActionsService}get _layoutHistoryService(){return this._moduleRegistry.services.layoutHistoryService}undo(){var e;(e=Ue(this._layoutHistoryService,"LayoutHistory","api.undo"))===null||e===void 0||e.undo()}redo(){var e;(e=Ue(this._layoutHistoryService,"LayoutHistory","api.redo"))===null||e===void 0||e.redo()}get canUndo(){var e,t;return(e=(t=this._layoutHistoryService)===null||t===void 0?void 0:t.canUndo)!==null&&e!==void 0?e:!1}get canRedo(){var e,t;return(e=(t=this._layoutHistoryService)===null||t===void 0?void 0:t.canRedo)!==null&&e!==void 0?e:!1}clearHistory(){var e;(e=this._layoutHistoryService)===null||e===void 0||e.clear()}get onDidChangeHistory(){var e,t;return(e=(t=this._layoutHistoryService)===null||t===void 0?void 0:t.onDidChangeHistory)!==null&&e!==void 0?e:Rg}get hasEdgeDragReveal(){return!!this._moduleRegistry.services.autoEdgeGroupService}isGridEmpty(){return this.gridview.length===0}rootDropTargetOverrideTarget(){var e;return(e=this.rootDropTargetContainer)===null||e===void 0?void 0:e.model}dispatchUnhandledDragOver(e,t){let i=new Vd(e,"edge",t,he);return this._onUnhandledDragOver.fire(i),i.isAccepted}fireWillDragPanel(e){this._onWillDragPanel.fire(e)}fireWillDragGroup(e){this._onWillDragGroup.fire(e)}fireWillDrop(e){this._onWillDrop.fire(e)}fireWillShowOverlay(e){this._onWillShowOverlay.fire(e)}buildGroupDragGhost(e){var t;return(t=this._advancedDnDService)===null||t===void 0?void 0:t.buildGroupDragGhost(e)}resolveDropOverlayModel(e,t){var i;return(i=this._advancedDnDService)===null||i===void 0?void 0:i.resolveOverlayModel(e,t)}get rootElement(){var e,t;return(e=(t=this._shellManager)===null||t===void 0?void 0:t.element)!==null&&e!==void 0?e:this.element}ownsElement(e){if(this.rootElement.contains(e))return!0;let t=this.rootElement.ownerDocument,i=e.ownerDocument;return!i||i===t?!1:this.getPopoutWindows().some(r=>r.document===i)}adjacentGroup(e,t){let i=this.getGridviewForGroup(e);if(!i.element.contains(e.element))return;let r=_e(e.element),o=(t?i.previous(r):i.next(r)).view;if(!(i!==this.gridview&&o===e))return o}adjacentGroupInDirection(e,t){if(e.api.location.type!=="grid")return;let i=e.element.getBoundingClientRect(),r=i.left+i.width/2,o=i.top+i.height/2,s,n=Number.POSITIVE_INFINITY;for(let a of this.groups){if(a===e||a.api.location.type!=="grid")continue;let l=a.element.getBoundingClientRect(),d=l.left+l.width/2-r,h=l.top+l.height/2-o,c;switch(t){case"left":c=d<0&&Math.abs(d)>=Math.abs(h);break;case"right":c=d>0&&Math.abs(d)>=Math.abs(h);break;case"up":c=h<0&&Math.abs(h)>=Math.abs(d);break;default:c=h>0&&Math.abs(h)>=Math.abs(d);break}if(!c)continue;let u=d*d+h*h;u<n&&(n=u,s=a)}return s}showDropPreview(e,t){var i,r;return(i=(r=this._advancedDnDService)===null||r===void 0?void 0:r.showPreviewOverlay(e,t))!==null&&i!==void 0?i:ee.NONE}announce(e){var t;(t=this._moduleRegistry.services.liveRegionService)===null||t===void 0||t.announce(e)}dockPanel(e,t,i){this.moveGroupOrPanel({from:{groupId:e.group.id,panelId:e.id},to:{group:t,position:i}})}floatPanel(e){this.addFloatingGroup(e)}get contextMenuService(){return this._moduleRegistry.services.contextMenuService}get pinnedTabsService(){return this._moduleRegistry.services.pinnedTabsService}get advancedOverflowService(){return this._moduleRegistry.services.advancedOverflowService}setPanelPinned(e,t){var i;e.isPinned!==t&&!((i=this.options.pinnedTabs)===null||i===void 0)&&i.enabled&&this.pinnedTabsService&&(e.setPinned(t),this._onDidPanelPinnedChange.fire({panel:e,isPinned:t}))}get mountElement(){return this.gridview.element}hasVisibleGridGroup(){return this.groups.some(e=>e.api.location.type==="grid"&&e.api.isVisible)}isLastGridGroup(e){return e.api.location.type!=="grid"?!1:!this.groups.some(t=>t!==e&&t.api.location.type==="grid")}fireLayoutChange(e){this._bufferOnDidLayoutChange.fire(e)}get popoutRestorationPromise(){var e,t;return(e=(t=this._popoutWindowService)===null||t===void 0?void 0:t.restorationPromise)!==null&&e!==void 0?e:Promise.resolve()}constructor(e,t){var i,r,o,s,n,a;super(e,{proportionalLayout:(i=t.proportionalLayout)!==null&&i!==void 0?i:!0,orientation:"HORIZONTAL",styles:t.hideBorders?{separatorBorder:"transparent"}:void 0,disableAutoResizing:t.disableAutoResizing,locked:t.locked,margin:(r=(o=t.theme)===null||o===void 0?void 0:o.gap)!==null&&r!==void 0?r:0,className:t.className}),this.nextGroupId=ns(),this._deserializer=new Gv(this),this._moduleRegistry=new Nv,this._onWillDragPanel=new E,this.onWillDragPanel=this._onWillDragPanel.event,this._onWillDragGroup=new E,this.onWillDragGroup=this._onWillDragGroup.event,this._onDidDrop=new E,this.onDidDrop=this._onDidDrop.event,this._onWillDrop=new E,this.onWillDrop=this._onWillDrop.event,this._mutationDepth=0,this._syncMutationDepth=0,this._pendingLocationChanges=new Map,this._openingPopoutWindows=new Set,this._origin="user",this._originDepth=0,this._onWillMutateLayout=new E,this.onWillMutateLayout=this._onWillMutateLayout.event,this._onDidMutateLayout=new E,this.onDidMutateLayout=this._onDidMutateLayout.event,this._onWillShowOverlay=new E,this.onWillShowOverlay=this._onWillShowOverlay.event,this._onUnhandledDragOver=new E,this.onUnhandledDragOver=this._onUnhandledDragOver.event,this._onDidRemovePanel=new E,this.onDidRemovePanel=this._onDidRemovePanel.event,this._onDidAddPanel=new E,this.onDidAddPanel=this._onDidAddPanel.event,this._onDidPopoutGroupSizeChange=new E,this.onDidPopoutGroupSizeChange=this._onDidPopoutGroupSizeChange.event,this._onDidPopoutGroupPositionChange=new E,this.onDidPopoutGroupPositionChange=this._onDidPopoutGroupPositionChange.event,this._onDidAddPopoutGroup=new E,this.onDidAddPopoutGroup=this._onDidAddPopoutGroup.event,this._onDidRemovePopoutGroup=new E,this.onDidRemovePopoutGroup=this._onDidRemovePopoutGroup.event,this._onDidChangePopouts=new E,this.onDidChangePopouts=this._onDidChangePopouts.event,this._onDidOpenPopoutWindowFail=new E,this.onDidOpenPopoutWindowFail=this._onDidOpenPopoutWindowFail.event,this._onWillClosePopoutWindow=new E,this.onWillClosePopoutWindow=this._onWillClosePopoutWindow.event,this._onDidStartFloatingGroupDrag=new E,this.onDidStartFloatingGroupDrag=this._onDidStartFloatingGroupDrag.event,this._onDidEndFloatingGroupDrag=new E,this.onDidEndFloatingGroupDrag=this._onDidEndFloatingGroupDrag.event,this._onDidLayoutFromJSON=new E,this.onDidLayoutFromJSON=this._onDidLayoutFromJSON.event,this._onDidActivePanelChange=new E({replay:!0}),this.onDidActivePanelChange=this._onDidActivePanelChange.event,this._onDidPanelPinnedChange=new E,this.onDidPanelPinnedChange=this._onDidPanelPinnedChange.event,this._onDidMovePanel=new E,this.onDidMovePanel=this._onDidMovePanel.event,this._onDidCreateTabGroup=new E,this.onDidCreateTabGroup=this._onDidCreateTabGroup.event,this._onDidDestroyTabGroup=new E,this.onDidDestroyTabGroup=this._onDidDestroyTabGroup.event,this._onDidAddPanelToTabGroup=new E,this.onDidAddPanelToTabGroup=this._onDidAddPanelToTabGroup.event,this._onDidRemovePanelFromTabGroup=new E,this.onDidRemovePanelFromTabGroup=this._onDidRemovePanelFromTabGroup.event,this._onDidTabGroupChange=new E,this.onDidTabGroupChange=this._onDidTabGroupChange.event,this._onDidTabGroupCollapsedChange=new E,this.onDidTabGroupCollapsedChange=this._onDidTabGroupCollapsedChange.event,this._onDidMaximizedGroupChange=new E,this.onDidMaximizedGroupChange=this._onDidMaximizedGroupChange.event,this._inShellLayout=!1,this._onDidRemoveGroup=new E,this.onDidRemoveGroup=this._onDidRemoveGroup.event,this._onDidEdgeGroupAutoHideChange=new E,this.onDidEdgeGroupAutoHideChange=this._onDidEdgeGroupAutoHideChange.event,this._onDidAddGroup=new E,this.onDidAddGroup=this._onDidAddGroup.event,this._onDidOptionsChange=new E,this.onDidOptionsChange=this._onDidOptionsChange.event,this._onDidActiveGroupChange=new E,this.onDidActiveGroupChange=this._onDidActiveGroupChange.event,this._peekingGroups=new Set,this._moving=!1,this._options=t,this._tabGroupColorPalette=Lg(t);let l=t.modules,d=l??[...kg,...Wv()];for(let u of d)this._moduleRegistry.register(u);this._moduleRegistry.initialize(this),this.reportMissingOptionModules(t);let h=this._popoutWindowService;h&&this.addDisposables(h.onDidRemove(u=>{this._onDidRemovePopoutGroup.fire({id:u.popoutGroup.id,group:u.popoutGroup,window:u.getWindow()})})),this.popupService=new ld(this.element),this.addDisposables(this.popupService,ee.from(()=>{for(let u of this._openingPopoutWindows)u.dispose();this._openingPopoutWindows.clear()})),this._api=new ds(this),this.disableResizing=!0,this.element.remove(),this._shellManager=new Og(e,this.element,(u,p)=>this._layoutFromShell(u,p),(s=(n=t.theme)===null||n===void 0?void 0:n.gap)!==null&&s!==void 0?s:0,(a=t.theme)===null||a===void 0?void 0:a.edgeGroupCollapsedSize),this._shellManager.locked=!!t.locked,this.popupService.updateRoot(this._shellManager.element),this._shellThemeClassnames=new bd(this._shellManager.element),this.rootDropTargetContainer=new Uo(this._shellManager.element,{disabled:!0}),this.floatingDropTargetContainer=new Uo(this._shellManager.element,{disabled:!1}),this.overlayRenderContainer=new dd(this._shellManager.element,this),this._floatingOverlayHost=document.createElement("div"),this._floatingOverlayHost.className="dv-floating-overlay-host",this._shellManager.element.appendChild(this._floatingOverlayHost),B(this.gridview.element,"dv-dockview",!0),B(this.element,"dv-debug",!!t.debug),this.updateTheme(),t.debug&&this.addDisposables(new Pg(this)),this.addDisposables(ee.from(()=>this._pendingLocationChanges.clear()),this.rootDropTargetContainer,this.floatingDropTargetContainer,$(this._shellManager.element,"dragend",()=>{var u,p;(u=this.rootDropTargetContainer.model)===null||u===void 0||u.clear(),(p=this.floatingDropTargetContainer.model)===null||p===void 0||p.clear()},!0),this.overlayRenderContainer,this._onWillDragPanel,this._onWillDragGroup,this._onWillShowOverlay,this._onDidActivePanelChange,this._onDidPanelPinnedChange,this._onDidAddPanel,this._onDidRemovePanel,this._onDidLayoutFromJSON,this._onDidDrop,this._onWillDrop,this._onWillMutateLayout,this._onDidMutateLayout,this._onDidMovePanel,this._onDidMovePanel.event(()=>{this.debouncedUpdateAllPositions()}),this._onDidAddGroup,this._onDidRemoveGroup,this._onDidEdgeGroupAutoHideChange,this._onDidActiveGroupChange,this._onUnhandledDragOver,this._onDidMaximizedGroupChange,this._onDidPopoutGroupSizeChange,this._onDidPopoutGroupPositionChange,this._onDidAddPopoutGroup,this._onDidRemovePopoutGroup,this._onDidChangePopouts,this._onDidAddPopoutGroup.event(()=>this._onDidChangePopouts.fire()),this._onDidRemovePopoutGroup.event(()=>this._onDidChangePopouts.fire()),this._onDidOpenPopoutWindowFail,this._onDidStartFloatingGroupDrag,this._onDidEndFloatingGroupDrag,this._onDidCreateTabGroup,this._onDidDestroyTabGroup,this._onDidAddPanelToTabGroup,this._onDidRemovePanelFromTabGroup,this._onDidTabGroupChange,this._onDidTabGroupCollapsedChange,Ke.any(this.onDidPopoutGroupSizeChange,this.onDidPopoutGroupPositionChange)(()=>{this.fireLayoutChange("geometry")}),Ke.any(this.onDidCreateTabGroup,this.onDidDestroyTabGroup,this.onDidAddPanelToTabGroup,this.onDidRemovePanelFromTabGroup,this.onDidTabGroupChange,this.onDidTabGroupCollapsedChange)(()=>{this.fireLayoutChange("structure")}),this._onDidOptionsChange,this.onDidAdd(u=>{this._moving||this._onDidAddGroup.fire(u)}),this.onDidRemove(u=>{this._moving||this._onDidRemoveGroup.fire(u)}),this.onDidActiveChange(u=>{this._moving||this._onDidActiveGroupChange.fire(u)}),this.onDidMaximizedChange(u=>{this._onDidMaximizedGroupChange.fire({group:u.panel,isMaximized:u.isMaximized})}),Ke.any(this.onDidAddPanel,this.onDidRemovePanel,this.onDidAddGroup,this.onDidRemove,this.onDidRemoveGroup,this.onDidMovePanel)(()=>{this._bufferOnDidLayoutChange.fire("structure")}),this.onDidActivePanelChange(()=>{this._bufferOnDidLayoutChange.fire("activePanel")}),ee.from(()=>{var u;this._moduleRegistry.dispose(),(u=this._shellManager)===null||u===void 0||u.dispose()}),this._onWillClosePopoutWindow);let c=this._rootDropTargetService;c&&this.addDisposables(...this.wireEdgeDropTarget(c)),this._moduleRegistry.postConstruct(this),this._shellManager.layoutFromElement()}setVisible(e,t){switch(e.api.location.type){case"grid":super.setVisible(e,t);break;case"floating":{let i=this.floatingGroups.find(r=>r.group===e);i&&(i.overlay.setVisible(t),e.api._onDidVisibilityChange.fire({isVisible:t}));break}case"popout":console.warn("dockview: You cannot hide a group that is in a popout window");break;case"edge":break}}getPopupServiceForGroup(e){var t,i;return(t=(i=this._popoutWindowService)===null||i===void 0||(i=i.findByGroup(e))===null||i===void 0?void 0:i.popupService)!==null&&t!==void 0?t:this.popupService}addPopoutGroup(e,t){return this.mutationAsync("popout",()=>this._doAddPopoutGroup(e,t))}getPopouts(){var e,t;return(e=(t=this._popoutWindowService)===null||t===void 0?void 0:t.entries.map(i=>({id:i.popoutGroup.id,group:i.popoutGroup,window:i.getWindow()})))!==null&&e!==void 0?e:[]}getPopoutWindows(){return this.getPopouts().map(e=>e.window)}_doAddPopoutGroup(e,t){var i,r,o,s,n;let a=Ue(this._popoutWindowService,"PopoutWindow","api.addPopoutGroup");if(!a||e instanceof vr&&e.model.location.type==="edge")return Promise.resolve(!1);if(e instanceof ri&&e.group.size===1&&this.closeEmptyGroups)return this.addPopoutGroup(e.group,t);let l=fp(this.gridview.element),d=this.element;function h(){var S,w;if(t?.position)return t.position;let D=(e instanceof vr?e.element:(S=(w=e.group)===null||w===void 0?void 0:w.element)!==null&&S!==void 0?S:d).getBoundingClientRect();return{left:window.screenX+D.left,top:window.screenY+D.top,width:D.width,height:D.height}}let c=h(),u=(i=t==null||(r=t.overridePopoutGroup)===null||r===void 0?void 0:r.id)!==null&&i!==void 0?i:this.getNextGroupId(),p=(o=t?.popoutUrl)!==null&&o!==void 0?o:(s=this.options)===null||s===void 0?void 0:s.popoutUrl,v=p??"/popout.html",g=new Cp(`${this.id}-${u}`,l??"",{url:v,left:c.left,top:c.top,width:c.width,height:c.height,onDidOpen:t?.onDidOpen,onWillClose:S=>{var w;t==null||(w=t.onWillClose)===null||w===void 0||w.call(t,S),this._onWillClosePopoutWindow.fire(S)},nonce:(n=this.options)===null||n===void 0?void 0:n.nonce,styleRoot:()=>this.element.getRootNode()}),m=new V(g,g.onDidClose(()=>{m.dispose()}));this._openingPopoutWindows.add(m);let f=Cd(v);return(f?Promise.resolve(null):g.open()).then(S=>{var w,D;if(this._openingPopoutWindows.delete(m),this.isDisposed)return m.dispose(),!1;if(g.isDisposed){let Z=g.failure;return Z&&!this.isDisposed&&(hd(Z),this._onDidOpenPopoutWindowFail.fire(Z)),!1}let T=(w=t?.referenceGroup)!==null&&w!==void 0?w:e instanceof ri?e.group:e,R=e.api.location.type,x=T.element.parentElement!==null,C;if(t?.overridePopoutGridview){var L;C=(L=t.overridePopoutGroup)!==null&&L!==void 0?L:T}else x?t?.overridePopoutGroup?C=t.overridePopoutGroup:(C=this.createGroup({id:u}),S&&this._onDidAddGroup.fire(C)):C=T;if(S===null){var M;return this.handleBlockedPopout({group:C,referenceGroup:T,options:t,popoutWindowDisposable:m,failure:f?{reason:"url-refused",error:f}:(M=g.failure)!==null&&M!==void 0?M:{reason:"blocked"}}),!1}let O=document.createElement("div");O.className="dv-overlay-render-container";let W=new dd(O,this);C.model.renderContainer=W;let _=(D=t?.overridePopoutGridview)!==null&&D!==void 0?D:this.createNestedGridview();t?.overridePopoutGridview?_.locked=this.gridview.locked:_.addView(C,Le.Distribute,[0]),_.element.style.width="100%",_.element.style.height="100%",_.layout(g.window.innerWidth,g.window.innerHeight);let y=!1,P=()=>{y||(y=!0,_.dispose())},k,G=[];if(!t?.overridePopoutGroup&&!t?.overridePopoutGridview&&x)if(e instanceof ri){let Z=e.group;this.movingLock(()=>{let oe=T.model.removePanel(e);C.model.openPanel(oe)}),G=[{panel:e,from:Z}]}else switch(this.movingLock(()=>fr({from:T,to:C})),G=C.panels.map(Z=>({panel:Z,from:T})),R){case"grid":T.api.setVisible(!1);break;case"floating":case"popout":var I;k=(I=this.floatingGroups.find(Z=>Z.group.api.id===e.api.id))===null||I===void 0?void 0:I.overlay.toJSON(),this.removeGroup(T);break}S.classList.add("dv-dockview"),S.style.overflow="hidden",S.appendChild(O),S.appendChild(_.element);let H=document.createElement("div"),U=new Uo(H,{disabled:this.rootDropTargetContainer.disabled});S.appendChild(H),C.model.dropTargetContainer=U;let re=new ld(S,g.window);if(m.addDisposables(re),C.model.location={type:"popout",getWindow:()=>g.window,popoutUrl:p},t?.overridePopoutGridview){let Z=this.groups.filter(oe=>_.element.contains(oe.element));for(let oe of Z)oe.model.renderContainer=W,oe.model.dropTargetContainer=U,oe.model.location={type:"popout",getWindow:()=>g.window,popoutUrl:p}}x&&e.api.location.type==="grid"&&e.api.setVisible(!1),this.doSetGroupAndPanelActive(C);let b=a.observeGridviewSize(g,_,W);b&&m.addDisposables(b);let z=new Ee;m.addDisposables(z);let K=Z=>{z.value=new V(Z.api.onDidActiveChange(oe=>{if(oe.isActive){var pe;(pe=g.window)===null||pe===void 0||pe.focus()}}),Z.api.onWillFocus(()=>{var oe;(oe=g.window)===null||oe===void 0||oe.focus()}))};K(C);let Y={},q=x&&T&&this.getPanel(T.id),se={window:g,popoutGroup:C,gridview:_,overlayRenderContainer:W,dropTargetContainer:U,getWindow:()=>g.window,popoutUrl:p,referenceGroup:q?T.id:void 0,popupService:re,setAnchorGroup:Z=>{se.popoutGroup=Z,K(Z)},disposable:{dispose:()=>(m.dispose(),Y.returnedGroup)}},X=_p(g.window);m.addDisposables(X,bp(g.window,()=>{this._onDidPopoutGroupSizeChange.fire({width:g.window.innerWidth,height:g.window.innerHeight,group:se.popoutGroup})}),X.event(()=>{this._onDidPopoutGroupPositionChange.fire({screenX:g.window.screenX,screenY:g.window.screenY,group:se.popoutGroup})}),$(g.window,"resize",()=>{_.layout(g.window.innerWidth,g.window.innerHeight)}),W,ee.from(()=>this.disposePopoutWindow({group:C,referenceGroup:T,popoutGridview:_,isGroupAddedToDom:x,floatingBox:k,disposePopoutGridview:P,closeResult:Y}))),a.add(se),this._onDidAddPopoutGroup.fire({id:se.popoutGroup.id,group:se.popoutGroup,window:se.getWindow()});for(let{panel:Z,from:oe}of G)this.fireDidMovePanel(Z,oe);return!0}).catch(S=>(this._openingPopoutWindows.delete(m),console.error("dockview: failed to create popout.",S),!1))}handleBlockedPopout(e){let{group:t,referenceGroup:i,options:r,popoutWindowDisposable:o,failure:s}=e;if(hd(s),o.dispose(),this._onDidOpenPopoutWindowFail.fire(s),r?.overridePopoutGridview){let n=r.overridePopoutGridview,a=this.groups.filter(l=>n.element.contains(l.element));for(let l of a)this.movingLock(()=>{n.remove(l),this.redockGroupToMainGrid(l)});n.dispose(),i&&!i.api.isVisible&&i.api.setVisible(!0);return}t===i?this.gridview.element.contains(t.element)||(this.movingLock(()=>this.doAddGroup(t,[0])),t.model.location={type:"grid"}):(this.movingLock(()=>fr({from:t,to:i})),t.model.size===0&&this._groups.has(t.id)&&(t.dispose(),this._groups.delete(t.id),this._onDidRemoveGroup.fire(t))),i.api.isVisible||i.api.setVisible(!0)}redockGroupToMainGrid(e){e.model.renderContainer=this.overlayRenderContainer,e.model.dropTargetContainer=this.rootDropTargetContainer,e.model.location={type:"grid"},this.doAddGroup(e,[0])}disposePopoutWindow(e){var t;let{group:i,referenceGroup:r,popoutGridview:o,isGroupAddedToDom:s,floatingBox:n,disposePopoutGridview:a,closeResult:l}=e;if(this.isDisposed){a();return}let d=!!(!((t=this._popoutWindowService)===null||t===void 0)&&t.entries.find(v=>v.gridview===o)),h=this.groups.filter(v=>o.element.contains(v.element)),c=h.includes(i),u=c&&h.length===1;if(!d){c&&this.getPanel(i.id)&&(i.model.renderContainer=this.overlayRenderContainer,i.model.dropTargetContainer=this.rootDropTargetContainer,l.returnedGroup=i),a();return}let p=[];for(let v of h)if(v!==i){this.movingLock(()=>{this.doRemoveGroup(v,{skipDispose:!0,skipActive:!0,skipPopoutReturn:!0}),this.redockGroupToMainGrid(v)});for(let g of v.panels)p.push({panel:g,from:v})}if(c&&s&&this.getPanel(r.id)){let v=[...i.panels];this.movingLock(()=>fr({from:i,to:r}));for(let g of v)p.push({panel:g,from:i});r.api.isVisible||r.api.setVisible(!0),this.getPanel(i.id)&&this.doRemoveGroup(i,{skipPopoutAssociated:!0})}else if(c&&this.getPanel(i.id)){if(i.model.renderContainer=this.overlayRenderContainer,i.model.dropTargetContainer=this.rootDropTargetContainer,l.returnedGroup=i,n&&u)this.addFloatingGroup(i,{height:n.height,width:n.width,position:n});else{this.doRemoveGroup(i,{skipDispose:!0,skipActive:!0,skipPopoutReturn:!0}),i.model.location={type:"grid"},this.movingLock(()=>{this.doAddGroup(i,[0])});for(let v of i.panels)p.push({panel:v,from:i})}this.doSetGroupAndPanelActive(i)}a();for(let{panel:v,from:g}of p)this.fireDidMovePanel(v,g)}addFloatingGroup(e,t){this.mutation("float",()=>this._doAddFloatingGroup(e,t))}_doAddFloatingGroup(e,t){if(!Ue(this._floatingGroupService,"FloatingGroup","api.addFloatingGroup")||e instanceof vr&&e.model.location.type==="edge")return;let i,r=[];if(e instanceof ri){let l=e.group;i=this.createGroup(),this._onDidAddGroup.fire(i),this.movingLock(()=>this.removePanel(e,{removeEmptyGroup:!1,skipDispose:!0,skipSetActiveGroup:!0})),this.removeGroupIfEmpty(l),this.movingLock(()=>i.model.openPanel(e,{skipSetGroupActive:!0})),r=[{panel:e,from:l}]}else{var o;i=e;let l=(o=this._popoutWindowService)===null||o===void 0?void 0:o.findReferenceGroupId(i),d=l?this.getPanel(l):void 0;typeof t?.skipRemoveGroup=="boolean"&&t.skipRemoveGroup||(d?(this.movingLock(()=>fr({from:e,to:d})),this.doRemoveGroup(e,{skipPopoutReturn:!0,skipPopoutAssociated:!0}),this.doRemoveGroup(d,{skipDispose:!0}),i=d,r=i.panels.map(h=>({panel:h,from:e}))):(this.doRemoveGroup(e,{skipDispose:!0,skipPopoutReturn:!0,skipPopoutAssociated:!1}),r=i.panels.map(h=>({panel:h,from:i}))))}function s(){if(t?.position){let l={};return"left"in t.position?l.left=Math.max(t.position.left,0):"right"in t.position?l.right=Math.max(t.position.right,0):l.left=Ot.left,"top"in t.position?l.top=Math.max(t.position.top,0):"bottom"in t.position?l.bottom=Math.max(t.position.bottom,0):l.top=Ot.top,typeof t.width=="number"?l.width=Math.max(t.width,0):l.width=Ot.width,typeof t.height=="number"?l.height=Math.max(t.height,0):l.height=Ot.height,l}return{left:typeof t?.x=="number"?Math.max(t.x,0):Ot.left,top:typeof t?.y=="number"?Math.max(t.y,0):Ot.top,width:typeof t?.width=="number"?Math.max(t.width,0):Ot.width,height:typeof t?.height=="number"?Math.max(t.height,0):Ot.height}}let n=s(),a=this.createNestedGridview();a.addView(i,Le.Distribute,[0]),this.mountFloatingWindow(a,i,[i],n,{dragHandle:t?.dragHandle,inDragMode:t?.inDragMode,skipActiveGroup:t?.skipActiveGroup,disableSmartGuides:t?.disableSmartGuides});for(let{panel:l,from:d}of r)this.fireDidMovePanel(l,d)}get closeEmptyGroups(){return this.options.closeEmptyGroups!==!1}keepEmptyGroups(e){var t;return(t=e.keepEmptyGroups)!==null&&t!==void 0?t:!this.closeEmptyGroups}removeGroupIfEmpty(e){e.model.size===0&&this.closeEmptyGroups&&this.doRemoveGroup(e,{skipActive:!0})}get locked(){return this.gridview.locked}set locked(e){this.gridview.locked=e,this._shellManager&&(this._shellManager.locked=e);for(let t of this.nestedGridviews())t.locked=e}nestedGridviews(){var e,t;return[...this.floatingGroups.map(i=>i.gridview),...((e=(t=this._popoutWindowService)===null||t===void 0?void 0:t.entries)!==null&&e!==void 0?e:[]).map(i=>i.gridview)]}createNestedGridview(e="HORIZONTAL"){var t,i;return new Td(this.gridview.proportionalLayout,this.options.hideBorders?{separatorBorder:"transparent"}:void 0,e,this.gridview.locked,(t=(i=this.options.theme)===null||i===void 0?void 0:i.gap)!==null&&t!==void 0?t:0)}mountFloatingWindow(e,t,i,r,o){var s,n,a,l,d,h,c,u,p;let v=Ue(this._floatingGroupService,"FloatingGroup","api.addFloatingGroup");if(!v)return;let g=((s=(n=o?.dragHandle)!==null&&n!==void 0?n:this.options.floatingGroupDragHandle)!==null&&s!==void 0?s:"titlebar")==="titlebar"?new Lv(this,t):void 0,m=new _s(j(j({container:(a=this._floatingOverlayHost)!==null&&a!==void 0?a:this.gridview.element,content:e.element,header:g?.element},r),{},{minimumInViewportWidth:this.options.floatingGroupBounds==="boundedWithinViewport"?void 0:(l=(d=this.options.floatingGroupBounds)===null||d===void 0?void 0:d.minimumWidthWithinViewport)!==null&&l!==void 0?l:100,minimumInViewportHeight:this.options.floatingGroupBounds==="boundedWithinViewport"?void 0:(h=(c=this.options.floatingGroupBounds)===null||c===void 0?void 0:c.minimumHeightWithinViewport)!==null&&h!==void 0?h:100,transformDragPosition:this._buildFloatingDragTransform(t,(u=o?.disableSmartGuides)!==null&&u!==void 0?u:!1),getSiblingBoxes:()=>this._gatherFloatingGroupBoxes(t)})),f=(p=g?.element)!==null&&p!==void 0?p:t.element.querySelector(".dv-void-container");if(!f)throw new Error("dockview: failed to find drag handle");m.setupDrag(f,{inDragMode:typeof o?.inDragMode=="boolean"?o.inDragMode:!1});let S=v.add(t,m,e);S.addDisposables(m.onDidStartMoving(()=>this._onDidStartFloatingGroupDrag.fire(t)),m.onDidChangeEnd(()=>this._onDidEndFloatingGroupDrag.fire(t))),g&&(S.setTitleBar(g),S.addDisposables(g,ee.from(()=>S.setTitleBar(void 0)),g.onDragStart(w=>{this._onWillDragGroup.fire({nativeEvent:w,group:S.group})})));for(let w of i)w.model.location={type:"floating"};o?.skipActiveGroup||this.doSetGroupAndPanelActive(t)}orthogonalize(e,t){switch(this.gridview.normalize(),e){case"top":case"bottom":this.gridview.orientation==="HORIZONTAL"&&this.gridview.insertOrthogonalSplitviewAtRoot();break;case"left":case"right":this.gridview.orientation==="VERTICAL"&&this.gridview.insertOrthogonalSplitviewAtRoot();break;default:break}switch(e){case"top":case"left":case"center":return this.createGroupAtLocation([0],void 0,t);case"bottom":case"right":return this.createGroupAtLocation([this.gridview.length],void 0,t);default:throw new Error(`dockview: unsupported position ${e}`)}}updateOptions(e){var t,i;super.updateOptions(e),this.reportMissingOptionModules(e),(t=this._floatingGroupService)===null||t===void 0||t.updateBounds(e),(i=this._rootDropTargetService)===null||i===void 0||i.setOptions(e);let r=this.options.disableDnd,o=this.options.dndStrategy;this._options=j(j({},this.options),e);let s=this.options.disableDnd,n=this.options.dndStrategy;if((r!==s||o!==n)&&this.updateDragAndDropState(),"proportionalLayout"in e){let h=this.gridview.proportionalLayout;for(let c of this.nestedGridviews())c.proportionalLayout=h}if("theme"in e&&this.updateTheme(),"createRightHeaderActionComponent"in e||"createLeftHeaderActionComponent"in e||"createPrefixHeaderActionComponent"in e){var a;(a=this.headerActionsService)===null||a===void 0||a.refreshAll()}if("createWatermarkComponent"in e){var l;(l=this._watermarkService)===null||l===void 0||l.refresh();for(let h of this.groups)h.model.refreshWatermark()}if("tabGroupColors"in e||"tabGroupAccent"in e){var d;this._tabGroupColorPalette.setEntries((d=this._options.tabGroupColors)!==null&&d!==void 0?d:ps),this._tabGroupColorPalette.enabled=this._options.tabGroupAccent!=="off";for(let h of this.groups)h.model.refreshTabGroupAccent()}this._onDidOptionsChange.fire(),this._layoutFromShell(this.gridview.width,this.gridview.height)}reportMissingOptionModules(e){$v(e,t=>this._moduleRegistry.has(t))}layout(e,t,i){var r;this._shellManager&&!this._inShellLayout?this._shellManager.layout(e,t):super.layout(e,t,i),this._syncFloatingOverlayHost(),(r=this._moduleRegistry)===null||r===void 0||(r=r.services.floatingGroupService)===null||r===void 0||r.constrainBounds()}_syncFloatingOverlayHost(){if(!this._floatingOverlayHost||!this._shellManager)return;let e=this._shellManager.element.getBoundingClientRect(),t=this.element.getBoundingClientRect(),i=this._floatingOverlayHost;i.style.left=`${t.left-e.left}px`,i.style.top=`${t.top-e.top}px`,i.style.width=`${t.width}px`,i.style.height=`${t.height}px`}_layoutFromShell(e,t){this._inShellLayout=!0,this.layout(e,t,!0),this._inShellLayout=!1}forceRelayout(){this._shellManager?this._layoutFromShell(this.width,this.height):super.forceRelayout()}addEdgeGroup(e,t){let i=this._edgeGroupService;if(!i)throw new Error(Jd("EdgeGroup","api.addEdgeGroup"));if(i.has(e))throw new Error(`dockview: edge group already exists at position '${e}'`);return this.mutation("add",()=>{let r=this.createGroup({id:t.id});r.model.location={type:"edge",position:e},r.model.headerPosition=e;let o=r.onDidChange(a=>{var l;if(!a)return;let d=wr(e)?a.width:a.height;typeof d=="number"&&((l=this._shellManager)===null||l===void 0||l.resizeEdgeGroup(e,d))}),s=r.model.onDidRemovePanel(()=>{r.model.isEmpty&&(i.isAutoReveal(r)?queueMicrotask(()=>{var a;r.model.isEmpty&&(!((a=this._edgeGroupService)===null||a===void 0)&&a.includes(r))&&this.removeEdgeGroup(e)}):this.setEdgeGroupCollapsed(r,!0))});i.add(e,r,new V(s,o)),t.autoHide!==void 0&&i.setAutoHide(r,t.autoHide),t.autoReveal!==void 0&&i.setAutoReveal(r,t.autoReveal),this._onDidAddGroup.fire(r);let n={element:r.element,get headerPosition(){return r.model.headerPosition},layout:(a,l)=>r.layout(a,l)};return this._shellManager.addEdgeView(e,t,n),r.api})}revealEdgeGroupWithData(e,t,i){let r=this._edgeGroupService;r&&this.mutation("add",()=>{var o;let s=r.get(e);s||(this.addEdgeGroup(e,{id:this.getNextGroupId(),autoReveal:!0,autoHide:i?.autoHide,collapsed:!0}),s=r.get(e)),s&&this.moveGroupOrPanel({from:{groupId:t.groupId,panelId:(o=t.panelId)!==null&&o!==void 0?o:void 0},to:{group:s,position:"center"}})})}getEdgeGroup(e){var t;return(t=this._edgeGroupService)===null||t===void 0||(t=t.get(e))===null||t===void 0?void 0:t.api}getEdgeGroupPanel(e){var t;return(t=this._edgeGroupService)===null||t===void 0?void 0:t.get(e)}pinEdgeGroup(e){var t;(t=Ue(this._moduleRegistry.services.autoHideEdgeGroupService,"AutoHideEdgeGroup","api.pinEdgeGroup"))===null||t===void 0||t.pin(e)}autoHideEdgeGroup(e){var t;(t=Ue(this._moduleRegistry.services.autoHideEdgeGroupService,"AutoHideEdgeGroup","api.autoHideEdgeGroup"))===null||t===void 0||t.autoHide(e)}peekEdgeGroup(e,t){var i;(i=Ue(this._moduleRegistry.services.autoHideEdgeGroupService,"AutoHideEdgeGroup","api.peekEdgeGroup"))===null||i===void 0||i.peek(e,t)}get overlayRoot(){return this.rootElement}getDropZoneRect(){return this.element.getBoundingClientRect()}getEdgeGroupExpandedSize(e){var t,i;return(t=(i=this._shellManager)===null||i===void 0?void 0:i.getEdgeGroupExpandedSize(e))!==null&&t!==void 0?t:0}repositionPanelOverlay(e,t,i){this.overlayRenderContainer.repositionPanelOverlay(e.api.id,t,i)}setEdgeGroupVisible(e,t){this._shellManager.setEdgeGroupVisible(e,t)}isEdgeGroupVisible(e){return this._shellManager.isEdgeGroupVisible(e)}removeEdgeGroup(e){let t=Ue(this._edgeGroupService,"EdgeGroup","api.removeEdgeGroup");if(!t)return;let i=t.get(e);if(!i)throw new Error(`dockview: no edge group exists at position '${e}'`);this.mutation("remove",()=>{for(let r of[...i.panels])this.removePanel(r,{removeEmptyGroup:!1,skipDispose:!1});this._shellManager.removeEdgeView(e),t.remove(e),i.dispose(),this._groups.delete(i.id),this._onDidRemoveGroup.fire(i),this.activateFallbackGroupIfRemoved(i)})}setEdgeGroupCollapsed(e,t){var i;let r=(i=this._edgeGroupService)===null||i===void 0?void 0:i.findPositionOf(e);r&&this._shellManager.isEdgeGroupCollapsed(r)!==t&&(this._shellManager.setEdgeGroupCollapsed(r,t),e.api._onDidCollapsedChange.fire({isCollapsed:t}))}isEdgeGroupCollapsed(e){var t;let i=(t=this._edgeGroupService)===null||t===void 0?void 0:t.findPositionOf(e);return i?this._shellManager.isEdgeGroupCollapsed(i):!1}isEdgeGroupPeeking(e){return this._peekingGroups.has(e)}setEdgeGroupPeeking(e,t){this._peekingGroups.has(e)!==t&&(t?this._peekingGroups.add(e):this._peekingGroups.delete(e),e.api._onDidPeekChange.fire({isPeeking:t}))}isEdgeGroupAutoHide(e){var t,i;let r=(t=this._edgeGroupService)===null||t===void 0?void 0:t.isAutoHide(e);if(r!==void 0)return r;let o=(i=this._edgeGroupService)===null||i===void 0?void 0:i.findPositionOf(e);return o===void 0?!1:Fd(this.options.autoHideEdgeGroups,o)}setEdgeGroupAutoHide(e,t){let i=this._edgeGroupService;i?.includes(e)&&(i.setAutoHide(e,t),this._onDidEdgeGroupAutoHideChange.fire(e))}updateDragAndDropState(){for(let e of this.groups)e.model.updateDragAndDropState()}focus(){var e;(e=this.activeGroup)===null||e===void 0||e.focus()}getGroupPanel(e){return this.panels.find(t=>t.id===e)}setActivePanel(e){e.group.model.openPanel(e),this.doSetGroupAndPanelActive(e.group)}activateNext(e={}){if(!e.group){if(!this.activeGroup)return;e.group=this.activeGroup}if(e.includePanel&&e.group&&e.group.activePanel!==e.group.panels[e.group.panels.length-1]){e.group.model.moveToNext({suppressRoll:!0});return}let t=this.activationTarget(e.group,!1);t&&this.doSetGroupAndPanelActive(t)}activatePrevious(e={}){if(!e.group){if(!this.activeGroup)return;e.group=this.activeGroup}if(e.includePanel&&e.group&&e.group.activePanel!==e.group.panels[0]){e.group.model.moveToPrevious({suppressRoll:!0});return}let t=this.activationTarget(e.group,!0);t&&this.doSetGroupAndPanelActive(t)}activationTarget(e,t){let i=this.getGridviewForGroup(e);if(i.element.contains(e.element)){let n=_e(e.element),a=(t?i.previous(n):i.next(n)).view;if(i===this.gridview||a!==e)return a}let r=[],o=n=>{Pd(n)?n.children.forEach(o):r.push(n.view)};o(this.gridview.getView());let s=r.filter(n=>n.api.isVisible);return s[t?s.length-1:0]}toJSON(){var e,t,i,r,o;let s=this.gridview.serialize(),n=this.panels.reduce((c,u)=>(c[u.id]=u.toJSON(),c),{}),a=(e=(t=this._floatingGroupService)===null||t===void 0?void 0:t.serialize())!==null&&e!==void 0?e:[],l=(i=(r=this._popoutWindowService)===null||r===void 0?void 0:r.serialize())!==null&&i!==void 0?i:[],d={grid:s,panels:n,activeGroup:(o=this.activeGroup)===null||o===void 0?void 0:o.id};a.length>0&&(d.floatingGroups=a),l.length>0&&(d.popoutGroups=l);let h=this._serializeEdgeGroups();return h&&(d.edgeGroups=h),d}_serializeEdgeGroups(){var e;if(!(!((e=this._edgeGroupService)===null||e===void 0)&&e.hasAny()))return;let t=this._shellManager.toJSON();for(let[i,r]of this._edgeGroupService.entries()){let o=t[i];if(!o)continue;if(this._edgeGroupService.isAutoReveal(r)&&r.model.isEmpty){delete t[i];continue}o.group=r.toJSON(),this._edgeGroupService.isAutoReveal(r)&&(o.autoReveal=!0);let s=this._edgeGroupService.isAutoHide(r);s!==void 0&&(o.autoHide=s)}return t}fromJSON(e,t){this.mutation("load",()=>this._doFromJSON(e,t))}_doFromJSON(e,t){var i,r;if((i=this._popoutWindowService)===null||i===void 0||i.cancelPendingRestorations(),typeof e!="object"||e===null)throw new Error("dockview: serialized layout must be a non-null object");if(!e.grid||((r=e.grid.root)===null||r===void 0?void 0:r.type)!=="branch"||!Array.isArray(e.grid.root.data))throw new Error("dockview: root must be of type branch");let o=new Map,s=new Map,n=[],a=[],l=()=>{for(let D of a)try{D.dispose()}catch(T){console.error("dockview: failed to dispose a temporary group created for reuseExistingPanels",T)}a.length=0};if(t?.reuseExistingPanels){let D=Object.keys(e.panels),T,R=()=>{let x=this.createGroup(),C=this._groups.get(x.api.id);return this._groups.delete(x.api.id),a.push(ee.from(()=>{var L;this.movingLock(()=>{for(let M of x.panels.slice())x.model.removePanel(M)}),C?.disposable.dispose(),(L=this.headerActionsService)===null||L===void 0||L.disposeGroup(x),x.dispose()})),x};try{for(let x of this.panels)if(D.includes(x.api.id)){o.set(x.api.id,x);let C;if(x.api.renderer==="always"&&x.api.isVisible)C=R();else{var d;(d=T)!==null&&d!==void 0||(T=R()),C=T}s.set(x.api.id,C),n.push({panel:x,temporaryGroup:C})}this.movingLock(()=>{n.forEach(({panel:x,temporaryGroup:C})=>{this.moveGroupOrPanel({from:{groupId:x.api.group.api.id,panelId:x.api.id},to:{group:C,position:"center"},keepEmptyGroups:!0})})}),this.clear()}catch(x){throw l(),x}}else this.clear();let{grid:h,panels:c,activeGroup:u}=e;try{var p,v,g,m,f;let D=this.width,T=this.height,R=C=>{let{id:L,locked:M,hideHeader:O,headerPosition:W,views:_,activeView:y}=C;if(typeof L!="string")throw new TypeError("dockview: group id must be of type string");let P=this.createGroup({id:L,locked:M??!1,hideHeader:!!O,headerPosition:W});this._onDidAddGroup.fire(P);let k=[],G=_.filter(I=>c[I]);for(let I of G){let H=o.get(I),U=s.get(I);if(U&&H)this.movingLock(()=>{U.model.removePanel(H)}),k.push(H),H.updateFromStateModel(c[I]);else{let re=this._deserializer.fromJSON(c[I],P);k.push(re)}}for(let I of k){let H=typeof y=="string"&&y===I.id;o.has(I.api.id)?this.movingLock(()=>{P.model.openPanel(I,{skipSetActive:!H,skipSetGroupActive:!0})}):P.model.openPanel(I,{skipSetActive:!H,skipSetGroupActive:!0})}return C.tabGroups&&C.tabGroups.length>0&&P.model.restoreTabGroups(C.tabGroups),!P.activePanel&&P.panels.length>0&&P.model.openPanel(P.panels[P.panels.length-1],{skipSetGroupActive:!0}),P};this.gridview.deserialize(h,{fromJSON:C=>R(C.data)}),this._layoutFromShell(D,T),e.edgeGroups&&this.deserializeEdgeGroups(e.edgeGroups,c,o,s),this.deserializeFloatingWindows((p=e.floatingGroups)!==null&&p!==void 0?p:[],R);let x=this.deserializePopoutWindows((v=e.popoutGroups)!==null&&v!==void 0?v:[],R);if((g=this._popoutWindowService)===null||g===void 0||g.finishRestoration(x),(m=this._floatingGroupService)===null||m===void 0||m.constrainBounds(),typeof u=="string"){let C=this.getPanel(u);C&&this.doSetGroupAndPanelActive(C)}(f=this._watermarkService)===null||f===void 0||f.update()}catch(D){var S;console.error("dockview: failed to deserialize layout. Reverting changes",D);for(let T of this.groups)for(let R of T.panels.slice())this.removePanel(R,{removeEmptyGroup:!1,skipDispose:!1});for(let T of this.groups){var w;!((w=this._edgeGroupService)===null||w===void 0)&&w.includes(T)||(T.dispose(),this._groups.delete(T.id),this._onDidRemoveGroup.fire(T))}throw(S=this._floatingGroupService)===null||S===void 0||S.disposeAll(),this.clear(),D}finally{l()}this.debouncedUpdateAllPositions(),this._onDidLayoutFromJSON.fire()}deserializeNestedGridview(e,t){let i=this.createNestedGridview(e.orientation),r=[];return i.deserialize(e,{fromJSON:o=>{let s=t(o.data);return r.push(s),s}}),{gridview:i,members:r}}deserializeEdgeGroups(e,t,i,r){let o=Ue(this._edgeGroupService,"EdgeGroup","fromJSON edge restoration");if(o){for(let n of["top","bottom","left","right"]){let a=e[n];if(a&&!o.has(n)){var s;let l=a.group,d=(s=l?.id)!==null&&s!==void 0?s:`${n}-group`;this.addEdgeGroup(n,{id:d,autoReveal:a.autoReveal,autoHide:a.autoHide,minimumSize:a.minimumSize,maximumSize:a.maximumSize,collapsedSize:a.collapsedSize})}}for(let[n,a]of o.entries()){let l=e[n],d=l?.group;if(d){let{views:h,activeView:c,locked:u,hideHeader:p}=d;a.locked=u??!1,a.header.hidden=!!p;let v=[];for(let g of h){if(!t[g])continue;let m=i.get(g),f=r.get(g);if(f&&m)this.movingLock(()=>{f.model.removePanel(m)}),v.push(m),m.updateFromStateModel(t[g]);else{let S=this._deserializer.fromJSON(t[g],a);v.push(S)}}for(let g of v){let m=c===g.id;i.has(g.api.id)?this.movingLock(()=>{a.model.openPanel(g,{skipSetActive:!m,skipSetGroupActive:!0})}):a.model.openPanel(g,{skipSetActive:!m,skipSetGroupActive:!0})}d.tabGroups&&d.tabGroups.length>0&&a.model.restoreTabGroups(d.tabGroups),!a.activePanel&&a.panels.length>0&&a.model.openPanel(a.panels[a.panels.length-1],{skipSetGroupActive:!0})}}this._shellManager.fromJSON(e)}}deserializeFloatingWindows(e,t){for(let i of e){let{data:r,grid:o,position:s}=i;if(o){let{gridview:n,members:a}=this.deserializeNestedGridview(o,t);if(a.length===0)continue;this.mountFloatingWindow(n,a[0],a,s,{inDragMode:!1})}else if(r){let n=t(r);this.addFloatingGroup(n,{position:s,width:s.width,height:s.height,skipRemoveGroup:!0,inDragMode:!1})}}}deserializePopoutWindows(e,t){let i=e.length>0?Ue(this._popoutWindowService,"PopoutWindow","fromJSON popout restoration"):this._popoutWindowService;return i?e.flatMap((r,o)=>{let{data:s,grid:n,position:a,gridReferenceGroup:l,url:d}=r,h,c=[];if(n){let p=this.deserializeNestedGridview(n,t);if(h=p.gridview,c=p.members,c.length===0)return h.dispose(),[]}let u=n?c[0]:t(s);return i.scheduleRestoration(o*100,()=>this.addPopoutGroup(u,{position:a??void 0,overridePopoutGroup:l?u:void 0,overridePopoutGridview:h,referenceGroup:l?this.getPanel(l):void 0,popoutUrl:d}),()=>{for(let p of c.length>0?c:[u])if(!this.isDisposed&&this._groups.has(p.id)&&p.element.parentElement===null){for(let v of[...p.panels])this.removePanel(v,{removeEmptyGroup:!1});p.dispose(),this._groups.delete(p.id),this._onDidRemoveGroup.fire(p)}})}):[]}clear(){this.mutation("clear",()=>this._doClear())}_doClear(){let e=Array.from(this._groups.values()).map(r=>r.value),t=!!this.activeGroup;for(let r of e){var i;if(!((i=this._edgeGroupService)===null||i===void 0)&&i.includes(r)){let o=[...r.panels];for(let s of o)this.removePanel(s,{removeEmptyGroup:!1});continue}this.removeGroup(r,{skipActive:!0})}t&&this.doSetGroupAndPanelActive(void 0),this.gridview.clear()}closeAllGroups(){this.mutation("remove",()=>{let e=Array.from(this._groups.values()).map(t=>t.value);for(let t of e){if(!this._groups.has(t.id))continue;let i=this.options.noPanelsOverlay==="emptyGroup"&&this.isLastGridGroup(t);i&&t.model.size===0||(t.model.closeAllPanels(),!this.closeEmptyGroups&&!i&&this._groups.has(t.id)&&t.model.size===0&&this.removeGroup(t,{skipActive:!0}))}})}addPanel(e){return this.mutation("add",()=>this._doAddPanel(e))}addPanelFromJSON(e,t){if(!e.contentComponent)throw new Error(`dockview: serialized panel ${e.id} has no contentComponent`);return this.mutation("add",()=>{let i=this._doAddPanel(j(j({},t),{},{id:e.id,component:e.contentComponent,tabComponent:e.tabComponent,title:e.title,renderer:e.renderer,params:e.params,minimumWidth:e.minimumWidth,minimumHeight:e.minimumHeight,maximumWidth:e.maximumWidth,maximumHeight:e.maximumHeight}));return e.pinned&&this.setPanelPinned(i,!0),i})}_doAddPanel(e){if(this.panels.some(h=>h.id===e.id))throw new Error(`dockview: panel with id ${e.id} already exists`);let t;if(e.position&&e.floating)throw new Error("dockview: you can only provide one of: position, floating as arguments to .addPanel(...)");let i={width:e.initialWidth,height:e.initialHeight},r,o=h=>!!e.inactive&&h.model.size>0;if(e.position)if(vv(e.position)){let h=typeof e.position.referencePanel=="string"?this.getGroupPanel(e.position.referencePanel):e.position.referencePanel;if(r=e.position.index,!h){var s;let c=typeof e.position.referencePanel=="string"?e.position.referencePanel:(s=e.position.referencePanel)===null||s===void 0?void 0:s.id;throw new Error(`dockview: referencePanel '${c}' does not exist`)}t=this.findGroup(h)}else if(gv(e.position)){var n;if(t=typeof e.position.referenceGroup=="string"?(n=this._groups.get(e.position.referenceGroup))===null||n===void 0?void 0:n.value:e.position.referenceGroup,r=e.position.index,!t){var a;let h=typeof e.position.referenceGroup=="string"?e.position.referenceGroup:(a=e.position.referenceGroup)===null||a===void 0?void 0:a.id;throw new Error(`dockview: referenceGroup '${h}' does not exist`)}}else{let h=this.orthogonalize(Ja(e.position.direction)),c=this.createPanel(e,h);return h.model.openPanel(c,{skipSetActive:o(h),skipSetGroupActive:e.inactive,index:r}),e.inactive||this.doSetGroupAndPanelActive(h),h.api.setSize({height:i?.height,width:i?.width}),c}else t=this.activeGroup;let l;if(t){var d;let h=Xa(((d=e.position)===null||d===void 0?void 0:d.direction)||"within");if(e.floating){let c=this.createGroup();this._onDidAddGroup.fire(c);let u=typeof e.floating=="object"&&e.floating!==null?e.floating:{};this.addFloatingGroup(c,j(j({},u),{},{inDragMode:!1,skipRemoveGroup:!0,skipActiveGroup:!0})),l=this.createPanel(e,c),c.model.openPanel(l,{skipSetActive:o(c),skipSetGroupActive:e.inactive,index:r})}else if(t.api.location.type==="edge"||h==="center")l=this.createPanel(e,t),t.model.openPanel(l,{skipSetActive:o(t),skipSetGroupActive:e.inactive,index:r}),t.api.setSize({width:i?.width,height:i?.height}),e.inactive||this.doSetGroupAndPanelActive(t);else{let c=this.getGridviewForGroup(t),u=_e(t.element),p=Mt(c.orientation,u,h),v=this.createGroupAtLocation(p,this.orientationAtLocation(p,c)==="VERTICAL"?i?.height:i?.width,void 0,c);l=this.createPanel(e,v),v.model.openPanel(l,{skipSetActive:o(v),skipSetGroupActive:e.inactive,index:r}),e.inactive||this.doSetGroupAndPanelActive(v)}}else if(e.floating){let h=this.createGroup();this._onDidAddGroup.fire(h);let c=typeof e.floating=="object"&&e.floating!==null?e.floating:{};this.addFloatingGroup(h,j(j({},c),{},{inDragMode:!1,skipRemoveGroup:!0,skipActiveGroup:!0})),l=this.createPanel(e,h),h.model.openPanel(l,{skipSetActive:o(h),skipSetGroupActive:e.inactive,index:r})}else{let h=this.createGroupAtLocation([0],this.gridview.orientation==="VERTICAL"?i?.height:i?.width);l=this.createPanel(e,h),h.model.openPanel(l,{skipSetActive:o(h),skipSetGroupActive:e.inactive,index:r}),e.inactive||this.doSetGroupAndPanelActive(h)}return l}removePanel(e,t){this.mutation("remove",()=>{var i;return this._doRemovePanel(e,{removeEmptyGroup:(i=t?.removeEmptyGroup)!==null&&i!==void 0?i:this.closeEmptyGroups,skipDispose:t?.skipDispose,skipSetActiveGroup:t?.skipSetActiveGroup})})}_doRemovePanel(e,t){let i=e.group;if(!i)throw new Error(`dockview: cannot remove panel ${e.id}. it's missing a group.`);i.model.removePanel(e,{skipSetActiveGroup:t.skipSetActiveGroup}),t.skipDispose||(e.group.model.renderContainer.detatch(e),e.dispose()),i.size===0&&t.removeEmptyGroup&&this.removeGroup(i,{skipActive:t.skipSetActiveGroup})}createWatermarkComponent(){return this.options.createWatermarkComponent?this.options.createWatermarkComponent():new Mv}addGroup(e){return this.mutation("add",()=>this._doAddGroup(e))}serializeGroup(e){let t={};for(let i of e.panels)t[i.id]=i.toJSON();return{group:e.model.toJSON(),panels:t}}addGroupFromJSON(e,t){return this.validateSerializedGroup(e),this.mutation("add",()=>this._doAddGroupFromJSON(e,t))}validateSerializedGroup(e){let t=e?.group;if(typeof t?.id!="string")throw new TypeError("dockview: group id must be of type string");if(!Array.isArray(t.views))throw new TypeError(`dockview: serialized group ${t.id} has no views`);for(let r of t.views){var i;if(!(!((i=e.panels)===null||i===void 0)&&i[r]))throw new Error(`dockview: serialized group ${t.id} is missing panel state for ${r}`);if(this.panels.some(o=>o.id===r))throw new Error(`dockview: panel with id ${r} already exists`)}}_doAddGroupFromJSON(e,t){var i;let{id:r,locked:o,hideHeader:s,headerPosition:n,constraints:a,activeView:l,tabGroups:d}=e.group;if(t&&((i=t.direction)!==null&&i!==void 0?i:"within")==="within"){let p=this.resolveReferenceGroup(t);if(p)return this.mergeGroupFromJSON(e,p,t)}let h={id:r,locked:o??!1,hideHeader:!!s,headerPosition:n,constraints:a,initialWidth:t?.initialWidth,initialHeight:t?.initialHeight,skipSetActive:!0},c=this.addEmptyGroupAt(h,t),u;try{u=this.deserializePanels(e,c)}catch(p){throw this.doRemoveGroup(c,{skipActive:!0}),p}for(let p of u)c.model.openPanel(p,{skipSetActive:p.id!==l,skipSetGroupActive:!0});return d&&d.length>0&&c.model.restoreTabGroups(d),!c.activePanel&&c.panels.length>0&&c.model.openPanel(c.panels[c.panels.length-1],{skipSetGroupActive:!0}),t?.skipSetActive||this.doSetGroupAndPanelActive(c),c}addEmptyGroupAt(e,t){if(t!==void 0&&(Ho(t)||$o(t)||typeof t.direction=="string"))return this._doAddGroup(j(j({},t),e));let i=this.createGroup(e);return this.doAddGroup(i),i}deserializePanels(e,t){let i=[];try{for(let r of e.group.views)i.push(this._deserializer.fromJSON(e.panels[r],t))}catch(r){for(let o of i)o.dispose();throw r}return i}resolveReferenceGroup(e){if(Ho(e)){let t=typeof e.referencePanel=="string"?e.referencePanel:e.referencePanel.id,i=this.getGroupPanel(t);if(!i)throw new Error(`dockview: reference panel ${t} does not exist`);return i.group}if($o(e)){let t=typeof e.referenceGroup=="string"?e.referenceGroup:e.referenceGroup.id,i=this.getPanel(t);if(!i)throw new Error(`dockview: reference group ${t} does not exist`);return i}}mergeGroupFromJSON(e,t,i){let{activeView:r}=e.group,o=i.index;return this.deserializePanels(e,t).forEach((s,n)=>{t.model.openPanel(s,{index:o===void 0?void 0:o+n,skipSetActive:s.id!==r,skipSetGroupActive:!0})}),i.skipSetActive||this.doSetGroupAndPanelActive(t),t}_doAddGroup(e){if(e){let o;if(Ho(e)){var t;let c=typeof e.referencePanel=="string"?this.panels.find(p=>p.id===e.referencePanel):e.referencePanel,u=typeof e.referencePanel=="string"?e.referencePanel:(t=e.referencePanel)===null||t===void 0?void 0:t.id;if(!c)throw new Error(`dockview: reference panel ${u} does not exist`);if(o=this.findGroup(c),!o)throw new Error(`dockview: reference group for reference panel ${u} does not exist`)}else if($o(e)){var i;if(o=typeof e.referenceGroup=="string"?(i=this._groups.get(e.referenceGroup))===null||i===void 0?void 0:i.value:e.referenceGroup,!o){var r;let c=typeof e.referenceGroup=="string"?e.referenceGroup:(r=e.referenceGroup)===null||r===void 0?void 0:r.id;throw new Error(`dockview: reference group ${c} does not exist`)}}else{let c=this.orthogonalize(Ja(e.direction),e);return e.skipSetActive||this.doSetGroupAndPanelActive(c),c}let s=Xa(e.direction||"within");if(o.api.location.type==="edge")throw new Error(`dockview: cannot add a group relative to edge group ${o.id}; edge groups cannot be split`);let n=this.getGridviewForGroup(o),a=_e(o.element),l=Mt(n.orientation,a,s),d=this.orientationAtLocation(l,n)==="VERTICAL"?e.initialHeight:e.initialWidth,h=this.createGroupAtLocation(l,d,e,n);return e.skipSetActive||this.doSetGroupAndPanelActive(h),h}else{let o=this.createGroup(e);return this.doAddGroup(o),this.doSetGroupAndPanelActive(o),o}}removeGroup(e,t){this.mutation("remove",()=>this.doRemoveGroup(e,t))}detachFromNestedWindow(e){var t,i;let r=(t=this._floatingGroupService)===null||t===void 0?void 0:t.findByGroup(e);if(r){let s=this.nestedWindowMembers(e);return s.length<=1?!1:(r.gridview.remove(e),r.group===e&&r.setAnchorGroup(s.find(n=>n!==e)),!0)}let o=(i=this._popoutWindowService)===null||i===void 0?void 0:i.findByGroup(e);if(o){let s=this.nestedWindowMembers(e);return s.length<=1?!1:(o.gridview.remove(e),o.popoutGroup===e&&o.setAnchorGroup(s.find(n=>n!==e)),!0)}return!1}disposeGroupRecord(e){e.dispose(),this._groups.delete(e.id),this._onDidRemoveGroup.fire(e)}activateFallbackGroupIfRemoved(e,t){if(!t&&this._activeGroup===e){let i=Array.from(this._groups.values());this.doSetGroupAndPanelActive(i.length>0?i[0].value:void 0)}}doRemoveGroup(e,t){var i;if(!((i=this._edgeGroupService)===null||i===void 0)&&i.includes(e))return e;let r=[...e.panels];if(!t?.skipDispose)for(let h of r){var o;this.removePanel(h,{removeEmptyGroup:!1,skipDispose:(o=t?.skipDispose)!==null&&o!==void 0?o:!1})}let s=this.activePanel;if(e.api.location.type==="floating"){var n;let h=(n=this._floatingGroupService)===null||n===void 0?void 0:n.findByGroup(e);if(!h)throw new Error("dockview: failed to find floating group");return this.detachFromNestedWindow(e)?(t?.skipDispose?e.model.location={type:"grid"}:this.disposeGroupRecord(e),this.activateFallbackGroupIfRemoved(e,t?.skipActive),e):(t?.skipDispose||this.disposeGroupRecord(e),h.dispose(),this.activateFallbackGroupIfRemoved(e,t?.skipActive),e)}if(e.api.location.type==="popout"){var a,l;let h=(a=this._popoutWindowService)===null||a===void 0?void 0:a.findByGroup(e);if(!h)throw new Error("dockview: failed to find popout group");if(this.detachFromNestedWindow(e))return t?.skipDispose?e.model.location={type:"grid"}:this.disposeGroupRecord(e),this.activateFallbackGroupIfRemoved(e,t?.skipActive),e;if(!t?.skipDispose){if(!t?.skipPopoutAssociated){let u=h.referenceGroup?this.getPanel(h.referenceGroup):void 0;u?.panels.length===0&&(this.closeEmptyGroups||!u.api.isVisible)&&this.removeGroup(u)}h.popoutGroup.dispose(),this._groups.delete(e.id),this._onDidRemoveGroup.fire(e)}(l=this._popoutWindowService)===null||l===void 0||l.remove(h);let c=h.disposable.dispose();return!t?.skipPopoutReturn&&c&&(this.doAddGroup(c,[0]),this.doSetGroupAndPanelActive(c)),this.activateFallbackGroupIfRemoved(e,t?.skipActive),h.popoutGroup}if(!this.gridview.element.contains(e.element)){if(!t?.skipDispose){let h=this._groups.get(e.id);h?.disposable.dispose(),this.disposeGroupRecord(e)}return this.activateFallbackGroupIfRemoved(e,t?.skipActive),e}let d=super.doRemoveGroup(e,t);return t?.skipActive||this.activePanel!==s&&this.fireActivePanelChange(this.activePanel),d}debouncedUpdateAllPositions(){this._updatePositionsFrameId!==void 0&&cancelAnimationFrame(this._updatePositionsFrameId),this._updatePositionsFrameId=requestAnimationFrame(()=>{var e,t;this._updatePositionsFrameId=void 0,this.overlayRenderContainer.updateAllPositions();for(let i of(e=(t=this._popoutWindowService)===null||t===void 0?void 0:t.entries)!==null&&e!==void 0?e:[])i.overlayRenderContainer.updateAllPositions()})}movingLock(e){let t=this._moving;try{return this._moving=!0,e()}finally{this._moving=t}}mutation(e,t){let i=this.openMutation(e);this._syncMutationDepth++;try{return t()}finally{this._syncMutationDepth--,this._syncMutationDepth===0&&this.releaseDisposedActiveGroup(),i()}}mutationAsync(e,t){var i=this;return xd(function*(){let r=i.openMutation(e);try{return yield t()}finally{r()}})()}openMutation(e){let t=this._origin;return this._mutationDepth===0&&this._onWillMutateLayout.fire({kind:e,origin:t}),this._mutationDepth++,()=>{this._mutationDepth--,this._mutationDepth===0&&(this.releaseDisposedActiveGroup(),this.flushLocationChanges(),this._onDidMutateLayout.fire({kind:e,origin:t}))}}releaseDisposedActiveGroup(){var e;!this.isDisposed&&(!((e=this._activeGroup)===null||e===void 0)&&e.model.isDisposed)&&this.activateFallbackGroupIfRemoved(this._activeGroup)}deferLocationChange(e,t){if(this._mutationDepth===0){t();return}this._pendingLocationChanges.set(e,t)}flushLocationChanges(){if(this._pendingLocationChanges.size===0)return;let e=Array.from(this._pendingLocationChanges.values());this._pendingLocationChanges.clear();for(let t of e)t()}currentOrigin(){return this._origin}withOrigin(e,t){if(this._originDepth>0||this._mutationDepth>0)return t();let i=this._origin;this._origin=e,this._originDepth++;try{return t()}finally{this._originDepth--,this._origin=i}}fireActivePanelChange(e){this._onDidActivePanelChange.fire({panel:e,origin:this._origin})}fireDidMovePanel(e,t){this._onDidMovePanel.fire({panel:e,from:t,to:e.group})}moveGroupOrPanel(e){this.mutation("move",()=>this._doMoveGroupOrPanel(e))}_doMoveGroupOrPanel(e){var t;let i=e.to.group,r=e.from.groupId,o=e.from.panelId,s=e.to.position,n=e.to.index,a=r?(t=this._groups.get(r))===null||t===void 0?void 0:t.value:void 0;if(!a)throw new Error(`dockview: Failed to find group id ${r}`);if(o===void 0){e.from.tabGroupId?this.moveTabGroupToGroup({sourceGroup:a,tabGroupId:e.from.tabGroupId,destinationGroup:i,destinationTarget:s,destinationIndex:n,skipSetActive:e.skipSetActive,keepEmptyGroups:e.keepEmptyGroups}):this.moveGroup({from:{group:a},to:{group:i,position:s},skipSetActive:e.skipSetActive});return}if(!s||s==="center"){let d=this.movingLock(()=>a.model.removePanel(o,{skipSetActive:!1,skipSetActiveGroup:!0}));if(!d)throw new Error(`dockview: No panel with id ${o}`);!this.keepEmptyGroups(e)&&a.model.size===0&&a!==i&&this.doRemoveGroup(a,{skipActive:!0});let h=i.model.size===0;this.movingLock(()=>{var c;return i.model.openPanel(d,{index:n,skipSetActive:((c=e.skipSetActive)!==null&&c!==void 0?c:!1)&&!h,skipSetGroupActive:!0})}),e.skipSetActive||this.doSetGroupAndPanelActive(i),this.fireDidMovePanel(d,a)}else{let d=this.getGridviewForGroup(i),h=_e(i.element),c=Mt(d.orientation,h,s);if(a.size<2&&!this.keepEmptyGroups(e)){if(a===i)return;let[u,p]=xt(c);if(a.api.location.type==="grid"&&d===this.gridview){let[f,S]=xt(_e(a.element));if((this.options.dropSizing!=="distribute"||a===i)&&Ka(f,u)){this.gridview.moveView(f,S,p),this.fireDidMovePanel(this.getGroupPanel(o),a);return}}if(a.api.location.type==="popout"&&this.nestedWindowMembers(a).length<=1){var l;let f=(l=this._popoutWindowService)===null||l===void 0?void 0:l.findByGroup(a);if(!f)return;let S=this.movingLock(()=>f.popoutGroup.model.removePanel(f.popoutGroup.panels[0],{skipSetActive:!0,skipSetActiveGroup:!0}));this.doRemoveGroup(a,{skipActive:!0});let w=Mt(d.orientation,_e(i.element),s),D=this.createGroupAtLocation(w,this.sizingForDrop(_e(i.element)),void 0,d);this.movingLock(()=>D.model.openPanel(S,{skipSetActive:!0})),this.doSetGroupAndPanelActive(D),this.fireDidMovePanel(this.getGroupPanel(o),a);return}if(a.api.location.type==="edge"){let f=this.movingLock(()=>a.model.removePanel(o,{skipSetActive:!1,skipSetActiveGroup:!0}));if(!f)throw new Error(`dockview: No panel with id ${o}`);let S=this.createGroupAtLocation(c,this.sizingForDrop(h),void 0,d);this.movingLock(()=>S.model.openPanel(f,{skipSetGroupActive:!0})),this.doSetGroupAndPanelActive(S),this.fireDidMovePanel(f,a);return}let v=this.movingLock(()=>this.doRemoveGroup(a,{skipActive:!0,skipDispose:!0})),g=_e(i.element),m=Mt(d.orientation,g,s);this.movingLock(()=>this.doAddGroup(v,m,this.sizingForDrop(g),d)),this.setGroupLocationForRoot(v,d),this.doSetGroupAndPanelActive(v),this.fireDidMovePanel(this.getGroupPanel(o),a)}else{let u=this.movingLock(()=>a.model.removePanel(o,{skipSetActive:!1,skipSetActiveGroup:!0}));if(!u)throw new Error(`dockview: No panel with id ${o}`);let p=Mt(d.orientation,h,s),v=this.createGroupAtLocation(p,this.sizingForDrop(h),void 0,d);this.movingLock(()=>v.model.openPanel(u,{skipSetGroupActive:!0})),this.doSetGroupAndPanelActive(v),this.fireDidMovePanel(u,a)}}}moveTabGroupToGroup(e){let{sourceGroup:t,tabGroupId:i,destinationGroup:r,destinationTarget:o,destinationIndex:s}=e,n=t.model.getTabGroups().find(m=>m.id===i);if(!n||n.panelIds.length===0)return;let a=n.label,l=n.color,d=n.collapsed,h=n.componentParams,c=[...n.panelIds],u=o&&o!=="center"?_e(r.element):void 0,p=this.movingLock(()=>c.map(m=>t.model.removePanel(m,{skipSetActive:!1,skipSetActiveGroup:!0})).filter(m=>m!==void 0));if(p.length===0)return;let v=m=>{this.movingLock(()=>{for(let S of p)m.model.openPanel(S,{index:s,skipSetActive:!0,skipSetGroupActive:!0})});let f=m.model.createTabGroup({label:a,color:l,collapsed:d,componentParams:h});for(let S of p)m.model.addPanelToTabGroup(f.id,S.id);e.skipSetActive||this.doSetGroupAndPanelActive(m);for(let S of p)this.fireDidMovePanel(S,t)},g;if(!o||o==="center"||!u)g=r;else{let m=this.getGridviewForGroup(r),f=Mt(m.orientation,u,o);g=this.createGroupAtLocation(f,this.sizingForDrop(u),void 0,m)}!this.keepEmptyGroups(e)&&t.model.size===0&&t!==g&&this.doRemoveGroup(t,{skipActive:!0}),v(g)}moveGroup(e){this.mutation("move",()=>this._doMoveGroup(e))}maximizeGroup(e){this.mutation("maximize",()=>super.maximizeGroup(e))}exitMaximizedGroup(){this.mutation("maximize",()=>super.exitMaximizedGroup())}_doMoveGroup(e){var t;let i=e.from.group,r=e.to.group,o=e.to.position;if(i===r)return;let s=i,n;if(o==="center"){let h=i.activePanel,c=i.model.getTabGroups().map(p=>({label:p.label,color:p.color,collapsed:p.collapsed,componentParams:p.componentParams,panelIds:[...p.panelIds]})),u=this.movingLock(()=>[...i.panels].map(p=>i.model.removePanel(p.id,{skipSetActive:!0})));i?.model.size===0&&this.doRemoveGroup(i,{skipActive:!0}),this.movingLock(()=>{for(let p of u)r.model.openPanel(p,{skipSetActive:p!==h,skipSetGroupActive:!0})}),n=u;for(let p of c){let v=r.model.createTabGroup({label:p.label,color:p.color,collapsed:p.collapsed,componentParams:p.componentParams});for(let g of p.panelIds)r.model.addPanelToTabGroup(v.id,g)}e.skipSetActive!==!0?this.doSetGroupAndPanelActive(r):this.activePanel||this.doSetGroupAndPanelActive(r)}else{let h=(()=>{if(i.api.location.type==="edge"||r.api.location.type==="edge")return!1;let c=this.getGridviewForGroup(i);if(c!==this.getGridviewForGroup(r))return!1;let u,p;try{u=_e(i.element),p=_e(r.element)}catch{return!1}return u.length===0||p.length===0?!1:Ka(xt(u)[0],xt(p)[0])&&Ed(c.orientation,p)===es(o)})();if(i.api.location.type==="edge"){let c=i.activePanel,u=i.model.getTabGroups().map(v=>({label:v.label,color:v.color,collapsed:v.collapsed,componentParams:v.componentParams,panelIds:[...v.panelIds]})),p=this.movingLock(()=>[...i.panels].map(v=>i.model.removePanel(v.id,{skipSetActive:!0})));s=this.createGroup(),this._onDidAddGroup.fire(s),this.movingLock(()=>{for(let v of p)s.model.openPanel(v,{skipSetActive:v!==c,skipSetGroupActive:!0})});for(let v of u){let g=s.model.createTabGroup({label:v.label,color:v.color,collapsed:v.collapsed,componentParams:v.componentParams});for(let m of v.panelIds)s.model.addPanelToTabGroup(g.id,m)}}else switch(i.api.location.type){case"grid":this.gridview.removeView(_e(i.element));break;case"floating":{var a;let c=(a=this._floatingGroupService)===null||a===void 0?void 0:a.findByGroup(i);if(!c)throw new Error("dockview: failed to find floating group");this.detachFromNestedWindow(i)||c.dispose();break}case"popout":{var l,d;let c=(l=this._popoutWindowService)===null||l===void 0?void 0:l.findByGroup(i);if(!c)throw new Error("dockview: failed to find popout group");if(this.detachFromNestedWindow(i))break;if((d=this._popoutWindowService)===null||d===void 0||d.remove(c),c.referenceGroup){let u=this.getPanel(c.referenceGroup);u&&!u.api.isVisible&&this.doRemoveGroup(u,{skipActive:!0})}c.window.dispose();break}}if(r.api.location.type==="grid"||r.api.location.type==="floating"||r.api.location.type==="popout"){let c=this.getGridviewForGroup(r),u=_e(r.element),p=Mt(c.orientation,u,o),v;h&&this.options.dropSizing!=="distribute"?v=es(o)==="HORIZONTAL"?i.api.width:i.api.height:v=this.sizingForDrop(u),c.addView(s,v,p),this.setGroupLocationForRoot(s,c)}}if(((t=n)!==null&&t!==void 0?t:s.panels).forEach(h=>{this.fireDidMovePanel(h,i)}),this.debouncedUpdateAllPositions(),e.skipSetActive===!1){let h=r??i;this.doSetGroupAndPanelActive(h)}else s!==i&&e.skipSetActive!==!0&&this.doSetGroupAndPanelActive(s)}doSetGroupActive(e){var t;super.doSetGroupActive(e);let i=this.activePanel;!this._moving&&i!==((t=this._onDidActivePanelChange.value)===null||t===void 0?void 0:t.panel)&&this.fireActivePanelChange(i)}doSetGroupAndPanelActive(e){var t;super.doSetGroupActive(e);let i=this.activePanel;e&&this.hasMaximizedGroup()&&!this.isMaximizedGroup(e)&&this.exitMaximizedGroup(),!this._moving&&i!==((t=this._onDidActivePanelChange.value)===null||t===void 0?void 0:t.panel)&&this.fireActivePanelChange(i)}getNextGroupId(){let e=this.options.groupIdGenerator;if(!e){let t=this.nextGroupId.next();for(;this._groups.has(t);)t=this.nextGroupId.next();return t}for(let t=0;t<cd;t++){let i=e();if(typeof i!="string"||i.length===0)throw new TypeError("dockview: groupIdGenerator must return a non-empty string");if(!this._groups.has(i))return i}throw new Error(`dockview: groupIdGenerator returned an id already in use ${cd} times in a row`)}createGroup(e){var t;(t=e)!==null&&t!==void 0||(e={});let i=e?.id;i&&this._groups.has(e.id)&&(console.warn(`dockview: Duplicate group id ${e?.id}. reassigning group id to avoid errors`),i=void 0),i||(i=this.getNextGroupId());let r=new vr(this,i,e);if(r.init({params:{},accessor:this}),!this._groups.has(r.id)){let o=new V(r.model.onTabDragStart(s=>{var n;(n=this._advancedDnDService)===null||n===void 0||n.dispatchWillDragPanel(s)}),r.model.onGroupDragStart(s=>{var n;(n=this._advancedDnDService)===null||n===void 0||n.dispatchWillDragGroup(s)}),r.model.onMove(s=>{let{groupId:n,itemId:a,target:l,index:d,tabGroupId:h}=s;this.moveGroupOrPanel({from:{groupId:n,panelId:a,tabGroupId:h},to:{group:r,position:l,index:d}})}),r.model.onDidDrop(s=>{this._onDidDrop.fire(s)}),r.model.onWillDrop(s=>{var n;(n=this._advancedDnDService)===null||n===void 0||n.dispatchWillDrop(s)}),r.model.onWillShowOverlay(s=>{var n;if(this.options.disableDnd){s.preventDefault();return}(n=this._advancedDnDService)===null||n===void 0||n.dispatchWillShowOverlay(s)}),r.model.onUnhandledDragOver(s=>{this._onUnhandledDragOver.fire(s)}),r.model.onDidAddPanel(s=>{this._moving||this._onDidAddPanel.fire(s.panel)}),r.model.onDidRemovePanel(s=>{this._moving||this._onDidRemovePanel.fire(s.panel)}),r.model.onDidActivePanelChange(s=>{var n;this._moving||s.panel===this.activePanel&&((n=this._onDidActivePanelChange.value)===null||n===void 0?void 0:n.panel)!==s.panel&&this.fireActivePanelChange(s.panel)}),r.model.onDidPanelTitleChange(()=>{this._bufferOnDidLayoutChange.fire("panelTitle")}),r.model.onDidPanelParametersChange(()=>{this._bufferOnDidLayoutChange.fire("panelParameters")}));this._groups.set(r.id,{value:r,disposable:o})}return r.initialize(),r}createPanel(e,t){var i,r,o;let s=e.component,n=(i=e.tabComponent)!==null&&i!==void 0?i:this.options.defaultTabComponent,a=new jd(this,e.id,s,n),l=new ri(e.id,s,n,this,this._api,t,a,{renderer:e.renderer,minimumWidth:e.minimumWidth,minimumHeight:e.minimumHeight,maximumWidth:e.maximumWidth,maximumHeight:e.maximumHeight});return l.init({title:(r=e.title)!==null&&r!==void 0?r:e.id,params:(o=e?.params)!==null&&o!==void 0?o:{}}),l}sizingForDrop(e){return this.options.dropSizing==="distribute"?Le.Distribute:Le.Split(e.length===0?0:e[e.length-1])}createGroupAtLocation(e,t,i,r=this.gridview){let o=this.createGroup(i);return this.doAddGroup(o,e,t,r),this.setGroupLocationForRoot(o,r),o}setGroupLocationForRoot(e,t){var i;let r=(i=this._popoutWindowService)===null||i===void 0?void 0:i.entries.find(o=>o.gridview===t);if(r){e.model.renderContainer!==r.overlayRenderContainer&&(e.model.renderContainer=r.overlayRenderContainer),e.model.dropTargetContainer=r.dropTargetContainer,e.model.location={type:"popout",getWindow:r.getWindow,popoutUrl:r.popoutUrl};return}e.model.renderContainer!==this.overlayRenderContainer&&(e.model.renderContainer=this.overlayRenderContainer),e.model.dropTargetContainer=this.rootDropTargetContainer,e.model.location=t===this.gridview?{type:"grid"}:{type:"floating"}}getGridviewForGroup(e){var t,i;let r=(t=this._floatingGroupService)===null||t===void 0?void 0:t.findByGroup(e);if(r)return r.gridview;let o=(i=this._popoutWindowService)===null||i===void 0?void 0:i.findByGroup(e);return o?o.gridview:this.gridview}nestedWindowMembers(e){let t=this.getGridviewForGroup(e);return t===this.gridview?[]:this.groups.filter(i=>t.element.contains(i.element))}findGroup(e){var t;return(t=Array.from(this._groups.values()).find(i=>i.value.model.containsPanel(e)))===null||t===void 0?void 0:t.value}orientationAtLocation(e,t=this.gridview){let i=t.orientation;return e.length%2==1?i:ht(i)}updateTheme(){var e,t,i,r,o,s;let n=(e=this._options.theme)!==null&&e!==void 0?e:Av;(t=this._shellThemeClassnames)===null||t===void 0||t.setClassNames(n.className);let a=(i=n.gap)!==null&&i!==void 0?i:0;this.gridview.margin=a;for(let c of this.nestedGridviews())c.margin=a;if((r=this._shellManager)===null||r===void 0||r.updateTheme(a,(o=n.edgeGroupCollapsedSize)!==null&&o!==void 0?o:35),n.dndOverlayBorder===void 0){var l;this.element.style.removeProperty("--dv-drag-over-border"),(l=this._shellManager)===null||l===void 0||l.element.style.removeProperty("--dv-drag-over-border")}else{var d;this.element.style.setProperty("--dv-drag-over-border",n.dndOverlayBorder),(d=this._shellManager)===null||d===void 0||d.element.style.setProperty("--dv-drag-over-border",n.dndOverlayBorder)}n.dndOverlayMounting==="absolute"?this.rootDropTargetContainer.disabled=!1:this.rootDropTargetContainer.disabled=!0;let h=((s=n.tabGroupIndicator)!==null&&s!==void 0?s:"wrap")==="none";B(this.element,"dv-tab-group-indicator-none",h),this._shellManager&&B(this._shellManager.element,"dv-tab-group-indicator-none",h);for(let c of this.groups)c.model.updateTabGroups()}};var R_=ns();var N_=Number.MAX_SAFE_INTEGER;function il(e,t){return new Ng(e,t).api}var ws=9,ol="dsh-quick-launch-bar:workspace-layout:v1",Bg=200;function rl(e,t){let i="http://www.w3.org/2000/svg",r=document.createElementNS(i,"svg");r.setAttribute("viewBox","0 0 24 24"),r.setAttribute("width",String(t)),r.setAttribute("height",String(t)),r.setAttribute("fill","none"),r.setAttribute("stroke","currentColor"),r.setAttribute("stroke-width","1.6"),r.setAttribute("stroke-linecap","round"),r.setAttribute("stroke-linejoin","round"),r.setAttribute("aria-hidden","true"),r.setAttribute("focusable","false");let o=document.createElementNS(i,"path");return o.setAttribute("d",e),r.append(o),r}function Wg(e){return e.status!=="exited"?"running":e.exitCode===0?"exited":"failed"}function Hg(e,t){return!e||e.status!=="exited"?t("dock.running"):typeof e.exitCode=="number"?t("dock.exitCode",{code:String(e.exitCode)}):t("dock.exited")}function $g(){try{let e=localStorage.getItem(ol);if(!e)return null;let t=JSON.parse(e);return!t||t.version!==1||typeof t.layout!="object"?null:t.layout}catch{return null}}function sl({t:e,sessions:t,notify:i,requestNewTerminal:r,closeTerminal:o}){let s=null,n=!1,a=!1,l=!1,d=!1,h=null,c=0,u=()=>{},p=[],v=new Map;function g(){if(s)try{localStorage.setItem(ol,JSON.stringify({version:1,layout:s.toJSON()}))}catch{}}function m(){c||(c=setTimeout(()=>{c=0,n||g()},Bg))}function f(W,_){if(!s||n)return;let y=s.getPanel(W.id);if(y)return y;let P=_&&_.panels.length>0?_:s.activeGroup&&s.activeGroup.panels.length>0?s.activeGroup:s.groups.length>0?s.groups[s.groups.length-1]:void 0;return s.addPanel({id:W.id,component:"terminal",title:W.title||W.id,params:{terminalId:W.id},...P?{position:{referenceGroup:P,direction:"within"}}:{}})}function S(W,_){_.update(W)}function w(){if(!s||n)return;let W=t.getSnapshot(),_=new Set;for(let y of W.terminals){_.add(y.id);let P=v.get(y.id);P&&S(y,P)}for(let y of[...s.panels])if(!_.has(y.id))try{s.removePanel(y)}catch{}if(a)for(let y of W.terminals)s.getPanel(y.id)||f(y)}function D(){if(!(!h||!s)){d=!0,i(e("workspace.groupLimit",{count:ws}),"error");try{s.fromJSON(h)}catch{}setTimeout(()=>{d=!1},0)}}function T(W){return{element:t.paneFor(W),init(){t.mount(W)},dispose(){},focus(){t.focus(W)},layout(){t.fit(W)},update(){}}}function R(W){let _=document.createElement("div");_.className="ql-tab",_.dataset.testid="ql-tab";let y=document.createElement("span");y.className="ql-tab-dot";let P=document.createElement("span");P.className="ql-tab-title";let k=document.createElement("button");k.type="button",k.className="ql-tab-close",k.dataset.testid="ql-tab-close",k.append(rl("M6 6l12 12M18 6L6 18",12)),_.append(y,P,k);let G=null;k.addEventListener("pointerdown",H=>H.stopPropagation()),k.addEventListener("click",H=>{H.preventDefault(),H.stopPropagation(),o(W)});let I={update(H){y.dataset.status=H?Wg(H):"running",_.title=Hg(H,e)}};return{element:_,init(H){P.textContent=H.title||W,k.setAttribute("aria-label",e("dock.closeNamed",{title:H.title||W})),v.set(W,I),G=H.api.onDidTitleChange(U=>{P.textContent=U.title,k.setAttribute("aria-label",e("dock.closeNamed",{title:U.title}))}),I.update(t.getTerminal(W))},dispose(){v.delete(W),G?.dispose()}}}function x(W){let _=document.createElement("button");return _.type="button",_.className="ql-group-add",_.dataset.testid="ql-group-add",_.title=e("workspace.new"),_.setAttribute("aria-label",e("workspace.new")),_.append(rl("M12 5v14M5 12h14",14)),_.addEventListener("pointerdown",y=>y.stopPropagation()),_.addEventListener("click",y=>{y.preventDefault(),y.stopPropagation(),r(W)}),{element:_,init(){},dispose(){}}}function C(){let W=document.createElement("div");W.className="ql-term-empty",W.dataset.testid="ql-term-empty";let _=document.createElement("p");_.className="ql-term-empty-title",_.textContent=e("workspace.emptyTitle");let y=document.createElement("p");y.className="ql-term-empty-hint",y.textContent=e("workspace.emptyHint");let P=document.createElement("button");return P.type="button",P.className="ql-button ql-button-small ql-term-empty-action",P.dataset.testid="ql-term-empty-new",P.textContent=e("workspace.new"),P.addEventListener("click",()=>r(void 0)),W.append(_,y,P),{element:W,init(){},dispose(){}}}function L(W){s||n||(a=!1,s=il(W,{theme:{name:"dsh-quick-launch",className:"ql-term-theme",colorScheme:"dark"},disableFloatingGroups:!0,dndStrategy:"pointer",defaultRenderer:"always",dropSizing:"distribute",closeEmptyGroups:!0,noPanelsOverlay:"watermark",defaultTabComponent:"terminal-tab",createComponent:({id:_})=>T(_),createTabComponent:({id:_})=>R(_),createWatermarkComponent:()=>C(),createRightHeaderActionComponent:_=>x(_)}),p=[s.onWillMutateLayout(()=>{d||l||(h=s.toJSON())}),s.onDidLayoutChange(_=>{if(!n){if(!d&&!l&&s.groups.length>ws){D();return}_.reasons.has("structure")&&m()}}),s.onDidRemovePanel(_=>{n||d||l||t.getTerminal(_.id)&&o(_.id)})],u=t.subscribe(()=>w()),window.addEventListener("pagehide",g),h=null)}function M(W){if(!(!s||n)){l=!0;try{let _=$g();if(_)try{s.fromJSON(_)}catch{s.clear()}let y=new Set(W.map(P=>P.id));for(let P of[...s.panels])if(!y.has(P.id))try{s.removePanel(P)}catch{}s.groups.length>ws&&s.clear();for(let P of W)f(P);w()}finally{l=!1}a=!0,h=s.toJSON(),m()}}function O(){if(!n){c&&(clearTimeout(c),c=0),g(),n=!0,a=!1,window.removeEventListener("pagehide",g),u(),u=()=>{};for(let W of p)W.dispose();p=[],v.clear(),s?.dispose(),s=null}}return{add:f,dispose:O,mount:L,restore:M}}var Fg={"name-empty":"form.invalidName","name-too-long":"form.nameTooLong","path-empty":"form.invalidPath","path-absolute":"form.pathAbsolute","path-missing":"form.pathMissing","command-empty":"form.invalidCommand","command-too-long":"form.commandTooLong","cwd-absolute":"form.cwdAbsolute","cwd-missing":"form.cwdMissing"},Vg={network:"error.network",unauthorized:"error.auth",forbidden:"error.auth","http-401":"error.auth","http-403":"error.auth","terminal-limit":"error.terminalLimitShort","path-missing":"error.pathMissing","cwd-missing":"error.cwdMissing","open-failed":"error.openFailed","shell-unavailable":"error.shellUnavailable","terminal-not-found":"error.terminalGone","picker-busy":"error.pickBusy","pick-failed":"error.pickFailed"},qg=/\.(?:exe|lnk|bat|cmd|com|msi)$/iu;function Ug(e){let t=e.split(/[\\/]/u).pop()||"",i=t.lastIndexOf(".");return i>0?t.slice(0,i):t}function Kg(e){return qg.test(e||"")}function pt(e,t){if(e instanceof qe){if(e.code==="terminal-limit")return t("toast.terminalLimit",{count:Ut});let i=Vg[e.code];if(i!==void 0)return t(i);if(e.message)return e.message}return t("error.unknown")}function Yg(){return typeof crypto<"u"&&typeof crypto.randomUUID=="function"?crypto.randomUUID():`ql-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,10)}`}function Xg(e,t){let i={id:t,type:e.type,name:e.name.trim(),note:e.note.trim()};return e.type==="open"?{...i,path:e.path.trim()}:{...i,command:e.command.trim(),cwd:e.cwd.trim(),autoClose:e.autoClose===!0}}function jg(e,t){return e.name.trim()?e.type==="open"&&!e.path.trim()?{field:"path",message:t("form.invalidPath")}:e.type==="command"&&!e.command.trim()?{field:"command",message:t("form.invalidCommand")}:null:{field:"name",message:t("form.invalidName")}}function nl({React:e,t,Terminal:i,FitAddon:r,xtermCss:o,dockviewCss:s,icons:n,getPickDirectory:a}){let{useState:l,useEffect:d,useRef:h,useCallback:c}=e,{Lightning:u,Folder:p,AppWindow:v,TerminalIcon:g,Pencil:m,Trash:f}=n,S=`${o}
${s}
${Ha}`;function w({t:x,shortcut:C,disabled:L,onRun:M,onEdit:O,onDelete:W}){let _=C.type==="command"?g:Kg(C.path)?v:p,y=C.type==="open"?C.path:C.command;return e.createElement("li",{className:"ql-card","data-testid":"ql-card"},e.createElement("button",{type:"button",className:"ql-card-open","aria-label":x("card.run",{name:C.name}),onClick:M}),e.createElement("span",{className:"ql-card-icon","aria-hidden":"true"},e.createElement(_,{size:18})),e.createElement("span",{className:"ql-card-main"},e.createElement("span",{className:"ql-card-name"},C.name),e.createElement("span",{className:"ql-card-target",title:y},y)),e.createElement("span",{className:"ql-card-actions"},e.createElement("button",{type:"button",className:"ql-icon-button","data-testid":"ql-card-edit","aria-label":x("card.editNamed",{name:C.name}),title:x("card.edit"),disabled:L,onClick:O},e.createElement(m,{size:15})),e.createElement("button",{type:"button",className:"ql-icon-button ql-icon-button-danger","data-testid":"ql-card-delete","aria-label":x("card.deleteNamed",{name:C.name}),title:x("card.delete"),disabled:L,onClick:W},e.createElement(f,{size:15}))))}function D({t:x,mode:C,initial:L,pickDirectory:M,onCancel:O,onSubmit:W}){let[_,y]=l(()=>({type:L&&L.type==="command"?"command":"open",name:L?L.name:"",path:L&&L.path||"",command:L&&L.command||"",cwd:L&&L.cwd||"",autoClose:!!(L&&L.autoClose),note:L&&L.note||""})),[P,k]=l(null),[G,I]=l(!1),[H,U]=l(!1),re=x(C==="edit"?"form.editTitle":"form.createTitle"),b=()=>{G||O()},z=X=>Z=>{let oe=Z.target,pe=oe.type==="checkbox"?oe.checked:oe.value;y(xe=>({...xe,[X]:pe}))},K=async X=>{if(!(M===null||H)){U(!0);try{let Z=await M();Z&&y(oe=>({...oe,[X]:Z}))}catch{}finally{U(!1)}}},Y=async()=>{if(!H){U(!0),k(null);try{let X=await Ia(x("form.pickFileTitle"));X&&y(Z=>({...Z,path:X,name:Z.name.trim()===""?Ug(X):Z.name}))}catch(X){k({field:"path",message:pt(X,x)})}finally{U(!1)}}},q=async X=>{if(X.preventDefault(),G)return;let Z=jg(_,x);if(Z){k(Z);return}I(!0),k(null);try{await W(_)}catch(oe){I(!1);let pe=oe instanceof qe&&oe.fieldErrors.length>0?oe.fieldErrors[0]:null,xe=pe&&pe.reason?Fg[pe.reason]:void 0;k({field:pe&&pe.field,message:xe!==void 0?x(xe):pe&&pe.message||pt(oe,x)})}},se=X=>P&&P.field===X?!0:void 0;return e.createElement("div",{className:"ql-overlay",onMouseDown:X=>{X.target===X.currentTarget&&b()}},e.createElement("form",{className:"ql-modal",role:"dialog","aria-modal":"true","aria-label":re,"data-testid":"ql-form",onSubmit:q,noValidate:!0},e.createElement("div",{className:"ql-modal-head"},e.createElement("h2",{className:"ql-modal-title"},re)),e.createElement("div",{className:"ql-modal-body"},P!==null&&e.createElement("p",{className:"ql-field-error",role:"alert"},P.message),e.createElement("fieldset",{className:"ql-fieldset"},e.createElement("legend",{className:"ql-legend"},x("form.type")),e.createElement("div",{className:"ql-radio-row"},e.createElement("label",{className:"ql-radio"},e.createElement("input",{type:"radio",name:"quick-launch-type",value:"open","data-testid":"ql-form-type-open",checked:_.type==="open",onChange:()=>y(X=>({...X,type:"open"}))}),e.createElement("span",null,x("type.open"))),e.createElement("label",{className:"ql-radio"},e.createElement("input",{type:"radio",name:"quick-launch-type",value:"command","data-testid":"ql-form-type-command",checked:_.type==="command",onChange:()=>y(X=>({...X,type:"command"}))}),e.createElement("span",null,x("type.command"))))),e.createElement("label",{className:"ql-field"},e.createElement("span",{className:"ql-label"},x("form.name")),e.createElement("input",{className:"ql-input","data-testid":"ql-form-name",value:_.name,placeholder:x("form.namePlaceholder"),"aria-invalid":se("name"),onChange:z("name"),autoFocus:!0})),_.type==="open"?e.createElement("div",{className:"ql-field"},e.createElement("label",{className:"ql-label",htmlFor:"ql-form-path-input"},x("form.path")),e.createElement("div",{className:"ql-field-row"},e.createElement("input",{id:"ql-form-path-input",className:"ql-input","data-testid":"ql-form-path",value:_.path,placeholder:x("form.pathPlaceholder"),"aria-invalid":se("path"),onChange:z("path")}),M!==null&&e.createElement("button",{type:"button",className:"ql-button ql-button-small",disabled:H,onClick:()=>{K("path")}},x("form.pickDirectory")),e.createElement("button",{type:"button",className:"ql-button ql-button-small","data-testid":"ql-form-pick-file",disabled:H,onClick:()=>{Y()}},x(H?"form.picking":"form.pickFile"))),e.createElement("span",{className:"ql-field-hint"},x("form.pathHint"))):e.createElement(e.Fragment,null,e.createElement("label",{className:"ql-field"},e.createElement("span",{className:"ql-label"},x("form.command")),e.createElement("textarea",{className:"ql-textarea","data-testid":"ql-form-command",value:_.command,placeholder:x("form.commandPlaceholder"),"aria-invalid":se("command"),onChange:z("command"),spellCheck:!1})),e.createElement("div",{className:"ql-field"},e.createElement("label",{className:"ql-label",htmlFor:"ql-form-cwd-input"},x("form.cwd")),e.createElement("div",{className:"ql-field-row"},e.createElement("input",{id:"ql-form-cwd-input",className:"ql-input","data-testid":"ql-form-cwd",value:_.cwd,placeholder:x("form.cwdPlaceholder"),"aria-invalid":se("cwd"),onChange:z("cwd")}),M!==null&&e.createElement("button",{type:"button",className:"ql-button ql-button-small",onClick:()=>{K("cwd")}},x("form.pickDirectory")))),e.createElement("label",{className:"ql-check"},e.createElement("input",{type:"checkbox","data-testid":"ql-form-autoclose",checked:_.autoClose,onChange:z("autoClose")}),e.createElement("span",null,x("form.autoClose")))),e.createElement("label",{className:"ql-field"},e.createElement("span",{className:"ql-label"},x("form.note")),e.createElement("input",{className:"ql-input","data-testid":"ql-form-note",value:_.note,placeholder:x("form.notePlaceholder"),onChange:z("note")}))),e.createElement("div",{className:"ql-modal-foot"},e.createElement("button",{type:"button",className:"ql-button","data-testid":"ql-form-cancel",onClick:b,disabled:G},x("form.cancel")),e.createElement("button",{type:"submit",className:"ql-button ql-button-primary","data-testid":"ql-form-save",disabled:G},x(G?"form.saving":"form.save")))))}function T({t:x,shortcut:C,onCancel:L,onConfirm:M}){let[O,W]=l(!1),[_,y]=l(""),P=async()=>{if(!O){W(!0),y("");try{await M()}catch(k){W(!1),y(x("toast.deleteFailed",{message:pt(k,x)}))}}};return e.createElement("div",{className:"ql-overlay",onMouseDown:k=>{k.target===k.currentTarget&&!O&&L()}},e.createElement("div",{className:"ql-modal ql-modal-small",role:"dialog","aria-modal":"true","aria-label":x("confirm.title")},e.createElement("div",{className:"ql-modal-head"},e.createElement("h2",{className:"ql-modal-title"},x("confirm.title"))),e.createElement("div",{className:"ql-modal-body"},e.createElement("p",{className:"ql-dialog-text"},x("confirm.body",{name:C.name})),_!==""&&e.createElement("p",{className:"ql-field-error",role:"alert"},_)),e.createElement("div",{className:"ql-modal-foot"},e.createElement("button",{type:"button",className:"ql-button",onClick:L,disabled:O},x("confirm.cancel")),e.createElement("button",{type:"button",className:"ql-button ql-button-danger","data-testid":"ql-confirm-delete",onClick:()=>{P()},disabled:O},x(O?"confirm.deleting":"confirm.confirm")))))}function R(x){let C=x.t||t,L=h(null);L.current===null&&(L.current=Wa({Terminal:i,FitAddon:r}));let M=L.current,O=h(null),W=h(null),_=h(()=>{}),y=h(()=>{}),P=h(()=>{}),[k,G]=l({status:"loading",shortcuts:[],error:null,blocked:!1}),[I,H]=l(""),[U,re]=l(null),[b,z]=l(null),K=h(0),Y=c(async()=>{G(J=>({...J,status:"loading"}));try{let J=await za();G({status:"ready",shortcuts:Array.isArray(J&&J.shortcuts)?J.shortcuts:[],error:null,blocked:!1}),H("")}catch(J){G({status:"error",shortcuts:[],error:J,blocked:J instanceof qe&&J.code==="store-corrupt"})}},[]);d(()=>{Y()},[Y]),d(()=>{let J=O.current;if(!J)return;let ae=!1,Rt=sl({t:C,sessions:M,notify:(ot,Dt)=>_.current(ot,Dt),requestNewTerminal:ot=>y.current(ot),closeTerminal:ot=>P.current(ot)});return W.current=Rt,Rt.mount(J),M.load().then(ot=>{ae||(Rt.restore(ot),M.openStream())}).catch(()=>{}),()=>{ae=!0,W.current=null,Rt.dispose(),M.dispose()}},[M]),d(()=>()=>{K.current&&clearTimeout(K.current)},[]),d(()=>{if(U===null)return;let J=ae=>{ae.key==="Escape"&&re(null)};return document.addEventListener("keydown",J),()=>document.removeEventListener("keydown",J)},[U]);let q=k.status==="ready",se=a()||null,X=(J,ae="info")=>{K.current&&clearTimeout(K.current),z({text:J,tone:ae}),K.current=setTimeout(()=>{K.current=0,z(null)},3e3)};_.current=X;let Z=()=>{q&&(H(""),re({kind:"form",mode:"create",index:-1,shortcut:null}))},oe=(J,ae)=>{q&&(H(""),re({kind:"form",mode:"edit",index:ae,shortcut:J}))},pe=J=>{q&&(H(""),re({kind:"delete",shortcut:J}))},xe=async J=>{if(U===null||U.kind!=="form")return;let ae=U.mode==="edit"?U.shortcut.id:Yg(),Rt=Xg(J,ae),ot=U.mode==="edit"?k.shortcuts.map((Dt,hl)=>hl===U.index?Rt:Dt):[...k.shortcuts,Rt];try{await No(ot)}catch(Dt){throw(!(Dt instanceof qe)||Dt.fieldErrors.length===0)&&H(pt(Dt,C)),Dt}G({status:"ready",shortcuts:ot,error:null,blocked:!1}),H(""),re(null)},ne=async()=>{if(U===null||U.kind!=="delete")return;let J=k.shortcuts.filter(ae=>ae.id!==U.shortcut.id);try{await No(J)}catch(ae){throw H(pt(ae,C)),ae}G({status:"ready",shortcuts:J,error:null,blocked:!1}),H(""),re(null)},ni=async J=>{if(J.type==="open"){try{await Aa(J.path),X(C("toast.opened",{name:J.name}))}catch(ae){X(C("toast.openFailed",{name:J.name,message:pt(ae,C)}),"error")}return}if(M.count()>=Ut){X(C("toast.terminalLimit",{count:Ut}),"error");return}try{let ae=await M.create({kind:"shortcut",name:J.name,command:J.command,cwd:J.cwd||void 0,autoClose:J.autoClose===!0});W.current?.add(ae)}catch(ae){X(C("toast.createFailed",{message:pt(ae,C)}),"error")}},dl=async J=>{if(M.count()>=Ut){X(C("toast.terminalLimit",{count:Ut}),"error");return}try{let ae=await M.create({kind:"blank",name:C("dock.blank")});W.current?.add(ae,J??void 0)}catch(ae){X(C("toast.createFailed",{message:pt(ae,C)}),"error")}},ll=async J=>{try{await M.close(J)}catch(ae){X(C("toast.closeFailed",{message:pt(ae,C)}),"error")}};y.current=J=>{dl(J)},P.current=J=>{ll(J)};let Li=null;return k.status==="loading"?Li=e.createElement("p",{className:"ql-loading"},C("page.loading")):k.shortcuts.length>0?Li=e.createElement("ul",{className:"ql-list"},k.shortcuts.map((J,ae)=>e.createElement(w,{key:J.id,t:C,shortcut:J,disabled:!q,onRun:()=>{ni(J)},onEdit:()=>oe(J,ae),onDelete:()=>pe(J)}))):k.status==="ready"&&(Li=e.createElement("div",{className:"ql-empty","data-testid":"ql-empty"},e.createElement("span",{className:"ql-empty-icon","aria-hidden":"true"},e.createElement(u,{size:34,strokeWidth:1.4})),e.createElement("p",{className:"ql-empty-title"},C("empty.title")),e.createElement("p",{className:"ql-empty-hint"},C("empty.hint")),e.createElement("button",{type:"button",className:"ql-button ql-button-primary ql-empty-action",onClick:Z,disabled:!q},C("page.add")))),e.createElement("div",{className:"ql-page","data-testid":"ql-page"},e.createElement("style",{"data-plugin-css":"dsh-quick-launch-bar"},S),e.createElement("aside",{className:"ql-side"},e.createElement("div",{className:"ql-side-head"},e.createElement("h1",{className:"ql-title"},C("page.title")),e.createElement("button",{type:"button",className:"ql-button ql-button-primary","data-testid":"ql-add",onClick:Z,disabled:!q},C("page.add"))),e.createElement("div",{className:"ql-side-body"},k.error!==null&&k.error!==void 0&&e.createElement("div",{className:"ql-error",role:"alert"},e.createElement("span",{className:"ql-error-text"},k.blocked?C("store.corrupt"):`${C("error.load")}：${pt(k.error,C)}`),e.createElement("button",{type:"button",className:"ql-button ql-button-small",onClick:()=>{Y()}},C("error.retry"))),I!==""&&e.createElement("div",{className:"ql-error",role:"alert"},e.createElement("span",{className:"ql-error-text"},C("error.save"),"：",I)),Li)),e.createElement("section",{className:"ql-workspace"},e.createElement("div",{className:"ql-workspace-host","data-testid":"ql-workspace",ref:O})),b!==null&&e.createElement("div",{className:"ql-toast","data-testid":"ql-toast","data-tone":b.tone,role:"status"},e.createElement("span",{className:"ql-toast-dot","aria-hidden":"true"}),e.createElement("span",null,b.text)),U!==null&&U.kind==="form"&&e.createElement(D,{key:U.mode==="edit"?U.shortcut.id:"create",t:C,mode:U.mode,initial:U.shortcut,pickDirectory:se,onCancel:()=>re(null),onSubmit:xe}),U!==null&&U.kind==="delete"&&e.createElement(T,{t:C,shortcut:U.shortcut,onCancel:()=>re(null),onConfirm:ne}))}return R}var Jg="dsh-quick-launch-bar",al="quick-launch";window.__ModuleLoader__.load({id:Jg,factory(e){let t=e("react"),i=Pa(t),r=["slots","locale"];function o(s){s.effect(()=>{let d=s.locale.register(ti,"zh",Ro.zh),h=s.locale.register(ti,"en",Ro.en);return()=>{d(),h()}},"quick-launch: dictionaries");let n=s.locale.bind(ti),a=nl({React:t,t:n,Terminal:ka,FitAddon:Ss,xtermCss:Da,dockviewCss:Ea,icons:i,getPickDirectory:()=>{let d=s.get("uiWorkspace");if(!(!d||typeof d.pickDirectory!="function"))return d.pickDirectory.bind(d)}});function l({size:d}){return t.createElement(i.Lightning,{size:d})}s.slots.inject("main",()=>s.slots.register({name:"main",key:al,locale:ti},a)),s.slots.inject("sidebar.panellist",()=>s.slots.register({name:"sidebar.panellist",id:al,order:-10,locale:ti,label:()=>n("panel.label")},l))}return{inject:r,apply:o}}});})();
/*! Bundled license information:

@xterm/addon-fit/lib/addon-fit.mjs:
@xterm/xterm/lib/xterm.mjs:
  (**
   * Copyright (c) 2014-2024 The xterm.js authors. All rights reserved.
   * @license MIT
   *
   * Copyright (c) 2012-2013, Christopher Jeffrey (MIT License)
   * @license MIT
   *
   * Originally forked from (with the author's permission):
   *   Fabrice Bellard's javascript vt100 for jslinux:
   *   http://bellard.org/jslinux/
   *   Copyright (c) 2011 Fabrice Bellard
   *)

dockview-core/dist/package/main.esm.mjs:
  (**
   * dockview-core
   * @version 8.9.0
   * @link https://github.com/dockview/dockview
   * @license MIT
   *)
*/
