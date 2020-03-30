var express = require('express');
var router = express.Router();
var mysql = require('mysql');

const connect = require('../utils/sql');



/* GET home page. */
router.get('/', (req, res) => {

    console.log('at the main route')

    res.render('index', { title: 'my other page', layout: 'home' });
});



router.get('/about', (req, res) => {
  console.log('at the about route')

  res.render('about');
});


router.get('/work', (req, res, next) => {
  connect.getConnection((err, connection) => {
    if (err) { return console.log(err.message); }
  
    let query = `SELECT ID, HeaderImg, FaceTitle, category FROM tbl_project`;
  
    connect.query(query, (err, result) => {
      connection.release();

      if (err) {return console.log(err.message);}

      console.log(result);
  
      res.render('work', { works: result });
    });
  });
});





router.get('/work/:FaceID', (req, res) => {
  connect.getConnection((err, connection) =>{
    if (err) { return console.log(err.message); }
  
    let query = `SELECT HeaderImg, ProjectTitle, ProjectText, BodyVideo, BodyImg FROM tbl_project WHERE ID = "${req.params.FaceID}"`;

    connect.query(query, (err, result) => {
      connection.release();

      if (err) {return console.log(err.message);}

      console.log(result);

      result[0].images = result[0].BodyImg.split(",").map(function (item) {
        item = item.trim();
  
        return item;
      })
      res.render('project', result[0]);
    });
  });    
});    













router.get('/contact', (req, res) => {
  connect.getConnection((err, connection) =>{
    if (err) { return console.log(err.message); }
  
    let query = `... quert goes here.`;
  
    connect.query(query, (err, rows) => {
      connection.release();
  
      if (err) {
        return console.log(err.message);
      }
  
      console.log(rows);
  
      res.render('page', {data: rows});
    })
  })
  

  console.log('at the contact route')

  res.render('contact');
});


module.exports = router;
