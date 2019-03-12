var mongoose = require('mongoose');

var CategoriesSchema = new mongoose.Schema({
  name: String,
  slug: String,
  metaDescription: String,
  parentId: String,
  isMenu: { type: Boolean, default: false },
  isTags: { type: Boolean, default: true }
});

CategoriesSchema
  .pre('save', function (next) {
    if (!this.isNew) {
      
    } else {

    }
    return next();
  });

mongoose.model('Categories', CategoriesSchema);

module.exports = CategoriesSchema;