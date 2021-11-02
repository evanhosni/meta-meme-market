var src

document.addEventListener('DOMContentLoaded', async () => {

  const signResponse = await fetch('/api/upload');
  const signData = await signResponse.json();

  const url = "https://api.cloudinary.com/v1_1/" + signData.cloudname + "/auto/upload";
  const form = document.querySelector("form");

  form.addEventListener("change", (e) => {
      e.preventDefault();
  
      const files = document.querySelector("[type=file]").files;
      const formData = new FormData();
  
      // Append parameters to the form data. The parameters that are signed using 
      // the signing function (signuploadform) need to match these.
      for (let i = 0; i < files.length; i++) {
          let file = files[i];
          formData.append("file", file);
          formData.append("api_key", signData.apikey);
          formData.append("timestamp", signData.timestamp);
          formData.append("signature", signData.signature);
          formData.append("eager", "c_pad,h_300,w_400|c_crop,h_200,w_260");
  
          fetch(url, {
              method: "POST",
              body: formData
          })
          .then((response) => {
              return response.text();
          })
          .then((data) => {
              console.log(JSON.parse(data))
              src = JSON.stringify(JSON.parse(data).url, null, 4);
              document.getElementById("choose_meme").style.display = "none";
              document.getElementById("meme_img").innerHTML = `<img class="meme" src=${src}>`;
          });
      }
  });
})

const yeet = document.getElementById("yeet")
yeet.addEventListener("click", (e) => {
  e.preventDefault();
  var title = document.getElementById("meme_title").value
  var numberShares = document.getElementById("number_shares").value
  var sharePrice = document.getElementById("share_price").value
  
  const memeObj={
      img: src,
      title: `"${title}"`,
      number_shares: numberShares,
      share_price: sharePrice,
      is_initial: true,
      created_at: 11 / 1 / 2021,
      user_id: 1
    }
    fetch("/api/users/login",{
        method:"POST",
        body:JSON.stringify(memeObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
          location.href = "/meme/:id"
        } else {
            alert("trumpet sound")
        }
    })
})


// //DRAG AND DROP
// function dropHandler(ev) {
//   console.log('File(s) dropped');

//   // Prevent default behavior (Prevent file from being opened)
//   ev.preventDefault();

//   if (ev.dataTransfer.items) {
//     // Use DataTransferItemList interface to access the file(s)
//     for (var i = 0; i < ev.dataTransfer.items.length; i++) {
//       // If dropped items aren't files, reject them
//       if (ev.dataTransfer.items[i].kind === 'file') {
//         var file = ev.dataTransfer.items[i].getAsFile();
//         console.log('... file[' + i + '].name = ' + file.name);
//       }
//     }
//   } else {
//     // Use DataTransfer interface to access the file(s)
//     for (var i = 0; i < ev.dataTransfer.files.length; i++) {
//       console.log('... file[' + i + '].name = ' + ev.dataTransfer.files[i].name);
//     }
//   }
// }
// function dragOverHandler(ev) {
//   console.log('File(s) in drop zone');

//   // Prevent default behavior (Prevent file from being opened)
//   ev.preventDefault();
// }