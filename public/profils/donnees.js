function getBaseURL () {
    return location.protocol + "//" + location.hostname + (location.port && ":" + location.port) + "/";
 }

 async function getProfil_list() {
    try {
      const response = await axios.get(getBaseURL()+'api/v1/profil/all');
        if(response.status==200) return response.data;

    }catch(error){
        console.log(error);
    }
}





getProfil_list().then(

    response=>{
      
        console.log(response.data.length)
          
        console.log(t)
        if(response.data.length >0){

            response.data.map(data=>{
                   console.log(data)
             });

        }
        

    }
)