import jwt from 'jsonwebtoken';
import axios from 'axios';
export default function handler(req, res) {
    // Retrieve the login credentials from the request body
    const  usermobile  = req.body.usermobile;
    if (usermobile !== '') {
        console.log(usermobile)
        // Generate a JWT token
        const decoded = jwt.verify(usermobile, process.env.MYKEY);
        // Return the token as a response
        console.log(decoded)
       
        axios.post(`${process.env.API_URL}Website/UserProfileData.php`, { updatekey: process.env.MYKEY, mob: decoded.userM }).then((response) => {
            console.log(response.data);
            if (response.data.statusdata == true) {
                const userData = response.data;
                // const Newtoken = CryptoJS.AES.encrypt(
                //     JSON.stringify(userData),
                //     process.env.CryptoJSKEY
                // ).toString();
                res.status(200).json({ usertype: true, userData: userData });
            } else {
                res.status(200).json({ usertype: false });
            }
        });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
}
