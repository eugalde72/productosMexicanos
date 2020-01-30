async function codeAddress() {
    var ip = "";
    var xciudad = "";
    var xpais = "";
    await $.ajax({
        type:"GET",
        datatype:"json",
        url:"https://ipapi.co/json/", //1000 requests per day
        success:function(data){
            ip=data.ip;
            xciudad=data.city;
            xpais=data.country_name;
            //alert("IP = " + ip + " Ciudad =" + xciudad+" Pais = "+xpais)
        },
        error:function(data){
            alert("Error")
        }
    })

    var json = {
        pais:"",
        productos:"",
        ip:ip,
        xciudad:xciudad,
        xpais:xpais
    }

    //alert("json :"+ JSON.stringify(json))

    $.ajax({
        type: "POST",
        //url: "http://localhost:560/productosmexicanos",
        url: "https://quieroproductosdemexico.com:560/productosmexicanos",
        data:json,
        success:function(data){
            document.getElementById("in").disabled = true;

        },
        error:function(data){
            alert("Error al enviar su Encuesta");
        }
    });
}








async function go(pais, productos){
    //console.log(pais);
    //console.log(productos);
    //alert("Pais: "+pais+"  productos: "+productos);

    if(productos=="") {
        alert("Por favor debe describir los productos");
        return;
    }

    var ip = "";
    var xciudad = "";
    var xpais = "";
    await $.ajax({
        type:"GET",
        datatype:"json",
        url:"https://ipapi.co/json/", //1000 requests per day
        success:function(data){
            ip=data.ip;
            xciudad=data.city;
            xpais=data.country_name;
        },
        error:function(data){
            alert("Error")
        }
    })

    var json = {
        pais:pais,
        productos:productos,
        ip:ip,
        xciudad:xciudad,
        xpais:xpais
    }

    $.ajax({
        type: "POST",
        //url: "http://localhost:560/productosmexicanos",
        url: "https://quieroproductosdemexico.com:560/productosmexicanos",
        data:json,
        success:function(data){
            document.getElementById("in").disabled = true;
            document.getElementById("xpais").disabled = true;
            document.getElementById("ta").disabled = true;
            document.getElementById("in").style.backgroundColor="gray";
            alert("Muchas Gracias por participar!!!!")

        },
        error:function(data){
            alert("Error al enviar su Encuesta");
        }
    });

}
