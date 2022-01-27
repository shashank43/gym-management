//get all new members who joined the gym in last 6 months
function getMembersGained(allMembers) {
    const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    let today = new Date();
    let newMembers = new Map();

    for(let i = 5; i >= 0; i--) {
        let d = new Date(today.getFullYear(), today.getMonth() - i, 1);
        let month = d.getMonth();
        newMembers.set(monthNames[month], 0);
    }

    allMembers.map((member) => {
        const arr = member.joining.split("-");
        if(newMembers.has(monthNames[arr[1] - 1])) {
            let initialMembers = parseInt(newMembers.get(monthNames[arr[1] - 1]));
            newMembers.set(monthNames[arr[1] - 1], initialMembers + 1);
        }
    });

    return newMembers;
}

export default getMembersGained;