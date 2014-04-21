
module.exports = function(pagerun){
    var self = this;
    var bOpenUrl = false;
    pagerun.on('proxyStart', function(msg){
        var proxy = msg.proxy;
        proxy.addFilter(function(httpData, next){
            if(bOpenUrl === true){
                var responseCode = httpData.responseCode;
                if(/^[45]\d\d$/.test(responseCode)){
                    self.result({
                        url: httpData.url,
                        code: responseCode
                    });
                }
            }
            next();
        });
    });
    pagerun.on('webdriverOpenUrl', function(){
        bOpenUrl = true;
    });
};