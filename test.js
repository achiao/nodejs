let promise = new Promise(function(resolve, reject) {
  setTimeout(() => resolve("done!"), 1000);
});
async function first() {
   return await promise.then(()=> {
     return new Promise(function(resolve){
	setTimeout(()=>{
           console.log('in settimeout');
	   resolve('fileURL')
	}, 1000)
     });
   })
   console.log(aaa);
}

(async () => {
  const fileURL = await first();
  console.log(fileURL);
})();
