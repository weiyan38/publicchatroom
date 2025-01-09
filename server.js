import express from 'express';


// => express server set up 

const exapp = express();

exapp.use(express.static('dist')); // server static files from the public folder

// start the express server 

exapp.listen(8000, () => {
    console.log("Server is running on http://localhost:8000");
});








