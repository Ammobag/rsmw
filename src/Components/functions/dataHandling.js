

export default function sizeObject(obj) {
    
    var size = 0, key;
    for (key in obj) {
      if (Object.hasOwnProperty.call(obj, key)) size++;
    }
    return size;
  };