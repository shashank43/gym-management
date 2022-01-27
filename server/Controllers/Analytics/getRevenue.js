//for last 6 months calculate the revenue generated
function getRevenue(allPayments) {
    const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    let today = new Date();
    let revenueMap = new Map();

    for(let i = 5; i >= 0; i--) {
        let d = new Date(today.getFullYear(), today.getMonth() - i, 1);
        let month = d.getMonth();
        revenueMap.set(monthNames[month], 0);
    }

    allPayments.map((payment) => {
        const arr = payment.dateOfPayment.split("-");
        if(revenueMap.has(monthNames[arr[1] - 1])) {
            let initialAmount = parseInt(revenueMap.get(monthNames[arr[1] - 1]));
            revenueMap.set(monthNames[arr[1] - 1], initialAmount + parseInt(payment.amount));
        }
    });
    
    return revenueMap;
}

export default getRevenue;