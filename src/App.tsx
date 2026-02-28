import React, { useState } from 'react'
import { Download, Search } from "lucide-react"
import getYouTubeID, { } from "get-youtube-id"
import { toast, ToastContainer } from 'react-toastify';

const App = () => {
  interface ThumbnailModel {
    width: number;
    height: number;
    url: string;
    fileName: string;
  }

  const ytThumbnailUrlModel = [
    {
      width: 120,
      height: 90,
      url: "https://img.youtube.com/vi",
      fileName: "default.jpg"
    },
    {
      width: 320,
      height: 180,
      url: "https://img.youtube.com/vi",
      fileName: "mqdefault.jpg"
    },
    {
      width: 480,
      height: 360,
      url: "https://img.youtube.com/vi",
      fileName: "hqdefault.jpg"
    },
    {
      width: 1280,
      height: 720,
      url: "https://img.youtube.com/vi",
      fileName: "maxresdefault.jpg"
    }
  ]



const [url, setUrl] = useState<string>();
const [thumbnail, setThumbnail] = useState<ThumbnailModel[]>();


const searchHandler = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  if (!url) {
    toast.error("Please enter a YouTube video URL.");
    return;
  }
  const vdoId = getYouTubeID(url);
  console.log(url,vdoId)
  if (vdoId) {
    const thumbnails = ytThumbnailUrlModel.map((model)=>{
      return{
        ...model,
        url:`${model.url}/${vdoId}/${model.fileName}`
      }
    })
    console.log(thumbnails)
    setThumbnail(thumbnails);


    toast.success("Thumbnail URLs generated successfully!");


  } else {
    toast.error("Invalid URL, Please enter a valid YouTube video URL.");
  }


}
return (
  <div>
    <div className='w-full flex justify-center items-center p-4 mt-4 ' >
      <h1 className='text-2xl font-bold text-purple-700' >Yt Thumbnail Downloader ...</h1>
    </div>

    <div className='mt-8 w-full  flex justify-center items-center ' >

      <form onSubmit={searchHandler} action="" className='flex justify-center items-center gap-4 ' >
        <input


          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className='p-3 border-1 rounded-lg  border-purple-700 w-[480px]  ' type="url" placeholder='Enter video url ...' />
        <button className='flex justify-center items-center p-3 bg-gradient-to-b from-purple-600 to-blue-400 rounded-lg text-white cursor-pointer text-xl   gap-4 ' >Search <span><Search /></span> </button>

      </form>

    </div>

<div className='w-full flex justify-center items-center mt-8 ' >
  <div className='grid grid-cols-3 gap-12 p-8   ' >
    {
      thumbnail && thumbnail.map((thumb,index)=>{
        return(
          <div key={index} className='flex flex-col justify-center w-[400px] h-[400px] p-4   items-center gap-4 ' >
            <img className='rounded-lg w-full h-full object-cover ' src={thumb.url} alt={`Thumbnail ${index + 1}`} />
            <h4> {thumb.width} X {thumb.height} </h4>
            <a href={thumb.url} target='_blank' download className='px-4 py-2 bg-gradient-to-b from-purple-600 to-blue-400 rounded-lg flex justify-center items-center gap-3  text-white cursor-pointer ' >Download <span><Download/></span> </a>
          </div>
        )
      })
    }

  </div>

</div>

    <ToastContainer />
  </div>
)
}

export default App