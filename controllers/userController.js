import User from '../models/User.js';
import { generateToken } from '../utils/auth.js';
import errorHandler from '../utils/handleError.js';

const registerUser = async (req, res) => {
    const { username, password, confirmPassword } = req.body;
    if (!confirmPassword) {
        res.status(400).json({error: 'No Password, please input password'});
        return;
    }
    if (password !== confirmPassword){
        res.status(400).json({error: 'Passwords do not match'});
        return;
    }

    try {
        const newUser = new User({username, password});
        await newUser.save();
        const payload = {
            _id: newUser._id,
            username: newUser.username
        };
        const token = generateToken(payload);
        res.setHeader('X-User-ID', newUser._id);
        res.status(201).json({token: token});
    } catch (error){
        errorHandler(error, res);
    }
}

const loginUser = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password){
        res.status(400).json({error: 'Fill in the missing fields'});
        return;
    }

    try {
        const user = await User.findByCredentials(
            username,
            password
        );
        if (!user){
            res.status(404).json({error: 'User not found.'});
            return;
        }
        const payload = {
            _id: user._id,
            username: user.username
        };
        const token = generateToken(payload);
        res.setHeader('X-User-ID', user._id);
        res.status(200).json({token: token});
    } catch (error){
        errorHandler(error, res);
    }
};

const updateUser = async (req, res) => {
    const { _id } = req.user;
    const { username, password } = req.body;
    try {
        const user = await User.findById(_id);
        if (!user) {
            res.status(404).json({ error: 'No user found.' });
            return;
        }
        if (username) {
            user.username = username;
        }
        if (password) {
            user.password = password;
        }        
        await user.save();
    
        const { password: _, __v: __, ...userWithoutSensitiveData } = user._doc;    
        res.status(201).json({ user: userWithoutSensitiveData });
    } catch (error){
        errorHandler(error, res);
    }
};

export { registerUser, loginUser, updateUser };
