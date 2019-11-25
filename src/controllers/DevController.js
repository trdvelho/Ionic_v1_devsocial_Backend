const axios = require('axios');
const Dev = require('../model/Devs');

module.exports = {
    async index (req, res){
        const { user } = req.headers;
        console.log('User ', user);
        
        const logged = await Dev.findById(user);

        //const logged = await Dev.find(loggedDev);

        const users = await Dev.find({
            $and: [
                {_id: {$ne: user}},
                {_id: {$nin: logged.likes}},
                {_id: {$nin: logged.dislikes}}
            ]
        });

        return res.json(users);
    },

    async store(req, res){
        const uExists = await Dev.findOne({user: req.body.username});
        console.log('Pass is ', req.body.pass, 'user ', req.body.username);
        if(uExists){
            if(uExists.pass == req.body.pass){
                return res.status(200).json(uExists);
            }

            else {
                return res.status(500).json({error: 'Wrong password'});
            }
        }

        else {
            try {
                //console.log('user ', req.query.username, ' pass ', req.query.pass,);
                const response = await axios.get(`https://api.github.com/users/${req.body.username}`);
                console.log('user ', response);
                const {name, bio, avatar_url} = response.data;
                const dev = await Dev.create({
                    name,
                    pass: req.body.pass,
                    user: req.body.username,
                    bio,
                    avatar: avatar_url
                });
            
                return res.status(200).json(dev);
            }
            catch(error){
                 return res.status(400).json({error: error});
            }
        }
    }
};