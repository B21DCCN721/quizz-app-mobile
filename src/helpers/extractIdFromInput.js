const extractIdFromInput = (input) => {
    const match = input.match(/\d+$/); // Lấy số cuối cùng trong chuỗi
    return match ? match[0] : "";
  };  
export default extractIdFromInput;  