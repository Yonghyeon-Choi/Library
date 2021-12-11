module.exports = mongoose => {
    var schema = mongoose.Schema({
            isbn: String,
            title: String,
            author: String,
            publisher: String,
            pubdate: String,
            description: String,
            cnt: Number,
            brw: Number,
            comments: Array,
            image: String,
            link: String,
            },
            { timestamps: true }
        );

        schema.method("toJSON", function() {
                const { __v, _id, ...object } = this.toObject();
                object.id = _id;
                return object;
        });

const Book = mongoose.model("book", schema);
return Book;
};