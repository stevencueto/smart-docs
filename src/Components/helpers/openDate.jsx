export const openDate = (date, APIcall) =>{
    const now = new Date();
    const year = now.getFullYear();
    let month = now.getMonth() + 1; // Months start at 0!
    let day = now.getDate();

    let rn = new Date(Date.UTC(year, month, day))
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    today = rn.toLocaleDateString('en-US', options)
    if(today === date) return
    APIcall()
}