var express = require('express')
var beaconHashtable = require('node-hashtable')
var beacons = require('./beacons.json')
var app = express()

beacons.forEach(function(beacon) {
  beaconHashtable.set(beacon.uuid, beacon)
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
