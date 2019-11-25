const Devs = require('../model/Devs');

module.exports = {
    async store(req, res){
        console.log(req.params.devId);
        const { devId } = req.params;
        const { user } = req.headers;
        console.log('logged user ', user);
        
        const logged = await Devs.findById(user);
        const targetUser = await Devs.findById(devId);

        if(!targetUser){
            return res.status(400).json({ error: 'Dev does not exist'});
        }

        logged.dislikes.push(targetUser._id);
        await logged.save();
        res.json(logged);
    } 
};