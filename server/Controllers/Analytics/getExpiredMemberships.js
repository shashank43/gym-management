function todaysDate() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    today = yyyy + '/' + mm + '/' + dd;
    return today;
}

function convertDate(endDate) {
    const arr = endDate.split("-");
    let str = arr[2] + '/' + arr[1] + '/' + arr[0];
    let ans = new Date(str);
    return ans;
}

function getExpiredMemberships(allMembers) {
    let expiredMembers = [];
    let today = new Date(todaysDate());
    allMembers.map((member) => {
        let endOfMembership = convertDate(member.endOfMembership);
        if(today > endOfMembership) {
            expiredMembers.push(member);
        }
    });
    return expiredMembers;
}

export default getExpiredMemberships;