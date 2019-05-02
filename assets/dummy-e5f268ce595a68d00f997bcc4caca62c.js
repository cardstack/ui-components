"use strict"
define("dummy/app",["exports","dummy/resolver","ember-load-initializers","dummy/config/environment"],function(e,t,n,r){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var o=Ember.Application.extend({modulePrefix:r.default.modulePrefix,podModulePrefix:r.default.podModulePrefix,Resolver:t.default});(0,n.default)(o,r.default.modulePrefix)
var l=o
e.default=l}),define("dummy/components/cta",["exports","@cardstack/ui-components/components/cta"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("dummy/components/freestyle-annotation",["exports","ember-freestyle/components/freestyle-annotation"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("dummy/components/freestyle-collection",["exports","ember-freestyle/components/freestyle-collection"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("dummy/components/freestyle-dynamic-input-select-option",["exports","ember-freestyle/components/freestyle-dynamic-input-select-option"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("dummy/components/freestyle-dynamic-input",["exports","ember-freestyle/components/freestyle-dynamic-input"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("dummy/components/freestyle-dynamic",["exports","ember-freestyle/components/freestyle-dynamic"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("dummy/components/freestyle-guide",["exports","ember-freestyle/components/freestyle-guide"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("dummy/components/freestyle-menu",["exports","ember-freestyle/components/freestyle-menu"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("dummy/components/freestyle-note",["exports","ember-freestyle/components/freestyle-note"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("dummy/components/freestyle-notes",["exports","ember-freestyle/components/freestyle-notes"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("dummy/components/freestyle-palette-item",["exports","ember-freestyle/components/freestyle-palette-item"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("dummy/components/freestyle-palette",["exports","ember-freestyle/components/freestyle-palette"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("dummy/components/freestyle-section",["exports","ember-freestyle/components/freestyle-section"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("dummy/components/freestyle-showdown-content",["exports","ember-freestyle/components/freestyle-showdown-content"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("dummy/components/freestyle-snippet",["exports","ember-freestyle/components/freestyle-snippet"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("dummy/components/freestyle-subsection",["exports","ember-freestyle/components/freestyle-subsection"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("dummy/components/freestyle-typeface",["exports","ember-freestyle/components/freestyle-typeface"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("dummy/components/freestyle-usage-controls",["exports","ember-freestyle/components/freestyle-usage-controls"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("dummy/components/freestyle-usage",["exports","ember-freestyle/components/freestyle-usage"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("dummy/components/freestyle-variant-list",["exports","ember-freestyle/components/freestyle-variant-list"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("dummy/components/freestyle-variant",["exports","ember-freestyle/components/freestyle-variant"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("dummy/components/markdown-to-html",["exports","ember-cli-showdown/components/markdown-to-html"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("dummy/components/text-field",["exports","@cardstack/ui-components/components/text-field"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("dummy/controllers/freestyle",["exports","ember-freestyle/controllers/freestyle"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=Ember.inject,r=t.default.extend({emberFreestyle:n.service(),colorPalette:Object.freeze({primary:{name:"cyan",base:"#00bcd4"},accent:{name:"amber",base:"#ffc107"},secondary:{name:"greyish",base:"#b6b6b6"},foreground:{name:"blackish",base:"#212121"},background:{name:"white",base:"#ffffff"}})})
e.default=r}),define("dummy/freestyle-snippets",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
e.default={"fp--notes.js":"### A few notes regarding freestyle-palette\n\n- Accepts a colorPalette POJO like the one found in the freestyle.js blueprint controller\n- Looks very nice\n\nAnd another thing...\n\n###### Markdown note demonstrating prettified code\n\n```\nimport Ember from 'ember';\n\nexport default Ember.Component.extend({\n  // ...\n  colorPalette: {\n    'primary': {\n      'name': 'cyan',\n      'base': '#00bcd4'\n    },\n    'accent': {\n      'name': 'amber',\n      'base': '#ffc107'\n    }\n  }\n  // ...\n});\n```","primary-cta--notes.hbs":"        By default, `Cta` will render a primary type","primary-cta--usage.hbs":'          <Cta @type="primary">Primary Call to Action</Cta>',"secondary-cta--usage.hbs":'          <Cta @type="secondary">Secondary Call to Action</Cta>',"text-field-optional--usage.hbs":'          <TextField @label="What\'s your name?" />',"text-field-required--usage.hbs":'          <TextField @label="What\'s your name?" @required={{true}} />'}}),define("dummy/helpers/variant-eq",["exports","ember-freestyle/helpers/equal"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=Ember.Helper.helper(t.equalHelper)
e.default=n}),define("dummy/initializers/container-debug-adapter",["exports","ember-resolver/resolvers/classic/container-debug-adapter"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n={name:"container-debug-adapter",initialize:function(){var e=arguments[1]||arguments[0]
e.register("container-debug-adapter:main",t.default),e.inject("container-debug-adapter:main","namespace","application:main")}}
e.default=n}),define("dummy/initializers/ember-freestyle",["exports","dummy/config/environment"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n={name:"ember-freestyle",initialize:function(){var e=arguments[1]||arguments[0],n=t.default.modulePrefix,r=new RegExp("^".concat(n,"/(freestyle-snippets)"))
Object.keys(requirejs.entries).filter(function(e){return r.test(e)}).forEach(function(t){var n=require(t,null,null,!0).default,r=t.split("/").reverse()[0],o="config:ember-freestyle-".concat(r)
e.register(o,n,{instantiate:!1}),e.inject("service:ember-freestyle",r,o)})}}
e.default=n}),define("dummy/initializers/export-application-global",["exports","dummy/config/environment"],function(e,t){function n(){var e=arguments[1]||arguments[0]
if(!1!==t.default.exportApplicationGlobal){var n
if("undefined"!=typeof window)n=window
else if("undefined"!=typeof global)n=global
else{if("undefined"==typeof self)return
n=self}var r,o=t.default.exportApplicationGlobal
r="string"==typeof o?o:Ember.String.classify(t.default.modulePrefix),n[r]||(n[r]=e,e.reopen({willDestroy:function(){this._super.apply(this,arguments),delete n[r]}}))}}Object.defineProperty(e,"__esModule",{value:!0}),e.initialize=n,e.default=void 0
var r={name:"export-application-global",initialize:n}
e.default=r})
define("dummy/resolver",["exports","ember-resolver"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=t.default
e.default=n}),define("dummy/router",["exports","dummy/config/environment"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=Ember.Router.extend({location:t.default.locationType,rootURL:t.default.rootURL})
n.map(function(){this.route("freestyle")})
var r=n
e.default=r}),define("dummy/services/ember-freestyle",["exports","ember-freestyle/services/ember-freestyle"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("dummy/templates/application",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"QXpZwtpz",block:'{"symbols":[],"statements":[[7,"h1"],[11,"id","title"],[9],[0,"Cardstack UI Components"],[10],[0,"\\n"],[1,[23,"outlet"],false]],"hasEval":false}',meta:{moduleName:"dummy/templates/application.hbs"}})
e.default=t}),define("dummy/templates/components/freestyle-collection",["exports","ember-freestyle/templates/components/freestyle-collection"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("dummy/templates/components/freestyle-guide",["exports","ember-freestyle/templates/components/freestyle-guide"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("dummy/templates/components/freestyle-menu",["exports","ember-freestyle/templates/components/freestyle-menu"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("dummy/templates/components/freestyle-notes",["exports","ember-freestyle/templates/components/freestyle-notes"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("dummy/templates/components/freestyle-palette-item",["exports","ember-freestyle/templates/components/freestyle-palette-item"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("dummy/templates/components/freestyle-palette",["exports","ember-freestyle/templates/components/freestyle-palette"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("dummy/templates/components/freestyle-section",["exports","ember-freestyle/templates/components/freestyle-section"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("dummy/templates/components/freestyle-snippet",["exports","ember-freestyle/templates/components/freestyle-snippet"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("dummy/templates/components/freestyle-subsection",["exports","ember-freestyle/templates/components/freestyle-subsection"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("dummy/templates/components/freestyle-usage-controls",["exports","ember-freestyle/templates/components/freestyle-usage-controls"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("dummy/templates/components/freestyle-usage",["exports","ember-freestyle/templates/components/freestyle-usage"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("dummy/templates/components/freestyle-variant-list",["exports","ember-freestyle/templates/components/freestyle-variant-list"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("dummy/templates/components/freestyle-variant",["exports","ember-freestyle/templates/components/freestyle-variant"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("dummy/templates/freestyle",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"x4oPa+xD",block:'{"symbols":["collection","collection"],"statements":[[4,"freestyle-guide",null,[["title","subtitle"],["Ember Freestyle","Living Style Guide"]],{"statements":[[0,"\\n"],[4,"freestyle-section",null,[["name"],["CTA"]],{"statements":[[4,"freestyle-collection",null,[["title","defaultKey","inline"],["CTA","primary",true]],{"statements":[[4,"component",[[29,"-assert-implicit-component-helper-argument",[[24,2,["variant"]],"expected `collection.variant` to be a contextual component but found a string. Did you mean `(component collection.variant)`? (\'dummy/templates/freestyle.hbs\' @ L8:C9) "],null]],[["key"],["primary"]],{"statements":[[4,"freestyle-usage",["primary-cta"],[["title"],["Primary CTA"]],{"statements":[[0,"          "],[5,"cta",[],[["@type"],["primary"]],{"statements":[[0,"Primary Call to Action"]],"parameters":[]}],[0,"\\n"]],"parameters":[]},null]],"parameters":[]},null],[0,"\\n"],[4,"freestyle-note",["primary-cta--notes"],null,{"statements":[[0,"        By default, `Cta` will render a primary type\\n"]],"parameters":[]},null],[0,"\\n"],[4,"component",[[29,"-assert-implicit-component-helper-argument",[[24,2,["variant"]],"expected `collection.variant` to be a contextual component but found a string. Did you mean `(component collection.variant)`? (\'dummy/templates/freestyle.hbs\' @ L18:C9) "],null]],[["key"],["secondary"]],{"statements":[[4,"freestyle-usage",["secondary-cta"],[["title"],["Secondary CTA"]],{"statements":[[0,"          "],[5,"cta",[],[["@type"],["secondary"]],{"statements":[[0,"Secondary Call to Action"]],"parameters":[]}],[0,"\\n"]],"parameters":[]},null]],"parameters":[]},null]],"parameters":[2]},null]],"parameters":[]},null],[0,"\\n"],[4,"freestyle-section",null,[["name"],["TextField"]],{"statements":[[4,"freestyle-collection",null,[["title","defaultKey","inline"],["TextField","optional",true]],{"statements":[[4,"component",[[29,"-assert-implicit-component-helper-argument",[[24,1,["variant"]],"expected `collection.variant` to be a contextual component but found a string. Did you mean `(component collection.variant)`? (\'dummy/templates/freestyle.hbs\' @ L28:C9) "],null]],[["key"],["optional"]],{"statements":[[4,"freestyle-usage",["text-field-optional"],[["title"],["Optional Text Field"]],{"statements":[[0,"          "],[5,"text-field",[],[["@label"],["What\'s your name?"]]],[0,"\\n"]],"parameters":[]},null]],"parameters":[]},null],[0,"\\n"],[4,"component",[[29,"-assert-implicit-component-helper-argument",[[24,1,["variant"]],"expected `collection.variant` to be a contextual component but found a string. Did you mean `(component collection.variant)`? (\'dummy/templates/freestyle.hbs\' @ L34:C9) "],null]],[["key"],["required"]],{"statements":[[4,"freestyle-usage",["text-field-required"],[["title"],["Required Text Field"]],{"statements":[[0,"          "],[5,"text-field",[],[["@label","@required"],["What\'s your name?",true]]],[0,"\\n"]],"parameters":[]},null]],"parameters":[]},null]],"parameters":[1]},null]],"parameters":[]},null],[0,"\\n"]],"parameters":[]},null]],"hasEval":false}',meta:{moduleName:"dummy/templates/freestyle.hbs"}})
e.default=t}),define("dummy/templates/index",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"JBrTRl/K",block:'{"symbols":[],"statements":[[7,"div"],[9],[0,"New components go here"],[10]],"hasEval":false}',meta:{moduleName:"dummy/templates/index.hbs"}})
e.default=t}),define("dummy/config/environment",[],function(){try{var e="dummy/config/environment",t=document.querySelector('meta[name="'+e+'"]').getAttribute("content"),n={default:JSON.parse(decodeURIComponent(t))}
return Object.defineProperty(n,"__esModule",{value:!0}),n}catch(r){throw new Error('Could not read config from meta tag with name "'+e+'".')}}),runningTests||require("dummy/app").default.create({})
