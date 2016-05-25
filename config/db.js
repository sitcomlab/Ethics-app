
// MONGODB
module.exports = {
    getConnection: function(devStatus) {
        if(devStatus) {
            // LOCAL DEVELOPMENT DATABASE
            return 'mongodb://localhost/ethics-db';
        } else {
            // PRODUCTION DATABASE ON SERVER
            return 'mongodb://localhost/ethics-db';
        }
    },
    getSuperSecret: function(){
        return 'ilovethemeanstack';
    }
};
