require [
  'backbone',
  'jquery'
], (Backbone, $) ->

  console.log('test')

  $.ajax(
    url: '/api/'
    type: 'GET'
    success: (result) ->
      console.log(result)
      $('body').append(JSON.stringify(result))
  )