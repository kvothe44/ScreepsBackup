/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.mover');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    run: function(creep) { 
    
        if (creep.carry.energy == 0) {
                creep.memory.working = false
        }
        if(creep.carry.energy < creep.carryCapacity && creep.memory.working ==false) {
            var sources = creep.room.find(FIND_DROPPED_RESOURCES,RESOURCE_ENERGY);
            if(creep.pickup(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffffff'}});
                creep.say("pickingup!")
            }
        } else {
            creep.memory.working = true
            var targets = creep.room.find(FIND_STRUCTURES, {filter: (s) => (s.structureType == STRUCTURE_SPAWN || s.structureType == STRUCTURE_EXTENSION ) && s.energy < s.energyCapacity});
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    creep.say("transfering")
                }
            }
        }   
    }
};