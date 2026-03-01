

module.exports = {
    createNews(req, res, modelName) {
        var obj = req.body;
        var modelObj = new modelName(obj);

        modelObj
            .save()
            .then((result) => {
                return res.status(201).json({ message: "saved", newsID: result._id })
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json({
                    error: err,
                });
            });
    },

    getAllNews(req, res, modelObj) {
        modelObj
            .find()
            .then((result) => {
                return res.status(201).json(result);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json({
                    error: err,
                });
            });
    },

    getNewsByID(req, res, modelObj) {
        modelObj
          .findOne({ _id: req.query._id })
          .then((result) => {
            if (result == null)
              return res.status(201).json({ err: "id not found" });
            else if (result == [])
              return res.status(201).json({ err: "No such ID found" });
            else return res.status(201).json(result);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({
              error: "Incorrect ID format",
              dump: err,
            });
          });
      },
    
      deleteNewsByID(req, res, modelObj) {
        console.log(req.body);
        modelObj
          .deleteOne({ _id: req.body._id })
          .then((result) => {
            if (result.deletedCount == 1)
              return res.status(201).json({ DeleteStatus: true });
            else
              return res
                .status(403)
                .json({ DeleteStatus: false, err: "id not found" });
          })
          .catch((err) => {
            res.status(500).json({
              error: "Incorrect ID format",
              dump: err,
            });
          });
      },
    
      updateNewsByID(req, res, modelObj) {
        console.log(req.body);
    
        modelObj
          .findOneAndUpdate({ _id: req.body._id }, { $set: req.body })
          .then((result) => {
            console.log(result);
            if (result == null)
              return res
                .status(403)
                .json({ UpdateStatus: false, err: "id not found" });
            else return res.status(201).json({ UpdateStatus: true });
          })
          .catch((err) => {
            res.status(500).json({
              error: "Incorrect ID format",
              dump: err,
            });
          });
      },

      getNewsByClass(req, res, modelObj) {
        console.log(req.body);
        var mode = req.body.status;
        if(mode == 'all'){
          modelObj
            .find({news_mode: 'student'})
            .then((result) => {
              if (result == null)
                return res.status(201).json({ err: "no news and notice" });
              else if (result == [])
                return res.status(201).json({ err: "no news and notice" });
              else return res.status(201).json(result);
            })
            .catch((err) => {
              console.log(err);
              res.status(500).json({
                error: err,
              });
            });
        }
        else if(mode == 'student'){
          modelObj
            .findOne({ class_id: req.body.class_id })
            .then((result) => {
              if (result == null)
                return res.status(201).json({ err: "id not found" });
              else if (result == [])
                return res.status(201).json({ err: "No such ID found" });
              else return res.status(201).json(result);
            })
            .catch((err) => {
              console.log(err);
              res.status(500).json({
                error: "Incorrect ID format",
                dump: err,
              });
            });
        }
        else return res.status(500).json({
          error: "Incorrect format"
        })
      },

      getNewsForFaculty(req, res, modelObj) {
        console.log(req.body);
        let modes = ['all_classes','faculty']
        modelObj  
          .find({news_mode: { $in: modes}})
          .then((result) => {
            return res.status(201).json(result);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({
              error: err,
            });
          });
      }
};