var roleHarvester =  require('role.harvester');
var roleUpgrader =  require('role.upgrader');
var roleRepairDef = require("role.repair");
var rolebuilder = require("role.builder");
var roleMover = require("role.mover");

function getBody(segment,room) { 
    let body  = [];
    let segmentCost = _.sum(segment,s=>BODYPART_COST[s]);
    let energyAvailable = room.energyCapacityAvailable;
    let maxSeg = Math.floor(energyAvailable/segmentCost);
    _.times(maxSeg,function() { 
        _.forEach(segment,s=>body.push(s));
    });
    return body;
}

module.exports.loop = function () {
    //memory clearance
    for(var roomName in Game.rooms){//Loop through all rooms your creeps/structures are in
        var room = Game.rooms[roomName];
        for(var i in Memory.creeps) {
            if(!Game.creeps[i]) {
                delete Memory.creeps[i];
            }
        }
       
        var MinerCount =2;
        var MoverCount =2;
        var UpgraderCount=2;
        var BuilderCount=1;
        var RepairerCount = 2;
        //spawning
        var mover = _(Game.creeps).filter( { memory: { role: 'mover' } } ).size();
        var miner = _(Game.creeps).filter( { memory: { role: 'miner' } } ).size();
        var upgrader = _(Game.creeps).filter( { memory: { role: 'upgrader' } } ).size();
        var builder = _(Game.creeps).filter( { memory: { role: 'builder' } } ).size();
        var repairer = _(Game.creeps).filter( { memory: { role: 'repairer' } } ).size();
        //console.log(mover,miner)
        if (repairer <RepairerCount) { 
            Game.spawns["Spawn1"].spawnCreep(getBody([WORK,CARRY,CARRY,CARRY,MOVE],room), "Repairer"+Game.time, {memory: { role: "repairer"}}); 
        }
        if (builder<BuilderCount) { 
            Game.spawns["Spawn1"].spawnCreep(getBody([WORK,CARRY,CARRY,CARRY,MOVE],room), "Builder"+Game.time, {memory: { role: "builder"}}); 
        }
        
        if (upgrader < UpgraderCount) { 
            Game.spawns["Spawn1"].spawnCreep(getBody([WORK,CARRY,CARRY,CARRY,MOVE],room), "Upgrader"+Game.time, {memory: { role: "upgrader"}});   
        }
        
        if (mover < MoverCount) { 
            if (mover == 0) { 
                Game.spawns["Spawn1"].spawnCreep([CARRY,CARRY,MOVE], "Mover"+Game.time, {memory: { role: "mover",number: 0}});    
            } else {
                var types = Array()
                Game.spawns["Spawn1"].spawnCreep(getBody([CARRY,CARRY,CARRY,MOVE,MOVE],room), "Mover"+Game.time, {memory: { role: "mover",number: mover+1}});    
            }
        }
        
        if (miner < MinerCount) { 
            if (mover == 0 && miner ==0){
                Game.spawns["Spawn1"].spawnCreep([WORK,MOVE],"Miner"+Game.time, {memory: { role: "miner", number: 0}});   
            } else {
                if (mover =! 0) {
                    var x =0;
                    if (miner !=0) { x = _(Game.creeps).filter( { memory: { role: 'miner' } } ).value()[0].memory.number;}
                    
                    Game.spawns["Spawn1"].spawnCreep(getBody([WORK,WORK,MOVE],room), "Miner"+Game.time, {memory: { role: "miner", number: ((x+1)%2)}});
                }
            }
        }
        
        for (var name in Game.creeps) { 
            var creep = Game.creeps[name];
            if(creep.memory.role =="miner") { 
                roleHarvester.run(creep,mover);
            }
            if (creep.memory.role =="mover") { 
                roleMover.run(creep);   
            }
            if (creep.memory.role == "upgrader") { 
                    roleUpgrader.run(creep);   
            }
            if (creep.memory.role == "builder") { 
                    rolebuilder.run(creep);   
            }
            if (creep.memory.role == "repairer") { 
                    roleRepairDef.run(creep);   
            }
        }
    }
    for(var roomName in Game.rooms){//Loop through all rooms your creeps/structures are in
        var room = Game.rooms[roomName];
        console.log(room.energyCapacityAvailable);
        if(!room.memory.sources){//If this room has no sources memory yet
            console.log("hi");
            room.memory.sources = {}; //Add it
            var sources = room.find(FIND_SOURCES);//Find all sources in the current room
            for(var i in sources){
                var source = sources[i];
                source.memory = room.memory.sources[source.id] = {}; //Create a new empty memory object for this source
                //Now you can do anything you want to do with this source
                //for example you could add a worker counter:
            }
        }
    }
}