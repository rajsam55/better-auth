"use client"
import Image from "next/image";
import { Button } from "../ui/button";
import  Link  from "next/link";
import { ArrowRight } from "lucide-react";








export function Header() {










  return (

    <div className="relative overflow-hidden bg-gradient-to-b from-indigo-50/50 via-white to-white py-16 sm:py-24">
      {/* Decorative vector dots or circles */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-200/20 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text content (Column 1-7) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100/80 px-3.5 py-1.5 rounded-full text-indigo-700 text-xs font-semibold tracking-wide">
              
              <span>Premium Language Academy</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight text-slate-900 leading-[1.1] line-height: wide font-sans ">
              Elevate Your English.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-700">
                Command Any Audience.
              </span>
            </h1>

            <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Master advanced English grammar, command elite corporate business communication, and secure top tier IELTS band scores with certified templates, deep analytical lessons, and professional downloadable resources.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                
                className="w-full sm:w-auto px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-lg shadow-indigo-100"
              >
                <span>Start Learning</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                
                className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm"
              >
                <span>Browse Premium Library</span>
              </button>
            </div>

            {/* Metrics Checklist */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-100 max-w-lg mx-auto lg:mx-0">
              <div>
                <span className="block text-2xl sm:text-3xl font-bold text-slate-900">8.0+</span>
                <span className="text-xs text-slate-500 font-medium">Avg. IELTS Target</span>
              </div>
              <div>
                <span className="block text-2xl sm:text-3xl font-bold text-slate-900">100%</span>
                <span className="text-xs text-slate-500 font-medium">Verified Material</span>
              </div>
              <div>
                <span className="block text-2xl sm:text-3xl font-bold text-slate-900">25k+</span>
                <span className="text-xs text-slate-500 font-medium">Active Scholars</span>
              </div>
            </div>
          </div>

          {/* Interactive Bento Feature Card (Column 8-12) */}
          <div className="lg:col-span-5 relative">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-indigo-500/10 to-transparent rounded-full" />
              
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600">
                
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">Why BetterEnglish
                     Academy?</h4>
                  <p className="text-xs text-slate-400">Our core training pillars</p>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  {
                    title: 'Elite Model Essays & Reports',
                    desc: 'Fully annotated essay compositions from certified examiner grades, ready for download.',
                    
                    color: 'text-indigo-600 bg-indigo-50'
                  },
                  {
                    title: 'Active Grammar Timelines',
                    desc: 'Ditch the textbooks. Practice grammar visually using live sentence blueprints and timelines.',
                    
                    color: 'text-violet-600 bg-violet-50'
                  },
                  {
                    title: 'Real-time Video Explanations',
                    desc: 'Every blog entry includes video-based masterclasses to perfect your pronunciation and comprehension.',
                    
                    color: 'text-amber-600 bg-amber-50'
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-3.5 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                    <div className={`w-8 h-8 rounded-lg shrink-0 flex items-center justify-center ${item.color}`}>
                    
                    </div>
                    <div>
                      <h5 className="font-semibold text-slate-800 text-xs">{item.title}</h5>
                      <p className="text-slate-500 text-[11px] leading-normal mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>


    
        
        
   
  )
}





{/* <div className="bg-[#0066cc] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2  gap-4 lg: h-[600px] shadow-md mx-auto mb-6 w-full max-w-9xl">




      <div className="flex flex-col justify-center items-start gap-4 mx-auto mb-6 leading-loose : line-height :2">

      <h1 className = "text-white text-3xl font-bold">Get essays that pass.<br/> Hassle-free Here!</h1>
      <p className="text-white line-height : 2 mx-2">If you have got time, we can help you write better essays,<br/> to get you the best grades.</p>
      
      
      
      <p className="line-height :2 text-white">
        
        From saving you time, we've got you covered.<br/>
       We do it all here & treat you right!


     </p> 

     
      
        <div className="flex gap-2">
        <Link href= "/get-started"><Button variant = "default" className = "bg-green-300 p-3">Get Started</Button></Link>
        <Link href="/learn-more"><Button variant = "outline">Learn More</Button></Link>
        </div>







      </div>

  
        
        
      
    

    
    <div className = " py-4 ">

    <div className=" relative h-62 w-100 mt-8 lg:h-90 md:h-70 rounded-lg overflow-hidden mx-auto bg-muted hover:bg-muted/50 transition  mb-2 flex flex-col justfy-center items-center ">


      <Image src="/learn-english.jpg" alt="Header Image" 

      className="object-cover rounded-lg shadow-md " 
      
      
      
      fill/>






    </div>
    </div>

    


    </div>   */}
