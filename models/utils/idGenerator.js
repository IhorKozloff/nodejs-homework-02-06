function idGenerator (data) {
    
    const allId = data.map(item => item.id);
    
    const newId = Number(allId[allId.length - 1]) + 1;
  
    return newId.toString();
};

module.exports = idGenerator;