import docsLink from "./docsAPI";

const getDoc = async (id)=>{
    let doc;
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
    } catch (error) {
        console.log(error)
    }
    return doc
}


export const openDate = (id) =>{
    const doc = getDoc(id)
    console.log(doc)
    if(doc === null) return
    const now = new Date();
    const year = now.getFullYear();
    let month = now.getMonth() + 1; // Months start at 0!
    let day = now.getDate();

    let rn = new Date(Date.UTC(year, month, day))
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    today = rn.toLocaleDateString('en-US', options)
    if(today === doc?.openDate)return
}


