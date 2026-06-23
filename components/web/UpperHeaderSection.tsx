import Image from "next/image"











const UpperHeader = () => {




  return (




    <div className = " w-full max-w-7xl bg-[#0066cc] ">

    <div className = "mb-6 mx-auto ">


    
    

    <h1 className=" text-white text-2xl font-bold text-center font-bold py-2 mx-4">We Help all our students to excel in their writing skills to achieve better grades through excellent coaching!</h1>

    <p className="text-white text-center mt-8 line-height:1.625">Try one of our video series for free to get an idea <br/> Give us feedback !  </p>

    </div>
    


    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 w-full mb-4 ">
    



    <div className="flex flex-col justify-center mx-auto h-70">


    <ul className="mb-5">   

    <Image src= "/english1.jpg" alt = "" height = {120}  width = {150}  />

    <h1 className="text-black mt-2">Outbound sales</h1>
    

    <li className="">Transfom into blog posts</li>

    <li className="">Promote on social media</li>

    <li className="">Distribute at conferences</li>



    </ul>




    </div>

    <div className="flex flex-col justify-center items-center mx-auto">


    <ul className="mb-5">

        
    <Image src= "/english1.jpg" alt = ""  height = {120}  width = {150}/>

    <h1 className="mt-2">Outbound sales</h1>

    <li className="">Transfom into blog posts</li>

    <li className="">Promote on social media</li>

    <li className="">Distribute at conferences</li>



    </ul>




    </div>

    <div className="flex flex-col justify-center items-center mx-auto">

    <ul className="mb-5">

    
    <Image src= "/english1.jpg" alt = ""  height = {120}  width = {150}/>

    <h1 className="mt-2">Outbound sales</h1>

    <li className="">Transfom into blog posts</li>

    <li className="">Promote on social media</li>

    <li className="">Distribute at conferences</li>



    </ul>




    </div>

    <div className="flex flex-col justify-center items-center mx-auto">


    <ul className="mb-5">

    
    <Image src= "/english1.jpg" alt = ""  height = {120}  width = {150}/>

    <h1 className="mt-2">Outbound sales</h1>

    <li className="">Transfom into blog posts</li>

    <li className="">Promote on social media</li>

    <li className="">Distribute at conferences</li>



    </ul>







    </div>    


    </div>     
        
        
        
    </div>
  )
}

export default UpperHeader