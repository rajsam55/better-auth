import type { NextConfig } from "next";

const nextConfig: NextConfig = {  

  experimental : {

    typedRoutes : true,

    useTypeScriptCli: true,
    
    serverActions: {
      bodySizeLimit: '10mb', // Acceptable formats: '500kb', '10mb', 2000 (bytes)
    },

  },  

  outputFileTracingIncludes: {
      '/api/**/*': ['./node_modules/.prisma/client/**/*'],
    },
  

  turbopack : {
      // 2. Map the internal missing module path directly to node_modules
      resolveAlias: {
        '.prisma/client/default': './node_modules/.prisma/client/default.js',
      },
    },

  

  
  
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "media.istockphoto.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },

      {

        protocol : "https",
        hostname : "eslvideo.com",
        pathname: '/**',



      },

      
    ],
  },
};

export default nextConfig;

