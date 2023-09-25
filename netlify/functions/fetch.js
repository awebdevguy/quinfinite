require("dotenv").config();
import fetch from 'node-fetch'

exports.handler = async function(event, context) {

  const params = await event.queryStringParameters;
  const {count} = params;
  const {KEY} = process.env;
  // const url = getSelectedURL(source);

  console.log(params);
  console.log(count);
  
    let resp;
  
    // if(source === 'pexels') {
    //   resp = await fetch(url, {
    //     headers: {
    //       'Authorization': PEXELS_KEY
    //     }
    //   });
    // } else {
      resp = await fetch(`https://api.unsplash.com/photos/random?client_id=${KEY}&count=${count}`);
    // }
  
    console.log(resp);
    const data = await resp.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    }
  
  // use url of selected source
  // function getSelectedURL(source) {

  //   console.log(source);
  //   switch(source) {
  //     case 'pexels':
  //       return `https://api.pexels.com/v1/search?query=${search}&page=${page}&per_page=${per_page}`;
  //     case 'pixabay':
  //       return `https://pixabay.com/api/?key=${PIXABAY_KEY}&q=${search}&page=${page}&per_page=${per_page}`;
  //     case 'unsplash':
  //       return `https://api.unsplash.com/search/photos?client_id=${UNSPLASH_KEY}&query=${search}&page=${page}&per_page=${per_page}`;
  //   }
  // }
}
