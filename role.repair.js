/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.repair');
 * mod.thing == 'a thing'; // true
 */

var roleRepairDef = {
    
    /** @param {Creep} creep **/
    run: function(creep) {
        
        
	    if(creep.memory.repairing && creep.carry.energy == 0) {
            creep.memory.repairing = false;
	    }
	    
	    if(!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.repairing = true;
	    }

	    if(creep.memory.repairing) {
	        var targets = creep.room.find(FIND_STRUCTURES, { filter: (s) => (s.hits < s.hitsMax) && !(s.structureType == STRUCTURE_RAMPART || s.structureType == STRUCTURE_WALL)});
	        if(targets.length > 0) {
                if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0],{visualizePathStyle: {stroke: '#00ff00'}});
                }
	        } else { 
	            var targets = creep.room.find(FIND_STRUCTURES, { filter: (s) => (s.hits < s.hitsMax) && (s.hits <50000) && (s.structureType == STRUCTURE_RAMPART || s.structureType == STRUCTURE_WALL)});
	            if(targets.length > 0) {
                    if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0],{visualizePathStyle: {stroke: '#00ff00'}});
                    }
	            }
	        }     
	    } else {
	        var sources = creep.room.find(FIND_DROPPED_RESOURCES,RESOURCE_ENERGY);
            if(creep.pickup(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffffff'}});
                creep.say("pickingup!")
            }
	    }   
    }
}
module.exports = roleRepairDef;


