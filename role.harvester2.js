var roleHarvester2 = { 
    run: function(creep,mover) { 
        if (mover == 0) { 
            if (creep.carry.energy == 0) {
                creep.memory.working = false
                
            }
            if(creep.carry.energy < creep.carryCapacity && creep.memory.working ==false) {
                var sources = creep.room.find(FIND_SOURCES);
                if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffffff'}});
                    creep.say("harvesting")
                }
            } else {
                creep.memory.working = true
                var targets = creep.room.find(FIND_STRUCTURES, {filter: (s) => (s.structureType == STRUCTURE_SPAWN) && s.energy < s.energyCapacity});
                if(targets.length > 0) {
                    if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                        creep.say("transfering")
                    }
                }
            }   
        } else {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffffff'}});
            }
             
            creep.drop(RESOURCE_ENERGY);
        }
    }
};

module.exports = roleHarvester2; 