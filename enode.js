#!/usr/bin/env node

require('./ed2k/globals.js');

const ed2kTCPServer = require('./ed2k/tcpserver.js');
const ed2kUDPServer = require('./ed2k/udpserver.js');
const storage = require('./storage/storage.js');
const conf = require('./enode.config.js').config;

storage.init(function(){

    ed2kTCPServer.run(false, conf.tcp.port, function(){
        ed2kUDPServer.run(false, conf.udp.port);
    });

    if (conf.supportCrypt) {
        ed2kTCPServer.run(true, conf.tcp.portObfuscated, function(){
            ed2kUDPServer.run(true, conf.udp.portObfuscated);
        });
    }

});
