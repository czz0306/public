app.factory("ajaxServer",function($http,$q){
    var factory={
        ajax:function(type,url,data){
            var def=$q.defer();
            if(type=="jsonp"||type=="JSONP"){
                $.ajax({
                    url:url,
                    dataType:"jsonp",
                    success:function(res){
                        def.resolve(res);
                    },
                    error:function(err){
                        def.reject(err);
                    }
                });
                return def.promise;
            }else{
                $http({
                    url:url,
                    data:data||null,
                    method:type||"get"
                }).then(function(res){
                    def.resolve(res)
                },function(err){
                    def.reject(err)
                })
            }
            return def.promise;
        }
    };
    return factory;
});