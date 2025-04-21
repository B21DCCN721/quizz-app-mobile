function generateCodeTest(id) {
    if(id> 999){
        return `MA${id}`;
    }
    return `MA${id.toString().padStart(3, '0')}`;
  }
export default generateCodeTest;  