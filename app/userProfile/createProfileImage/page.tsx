"use client"

import { profileActionForm } from '@/app/profile-actions'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import Image from 'next/image'

const teachingAvatars = [
  {
    name: "Amelia",
    role: "Reading coach",
    src: "/avatars/english-teacher-amelia.svg",
  },
  {
    name: "Ben",
    role: "Writing mentor",
    src: "/avatars/english-teacher-ben.svg",
  },
  {
    name: "Clara",
    role: "Listening guide",
    src: "/avatars/english-teacher-clara.svg",
  },
  {
    name: "Daniel",
    role: "Grammar tutor",
    src: "/avatars/english-teacher-daniel.svg",
  },
  {
    name: "Eva",
    role: "Speaking coach",
    src: "/avatars/english-teacher-eva.svg",
  },
  {
    name: "Finn",
    role: "Vocabulary helper",
    src: "/avatars/english-teacher-finn.svg",
  },
]


const CreateProfileImage = () => {








  return (


    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-8">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-black">Choose an English teacher avatar</h2>
          <p className="mt-2 text-sm text-gray-600">Pick a preset character or upload your own profile image.</p>
        </div>

        <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {teachingAvatars.map((avatar) => (
            <form action={profileActionForm} key={avatar.src} className="rounded-lg bg-white p-3 text-center shadow-sm">
              <input type="hidden" name="avatarUrl" value={avatar.src} />
              <button
                type="submit"
                className="group flex w-full flex-col items-center gap-3 rounded-md border border-gray-200 p-3 transition hover:border-[#0066cc] hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0066cc]"
              >
                <Image
                  src={avatar.src}
                  alt={`${avatar.name} ${avatar.role} avatar`}
                  width={128}
                  height={128}
                  className="size-28 rounded-full"
                />
                <span className="text-sm font-semibold text-gray-950">{avatar.name}</span>
                <span className="text-xs text-gray-500">{avatar.role}</span>
              </button>
            </form>
          ))}
        </div>

        <form action={profileActionForm} className="flex w-full max-w-md flex-col justify-center rounded-lg bg-white p-6 shadow-sm">
          <Label htmlFor="media" className="text-sm font-semibold text-gray-900">Upload profile image</Label>

          <input
            id="media"
            type="file"
            name="media"
            accept="image/*"
            className="mt-4 text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-black file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-blue-600"
          />

          <Button type="submit" className="mt-4 w-full bg-black px-4 py-2 text-white hover:bg-blue-600">
            Upload
          </Button>
        </form>
      </div>
    </div>
  )
}

export default CreateProfileImage
