function fetch_and_display_routes()
{
    var xhr = get_post_by_endpoint("findRoutesByStopName/run");

    var streetname = $("#streetname").val();
    var params = '{ "params": {"stopName": "%"}}';

    if(streetname !== undefined && streetname !== ""){
         params =  '{ "params": {"stopName": "%'+streetname+'%"}}';
    }

    xhr.onload = function(){
        var routes_array = JSON.parse(xhr.responseText);
        var routes_interate = routes_array["rows"];
        var html = "";

        $.each( routes_interate, function( index, value ){
            var title = value.longName+" - "+value.shortName;
            var id = value.id;
            var dateString = "";
            if(!empty(value.lastModifiedDate)){
                dateString = DateFormat.format.prettyDate(value.lastModifiedDate);
            }

             html = html + "<li>" + "<a href='javascript:open_route_detail(\"" + id + "\")'>" + "<h2>" + title + "</h2>" + "<p>" + dateString + "</p></a></li>";
        });

        $("#routes").html(html);
        $("#routes").listview("refresh");
    }
    xhr.send(params);
}

function open_route_detail(link)
{
    //stops
    var xhr = get_post_by_endpoint("findStopsByRouteId/run");
    var params =  '{ "params": {"routeId": '+link+'}}';

    xhr.onload = function(){
        var stops_array = JSON.parse(xhr.responseText);
        var stops_interate = stops_array.rows;

        stops_interate.sort(sort_by_sequence);
        var html = "";

        $.each( stops_interate, function( index, value ){
            var title = value.name;
            html = html + "<li><h2 class='h2-wrap'>" + title+ "</h2></li>";
        });

        $("#stops-list").html(html);
        $("#stops-list").listview("refresh");
    }
    xhr.send(params);

    //departures
    var xhr2 = get_post_by_endpoint("findDeparturesByRouteId/run");
    var params =  '{ "params": {"routeId": '+link+'}}';

    xhr2.onload = function(){
        var dep_array = JSON.parse(xhr2.responseText);
        var dep_interate = dep_array.rows;

        var arr_we = [];
        var arr_sa = [];
        var arr_su = [];

        $.each( dep_interate, function( index, value ){

            switch(value.calendar) {
                case "WEEKDAY":
                    arr_we.push(value);
                    break;
                case "SATURDAY":
                    arr_sa.push(value);
                    break;
                case "SUNDAY":
                    arr_su.push(value);
                    break;
            }

        });

        var contWe = 0;
        var htmlWe = "";
        $.each(arr_we, function( index, value ){
            var title = value.time;
            if((contWe == 0) || (contWe%4 == 0)){
                htmlWe += "<tr>";
            }
            htmlWe += "<td>" + title+ "</td>";
            contWe++;
            if((contWe%4 == 0) || (arr_we.length == index -1)){
                htmlWe += "</tr>";
            }
        });
        $("#tbody-weekday").html(htmlWe);

        if(!empty(arr_sa)){
            var contSa = 0;
            var htmlSa = "";
            $.each(arr_sa, function( index, value ){
                var title = value.time;
                if((contSa == 0) || (contSa%4 == 0)){
                    htmlSa += "<tr>";
                }
                htmlSa += "<td>" + title+ "</td>";
                contSa++;
                if((contSa%4 == 0) || (arr_sa.length == index -1)){
                    htmlSa += "</tr>";
                }
            });
            $("#tbody-saturday").html(htmlSa);
            $("#saturday-coll").show();
        }else{
            $("#saturday-coll").hide();
        }

        if(!empty(arr_su)){
            var contSu = 0;
            var htmlSu = "";
            $.each(arr_su, function( index, value ){
                var title = value.time;
                if((contSu == 0) || (contSu%4 == 0)){
                    htmlSu += "<tr>";
                }
                htmlSu += "<td>" + title+ "</td>";
                contSu++;
                if((contSu%4 == 0) || (arr_su.length == index -1)){
                    htmlSu += "</tr>";
                }
            });
            $("#tbody-sunday").html(htmlSu);
            $("#sunday-coll").show();
        }else{
            $("#sunday-coll").hide();
        }



    }
    xhr2.send(params);


    $(":mobile-pagecontainer").on("pagecontainershow", function(){
        if($.mobile.activePage.attr('id') == "pagetwo"){
            $( "#stops-btn" ).click();
        }
    });
    $(":mobile-pagecontainer").pagecontainer("change", "#pagetwo", { reverse: false, reload: true});

}

