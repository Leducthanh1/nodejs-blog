const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');


const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    name: { type : String, required: true,},
    description: { type : String},
    image: { type : String},
    videoID: { type : String, required: true},
    level: { type : String},
    slug: { type: String, slug: 'name', unique:true }
}, {
    timestamps: true,
});

//Custom query helpers

CourseSchema.query.sortable = function(req){
    if(req.query.hasOwnProperty('_sort')){
        const isValidType = ['asc', 'desc'].includes(req.query.type);
        return this.sort({
            [req.query.column]: isValidType ? req.query.type : 'desc'
        })
    }
    return this;
}

//add plugins

mongoose.plugin(slug);
CourseSchema.plugin(mongooseDelete, { 
    deletedAt : true,
    overrideMethods : 'all',
});

module.exports = mongoose.model('Course',CourseSchema);

