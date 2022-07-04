const { Contact } = require('../../models/contact');

const listContacts = async (req, res, next) => {
  const {_id: owner} = req.user;

console.log(req.query)
  const {page = 1, limit = 20, favorite} = req.query;
  const skip = (page - 1) * limit;

  const result = await Contact.find({owner},"", {skip, limit: Number(limit)})
    .populate("owner", "email")


  if (favorite) {
    const favoriteContacts = result.filter(i => i.favorite)

    res.json(favoriteContacts);
    return;
  }

  res.json(result);
    
}

module.exports = listContacts;