import docsLink from "./docsAPI";
let doc;

const getDoc = async (id)=>{
    try {
        const req = await fetch(`${docsLink}doc/data/${id}`, {
            headers: {
                'x-access-token': localStorage.getItem('docs-token'),
            }
          })
        const res = await req.json()
        if(res.success){
            doc = res.data
        }
        console.log(res)
    } catch (error) {
        console.log(error)
    }
    return doc
}


export const openDate = (id) =>{
    getDoc(id)
    console.log(doc, 'id')
    if(doc === null) return
    let now = new Date();
    const year = now.getFullYear();
    let month = now.getMonth() + 1; // Months start at 0!
    let day = now.getDate();

    now = new Date(Date.UTC(year, month, day))
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const today = now.toLocaleDateString('en-US', options)
    console.log(today)
    if(today === doc?.openDate)return
}


