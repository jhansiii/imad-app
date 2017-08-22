var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool=require('pg').Pool;
var config = {
    user:'jhansinambala',
    database:'jhansinambala',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password:process.env.DB_PASSWORD
    
};

var app = express();
app.use(morgan('combined'));


var articles ={

artone1: {
title:'article one',
heading:'article one goes here',
date:'august 10',
content:`
<p>
                the whole content goes here.the whole content goes here.the whole content goes here.the whole content goes here.the whole content goes here.the whole content goes here.the whole content goes here.the whole content goes here.the whole content goes here.
            </p>
             <p>
                the whole content goes here.the whole content goes here.the whole content goes here.the whole content goes here.the whole content goes here.the whole content goes here.the whole content goes here.the whole content goes here.the whole content goes here.
            </p>
             <p>
                the whole content goes here.the whole content goes here.the whole content goes here.the whole content goes here.the whole content goes here.the whole content goes here.the whole content goes here.the whole content goes here.the whole content goes here.
            </p> `
},
arttwo :{
    title:'article two',
heading:'article two goes here',
date:'august 14',
content:`
<p>
                the whole content goes here.the whole content goes here.the whole content goes here.the whole content goes here.the whole content goes here.the whole content goes here.the whole content goes here.the whole content goes here.the whole content goes here.
            </p>
             <p>
                the whole content goes here.the whole content goes here.the whole content goes here.the whole content goes here.the whole content goes here.the whole content goes here.the whole content goes here.the whole content goes here.the whole content goes here.
            </p>
             <p>
                the whole content goes here.the whole content goes here.the whole content goes here.the whole content goes here.the whole content goes here.the whole content goes here.the whole content goes here.the whole content goes here.the whole content goes here.
            </p> `
},
artthree : { 
    title:'article three',
heading:'article three goes here',
date:'august 16',
content:`
<p>
                the whole content goes here.the whole content goes here.the whole content goes here.the whole content goes here.the whole content goes here.the whole content goes here.the whole content goes here.the whole content goes here.the whole content goes here.
            </p>
             <p>
                the whole content goes here.the whole content goes here.the whole content goes here.the whole content goes here.the whole content goes here.the whole content goes here.the whole content goes here.the whole content goes here.the whole content goes here.
            </p>
             <p>
                the whole content goes here.the whole content goes here.the whole content goes here.the whole content goes here.the whole content goes here.the whole content goes here.the whole content goes here.the whole content goes here.the whole content goes here.
            </p> `

}
};
function createTemplate (data) {
var title = data.title;
var date=data.date;
var heading=data.heading;
var content=data.content;


var htmlTemplate=  `
     <html>
  <head>
      <title>
          ${title}
      </title>
      <meta name="viewport" content="width-device-width, initial-scale=1"/>
       <link href="/ui/style.css" rel="stylesheet" />
     
  </head>  
    <body>
  <div class="container">
        <div>
            <a href="/">home</a>
            </div>
            <hr/>
            <h3>
              ${heading}
            </h3>
            <div>
               ${date.toDateString()}
            </div>
            <div>
            ${content}
            </div>
  </div>      
    </body>
    
</html>
`;
return htmlTemplate;    
}
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
var pool= new Pool(config);
app.get('/test-db',function(req,res){
pool.query('SELECT * FROM test',function(err,result){
    if(err){
        res.status(500).send(err.toString());
    }
    else{
        res.send(JSON.stringify(result.rows));
    }
    
});    
});
var counter=0;
app.get('/counter',function(req,res){
    counter=counter+1;
    res.send(counter.toString());
    });
    
    var names=[];
app.get('/submit-name',function(req,res){
    var name=req.query.name;
    
    names.push(name);
    res.send(JSON.stringify(names));
});


app.get('/articles/:articleName', function (req, res) {
   pool.query("SELECT * FROM artone1 WHERE title = ' "+req.params.articleName + "'",function(err,result){
       if(err){
           res.status(500).send(err.toString());
       }else{
           if(result.rows.length===0){
               res.status(404).send('Article not found');
           }else{
               var articleData = result.rows[0];
 res.send(createTemplate(articleData));
           }
       }
   });
});


app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
