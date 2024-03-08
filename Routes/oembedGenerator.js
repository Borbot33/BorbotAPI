export default {
    url: "/emb/:author",
    execute: async (req, res) => {
        let author = req.params.author
        if(author.endsWith(".json") && author != ".json") {
            author = author.slice(0, -5)
            res.json({
                "provider_name": author
            })
        } else {
            res.send("The string must end with .json")
        }
    }
}