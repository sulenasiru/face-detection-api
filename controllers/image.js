const Clarifai  = require ('clarifai');
const app = new Clarifai.App({
 apiKey: '26c7d75d8cf947f3b8be110bae3f3bac'
});

const handleApiCall = (req, res) => {
	app.models
.predict(
  Clarifai.FACE_DETECT_MODEL,req.body.input)
.then(data => {
	res.json(data)
})
.catch(err => res.status(400).json('Unable to work with api'))
}

  

const handleImage =(req, res, db) => {
	const {id} = req.body;
	db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
     res.json(entries[0]);     
    })
    .catch(err => res.status(400).json('unable to count'))
    }
    module.exports = {
    	handleImage:handleImage,
    	handleApiCall: handleApiCall
    }


