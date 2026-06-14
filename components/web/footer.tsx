"use client"



import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Rss, Globe } from "lucide-react";
import { useRef } from "react";

import { PostItem } from "@/lib/posts";






interface Props {
  posts?: PostItem[];
}

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Essays", href: "/essays" },
  { label: "Newsletter", href: "/newsletter" },
  
];

const topicLinks = [
  { label: "Technology", href: "/technology" },
  { label: "Teaching Methods", href: "/techniques" },
  { label: "Contact Us", href: "/contact" },
  { label: "Reading List", href: "/reading-list" },
];

const recentPosts = [
  {
    tag: "Essay",
    title: "The Quiet Revolution of Attention",
    date: "May 18, 2026",
    href: "/posts/quiet-revolution",
  },
  {
    tag: "Technology",
    title: "Building in the Age of Uncertainty",
    date: "May 11, 2026",
    href: "/posts/building-uncertainty",
  },
  {
    tag: "Culture",
    title: "Why Slow Thinking Wins",
    date: "May 4, 2026",
    href: "/posts/slow-thinking",
  },
];

const socialLinks = [
  {  },
  { },
  { label: "RSS", href: "/rss.xml", icon: Rss },
  { label: "Website", href: "/", icon: Globe },
];
  





export default function Footer({ posts }: Props) {

  const formRef = useRef<HTMLFormElement>(null);

  const subscribeNewsletter = async (_: unknown, formData: FormData) => {
    const email = formData.get("email") as string;
    
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        return { error: result.error || "Subscription failed" };
      }
      
      return { success: true };
    } catch {
      return { error: "Network error. Please try again." };
    }
  };

  const clientAction = async (formData: FormData) => {
    const result = await subscribeNewsletter(undefined, formData);
    
    if (result.error) {
      alert(result.error);
    } else {
      alert("Success! Check your email.");
      formRef.current?.reset();
    }
  };



  


  

  

  

 


  return (
    <footer className="bg-[#0066cc] text-white font-sans mt-5 ">
      {/* Top bar — brand + newsletter */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between px-6 md:px-10 pt-10 pb-8 border-b border-white/[0.08]">
        {/* Brand */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full border border-[#C4A35A] flex items-center justify-center shrink-0">
              <span className="font-serif text-[13px] text-[#C4A35A] leading-none">B</span>
            </div>
            <span className="font-serif text-xl font-light tracking-[0.12em] uppercase text-white">
              betterauth
            </span>
          </div>
          <p className="text-s[16px] tracking-wide text-white hover:text-[#C4A35A] max-w-xs font-serif">
            Get Your Essential Essays on any topic before the next submission. 
          </p>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col gap-2">
          <span className="text-[10px] tracking-[0.14em] font-bold uppercase text-white">
            Stay in the loop
          </span>
          <div className="flex">


          

        
          <form className=" flex gap-2 items-center" ref = {formRef} action = {clientAction}>
          
          
            <Input
              type="email"
              name = "email"
              placeholder="your@email.com"
              required
              
              className="bg-white/5 border border-white/20 border-r-0
                rounded-none rounded-l-sm text-[13px] text-white
                placeholder:text-[#5A5651] focus-visible:ring-0
                focus-visible:border-[#C4A35A]/60 h-9 w-52"
                          
              
              
            />

            
            <Button
              size="sm"
              className="
                bg-[#C4A35A] hover:bg-[#D4B36A] text-[#0D0C0A]
                rounded-none rounded-r-sm text-[10px] font-small
                tracking-[0.08em] uppercase h-9 px-4 border-0 
              "
              type = "submit"
            
            >
              
            </Button>    

            Subscribe


            </form>  

            
            
          </div>
        </div>
      </div>

      {/* Main 4-column grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 border-b border-white/[0.06] ">
        {/* Navigate */}
        <div className="mx-auto border-r border-white/[0.05] font-serif text-white-100">
          <p className="text-[12px] tracking-[0.14em] uppercase text-white mb-5 pb-3 border-b border-[#C4A35A]/25 font-bold">
            Navigate
          </p>
          <ul className="flex flex-col gap-2.5 ">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[13px] text-[#111] hover:text-[#C4A35A] transition-colors duration-200 font-bold"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Topics */}
        <div className=" px-6 md:px-10 py-8 border-r border-white/[0.05] ">
          <p className="text-[13px] tracking-[0.14em] uppercase text-white mb-5 pb-3 border-b border-[#C4A35A]/25 font-bold">
            Topics
          </p>
          <ul className="flex flex-col gap-2.5">
            {topicLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[13px] text-[#111] hover:text-[#C4A35A] transition-colors duration-200 font-bold"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* About */}
        <div className="px-6 md:px-10 py-8 border-r border-white/[0.05] col-span-2 md:col-span-1">
          <p className="text-[13px] tracking-[0.14em] uppercase text-white mb-5 pb-3 border-b border-[#C4A35A]/25 font-bold">
            About
          </p>
          <p className="text-[13px] text-[#111] hover:text-[#C4A35A] leading-[1.7] mb-4 font-bold">
            Teaching English is a passion which gives me immense joy and fulfillment.
          </p>
          <Link
            href="/rss.xml"
            className="inline-flex items-center gap-1.5 border border-[#C4A35A]/35 px-2.5 py-1 text-[10px] tracking-[0.08em] uppercase text-[#111111] font-boldhover:border-[#C4A35A]/70 font-boldhover: text-[#C4A35A] transition-colors duration-200 "
          >
            <Rss className="w-3 h-3 "aria-hidden="true" />
            RSS Feed
          </Link>
        </div>

        {/* Recent posts */}
        <div className="px-6 md:px-10 py-8 col-span-2 md:col-span-1">
          <p className="text-[10px] tracking-[0.14em] uppercase text-white mb-5 pb-3 border-b border-[#C4A35A]/25 font-bold">
            Recent
          </p>
          {recentPosts.map((post) => (
            <Link href= {`/dashboard/${post.href}`}
              key={post.href}
              
              className="block text-[13px] text-[#111] hover:text-[#C4A35A] transition-colors duration-200 font-bold mb-2"
            >
              {post.title}
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex flex-col gap-3 sm:flex-row  sm:items-center sm:justify-between px-6 md:px-10 py-5">
        <p className="text-[11px] text-[#5A5651] tracking-wide">
          © {new Date().getFullYear()} Betterauth · All rights reserved
        </p>

        {/* <div className="flex items-center gap-5">
          {socialLinks.map(({ label, href, icon: Icon }) => (
            <Link
              key={label}
              href={href}
              aria-label={label}
              className="text-[#7A7570] hover:text-[#C4A35A] transition-colors duration-200"
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              <Icon className="w-3.5 h-3.5" aria-hidden />
            </Link>
          ))}
        </div> */}
      </div>
    </footer>
  );

}
