'use client'

import {
  useEffect,
  useState
} from 'react'

import {
  useRouter
} from 'next/navigation'


import {
  Gift,
  Plus,
  Trash2,
  Share2,
  Copy,
  Check,
  Pencil
} from 'lucide-react'


import QRCode from 'react-qr-code'


import {
  registryAPI,
  giftAPI
} from '@/lib/api'


import {
  useAuth
} from '@/context/AuthContext'


import AddGiftModal
from '@/components/modals/AddGiftModal'


import GiftDetailsModal
from '@/components/modals/GiftDetailsModal'


import EditGiftModal
from '@/components/modals/EditModal'



interface Props {

  params:{
    id:string
  }

}



export default function RegistryPage({
  params
}:Props){



const router =
useRouter()



const {
  user,
  status
} = useAuth()






const [registry,setRegistry] =
useState<any>(null)



const [loading,setLoading] =
useState(true)



const [showAddGift,setShowAddGift] =
useState(false)



const [selectedGift,setSelectedGift] =
useState<any>(null)



const [editingGift,setEditingGift] =
useState<any>(null)



const [copied,setCopied] =
useState(false)



const [shareUrl,setShareUrl] =
useState('')






// =======================
// SHARE URL
// =======================

useEffect(()=>{


if(typeof window !== 'undefined'){


setShareUrl(
window.location.href
)


}


},[])








// =======================
// FETCH REGISTRY
// =======================


async function fetchRegistry(){


try{


const data =
await registryAPI.getById(
params.id
)



setRegistry(data)



}catch(err){


console.log(err)


}finally{


setLoading(false)


}


}






useEffect(()=>{


fetchRegistry()


},[])









// =======================
// DELETE GIFT
// =======================


async function handleDelete(
id:string
){



const confirmDelete =
confirm(
'Delete this gift?'
)



if(!confirmDelete)
return






try{


await giftAPI.deleteGift(id)


fetchRegistry()



}catch(err){


console.log(err)


alert(
'Failed to delete gift'
)


}


}








// =======================
// COPY LINK
// =======================


async function copyLink(){


await navigator.clipboard.writeText(
shareUrl
)



setCopied(true)



setTimeout(()=>{


setCopied(false)


},2000)



}








if(loading){


return(


<div className="min-h-screen flex items-center justify-center bg-[#faf7f4]">


<div className="relative">


<div className="w-28 h-28 border-4 border-[#e7d6cc] border-t-[#d96b3c] rounded-full animate-spin"/>



<img

src="/images/benenew.jpg"

className="w-16 h-16 rounded-full object-cover absolute top-6 left-6"

/>


</div>


</div>


)


}






if(!registry){


return(

<div className="min-h-screen flex items-center justify-center">


Registry not found


</div>

)


}
return (

<div className="min-h-screen bg-[#faf7f4]">



{/* HERO */}


<section className="relative h-[360px] overflow-hidden">


<img

src={
registry.coverImage ||
'https://images.unsplash.com/photo-1519225421980-715cb0215aed'
}

className="absolute inset-0 w-full h-full object-cover"

/>



<div className="absolute inset-0 bg-black/45"/>



<div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-4">


<h1 className="text-5xl md:text-6xl font-display">

{registry.title}

</h1>





{
registry.description &&


<p className="max-w-2xl mt-4 text-lg">

{registry.description}

</p>


}



</div>


</section>








<div className="max-w-7xl mx-auto px-4 py-12">






{/* SHARE */}



<div className="bg-white rounded-3xl p-6 shadow-sm mb-10">



<div className="flex flex-col lg:flex-row justify-between items-center gap-8">





<div>



<div className="flex items-center gap-2 mb-4">


<Share2
className="text-[#d96b3c]"
/>



<h3 className="text-xl font-semibold">

Share Registry

</h3>



</div>








<div className="flex flex-wrap gap-3">





{/* WHATSAPP */}



<a

href={`https://wa.me/?text=${encodeURIComponent(shareUrl)}`}

target="_blank"

rel="noreferrer"

className="bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-2xl"

>


WhatsApp


</a>







{/* TELEGRAM */}


<a

href={`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}`}

target="_blank"

rel="noreferrer"

className="bg-sky-500 hover:bg-sky-600 text-white px-5 py-3 rounded-2xl"

>


Telegram


</a>








{/* COPY */}


<button

onClick={copyLink}

className="border px-5 py-3 rounded-2xl flex items-center gap-2"

>



{

copied

?

<Check size={18}/>

:

<Copy size={18}/>

}



{

copied

?

"Copied"

:

"Copy Link"

}



</button>






</div>







<div className="mt-4 text-sm text-gray-500 break-all">


{shareUrl}


</div>





</div>







{/* QR CODE */}



<div className="bg-white p-4 border rounded-2xl">


<QRCode

value={shareUrl || " "}

size={120}

/>



</div>




</div>



</div>









{/* GIFTS TITLE */}



<div className="flex justify-between items-center mb-10">





<h2 className="text-3xl font-display flex items-center gap-3">


<Gift/>


Gifts


</h2>






<button


onClick={()=>{


if(!user){


router.push(

`/login?redirect=/registry/${params.id}`

)


return


}



setShowAddGift(true)



}}



className="bg-[#d96b3c] text-white px-6 py-3 rounded-2xl flex items-center gap-2"

>


<Plus size={18}/>


Add Gift


</button>





</div>








{/* GIFTS GRID */}



<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">





{

registry.gifts?.map(

(gift:any)=>(



<div


key={gift.id}


onClick={()=>setSelectedGift(gift)}


className="bg-white rounded-3xl overflow-hidden shadow relative cursor-pointer"

>





{

gift.image ?


<img

src={gift.image}

className="w-full h-72 object-cover"

/>



:


<div className="h-72 bg-gray-100 flex items-center justify-center">


<Gift/>


</div>



}








{/* ONLY OWNER OF THIS GIFT */}



{

gift.addedById === user?.id &&



<div className="absolute top-4 right-4 flex gap-2">


<button


onClick={(e)=>{


e.stopPropagation()


setEditingGift(gift)


}}



className="bg-white p-2 rounded-full shadow"

>


<Pencil size={18}/>


</button>








<button


onClick={(e)=>{


e.stopPropagation()


handleDelete(gift.id)


}}



className="bg-white p-2 rounded-full shadow"

>


<Trash2 size={18}/>


</button>



</div>



}

id="q8p4mx"
<div className="p-6">


<h3 className="text-2xl font-semibold">

{gift.title}

</h3>





{/* OWNER / SUGGESTED LABEL */}



{

gift.addedById === registry.userId ?



<p className="text-[#d96b3c] text-sm mt-2 font-medium">

Owner's Gift

</p>



:



<p className="text-gray-500 text-sm mt-2">

Suggested by {gift.addedBy?.name || "Guest"}

</p>



}








{

gift.description &&


<p className="text-gray-600 mt-3">


{gift.description}


</p>


}








{

gift.price &&


<p className="text-[#d96b3c] font-semibold mt-3">


ETB {gift.price}


</p>


}






</div>



</div>


)


)


}



</div>








</div>









{/* ADD GIFT MODAL */}



<AddGiftModal


isOpen={showAddGift}


onClose={()=>setShowAddGift(false)}


registryId={params.id}


onGiftAdded={fetchRegistry}


/>









{/* DETAILS MODAL */}



<GiftDetailsModal


isOpen={!!selectedGift}


onClose={()=>setSelectedGift(null)}


gift={selectedGift}


registryId={params.id}


refresh={fetchRegistry}


/>









{/* EDIT MODAL */}



<EditGiftModal


isOpen={!!editingGift}


onClose={()=>setEditingGift(null)}


gift={editingGift}


refresh={fetchRegistry}


/>






</div>


)


}