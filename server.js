var express = require('express')
var beaconHashtable = require('node-hashtable')
var beacons = require('./beacons.json')
var app = express()


function createBeacon(uuid, content) {
  return {
    uuid: uuid,
    content: content
  }
}

beacons.forEach(function(beacon) {
  beaconHashtable.set(beacon.uuid, createBeacon(beacon.uuid, beacon.content))
})

app.get('/:uuid', function (req, res) {
  var uuid = req.params.uuid
  var beaconInfo = beaconHashtable.get(uuid)
  if (beaconInfo) {
    res.send(beaconHashtable.get(uuid))
  } else {
    res.status(404).send('Can\'t find the ' + uuid + ' beacon')
  }
})

var server = app.listen(3000)
