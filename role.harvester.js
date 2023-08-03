var roleHarvester = { 
    run: function(creep,mover) {
            var sources = creep.room.find(FIND_SOURCES).sort();
            if(creep.harvest(sources[creep.memory.number % sources.length]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[creep.memory.number % sources.length], {visualizePathStyle: {stroke: '#ffffff'}});
            }
            creep.drop(RESOURCE_ENERGY);
    }
};

module.exports = roleHarvester; 