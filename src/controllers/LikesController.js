const Devs = require('../model/Devs');

module.exports = {
    async store(req, res){
        console.log(req.params.devId);
        const { devId } = req.params;
        const { user } = req.headers;
        console.log('user ', user);
        
        
        const logged = await Devs.findById(user);
        const targetUser = await Devs.findById(devId);

        if(!targetUser){
            return res.status(400).json({ error: 'Dev does not exist'});
        }

        if(targetUser.likes.includes(logged._id)){
            console.log("Match!");
        }
        
        logged.likes.push(targetUser._id);
        await logged.save();
        res.json(logged);
    } 
};