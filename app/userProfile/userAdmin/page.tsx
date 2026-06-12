import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import {redirect} from "next/navigation"









const UserAdmin = async() => {



    const session = await auth.api.getSession({
        
    headers: await headers(),
  });

  if (!session || session.user.role !== "ADMIN") {


    redirect("/unauthorized");
  }









  return (




    <div>{session.user.name}</div>
  )
}

export default UserAdmin