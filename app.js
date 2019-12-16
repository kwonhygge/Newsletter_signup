//jshint version:6
const bodyParser=require("body-parser");
const express=require("express");
const request=require("request");

const app=express();
app.use(bodyParser.urlencoded({extended:true}));

//bootstrap은 원격 경로이지만, css와 image는 아니기 때문에 localhost로 접속헀을 때
//가져올 수 없음 그래서 static 씀
app.use(express.static("public"))

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
    var firstName=req.body.fName;
    var lastName=req.body.lName;
    var email=req.body.email;

    var data={
        members: [
            {email_address:email,
            status: "subscribed"
            }
        ]
    };

    var jsonData = JSON.stringify(data);
    
    var options = {
        url:'https://us4.api.mailchimp.com/3.0/lists/'+AUDIENCE_ID,
        method:"POST",//authrize 해줘야 함, 구글링 하기
        headers:{
            "Authorization":"Dory1 "+API_KEY
        },
        body:jsonData
    };
    request(options,function(error,response,body){
        if(error){
            res.sendFile(__dirname+"/failure.html");
        }else{
            if (response.statusCode===200){
                res.sendFile(__dirname+"/success.html");
            }
            else{
                res.sendFile(__dirname+"/failure.html");
            }
            
        }
    });
});

app.post("/failure",function(req,res){
    res.redirect("/");
});


app.listen(3000,function(){
    console.log("Server is running on port 3000");
});