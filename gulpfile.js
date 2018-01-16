var gulp=require("gulp");
var server=require("gulp-webserver");
var fs=require("fs");
var path=require("path");
var url=require("url");

gulp.task("server",function(){
    gulp.src("./")
        .pipe(server({
            port:8080,
            host:"localhost",
            livereload:true,
            directoryListing:{
                path:"./",
                enable:true
            },
            open:true,
            middleware:function(req,res,next){
                var urlObj=url.parse(req.url);
                var mockDataFile=path.join(__dirname,"Data",urlObj.query+".json");
                fs.exists(mockDataFile,function(exist){
                    if(!exist){
                        res.writeHead(404,{
                            "Content-Type":"text/json;charset=UTF-8"
                        });
                        res.end("404")
                    }else{
                        fs.readFile(mockDataFile,function(err,result){
                            if(err) return  console.error(err);
                            res.writeHead(200,{
                                "Content-Type":"text/json;charset=UTF-8",
                                "Access-Control-Allow-Origin":"*"
                            });
                            res.end(result.toString());
                        })
                    }
                })
            }
        }))
});