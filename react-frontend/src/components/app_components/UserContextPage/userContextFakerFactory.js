
import { faker } from "@faker-js/faker";
export default (user,count,roleIds,positionIds,profileIds,userIds,companyIds,branchIds,departmentIds,sectionIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
role: roleIds[i % roleIds.length],
position: positionIds[i % positionIds.length],
profile: profileIds[i % profileIds.length],
user: userIds[i % userIds.length],
company: companyIds[i % companyIds.length],
branch: branchIds[i % branchIds.length],
department: departmentIds[i % departmentIds.length],
section: sectionIds[i % sectionIds.length],

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
