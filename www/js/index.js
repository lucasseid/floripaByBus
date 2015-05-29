function fetch_and_display_routes()
{
    var xhr = new XMLHttpRequest();
    xhr.open("POST", get_baseurl_for_call()+"findRoutesByStopName/run");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("X-AppGlu-Environment", "staging");

    var streetname = $("#streetname").val();
    var params = '{ "params": {"stopName": "%"}}';

    if(streetname !== undefined && streetname !== ""){
         params =  '{ "params": {"stopName": "%'+streetname+'%"}}';
    }

    xhr.onload = function(){
        var routes_array = JSON.parse(xhr.responseText);
        var routes_interate = routes_array["rows"];
        var html = "";

        console.log(routes_array);
        console.log(routes_interate);
        $.each( routes_interate, function( index, value ){
            var title = value.longName+" - "+value.shortName;
            var id = value.id;
            var date = value.lastModifiedDate;

             html = html + "<li>" + "<a href='javascript:open_route_detail(\"" + id + "\")'>" + "<h2>" + title + "</h2>" + "<p>" + date + "</p></a></li>";
        });

        console.log(html);
        $("#routes").html(html);
        $("#routes").listview("refresh");
    }
    xhr.send(params);
}

function get_baseurl_for_call(){
    return "https://WKD4N7YMA1uiM8V:DtdTtzMLQlA0hk2C1Yi5pLyVIlAQ68@api.appglu.com/v1/queries/";
}

function open_route_detail(link)
{
   return false;
}
