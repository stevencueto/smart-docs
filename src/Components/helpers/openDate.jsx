// import docsLink from "./docsAPI";
// let doc;
// const updateDoc =(up) =>{
//     doc = up
// }

// const getDoc = async (id)=>{
//     try {
//         const req = await fetch(`${docsLink}doc/data/${id}`, {
//             headers: {
//                 'x-access-token': localStorage.getItem('docs-token'),
//             }
//           })
//         const res = await req.json()
//         if(res.success){
//             return updateDoc(res.data)
//         }
//         console.log(res)
//     } catch (error) {
//         console.log(error)
//     }
// }


export const openDate = (date) =>{
    // let now = new Date();
    // const year = now.getFullYear();
    // let month = now.getMonth() + 1; // Months start at 0!
    // let day = now.getDate();
   const toSplit = date.split('T')
    const rn = toSplit[0].split('-')
    const now = new Date(Date.UTC(rn[0], --rn[1], rn[2]))
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const today = now.toLocaleDateString('en-US', options)
    return today
}


