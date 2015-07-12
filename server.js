var express = require('express')
var hashtable = require('hashtable')
var beacons = require('./beacons.json')
var app = express()

var datas = new hashtable()
function createBeacon(uuid, content) {
  return {
    uuid: uuid,
    content: content
  }
}

beacons.forEach(function(beacon) {
  datas.put(beacon.uuid, createBeacon(beacon.uuid, beacon.content))
})

app.get('/:uuid', function (req, res) {
  var uuid = req.params.uuid
  var beaconInfo = datas.get(uuid)
  if (beaconInfo) {
    res.send(datas.get(uuid))
  } else {
    res.status(404).send('Can\'t find the ' + uuid + ' beacon')
  }
})

var server = app.listen(3000)
