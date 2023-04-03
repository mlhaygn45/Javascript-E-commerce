
 const  categoryList= document.querySelector(".category-list")
  const productlist=document.querySelector(".product-list")
  const openBtn=document.getElementById("sepet")
  const closeBtn=document.querySelector("#close-btn")
  const modal=document.querySelector(".modal-wrapper")
const modalList=document.querySelector(".modal-list")
const toplambilgi=document.querySelector("#toplam")

document.addEventListener("DOMContentLoaded",()=>{

    fetchCategories()
    fetchproduct()
})



const fetchCategories =()=>{

    fetch("https://api.escuelajs.co/api/v1/categories")
    .then(res=>res.json())
    .then(data=>
     data.slice(0,4).forEach((category)=>{
         
      const categoryDiv =  document.createElement("div") 
        
       categoryDiv.classList.add("category")
        
       categoryDiv.innerHTML=`
       
       <img src="${category.image} "/>
             
       <p>${category.name} </p>
       `
      categoryList.appendChild(categoryDiv)

     })
    
    )
    .catch(err=>console.log(err))
}

              
                 // produdct get//


           const  fetchproduct =()=>{
            fetch('https://api.escuelajs.co/api/v1/products')
            .then(res=>res.json())
            .then(data=>data.slice(1,21).forEach((product)=>{

           const productDiv = document.createElement("div")

           productDiv.classList.add("card")
           productDiv.innerHTML=`
           
           <img src="${product.images[0]} " >
           <p>${product.title} </p>
           <p>${product.category.name} </p>
           <div class="card-footer">

         <span>${product.price}  </span>
         <button onclick='sepeteEkle({ id:"${product.id}",name:"${product.title}",price:"${product.price}",img:"${product.images[0]}",amount:1 }) '>sepete ekle</button>

           
           `;
                 productlist.appendChild(productDiv)

            }))
            .catch(err)


           }     


           let sepet = []
   let toplamfiyat= 0
 function listSepet(){
  sepet.forEach((eleman)=>{
      const sepeItem=document.createElement("div")
      sepeItem.classList.add("item")
     
     sepeItem.innerHTML=`
     
     <img src="${eleman.img} " >
     <h2 class="title">${eleman.name}</h2>
     <h2 class="price">${eleman.price}</h2>
     <h2 class="amount"=>${eleman.amount}</h2>
      
     `;
     modalList.appendChild(sepeItem);
     toplamfiyat += eleman.price * eleman.amount;
  

  })
  console.log(toplamfiyat);
 }
          // modal //
          const toggleModal=()=>{
      
            modal.classList.toggle("active")
          
          }

          openBtn.addEventListener("click",()=>{
            toggleModal()

            listSepet()
            toplambilgi.innerText=toplamfiyat

          });
          closeBtn.addEventListener("click",()=>{
            toggleModal()
            modalList.innerHTML = ' ';
            toplamfiyat=0

          })
            
                      // sepet ekleme //

            
             
              function sepeteEkle(param){
                const foundItem = sepet.find((eleman) => eleman.id === param.id);
                if(foundItem){
                         foundItem.amount+=1
              

                }else{ 
                  sepet.push(param)
                     
                }
                console.log(sepet);
              }

          
          

