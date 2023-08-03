var roleHarvester =  require('role.harvester');
var roleUpgrader =  require('role.upgrader');
var roleRepairDef = require("role.repair");
var rolebuilder = require("role.builder");

module.exports.loop = function () {
    //memory clearance
    for(var i in Memory.creeps) {
        if(!Game.creeps[i]) {
            delete Memory.creeps[i];
        }
    }
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.ticksToLive >10) { 
            if(creep.memory.role =="harvester") { 
                roleHarvester.run(creep);
            }
            if(creep.memory.role =="harvester2") { 
                roleHarvester2.run(creep);
            }
            if (creep.memory.role == "upgrader") { 
                roleUpgrader.run(creep);   
            }
            if (creep.memory.role == "repair") { 
                roleRepairDef.run(creep);   
            }
            if (creep.memory.role == "builder") { 
                rolebuilder.run(creep);   
            }
        } else { 
                    if(creep.memory.role =="harvester")  {
                        Game.spawns["Spawn1"].spawnCreep([WORK,WORK,CARRY,CARRY,MOVE], "Harvester"+Game.time, {memory: { role: "harvester"}});   
                    }
                    if(creep.memory.role =="harvester2")  {
                        Game.spawns["Spawn1"].spawnCreep([WORK,WORK,CARRY,CARRY,MOVE], "2Harvester"+Game.time, {memory: { role: "harvester2"}});   
                    }
                    if (creep.memory.role =="upgrader"){ 
                         Game.spawns["Spawn1"].spawnCreep([WORK,WORK,WORK,CARRY,MOVE], "upgrader"+Game.time, {memory: { role: "upgrader"}});   
                    }
                    if (creep.memory.role =="repair"){
                        Game.spawns["Spawn1"].spawnCreep([WORK,CARRY,CARRY,MOVE], "repair"+Game.time, {memory: { role: "repair"}});      
                        
                    }
                    if (creep.memory.role =="builder"){
                        Game.spawns["Spawn1"].spawnCreep([WORK,WORK,CARRY,CARRY,MOVE], "builder"+Game.time, {memory: { role: "builder"}});      
                        
                    }
                    if(creep.memory.role =="harvester") { 
                        roleHarvester.run(creep);
                    }
                    if(creep.memory.role =="harvester2") { 
                        roleHarvester2.run(creep);
                    }
                    if (creep.memory.role == "upgrader") { 
                        roleUpgrader.run(creep);   
                    }
                    if (creep.memory.role == "repair") { 
                        roleRepairDef.run(creep);   
                    }
                    if (creep.memory.role == "builder") { 
                        rolebuilder.run(creep);   
                    }
                
            }
        }  
    }
    
