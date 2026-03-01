
// FTP connections disabled to prevent server crashes
// const ftp = require("basic-ftp");
// const jsftp = require("jsftp");
// const Ftp = new jsftp({
//   host: '15.207.85.158',
//   port: '21',
//   user: 'admin_keerat',
//   password: 'UniGrad@123'
// })


// ftpClient.connect({
//   'host': 'server45.indianserverhost.com',
//   'port': 21,
//   'user': 'keerat@naveenrao.com',
//   'password': 'UniGrad@123',
//   'secure': true
// })

// FTP function disabled to prevent server crashes
async function example(req) {
  console.log("FTP functionality is currently disabled");
  if (req && req.file) {
    console.log(req.file.path, " ", req.file.originalname);
  }
  // Commented out to prevent connection errors
  // const client = new ftp.Client()
  // client.ftp.verbose = true
  // try {
  //     await client.access({
  //         host: "15.207.85.158",
  //         user: "http://admin_keerat",
  //         password: "UniGrad@123",
  //         port: 21,
  //         secure: true
  //     })
  //     console.log(await client.list());
  //     console.log(req.file.path, " ", req.file.originalname);
  //     // await client.uploadFrom(req.file.path, req.file.originalname)
  //     // await client.downloadTo("README_COPY.md", "README_FTP.md")
  // }
  // catch(err) {
  //     console.log(err)
  // }
  // client.close()
}

module.exports = {

  verifyApprover(req, res, modelObj) {
    
    modelObj
      .findOne({ faculty_id: req.query.id})
      .then((result) => {
        if(result == null)
          return res.status(201).json({ err: "id not found"});
        else return res.status(201).json({ success: "id is valid", id: result._id});
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: "Incorrect format",
          dump: err,
        })
      })
  },

  createEntry(req, res, modelName) {
    var obj = req.body;
    var modelObj = new modelName(obj);

    modelObj
      .save()
      .then((result) => {
        return res.status(201).json({ message: "saved", id: result._id });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  },

  getAllEntries(req, res, modelObj) {
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

  getEntryByID(req, res, modelObj) {
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

  getEntryByIDandDate(req, res, modelObj) {
    if(req.query.starting_date == req.query.ending_date){
      modelObj
        .find({date: req.query.starting_date})
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
      else{
        modelObj
        .find({date:{$gte:req.query.starting_date,$lte:req.query.ending_date}, id : req.query.id})
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
  },

  getEntryByClassID(req, res, modelObj) {
    modelObj
      .findOne({ class: req.query.class_id })
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

  getEntryByDate(req, res, modelObj) {
    modelObj
      .find({ date: req.query.date })
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

  deleteEntryByID(req, res, modelObj) {
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

  updateEntryByID(req, res, modelObj) {
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

  getAllEntriesv2(req, res, modelObj) {
    modelObj
      .find({ item_availability: "True" })
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

  getHolidayByYear(req, res, modelObj) {
    var year = req.body.year;
    console.log(req.body);
    modelObj
      .findOne({ year })
      .then((result) => {
        if (result == null)
          return res
            .status(403)
            .json({ UpdateStatus: false, err: "No holidays found for this year" });
        else return res.status(201).json(result);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  },

  uploadFile(req, res) {
    // console.log(req.file);
    // ftpClient.on( 'ready', function() {
    //   ftpClient.put( req.file.path, '/www/img/'+req.file.originalname, function( err, list ) {
    //     if ( err ) throw err;
    //     ftpClient.end();
    //   } );
    // } );
    // fs.unlink(req.file.path,function(err){
    //     if(err) return console.log(err);
    //     console.log('file deleted successfully');
    // });  
    // return res.status(201).json({fileuploaded: "true", url: "https://cdn.nrao.site/" + req.file.originalname});
    // ftpClient.on('ready', function() {
    //   ftpClient.list(function(err, list) {
    //     if (err) throw err;
    //     console.dir(list);
    //     ftpClient.end();
    //   });
    // });
    // return res.status(201).json({fileuploaded: "true"});
    example(req)
  }

};
