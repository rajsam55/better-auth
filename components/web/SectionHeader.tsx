import Image from "next/image"

const SectionHeader = () => {










  return (




    <div className = " h-120 flex justfy between gap-5 items-center mx-auto px-8">


    

    
    <div className="relative h-52 w-100 max-w-[400px] mx-auto">

      <Image src = "/avatars/english-teacher-amelia.svg"  alt=  "" fill

      className = "object-cover"
      
      
      />








    </div>




    <div className="max-w-[600px]  px-8">

    <h1 className="text-3xl font-bold">Instead you should use,<br/> our school resources.</h1>

    <p className="mt-6 text-[12px]">Because we are not just mere english tutors. We are a team of dedicated teaching veterans, consultants and educators who are 100% focus on delivering their expertise to achieve students success and goals. </p>

    <p className="text-[12px] leading-loose : line-height:2 ">So you get a better end product faster than if you would get from elesewhere with none of the hassels.</p>








    </div>



        
        
  </div>
  )
}

export default SectionHeader