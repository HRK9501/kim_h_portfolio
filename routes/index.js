var express = require('express');
var router = express.Router();
var mysql = require('mysql');


const sql = require('../utils/sql');

/* GET home page. */
router.get('/', (req, res) => {

  console.log('at the main route')

  res.render('index', { title: 'my other page', layout: 'home' });
});


router.get('/about', (req, res) => {

  console.log('at the about route')

  res.render('about');
});



// router.get('/', (req, res) => {

//   console.log('at the home route')

//   res.render('home');
// });


router.get('/work', (req, res, next) => {
  // should really get the user data here and then fetch it thru, but let's try this asynchronously
  console.log('at the work route');

  let query = `SELECT ID, HeaderImg, FaceTitle, category FROM tbl_project`;

  sql.query(query, (err, result) => {
    if (err) { throw err; console.log(err); }

    console.log(result); // should see objects wrapped in an array

    // render the home view with dynamic data
    res.render('work', { works: result });
  })
});


router.get('/work/:id', (req, res) => {

  console.log('at the project route');
  console.log(req.params);


  let query = `SELECT HeaderImg, ProjectTitle, ProjectText, BodyVideo, BodyImg FROM tbl_project WHERE ID = "${req.params.id}"`;

  sql.query(query, (err, result) => {
    if (err) { throw err; console.log(err); }

    console.log(result);


    result[0].images = result[0].BodyImg.split(",").map(function (item) {
      item = item.trim();

      return item;
    })
    res.render('project', result[0]);
  })
});




router.get('/contact', (req, res) => {

  console.log('at the contact route')

  res.render('contact');
});


module.exports = router;
