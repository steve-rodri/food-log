import moment from 'moment'

export function getMealTypebyTime(){
  const currentTime = moment().format();
  const morning = moment(moment().startOf('day').add(6, "hours")).format();
  const noon = moment(moment().startOf('day').add(11, "hours")).format();
  const evening = moment(moment().startOf('day').add(17, "hours")).format();
  if (moment(currentTime).isBetween(morning, noon)) {
    return "Breakfast"
  } else if (moment(currentTime).isBetween(noon, evening)) {
    return "Lunch"
  } else if (moment(currentTime).isAfter(evening)) {
    return "Dinner"
  }
}

export function timeOfDay(){
  const currentTime = moment().format();
  const morning = moment(moment().startOf('day').add(6, "hours")).format();
  const noon = moment(moment().startOf('day').add(11, "hours")).format();
  const evening = moment(moment().startOf('day').add(17, "hours")).format();
  if (moment(currentTime).isBetween(morning, noon)) {
    return "Morning"
  } else if (moment(currentTime).isBetween(noon, evening)) {
    return "Afternoon"
  } else if (moment(currentTime).isAfter(evening)) {
    return "Evening"
  }
}









export function sortResults(query, results){
  //split query into words
  const queryWords = query.split(' ')
  const newArray = []
  // loop through both arrays
  let x = 0
  let y = 0


  while (x < results.common.length) {
    while(y < results.branded.length) {
      // split each item in both arrays into words
      const xWords = results.common[x].foodName.split(' ')
      const yWords = results.branded[y].foodName.split(' ')

      //count word matches for each item to query
      let commonCount = 0
      let brandedCount = 0

      //count word matches for each item to query
      queryWords.forEach((qW, i) => {
        xWords.forEach((xW, i) => {
          if (xW.toLowerCase().includes(qW.toLowerCase())) commonCount +=1
        });
      });

      queryWords.forEach((qW, i) => {
        yWords.forEach((yW, i) => {
          if (yW.toLowerCase().includes(qW.toLowerCase())) brandedCount +=1
        });
      });

      //sort by greatest word matches

      if (commonCount > brandedCount) {
        newArray.push(results.common[x])
        x++
      } else if ( x >= results.common.length){
        newArray.push(results.branded[y])
        y++
      } else if ( x > y ){
        newArray.push(results.branded[y])
        y++
      } else {
        newArray.push(results.common[x])
        x++
      }
    };
    if (y >= results.branded.length) {
      newArray.push(results.common[x])
      x++
    }
  }

  //return new combined and sorted array
  return newArray
}
