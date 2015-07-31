requirejs.config(
  enforceDefine: true
  baseUrl: '/'
  paths:
    backbone: '/bower_components/backbone/backbone'
    jquery: '/bower_components/jquery/jquery'
    bootstrap: '/bower_components/bootstrap/dist/js/bootstrap'
    'jquery.ui.core': '/bower_components/jquery-ui/ui/jquery.ui.core'
    'jquery.ui.mouse': '/bower_components/jquery-ui/ui/jquery.ui.mouse'
    'jquery.ui.widget': '/bower_components/jquery-ui/ui/jquery.ui.widget'
    'jquery.ui.sortable': '/bower_components/jquery-ui/ui/jquery.ui.sortable'
    'jquery.ui.effect': '/bower_components/jquery-ui/ui/jquery.ui.effect'
    swfobject: '/bower_components/swfobject/swfobject/swfobject'
    underscore: '/bower_components/underscore/underscore'
    handlebars: '/bower_components/handlebars/handlebars'
    templates: 'lib/templates'
  shim:
    backbone:
      deps: [ 'underscore', 'jquery' ]
      exports: 'Backbone'
    underscore:
      exports: '_'
    bootstrap:
      deps: [ 'jquery' ]
      exports: '$'
    'jquery.ui.core':
      deps: [ 'jquery' ]
      exports: '$'
    'jquery.ui.mouse':
      deps: [ 'jquery', 'jquery.ui.widget' ]
      exports: '$'
    'jquery.ui.widget':
      deps: [ 'jquery' ]
      exports: '$'
    'jquery.ui.sortable':
      deps: [ 'jquery', 'jquery.ui.core', 'jquery.ui.mouse', 'jquery.ui.widget' ]
      exports: '$'
    'jquery.ui.effect':
      deps: [ 'jquery' ]
      exports: '$'
    handlebars:
      exports: 'Handlebars'
    swfobject:
      exports: 'swfobject'
)