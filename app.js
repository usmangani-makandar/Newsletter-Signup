const express= require("express")
const bodyparser = require("body-parser")
const request = require("request")
const https = require("https")

const app = express()

app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended: true}))


app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html")
    // res.sendFile(__dirname+"/styles.css")
})

app.post("/",function(req,res){

      const firstname = req.body.fname;
      const lastname = req.body.lname;
      const email = req.body.email; 
      const  data = {
        members: [
          {
        email_address: email,
        status : "subscribed",
        merge_fields : {
          FNAME : firstname,
          LNAME : lastname
        } 
      }
    ]
  }

      const jsondata = JSON.stringify(data);
      const url = "https://us21.api.mailchimp.com/3.0/lists/90598dda4d";

      const options={
        method: "POST",
        auth : "Usmangani:a0a5bc29eb0d122d8f9d4145f14ac9fac-us21"
      }

    const request = https.request(url,options,function(response){


        if(response.statusCode===200){
          res.sendFile(__dirname +"/sucess.html");
        }
        else{
          res.sendFile(__dirname+"/failure.html");

        }
    
  response.on("data",function(data){
    console.log(JSON.parse(data));
  })
   
})

request.write(jsondata);
request.end();

});


app.post("/failure", function(req,res){
   res.redirect("/");
})


app.listen( process.env.PORT || 3000,function(){
    console.log("local host 3000")
})



//new one :- 0a5bc29eb0d122d8f9d4145f14ac9fac-us21


// unique id 90598dda4d