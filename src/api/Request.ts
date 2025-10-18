export async function my_request(endpoint:string){
    //Truy van den endpoint
    const response = await fetch(endpoint);

    //Neu bi tra ve loi
    if(!response.ok){
        throw new Error(response.statusText);
    }

    //Tra ve Json neu ok
    return response.json();
}
