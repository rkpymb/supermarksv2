import axios from 'axios';
export default function handler(req, res) {
    
    if (req.method === 'POST') {
        axios.post(`${process.env.API_URL}GetMYTestlist.php`, { updatekey: process.env.MYKEY, userid: req.body.usermobnow })
            .then((rest) =>
                res.status(200).json(rest.data));
    } else {

    }
}