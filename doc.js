let cron = require('node-cron');
let Cars = require('../../models/car')
let Clients = require('../../models/exampleClient')
let moment = require('moment')
cron.schedule('* * * * *', ()=>{
  console.log('running a task every minute');

  Clients.find({}, (err, result)=>{
    if(err)
      return res.status(500).json(err)

    for (el of result){
      el.carID
      Cars.findById(el.carID, (err, date)=>{
        if(err)
          return res.status(404).json('Thic car doesnt\'t exist!')
        let dateString = '02.07.2017'
        let iterator = 0;
        let day = "";
        let month = "";
        let year = "";
        for (el of dateString){
          console.log(el)
          if(el == '.'){
            iterator++;
            continue
          }
          if(iterator == 0){
            day += el
            continue
          }
          if(iterator == 1){
            month += el
            continue
          }
          if(iterator == 2){
            year += el
            continue
          }
        }
        let sum = `${year}-${month}-${day}`
        var dt = new Date();
        let dateStringNow = dt.getFullYear()
         + "-" + ((dt.getMonth() + 1) <10 ? '0' + (dt.getMonth()+1) : (dt.getMonth()+1))
         + "-" + (dt.getDate() <10 ? '0'+ dt.getDate() : dt.getDate())
        console.log(sum)
        console.log(dateStringNow)
        var start = moment(sum);
        var end = moment(dateStringNow);
        if(end.diff(start, "days") <= 7){
          console.log('o kuzwa za tydzien konczy ci sie ubezpieczenie! a dokładnie za : ' + end.diff(start, 'days'))

        }
      })
    }
  })
})
exports.module = cron;
