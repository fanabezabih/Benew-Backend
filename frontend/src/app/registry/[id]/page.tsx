'use client'

import {
  useEffect,
  useState
} from 'react'

import {
  Gift,
  Plus,
  Trash2,
  Share2,
  Copy,
  Check,
  MessageCircle,
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


const { user } = useAuth()


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

}

finally{

setLoading(false)

}

}



useEffect(()=>{

fetchRegistry()

},[])





// =======================
// DELETE
// =======================

async function handleDelete(
id:string
){

const ok =
confirm(
'Delete this gift?'
)


if(!ok)return


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
// COPY
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





// =======================
// LOADING
// =======================

if(loading){

return (

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



<section className="relative h-[360px] overflow-hidden">


<img

src={
registry.coverImage ||
'https://images.unsplash.com/photo-1519225421980-715cb0215aed'
}

className="absolute inset-0 w-full h-full object-cover"

/>


<div className="absolute inset-0 bg-black/45"/>



<div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-4 text-center">


<h1 className="text-5xl font-display">

{registry.title}

</h1>



<p className="max-w-2xl mt-4">

{registry.description}

</p>



</div>


</section>





<div className="max-w-7xl mx-auto px-4 py-12">





<div className="bg-white rounded-3xl p-6 mb-10">


<div className="flex justify-between items-center">


<div>


<div className="flex gap-2 items-center mb-4">

<Share2/>

<h3 className="text-xl font-semibold">

Share Registry

</h3>

</div>



<div className="flex gap-3">


<a
href={`https://wa.me/?text=${encodeURIComponent(shareUrl)}`}
target="_blank"
className="bg-green-500 text-white px-5 py-3 rounded-2xl"
>

WhatsApp

</a>




<button
onClick={copyLink}
className="border px-5 py-3 rounded-2xl flex gap-2"
>


{copied?<Check/>:<Copy/>}


{copied?'Copied':'Copy'}

</button>


</div>



</div>




<div className="bg-white p-4 border rounded-2xl">

<QRCode
value={shareUrl || ' '}
size={120}
/>


</div>



</div>

</div>






<div className="flex justify-between items-center mb-10">


<h2 className="text-3xl font-display flex gap-3 items-center">


<Gift/>

Gifts


</h2>




<button

onClick={()=>setShowAddGift(true)}

className="bg-[#d96b3c] text-white px-6 py-3 rounded-2xl flex gap-2"

>


<Plus/>

Add Gift


</button>



</div>






<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">



{
registry.gifts?.map(
(gift:any)=>(



<div

key={gift.id}

className="bg-white rounded-3xl overflow-hidden shadow relative cursor-pointer"

onClick={()=>setSelectedGift(gift)}

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





{
gift.addedById === user?.id && (


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


)

}





<div className="p-6">


<h3 className="text-2xl font-semibold">

{gift.title}

</h3>





{
gift.addedById === registry.userId ?


<p className="text-[#d96b3c] text-sm mt-2">

Owner's Gift

</p>


:


gift.addedBy?.name &&


<p className="text-gray-500 text-sm mt-2">

Suggested by {gift.addedBy.name}

</p>


}




<p className="text-gray-600 mt-3">

{gift.description}

</p>



{
gift.price &&

<p className="text-[#d96b3c] mt-3 font-semibold">

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






<AddGiftModal

isOpen={showAddGift}

onClose={()=>setShowAddGift(false)}

registryId={params.id}

onGiftAdded={fetchRegistry}

/>





<GiftDetailsModal

isOpen={!!selectedGift}

onClose={()=>setSelectedGift(null)}

gift={selectedGift}

registryId={params.id}

refresh={fetchRegistry}

/>





<EditGiftModal

isOpen={!!editingGift}

onClose={()=>setEditingGift(null)}

gift={editingGift}

refresh={fetchRegistry}

/>



</div>

)

}