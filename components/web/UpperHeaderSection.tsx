import Image from "next/image"











const UpperHeader = () => {




  return (




    <div className = "bg-blue-500 lg: h-[700px] lg:w-[1100px] mx-auto flex flex-col justify-center items-center" >

    <div className = "flex flex-col justify-center items-center mb-6 mx-auto ">


    
    

    <h1 className=" text-white text-2xl font-bold text-center font-bold">We Help all our students to excel in their writing skills to achieve better grades through excellent coaching!</h1>

    <p className="text-white text-center mt-8 line-height:1.625">Try one of our video series for free to get an idea <br/> Give us feedback !  </p>

    </div>
    


    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 w-full h-110 mb-4 sm: flex-row ">
    



    <div className="flex flex-col justify-center mx-auto">


    <ul className="">   

    <Image src= "/english1.jpg" alt = "" height = {120}  width = {150}  />

    <h1 className="text-black">Outbound sales</h1>
    

    <li className="">Transfom into blog posts</li>

    <li className="">Promote on social media</li>

    <li className="">Distribute at conferences</li>



    </ul>




    </div>

    <div className="flex flex-col justify-center items-center mx-auto">


    <ul className="">

        
    <Image src= "/english1.jpg" alt = ""  height = {120}  width = {150}/>

    <h1 className="">Outbound sales</h1>

    <li className="">Transfom into blog posts</li>

    <li className="">Promote on social media</li>

    <li className="">Distribute at conferences</li>



    </ul>




    </div>

    <div className="flex flex-col justify-center items-center mx-auto">

    <ul className="">

    
    <Image src= "/english1.jpg" alt = ""  height = {120}  width = {150}/>

    <h1 className="">Outbound sales</h1>

    <li className="">Transfom into blog posts</li>

    <li className="">Promote on social media</li>

    <li className="">Distribute at conferences</li>



    </ul>




    </div>

    <div className="flex flex-col justify-center items-center mx-auto">


    <ul className="">

    
    <Image src= "/english1.jpg" alt = ""  height = {120}  width = {150}/>

    <h1 className="">Outbound sales</h1>

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