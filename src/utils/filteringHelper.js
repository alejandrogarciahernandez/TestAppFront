
const filterArrayBasedOnString = (pattern, array) => {
    
    return array.filter((card) => card.title.toLowerCase().includes(pattern.toLowerCase()));
} 

export default filterArrayBasedOnString;